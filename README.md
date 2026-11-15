# Mobility Indonesia — Vehicle Rental module
Next.js App Router, React 19 and TypeScript. The public site is display + contact only.

## Local development
1. Copy `.env.example` to `.env.local`.
2. Run `npm install`.
3. Run `npm run dev`.

## Implemented
- Premium responsive homepage and motion-led design system.
- Locale-prefixed Indonesian (`/id`), English (`/en`) and Simplified Chinese (`/zh`) pages.
- Vehicle rental collection with category/capacity/transmission/driver filters, card/table views, responsive comparison table and per-vehicle detail pages.
- Vehicle detail service-inclusion matrix, add-on options, verified-only use-case guidance, non-numeric price-on-request slots, multi-image gallery support with keyboard-operable lightbox and breadcrumbs.
- Locale-aware WhatsApp / WeChat / phone / email / enquiry contact components and mobile sticky contact actions (only verified channels appear when configured).
- Vehicle enquiry form with pickup/return dates and times (Asia/Jakarta), pickup point and optional destination/drop-off point, passengers, luggage, vehicle model or category, travel style, add-ons, WeChat ID on Chinese pages and configured contact-channel preference.
- Inquiry API with strict same-origin checks, bounded fields, date/time/category/add-on validation, vehicle/driver compatibility checks, honeypot, Cloudflare Turnstile, Upstash rate limiting, localized sales email and localized acknowledgement.
- About, Contact, FAQ, Services hub and legal placeholder routes.
- Locale-preserving language switcher with persisted preference, per-locale metadata, WebSite / Service / FAQ / Breadcrumb structured data, robots and sitemap foundations, plus locale-aware IDR formatting (no public rates).
- Consent-first cookie banner with reopenable preferences and GA4 loading only after analytics consent.
- Vehicle enquiry analytics (start, field progress, submit, abandon), WeChat/WhatsApp/phone/email/QR actions, optional authenticated Google Sheets lead inbox handoff and spreadsheet CSV export.
- Reduced-motion support, keyboard focus styles, focus-trapped gallery lightbox and CI scope guard (`npm run verify:scope`).

## Content publication gate
Set `CONTENT_APPROVED=true` only after Indonesian, English and Simplified Chinese content has been human-reviewed and the legal documents are approved. Until then, production metadata and robots intentionally keep the site out of search indexes.

## Required before production
- Replace provisional brand mark, sample vehicle entries and illustrative photography with approved brand and fleet content.
- Confirm company legal name, NIB, licences, office address, operating cities and real contact channels.
- Configure every variable in `.env.example` locally and in hosting. The API deliberately rejects submissions until all security and delivery services are configured.
- Legal must provide and approve all legal pages in all three locales. The privacy policy must be complete before accepting personal data.
- Confirm service inclusions, actual vehicle specifications, response-time promise and sales handoff recipient. Do not publish a response-time promise until the company confirms it can be met.
- Self-host approved fonts and images for mainland China delivery.
- Select and connect a CMS with editorial translation approval workflow (provider/project not yet selected). Vehicle records currently use typed seed data; WeChat QR/ID and coverage text are environment/static content, not yet CMS-editable.
- Add verified fleet specifications, real multi-angle photos per vehicle, per-vehicle inclusion statuses, operating areas, driver/insurance/cancellation policy and named content owners. Capacity/transmission filters remain disabled until verified values are entered; use-case labels and gallery images remain unpublished until verified assets/data are supplied.
- Configure verified WhatsApp / WeChat ID + QR / phone / email, Turnstile, Resend, Upstash, Google Sheets webhook and GA4 in the hosting environment.
- Replace third-party Unsplash imagery with approved self-hosted fleet photography for mainland China delivery.
- Obtain legal-approved privacy/cookie/terms content and confirm the response-time promise before setting `CONTENT_APPROVED=true`. The inquiry API and form remain disabled until this gate is deliberately enabled.

No live availability, inventory quantities, public prices, customer holds, online bookings, payments, customer login or internal-portal API integration are present. Tours & Travel, Event Design and Gift Boxes are forthcoming modules only.

## Vehicle enquiry handoff

The enquiry API sends the validated enquiry to the vehicle-rental sales inbox first. If configured, it then makes a best-effort authenticated copy to a Google Sheet for searchable lead history and CSV export. A spreadsheet outage does not cause a customer to resubmit an enquiry already delivered to sales. This is a one-way handoff only; the public site does not connect to the internal operations portal.

1. Create a dedicated Google Spreadsheet for public website enquiries.
2. Open **Extensions → Apps Script** and paste `integrations/google-sheets/Code.gs`.
3. In Apps Script **Project Settings → Script properties**, set:
   - `SPREADSHEET_ID`: the ID from the spreadsheet URL.
   - `SHARED_SECRET`: a long random secret generated for this integration.
   - `SHEET_NAME`: `Vehicle enquiries` (or your chosen tab name).
4. Deploy the script as a **Web app**, execute as the spreadsheet owner, and restrict access as tightly as the deployment model permits. The shared token is checked by the script.
5. Set `INQUIRY_SHEETS_WEBHOOK_URL` to the deployed `/exec` URL and `INQUIRY_SHEETS_SHARED_SECRET` to the same secret in the hosting environment. The server sends the secret in its server-to-server POST body, never in a public URL. Never commit the real URL or secret.
6. Submit a test enquiry and confirm it appears in the sheet. Use **File → Download → Comma-separated values (.csv)** for an export.

If the webhook variable is not configured, the site continues to deliver enquiries by email only; it does not claim that a CMS or spreadsheet copy exists.

## Contact and analytics configuration

Set the verified public values in the hosting environment: `NEXT_PUBLIC_WHATSAPP_NUMBER` (international digits only, e.g. country code without a leading plus), `NEXT_PUBLIC_WECHAT_ID`, `NEXT_PUBLIC_WECHAT_QR_URL` (prefer a self-hosted image path), `NEXT_PUBLIC_PHONE`, and `NEXT_PUBLIC_CONTACT_EMAIL`. The WeChat QR and ID are shown only when configured; no contact identity is invented.

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to enable GA4. The analytics script is not loaded until a visitor accepts analytics cookies. Set `CONTENT_APPROVED=true` only after Legal and the human-reviewed locale content are ready.
