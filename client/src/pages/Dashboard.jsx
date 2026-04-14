import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ sos: 0, incidents: 0, contacts: 0, activeAlerts: 0 })
  const [recentSOS, setRecentSOS] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [sosRes, incRes, conRes] = await Promise.all([
          api.get('/sos/my?limit=3'),
          api.get('/incidents/my?limit=1'),
          api.get('/contacts'),
        ])
        const alerts = sosRes.data.alerts || []
        setRecentSOS(alerts)
        setStats({
          sos: sosRes.data.pagination?.total || 0,
          incidents: incRes.data.pagination?.total || 0,
          contacts: conRes.data?.length || 0,
          activeAlerts: alerts.filter(a => a.status === 'active').length,
        })
      } catch (_) {}
      finally { setLoading(false) }
    }
    load()
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="page fade-in">
      <div className={styles.topRow}>
        <div>
          <p className={styles.greeting}>{greeting}</p>
          <h1 className={styles.name}>{user?.name}</h1>
        </div>
        <Link to="/sos" className={styles.sosQuick}>
          <span className={styles.sosPulse} />
          SOS
        </Link>
      </div>

      {stats.activeAlerts > 0 && (
        <div className={styles.alertBanner}>
          <span>⚠</span>
          <span>You have <strong>{stats.activeAlerts}</strong> active SOS alert{stats.activeAlerts > 1 ? 's' : ''}.</span>
          <Link to="/history" className={styles.alertLink}>View →</Link>
        </div>
      )}

      <div className={styles.statsGrid}>
        {[
          { label: 'Emergency Contacts', value: stats.contacts, max: 5, link: '/contacts', icon: '👥' },
          { label: 'SOS Alerts Sent', value: stats.sos, link: '/history', icon: '🆘' },
          { label: 'Incidents Reported', value: stats.incidents, link: '/history', icon: '📋' },
        ].map(s => (
          <Link to={s.link} key={s.label} className={styles.statCard}>
            <span className={styles.statIcon}>{s.icon}</span>
            <span className={styles.statValue}>{loading ? '—' : s.value}{s.max ? `/${s.max}` : ''}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </Link>
        ))}
      </div>

      <div className={styles.actionsGrid}>
        <Link to="/sos" className={`${styles.actionCard} ${styles.actionSOS}`}>
          <div className={styles.actionIcon}>🆘</div>
          <div>
            <div className={styles.actionTitle}>Trigger SOS</div>
            <div className={styles.actionDesc}>Send an emergency alert with your location</div>
          </div>
        </Link>
        <Link to="/incidents" className={styles.actionCard}>
          <div className={styles.actionIcon}>📋</div>
          <div>
            <div className={styles.actionTitle}>Report Incident</div>
            <div className={styles.actionDesc}>Log a safety incident in your area</div>
          </div>
        </Link>
        <Link to="/contacts" className={styles.actionCard}>
          <div className={styles.actionIcon}>👥</div>
          <div>
            <div className={styles.actionTitle}>Manage Contacts</div>
            <div className={styles.actionDesc}>Add or edit emergency contacts</div>
          </div>
        </Link>
        <Link to="/history" className={styles.actionCard}>
          <div className={styles.actionIcon}>🕐</div>
          <div>
            <div className={styles.actionTitle}>View History</div>
            <div className={styles.actionDesc}>See all past alerts and reports</div>
          </div>
        </Link>
      </div>

      {recentSOS.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent SOS Alerts</h2>
            <Link to="/history" className={styles.sectionLink}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentSOS.map(alert => (
              <div key={alert._id} className={styles.alertRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className={`badge ${alert.status === 'active' ? 'badge-red' : 'badge-green'}`}>
                    {alert.status}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
                    {format(new Date(alert.triggeredAt), 'MMM d, yyyy · h:mm a')}
                  </span>
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{alert.locationLabel}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}