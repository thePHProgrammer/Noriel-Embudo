import { useState } from 'react';

const INQUIRY_OPTIONS = [
  { value: '', label: 'Select reason for contact...' },
  { value: 'Full-time Role', label: '💼 Full-time Role' },
  { value: 'Part-time Role', label: '🕐 Part-time Role' },
  { value: 'Consultation', label: '🤝 Consultation' },
  { value: 'Collaboration', label: '🚀 Collaboration' },
  { value: 'Freelance Project', label: '⚡ Freelance Project' },
  { value: 'Other', label: '✉ Other' },
];

export function ContactForm({ onSuccess }) {
  const [fields, setFields] = useState({ name: '', email: '', inquiry: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  function onChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);
      fd.append('subject', `Portfolio Contact [${fields.inquiry || 'General'}] — Noriel Joy Embudo`);
      fd.append('name', fields.name);
      fd.append('email', fields.email);
      fd.append('Reason for Contact', fields.inquiry);
      fd.append('message', fields.message);
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const json = await res.json();
      if (json.success) {
        onSuccess();
        setFields({ name: '', email: '', inquiry: '', message: '' });
      } else {
        alert('Transmission failed. Try again.');
      }
    } catch {
      alert('Transmission failed. Check your connection.');
    }
    setSubmitting(false);
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Your name" required value={fields.name} onChange={onChange} />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input type="email" name="email" placeholder="you@example.com" required value={fields.email} onChange={onChange} />
        </div>
      </div>
      <div className="form-field">
        <label>Reason for Contact</label>
        <select name="inquiry" required value={fields.inquiry} onChange={onChange} className="form-select">
          {INQUIRY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label>Message</label>
        <textarea name="message" rows="4" placeholder="What's the mission?" required value={fields.message} onChange={onChange} />
      </div>
      <button type="submit" className="btn-send" disabled={submitting}>
        {submitting ? 'Transmitting...' : 'Transmit Message →'}
      </button>
    </form>
  );
}
