import { AppError } from '@api/errors';

export interface CancelSubscriptionInput {
  subscriptionId: string;
  userId: string;
  reason?: string;
}

export interface CancelledSubscription {
  id: string;
  status: 'cancelled';
  cancelledAt: string;
  reason?: string;
}

export async function cancelSubscription(
  input: CancelSubscriptionInput
): Promise<CancelledSubscription> {
  const { subscriptionId, userId, reason } = input;

  // TODO: fetch subscription from repository and verify it belongs to userId
  // const subscription = await SubscriptionRepository.findById(prisma, subscriptionId);
  // if (!subscription) throw new AppError('Subscription not found', 404);
  // if (subscription.userId !== userId) throw new AppError('Forbidden', 403);
  // if (subscription.status === 'cancelled') throw new AppError('Subscription is already cancelled', 400);

  // TODO: soft-update status via repository
  // const updated = await SubscriptionRepository.cancel(prisma, subscriptionId, reason);

  return {
    id: subscriptionId,
    status: 'cancelled',
    cancelledAt: new Date().toISOString(),
    reason,
  };
}
