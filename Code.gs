/**
 * RunTrack Virtual Event — Google Apps Script
 * =============================================
 * Deploy this as a Web App:
 *   1. Open your Google Sheet → Extensions → Apps Script
 *   2. Paste this code, replacing any existing code
 *   3. Click "Deploy" → "New deployment"
 *   4. Type: Web app
 *   5. Execute as: Me
 *   6. Who has access: Anyone
 *   7. Click Deploy → Copy the Web App URL
 *   8. Paste that URL into the RunTrack upload & leaderboard pages
 *
 * Sheet Setup:
 *   - The script uses a sheet named "Runners" (auto-created if missing)
 *   - Headers are created automatically on first run
 */

const SHEET_NAME = 'Runners';
const HEADERS = ['name', 'finish_date', 'finish_time', 'distance', 'pace', 'time', 'submitted_at'];

// ── GET: handles both leaderboard fetch and data submission ──
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'submit') {
      return handleSubmit(e.parameter);
    }

    if (action === 'leaderboard') {
      return handleLeaderboard();
    }

    // Default: health check
    return jsonResponse({ status: 'ok', message: 'RunTrack API is running' });

  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}

// ── SUBMIT: append a new runner row ──
function handleSubmit(params) {
  const sheet = getOrCreateSheet();

  const name = (params.name || '').trim();
  const distance = parseFloat(params.distance) || 0;

  if (!name) {
    return jsonResponse({ error: 'Name is required' }, 400);
  }

  if (distance <= 0) {
    return jsonResponse({ error: 'Distance must be greater than 0' }, 400);
  }

  // Force submitted_at to plain text so Sheets won't auto-parse it as a Date
  const submitAt = (params.submit_at || '').trim() || new Date().toLocaleString('en-US');

  sheet.appendRow([
    name,
    params.finish_date || '',
    params.finish_time || '',
    distance,
    params.pace || '',
    params.time || '',
    "'" + submitAt           // leading apostrophe forces Google Sheets to treat as text
  ]);

  // Ensure the submitted_at column is formatted as plain text (col 7 = G)
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 7).setNumberFormat('@STRING@');

  return jsonResponse({ success: true, message: 'Runner submitted successfully' });
}

// ── LEADERBOARD: return all runners sorted by distance ──
function handleLeaderboard() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();

  // Only headers row = no data yet
  if (data.length <= 1) {
    return jsonResponse([]);
  }

  const rows = data.slice(1)
    .filter(row => row[0] && row[3]) // must have name and distance
    .map(row => ({
      name: String(row[0] || ''),
      finish_date: String(row[1] || ''),
      finish_time: String(row[2] || ''),
      distance: parseFloat(row[3]) || 0,
      pace: String(row[4] || ''),
      time: String(row[5] || ''),
      submitted_at: String(row[6] || '')
    }));

  // Sort by distance descending (longest first)
  rows.sort((a, b) => b.distance - a.distance);

  return jsonResponse(rows);
}

// ── HELPERS ──
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);

    // Style the header row
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1a1a2e');
    headerRange.setFontColor('#ffffff');

    // Force submitted_at column (col 7) to plain text so dates are never auto-parsed
    sheet.getRange(2, 7, sheet.getMaxRows() - 1, 1).setNumberFormat('@STRING@');
  }

  return sheet;
}

function jsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
