import { useState } from 'react';
import { META } from '../../data/meta';

export function ContactForm({ onSuccess }) {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  function onChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('access_key', META.web3formsKey);
      fd.append('subject', 'Portfolio Contact — Noriel Joy Embudo');
      fd.append('name', fields.name);
      fd.append('email', fields.email);
      fd.append('message', fields.message);
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const json = await res.json();
      if (json.success) {
        onSuccess();
        setFields({ name: '', email: '', message: '' });
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
        <label>Message</label>
        <textarea name="message" rows="5" placeholder="What's the mission?" required value={fields.message} onChange={onChange} />
      </div>
      <button type="submit" className="btn-send" disabled={submitting}>
        {submitting ? 'Transmitting...' : 'Transmit Message →'}
      </button>
    </form>
  );
}
