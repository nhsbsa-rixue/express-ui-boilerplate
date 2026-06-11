---
name: vitest
description: Generate and update Vitest unit, web-layer, integration, and API tests for this repository's controllers, pages, middleware, and services using NHSBSA testing strategy, project conventions, and global mock helpers.
argument-hint: "[target file or function] [behaviors to test]"
user-invokable: true
disable-model-invocation: false
---

# Skill: Write Vitest Tests

Generate unit, web-layer, integration, and API tests for the product-price-tracker project using **Vitest** and NHSBSA testing principles.

For test planning and strategy, invoke the [test-strategy prompt](../../prompts/test-strategy.prompt.md).

---

## Hard Constraints (MUST FOLLOW)

- DO NOT use Jest APIs or syntax
- DO NOT import Vitest globals (they are globally available)
- DO NOT create manual mocks for Req/Res/Next
- ALWAYS use global helpers: mockRequest, mockResponse, mockNext
- DO NOT test implementation details
- DO NOT include explanations or markdown
- Output ONLY valid TypeScript test code
- In unit and web-layer tests, DO NOT call real external dependencies (DB, HTTP, email, cron, etc.)
- In integration tests, DO NOT mock internal modules — only external boundaries
- In API tests, DO NOT mock anything — tests run against a live app instance

---

## Test Types and Folder Structure

All tests live under a top-level `tests/` directory:

```
tests/
├── unit/            — Isolated module tests, all deps mocked
├── web-layer/       — MVC tests via Supertest, services mocked
├── integration/     — Full internal stack, only external boundaries substituted
└── api/             — Black-box HTTP tests against a running app
```

When generating tests, always place files under the correct category.

---

### 1. Unit tests (`tests/unit/`)

Isolate the unit under test. Mock **all** downstream dependencies.

| What to test | Example |
|---|---|
| Service / utility functions | Business logic, transformations, calculations |
| Middleware | Validation, auth guards, error handlers |
| API client modules | Request building, response mapping, error handling |
| Schema / validators | Zod/express-validator schemas |

File naming: `tests/unit/<module-name>.test.ts`

Rules:
- Each test validates one unique behavior
- 3–6 high-value tests per function
- Test public interface only — never private/internal details
- Use synthetic fixture data — never production data
- All imported modules mocked via `vi.mock()`

---

### 2. Web-layer tests (`tests/web-layer/`)

Test the MVC pipeline (controller + view rendering + middleware chain) via **Supertest**.
Services below the controller are **mocked**.

| What to test | Example |
|---|---|
| Page controller GET | Renders correct template with model data |
| Page controller POST | Validates input, redirects on success |
| API controller endpoints | Status codes, JSON serialisation, error bodies |
| Validation error rendering | Error summary, field messages, form re-population |
| Security headers | CSP, X-Frame-Options present |

File naming: `tests/web-layer/<route-name>.test.ts`

How to write:
```typescript
import request from "supertest";
import { app } from "../../src/server"; // or the Express app export

// Mock services below the controller
vi.mock("../../src/dbRepos/index");

describe("GET /dob", () => {
  test("should return 200 and render the dob page", async () => {
    // given
    const agent = request(app);

    // when
    const response = await agent.get("/dob");

    // then
    expect(response.status).toBe(200);
    expect(response.text).toContain("Date of birth");
  });
});
```

Assert on:
- HTTP status code (200, 302, 400, 404, etc.)
- Rendered HTML contains expected headings, labels, error messages
- Redirect location header
- Form fields pre-populated after validation failure
- Security headers present
- Accessible markup (`label` associations, `aria-describedby` on errors)

---

### 3. Integration tests (`tests/integration/`)

Exercise the full internal stack as an integrated whole. **No internal module is mocked.**
Only true external boundaries are substituted (downstream APIs, databases, cloud services).

