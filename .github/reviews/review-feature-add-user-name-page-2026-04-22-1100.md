# Code Review: feature/add-user-name-page

**Date:** 2026-04-22  
**Branch:** `feature/add-user-name-page`  
**Reviewer:** AI

---

## Summary

Adds a `/name` page capturing first and last name, closely following the established `dob` page pattern. The implementation includes a page controller, enhanced validation schema, Nunjucks template, bilingual locale files (en/cy), and unit tests.

The changes are currently **uncommitted working directory modifications**. The `src/pages/name/` directory is untracked, while corresponding `dist/` artifacts are modified but unstaged. This means **no source TypeScript files would be committed if only the dist changes were staged** — see Finding 1 below.

**Overall verdict:** Fix the staging issue and the biome formatting error, then good to merge.

---

## Findings

### 1. Source files not staged — dist-only commit risk (Critical)

**Files:** `src/pages/name/` (untracked), `dist/src/pages/name/*.js` (modified, unstaged)

The `src/pages/name/` TypeScript source files are untracked (would not be included in a commit), while the compiled `dist/` artefacts are modified. Committing as-is would put the compiled JS output into version control without the TypeScript source, breaking the repo's source-of-truth contract.

**Fix:** Stage all files together before committing:

```sh
git add src/pages/name/ dist/src/pages/name/ .github/prompts/a11y.prompt.md
```

---

### 2. `schema.ts` — 4-space indentation (Must fix)

**File:** `src/pages/name/schema.ts`  
**Confirmed by:** `npx biome check src/pages/name/`

`biome.json` specifies `"indentWidth": 2`, but `schema.ts` uses 4-space indentation throughout.

**Fix:**

```sh
npx biome format --write src/pages/name/schema.ts
```

---

### 3. `template.njk` — 4-space indentation (Should fix)

**File:** `src/pages/name/template.njk`

The template uses 4-space indentation, while `src/pages/dob/template.njk` uses 2-space indentation. Although `.njk` files are not covered by biome, consistency with the existing pattern is preferable.

**Fix:** Reindent to 2 spaces to match `dob/template.njk`.

---

### 4. `schema.ts` — `\s` in regex allows all whitespace (Suggestion)

**File:** `src/pages/name/schema.ts` (lines 11, 19)

```ts
.matches(/^[a-zA-Z\s']+$/)
```

`\s` matches any whitespace character, including tabs (`\t`), newlines (`\n`), carriage returns (`\r`), and form feeds. For a name field, only a literal space character should be permitted.

**Fix:**

```ts
.matches(/^[a-zA-Z ']+$/)
```

---

### 5. `template.njk` — Missing `autocomplete` attributes (WCAG 1.3.5)

**File:** `src/pages/name/template.njk` (lines 20–32, 33–43)

The `firstName` and `lastName` inputs collect personal name information but have no `autocomplete` attributes. WCAG 2.2 criterion 1.3.5 (Identify Input Purpose, Level AA) requires `autocomplete` on fields that collect user personal data.

**Fix:** Add `autocomplete` to each `input` macro call:

```njk
{{ input({
  ...
  autocomplete: "given-name"
}) }}

{{ input({
  ...
  autocomplete: "family-name"
}) }}
```

---

### 6. `schema.ts` — `.bail()` position means `isLength` and `matches` run when field is empty (Informational)

**File:** `src/pages/name/schema.ts`

The `.bail()` is placed between `.notEmpty()` and `.withMessage()`, which stops further validators when the field is empty — this is correct. However, the chain continues to `.isLength()` and `.matches()` only if `.notEmpty()` passes, which is the intended behaviour. The implementation is consistent with the `dob/schema.ts` pattern.

No action required; noting for clarity.

---

### 7. `page.ts` — Import order (Informational)

**File:** `src/pages/name/page.ts` (lines 1–2)

```ts
import PATHS from "../paths";
import Schema from "./schema";
```

Import order matches `dist/` output and biome did not flag this (biome `organizeImports` is set to `on` but did not report an error here). Pre-existing identical order exists in `dob/page.ts`. No action required.

---

### 8. No schema unit tests (Informational)

**File:** `src/pages/name/__tests__/page.test.ts`

The test suite covers the `get` and `post` controller methods but not the validation schema rules (required, maxLength, format). This is consistent with the `dob` page test suite and appears to be the current project convention. Flagging for awareness.

---

## Review Checklist

- [x] Code follows TypeScript and project conventions
- [x] Error handling follows established pattern (no custom errors required for this page type)
- [x] Tests cover new functionality (get/post controllers)
- [x] Locale files provided in both English and Welsh
- [ ] Source files staged alongside dist artefacts (**Finding 1**)
- [ ] `schema.ts` indentation fixed to 2 spaces (**Finding 2**)
- [ ] `template.njk` indentation aligned to 2 spaces (**Finding 3**)
- [ ] `\s` in regex narrowed to literal space (**Finding 4**)
- [ ] `autocomplete` attributes added to name inputs (**Finding 5**)
- [x] No sensitive data exposure
- [x] CSRF handling consistent with existing pages
- [x] Navigation pattern (back link, form action) consistent with `dob` template
