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

  const commonRequired = ["leadId", "serviceLine", "locale", "name", "email", "phone", "consentAt"];
  if (commonRequired.some(function (key) { return !record[key]; })) {
    return json({ ok: false, error: "missing_common_fields" });
  }

  const line = record.serviceLine;
  if (line === "vehicle-rental") {
    if (!record.pickupDate || !record.returnDate || !record.pickupLocation) {
      return json({ ok: false, error: "missing_vehicle_fields" });
    }
  } else if (line === "tours-travel") {
    if (!record.startDate || !record.tripLength || !record.passengers || !record.departureCity) {
      return json({ ok: false, error: "missing_tour_fields" });
    }
  } else if (line === "event-design") {
    if (!record.eventDate || !record.occasionType || !record.venue || !record.headcount) {
      return json({ ok: false, error: "missing_event_fields" });
    }
  } else if (line === "gift-boxes") {
    if (!record.deliveryDate || !record.deliveryArea || !record.quantity || !record.recipientName || !record.recipientPhone) {
      return json({ ok: false, error: "missing_gift_fields" });
    }
  } else {
    return json({ ok: false, error: "invalid_service_line" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheetId = props.getProperty("SPREADSHEET_ID");
    const sheetName = props.getProperty("SHEET_NAME") || "Website enquiries";
    if (!spreadsheetId) return json({ ok: false, error: "missing_spreadsheet_id" });
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) sheet = spreadsheet.insertSheet(sheetName);

    const requiredHeaders = [
      "Lead ID", "Received at", "Service line", "Locale", "Timezone", "Name", "Email", "Phone",
      "Company", "WeChat ID", "Preferred channel", "Pickup date", "Pickup time",
      "Return date", "Return time", "Pickup location", "Destination / drop-off",
      "Passengers", "Luggage", "Vehicle", "Vehicle category", "Travel arrangement",
      "Add-ons", "Message", "Marketing consent", "Consent timestamp", "Source page",
      "Service details JSON"
    ];
    let headers;
    if (sheet.getLastRow() === 0) {
      headers = requiredHeaders;
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
    } else {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
      const missing = requiredHeaders.filter(function (header) { return headers.indexOf(header) === -1; });
      if (missing.length) {
        sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
        headers = headers.concat(missing);
      }
    }

    const serviceDetails = {};
    Object.keys(record).forEach(function (key) {
      if ([
        "leadId", "receivedAt", "serviceLine", "locale", "timeZone", "name", "email", "phone",
        "company", "wechatId", "preferredChannel", "pickupDate", "pickupTime", "returnDate",
        "returnTime", "pickupLocation", "dropoffLocation", "passengers", "luggage", "vehicle",
        "vehicleCategory", "travelStyle", "addOns", "message", "marketingConsent", "consentAt",
        "sourcePath"
      ].indexOf(key) === -1) serviceDetails[key] = record[key];
    });

    const cells = {
      "Lead ID": record.leadId,
      "Received at": record.receivedAt,
      "Service line": record.serviceLine,
      "Locale": record.locale,
      "Timezone": record.timeZone,
      "Name": record.name,
      "Email": record.email,
      "Phone": record.phone,
      "Company": record.company,
      "WeChat ID": record.wechatId,
      "Preferred channel": record.preferredChannel,
      "Pickup date": record.pickupDate,
      "Pickup time": record.pickupTime,
      "Return date": record.returnDate,
      "Return time": record.returnTime,
      "Pickup location": record.pickupLocation,
      "Destination / drop-off": record.dropoffLocation,
      "Passengers": record.passengers,
      "Luggage": record.luggage,
      "Vehicle": record.vehicle,
      "Vehicle category": record.vehicleCategory,
      "Travel arrangement": record.travelStyle,
      "Add-ons": Array.isArray(record.addOns) ? record.addOns.join(", ") : "",
      "Message": record.message,
      "Marketing consent": record.marketingConsent ? "yes" : "no",
      "Consent timestamp": record.consentAt,
      "Source page": record.sourcePath,
      "Service details JSON": JSON.stringify(serviceDetails)
    };
    const existing = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1).getValues().flat();
    if (existing.indexOf(record.leadId) !== -1) return json({ ok: true, duplicate: true });
    sheet.appendRow(headers.map(function (header) { return safeCell(cells[header]); }));
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
