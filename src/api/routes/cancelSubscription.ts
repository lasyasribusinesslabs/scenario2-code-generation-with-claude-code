import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler } from '@api/middleware/asyncHandler';
import { authMiddleware, AuthenticatedRequest } from '@api/middleware/authMiddleware';
import { sendSuccess } from '@api/helpers/response';
import { cancelSubscription } from '@api/services/cancelSubscriptionService';

const router = Router();

const CancelSubscriptionSchema = z.object({
  reason: z.string().min(1).max(500).optional(),
});

// PATCH /api/v1/subscriptions/:id/cancel
router.patch(
  '/:id/cancel',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { id: subscriptionId } = req.params;
    const { userId } = req as AuthenticatedRequest;
    const body = CancelSubscriptionSchema.parse(req.body);

    const cancelled = await cancelSubscription({
      subscriptionId,
      userId,
      reason: body.reason,
    });

    sendSuccess(res, cancelled);
  })
);

export default router;
