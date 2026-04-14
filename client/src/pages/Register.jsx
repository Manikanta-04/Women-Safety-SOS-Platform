import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()
  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...payload } = data
      const res = await api.post('/auth/register', payload)
      login(res.data.token, res.data.user)
      toast.success('Account created! Stay safe 💪')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>⬡</div>
          <h1 className={styles.title}>Create account</h1>
          <p className={styles.sub}>Join SafeHer — your safety companion</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Jane Doe"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span className="form-error">⚠ {errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className={`form-input ${errors.email ? 'error' : ''}`}
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/, message: 'Invalid email' }
              })}
            />
            {errors.email && <span className="form-error">⚠ {errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="+91 9876543210"
              {...register('phone', {
                required: 'Phone is required',
                minLength: { value: 7, message: 'Enter a valid phone number' }
              })}
            />
            {errors.phone && <span className="form-error">⚠ {errors.phone.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className={`form-input ${errors.password ? 'error' : ''}`}
              type="password"
              placeholder="Min 8 characters"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
              })}
            />
            {errors.password && <span className="form-error">⚠ {errors.password.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              type="password"
              placeholder="Repeat password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: v => v === password || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && <span className="form-error">⚠ {errors.confirmPassword.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner" /> : 'Create account'}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}