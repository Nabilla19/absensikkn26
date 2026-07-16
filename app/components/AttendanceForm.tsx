'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDatabase } from '../contexts/DatabaseContext';

const ROLES = [
  'Koordinator Desa',
  'Wakil Koordinator Desa',
  'Sekretaris',
  'Bendahara',
  'Humas',
  'Acara',
  'Perlengkapan',
  'Korlap',
  'PDD',
];

export default function AttendanceForm() {
  const { data: session } = useSession();
  const user = session?.user;
  
  const { addRecord } = useDatabase();
  
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);
  const [role, setRole] = useState(ROLES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setSuccess(false);

    const success = await addRecord({
      name,
      email: user.email,
      role
    });
    
    setIsSubmitting(false);
    
    if (success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert("Gagal mengirim absensi, periksa koneksi internet atau pengaturan Google Sheet.");
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
      <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        Formulir Absensi
      </h3>
      
      {success && (
        <div className="badge badge-success" style={{ display: 'block', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          ✓ Berhasil melakukan absensi!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Nama Lengkap</label>
          <input 
            id="name"
            type="text" 
            className="form-input" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="role">Struktur / Jabatan</label>
          <select 
            id="role"
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            {ROLES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
          {isSubmitting ? (
            <><span className="spinner"></span> Mengirim...</>
          ) : (
            'Kirim / Hadir'
          )}
        </button>
      </form>
    </div>
  );
}
