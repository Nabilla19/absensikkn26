'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginBox() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="login-wrapper">
      {/* ======= LEFT PANEL / TOP HEADER (Mobile) ======= */}
      <div className="brand-panel">
        
        {/* Top logos */}
        <div className="logo-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo%20uin.png" alt="Logo UIN Suska" className="brand-logo" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo%20.jpeg" alt="Logo KKN" className="brand-logo rounded" />
          <div className="brand-text">
            KKN UIN<br/>SUSKA RIAU
          </div>
        </div>

        {/* Main Text Content */}
        <div className="brand-content">
          <h1>Desa<br/>Padang Luas</h1>
          
          <div className="tema-box">
            <h3>Tema KKN</h3>
            <p>"Sinergi Mahasiswa dan Masyarakat dalam Mengembangkan Kearifan Lokal"</p>
            <div className="slogan">"Bersatu Mengabdi, Berkarya untuk Negeri"</div>
          </div>

          {/* DPL section */}
          <div className="dpl-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dpl.jpeg" alt="Foto DPL" />
            <div>
              <div className="dpl-title">Dosen Pembimbing Lapangan</div>
              <div className="dpl-name">Dr. Nunu Mahnun, M.Pd.</div>
              <div className="dpl-location">Langgam, Pelalawan</div>
            </div>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="circle-bg circle-1"></div>
        <div className="circle-bg circle-2"></div>
      </div>

      {/* ======= RIGHT PANEL / BOTTOM FORM (Mobile) ======= */}
      <div className="form-panel">
        <div className="login-card">
          <h2>Portal Absensi</h2>
          <p className="subtitle">
            Gunakan akun Google akademik UIN SUSKA Riau Anda untuk masuk.
          </p>

          {/* Error */}
          {error === 'AccessDenied' && (
            <div className="error-alert">
              ⚠️ Akses ditolak! Gunakan email berakhiran<br/><strong>@students.uin-suska.ac.id</strong>
            </div>
          )}

          {/* Google Login Button */}
          <button onClick={() => signIn('google')} className="google-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Lanjutkan dengan Google
          </button>

          <div className="divider">
            <div className="line"></div>
            <span>INFORMASI</span>
            <div className="line"></div>
          </div>

          <div className="info-alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p>
              Sistem absensi ini eksklusif untuk akun <strong style={{ color: '#1e40af' }}>@students.uin-suska.ac.id</strong>.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        /* --- Base Layout --- */
        .login-wrapper {
          display: flex;
          min-height: 100vh;
          width: 100%;
          font-family: var(--font-sans);
          background-color: #f1f5f9;
        }

        /* --- Brand Panel (Left on Desktop, Top on Mobile) --- */
        .brand-panel {
          flex: 1;
          background: linear-gradient(145deg, #1e3a8a 0%, #1d4ed8 100%);
          color: white;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          z-index: 2;
        }
        .brand-logo {
          width: 48px;
          height: 48px;
          object-fit: contain;
          background: white;
          padding: 4px;
          border-radius: 8px;
        }
        .brand-logo.rounded {
          border-radius: 50%;
          padding: 0;
          border: 2px solid rgba(255,255,255,0.8);
        }
        .brand-text {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          line-height: 1.3;
        }

        .brand-content {
          z-index: 2;
          margin: auto 0;
          max-width: 500px;
        }
        .brand-content h1 {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 2rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        
        .tema-box {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 1.5rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          margin-bottom: 2.5rem;
        }
        .tema-box h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          color: rgba(255,255,255,0.9);
        }
        .tema-box p {
          font-size: 1rem;
          font-style: italic;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .slogan {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          border-left: 3px solid #60a5fa;
        }

        .dpl-box {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .dpl-box img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.5);
          object-fit: cover;
          object-position: top;
        }
        .dpl-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.7);
          font-weight: 600;
        }
        .dpl-name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-top: 2px;
        }
        .dpl-location {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
        }

        /* Decor */
        .circle-bg {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.08), transparent 60%);
          z-index: 1;
        }
        .circle-1 { top: -10%; right: -10%; width: 500px; height: 500px; }
        .circle-2 { bottom: -15%; left: -10%; width: 600px; height: 600px; }


        /* --- Form Panel (Right on Desktop, Bottom on Mobile) --- */
        .form-panel {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          background-color: #f8fafc;
        }

        .login-card {
          background: white;
          width: 100%;
          max-width: 400px;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
        }
        
        .login-card h2 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .login-card .subtitle {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 2.5rem;
        }

        .error-alert {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
          padding: 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 0.85rem;
          background: white;
          color: #334155;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .google-btn:hover {
          border-color: #94a3b8;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transform: translateY(-1px);
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .divider .line {
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }
        .divider span {
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 600;
        }

        .info-alert {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          gap: 12px;
        }
        .info-alert p {
          font-size: 0.8rem;
          color: #334155;
          margin: 0;
          line-height: 1.5;
        }


        /* --- Mobile Responsive Rules --- */
        @media (max-width: 900px) {
          .login-wrapper {
            flex-direction: column;
            background-color: #1e3a8a; /* match header */
          }
          .brand-panel {
            flex: none;
            padding: 2.5rem 1.5rem 5rem 1.5rem;
            text-align: center;
          }
          .logo-container {
            justify-content: center;
            margin-bottom: 2rem;
          }
          .brand-text {
            text-align: left;
          }
          .brand-content h1 {
            font-size: 2.2rem;
            margin-bottom: 1rem;
          }
          .tema-box {
            display: none; /* Hide on mobile for clean look */
          }
          .dpl-box {
            justify-content: center;
            text-align: left;
          }
          
          /* The floating card effect on mobile */
          .form-panel {
            padding: 0 1.5rem 2.5rem 1.5rem;
            background: transparent;
            align-items: flex-start;
            position: relative;
            z-index: 10;
          }
          .login-card {
            margin-top: -3rem; /* Float over the blue header */
            padding: 2rem 1.5rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            position: relative;
            z-index: 10;
          }
          
          .circle-1 { width: 300px; height: 300px; }
          .circle-2 { width: 300px; height: 300px; }
        }
      `}</style>
    </div>
  );
}
