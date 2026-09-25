---
name: mgn-feature-delivery
description: Implement routed MGN frontend features across the user or admin surface. Use when adding or changing pages, navigation, layouts, or feature-level state wiring.
---

# MGN Feature Delivery

Deliver a complete feature that fits the existing route, layout, store, and UI boundaries.

## Choose the surface

- Public user pages and reader pages are assembled in `src/routes/guest-route.tsx`, despite the filename, and use `userStore` through `UserLayout` or `UserGuestLayout`.
- Authenticated user-only pages are assembled in `src/routes/user-route.tsx` and use `userStore`.
- Admin pages are assembled in `src/routes/admin-route.tsx` or a feature route module under the admin page folder and use `adminStore` through `AdminLayout`.
- Put path constants in `src/routes/data/user_route.ts` or `src/routes/data/admin_route.ts`. Use `route(...)` or the existing parameter replacement style when generating parameterized links.

## Fit the existing architecture

1. Find the closest page with the same interaction shape: list, detail, modal CRUD, dashboard, profile, or media workflow.
2. Add the route constant, lazy import, and `Suspense` entry in the correct route tree. Preserve provider/context wrappers required by the feature.
3. Build the page from components in `src/components/ui/` and nearby feature components. Extend an existing variant or primitive when the behavior is genuinely shared.
4. Use the correct typed Redux hooks for the surface. Put only cross-page client state in Redux; keep local UI state in the component.
5. Cover loading, refreshing, empty, error, disabled, and success states. Public content pages should keep SEO metadata consistent with `src/pages/seo.tsx` where applicable.
6. Check the layout at mobile and desktop breakpoints and preserve keyboard focus, labels, and button semantics.

For server data, forms, filters, or CRUD behavior, also read `../mgn-api-form-workflow/SKILL.md`.

## Completion checks

- Confirm direct navigation and in-app navigation reach the same screen.
- Confirm the page mounts under the intended store and layout.
- Exercise the primary success path plus one empty/error path.
- Run the validation commands from the root `AGENTS.md`.
