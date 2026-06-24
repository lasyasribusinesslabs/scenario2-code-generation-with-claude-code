# API Conventions — SubSync

> Auto-loaded by CLAUDE.md via @import. Applies to all files in src/api/.

## Route Structure
- All routes live in `src/api/routes/<resource>.ts`
- Use Express Router: `const router = Router()`
- Export default router from every route file
- Register all routers in `src/api/app.ts` under `/api/v1/`

## Middleware Requirements
- Every protected route must use `authMiddleware` (checks JWT from Authorization header)
- Mutating routes (POST, PATCH, DELETE) must use `validateBody(Schema)` middleware
- All public endpoints must use `rateLimitMiddleware`

## Request Validation
- Use Zod for all input schemas
- Name schemas: `<Action><Resource>Schema` (e.g. `CancelSubscriptionSchema`)
- Validation errors must return HTTP 400 with `{ success: false, error: { code, message, fields } }`

## Response Envelope
Every response must use this shape:
```json
{ "success": true, "data": {}, "meta": {} }
```
- Use `sendSuccess(res, data, meta?)` helper from `@api/helpers/response.ts`
- Never send raw `res.json({})` without the envelope

## Error Handling
- Use `AppError(message, statusCode)` for all thrown errors
- Wrap async route handlers with `asyncHandler()` from `@api/middleware/asyncHandler.ts`
- Global error handler in `src/api/middleware/errorHandler.ts` catches all AppErrors

## HTTP Status Codes
| Situation        | Code |
|-----------------|------|
| Success GET      | 200  |
| Created POST     | 201  |
| Validation error | 400  |
| Unauthorized     | 401  |
| Not found        | 404  |
| Server error     | 500  |
