# Code Review: feature/add-name-page

**Date:** 2026-04-22  
**Branch:** `feature/add-name-page`  
**Reviewer:** AI  

---

## Summary

Adds a new `/name` page capturing first name and last name. Six new files created; no existing files modified. The implementation correctly follows the established `dob` page pattern, wires into the auto-scanning page setup, and reuses the existing `PATHS.NAME` constant.

**Overall:** Good to merge after fixing the formatting issues below.

---

## Findings

### 1. Formatting — 4-space indentation vs biome config (3 files)

**Severity:** Must fix  
**Files:** `src/pages/name/page.ts`, `src/pages/name/schema.ts`, `src/pages/name/__tests__/page.test.ts`

`biome.json` specifies `"indentWidth": 2`, but all three `.ts` files use 4-space indentation. This causes `npx biome check` to report formatting errors.

**Fix:** Run `npx biome format --write src/pages/name/`.

### 2. Import order in page.ts

**Severity:** Must fix  
**File:** `src/pages/name/page.ts` (lines 1–2)

```ts
import Schema from "./schema";
import PATHS from "../paths";
```

Biome's `organizeImports` rule expects `"../paths"` before `"./schema"` (parent path sorts first).

**Fix:** Swap the two import lines, or run `npx biome check --fix src/pages/name/page.ts`.

> Note: the existing `dob/page.ts` has the same import order issue — that is pre-existing tech debt, not introduced by this PR. Still worth fixing in the new file to avoid carrying it forward.

### 3. No CSRF token in form template

**Severity:** Informational  
**File:** `src/pages/name/template.njk` (line 10)

The form does not include a CSRF token. This matches the existing `dob` template pattern — the project does not currently implement CSRF protection at the template level (it likely relies on session-based middleware). Flagging for awareness; no action needed unless CSRF is added project-wide.

### 4. No max-length validation on name fields

**Severity:** Informational  
**File:** `src/pages/name/schema.ts`

The schema validates presence (`notEmpty`) but does not enforce a maximum length. For production use, consider adding `.isLength({ max: 100 })` (or similar) to prevent excessively long input.

### 5. Test coverage is functional but minimal

**Severity:** Informational  
**File:** `src/pages/name/__tests__/page.test.ts`

Tests cover the two controller handlers (`get` → `renderPage`, `post` → `redirectPageTo`). This mirrors the `dob` test file exactly. Schema validation is implicitly tested through the middleware integration rather than unit-tested directly, which is consistent with the project convention.

---

## Checklist

- [x] Code follows TypeScript and project conventions (after formatting fix)
- [x] Error handling uses appropriate patterns (validator session pattern)
- [x] Tests cover new functionality
- [x] No security vulnerabilities or sensitive data exposure
- [x] UI changes maintain consistent navigation and user experience
- [x] i18n: English and Welsh locale files provided
- [ ] Biome formatting passes (requires fix — findings #1 and #2)
- [x] No breaking changes to existing code

---

## Recommendations

1. **Required:** Run `npx biome check --fix src/pages/name/` to auto-fix formatting and import ordering.
2. **Optional:** Consider adding `isLength({ max: 100 })` to `firstName` and `lastName` schema rules.
3. **Optional:** If the post handler should redirect to a *different* page after collecting the name (e.g., a summary or next step), update `res.redirectPageTo(PATHS.NAME)` to the appropriate target path.
