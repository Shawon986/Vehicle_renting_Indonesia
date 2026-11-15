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

## Required before production
- Replace provisional brand mark, sample vehicle entries and illustrative photography with approved brand and fleet content.
- Confirm company legal name, NIB, licences, office address, operating cities and real contact channels.
- Configure every variable in `.env.example` locally and in hosting. The API deliberately rejects submissions until all security and delivery services are configured.
- Legal must provide and approve all legal pages in all three locales. The privacy policy must be complete before accepting personal data.
- Confirm service inclusions, actual vehicle specifications, response-time promise and sales handoff recipient.
- Self-host approved fonts and images for mainland China delivery.
- Connect the CMS and editorial translation approval workflow.

No live availability, inventory quantities, public prices, customer holds, online bookings, payments, customer login or internal-portal API integration are present. Tours & Travel, Event Design and Gift Boxes are forthcoming modules only.
