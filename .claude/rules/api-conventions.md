---
globs: ["src/api/**"]
---
# API Conventions
## Route Structure
- All routes under src/api/routes/
- Always prefix endpoints: /api/v1/<resource>
- File naming: <resource>.routes.ts
## Required Middleware
router.post('/api/v1/subscriptions/cancel', authMiddleware, asyncHandler(cancelSubscriptionController));
## Request Validation
- Use Zod for all request bodies.
- Schema name: <Action><Resource>Schema e.g. CancelSubscriptionSchema
- Validate in the controller before calling any service.
## Response Envelope
- Always use sendSuccess / sendError helpers.
- return sendSuccess(res, { subscriptionId }, 200);
- return sendError(res, new AppError('NOT_FOUND', 404));
## Controllers
- Stay thin, no business logic.
- Delegate immediately to the service layer.
- Never import Prisma directly in a controller.
## Error Handling
- Use AppError from @api/errors.ts, never throw raw Error.
- Let asyncHandler catch thrown errors and forward to error middleware.
