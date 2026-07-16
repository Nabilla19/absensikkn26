'use client';

import React, { useState, useMemo } from 'react';
import { useDatabase } from '../contexts/DatabaseContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function RealtimeRecap() {
  const { records } = useDatabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState(''); // Format: YYYY-MM-DD

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Filter records based on search query and date
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          record.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchDate = true;
      if (filterDate) {
        // record.timestamp is ISO string, e.g. "2026-07-16T12:00:00.000Z"
        // we can slice the first 10 chars to get YYYY-MM-DD (UTC based)
        // For accurate local timezone comparison, we should format record.timestamp to YYYY-MM-DD in local time
        const dateObj = new Date(record.timestamp);
        const localDateString = dateObj.toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD format
        matchDate = localDateString === filterDate;
      }

      return matchSearch && matchDate;
    });
  }, [records, searchQuery, filterDate]);

  // Export to CSV
  const exportToCSV = () => {
    if (filteredRecords.length === 0) return alert('Tidak ada data untuk diekspor');
    
    const headers = ['Nama Lengkap', 'Jabatan', 'Waktu Absen', 'Tanggal Absen', 'Email'];
    const csvRows = [headers.join(',')];

    filteredRecords.forEach(record => {
      const row = [
        `"${record.name}"`,
        `"${record.role}"`,
        `"${formatTime(record.timestamp)}"`,
        `"${formatDate(record.timestamp)}"`,
        `"${record.email}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rekap_Absensi_KKN_${filterDate || 'Semua'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF using jsPDF and jspdf-autotable
  const exportToPDF = () => {
    if (filteredRecords.length === 0) return alert('Tidak ada data untuk diekspor');

    const doc = new jsPDF('p', 'pt', 'a4');
    
    // Add Header Text
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Laporan Rekap Absensi KKN UIN SUSKA Riau', 40, 40);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Desa Padang Luas, Langgam, Pelalawan`, 40, 55);
    doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 40, 70);
    if (filterDate) {
      doc.text(`Filter Tanggal: ${filterDate}`, 40, 85);
    }

    const tableColumn = ["No", "Nama Lengkap", "Jabatan", "Waktu", "Tanggal"];
    const tableRows = filteredRecords.map((record, index) => [
      (index + 1).toString(),
      record.name,
      record.role,
      formatTime(record.timestamp),
      formatDate(record.timestamp)
    ]);

    // Generate Table
    // @ts-ignore
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: filterDate ? 100 : 85,
      theme: 'grid',
      styles: { fontSize: 9, font: 'helvetica' },
      headStyles: { fillColor: [37, 99, 235] }, // accent primary color
    });

    doc.save(`Rekap_Absensi_KKN_${filterDate || 'Semua'}.pdf`);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', animationDelay: '0.2s', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
        <h3>Rekap Kehadiran</h3>

      </div>

      {/* Toolbar (Search, Filter, Export) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'flex-end', background: 'rgba(255,255,255,0.6)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', flex: 1 }}>
          {/* Search Input */}
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>Cari Nama/Jabatan</label>
            <input 
              type="text" 
              placeholder="Ketik untuk mencari..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            />
          </div>

          {/* Date Filter */}
          <div style={{ flex: '1 1 150px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>Filter Tanggal</label>
            <input 
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="form-input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Export Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={exportToCSV}
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: '0.2s', boxShadow: '0 2px 4px rgba(16,185,129,0.2)' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#10b981'}
          >
            ↓ CSV
          </button>
          <button 
            onClick={exportToPDF}
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: '0.2s', boxShadow: '0 2px 4px rgba(239,68,68,0.2)' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#dc2626'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#ef4444'}
          >
            ↓ PDF
          </button>
        </div>

      </div>

      <div className="table-container" style={{ marginTop: '0.5rem' }}>
        {filteredRecords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
            Belum ada data absensi yang sesuai.
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Waktu</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
                <tr key={record.id} className="animate-fade-in">
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{record.name}</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
                      {record.role}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: '#334155' }}>{formatTime(record.timestamp)}</td>
                  <td style={{ fontSize: '0.85rem', color: '#64748b' }}>{formatDate(record.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Table Footer info */}
      <div style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'right' }}>
        Menampilkan {filteredRecords.length} data
      </div>
    </div>
  );
}
