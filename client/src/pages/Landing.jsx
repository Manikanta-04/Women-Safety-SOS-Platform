import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const features = [
  { icon: '🆘', title: 'One-Tap SOS', desc: 'Instantly trigger an alert with your GPS location and a custom message.' },
  { icon: '👥', title: 'Emergency Contacts', desc: 'Store up to 5 trusted contacts — family, friends, colleagues.' },
  { icon: '📋', title: 'Incident Reporting', desc: 'Log harassment, theft, or assault with location and details.' },
  { icon: '📊', title: 'Safety History', desc: 'Track all past alerts and reports in one place.' },
  { icon: '🤖', title: 'AI Pattern Analysis', desc: 'Admin-powered Gemini AI detects risk zones and peak danger times.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'JWT auth, bcrypt passwords, rate-limited API endpoints.' },
]

export default function Landing() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.dot} />
          Women Safety Platform
        </div>
        <h1 className={styles.heroTitle}>
          Stay safe.<br />
          <span className={styles.accent}>Get help fast.</span>
        </h1>
        <p className={styles.heroSub}>
          A personal safety companion — trigger SOS alerts, manage emergency contacts,
          and report unsafe zones with a single tap.
        </p>
        <div className={styles.heroCTA}>
          <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
          <Link to="/login" className="btn btn-ghost btn-lg">Sign In</Link>
        </div>
      </section>

      <section className={styles.features}>
        <p className={styles.featuresLabel}>Everything you need</p>
        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Your safety, always on.</h2>
        <p className={styles.ctaSub}>Join and get immediate access to all safety tools.</p>
        <Link to="/register" className="btn btn-primary btn-lg">Create your account →</Link>
      </section>
    </div>
  )
}