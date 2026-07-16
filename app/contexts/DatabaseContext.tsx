'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AttendanceRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  timestamp: string; 
};

type DatabaseContextType = {
  records: AttendanceRecord[];
  addRecord: (record: Omit<AttendanceRecord, 'id' | 'timestamp'>) => Promise<boolean>;
  refreshRecords: () => void;
};

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const fetchRecords = useCallback(async () => {
    try {
      const res = await fetch('/api/attendance');
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (err) {
      console.error('Gagal memuat absensi', err);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
    // Polling tiap 5 detik untuk simulasi real-time
    const intervalId = setInterval(fetchRecords, 5000);
    return () => clearInterval(intervalId);
  }, [fetchRecords]);

  const addRecord = async (data: Omit<AttendanceRecord, 'id' | 'timestamp'>) => {
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        fetchRecords(); // Segera segarkan tabel
        return true;
      }
      return false;
    } catch (err) {
      console.error('Gagal mengirim absensi', err);
      return false;
    }
  };

  return (
    <DatabaseContext.Provider value={{ records, addRecord, refreshRecords: fetchRecords }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
