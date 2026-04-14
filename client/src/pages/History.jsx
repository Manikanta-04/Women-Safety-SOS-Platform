import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import api from '../api/axios'
import styles from './History.module.css'

const typeColors = {
  harassment: 'badge-red', assault: 'badge-red',
  theft: 'badge-yellow', stalking: 'badge-yellow', other: 'badge-gray'
}

export default function History() {
  const [tab, setTab] = useState('sos')
  const [sosData, setSosData] = useState({ alerts: [], pagination: {} })
  const [incData, setIncData] = useState({ incidents: [], pagination: {} })
  const [sosPage, setSosPage] = useState(1)
  const [incPage, setIncPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchSOS = async (page = 1) => {
    setLoading(true)
    try {
      const res = await api.get(`/sos/my?page=${page}&limit=10`)
      setSosData(res.data)
      setSosPage(page)
    } catch { toast.error('Failed to load SOS history') }
    finally { setLoading(false) }
  }

  const fetchIncidents = async (page = 1) => {
    setLoading(true)
    try {
      const res = await api.get(`/incidents/my?page=${page}&limit=10`)
      setIncData(res.data)
      setIncPage(page)
    } catch { toast.error('Failed to load incidents') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchSOS(); fetchIncidents() }, [])

  const handleResolve = async (id) => {
    try {
      await api.patch(`/sos/${id}/resolve`)
      setSosData(prev => ({
        ...prev,
        alerts: prev.alerts.map(a => a._id === id ? { ...a, status: 'resolved' } : a)
      }))
      toast.success('Alert resolved')
    } catch { toast.error('Failed to resolve') }
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">History</h1>
        <p className="page-subtitle">All your past SOS alerts and incident reports</p>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'sos' ? styles.active : ''}`} onClick={() => setTab('sos')}>
          SOS Alerts
          {sosData.pagination?.total > 0 && <span className={styles.count}>{sosData.pagination.total}</span>}
        </button>
        <button className={`${styles.tab} ${tab === 'incidents' ? styles.active : ''}`} onClick={() => setTab('incidents')}>
          Incident Reports
          {incData.pagination?.total > 0 && <span className={styles.count}>{incData.pagination.total}</span>}
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60 }}><span className="spinner" /></div>
      ) : tab === 'sos' ? (
        <div className="fade-in">
          {sosData.alerts?.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">🆘</div><p>No SOS alerts yet.</p></div>
          ) : (
            <>
              <div className={styles.list}>
                {sosData.alerts.map(a => (
                  <div key={a._id} className={styles.item}>
                    <div className={styles.itemTop}>
                      <span className={`badge ${a.status === 'active' ? 'badge-red' : 'badge-green'}`}>{a.status}</span>
                      <span className={styles.itemDate}>{format(new Date(a.triggeredAt), 'MMM d, yyyy · h:mm a')}</span>
                    </div>
                    <p className={styles.itemLocation}>📍 {a.locationLabel}</p>
                    {a.message && <p className={styles.itemMsg}>"{a.message}"</p>}
                    {a.status === 'active' && (
                      <button className="btn btn-ghost btn-sm" style={{ marginTop: 8 }} onClick={() => handleResolve(a._id)}>
                        Mark Resolved
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <Pagination data={sosData.pagination} page={sosPage} onPage={fetchSOS} />
            </>
          )}
        </div>
      ) : (
        <div className="fade-in">
          {incData.incidents?.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">📋</div><p>No incident reports yet.</p></div>
          ) : (
            <>
              <div className={styles.list}>
                {incData.incidents.map(inc => (
                  <div key={inc._id} className={styles.item}>
                    <div className={styles.itemTop}>
                      <span className={`badge ${typeColors[inc.incidentType] || 'badge-gray'}`}>{inc.incidentType}</span>
                      <span className={styles.itemDate}>{format(new Date(inc.incidentDate), 'MMM d, yyyy · h:mm a')}</span>
                    </div>
                    <p className={styles.itemLocation}>📍 {inc.locationDescription}</p>
                    <p className={styles.itemMsg}>{inc.description}</p>
                  </div>
                ))}
              </div>
              <Pagination data={incData.pagination} page={incPage} onPage={fetchIncidents} />
            </>
          )}
        </div>
      )}
    </div>
  )
}

function Pagination({ data, page, onPage }) {
  if (!data?.pages || data.pages <= 1) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, justifyContent: 'center' }}>
      <button className="btn btn-ghost btn-sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>← Prev</button>
      <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Page {page} of {data.pages}</span>
      <button className="btn btn-ghost btn-sm" disabled={page >= data.pages} onClick={() => onPage(page + 1)}>Next →</button>
    </div>
  )
}