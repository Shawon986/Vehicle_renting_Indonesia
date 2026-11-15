# Mobility Indonesia — Vehicle Rental module
Next.js App Router, React 19 and TypeScript. The public site is display + contact only.

## Local development
1. Copy `.env.example` to `.env.local`.
2. Run `npm install`.
3. Run `npm run dev`.

## Implemented
- Premium responsive homepage and motion-led design system.
- Locale-prefixed Indonesian (`/id`), English (`/en`) and Simplified Chinese (`/zh`) pages.
- Vehicle rental collection and category detail pages.
- Vehicle enquiry form with dates, pickup point, passengers, luggage, vehicle, travel style and add-ons.
- Inquiry API with origin validation, field validation, honeypot, Cloudflare Turnstile, Upstash rate limiting and Resend email delivery.
- About, Contact, FAQ, Services hub and legal placeholder routes.
- Locale-preserving language switcher, metadata, robots and sitemap foundations.
- Reduced-motion support and keyboard focus styles.

## Content publication gate
Set `CONTENT_APPROVED=true` only after Indonesian, English and Simplified Chinese content has been human-reviewed and the legal documents are approved. Until then, production metadata and robots intentionally keep the site out of search indexes.

## Required before production
- Replace provisional brand mark, sample vehicle entries and illustrative photography with approved brand and fleet content.
- Confirm company legal name, NIB, licences, office address, operating cities and real contact channels.
- Configure every variable in `.env.example` locally and in hosting. The API deliberately rejects submissions until all security and delivery services are configured.
- Legal must provide and approve all legal pages in all three locales. The privacy policy must be complete before accepting personal data.
- Confirm service inclusions, actual vehicle specifications, response-time promise and sales handoff recipient.
- Self-host approved fonts and images for mainland China delivery.
- Connect the CMS and editorial translation approval workflow.

No live availability, inventory quantities, public prices, customer holds, online bookings, payments, customer login or internal-portal API integration are present. Tours & Travel, Event Design and Gift Boxes are forthcoming modules only.

## Vehicle enquiry handoff

The enquiry API can send a copy of each validated vehicle enquiry to a Google Sheet before it sends the sales notification. This provides a searchable lead inbox and a CSV export path without connecting this public site to the internal operations portal.

1. Create a dedicated Google Spreadsheet for public website enquiries.
2. Open **Extensions → Apps Script** and paste `integrations/google-sheets/Code.gs`.
3. In Apps Script **Project Settings → Script properties**, set:
   - `SPREADSHEET_ID`: the ID from the spreadsheet URL.
   - `SHARED_SECRET`: a long random secret generated for this integration.
   - `SHEET_NAME`: `Vehicle enquiries` (or your chosen tab name).
4. Deploy the script as a **Web app**, execute as the spreadsheet owner, and restrict access as tightly as the deployment model permits. The shared token is checked by the script.
5. Set `INQUIRY_SHEETS_WEBHOOK_URL` in the hosting environment to the deployed `/exec` URL with `?token=YOUR_SHARED_SECRET`. Never commit the real URL or secret.
6. Submit a test enquiry and confirm it appears in the sheet. Use **File → Download → Comma-separated values (.csv)** for an export.

If the webhook variable is not configured, the site continues to deliver enquiries by email only; it does not claim that a CMS or spreadsheet copy exists.

## Contact and analytics configuration

Set the verified public values in the hosting environment: `NEXT_PUBLIC_WHATSAPP_NUMBER` (international digits only, e.g. country code without a leading plus), `NEXT_PUBLIC_WECHAT_ID`, `NEXT_PUBLIC_WECHAT_QR_URL` (prefer a self-hosted image path), `NEXT_PUBLIC_PHONE`, and `NEXT_PUBLIC_CONTACT_EMAIL`. The WeChat QR and ID are shown only when configured; no contact identity is invented.

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to enable GA4. The analytics script is not loaded until a visitor accepts analytics cookies. Set `CONTENT_APPROVED=true` only after Legal and the human-reviewed locale content are ready.
