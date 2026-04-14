import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { useLocation } from '../hooks/useLocation'
import styles from './SOS.module.css'

export default function SOS() {
  const { register, handleSubmit, reset } = useForm()
  const { location, locLoading, locError, getLocation } = useLocation()
  const [triggered, setTriggered] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const payload = {
        message: data.message || '',
        ...(location || {}),
      }
      const res = await api.post('/sos/trigger', payload)
      setTriggered(res.data.alert)
      reset()
      toast.success('SOS alert sent!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send SOS')
    } finally {
      setLoading(false)
    }
  }

  const handleResolve = async (id) => {
    try {
      await api.patch(`/sos/${id}/resolve`)
      setTriggered(prev => ({ ...prev, status: 'resolved' }))
      toast.success('Alert marked as resolved')
    } catch {
      toast.error('Could not resolve alert')
    }
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">SOS Alert</h1>
        <p className="page-subtitle">Trigger an emergency alert with your current location</p>
      </div>

      {triggered ? (
        <div className={styles.confirmation}>
          <div className={styles.confirmIcon}>✓</div>
          <h2 className={styles.confirmTitle}>Alert Sent</h2>
          <p className={styles.confirmTime}>
            {format(new Date(triggered.triggeredAt), 'MMM d, yyyy · h:mm:ss a')}
          </p>
          {triggered.locationLabel && (
            <p className={styles.confirmLoc}>📍 {triggered.locationLabel}</p>
          )}
          {triggered.message && (
            <p className={styles.confirmMsg}>"{triggered.message}"</p>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {triggered.status === 'active' && (
              <button className="btn btn-ghost" onClick={() => handleResolve(triggered._id)}>
                Mark as Resolved
              </button>
            )}
            {triggered.status === 'resolved' && (
              <span className="badge badge-green">✓ Resolved</span>
            )}
            <button className="btn btn-primary" onClick={() => setTriggered(null)}>
              Send Another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.sosButtonWrap}>
            <button type="submit" className={styles.sosButton} disabled={loading}>
              {loading ? <span className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} /> : (
                <>
                  <span className={styles.sosPulse} />
                  <span className={styles.sosLabel}>SOS</span>
                  <span className={styles.sosSub}>Tap to alert</span>
                </>
              )}
            </button>
          </div>

          <div className="card" style={{ marginTop: 32 }}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Optional Message</label>
              <textarea
                className="form-input"
                placeholder="e.g. Being followed near Central Park..."
                rows={3}
                style={{ resize: 'none' }}
                {...register('message')}
              />
            </div>

            <div className={styles.locationRow}>
              <div className={styles.locationInfo}>
                <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
                  {locLoading ? 'Getting location...' :
                   location ? `📍 ${location.locationLabel}` :
                   locError ? `⚠ ${locError}` :
                   '📍 Location not attached'}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={getLocation}
                disabled={locLoading}
              >
                {locLoading ? <span className="spinner" /> : 'Get Location'}
              </button>
            </div>
          </div>

          <p className={styles.hint}>
            This will log a timestamped SOS alert to your account. Share your location for best results.
          </p>
        </form>
      )}
    </div>
  )
}