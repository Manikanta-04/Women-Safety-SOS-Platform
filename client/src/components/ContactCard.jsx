export default function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        transition: 'border-color var(--transition)',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'var(--bg-3)',
          border: '1px solid var(--border-light)',
          color: 'var(--text-2)',
          fontSize: 16,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {contact.name[0].toUpperCase()}
      </div>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{contact.name}</p>
        <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--mono)' }}>{contact.phone}</p>
        <span className="badge badge-gray">{contact.relationship}</span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(contact)}>Edit</button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(contact._id)}>Remove</button>
      </div>
    </div>
  )
}
