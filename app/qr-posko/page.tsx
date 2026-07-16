'use client';

import React from 'react';
import QRCode from 'react-qr-code';

export default function QRPosko() {
  const qrValue = "ABSEN-KKN-PADANG-LUAS-2026";

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8fafc',
      fontFamily: 'var(--font-sans)',
      padding: '2rem',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          QR Code Posko
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.5 }}>
          Cetak (Print) halaman ini dan tempelkan di dinding Posko KKN Desa Padang Luas. Mahasiswa wajib men-scan QR ini saat absen.
        </p>

        <div style={{
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '16px',
          display: 'inline-block',
          border: '2px dashed #cbd5e1',
          marginBottom: '2rem'
        }}>
          <QRCode
            value={qrValue}
            size={250}
            level="H"
            bgColor="#ffffff"
            fgColor="#1e3a8a"
          />
        </div>

        <div style={{
          backgroundColor: '#eff6ff',
          color: '#1d4ed8',
          padding: '1rem',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '0.9rem',
          letterSpacing: '0.05em'
        }}>
          Gunakan tombol [Scan QR Posko] di halaman Absensi
        </div>
      </div>

      <button
        onClick={() => window.print()}
        style={{
          marginTop: '2rem',
          padding: '0.8rem 2rem',
          backgroundColor: '#1e3a8a',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(30,58,138,0.3)',
        }}
      >
        🖨️ Cetak QR Code Ini
      </button>
    </div>
  );
}
