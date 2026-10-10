import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const DATASET_SCHEMA = `
MongoDB database: terraquery
Collection: rainfall

Each document has these fields:

_id: number
State: string (e.g. "CHHATTISGARH" or "CHHATISGARH", "ODISHA")
District: string (e.g. "DURG", "RAIPUR", "SAKTI", "NABARANGAPUR")
Date: string (YYYY-MM-DD, e.g. "2026-08-24" or "2026-09-25")

Daily Actual: number (daily rainfall in mm)
Daily Normal: number (normal rainfall in mm)
Daily Departure Per: number (percentage departure relative to normal, e.g. +71, -55, 259)
Daily Category: string ("LE"=Large Excess, "E"=Excess, "N"=Normal, "D"=Deficient, "LD"=Large Deficient, "NR"=No Rain)

Weekly \nActual: number
Weekly Normal: number
Weekly Departure Per: number
Weekly Category: string

Cumulative Date: string
Cumulative Actual: number
Cumulative Normal: number
Cumulative Departue Per: number
Cumulative \nCategory: string

Monthly Date: string
Monthly Acutual: number
Monthly Normal: number
Monthly \nDeparture Per: number
Monthly Category: string

IMPORTANT:
- State and District values in the database are stored in UPPERCASE (e.g. "DURG", "RAIPUR").
- State names for Chhattisgarh may be stored as "CHHATTISGARH" or "CHHATISGARH". When filtering by Chhattisgarh, match both using { "$in": ["CHHATTISGARH", "CHHATISGARH"] }.
- When querying rainfall anomalies: Anomalies represent significant departures from normal. Look for records where "Daily Category" is in ["LE", "LD"] or where "Daily Departure Per" has large departures (e.g. >= 50 or <= -50). Sort by "Daily Departure Per" descending or "Daily Actual" descending.
`;

