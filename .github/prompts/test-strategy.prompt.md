---
agent: agent
description: Create an NHSBSA-aligned test strategy and actionable test plan for a target change.
---
# Test Strategy Planner

Create a practical test strategy for the requested target in this repository using NHSBSA testing principles.

## Inputs

- Target file, function, module, or feature description.
- Optional risk focus areas.

If no target is provided, ask for one.

## Required output

Produce the following sections in order.

1. Scope summary
2. Unit test plan
3. Component test plan
4. Dependency substitution plan
5. Coverage and quality gates
6. Suggested test file map
7. Optional implementation draft

## Rules

- Follow `.github/instructions/copilot-instructions.md`.
- Align with current Vitest conventions in this repository.
- Keep plans concrete and tied to project file structure.

## Planning guidance

### Scope summary

- Identify behavior changes and affected layers.
- Identify risk areas: validation, branching, security behavior, serialization, and error handling.

### Unit test plan

- List high-value unit scenarios by layer.
- For each scenario include:
  - test name
  - behavior under test
  - setup highlights
  - assertions

### Component test plan

- Include end-to-end component behaviors through real internal modules.
- Describe expected external interface inputs and outputs.
- Include persistence or side-effect verification.
- If component tests are not yet wired in the repository, still provide an implementation-ready plan.

### Dependency substitution plan

- Explicitly classify each dependency:
  - internal module: real in component tests
  - external dependency: controlled substitute
- State unit mocking approach and component substitute approach.

### Coverage and quality gates

- Confirm 80 percent line and 80 percent branch targets.
- Enumerate branch and edge-case scenarios required for confidence.
- Include deterministic and isolation checks.

### Suggested test file map

- Propose exact test file paths under `__tests__` near the code.
- Identify whether each file is unit or component focused.

### Optional implementation draft

- If requested, generate Vitest test code skeletons.
- Use `// given`, `// when`, `// then` comments.
- Use `mockRequest`, `mockResponse`, and `mockNext` for Express handlers and middleware tests.

## Output style

- Keep wording concise, actionable, and implementation-ready.
- Prefer bullets and short scenario statements.
- Do not include generic theory unless it directly informs the plan.
