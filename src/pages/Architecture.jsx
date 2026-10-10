import React, { useState } from 'react';
import { 
  Layers, 
  ArrowDown, 
  User, 
  Layout, 
  Server, 
  Database, 
  Cpu, 
  Sparkles, 
  Code, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2,
  Terminal,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export default function Architecture() {
  const [selectedNode, setSelectedNode] = useState('gemini');

  const ARCHITECTURE_NODES = [
    {
      id: 'user',
      title: '1. USER & CLIMATE ANALYST',
      badge: 'NATURAL LANGUAGE INPUT',
      subtitle: 'Researchers, Disaster Teams, Agricultural Planners',
      icon: User,
      color: '#38BDF8',
      description: 'The end-user asks natural-language questions (e.g., "Which district had the highest rainfall?", "Compare rainfall between Durg and Raipur"). No database syntax or query language knowledge is required.',
      details: [
        'Zero query syntax learning curve',
        'Natural-language questions translated seamlessly',
        'Conversational interface tuned for climate & rainfall analysis'
      ]
    },
    {
      id: 'dashboard',
      title: '2. TERRAQUERY WEB DASHBOARD',
      badge: 'FRONTEND INTERFACE',
      subtitle: 'React + Modern Climate-Tech Design System',
      icon: Layout,
      color: '#00F2FE',
      description: 'Provides rainfall query inputs, interactive suggested chips, real-time pipeline execution stages, SVG India & district choropleth maps, and full query transparency.',
      details: [
        'Adaptive visualization selection (KPI Cards, Bar Charts, Comparisons, Anomalies)',
        'Interactive SVG cartogram with rainfall intensity heatmaps',
        'Query transparency inspector showing exact MongoDB queries'
      ]
    },
    {
      id: 'backend',
      title: '3. BACKEND API GATEWAY',
      badge: 'ORCHESTRATION & SECURITY',
      subtitle: 'Node.js Express Microservice Gateway (server.js)',
      icon: Server,
      color: '#60A5FA',
      description: 'Coordinates request routing, handles CORS headers, guards environment variables and API credentials, and manages communication between the frontend, Google Gemini, and MongoDB Atlas.',
      details: [
        'Secure proxying preventing credential leakage to the browser',
        'Live health monitoring at /api/health with database status',
        'Standardized error handling and JSON validation'
      ]
    },
    {
      id: 'gemini',
      title: '4. GOOGLE GEMINI AI ENGINE',
      badge: 'AI QUERY GENERATOR',
      subtitle: 'Google Gemini 2.5 / 1.5 Flash (geminiQueryService.js)',
      icon: Cpu,
      color: '#A78BFA',
      description: 'Transforms natural-language questions into deterministic MongoDB aggregation pipelines using the grounded IMD rainfall schema catalog. Gemini does NOT guess or fabricate rainfall statistics.',
      details: [
        'Strict schema grounding on IMD rainfall fields (District, State, Date, Daily Actual, Daily Normal)',
        'Translates natural questions directly into MongoDB find() or aggregate() syntax',
        'Includes auto-quoting JSON parser for unquoted MongoDB operators'
      ]
    },
    {
      id: 'validator',
      title: '5. QUERY VALIDATOR & GUARDRAILS',
      badge: 'SECURITY GATEWAY',
      subtitle: 'Deterministic AST Query Inspection (queryValidator.js)',
      icon: FileCheck,
      color: '#F59E0B',
      description: 'Performs static inspection on AI-generated queries before execution. Strictly enforces read-only access and blocks dangerous operators or destructive operations.',
      details: [
        'Blocks write operations, drops, deletes, and unauthorized mutations',
        'Restricts execution exclusively to read-only queries and aggregation pipelines',
        'Prevents script injections and out-of-scope database access'
      ]
    },
    {
      id: 'mongodb',
      title: '6. MONGODB ATLAS CLOUD DATABASE',
      badge: 'DATA STORE',
      subtitle: 'MongoDB Atlas Distributed Database (terraquery.rainfall)',
      icon: Database,
      color: '#10B981',
      description: 'Stores real Indian Meteorological Department (IMD) observation records. Executes validated aggregation pipelines with high throughput and indexing.',
      details: [
        'Real observation records with historical daily actuals and normals',
        'WiredTiger storage engine with multi-stage aggregation compute',
        'Strict read-only application connection credentials'
      ]
    },
    {
      id: 'visualization',
      title: '7. GROUNDED INSIGHTS & VISUALIZATION',
      badge: 'SYNTHESIS & REPORTING',
      subtitle: 'Deterministic Ground Truth Presentation',
      icon: BarChart3,
      color: '#34D399',
      description: 'Renders the computed results from MongoDB Atlas into interactive charts, tables, and AI explanations grounded strictly in the returned database rows.',
      details: [
        'Zero hallucination guarantee: numbers originate solely from database records',
        'Adaptive visualization routing (Ranking Bar, Comparison, Trend, Anomaly)',
        'Full lineage transparency with explain query modal'
      ]
    }
  ];

  const activeNodeData = ARCHITECTURE_NODES.find((n) => n.id === selectedNode) || ARCHITECTURE_NODES[3];

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="pill pill-cyan" style={{ fontSize: '0.72rem' }}>
            <Layers size={13} /> TECHNICAL ARCHITECTURE
          </span>
          <span className="pill pill-emerald" style={{ fontSize: '0.72rem' }}>
            GEMINI + MONGODB ATLAS
          </span>
        </div>

        <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
          System Architecture & Lineage
        </h2>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '820px' }}>
          How TerraQuery transforms natural-language questions into deterministic rainfall insights using Google Gemini and MongoDB Atlas.
        </p>
      </div>

      {/* Critical Core Differentiator Callout Banner */}
      <div style={{
        padding: '20px 24px',
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
        border: '1px solid rgba(0, 242, 254, 0.3)',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '12px',
          background: 'rgba(0, 242, 254, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <ShieldCheck size={26} color="#00F2FE" />
        </div>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#F8FAFC' }}>
            Fundamental Differentiator: The LLM Does NOT Invent Rainfall Values
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.5 }}>
            Unlike generic chat systems that hallucinate statistics from model weights, TerraQuery uses Google Gemini strictly for <strong>Natural-Language-to-MongoDB Query Translation</strong>. All numerical values, metrics, and trends are computed deterministically by MongoDB Atlas from verified IMD observation records.
          </p>
        </div>
      </div>

      {/* Main Interactive Grid: Architecture Pipeline vs Selected Node Detail */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px'
      }}>
        
        {/* Left Column: Flowchart Nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Click Any Layer to Inspect Technical Implementation:
          </div>

          {ARCHITECTURE_NODES.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = selectedNode === node.id;

            return (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setSelectedNode(node.id)}
                  style={{
                    background: isSelected ? 'rgba(0, 242, 254, 0.12)' : 'rgba(8, 16, 36, 0.7)',
                    border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 0 20px rgba(0, 242, 254, 0.2)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: node.color
                    }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? '#FFFFFF' : '#E2E8F0' }}>
                        {node.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        {node.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className="pill pill-muted" style={{ fontSize: '0.62rem', padding: '2px 8px' }}>
                    {node.badge}
                  </span>
                </div>

                {/* Arrow connector between nodes */}
                {idx < ARCHITECTURE_NODES.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '1px 0' }}>
                    <ArrowDown size={14} color="rgba(0, 242, 254, 0.4)" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Column: Node Deep Dive Panel */}
        <div style={{ position: 'sticky', top: '90px', height: 'fit-content' }}>
          <div className="glass-card accent-top" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="pill pill-cyan" style={{ fontSize: '0.72rem' }}>
                ARCHITECTURE INSPECTOR
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Component {activeNodeData.id.toUpperCase()}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(0, 242, 254, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeNodeData.color
              }}>
                {React.createElement(activeNodeData.icon, { size: 22 })}
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{activeNodeData.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>{activeNodeData.subtitle}</p>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '20px' }}>
              {activeNodeData.description}
            </p>

            <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Engineering Capabilities:
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {activeNodeData.details.map((d, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            {/* Real MongoDB Aggregation Pipeline Sample */}
            <div style={{
              background: '#040711',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-cyan)', fontSize: '0.78rem', fontWeight: 600 }}>
                <Terminal size={14} />
                <span>MongoDB Rainfall Aggregation Query Sample:</span>
              </div>
              <pre className="code-block" style={{ fontSize: '0.74rem', margin: 0, maxHeight: '200px' }}>
{`// Sample Gemini Generated Aggregation Pipeline
// Collection: terraquery.rainfall
[
  {
    "$match": {
      "State": { "$in": ["CHHATTISGARH", "CHHATISGARH"] },
      "District": { "$in": ["DURG", "RAIPUR"] }
    }
  },
  {
    "$group": {
      "_id": "$District",
      "District": { "$first": "$District" },
      "TotalActual": { "$sum": "$Daily Actual" },
      "avgDailyActual": { "$avg": "$Daily Actual" }
    }
  },
  { "$sort": { "TotalActual": -1 } }
]`}
              </pre>
            </div>

            <div style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.74rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Status: Pipeline Connected</span>
              <span style={{ color: 'var(--accent-cyan)' }}>Google Gemini + MongoDB Atlas</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