function safeParseJSON(rawText) {
  let cleaned = (rawText || '').trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch (err1) {
    try {
      // Auto-quote unquoted MongoDB keys (e.g. $or, $gt, $lt, $regex, $options, $in, $match, etc.)
      const repaired = cleaned
        .replace(/([{,]\s*)([$a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
        .replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"');
      return JSON.parse(repaired);
    } catch (err2) {
      throw err1;
    }
  }
}

export async function generateMongoQuery(question) {
  const prompt = `
You are the query and visualization planner for TerraQuery, a natural-language rainfall analytics system.

${DATASET_SCHEMA}

User question:
"${question}"

Your job has TWO parts:

PART 1 — Generate a MongoDB query
PART 2 — Decide the most useful visualization for the result.

Return ONLY standard RFC 8259 compliant valid JSON. Every key and string literal MUST be enclosed in double quotes (e.g. "$match", "$sort", "$limit", "$group", "$or", "$in", "$gt"). Never omit double quotes around keys.

The JSON must have this exact structure:

{
  "query": {
    "operation": "find" | "aggregate",
    "filter": {},
    "projection": {},
    "sort": {},
    "limit": 10,
    "pipeline": []
  },
  "visualization": {
    "type": "kpi" | "map_highlight" | "comparison_bar" | "ranking_bar" | "line_trend" | "map" | "table" | "kpi_table" | "insight",
    "title": "string",
    "metric": "string",
    "unit": "string"
  }
}

MONGODB QUERY RULES:

1. Use ONLY the "rainfall" collection fields listed above.
2. Generate READ-ONLY MongoDB operations ("find" or "aggregate").
3. Prefer aggregation pipelines for analytical, comparison, and trend questions.
4. Do not use insert, update, delete, drop, eval, or JavaScript execution.
5. For aggregate queries, use "operation": "aggregate" and put the pipeline in "pipeline".
6. For find queries, use "operation": "find" and put the filter in "filter".
7. Do not include markdown fences or conversational explanations.
8. When the user asks "highest rainfall", "maximum rainfall", or "which record had the highest rainfall", interpret it as the single record with the maximum value of "Daily Actual", returning the district, state, date, and rainfall amount.
9. When the user asks "which district had the highest rainfall", return the district associated with the single highest "Daily Actual" record.
10. When comparing districts (e.g. "Compare rainfall between Durg and Raipur"), match both uppercase districts, aggregate totals/averages using $group, and calculate the requested statistics for each district.
11. When the user asks for "rainfall anomalies" or "abnormal/unusual rainfall":
    Filter for anomalous departures, for example using { "Daily Category": { "$in": ["LE", "LD"] } } or { "$or": [{ "Daily Departure Per": { "$gte": 50 } }, { "Daily Departure Per": { "$lte": -50 } }] }.
    Sort by { "Daily Departure Per": -1 } with a reasonable limit (e.g. 10 or 20).
    Use visualization type "ranking_bar" or "table" with metric "Daily Departure Per" and unit "%".
12. When the user asks for "rainfall trend over the available years" or "rainfall trend":
    Since observations in the dataset are recorded daily across available dates, aggregate rainfall by Date (e.g. daily trend) or by year ({ "$substr": ["$Date", 0, 4] }), calculating total or average "Daily Actual", sorted by date/year ascending.
    Use visualization type "line_trend" with metric "Daily Actual" or "avgDailyActual" and unit "mm".

VISUALIZATION RULES:

1. Use "map_highlight" when the question asks for:
   - highest/lowest rainfall in a location
   - which district/state had the highest or lowest rainfall
   - a specific geographic location identified by the result
   - geographic hotspot questions where highlighting the location on a map adds useful context

2. Use "comparison_bar" when the user explicitly compares two or more districts/states.

3. Use "ranking_bar" when the user asks for:
   - top N districts/states
   - ranking
   - highest to lowest
   - lowest to highest
   - multiple ranked locations or anomalies

4. Use "line_trend" when the user asks about:
   - rainfall over time
   - rainfall trend
   - change over dates
   - progression across time

5. Use "map" when the user asks about:
   - rainfall distribution across India or states
   - geographic patterns

6. Use "kpi_table" when the user asks for a specific record or location and the result contains several useful fields.

7. Use "table" when the user requests multiple records or raw data.

8. Use "kpi" when the result is primarily one important numeric value.

IMPORTANT:
- Do NOT generate React code.
- "metric" should be an actual numeric field name from the query result (e.g. "Daily Actual", "TotalActual", "totalRainfall", "Daily Departure Per", etc.).
- "unit" should be "mm" for rainfall amounts, or "%" for departures.
- Keep the visualization title short and human-readable.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text.trim();

  try {
    const result = safeParseJSON(text);

    // Keep backward compatibility with the existing backend.
    if (!result.query || !result.query.operation) {
      throw new Error("Gemini response is missing a MongoDB query.");
    }

    if (!result.visualization || !result.visualization.type) {
      throw new Error("Gemini response is missing visualization information.");
    }

    return result;
  } catch (error) {
    console.error("❌ Gemini returned invalid JSON:");
    console.error(text);
    throw new Error("Gemini generated an invalid query/visualization response.");
  }
}
export async function generateResultExplanation(question, results) {
  const prompt = `
You are the result explanation assistant for TerraQuery, a rainfall analytics system.

The system has already executed a validated read-only MongoDB query on the real IMD rainfall dataset.

User question:
"${question}"

MongoDB results:
${JSON.stringify(results, null, 2)}

Your job:
Explain the result clearly and concisely for a user.

Rules:
1. Use ONLY the information contained in the MongoDB results.
2. Do NOT invent, estimate, or assume any values.
3. Directly answer the user's question.
4. Mention the most important location, value, date, or comparison when available.
5. If multiple records are returned, summarize the important pattern rather than listing everything.
6. Keep the explanation to 2-3 sentences.
7. Do not mention MongoDB, Gemini, prompts, or internal implementation details.
8. If no records were found, clearly say that no matching rainfall records were found.
9. Return ONLY the explanation text. Do not return JSON or markdown.

`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  return response.text.trim();
}