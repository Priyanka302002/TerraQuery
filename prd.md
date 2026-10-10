# TerraQuery: Remove Oracle Branding and Fix All Rainfall Tabs

Please inspect and update my existing TerraQuery project carefully. Make the changes directly in the project files, not just recommendations.

## Goal 1: Remove all user-visible Oracle branding

Search the entire frontend project for Oracle-related branding, including:

- Oracle
- Oracle AI Database
- Oracle AI Database 26ai
- Oracle Database
- Oracle Prototype Mode
- Prototype Mode (Simulated)
- Oracle logos, badges, labels, and marketing text

Remove or replace these references wherever they appear in the user interface, including the header, navigation, Dashboard, Architecture, About, query results, status indicators, tooltips, and footer.

Use accurate replacement branding:

- **TerraQuery** as the project name
- **Google Gemini** as the AI provider
- **MongoDB Atlas** as the database
- **Powered by Google Gemini + MongoDB Atlas**
- **Natural-language rainfall analytics**
- **AI-generated MongoDB query**, where appropriate

Remove misleading prototype or simulated-mode labels if the application is actually using the live backend.

Do not perform a blind global replacement. Inspect each occurrence and preserve legitimate technical details where necessary. Do not modify dependency files or third-party package contents just to remove a string.

## Goal 2: Make every navigation tab work correctly for rainfall

Inspect the navigation and all pages/components connected to these tabs:

1. Dashboard
2. Explore Data
3. Analytics
4. Architecture
5. Query History
6. About

For each tab:

- Confirm clicking the tab opens the correct page or section.
- Fix broken routes, incorrect links, missing components, and navigation state issues.
- Ensure the active tab is highlighted correctly.
- Ensure the page loads without React errors or a blank screen.
- Preserve the existing dark climate-tech design, glassmorphism, and cyan/teal styling.

### Dashboard
- Ensure the rainfall query input and Ask TerraQuery button work.
- Display real backend results when a query succeeds.
- Show clear loading and error states.
- Do not silently substitute demo data when the real request fails.

### Explore Data
- Display rainfall data from the existing backend/dataset.
- Ensure district, date, and other available filters work.
- Ensure charts and tables update correctly when filters change.
- Use existing data fields and schemas; do not invent rainfall values.

### Analytics
- Ensure rainfall analytics and charts load using real available data.
- Fix incorrect field mappings, empty charts, `NaN`, and zero values caused by reading the wrong metric field.
- Use the visualization metric returned by Gemini when available.
- Preserve correct rainfall units and labels.

### Architecture
- Display the actual TerraQuery architecture.
- Correctly identify Google Gemini as the AI provider and MongoDB Atlas as the database.
- Remove inaccurate Oracle architecture labels.
- Do not claim integrations exist unless the code confirms them.

### Query History
- Ensure previous queries are displayed using the project's existing history mechanism.
- Ensure selecting a history entry works if that feature is already supported.
- Do not fabricate history entries or claim persistent storage if it is not implemented.

### About
- Show the correct TerraQuery project description and actual technology stack.
- Remove Oracle-specific descriptions and prototype claims.

## Goal 3: Fix rainfall query and backend connectivity

The backend starts with `node server.js` and listens on port `5000`.

Health endpoint:
`http://localhost:5000/api/health`

Query endpoint:
`POST http://localhost:5000/api/query`

The health endpoint previously returned a healthy status, with MongoDB Atlas online and Google Gemini query generation enabled. However, the frontend displayed "Failed to fetch".

Inspect the actual frontend API service, request URLs, environment variables, CORS configuration, and development proxy. Identify and fix the verified cause of the frontend connection failure.

Important:
- Avoid starting duplicate backend instances on port 5000.
- Keep the frontend and backend API URLs consistent.
- Preserve the existing API request and response contracts unless a verified bug requires a minimal correction.
- Never expose API keys or `.env` secrets.
- Do not change MongoDB query generation unnecessarily.

Test these queries:
1. "Which district had the highest rainfall?"
2. "Compare rainfall between Durg and Raipur."
3. "Show the rainfall trend over the available years."
4. "Find rainfall anomalies."

Use the existing supported data and query capabilities. If a query is unsupported by the dataset, show a clear message instead of fabricated results.

## Constraints

- Make minimal, targeted changes.
- Preserve the existing project structure and UI design.
- Do not remove functional features to make a page appear to work.
- Do not replace real API calls with hardcoded sample responses.
- Do not change credentials, database configuration, or `.env` contents.
- Fix root causes instead of hiding errors.
- Do not claim anything is fixed unless you have tested it.

## Verification and final report

After making the changes:

1. Search the application for remaining user-visible Oracle branding.
2. Test all six navigation tabs.
3. Test rainfall query submission and API connectivity.
4. Test the two district comparison and highest-rainfall queries.
5. Check browser console and terminal errors.
6. Run the available build, lint, or test commands.

Give me a concise report listing:
- Files modified
- Oracle branding removed or retained for a justified technical reason
- Navigation tabs tested and their results
- Rainfall queries tested and their results
- Root cause of any connection or chart errors
- Exact commands to start the backend and frontend
- Any issues that still need attention

Implement the fixes directly, carefully, and without redesigning the application.