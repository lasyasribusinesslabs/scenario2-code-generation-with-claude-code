import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import cancelSubscriptionRouter from '@api/routes/cancelSubscription';
import { errorHandler } from '@api/middleware/errorHandler';
import { AppError } from '@api/errors';
import * as cancelSubscriptionService from '@api/services/cancelSubscriptionService';

vi.mock('@api/services/cancelSubscriptionService');
vi.mock('@api/middleware/authMiddleware', () => ({
  authMiddleware: (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    (req as express.Request & { userId: string }).userId = 'user-123';
    next();
  },
}));

const app = express();
app.use(express.json());
app.use('/api/v1/subscriptions', cancelSubscriptionRouter);
app.use(errorHandler);

describe('PATCH /api/v1/subscriptions/:id/cancel', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should cancel subscription when user is authenticated', async () => {
    const mockResult = {
      id: 'sub-abc',
      status: 'cancelled' as const,
      cancelledAt: '2026-06-24T00:00:00.000Z',
      reason: 'Too expensive',
    };
    vi.mocked(cancelSubscriptionService.cancelSubscription).mockResolvedValue(mockResult);

    const res = await request(app)
      .patch('/api/v1/subscriptions/sub-abc/cancel')
      .set('Authorization', 'Bearer valid-token')
      .send({ reason: 'Too expensive' });

    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      data: { id: 'sub-abc', status: 'cancelled' },
    });
  });

  it('should return 400 when reason exceeds max length', async () => {
    const res = await request(app)
      .patch('/api/v1/subscriptions/sub-abc/cancel')
      .set('Authorization', 'Bearer valid-token')
      .send({ reason: 'x'.repeat(501) });

    expect(res.status).toEqual(400);
    expect(res.body).toMatchObject({
      success: false,
      error: { code: 'VALIDATION_ERROR' },
    });
  });

  it('should cancel subscription when reason is omitted', async () => {
    const mockResult = {
      id: 'sub-abc',
      status: 'cancelled' as const,
      cancelledAt: '2026-06-24T00:00:00.000Z',
      reason: undefined,
    };
    vi.mocked(cancelSubscriptionService.cancelSubscription).mockResolvedValue(mockResult);

    const res = await request(app)
      .patch('/api/v1/subscriptions/sub-abc/cancel')
      .set('Authorization', 'Bearer valid-token')
      .send({});

    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject({ success: true, data: { id: 'sub-abc', status: 'cancelled' } });
  });

  it('should call cancelSubscription service with correct arguments', async () => {
    const mockResult = {
      id: 'sub-abc',
      status: 'cancelled' as const,
      cancelledAt: '2026-06-24T00:00:00.000Z',
      reason: 'Too expensive',
    };
    vi.mocked(cancelSubscriptionService.cancelSubscription).mockResolvedValue(mockResult);

    await request(app)
      .patch('/api/v1/subscriptions/sub-abc/cancel')
      .set('Authorization', 'Bearer valid-token')
      .send({ reason: 'Too expensive' });

    expect(cancelSubscriptionService.cancelSubscription).toHaveBeenCalledWith({
      subscriptionId: 'sub-abc',
      userId: 'user-123',
      reason: 'Too expensive',
    });
  });

  it('should return 404 when subscription is not found', async () => {
    vi.mocked(cancelSubscriptionService.cancelSubscription).mockRejectedValue(
      new AppError('Subscription not found', 404)
    );

    const res = await request(app)
      .patch('/api/v1/subscriptions/sub-does-not-exist/cancel')
      .set('Authorization', 'Bearer valid-token')
      .send({});

    expect(res.status).toEqual(404);
    expect(res.body).toMatchObject({
      success: false,
      error: { code: 'APP_ERROR', message: 'Subscription not found' },
    });
  });

  it('should return 403 when subscription belongs to a different account', async () => {
    vi.mocked(cancelSubscriptionService.cancelSubscription).mockRejectedValue(
      new AppError('Forbidden', 403)
    );

    const res = await request(app)
      .patch('/api/v1/subscriptions/sub-other-user/cancel')
      .set('Authorization', 'Bearer valid-token')
      .send({});

    expect(res.status).toEqual(403);
    expect(res.body).toMatchObject({
      success: false,
      error: { code: 'APP_ERROR', message: 'Forbidden' },
    });
  });

  it('should return 400 when subscription is already cancelled', async () => {
    vi.mocked(cancelSubscriptionService.cancelSubscription).mockRejectedValue(
      new AppError('Subscription is already cancelled', 400)
    );

    const res = await request(app)
      .patch('/api/v1/subscriptions/sub-abc/cancel')
      .set('Authorization', 'Bearer valid-token')
      .send({});

    expect(res.status).toEqual(400);
    expect(res.body).toMatchObject({
      success: false,
      error: { code: 'APP_ERROR', message: 'Subscription is already cancelled' },
    });
  });

  it('should return 401 when Authorization header is missing', async () => {
    vi.resetModules();

    const unauthApp = express();
    unauthApp.use(express.json());

    const { authMiddleware } = await import('@api/middleware/authMiddleware');
    const realRouter = (await import('@api/routes/cancelSubscription')).default;
    unauthApp.use('/api/v1/subscriptions', realRouter);
    unauthApp.use(errorHandler);

    const res = await request(unauthApp)
      .patch('/api/v1/subscriptions/sub-abc/cancel')
      .send({ reason: 'Testing' });

    expect(res.status).toEqual(401);
    expect(res.body).toMatchObject({
      success: false,
      error: { code: 'APP_ERROR' },
    });
  });
});
