'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginBox() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      fontFamily: 'var(--font-sans)',
      backgroundColor: '#fff',
    }} className="login-container">

      {/* ======= LEFT PANEL: Info KKN (Full Height) ======= */}
      <div style={{
        background: 'linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
      }} className="left-panel">
        
        {/* Top logos */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4rem', zIndex: 2 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo%20uin.png" alt="Logo UIN Suska" style={{ width: '50px', height: '50px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo%20.jpeg" alt="Logo KKN" style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)' }} />
          <div style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.4 }}>
            KKN UIN<br/>SUSKA RIAU
          </div>
        </div>

        {/* Main Text Content */}
        <div style={{ zIndex: 2, marginTop: 'auto', marginBottom: 'auto' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '3.5rem', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            Desa<br/>Padang Luas
          </h1>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2.5rem',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            maxWidth: '450px'
          }}>
            <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tema KKN
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
              "Sinergi Mahasiswa dan Masyarakat dalam Mengembangkan Kearifan Lokal"
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              display: 'inline-block',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              borderLeft: '4px solid #60a5fa'
            }}>
              "Bersatu Mengabdi, Berkarya untuk Negeri"
            </div>
          </div>

          {/* DPL section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dpl.jpeg"
              alt="Foto DPL"
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid rgba(255,255,255,0.5)' }}
            />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Dosen Pembimbing Lapangan</div>
              <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700, marginTop: '2px' }}>Dr. Nunu Mahnun, M.Pd.</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Langgam, Pelalawan</div>
            </div>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div style={{
          position: 'absolute', top: '10%', right: '-10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 60%)',
          pointerEvents: 'none', zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute', bottom: '-15%', left: '-15%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 60%)',
          pointerEvents: 'none', zIndex: 1
        }}></div>
      </div>

      {/* ======= RIGHT PANEL: Login Form (Full Height) ======= */}
      <div style={{
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem',
      }} className="right-panel">
        
        <div className="login-form-wrapper" style={{ width: '100%', maxWidth: '420px' }}>
          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.25rem',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '0.5rem',
            lineHeight: 1.2,
          }}>Portal Absensi KKN</h1>
          <p style={{ color: '#64748b', marginBottom: '3rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Gunakan akun Google akademik UIN SUSKA Riau Anda untuk mengakses sistem kehadiran.
          </p>

          {/* Error */}
          {error === 'AccessDenied' && (
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#b91c1c',
              border: '1px solid #fecaca',
              marginBottom: '2rem',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              lineHeight: 1.6,
            }}>
              ⚠️ Akses ditolak! Gunakan email berakhiran<br/><strong>@students.uin-suska.ac.id</strong>
            </div>
          )}

          {/* Google Login Button */}
          <button
            onClick={() => signIn('google')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%',
              padding: '1rem 1.5rem',
              backgroundColor: '#fff',
              color: '#3c4043',
              border: '1.5px solid #dadce0',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.boxShadow = '0 6px 20px rgba(59,130,246,0.2)';
              btn.style.borderColor = '#93c5fd';
              btn.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
              btn.style.borderColor = '#dadce0';
              btn.style.transform = 'translateY(0)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Lanjutkan dengan Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2.5rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>INFORMASI</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          </div>

          {/* Info box */}
          <div style={{
            background: '#f8faff',
            border: '1px solid #dbeafe',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              Sistem absensi ini terbatas eksklusif untuk akun <strong style={{ color: '#1e40af' }}>@students.uin-suska.ac.id</strong>.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        /* Responsive CSS for Full Screen Split Layout */
        @media (max-width: 900px) {
          .login-container {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
            min-height: 100vh;
          }
          .left-panel {
            padding: 3rem 2rem !important;
          }
          .right-panel {
            padding: 3rem 2rem !important;
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}
