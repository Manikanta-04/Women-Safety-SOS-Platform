import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import api from '../../api/axios'
import styles from './AdminDashboard.module.css'

const riskColor = { High: 'badge-red', Medium: 'badge-yellow', Low: 'badge-green' }

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [report, setReport] = useState(null)
  const [reportLoading, setReportLoading] = useState(false)
  const [reportTime, setReportTime] = useState(null)

  useEffect(() => {
    api.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setStatsLoading(false))
  }, [])

  const generateReport = async () => {
    setReportLoading(true)
    setReport(null)
    try {
      const res = await api.post('/admin/ai-report')
      setReport(res.data.report)
      setReportTime(res.data.generatedAt)
      toast.success('AI report generated')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate report')
    } finally {
      setReportLoading(false)
    }
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 className="page-title">Admin Dashboard</h1>
              <span className="badge badge-red">Admin</span>
            </div>
            <p className="page-subtitle">Platform overview and AI safety analysis</p>
          </div>
          <button
            className={`btn btn-primary ${styles.aiBtn}`}
            onClick={generateReport}
            disabled={reportLoading}
          >
            {reportLoading ? (
              <><span className="spinner" /> Analyzing...</>
            ) : (
              <><span>✦</span> Generate AI Report</>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      {statsLoading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><span className="spinner" /></div>
      ) : stats && (
        <>
          <div className={styles.statsGrid}>
            {[
              { label: 'Total Users', value: stats.stats.totalUsers, icon: '👤', color: '' },
              { label: 'SOS Alerts', value: stats.stats.totalSOS, icon: '🆘', color: '' },
              { label: 'Active Alerts', value: stats.stats.activeAlerts, icon: '🔴', color: styles.statDanger },
              { label: 'Incidents', value: stats.stats.totalIncidents, icon: '📋', color: '' },
            ].map(s => (
              <div key={s.label} className={`${styles.statCard} ${s.color}`}>
                <span className={styles.statIcon}>{s.icon}</span>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.twoCol}>
            {/* Incidents by type */}
            <div className="card">
              <h2 className={styles.sectionTitle}>Incidents by Type</h2>
              <div className={styles.typeList}>
                {stats.incidentsByType?.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'var(--text-3)' }}>No incidents yet</p>
                ) : stats.incidentsByType?.map(t => (
                  <div key={t._id} className={styles.typeRow}>
                    <span className="badge badge-gray">{t._id}</span>
                    <div className={styles.typeBar}>
                      <div className={styles.typeBarFill}
                        style={{ width: `${Math.min(100, (t.count / (stats.stats.totalIncidents || 1)) * 100)}%` }} />
                    </div>
                    <span className={styles.typeCount}>{t.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent SOS */}
            <div className="card">
              <h2 className={styles.sectionTitle}>Recent SOS Alerts</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
                {stats.recentSOS?.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'var(--text-3)' }}>No SOS alerts</p>
                ) : stats.recentSOS?.map(a => (
                  <div key={a._id} className={styles.recentRow}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className={`badge ${a.status === 'active' ? 'badge-red' : 'badge-green'}`}>{a.status}</span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{a.userId?.name || 'Unknown'}</span>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
                      {format(new Date(a.triggeredAt), 'MMM d · h:mm a')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="card" style={{ marginTop: 16 }}>
            <h2 className={styles.sectionTitle}>Recent Incidents</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              {stats.recentIncidents?.length === 0 ? (
                <p style={{ fontSize: 13, color: 'var(--text-3)' }}>No incidents reported</p>
              ) : stats.recentIncidents?.map(inc => (
                <div key={inc._id} className={styles.incidentRow}>
                  <span className="badge badge-yellow">{inc.incidentType}</span>
                  <span style={{ fontSize: 13, flex: 1 }}>{inc.locationDescription}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{inc.userId?.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
                    {format(new Date(inc.incidentDate), 'MMM d')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* AI Report */}
      {reportLoading && (
        <div className={styles.reportLoading}>
          <span className={styles.aiSpinner}>✦</span>
          <p>Gemini is analyzing {stats?.stats?.totalIncidents || 'recent'} incidents...</p>
        </div>
      )}

      {report && (
        <div className={`${styles.reportCard} fade-in`}>
          <div className={styles.reportHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className={styles.aiIcon}>✦</span>
              <div>
                <h2 className={styles.reportTitle}>AI Safety Intelligence Report</h2>
                {reportTime && (
                  <p className={styles.reportTime}>Generated {format(new Date(reportTime), 'MMM d, yyyy · h:mm a')}</p>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Risk Level</span>
              <span className={`badge ${riskColor[report.riskLevel] || 'badge-gray'}`}>{report.riskLevel}</span>
            </div>
          </div>

          <div className={styles.reportDivider} />

          <p className={styles.reportSummary}>{report.summary}</p>

          <div className={styles.reportGrid}>
            <div className={styles.reportSection}>
              <h3 className={styles.reportSectionTitle}>⚠ High-Risk Zones</h3>
              <ul className={styles.reportList}>
                {report.highRiskZones?.map((z, i) => <li key={i}>{z}</li>)}
              </ul>
            </div>

            <div className={styles.reportSection}>
              <h3 className={styles.reportSectionTitle}>🕐 Peak Danger Times</h3>
              <ul className={styles.reportList}>
                {report.peakTimes?.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>

          {report.topIncidentTypes?.length > 0 && (
            <div className={styles.reportSection} style={{ marginTop: 20 }}>
              <h3 className={styles.reportSectionTitle}>📊 Incident Breakdown</h3>
              <div className={styles.incBreakdown}>
                {report.topIncidentTypes.map((t, i) => (
                  <div key={i} className={styles.incBreakdownItem}>
                    <span className="badge badge-gray">{t.type}</span>
                    <span style={{ fontSize: 13 }}>{t.count} reports</span>
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{t.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.recommendations?.length > 0 && (
            <div className={styles.reportSection} style={{ marginTop: 20 }}>
              <h3 className={styles.reportSectionTitle}>💡 Recommendations</h3>
              <ol className={styles.reportOl}>
                {report.recommendations.map((r, i) => <li key={i}>{r}</li>)}
              </ol>
            </div>
          )}

          <p className={styles.reportFooter}>
            Analysis based on {report.analyzedCount} most recent incidents · Powered by Gemini 1.5 Flash
          </p>
        </div>
      )}
    </div>
  )
}