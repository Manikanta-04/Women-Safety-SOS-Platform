import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import styles from './Profile.module.css'

export default function Profile() {
  const { user, setUser } = useAuth()

  const { register: regProfile, handleSubmit: handleProfile, formState: { errors: pe, isSubmitting: ps } } = useForm({
    defaultValues: { name: user?.name, phone: user?.phone }
  })

  const { register: regPwd, handleSubmit: handlePwd, reset: resetPwd, watch,
    formState: { errors: we, isSubmitting: ws } } = useForm()
  const newPwd = watch('newPassword')

  const onProfile = async (data) => {
    try {
      const res = await api.put('/user/profile', data)
      setUser(res.data.user)
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    }
  }

  const onPassword = async (data) => {
    try {
      await api.put('/user/change-password', data)
      toast.success('Password changed successfully')
      resetPwd()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed')
    }
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Manage your account settings</p>
      </div>

      <div className={styles.layout}>
        <div>
          {/* Profile Info */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className={styles.userHeader}>
              <div className={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
              <div>
                <p className={styles.userName}>{user?.name}</p>
                <p className={styles.userEmail}>{user?.email}</p>
                {user?.createdAt && (
                  <p className={styles.userSince}>Member since {format(new Date(user.createdAt), 'MMM yyyy')}</p>
                )}
              </div>
              {user?.role === 'admin' && <span className="badge badge-red" style={{ marginLeft: 'auto' }}>Admin</span>}
            </div>
          </div>

          {/* Edit Profile */}
          <div className="card" style={{ marginBottom: 16 }}>
            <h2 className={styles.sectionTitle}>Edit Profile</h2>
            <form onSubmit={handleProfile(onProfile)} className={styles.form}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className={`form-input ${pe.name ? 'error' : ''}`}
                  {...regProfile('name', { required: 'Name is required' })} />
                {pe.name && <span className="form-error">⚠ {pe.name.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className={`form-input ${pe.phone ? 'error' : ''}`}
                  {...regProfile('phone', { required: 'Phone is required' })} />
                {pe.phone && <span className="form-error">⚠ {pe.phone.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" value={user?.email} disabled style={{ opacity: 0.5 }} />
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Email cannot be changed</span>
              </div>
              <button type="submit" className="btn btn-primary" disabled={ps} style={{ alignSelf: 'flex-start' }}>
                {ps ? <span className="spinner" /> : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="card">
            <h2 className={styles.sectionTitle}>Change Password</h2>
            <form onSubmit={handlePwd(onPassword)} className={styles.form}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input type="password" className={`form-input ${we.currentPassword ? 'error' : ''}`}
                  placeholder="••••••••"
                  {...regPwd('currentPassword', { required: 'Current password is required' })} />
                {we.currentPassword && <span className="form-error">⚠ {we.currentPassword.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input type="password" className={`form-input ${we.newPassword ? 'error' : ''}`}
                  placeholder="Min 8 characters"
                  {...regPwd('newPassword', { required: 'New password is required', minLength: { value: 8, message: 'Min 8 characters' } })} />
                {we.newPassword && <span className="form-error">⚠ {we.newPassword.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input type="password" className={`form-input ${we.confirmPassword ? 'error' : ''}`}
                  placeholder="Repeat new password"
                  {...regPwd('confirmPassword', { required: 'Please confirm', validate: v => v === newPwd || 'Passwords do not match' })} />
                {we.confirmPassword && <span className="form-error">⚠ {we.confirmPassword.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary" disabled={ws} style={{ alignSelf: 'flex-start' }}>
                {ws ? <span className="spinner" /> : 'Update Password'}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className="card">
            <h3 className={styles.sectionTitle} style={{ marginBottom: 16 }}>Quick Links</h3>
            {[
              { label: '🆘 SOS Alerts', to: '/sos' },
              { label: '👥 Contacts', to: '/contacts' },
              { label: '📋 Report Incident', to: '/incidents' },
              { label: '🕐 History', to: '/history' },
            ].map(l => (
              <a key={l.to} href={l.to} className={styles.quickLink}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}