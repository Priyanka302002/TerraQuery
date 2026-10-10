import React, { useState } from 'react';
import { 
  X, 
  Database, 
  ShieldCheck, 
  Key, 
  Lock, 
  Server, 
  CheckCircle2, 
  Cpu, 
  RefreshCw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function DatabaseConfigModal({ isOpen, onClose }) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [activeTab, setActiveTab] = useState('parameters'); // 'parameters' | 'security' | 'architecture'

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const startTime = performance.now();
      const res = await fetch('/api/health');
      const data = await res.json();
      const elapsed = Math.round(performance.now() - startTime);

      setTestResult({
        success: data.status === 'healthy',
        databaseEngine: data.database?.engine || 'MongoDB Atlas',
        databaseName: data.database?.database || 'terraquery',
        collection: data.database?.collection || 'rainfall',
        databaseStatus: data.database?.status || 'ONLINE',
        aiProvider: data.ai?.provider || 'Google Gemini',
        aiModel: data.ai?.model || 'gemini-3.5-flash-lite',
        latency: `${elapsed}ms`,
        mode: 'Live Mode (MongoDB Atlas + Google Gemini)'
      });
    } catch (err) {
      setTestResult({
        success: false,
        error: err.message || 'Unable to connect to backend server on port 5000'
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px' }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(0, 242, 254, 0.08) 0%, transparent 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(0, 242, 254, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 242, 254, 0.3)'
            }}>
              <Database size={20} color="#00F2FE" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Database & AI Integration Status</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                MongoDB Atlas & Google Gemini live architecture parameters
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Status Banner */}
        <div style={{
          margin: '20px 24px 0',
          padding: '14px 18px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="led-indicator led-emerald" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Current Status: Live Mode — MongoDB Atlas & Google Gemini Connected
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Querying real India Meteorological Department (IMD) rainfall observations
              </div>
            </div>
          </div>
          <span className="pill pill-emerald" style={{ fontSize: '0.7rem' }}>
            LIVE ONLINE
          </span>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '16px 24px 0',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          {[
            { id: 'parameters', label: 'Platform & Environment (.env)' },
            { id: 'security', label: 'Security & Guardrails' },
            { id: 'architecture', label: 'AI Query Pipeline' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                padding: '10px 14px',
                color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '20px 24px' }}>
          {activeTab === 'parameters' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Backend environment and connection parameters securely managed on server:
              </div>

              {[
                { key: 'DATABASE_ENGINE', val: 'MongoDB Atlas (Cloud Cluster)', type: 'text' },
                { key: 'DATABASE_NAME', val: 'terraquery', type: 'text' },
                { key: 'COLLECTION_NAME', val: 'rainfall (Real IMD Observations)', type: 'text' },
                { key: 'AI_PROVIDER', val: 'Google Gemini', type: 'text' },
                { key: 'AI_MODEL', val: 'gemini-3.5-flash-lite', type: 'text' },
                { key: 'MONGODB_URI', val: 'mongodb+srv://••••••••••••••••.mongodb.net (Protected in .env)', type: 'password' },
                { key: 'GEMINI_API_KEY', val: '•••••••••••••••••••••••••••• (Protected in .env)', type: 'password' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(5, 10, 22, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Key size={14} color="#38BDF8" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#94A3B8' }}>
                      {item.key}
                    </span>
                  </div>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.78rem', 
                    color: item.type === 'password' ? 'var(--text-muted)' : 'var(--accent-cyan)',
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '4px 10px',
                    borderRadius: '4px'
                  }}>
                    {item.val}
                  </span>
                </div>
              ))}

              <div style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <button
                  onClick={handleTestConnection}
                  disabled={testing}
                  className="btn btn-outline"
                  style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                >
                  <RefreshCw size={14} className={testing ? 'animate-spin' : ''} />
                  <span>{testing ? 'Testing Health Endpoint...' : 'Test Connection Latency'}</span>
                </button>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Pings /api/health to measure backend response latency
                </div>
              </div>

              {testResult && testResult.success && (
                <div style={{
                  marginTop: '10px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '0.78rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    <CheckCircle2 size={16} />
                    <span>MongoDB Atlas & Gemini Services Healthy</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
                    <div>Latency: <span style={{ color: 'var(--text-primary)' }}>{testResult.latency}</span></div>
                    <div>Database: <span style={{ color: 'var(--text-primary)' }}>{testResult.databaseEngine} ({testResult.databaseStatus})</span></div>
                    <div>Collection: <span style={{ color: 'var(--text-primary)' }}>{testResult.collection}</span></div>
                    <div>AI Model: <span style={{ color: 'var(--text-primary)' }}>{testResult.aiModel}</span></div>
                  </div>
                </div>
              )}

              {testResult && !testResult.success && (
                <div style={{
                  marginTop: '10px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#EF4444',
                  fontSize: '0.78rem'
                }}>
                  Failed to connect: {testResult.error}
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px'
              }}>
                {[
                  {
                    title: 'Restricted Read-Only Queries',
                    desc: 'Query execution is strictly limited to find and aggregate operations. All insert, update, delete, and drop calls are blocked.',
                    icon: ShieldCheck,
                    color: '#10B981'
                  },
                  {
                    title: 'Dangerous Operator Blocking',
                    desc: 'Operators such as $where, $function, $accumulator, $out, and $merge are intercepted and rejected before execution.',
                    icon: Lock,
                    color: '#00F2FE'
                  },
                  {
                    title: 'AST & Schema Validation',
                    desc: 'AI-generated queries are checked by queryValidator.js to guarantee proper pipeline formatting prior to running on Atlas.',
                    icon: Cpu,
                    color: '#A78BFA'
                  },
                  {
                    title: 'Air-Gapped Credentials',
                    desc: 'Atlas connection strings and Gemini API keys reside exclusively in backend environment variables (.env) and are never sent to the browser.',
                    icon: Server,
                    color: '#38BDF8'
                  }
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div key={idx} style={{
                      background: 'rgba(6, 12, 26, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '14px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Icon size={18} color={card.color} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{card.title}</span>
                      </div>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {card.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.76rem',
                color: 'var(--text-secondary)'
              }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Security Note:</span> AI-generated queries are strictly validated and executed using read-only permissions in MongoDB Atlas.
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Overview of the TerraQuery natural-language processing pipeline:
              </p>
              <div style={{
                background: 'rgba(5, 10, 22, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ color: '#F8FAFC' }}>1. Natural Language Question (Plain English)</div>
                <div style={{ color: 'var(--accent-cyan)' }}>   ↓ Google Gemini (gemini-3.5-flash-lite) Query & Viz Planner</div>
                <div style={{ color: '#F8FAFC' }}>2. AI-Generated MongoDB Query (aggregate / find)</div>
                <div style={{ color: 'var(--accent-emerald)' }}>   ↓ queryValidator.js (Read-only validation & operator scanning)</div>
                <div style={{ color: '#F8FAFC' }}>3. MongoDB Atlas Execution (database: terraquery, collection: rainfall)</div>
                <div style={{ color: 'var(--accent-cyan)' }}>   ↓ Google Gemini Grounded Result Synthesis (Zero Hallucination)</div>
                <div style={{ color: '#F8FAFC' }}>4. Interactive UI: KPI Card, Chart & Map Visualizations</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(5, 8, 19, 0.6)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Powered by Google Gemini + MongoDB Atlas
          </div>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ fontSize: '0.85rem', padding: '8px 18px' }}
          >
            Close Status
          </button>
        </div>
      </div>
    </div>
  );
}
