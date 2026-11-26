# Vehicle Rental Website — Requirements Audit

**Source of truth:** `company-website-brief-EN.md` v1.0 (2026-11-12), especially §§0.1, 1.3, 3.3, 3.10–3.11, 4, 5, 6.2–6.4, 7–10, 11, 13 and 16.  
**Implementation branch:** `feat/vehicle-rental-foundation`  
**Scope boundary:** public website only. The separate `internal-portal-brief-EN.md` describes another product. D-19 explicitly prohibits any website-to-portal database/API integration.

## Product rules that must remain true

- The site is a three-locale (Indonesian, English, Simplified Chinese) marketing and enquiry experience.
- It may show verified fleet information and editorial content, but never live availability, stock counts, dated holds, public prices, budget bands, online reservations, deposits, checkout or payment.
- Every enquiry is a message to a human. Availability, service scope and quote are confirmed directly by the sales team.
- No customer login and no reference or link to the internal operations portal.
- Public price slots remain labelled, non-numeric placeholders. No `Product` or priced `Offer` structured data.

## Vehicle-rental implementation audit

| Requirement | Current implementation | Status |
|---|---|---|
| Locale-prefixed ID / EN / ZH pages | App Router locale routes and translated UI copy | Implemented in code; human review still required |
| Fleet catalogue: category, seats, luggage, transmission, year, driver, dimensions | Card and table views; unknown values are explicitly marked for team confirmation | Partial: fleet facts are unverified placeholders |
| Filters: category, seats, transmission, driver arrangement | Functional filters; no price or availability filter | Implemented |
| Vehicle detail pages | Per-model route, specs, use-case labels, gallery component, price-on-request placeholder | Partial: seed records and galleries need verified fleet data |
| Per-vehicle inclusion matrix | Fuel, tolls, parking, driver meals, overtime, extra kilometres and tax/PB1 status fields | Partial: every vehicle needs company-confirmed statuses |
| Add-ons | Child seat, cooler box and Wi-Fi enquiry choices | Partial: actual availability/terms must be confirmed by the company |
| Coverage and surcharge zones | Page currently asks customers to provide pickup/destination so the team can confirm coverage | Partial: approved coverage text, surcharge zones, owner and review date are not supplied |
| Insurance, driver conduct/hours, cancellation and advance-booking guidance | Conservative “pending company confirmation” copy | Blocked on approved company policy and Legal wording |
| Vehicle enquiry completeness | Name, email, phone, optional company, dates/times, pickup, optional destination/drop-off, passengers, luggage, model/category, driver arrangement, add-ons, message, preferred channel and consent | Implemented in form/API; real submission test still required |
| Localised handoff | Vehicle sales email subject/body and customer acknowledgement in visitor locale | Implemented in code; requires live Resend configuration and test |
| WhatsApp / WeChat context | Prefilled journey template includes date/time, pax, pickup and destination prompts; WeChat QR/ID shown only when configured | Implemented in code; verified contact details and CMS-editable QR/ID remain outstanding |
| Anti-spam and validation | Same-origin checks, bounded field values, service-specific validation, vehicle/driver compatibility checks, honeypot and content-approval gate | Partial: Turnstile verification and distributed rate limiting are not implemented; add a configured provider before accepting public traffic |
| Inquiry record / export | Optional one-way Google Sheets handoff; sales email is primary | Partial: no CMS inquiry inbox or CMS CSV export is connected |
| No public prices / availability / payments / portal integration | Price slot only; no inventory, booking, payment or portal API routes | Implemented guardrails; keep enforced by tests |
| Vehicle SEO | Per-locale metadata, canonical/hreflang helper, Service and Breadcrumb JSON-LD, sitemap/robots foundation | Partial: company identity, approved copy/assets, Baidu registration/push and per-engine verification remain |
| Accessibility and responsive UI | Semantic form labels, keyboard gallery, focus states, responsive catalogue and form styles | Partial: WCAG audit and device/browser testing not yet evidenced |
| Performance / mainland delivery | SSR/SSG and local app code; third-party Unsplash assets remain | Partial: self-host approved fleet photos/fonts, then run mobile CWV and WeChat-browser tests |
| CMS content workflow | No CMS provider/project is connected; vehicle data currently lives in typed seed data | Not implemented; provider and access need to be selected |
| Content review / publish gate | `CONTENT_APPROVED` environment gate blocks form and indexing until approval | Partial: approval process is not yet connected to CMS record-level locale review |

## External inputs required before a truthful production launch

These are not safe for a developer to invent:

1. Verified PT/trading name, NIB, licences, NPWP, domain, registered office and operating cities.
2. Complete fleet register: actual make/model/trim/year, seats, luggage, transmission, dimensions, supported driver modes and verified use cases.
3. Real vehicle photography for each vehicle: front, side, interior and boot; approved alt text and image rights.
4. Company-approved inclusion status for each vehicle and each of the seven service items.
5. Actual child-seat, cooler-box and Wi-Fi terms.
6. Service coverage and surcharge zones, named content owner and review cadence.
7. Insurance, driver conduct/service-hours, cancellation and lead-time policy.
8. Verified WhatsApp, WeChat ID + QR, phone, email, sales recipient and named privacy contact.
9. A response-time promise the team can consistently meet, including who covers Chinese/WeChat enquiries and when.
10. Legal-approved Terms, Privacy, Cookies, Cancellation and indicative-information wording in all three locales. The privacy policy must name the recipient of inquiry data and state the approved retention period.
11. Human-reviewed Indonesian, English and Simplified Chinese copy and metadata.

## Engineering / release work still required

- Select and connect a CMS with locale-level human-review workflow, editable vehicle records, WeChat contact details, policy/coverage fields, SEO fields and content ownership/review dates.
- Add a CMS inquiry inbox and CSV export, or formally approve the Google Sheets handoff as the operational intake method for this website.
- Add form-failure alerting and monitoring; test a deliberately failed submission on staging.
- Run real end-to-end enquiries for each locale; verify department routing, localized acknowledgement and lead capture.
- Complete dependency/security, lint, typecheck, production build, accessibility, mobile performance and WeChat in-app-browser checks.
- Self-host approved fonts and vehicle photography; remove reliance on third-party asset hosts for the mainland-China experience.
- Verify Google and Baidu indexing only after legal/content approval.

## Recent implementation update

The enquiry form now includes an optional destination/drop-off field in all three locales. The API validates its length, includes it in the localized sales email and optional Sheets record, and the WhatsApp / WeChat enquiry templates prompt for it. This improves the first-reply context for transfers and point-to-point journeys without implying a booking.

## Definition of completion

The vehicle-rental code is not considered production-complete merely because it builds. It is complete only when the verified content, CMS workflow, legal approvals, live contact configuration, end-to-end enquiry delivery, accessibility/performance checks and release criteria above have evidence attached. Do not set `CONTENT_APPROVED=true` before those gates are met.
