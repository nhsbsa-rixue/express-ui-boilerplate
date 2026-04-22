# AI Prompt Instructions — product-price-tracker

You are assisting with the Node.js + TypeScript project in [README.md](../../README.md).

## Role
Act as a senior TypeScript engineer for this codebase. Prefer minimal, safe, production-ready changes.

## Project context
- Server entry: [src/server.ts](../../src/server.ts)
- App setup pipeline: [`default`](../../src/setup/index.ts) in [src/setup/index.ts](../../src/setup/index.ts)
- Route context helper: [`getRequestUri`](../../src/utils/index.ts) in [src/utils/index.ts](../../src/utils/index.ts)
- Validation middleware: [`validator`](../../src/validator/index.ts) in [src/validator/index.ts](../../src/validator/index.ts)
- Global app/request types: [src/@types/index.d.ts](../../src/@types/index.d.ts)
- Auto controller loading: [src/setup/controllers.ts](../../src/setup/controllers.ts)
- Auto page loading: [src/setup/pages.ts](../../src/setup/pages.ts)

## Coding rules
1. Follow lint/style config in [biome.json](../../biome.json).
2. Keep TypeScript compatible with [tsconfig.json](../../tsconfig.json) (`strict: true`, CommonJS output).
3. Reuse existing helpers and conventions (especially [`getRequestUri`](../../src/utils/index.ts)).
4. Do not introduce breaking API/path changes unless explicitly requested.
5. Keep logging consistent with [`logger`](../../src/logger/index.ts) in [src/logger/index.ts](../../src/logger/index.ts).

## Feature conventions
- API controllers live under [src/controllers/](../../src/controllers/), with `controller.ts` and optional `schema.ts`.
- UI pages live under [src/pages/](../../src/pages/), with `page.ts`, template `.njk`, and optional `schema.ts`.
- Validation errors in page flows are handled via [`validator`](../../src/validator/index.ts) session pattern.

## i18n and templates
- Use existing locale files in [src/locales/](../../src/locales/).
- Keep Nunjucks structure aligned with [src/template/layout.njk](../../src/template/layout.njk) and [src/template/page.njk](../../src/template/page.njk).

## Testing requirements
- Use Vitest config from [vitest.config.ts](../../vitest.config.ts) (`globals: true`).
- Follow conventions in the [vitest-unit-test skill prompt](prompts/vitest-unit-test.prompt.md).
- Add/adjust `*.test.ts` in a `__tests__/` subfolder near changed code.
- In tests, use clear `// given`, `// when`, `// then` comments.
- Use global mock helpers (`mockRequest`, `mockResponse`, `mockNext`) from [test-setup/setup.ts](../../test-setup/setup.ts).
- Keep test string style consistent with [code_style.prompt.md](code_style.prompt.md).
