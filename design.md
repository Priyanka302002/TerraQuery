# TerraQuery — Design Guidelines

This document defines the visual and interaction guidelines for the TerraQuery frontend. Preserve the existing design where it is working; use these guidelines to keep new changes consistent.

## 1. Design Direction

**Product feel:** climate-tech analytics — modern, focused, trustworthy, and data-oriented.

**Visual style:**
- Dark interface with a restrained glassmorphism treatment.
- Cyan and teal accents for emphasis and interactive states.
- Clear hierarchy between navigation, query input, results, charts, and supporting information.
- Data visualizations should prioritize readability and accuracy over decoration.

Do not redesign the application from scratch unless explicitly requested.

## 2. Brand Identity

- **Product name:** TerraQuery
- **AI provider:** Google Gemini
- **Database:** MongoDB Atlas
- **Suggested descriptor:** Natural-language rainfall and climate-data analytics
- **Suggested technology line:** Powered by Google Gemini + MongoDB Atlas

Remove inaccurate user-visible Oracle branding, logos, badges, and prototype-mode claims. Do not perform blind global replacements; review each occurrence in context and preserve legitimate technical references if required internally.

## 3. Color and Surface Guidance

Use the colors already established in the codebase wherever possible. If a new component needs design tokens, use the existing theme variables before introducing new ones.

Suggested direction:
- **Primary accent:** cyan
- **Secondary accent:** teal
- **Base surfaces:** deep navy / charcoal
- **Elevated surfaces:** subtly lighter dark panels
- **Text:** high-contrast near-white for primary content and muted gray for supporting text
- **Borders:** low-contrast, subtle outlines
- **Status colors:** use existing semantic success, warning, and error colors

Avoid:
- Large areas of saturated neon color.
- Excessive glow, gradients, blur, or glass effects that reduce readability.
- Using color alone to communicate success or failure.

## 4. Layout and Navigation

Expected main sections (verify actual routes/components in the codebase):
1. Dashboard
2. Explore Data
3. Analytics
4. Architecture
5. Query History
6. About

Guidelines:
- Keep navigation placement and behavior consistent across pages.
- Make the active tab visually distinct.
- Ensure every visible tab and button has a working action.
- Maintain consistent spacing, alignment, and content widths.
- Keep page titles and section headings easy to scan.
- Avoid adding duplicate navigation elements.

## 5. Dashboard and Query Experience

The Dashboard should make the main action obvious: ask a question about available rainfall or climate data.

- Provide a clear query input and submit action.
- Show a visible loading state while a query is running.
- Prevent accidental repeated submissions while loading.
- Display the returned answer clearly.
- Present charts and tables only when supported by the response.
- Show a useful empty state when no matching data is available.
- Show an actionable error when the backend request fails.
- Never present mock results as real backend results.

Example supported-intent queries to test against the available dataset:
- “Which district had the highest rainfall?”
- “Compare rainfall between Durg and Raipur.”
- “Show the rainfall trend over the available years.”
- “Find rainfall anomalies.”

The application should explain when a query is unsupported by the data rather than fabricate an answer.

## 6. Charts and Data Visualization

- Use descriptive titles, meaningful axis labels, and units when known.
- Label district/category names clearly and avoid clipped text.
- Use consistent formatting for comparable values.
- Ensure charts resize correctly on smaller screens.
- Use the visualization metric returned by the backend/Gemini response when available.
- Do not assume all results use the same metric field name.
- Treat missing or nonnumeric values as missing/invalid; do not silently display them as genuine `0.00` values.
- Make it clear when a chart has no valid data to display.
- Keep legends concise and distinguish series using more than color where practical.

## 7. Data Tables and Filters

- Use readable column headings and consistent numeric formatting.
- Preserve actual returned values and units.
- Keep filter controls clearly labeled.
- Make it apparent when filters are active.
- Provide an empty state when no records match.
- Do not invent fields or records to fill visual gaps.

## 8. Feedback, States, and Accessibility

Every data-driven page should account for:
- **Loading:** explain that the request is in progress.
- **Success:** display the actual returned result.
- **Empty:** say when no matching data is available.
- **Error:** explain that the request failed and provide a useful next step where possible.

Accessibility guidelines:
- Maintain sufficient text/background contrast.
- Do not rely only on color to convey status.
- Give inputs and buttons clear labels.
- Ensure keyboard focus is visible.
- Use semantic headings and sensible tab order.
- Avoid animation that distracts from reading data.
- Respect reduced-motion preferences if the existing app supports them.

## 9. Responsive Behavior

- Support the screen sizes the existing application targets.
- Prevent horizontal overflow in charts, tables, and navigation.
- Allow navigation to adapt on smaller screens without hiding essential sections.
- Keep query input and submit controls usable on mobile.
- Ensure modal, tooltip, and dropdown content is not clipped by containers.

## 10. Content and Microcopy

Use concise, direct language. Prefer:
- “Ask TerraQuery”
- “Rainfall comparison”
- “Data unavailable”
- “Unable to reach the backend”
- “No matching records found”
- “Powered by Google Gemini + MongoDB Atlas”

Avoid:
- Inaccurate Oracle product names or branding.
- “Live” or “real-time” claims unless the data source truly supports them.
- “Forecast” claims unless a verified forecasting capability exists.
- Technical stack claims that do not match the code.
- Error messages that imply a query succeeded when it did not.

## 11. Design Consistency Checklist

Before completing a UI change, verify:
- [ ] The existing dark climate-tech visual style is preserved.
- [ ] TerraQuery branding is consistent.
- [ ] No inaccurate Oracle branding remains in the changed user-facing areas.
- [ ] Navigation tabs open the intended sections.
- [ ] Buttons and controls perform their advertised actions.
- [ ] Loading, empty, success, and error states are understandable.
- [ ] Chart titles, labels, values, and units match actual data.
- [ ] Missing metrics are not disguised as zero values.
- [ ] Layout works at the screen sizes supported by the app.
- [ ] No unrelated functionality was removed.

## 12. Implementation Rule

Inspect the current component and its shared styles before editing. Reuse existing design tokens and components. Make the smallest targeted change that meets the requirement, then run the relevant checks and report what was actually tested.

---
**Project:** TerraQuery  
**Document:** `design.md`
