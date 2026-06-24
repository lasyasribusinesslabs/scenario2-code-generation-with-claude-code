---
globs: ["src/ui/**"]
---
# UI Conventions
## Stack
- React 18 with functional components only.
- Tailwind CSS for all styling, no inline styles, no CSS modules.
- TypeScript strict, every prop typed via interface.
## Component Rules
interface CancelSubscriptionButtonProps {
  subscriptionId: string;
  onSuccess: () => void;
}
export function CancelSubscriptionButton({ subscriptionId, onSuccess }: CancelSubscriptionButtonProps) {}
## Rules
- Component files: PascalCase.tsx
- One component per file.
- No business logic in components, call service hooks only.
- All API calls via custom hooks in src/ui/hooks/.
- Never use any, use unknown plus type guard if shape is unclear.
- Loading and error states required for every data-fetching component.
