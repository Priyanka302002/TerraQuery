# TERRAQUERY
### "AI-Powered Natural-Language Climate Intelligence"
**Powered by Google Gemini + MongoDB Atlas**

---

## 🌍 Overview

**TerraQuery** allows non-technical users (climate researchers, disaster management teams, NGOs, policy makers, and students) to ask complex questions about structured Earth and climate observation datasets in plain English — without writing SQL or database queries.

Powered by **Google Gemini** and **MongoDB Atlas**, TerraQuery bridges high-performance document data stores with state-of-the-art Large Language Models while preserving mathematical ground truth: **the LLM translates language to MongoDB aggregation queries, but all calculations and metrics come directly from real observation records in MongoDB Atlas.**

---

## ⚡ The Core Pipeline

```
User asks question in plain English
                ↓
Frontend Web Dashboard (React + Deep Oceanic UI)
                ↓
Backend / API Layer (Node.js Express Gateway on port 5000)
                ↓
Google Gemini AI Engine (Schema Grounding via geminiQueryService.js)
                ↓
Read-Only Query Validator (Security AST Gate via queryValidator.js)
                ↓
MongoDB Atlas Distributed Database (Collection: terraquery.rainfall)
                ↓
Deterministic IMD Observation Records Computed
                ↓
Analytics & Anomaly Detection (Statistical Baseline Departures)
                ↓
Automatic Visualization (Dynamic Charts + India / State Cartogram)
                ↓
Grounded AI Explanation (Zero Hallucination Guarantee)
                ↓
User
```

---

## 🎯 Target Users & Value Proposition

- **Researchers & Scientists:** Detect multi-year rainfall trends and calculate statistical departures without writing manual database queries.
- **Disaster Management Teams:** Instantly identify precipitation anomalies (e.g., large excess rainfall departures) to pre-position emergency relief assets.
- **Government Environment Departments:** Formulate district contingency and monsoon plans using localized historical rainfall records.
- **Policy Analysts & NGOs:** Evaluate agricultural monsoon stability and drought compensation.

---

## 🚀 Benchmark Rainfall Queries

1. **"Which district had the highest rainfall?"**
   - Result: Automatically identifies the peak district with real daily actuals and date from MongoDB Atlas.
   - Visual: Peak Ranking Bar Chart + Map Highlight
2. **"Compare rainfall between Durg and Raipur."**
   - Result: Dual Bar Comparison Chart with aggregated totals for both districts.
3. **"Show the rainfall trend over the available years."**
   - Result: Time-series curve tracking annual and seasonal rainfall evolution.
4. **"Find rainfall anomalies."**
   - Result: Anomaly Diverging Chart highlighting districts with large departure percentages.

---

## 🔒 Security & Zero-Hallucination Guarantee

1. **Deterministic Grounding:** All values displayed originate strictly from verified records in MongoDB Atlas. The LLM does not generate numbers.
2. **Read-Only Enforcement:** Queries are statically checked by `queryValidator.js` to ensure only read-only aggregation and find queries execute.
3. **Transparent Lineage:** The "Explain Query" inspector provides a step-by-step audit of Question → Gemini Interpretation → Generated MongoDB Query → Raw DB Result → Final Insight.
4. **Sealed Credentials:** Database connection strings and Gemini API keys remain in server-side environment variables and are never exposed to browser clients.

---

## 🛠️ Local Development & Running

```bash
# 1. Start backend API server (runs on port 5000)
node server.js
# or: npm run server

# 2. Start frontend dev server (runs on port 3000)
npm run dev

# 3. Production Build
npm run build
```
