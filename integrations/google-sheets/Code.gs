function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  const expected = props.getProperty("SHARED_SECRET");
  let record;
  try {
    record = JSON.parse(e.postData.contents || "{}");
  } catch (error) {
    return json({ ok: false, error: "invalid_json" });
  }

  const supplied = record.authToken || "";
  delete record.authToken;
  if (!expected || supplied !== expected) return json({ ok: false, error: "unauthorized" });

  const required = ["leadId", "serviceLine", "locale", "name", "email", "phone", "pickupDate", "returnDate", "pickupLocation"];
  if (required.some(function (key) { return !record[key]; })) {
    return json({ ok: false, error: "missing_fields" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheetId = props.getProperty("SPREADSHEET_ID");
    const sheetName = props.getProperty("SHEET_NAME") || "Vehicle enquiries";
    if (!spreadsheetId) return json({ ok: false, error: "missing_spreadsheet_id" });
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) sheet = spreadsheet.insertSheet(sheetName);

    const headers = [
      "Lead ID", "Received at", "Service line", "Locale", "Name", "Email", "Phone",
      "Company", "WeChat ID", "Preferred channel", "Pickup date", "Pickup time",
      "Return date", "Return time", "Pickup location", "Passengers", "Luggage",
      "Vehicle", "Vehicle category", "Travel arrangement", "Add-ons", "Message", "Marketing consent",
      "Consent timestamp", "Source page"
    ];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
    }
    const values = [
      record.leadId, record.receivedAt, record.serviceLine, record.locale, record.name,
      record.email, record.phone, record.company, record.wechatId, record.preferredChannel,
      record.pickupDate, record.pickupTime, record.returnDate, record.returnTime,
      record.pickupLocation, record.passengers, record.luggage, record.vehicle,
      record.vehicleCategory, record.travelStyle, Array.isArray(record.addOns) ? record.addOns.join(", ") : "",
      record.message, record.marketingConsent ? "yes" : "no", record.consentAt,
      record.sourcePath
    ].map(safeCell);
    const existing = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1).getValues().flat();
    if (existing.indexOf(record.leadId) !== -1) return json({ ok: true, duplicate: true });
    sheet.appendRow(values);
    return json({ ok: true, leadId: record.leadId });
  } finally {
    lock.releaseLock();
  }
}

function safeCell(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  return /^[=+@-]/.test(text) ? "'" + text : text;
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