| What to test | Example |
|---|---|
| Full request lifecycle | POST → service → repository → response |
| Cross-module interactions | Controller → validator → service → DB |
| Data persistence | Write then read-back verification |
| Side-effect verification | External mock server received expected call |

File naming: `tests/integration/<feature-name>.integration.test.ts`

Rules:
- Drive through real HTTP via Supertest
- Use real internal modules (controller, service, repository, client)
- Substitute external HTTP APIs with mock server (msw or fetch-mock)
- Substitute database with Testcontainers or in-memory equivalent
- Manage fixture lifecycle and teardown within the test suite
- Assert on HTTP response AND resulting state

How to write:
```typescript
import request from "supertest";
import { app } from "../../src/server";
// NO vi.mock() for internal modules

describe("Product creation integration", () => {
  test("should persist product and return 201", async () => {
    // given
    const inputBody = { name: "Widget", price: 9.99 };

    // when
    const response = await request(app)
      .post("/api/products")
      .send(inputBody);

    // then
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ name: "Widget", price: 9.99 });
  });
});
```

---

### 4. API tests (`tests/api/`)

Black-box tests against a **running application instance**. Nothing is mocked.
Equivalent to RestAssured-style tests — verify the deployed contract.

| What to test | Example |
|---|---|
| Contract compliance | Response shape matches API spec |
| Authentication / authorisation | 401/403 for missing/invalid credentials |
| End-to-end flows | Create → Read → Update → Delete |
| Error contract | Correct error body structure for 4xx/5xx |

File naming: `tests/api/<resource-name>.api.test.ts`

Rules:
- App must be started before tests (use `beforeAll` to boot or point at running URL)
- No mocking at all — tests hit the real stack
- Use a configurable base URL (`process.env.API_BASE_URL || "http://localhost:8002"`)
- Manage test data via API calls (create before, clean up after)
- Assert on status, headers, response body shape, and content-type

How to write:
```typescript
const BASE_URL = process.env.API_BASE_URL || "http://localhost:8002";

describe("Products API", () => {
  test("GET /api/products should return 200 with array", async () => {
    // given / when
    const response = await fetch(`${BASE_URL}/api/products`);

    // then
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test("POST /api/products should return 201 with created resource", async () => {
    // given
    const inputBody = { name: "New Product", price: 19.99 };

    // when
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputBody),
    });

    // then
    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject(inputBody);
    expect(body.id).toBeDefined();
  });
});
```

---

## Coverage and Quality Gates

- Maintain at least 80 percent line coverage
- Maintain at least 80 percent branch coverage
- Focus on meaningful behavior coverage — do not game metrics
- Cover normal path, error path, and boundary branches
- Tests must be deterministic, isolated, and fast
- Unit and web-layer tests provide the bulk of branch coverage
- Integration tests verify cross-module correctness
- API tests verify deployed contract compliance

---

## Test Type Detection

When the user provides a target, infer which test types to generate:

| Source signature | Generate |
|---|---|
| `(req, res, next)` handler | Unit + Web-layer |
| Pure function / service | Unit |
| API route with data persistence | Unit + Web-layer + Integration |
| Full feature or endpoint | All four types |

When in doubt, generate unit tests at minimum and recommend additional types.

---

## Dependency Handling

Classify each dependency:

| Dependency type | Unit | Web-layer | Integration | API |
|---|---|---|---|---|
| Internal module (service, repo, util) | `vi.mock()` | `vi.mock()` | Real | Real |
| External HTTP API | `vi.mock()` | `vi.mock()` | Mock server (msw) | Real |
| Database | `vi.mock()` | `vi.mock()` | Testcontainers / in-memory | Real |
| Cloud service (AWS, etc.) | `vi.mock()` | `vi.mock()` | Floci / localstack | Real |

### Unit test mocking rules

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

Use these in **unit** and **web-layer** tests only (not integration or API tests).

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

All tests go under the top-level `tests/` directory:

