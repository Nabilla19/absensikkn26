import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Helper function to load the Google Sheet document
async function getDoc() {
  // Format private key correctly (handling escaped newlines if passed directly in env)
  const privateKey = process.env.GOOGLE_PRIVATE_KEY 
    ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') 
    : '';

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID as string, serviceAccountAuth);
  await doc.loadInfo(); 
  return doc;
}

export async function GET() {
  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByIndex[0]; 
    
    try {
      await sheet.loadHeaderRow();
    } catch (e) {
      // If loadHeaderRow fails, it means the sheet is completely blank.
      return NextResponse.json([]); // Return empty array since there are no records
    }

    const rows = await sheet.getRows();

    // Mapping rows to JSON
    const records = rows.map((row: any) => ({
      id: row.rowIndex.toString(), // unique pseudo-id
      name: row.Nama || '',
      email: row.Email || '',
      role: row.Jabatan || '',
      timestamp: row['Waktu Absen'] || ''
    }));

    // Return reversed so newest is first
    return NextResponse.json(records.reverse());
  } catch (error: any) {
    console.error('Error fetching from Google Sheets:', error);
    return NextResponse.json({ error: 'Gagal memuat data dari Spreadsheet' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const doc = await getDoc();
    const sheet = doc.sheetsByIndex[0];

    try {
      await sheet.loadHeaderRow();
    } catch (e) {
      // If it fails, the sheet is empty. We must set headers first.
      await sheet.setHeaderRow(['Nama', 'Email', 'Jabatan', 'Waktu Absen']);
    }

    // Prepare new row
    const timestamp = new Date().toISOString();
    
    // Using object style row addition
    await sheet.addRow({
      'Nama': name,
      'Email': email,
      'Jabatan': role,
      'Waktu Absen': timestamp
    });

    return NextResponse.json({ success: true, timestamp });
  } catch (error: any) {
    console.error('Error appending to Google Sheets:', error);
    return NextResponse.json({ error: 'Gagal menyimpan ke Spreadsheet' }, { status: 500 });
  }
}
