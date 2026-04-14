import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink to={user ? '/dashboard' : '/'} className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
          <span>SafeHer</span>
        </NavLink>

        {user ? (
          <div className={styles.links}>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Dashboard</NavLink>
            <NavLink to="/sos" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>SOS</NavLink>
            <NavLink to="/incidents" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Report</NavLink>
            <NavLink to="/contacts" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Contacts</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>History</NavLink>
            {user.role === 'admin' && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Admin</NavLink>
            )}
            <div className={styles.divider} />
            <NavLink to="/profile" className={styles.avatar}>{user.name?.[0]?.toUpperCase()}</NavLink>
            <button onClick={handleLogout} className={`btn btn-ghost btn-sm`}>Logout</button>
          </div>
        ) : (
          <div className={styles.links}>
            <NavLink to="/login" className={styles.link}>Login</NavLink>
            <NavLink to="/register" className="btn btn-primary btn-sm">Get Started</NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}