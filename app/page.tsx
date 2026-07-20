'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import LoginBox from './components/LoginBox';
import AttendanceForm from './components/AttendanceForm';
import RealtimeRecap from './components/RealtimeRecap';

export default function Home() {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === 'loading') {
    return (
      <main className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <span className="spinner"></span> Memuat...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container animate-fade-in" style={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
        <LoginBox />
      </main>
    );
  }

  return (
    <>
      {/* Blurred Posko Background for Dashboard */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/posko.png" 
          alt="Posko Background" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}></div>
      </div>

      <header className="header animate-fade-in">
        <div className="header-content">
          <h1 className="text-gradient" style={{ margin: 0, fontSize: '1.5rem' }}>Portal Absensi KKN</h1>
          
          <div className="user-profile">
            <div className="user-info" style={{ textAlign: 'right', overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{user.email}</div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={user.image || ''} 
              alt="Profile" 
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--glass-border)', background: 'var(--bg-secondary)' }}
            />
            <button onClick={() => signOut()} className="logout-btn" title="Keluar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingTop: '100px', zIndex: 1, position: 'relative' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="greeting-title" style={{ fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Selamat Datang, <br className="mobile-break" />
            <span style={{ color: 'var(--accent-primary)' }}>{user.name}</span>!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Silakan isi daftar hadir untuk kegiatan KKN hari ini.</p>
        </div>

        <div className="dashboard-grid">
          <div>
            <AttendanceForm />
          </div>
          <div>
            <RealtimeRecap />
          </div>
        </div>
      </main>

      <style>{`
        .greeting-title {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          word-break: break-word;
        }
        .mobile-break {
          display: none;
        }
        @media (max-width: 768px) {
          .greeting-title {
            font-size: 1.75rem;
          }
          .mobile-break {
            display: block;
          }
          .header-content {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          .user-profile {
            width: 100%;
            justify-content: flex-end;
          }
          .user-info {
            text-align: right;
          }
        }
      `}</style>
    </>
  );
}
