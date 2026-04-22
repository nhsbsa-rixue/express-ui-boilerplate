---
name: vitest
description: Generate and update Vitest unit tests for this repository's controllers, pages, middleware, and services using project test conventions and global mock helpers.
argument-hint: "[target file or function] [behaviors to test]"
user-invokable: true
disable-model-invocation: false
---

# Skill: Write Vitest Unit Tests (Improved)

Generate unit tests for the product-price-tracker project using **Vitest**.

---

## Hard Constraints (MUST FOLLOW)

- DO NOT use Jest APIs or syntax
- DO NOT import Vitest globals (they are globally available)
- DO NOT create manual mocks for Req/Res/Next
- ALWAYS use global helpers: mockRequest, mockResponse, mockNext
- DO NOT call real external dependencies (DB, HTTP, email, cron, etc.)
- DO NOT test implementation details
- DO NOT include explanations or markdown
- Output ONLY valid TypeScript test code

---

## Test Strategy

Prioritize:

1. Behavioral outcomes
2. Edge cases (empty, invalid, boundary)
3. Error handling
4. Branch coverage

Rules:
- Each test must validate a unique behavior
- Avoid redundant tests
- Generate 3–6 high-value tests per function

---

## Test Type Detection

Infer automatically:

- (req, res, next) → Express controller/middleware
- return value → service/pure function

---

## Dependency Handling

- All imported modules MUST be mocked using `vi.mock(...)`
- Use `vi.spyOn` for partial mocks
- Never call real implementations

### Mock cast pattern

When a mocked function needs to be configured (e.g. `mockReturnValue`), cast it:

```typescript
const mockedFn = originalFn as unknown as Mock;
mockedFn.mockReturnValue({ array: () => [] });
```

### `vi.spyOn` with sequential returns

Use `mockImplementationOnce` for ordered return values:

```typescript
const readSpy = vi.spyOn(dbRepo, "readCsvToArray");
readSpy.mockImplementationOnce(() => Promise.resolve(mockProducts));
readSpy.mockImplementationOnce(() => Promise.resolve(mockWatching));
```

---

## Framework & globals

Vitest with `globals: true` — see [vitest.config.ts](../../../vitest.config.ts).
Setup file: [test-setup/setup.ts](../../../test-setup/setup.ts).

The following are available globally — DO NOT import:

- `describe`, `test`, `it`, `expect`
- `beforeEach`, `afterEach`, `beforeAll`, `afterAll`
- `vi`, `Mock`, `MockedFunction`

> **Exception:** `import { vi } from "vitest"` is acceptable at the top of a file that uses `vi.mock()`, because Vitest hoists `vi.mock()` calls and the global `vi` may not resolve in time.

> **Auto-reset:** `clearMocks: true` is configured in vitest.config.ts — mocks are automatically cleared between tests. Do NOT call `vi.clearAllMocks()` manually.

---

## Global mock helpers

Registered as globals via [test-setup/setup.ts](../../../test-setup/setup.ts) — DO NOT import.
Source: [test-setup/test-utils.ts](../../../test-setup/test-utils.ts).

### `mockRequest(overrides?)`

Returns a `Req` with sensible defaults. Supports overrides for:

| Property | Default | Notes |
|---|---|---|
| `body` | `{}` | Request body |
| `params` | `{}` | Route params |
| `query` | `{}` | Query string |
| `headers` | `{}` | HTTP headers |
| `session` | `{ validationErrors: undefined, formData: undefined, destroy: vi.fn() }` | Session object |
| `t` | `vi.fn((key) => key)` | i18n translation function |
| `protocol` | `"http"` | |
| `originalUrl` | `"/"` | |
| `products` | — | Custom: pass via overrides |
| `users` | — | Custom: pass via overrides |
| `watching` | — | Custom: pass via overrides |

### `mockResponse()`

Returns a `Res` with chainable mock methods (all return `this`):

`status`, `json`, `send`, `redirect`, `render`, `set`, `redirectPageTo`

### `mockNext()`

Returns a mock `NextFunction` (`vi.fn()`).

---

## Global types

Available globally via [src/@types/index.d.ts](../../src/@types/index.d.ts):

Req, Res, Next, Controller, Page, App, User, Product, WatchEntry, EmailTemplate, AlertType, Middleware

---

## File location & naming

- Place tests in __tests__/ next to source
- Use *.test.ts naming

---

## Test structure

- Use describe + test
- Include:
  // given
  // when
  // then

- Always await handler calls
- Reset req/res/next in beforeEach

---

## Assertion patterns

| Test target | Assert on |
|---|---|
| API controller | `res.status()` with `StatusCodes` enum, `res.json()` with expected data |
| Page controller GET | `res.render()` with template name |
| Page controller POST | `res.redirectPageTo()` with page path |
| Middleware (happy) | `next()` called |
| Middleware (error) | `res.redirect()` or `res.status()` with error |

> **Important:** Always use the `StatusCodes` enum from `http-status-codes` (e.g. `StatusCodes.OK`, `StatusCodes.CREATED`, `StatusCodes.BAD_REQUEST`) — never use raw numbers like `200` or `400`.

---

## Code style

All generated test code must strictly follow the Biome rules defined in [biome.json](../../biome.json):

- Double quotes for strings
- 2-space indentation
- Semicolons required
- Trailing commas on all multi-line lists
- Line width up to 120 characters
- Must pass `biome check --write` unchanged

---

## Output Checklist

Ensure:

- Imports are correct
- Async functions are awaited
- Mocks are defined before use
- No unused variables
- Code runs without modification
- Formatting follows the Biome config in [biome.json](../../biome.json) — generated code must remain unchanged after running `biome check --write`

---

## Reference examples

Study these existing tests before generating new ones:

- API controller: [src/controllers/products/__tests__/index.test.ts](../../../src/controllers/products/__tests__/index.test.ts)
- Page controller: [src/pages/dob/__tests__/page.test.ts](../../../src/pages/dob/__tests__/page.test.ts)
- Middleware: [src/validator/__tests__/index.test.ts](../../../src/validator/__tests__/index.test.ts)
- Service with spies: [src/cronJobs/__tests__/index.test.ts](../../../src/cronJobs/__tests__/index.test.ts)

---

## Source Code

```ts
{{code}}
```