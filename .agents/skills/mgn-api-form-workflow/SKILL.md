---
name: mgn-api-form-workflow
description: Build MGN API-backed reads, mutations, filters, pagination, and validated forms. Use when implementing or changing server-data workflows.
---

# MGN API and Form Workflow

Follow the repository's shared request and feedback conventions while preserving the backend contract.

## Reads and list state

- Use `useQuery(url)` for ordinary reads. Pass `undefined` when a conditional request should not run; use its explicit skip argument only when the component needs to retain the URL while disabling auto-fetch.
- Treat `isLoading` as the initial load and `isFetching` as background/refetch activity. Keep existing content visible under a lightweight fetching overlay when that matches the surrounding page.
- For filterable lists, use `useFilterState` so URL parameters remain shareable. Reset `page` when another filter changes, and use `TablePagination` for the established pagination behavior.
- Render an intentional empty state rather than an empty grid or table.

## Mutations

- Use `useMutate` for ordinary `POST`, `PUT`, and `DELETE` operations. Disable the initiating control while `isLoading` to prevent duplicate submissions.
- Decide how successful data becomes current: navigate to the canonical screen, call the list/detail `refetch`, or update the relevant slice. Do not leave stale UI behind.
- Use the shared toast system for user-visible outcomes. Avoid logging complete responses that may contain user or auth data.
- Preserve the server's expected payload names and body type. For `FormData`, let the browser/request layer set the multipart boundary rather than forcing a JSON content type.

## Forms and validation

- Prefer `react-hook-form` with a nearby Yup schema, matching the existing feature structure.
- Use shared controls such as `FormInput`, `FormSelect`, `FormTextBox`, and `InputError`; use `Controller` for controlled Radix components.
- Map backend validation with `useServerValidation` and `setError`. Reset edit forms when fetched data arrives rather than relying only on `defaultValue` after mount.
- Keep create and edit mode explicit. Derive it from props or route state; do not mutate a prop inside an effect.

## Data-layer boundaries

- The base request layer lives in `src/redux/api/queryApi.ts`; auth headers are populated from encrypted storage.
- Never call React hooks inside `prepareHeaders`, endpoint builders, utility functions, or event callbacks. If lower-level storage access is needed outside React, use the non-hook `EncryptStorage` utility.
- Do not introduce a second request client for a single feature. Change the shared layer only when multiple callers need the new capability.

## Completion checks

- Exercise initial loading, success, server validation failure, general request failure, and repeat submission.
- For lists, verify URL filters, page reset, pagination, empty results, and post-mutation freshness.
- Run the validation commands from the root `AGENTS.md`.
