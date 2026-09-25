# MGN Frontend Agent Guide

This file applies to the entire repository. It records project-specific facts and decision boundaries; detailed repeatable workflows live in `.agents/skills/`.

## Project shape

MGN Frontend is a browser-only React 18 + TypeScript + Vite single-page application for a manga/manhwa platform. It has two product surfaces:

- The reader-facing site: discovery, authentication, profiles, comments, subscriptions, and the chapter reader.
- The admin application under `/admin`: content, chapters, users, subscriptions, reporting, settings, and publishing bots.

Important locations:

- `src/routes/`: route assembly. Route strings belong in `src/routes/data/`.
- `src/pages/users/` and `src/pages/admin/`: feature pages for each surface.
- `src/layouts/`: the user and admin route shells.
- `src/components/ui/`: shared Radix/shadcn-style primitives. Prefer these over one-off controls.
- `src/hooks/`: shared API, filtering, auth, reader, and browser-behavior hooks.
- `src/redux/`: the shared RTK Query layer plus separate user and admin stores.
- `src/styles/user-global.css` and `src/styles/admin-global.css`: surface-specific Tailwind tokens and global rules.
- `src/config/index.ts`: runtime configuration sourced from `VITE_*` variables.

Use the `@/` alias for imports from `src/`.

## Architecture invariants

- Keep the user and admin Redux stores separate. Shared reducers and middleware belong in `src/redux/stores/sharedStore.ts`; surface-only state belongs in its corresponding store.
- Use `useUserAppDispatch` / `useUserAppSelector` in the reader-facing app and `useAppDispatch` / `useAppSelector` in the admin app.
- Preserve the provider boundaries in the route definitions. Public user pages still run inside `userStore`.
- Add route paths to the appropriate route collection before wiring pages. Page-level routes are lazy-loaded and wrapped in `Suspense` in the existing route tree.
- Use `useQuery` for ordinary reads and `useMutate` for ordinary writes unless the task explicitly changes the data layer. Do not call React hooks from RTK Query configuration callbacks or other non-React functions.
- Authentication depends on encrypted local storage keys (`auth-token`, `auth-type`) plus the `expiresAt` timestamp. Never log or commit tokens, encryption keys, or `.env` values.
- Reuse existing primitives, design tokens, loading skeletons, empty states, toasts, and dialogs. Preserve both light admin styling and dark reader styling.
- Treat reader navigation, subscription gates, auth guards, publishing, and destructive admin actions as behavior-sensitive areas. Follow the relevant project skill and verify their edge states.

## Change discipline

- Inspect the closest analogous feature before adding a new pattern. Keep API payload and response shapes compatible with the backend contract.
- Keep edits focused. Do not rename established API fields, endpoint paths, route parameters, or existing filenames merely to normalize spelling.
- Maintain responsive behavior from mobile through desktop and preserve keyboard, pointer, and accessible-label behavior when touching interactive UI.
- Avoid adding a new state, form, chart, or component library when the repository already has an equivalent.
- Do not add a test framework or production dependency unless the requested work needs it and the tradeoff is explicit.

## Validation

- For code changes, run `npm run build`; it is the current type-check and production bundle gate.
- Lint every changed TypeScript/TSX file with `npx eslint <files> --report-unused-disable-directives --max-warnings 0`.
- `npm run lint` currently reports legacy errors and warnings outside most focused changes. Run it when doing lint cleanup or broad refactors, but distinguish pre-existing findings from regressions.
- There is no automated test script today. Perform a focused smoke check for the affected route and state transitions; do not claim automated test coverage.
- Documentation-only changes need structural validation of the Markdown/skill files, not an application rebuild.

## Repository skills

- Use `.agents/skills/mgn-feature-delivery/SKILL.md` when a task adds or changes a routed user/admin feature.
- Use `.agents/skills/mgn-api-form-workflow/SKILL.md` for API reads, mutations, filters, pagination, or validated forms.
- Use `.agents/skills/mgn-reader-changes/SKILL.md` for chapter reading, reader settings, shortcuts, navigation, image loading, caching, magnification, or premium access behavior.

## Code review rules

- Flag components that use the wrong surface's typed Redux hooks or mount outside the required store/provider.
- Flag new hard-coded route strings when the path should come from a route collection.
- Flag hooks called conditionally or from non-hook callbacks, effects with leaked listeners/timers, and stale async results that can update an obsolete screen.
- Flag mutations that allow duplicate submission, omit visible failure feedback, or leave list/detail data stale after success.
- Flag exposure of secrets or auth material, unsafe rendering of server HTML, and regressions that bypass subscription or admin permission checks.
- Flag reader changes that mix zero-based image indexes with the one-based `currentPage` state or break long-strip, single-page, mobile touch, or keyboard navigation modes.
