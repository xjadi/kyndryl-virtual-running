/**
 * Running The Kyndryl Way 2026 — Google Apps Script
 * =============================================
 * Deploy this as a Web App:
 *   1. Open your Google Sheet → Extensions → Apps Script
 *   2. Paste this code, replacing any existing code
 *   3. Click "Deploy" → "New deployment"
 *   4. Type: Web app
 *   5. Execute as: Me
 *   6. Who has access: Anyone
 *   7. Click Deploy → Copy the Web App URL
 *   8. Paste that URL into config.js (GAS_URL)
 *
 * Sheet Setup:
 *   - The script uses a sheet named "Runners" (auto-created if missing)
 *   - Headers are created automatically on first run
 *
 * Drive Setup:
 *   - Screenshots are saved to a folder named DRIVE_FOLDER_NAME in your Drive
 *   - The folder is auto-created if it does not exist
 *   - Each file is shared as "Anyone with the link can view"
 */

const SHEET_NAME       = 'Runners';
const DRIVE_FOLDER_NAME = 'RunTrack Screenshots';
const HEADERS = ['name', 'finish_date', 'finish_time', 'distance', 'pace', 'time', 'submitted_at', 'screenshot_url'];

// ── GET: leaderboard fetch & health check ──
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'leaderboard') {
      return handleLeaderboard();
    }

    // Default: health check
    return jsonResponse({ status: 'ok', message: 'Running The Kyndryl Way 2026 API is running' });

  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

// ── POST: submit a new runner row (with optional Drive image upload) ──
function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    return handleSubmit(params);
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

// ── SUBMIT: save screenshot to Drive, append row to Sheet ──
function handleSubmit(params) {
  const sheet = getOrCreateSheet();

  const name     = (params.name || '').trim();
  const distance = parseFloat(params.distance) || 0;

  if (!name) {
    return jsonResponse({ error: 'Name is required' });
  }
  if (distance <= 0) {
    return jsonResponse({ error: 'Distance must be greater than 0' });
  }

  // ── Save screenshot to Google Drive ──
  let screenshotUrl = '';
  if (params.image_base64 && params.image_mime) {
    try {
      screenshotUrl = saveImageToDrive(params.image_base64, params.image_mime, name);
    } catch (imgErr) {
      // Don't block submission if Drive upload fails
      console.error('Drive upload failed: ' + imgErr.message);
    }
  }

  // ── Append row ──
  const submitAt = (params.submit_at || '').trim() || new Date().toLocaleString('en-US');

  sheet.appendRow([
    name,
    params.finish_date || '',
    params.finish_time || '',
    distance,
    params.pace        || '',
    params.time        || '',
    "'" + submitAt,    // leading apostrophe forces Sheets to treat as plain text
    screenshotUrl
  ]);

  // Ensure submitted_at (col 7) is plain text
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 7).setNumberFormat('@STRING@');

  return jsonResponse({ success: true, screenshotUrl });
}

// ── LEADERBOARD: aggregate and return runner totals ──
function handleLeaderboard() {
  const sheet = getOrCreateSheet();
  const data  = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return jsonResponse([]);
  }

  const rows = data.slice(1)
    .filter(row => row[0] && row[3])   // must have name and distance
    .map(row => ({
      name:           String(row[0] || ''),
      finish_date:    String(row[1] || ''),
      finish_time:    String(row[2] || ''),
      distance:       parseFloat(row[3]) || 0,
      pace:           String(row[4] || ''),
      time:           String(row[5] || ''),
      submitted_at:   String(row[6] || ''),
      screenshot_url: String(row[7] || '')
    }));

  rows.sort((a, b) => b.distance - a.distance);
  return jsonResponse(rows);
}

// ── DRIVE: decode base64 image and save to dedicated folder ──
function saveImageToDrive(base64Data, mimeType, runnerName) {
  // Strip data-URL prefix if present (e.g. "data:image/jpeg;base64,...")
  const base64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;

  const blob = Utilities.newBlob(
    Utilities.base64Decode(base64),
    mimeType,
    buildFileName(runnerName, mimeType)
  );

  const folder = getDriveFolder();
  const file   = folder.createFile(blob);

  // Make viewable by anyone with the link
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  // Return a direct view URL
  return 'https://drive.google.com/file/d/' + file.getId() + '/view';
}

function buildFileName(runnerName, mimeType) {
  const ext  = mimeType.split('/')[1] || 'jpg';
  const safe = runnerName.replace(/[^a-zA-Z0-9_\-]/g, '_').substring(0, 40);
  const ts   = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
  return safe + '_' + ts + '.' + ext;
}

function getDriveFolder() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  // Auto-create if it doesn't exist
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

// ── HELPERS ──
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);

    // Style header row
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1a1a2e');
    headerRange.setFontColor('#ffffff');

    // Force submitted_at (col 7) and screenshot_url (col 8) to plain text
    sheet.getRange(2, 7, sheet.getMaxRows() - 1, 2).setNumberFormat('@STRING@');
  } else {
    // If sheet exists but is missing the screenshot_url header column, add it
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (!headers.includes('screenshot_url')) {
      const newCol = sheet.getLastColumn() + 1;
      sheet.getRange(1, newCol).setValue('screenshot_url').setFontWeight('bold');
    }
  }

  return sheet;
}

function jsonResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
