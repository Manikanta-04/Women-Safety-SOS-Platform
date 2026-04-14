import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../api/axios'
import styles from './Contacts.module.css'

const RELATIONSHIPS = ['parent', 'sibling', 'spouse', 'friend', 'colleague', 'other']

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardAvatar}>{contact.name[0].toUpperCase()}</div>
      <div className={styles.cardInfo}>
        <p className={styles.cardName}>{contact.name}</p>
        <p className={styles.cardPhone}>{contact.phone}</p>
        <span className="badge badge-gray">{contact.relationship}</span>
      </div>
      <div className={styles.cardActions}>
        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(contact)}>Edit</button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(contact._id)}>Remove</button>
      </div>
    </div>
  )
}

function ContactForm({ initial, onSave, onCancel, loading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initial || {}
  })
  return (
    <form onSubmit={handleSubmit(onSave)} className={styles.form}>
      <div className={styles.formRow}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input className={`form-input ${errors.name ? 'error' : ''}`} placeholder="Jane Doe"
            {...register('name', { required: 'Name is required' })} />
          {errors.name && <span className="form-error">⚠ {errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className={`form-input ${errors.phone ? 'error' : ''}`} placeholder="+91 9876543210"
            {...register('phone', { required: 'Phone is required' })} />
          {errors.phone && <span className="form-error">⚠ {errors.phone.message}</span>}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Relationship</label>
        <select className="form-input" {...register('relationship', { required: true })}>
          {RELATIONSHIPS.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="spinner" /> : initial?._id ? 'Save Changes' : 'Add Contact'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts')
      setContacts(res.data)
    } catch { toast.error('Failed to load contacts') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchContacts() }, [])

  const handleSave = async (data) => {
    setSaving(true)
    try {
      if (editing?._id) {
        const res = await api.put(`/contacts/${editing._id}`, data)
        setContacts(prev => prev.map(c => c._id === editing._id ? res.data.contact : c))
        toast.success('Contact updated')
      } else {
        const res = await api.post('/contacts', data)
        setContacts(prev => [res.data.contact, ...prev])
        toast.success('Contact added')
      }
      setShowForm(false)
      setEditing(null)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save contact')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this contact?')) return
    try {
      await api.delete(`/contacts/${id}`)
      setContacts(prev => prev.filter(c => c._id !== id))
      toast.success('Contact removed')
    } catch { toast.error('Failed to remove contact') }
  }

  const handleEdit = (contact) => {
    setEditing(contact)
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditing(null)
    setShowForm(false)
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 className="page-title">Emergency Contacts</h1>
            <p className="page-subtitle">People to notify in an emergency · {contacts.length}/5 used</p>
          </div>
          {!showForm && contacts.length < 5 && (
            <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true) }}>
              + Add Contact
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="card fade-in" style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20 }}>
            {editing ? 'Edit Contact' : 'New Contact'}
          </h2>
          <ContactForm initial={editing} onSave={handleSave} onCancel={handleCancel} loading={saving} />
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60 }}><span className="spinner" /></div>
      ) : contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <p>No emergency contacts yet.</p>
          <p style={{ marginTop: 6 }}>Add up to 5 trusted people.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {contacts.map(c => (
            <ContactCard key={c._id} contact={c} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}