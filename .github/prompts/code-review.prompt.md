---
agent: agent
---

# Code Review Task

Review the changes made on the current branch and provide detailed feedback.

## Analysis Steps

1. **Identify Current Branch**: Check if branch is `main` - if so, stop and inform the user to create a feature branch first.

2. **Analyze Changes**: Use `git diff` and related commands to examine:
   - Files modified, added, or deleted
   - Line-by-line changes in each file
   - Overall scope and purpose of changes

3. **Review Against Standards**: Evaluate changes for:
   - **Code Quality**: TypeScript conventions, type safety, no explicit `any` types
   - **Architecture Compliance**: Proper use of repository pattern, service layer, MVC separation, error handling patterns
   - **Testing**: Adequate unit/integration test coverage for new/modified code
   - **Documentation**: Updates to instruction files and README when appropriate
   - **Business Logic**: Adherence to domain workflows (batch status transitions, pensioner validation, calculation processing)
   - **Error Handling**: Use of custom error classes (NotFoundError, ValidationError, BusinessRuleError, DatabaseError)

4. **Document Findings**: Create a review report in `.github/reviews/` directory:
   - Name: `review-<branch-name>-YYYY-MM-DD-HHmm.md`
   - Structure: Summary, Detailed Findings (grouped by file/concern), Recommendations
   - Tone: Constructive and specific, cite exact files/lines where possible

## Review Checklist

- [ ] Code follows TypeScript and project conventions
- [ ] Error handling uses appropriate custom error classes
- [ ] Tests cover new functionality and edge cases
- [ ] Documentation updated if domain models, workflows, or patterns changed
- [ ] Database queries follow established patterns (if applicable)
- [ ] No security vulnerabilities or sensitive data exposure
- [ ] Performance implications considered for batch operations
- [ ] UI changes maintain consistent navigation and user experience
