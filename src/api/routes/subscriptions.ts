import { Router } from 'express';
import { z } from 'zod';
import { AppError } from '@api/errors';

const router = Router();

const GetSubscriptionsSchema = z.object({
  userId: z.string().uuid(),
});

// GET /api/v1/subscriptions
router.get('/', async (req, res, next) => {
  try {
    const { userId } = GetSubscriptionsSchema.parse(req.query);
    // TODO: delegate to subscriptionService.getByUser(userId)
    res.json({ success: true, data: [], meta: { userId } });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/subscriptions
router.post('/', async (req, res, next) => {
  try {
    // TODO: validate body, delegate to subscriptionService.create()
    res.status(201).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
});

export default router;