| Test type | Location | File pattern |
|---|---|---|
| Unit | `tests/unit/` | `<module-name>.test.ts` |
| Web-layer | `tests/web-layer/` | `<route-name>.test.ts` |
| Integration | `tests/integration/` | `<feature-name>.integration.test.ts` |
| API | `tests/api/` | `<resource-name>.api.test.ts` |

> **Migration note:** Legacy tests under `src/**/__tests__/` remain valid. New tests should use the `tests/` structure.

---

## Test structure

- Use `describe` + `test`
- Structure every test with:
  ```
  // given
  // when
  // then
  ```
- Always await handler calls
- Reset req/res/next in `beforeEach`
- Test one behavior per test — do not combine scenarios

### Naming

- Use Should-When style: `"should redirect to dob when form is valid"`
- Names must be unambiguous and show clear purpose
- Prefix fixture variables with intent: `inputBody`, `expectedProduct`, `actualResponse`
- Prefix mocks with `mock`: `mockPaymentClient`

### Fixture data

- Declare fixture data within each test or in factory functions — avoid shared mutable fixtures
- Use factory methods with meaningful names when object creation spans multiple lines
- Never use production data

### Date and time

- When code depends on date or time, control it via `vi.useFakeTimers()` or offset input data
- Never hardcode future dates that will eventually expire

---

## Assertion patterns

### Unit test assertions

| Test target | Assert on |
|---|---|
| API controller | `res.status()` with `StatusCodes` enum, `res.json()` with expected data |
| Page controller GET | `res.renderPage()` called |
| Page controller POST | `res.redirectPageTo()` with page path |
| Middleware (happy) | `next()` called |
| Middleware (error) | `res.redirect()` or `res.status()` with error |
| API client | Request method, path, headers, payload; success response mapping; error handling |
| Data access | Entity mapping, filtering, joins, ordering, aggregation, empty results, writes |

### Web-layer test assertions

| Concern | Assert on |
|---|---|
| HTTP status | Correct code for success, redirect, validation failure, not found |
| Rendered HTML | Page title, headings, labels, error messages in correct locations |
| Redirect | Location header points to expected destination |
| Form re-population | Fields contain previous input after validation failure |
| Security headers | CSP, X-Frame-Options, X-Content-Type-Options present |
| Accessibility | Labels associated with inputs, `aria-describedby` on error fields |

### Integration test assertions

| Concern | Assert on |
|---|---|
| HTTP response | Status code, headers, body structure |
| Persistence | Resulting data state matches expectations after write |
| External calls | Mock server received correct request body and headers |
| Side effects | Downstream events or messages were triggered correctly |

### API test assertions

| Concern | Assert on |
|---|---|
| Contract | Response body shape matches API specification |
| Status codes | Correct codes for success, client error, server error |
| Content-Type | `application/json` or expected media type |
| Auth behavior | 401 for missing credentials, 403 for insufficient permissions |
| Idempotency | Repeated calls produce consistent results |

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
- Unit test coverage is present for changed behavior
- Web-layer test is included for any route handler
- Integration test is included where cross-module interaction is significant
- API test is included for publicly exposed endpoints
- Tests are deterministic, isolated, and fast
- Assertions are specific and behavior-focused
- No test calls real external unmanaged services

---

## Reference examples

Study these existing tests for patterns (legacy location — new tests use `tests/` structure):

- API controller: [src/controllers/products/__tests__/index.test.ts](../../../src/controllers/products/__tests__/index.test.ts)
- Page controller: [src/pages/dob/__tests__/page.test.ts](../../../src/pages/dob/__tests__/page.test.ts)
- Middleware: [src/validator/__tests__/index.test.ts](../../../src/validator/__tests__/index.test.ts)
- Service with spies: [src/cronJobs/__tests__/index.test.ts](../../../src/cronJobs/__tests__/index.test.ts)

---

## Source Code

```ts
{{code}}
```