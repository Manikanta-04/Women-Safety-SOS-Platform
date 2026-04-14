import { useNavigate } from 'react-router-dom'

export default function SOSButton({ size = 60 }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/sos')}
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--accent)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: size * 0.2,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textDecoration: 'none',
        boxShadow: '0 0 0 0 rgba(225,29,72,0.4)',
        transition: 'transform var(--transition)',
      }}
      aria-label="Trigger SOS"
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'var(--accent)',
          opacity: 0.4,
          animation: 'pulse-ring 2s ease-out infinite',
        }}
      />
      <span style={{ zIndex: 1 }}>SOS</span>
    </button>
  )
}
