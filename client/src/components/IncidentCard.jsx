import { format } from 'date-fns'

const typeColors = {
  harassment: 'badge-red',
  assault: 'badge-red',
  theft: 'badge-yellow',
  stalking: 'badge-yellow',
  other: 'badge-gray',
}

export default function IncidentCard({ incident }) {
  return (
    <div
      style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        transition: 'border-color var(--transition)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span className={`badge ${typeColors[incident.incidentType] || 'badge-gray'}`}>
          {incident.incidentType}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
          {format(new Date(incident.incidentDate), 'MMM d, yyyy · h:mm a')}
        </span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 4 }}>
        📍 {incident.locationDescription}
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-2)', fontStyle: 'italic', lineHeight: 1.5 }}>
        {incident.description}
      </p>
    </div>
  )
}
