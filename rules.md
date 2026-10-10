# TerraQuery — Project Rules

These rules guide development, code changes, testing, and documentation for TerraQuery. Follow them whenever working on this repository.

## 1. Protect the Existing Project
- Inspect the relevant files and existing implementation before editing.
- Make the smallest targeted change that solves the verified problem.
- Preserve the existing project structure, design system, routes, and working features.
- Do not rewrite entire components or modules when a focused fix is sufficient.
- Do not remove functionality simply to make a page appear to work.

## 2. Use the Correct Technology Branding
- Product name: **TerraQuery**.
- AI provider: **Google Gemini**.
- Database: **MongoDB Atlas**.
- Remove inaccurate user-visible Oracle branding, labels, logos, and claims.
- Do not use blind global replacements; inspect each occurrence in context.
- Do not claim integrations or capabilities that are not implemented and verified.

## 3. Protect Secrets and Configuration
- Never print, paste, commit, or expose API keys, database credentials, tokens, or `.env` values.
- Keep secrets in backend environment variables.
- Do not move secrets into frontend code.
- Do not overwrite or alter `.env` files unless the task explicitly requires a safe configuration change.
- If a required environment variable is missing, report its **name** without revealing its value.

## 4. Backend and API Rules
- Preserve the existing API request and response contracts unless a verified bug requires a minimal correction.
- Check the actual backend route and expected request body before changing frontend requests.
- Use one consistent frontend API base URL/proxy configuration.
- Verify frontend URL, backend port, and CORS settings rather than guessing.
- Avoid starting duplicate backend servers. If port `5000` is already occupied, identify the process or reuse the running server instead of blindly starting another.
- Do not silently replace real API calls with mock or hardcoded successful responses.

## 5. Google Gemini and MongoDB Atlas
- Use the existing Google Gemini integration and MongoDB Atlas connection.
- Do not change database credentials, connection strings, or query generation unnecessarily.
- Validate AI-generated output before using it in database operations or visualizations.
- Never fabricate rainfall data, query results, district names, dates, or units.
- Describe only data sources and capabilities verified in the code and dataset.

## 6. Rainfall Data and Visualizations
- Use actual backend/database results for rainfall displays.
- Use the visualization metric returned by Gemini/backend when available; do not assume every response uses the same field name.
- Handle fields such as `TotalActual`, `TotalNormal`, `avgDailyActual`, `Daily Actual`, or `value` only when present and relevant to the response schema.
- Distinguish missing or invalid values from a genuine numeric zero.
- Do not silently turn missing metrics into `0.00` rainfall.
- Ensure chart titles, district labels, dates, and rainfall units match the returned data.
- If a query returns no matching data, show a clear empty-state message.

## 7. Navigation and Tabs
- Check every visible navigation tab after changing routes or shared layout.
- Current expected sections are Dashboard, Explore Data, Analytics, Architecture, Query History, and About; verify the actual routes against the codebase.
- Each tab should open the intended section and correctly show its active state.
- Avoid placeholder links or buttons that look functional but do nothing.
- Preserve working map, chart, filter, and history features.

## 8. User Interface and Accessibility
- Preserve the existing dark climate-tech style, glassmorphism, and cyan/teal accents unless a redesign is explicitly requested.
- Provide visible loading, success, empty, and error states where appropriate.
- Prevent accidental duplicate query submissions while a request is in progress.
- Use readable labels, useful chart titles, and clear error messages.
- Keep the interface responsive and avoid unnecessary layout changes.

## 9. Testing Requirements
- Do not claim a fix or test passed unless it was actually verified.
- Run available build, lint, and test commands when appropriate.
- Check browser console and backend terminal output for relevant errors.
- Test the health endpoint when diagnosing backend connectivity:
  `GET http://localhost:5000/api/health`
- Test the query endpoint using the request format expected by the project:
  `POST http://localhost:5000/api/query`
- When relevant, test these example queries:
  - `Which district had the highest rainfall?`
  - `Compare rainfall between Durg and Raipur.`
  - `Show the rainfall trend over the available years.`
  - `Find rainfall anomalies.`
- Test the main navigation sections after UI changes.
- If a test cannot be run, clearly state why and give the next step.

## 10. Error Handling
- Diagnose the root cause before applying a fix.
- Distinguish network failures, CORS issues, backend errors, database errors, AI-provider errors, invalid responses, and empty results where possible.
- Do not hide errors behind generic success messages.
- Do not invent error details; use actual logs and responses.
- Provide actionable user-facing errors without exposing secrets or internal sensitive information.

## 11. Documentation
- Keep `PRD.md`, `architecture.md`, and this `rules.md` consistent with the actual codebase.
- Mark unverified features and assumptions clearly.
- Do not claim persistent query history, real-time feeds, forecasting, authentication, or deployment capabilities unless verified.
- Update documentation when a code change materially changes the architecture or supported behavior.

## 12. Git and Change Management
- Work on the intended feature branch and check `git status` before committing.
- Avoid overwriting teammates' changes or discarding uncommitted work.
- Do not run destructive Git commands such as `reset --hard`, `clean -fd`, or force-push unless explicitly authorized and the consequences are explained.
- Review the diff before committing.
- Use clear commit messages that describe the change.
- Do not commit `.env`, secrets, generated credentials, or unrelated local files.

## 13. Required Final Report
After making changes, provide:
1. Root cause identified.
2. Files changed.
3. Summary of the fix.
4. Tests actually run and their results.
5. Any tests not run and why.
6. Remaining issues or follow-up steps.

**Core principle:** Make minimal, evidence-based changes; protect real data and secrets; preserve working functionality; and report honestly what has and has not been verified.
