'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDatabase } from '../contexts/DatabaseContext';
import { Html5Qrcode } from 'html5-qrcode';

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

// ⚠️ KOORDINAT RESMI POSKO PADANG LUAS ⚠️
// Lokasi: 5Q77+CH6, Padang Luas, Langgam, Pelalawan
const POSKO_LAT = 0.1635375; 
const POSKO_LNG = 101.763890625;
const MAX_DISTANCE_METERS = 1000; // Radius toleransi absen 1000 meter
const EXPECTED_QR_VALUE = "ABSEN-KKN-PADANG-LUAS-2026";

// Rumus Haversine untuk menghitung jarak antara 2 koordinat (dalam meter)
function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius bumi dalam km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c * 1000; // Jarak dalam meter
  return d;
}

export default function AttendanceForm() {
  const { data: session } = useSession();
  const user = session?.user;
  
  const { addRecord } = useDatabase();
  
  const [name, setName] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [showScanner, setShowScanner] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<string>('');

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  // Efek untuk Scanner QR Code
  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;
    
    if (showScanner) {
      html5QrCode = new Html5Qrcode("qr-reader");
      
      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          if (decodedText === EXPECTED_QR_VALUE) {
            if (html5QrCode?.isScanning) {
              html5QrCode.stop().then(() => {
                html5QrCode?.clear();
              }).catch(console.error);
            }
            setShowScanner(false);
            processLocationAndSubmit();
          } else {
            alert("QR Code salah! Mohon scan QR Code Posko yang resmi.");
          }
        },
        (err) => {
          // ignore scan errors (they happen every frame when no QR is detected)
        }
      ).catch((err) => {
        console.error("Gagal memulai kamera", err);
        alert("Tidak dapat mengakses kamera. Pastikan Anda telah memberikan izin kamera.");
        setShowScanner(false);
      });
    }

    return () => {
      if (html5QrCode?.isScanning) {
        html5QrCode.stop().then(() => {
          html5QrCode?.clear();
        }).catch(console.error);
      } else {
        html5QrCode?.clear();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScanner]);

  const initiateAbsen = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Nama tidak boleh kosong.");
    // Mulai proses dengan membuka scanner
    setShowScanner(true);
  };

  const processLocationAndSubmit = () => {
    setGpsStatus('Mencari koordinat GPS Anda...');
    setIsSubmitting(true);
    
    if (!navigator.geolocation) {
      setIsSubmitting(false);
      setGpsStatus('');
      alert("Browser Anda tidak mendukung GPS / Geolocation.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const distance = getDistanceFromLatLonInM(latitude, longitude, POSKO_LAT, POSKO_LNG);
        
        if (distance > MAX_DISTANCE_METERS) {
          setIsSubmitting(false);
          setGpsStatus('');
          alert(`Gagal absen! Anda berada di luar radius Posko.\nJarak Anda saat ini: ${Math.round(distance)} meter dari Posko.`);
          return;
        }

        // Lolos verifikasi QR dan GPS!
        setGpsStatus('Lokasi sesuai! Sedang menyimpan data...');
        const isSuccess = await addRecord({
          name,
          email: user?.email || '',
          role
        });
        
        setIsSubmitting(false);
        setGpsStatus('');
        
        if (isSuccess) {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 4000);
        } else {
          alert("Gagal mengirim absensi ke Spreadsheet. Coba lagi.");
        }
      },
      (error) => {
        setIsSubmitting(false);
        setGpsStatus('');
        let msg = "Gagal mengambil lokasi.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Izin lokasi ditolak! Anda WAJIB mengizinkan akses lokasi untuk bisa absen.";
        }
        alert(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
      <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        Formulir Absensi Kehadiran
      </h3>
      
      {success && (
        <div className="badge badge-success" style={{ display: 'block', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          ✓ Berhasil absen! (Verifikasi Lokasi GPS Valid)
        </div>
      )}

      {gpsStatus && (
        <div style={{ backgroundColor: '#fffbeb', color: '#b45309', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem', border: '1px solid #fde68a' }}>
          <span className="spinner" style={{ borderColor: '#b45309', borderRightColor: 'transparent', width: '12px', height: '12px', marginRight: '8px' }}></span>
          {gpsStatus}
        </div>
      )}

      {!showScanner ? (
        <form onSubmit={initiateAbsen}>
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

          <div style={{ 
            backgroundColor: '#eff6ff', 
            border: '1px solid #bfdbfe', 
            padding: '1rem', 
            borderRadius: '12px', 
            fontSize: '0.85rem', 
            color: '#1e40af',
            marginBottom: '1.5rem',
            lineHeight: 1.5
          }}>
            <strong>Syarat Kehadiran:</strong><br/>
            Anda wajib memindai QR Code Posko & berada dalam radius 1000m dari lokasi Kantor Desa Padang Luas.
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>
            Scan QR Posko & Hadir
          </button>
        </form>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h4 style={{ color: '#0f172a', fontWeight: 600 }}>Arahkan Kamera ke QR Code Posko</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Izinkan akses kamera di browser Anda.</p>
          </div>
          
          <div id="qr-reader" style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '2px solid #cbd5e1' }}></div>
          
          <button 
            type="button" 
            onClick={() => setShowScanner(false)} 
            className="btn btn-block" 
            style={{ backgroundColor: '#ef4444', color: 'white', marginTop: '1.5rem' }}
          >
            Batalkan & Kembali
          </button>
        </div>
      )}
    </div>
  );
}
