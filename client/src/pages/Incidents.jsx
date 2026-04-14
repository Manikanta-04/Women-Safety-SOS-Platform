import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import api from '../api/axios'
import styles from './Incidents.module.css'

const TYPES = ['harassment', 'theft', 'assault', 'stalking', 'other']

const typeColors = {
  harassment: 'badge-red',
  assault: 'badge-red',
  theft: 'badge-yellow',
  stalking: 'badge-yellow',
  other: 'badge-gray',
}

export default function Incidents() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { incidentDate: format(new Date(), "yyyy-MM-dd'T'HH:mm") }
  })

  const onSubmit = async (data) => {
    try {
      await api.post('/incidents', data)
      toast.success('Incident reported. Thank you for keeping the community safe.')
      reset({ incidentDate: format(new Date(), "yyyy-MM-dd'T'HH:mm") })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit report')
    }
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Report an Incident</h1>
        <p className="page-subtitle">Help keep others safe by reporting safety incidents in your area</p>
      </div>

      <div className={styles.layout}>
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className="form-group">
              <label className="form-label">Incident Type</label>
              <select className={`form-input ${errors.incidentType ? 'error' : ''}`}
                {...register('incidentType', { required: 'Select an incident type' })}>
                <option value="">— Select type —</option>
                {TYPES.map(t => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
              {errors.incidentType && <span className="form-error">⚠ {errors.incidentType.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Location Description</label>
              <input
                className={`form-input ${errors.locationDescription ? 'error' : ''}`}
                placeholder="e.g. Near City Mall, MG Road, Bengaluru"
                {...register('locationDescription', { required: 'Location is required' })}
              />
              {errors.locationDescription && <span className="form-error">⚠ {errors.locationDescription.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Date & Time of Incident</label>
              <input
                type="datetime-local"
                className={`form-input ${errors.incidentDate ? 'error' : ''}`}
                {...register('incidentDate', { required: 'Date is required' })}
              />
              {errors.incidentDate && <span className="form-error">⚠ {errors.incidentDate.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className={`form-input ${errors.description ? 'error' : ''}`}
                placeholder="Describe what happened in as much detail as you are comfortable sharing..."
                rows={5}
                style={{ resize: 'vertical' }}
                {...register('description', {
                  required: 'Description is required',
                  maxLength: { value: 1000, message: 'Max 1000 characters' }
                })}
              />
              {errors.description && <span className="form-error">⚠ {errors.description.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ alignSelf: 'flex-start' }}>
              {isSubmitting ? <><span className="spinner" /> Submitting...</> : 'Submit Report'}
            </button>
          </form>
        </div>

        <div className={styles.sidebar}>
          <div className="card">
            <h3 className={styles.sideTitle}>Incident Types</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              {TYPES.map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className={`badge ${typeColors[t]}`}>{t}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-2)' }}>
                    {t === 'harassment' && 'Verbal/physical unwanted contact'}
                    {t === 'theft' && 'Robbery, snatching, pickpocket'}
                    {t === 'assault' && 'Physical attack or threat'}
                    {t === 'stalking' && 'Being followed or surveilled'}
                    {t === 'other' && 'Any other safety concern'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: 12 }}>
            <h3 className={styles.sideTitle}>Your privacy</h3>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.6 }}>
              Reports are stored securely and only visible to you and platform admins for safety analysis.
              Your identity is never publicly disclosed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}