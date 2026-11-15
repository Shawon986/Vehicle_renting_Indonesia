# Public Website — Product Requirements Brief (v1.0 — ready to hand over)

**Audience:** development team. Self-contained; no other document is required to build this site.
**Decoupled by design:** this site is **display + contact only**. It shows nothing about real quantities, and reads nothing from the internal system. The internal operations portal has its own brief: [internal-portal-brief-EN.md](file:///C:/Users/苗双笛/Documents/Qoder/2026-11-12/45cd5f11/docs/internal-portal-brief-EN.md).
**Owner:** [Product Manager]　**Date:** 2026-11-12
**Scheduling:** no durations, milestones or deadlines are imposed on the development team. Sequencing appears only as dependencies. Estimation is yours.

---

## 0. The one-sentence brief

**A three-language (Indonesian / English / Simplified Chinese) marketing website for an Indonesian PT that rents vehicles, runs tours, designs events and sells fruit & flower gift boxes — it presents the business, proves credibility with case studies, and hands every customer to a named sales channel. It never states availability, never shows stock, never quotes a price and never takes money.**

### 0.1 What the site deliberately does NOT do (D-19, this round's decision)

| Not on this site | Where it went |
|---|---|
| Real-time vehicle availability, date calendars, "N free", "few left" | internal portal only |
| Stock status of gift boxes, lot/expiry availability | internal portal only |
| Customer-created holds / dated requests that reserve inventory | gone — an inquiry is a **message to a human**, not a reservation |
| OTP / verified-contact flows | gone — replaced by ordinary anti-spam |
| Any read from the portal's database or APIs | none. **Zero integration.** Form data is delivered to sales, and that is the whole handoff |
| Prices, "from" hints, budget bands | withheld (D-1/D-3); reserved slots only |
| Payment, deposit, checkout, cart | never (D-5) |

**Why this is the right shape:** a brochure that claims nothing about quantities cannot be wrong about quantities. The previous drafts' entire failure surface — double-selling the last car, a stale cache advertising an unavailable vehicle, an unpaid hold freezing the fleet on a peak date — is removed rather than mitigated. The trade-off is deliberate and is stated in §1.3.

### 0.2 Fields to fill before this is final

| # | Field | Value |
|---|-------|-------|
| 1 | PT legal name + trading name | `[ ]` |
| 2 | NIB / registration no. | `[ ]` |
| 3 | Tourism licence no. (TDPUPD / DPA) if held | `[ ]` |
| 4 | NPWP | `[ ]` |
| 5 | Domain | `[ ].co.id` |
| 6 | Registered office + operating cities | `[ ]` |
| 7 | WhatsApp Business number(s) + which line each serves | `[ ]` |
| 8 | WeChat personal ID + the device/number it lives on (§4.5) | `[ ]` |
| 9 | Department emails incl. a named privacy contact | `[ ]` |
| 10 | Brand kit: logo SVG, colours, fonts, tone of voice | `[ ]` |
| 11 | **Response-time promise we will actually keep** — Q-18 is now important, see §1.3 | `[ ]` |
| 12 | Who owns the delivery-zone & cutoff copy (§6.4)? | `[ ]` |

---

## 1. Purpose, objectives, audience

### 1.1 Business context

| Line | What it is | How the site supports it |
|------|-----------|--------------------------|
| **A. Vehicle Rental** | cars, MPVs, SUVs, vans, buses, motorbikes; self-drive or with driver; airport transfer; multi-day tour cars | present the fleet and what's included, then route to WhatsApp/form |
| **B. Tours & Travel** | private & group packages, custom itineraries, MICE/incentive trips | present itineraries with inclusions/exclusions, route to a human |
| **C. Event Design** | weddings, corporate & MICE, brand activations, celebrations, decor | persuade with case studies; contact |
| **D. Fruit & Flower Gift Boxes** | corporate hampers, celebration gifting, custom boxes | present the catalogue, occasions, delivery policy, then contact |

Entity: an Indonesian **PT** (D-2), base currency **IDR**. Languages: **Bahasa Indonesia (default), English, Simplified Chinese** — local market, international travellers, Chinese-speaking travellers and corporates.

### 1.2 Objectives and KPIs

| # | Objective | KPI | Target, first 6 months |
|---|-----------|-----|------------------------|
| 1 | Generate inquiries that a human can answer in one reply | inquiries by service line and locale | ≥ 120/mo |
| 2 | Be findable for service + destination searches | non-brand organic sessions | ≥ 40% of traffic |
| 3 | Credibility for corporate & wedding buyers | sessions reaching ≥ 1 case study | ≥ 25% |
| 4 | Contact-channel effectiveness | WhatsApp/WeChat clicks → **inquiries we can trace**, and reply rate | baseline then improve |
| 5 | Content stays current | pages edited by the content team without a developer | 100% of catalogue & case content |

Note what is **not** a KPI any more: availability self-serve rate, inventory accuracy, hold conversion. Those belong to the portal, and this site cannot be blamed for them.

### 1.3 The trade-off, stated honestly

Removing availability from the site removes the answer to the single most common question a rental customer has — *"is it free on my date?"*. We are buying accuracy and a much smaller build with a little conversion friction. Three things make that trade work, and they are requirements, not suggestions:

1. **The inquiry form must collect enough to answer in one message.** Date(s), pax, pickup point or route, vehicle/SKU/occasion, delivery area. If a salesperson still has to ask three follow-up questions, we have converted a slow website into a slow chat and gained nothing. (§6.2)
2. **Response time is now the load-bearing trust mechanism.** With no self-serve information, a human reply is the whole product. Publish a promise only if we keep it — **Q-18, previously optional, is now the most important open question.** Put "we reply within N hours, `Asia/Jakarta`" beside every CTA and measure it in the portal.
3. **Expectation-setting copy replaces live data.** "We confirm your date in our reply" · typical lead times (weddings 8+ weeks, corporate 2+ weeks, gift-box same-day cutoff time) · a "usually busy" seasonal note — phrased as guidance, never as availability.

**Deferred, not rejected:** once the portal has proven its numbers accurate for a quarter, a read-only availability display can be reconsidered. It is explicitly **out of scope now** (§16) so nobody builds it by accident.

### 1.4 Personas and their conversion channel

| Persona | Locale | Needs within 10 seconds | **Primary channel** |
|---------|--------|-------------------------|---------------------|
| Indonesian corporate HR/GA — gifting, staff transport, company trips | `id` | PT identity, licences, corporate clients, what's included | WhatsApp |
| Local couple/family — wedding, celebration, weekend car | `id` | real photos, how it works, who to message | WhatsApp |
| International FIT traveller | `en` | English-speaking driver, pickup process, safety, what's included | WhatsApp, then form |
| Chinese traveller & Chinese-speaking corporates | `zh` | Chinese that does not read as machine-translated, a Chinese-speaking driver/guide, **a WeChat contact** | **WeChat + form** |
| Event & brand agency (referral partner) | `en` + `id` | portfolio depth, capability, capacity | email + call |

---

## 2. Information architecture

```
/
├── /services
│   ├── /services/vehicle-rental      + /vehicle-rental/{slug}
│   ├── /services/tours-travel        + /tours-travel/{slug}
│   ├── /services/event-design
│   └── /services/gift-boxes          + /gift-boxes/{sku}
├── /cases                        /cases/{slug}
├── /about
├── /gallery
├── /reviews
├── /journal                      /journal/{slug}
├── /faq
├── /contact
├── /legal/{terms, privacy, cookies, cancellation, delivery, accessibility}
├── /search
└── /sitemap.xml   /robots.txt
```

Every path is locale-prefixed (§4.1). **`/availability` is deleted from this version.**

**Primary nav:** Home · Services (mega-menu: 4 cards + one-liner each) · Cases · About · Journal · Contact.
**Header right:** language switcher · **locale-appropriate contact CTA** (§4.2) · phone.
**Footer:** all four lines · top destinations/occasions · legal links · social · **PT name, NIB, licence numbers** · newsletter · address & hours · **WeChat QR block on `zh` only**.
No login, no member area, and **no link to or reference of the internal portal**.

---

## 3. Page requirements

### 3.1 Home
1. **Hero** — headline, sub-head, two CTAs per locale, real photography, no carousel.
2. **Trust bar** — years operating, events delivered, fleet size, client logos (with permission), rating.
3. **Services grid** — 4 cards: photo + one sentence + link. No price (§7), no availability (§7).
4. **How we work** — 4 steps: tell us your date and headcount → we reply with what's available and a quote → we confirm the booking in writing → settle and we deliver. **The copy must make clear a human confirms availability**, so nobody expects an instant online booking.
5. **Featured cases** — 3, hand-picked by the content team (not "latest").
6. **Gift box spotlight** — SKU strip by occasion.
7. **Reviews** (3) · **Journal preview** (3) · **final CTA band** — "tell us your date and headcount" with the response promise beside it.

### 3.2 Services hub (`/services`)
Four cards + a "which service fits this occasion" comparison table + one CTA.

### 3.3 Vehicle Rental
- **Fleet listing** — card/table toggle: name, category, seats, luggage, transmission, year, driver included, dimensions, gallery. **No availability badge.**
- **What's included** — per vehicle: fuel, toll, parking, driver meals, overtime, extra kilometres, 21% tax/PB1 — stated as **included / not included / billed separately**, **without amounts** (D-1). This table is the single most valuable content on the page; it replaces the price the site won't show.
- **Rates** — placeholder slot only (§7).
- **Coverage** — service areas + surcharge zones as **CMS text** (§6.4).
- **Filters** — seats, transmission, category, driver yes/no. **No price or availability filter.**
- **Detail page** — photos, specs, use-case fit (airport / city / multi-day tour), inclusion table, add-ons (child seat, cooler box, Wi-Fi), and a CTA block: "message us your date, pickup time and pax" + WhatsApp (pre-filled, §6.3) + form.
- **Content** — insurance explainer, driver conduct & hours policy, cancellation terms (legal, §3.11), "how far ahead to book" guidance.

### 3.4 Tours & Travel
- Package list: destination, duration, group size, guide language, difficulty, season note, gallery. No price, no "spaces left".
- Detail: day-by-day itinerary · **Inclusions / Exclusions in two columns (mandatory — the #1 dispute source)** · highlights · what to bring · route map · season advice · similar packages · departure-time guidance ("private departures daily; fixed-date group departures listed per season").
- Custom trip form: dates, pax, interests, duration — this is the primary conversion path for this line.
- Filters: duration, destination, occasion, guide language.
- Structured data: `TouristTrip` / `Service`; **no `price`, no `Offer` with inventory** (§7).

### 3.5 Event Design
- Occasion types: wedding, corporate & MICE, celebration, brand activation, decor only.
- Capability list: concept, styling, F&B, sound & light, MC, photo & video, venue liaison, permits, logistics — **and explicitly what we don't do**.
- Process & lead times: weddings 8+ weeks, corporate 2+ weeks.
- **No budget tiers, sample bands or indicative ranges** (D-3).
- Venue & vendor partner wall, with permission.
- Every page of this line sends people to `/cases`.

### 3.6 Fruit & Flower Gift Boxes
- Catalogue by occasion (get well, birthday, congratulations, thank-you, corporate, holiday) and tier (size, not price).
- SKU detail: contents itemised with quantities/grades, packaging photo, dimensions in cm, perishability & care note, card-message personalisation, gallery.
  **The `in stock / seasonal / made to order` badge is now static editorial content** chosen by the content team per SKU — **not** a computed value and **not** a quantity claim. Seasonal SKUs must say "seasonal, available around Lebaran/Christmas/CNY" rather than "in stock" (§6.4 divergence rule).
- **Delivery policy** as published content: zone list, **daily cutoff time labelled in `Asia/Jakarta`**, holiday blackout dates, out-of-zone → pickup only. Static CMS content, one owner (§0.2 #12).
- Corporate: quantity tiers (20+/50+/100+) with **no published discount %**; invoice and PO support; sample-box policy; lead time for bulk orders.
- Freshness & sourcing promise.
- Three seasonal banner slots: Lebaran/Ramadan, Christmas/New Year, Chinese New Year.
- CTA: "order this box for delivery on [date]" → inquiry form with SKU pre-filled. **No cart, no checkout, no zone validation, no slot availability.**

### 3.7 Cases / Portfolio
The highest-value page for B2B and event conversion.
- Filters: service line, occasion, location, year, **scale (headcount band)**. No budget band (D-3).
- Template: Client type (named only with permission) → Brief → Constraints → What we delivered → **Result metrics** (guests, vehicles deployed, boxes delivered, turnaround days, repeat order) → Gallery ≥ 8 photos → Testimonial → Related cases.
- Every case tagged to ≥ 1 service line, carrying one vertical hero image fit for social re-use.

### 3.8 About
Short story · real team photos · **PT name, NIB, licence numbers** · operating areas · vendor criteria · safety & insurance statement · social proof · how many people answer the WhatsApp line and when (§4.5).

### 3.9 Journal
The SEO engine, not a marketing extra.
Pillars: destination & itinerary guides (combine "private driver" with destination terms) · occasion planning guides ("what a Jakarta corporate event involves") · gifting etiquette (Lebaran hampers for business partners; Chinese gift taboos) · case recaps.
For `zh`, topics are **planned for Chinese search intent**, not translated after the fact (D-6).
Needs: categories, tags, author, reading time, related-service CTA block, `Article` schema, RSS, per-record translation status. **An article may exist in one locale only and must never generate an empty page in another.**

### 3.10 Contact
- Form (§6.2 field set), plus WhatsApp, WeChat block on `zh`, phone, email, office info, lazy map, hours with timezone, department emails, **response promise**.
- Channel order per locale: §4.2.
- Anti-spam: honeypot + Cloudflare Turnstile or reCAPTCHA (invisible preferred) + rate limiting. **No OTP** — that requirement left with the hold feature.

### 3.11 Legal
Terms of Service · Privacy Policy · Cookie Policy · Cancellation & Refund · Delivery · Accessibility Statement, in all three locales.
Text supplied by **Legal** (D-9). Build the pages, routes, footer links, cookie banner and consent wiring now; ship the body as CMS-editable `[DRAFT — Legal to supply]` placeholders.
**Go-live gate, not a copy deck.** We collect names, phone numbers, WeChat IDs and company data under Indonesia's PDP Law (UU No. 27/2022); the forms cannot legally go live over an empty privacy page. Do not let the developer write legal wording.
One extra clause now required because the site makes no quantity claims: **"Information on this website is indicative; availability, stock and pricing are confirmed by our team in writing."** Ask Legal for the wording.
**Recipients must be named.** An inquiry is not retained only by the website: it is delivered to the sales team and recorded in the company's internal operations system, which then owns its retention and deletion handling (D-19 — two separate products, one payload). The privacy policy must state that transfer and the 24-month retention period, in all three locales.

---

## 4. Multilingual requirements

### 4.1 Core rules

| Item | Requirement |
|------|-------------|
| Locales | `id` (default) · `en` · `zh-Hans` — **all three fully maintained** (D-7) |
| URLs | subdirectories `/id/…`, `/en/…`, `/zh/…`; localised slugs allowed (`/id/services/sewa-mobil`); root `/` redirects to default locale and stays crawlable |
| Detection | first visit by `Accept-Language`, else `id`; a persisted choice (cookie + localStorage) always wins afterwards |
| Switching | **must keep the visitor on the equivalent page** — never bounce to home. Shows each language in its own name (Indonesia / English / 简体中文); where a record has no translation, link to the parent listing and say so |
| Fallback | requested → `en` → `id`. Never an empty template, never a raw i18n key in production |
| hreflang | complete set + `x-default` on every indexable page, all three locales |
| Currency | IDR base. `Rp 1.250.000` (id) / `Rp 1,250,000` (en) / `IDR 1.250.000` (zh). **Nothing is displayed publicly in Phase 1** (D-1); the formatter ships now |
| Dates & time | locale-aware formats; weekday shown for event dates; single operating timezone **`Asia/Jakarta` labelled next to opening hours and the gift-box cutoff** |
| Phone | `+62`, `https://wa.me/62…?text=`, no leading `0` |
| UI length | components tolerate +30% expansion; no fixed-width labels |
| Typography | Latin + Simplified Chinese; **all fonts self-hosted** (§4.3) |
| Machine translation | **never as published copy.** CMS gates publish on a "human-reviewed" status per record per locale |
| Glossary | EN is the pivot for ID/ZH; PM supplies glossary + do-not-translate list (§17) |
| Imagery | no text baked into images |

### 4.2 Per-locale conversion channels

| Locale | Primary | Secondary | Tertiary | Sticky mobile bar |
|--------|---------|-----------|----------|-------------------|
| `id` | WhatsApp, pre-filled | phone | form | WhatsApp · Hubungi kami |
| `en` | WhatsApp, pre-filled | form | email | WhatsApp · Enquire |
| `zh` | **WeChat (QR + copyable ID) + form** | phone | WhatsApp if they have it | 微信联系 · 询价 |

The CTA component is locale-aware. Presenting WhatsApp as the main action to a Chinese visitor is a defect, not a style choice. Because this site's only conversion is "talk to a person", **the contact CTA is the most important component on the page** and appears in the hero, after each major module, and sticky on mobile.

### 4.3 `zh` delivery to mainland China (consequence of D-6)

- **Self-host every asset.** Google Fonts, `fonts.gstatic.com`, `unpkg`, `jsdelivr`, `cdnjs`, Google-hosted jQuery all fail or crawl there. A build rule, not an optimisation.
- **SSR is mandatory** — Baidu's crawler handles JS poorly, and it is already required for performance.
- **Baidu**: register on 百度搜索资源平台, submit the sitemap, use the push API; track Baidu indexing separately from Google.
- GA4 **under-reports** mainland traffic. Treat `wechat_contact_view`, `wechat_id_copied` and form submits as the real `zh` funnel.
- Expect slower loads from the mainland without a China CDN; mitigate by self-hosting and minimising third-party embeds. **Mainland speed is not a defect the team is being asked to fix.**

### 4.4 Translation operations (D-7)
One owner for `id`, one for `zh`, EN as master. Completeness meter per locale, a site-wide untranslated report, a human-review publish gate, a review pass for every new Journal article. A half-translated site is worse than a two-language site.

### 4.5 WeChat is a **personal** account (D-14)

| Requirement | Why |
|-------------|-----|
| QR image (long-press to save) + copyable ID + one-line instruction per locale | browsers have no reliable web→WeChat deep link; QR is the working path |
| QR and ID **editable by the content team** | personal numbers change, get restricted or recycled; a dev ticket to swap a QR is an outage |
| Reserve the slot for 企业微信 / Official Account | same component later, no redesign |
| **No browser-side automation touching WeChat** | personal accounts get restricted for automated behaviour; the site must not endanger the account |
| Track `wechat_contact_view`, `wechat_id_copied`, `wechat_qr_saved` | the only meaningful `zh` signals (§10.3) |
| Every `zh` page carries a second path: form + phone + email | a personal account is one human with finite capacity, offline at night — and now that the site shows no self-serve data, that one person **is** the whole `zh` funnel. Say which hours they answer (§3.8) |
| Operational note (company action, not a dev task) | put the account on a **company-owned number and device**. If that staff member leaves, the `zh` channel leaves with them |

---

## 5. Content management

The content team is non-technical, and since the site has no live data, **the CMS is the entire product surface**. It must be good.

| Need | Detail |
|------|--------|
| Roles | Admin · Editor (publish) · Writer (draft) · Translator (translation fields only) |
| Content types | Service, Vehicle, Vehicle Category, Tour Package, Gift Box SKU, Case Study, Testimonial, Team Member, Journal Post, Media Album, Page, Navigation, Banner Slot, FAQ Item, Glossary Term, Legal Document, **Inquiry inbox (read/export only)** |
| Structure | block-based landing-page editor with a **locked palette** (hero, text+image, CTA, gallery, inclusion table, FAQ, form, contact block, price slot, case grid) — not a free canvas |
| Workflow | Draft → In review → Published / Scheduled, with version history and rollback |
| Locale editing | per-record translation tabs, completeness meter, untranslated report, human-review gate |
| Media | alt text required per locale, focal-point crop, auto variants, originals gated to Admin |
| SEO panel | per record per locale: title, description, slug, canonical override, noindex, OG image |
| Redirects | editable table for future slug changes. **No legacy migration — there is no previous site (D-8)** |
| Preview | shareable non-public preview per locale |
| Inquiries | submissions viewable in the CMS and exportable as CSV, with email notification to the right department per service line |
| Price fields | editable and staff-visible, with a per-record `price_public: false` flag (D-1) |
| Guardrails | **the editor cannot create an availability, stock or price claim by accident.** No free-text field is rendered where a quantity badge would go; those components do not exist (§7) |

---

## 6. Functional requirements

### 6.1 Feature list

| ID | Feature | Phase |
|----|---------|-------|
| F-01 | Three locales with all §4 rules, locale-aware CTAs | 1 |
| F-02 | Inquiry form per §6.2, routed by service line, anti-spam | 1 |
| F-03 | WhatsApp click-to-chat with contextual pre-fill (`id`/`en`) | 1 |
| F-04 | WeChat contact block, CMS-editable (`zh`) | 1 |
| F-05 | Fleet / package / gift-box catalogues with filters | 1 |
| F-06 | Inclusion & exclusion tables per vehicle and per tour | 1 |
| F-07 | Case portfolio + keyboard-operable lightbox gallery | 1 |
| F-08 | CMS, i18n workflow, price flag, guardrails | 1 |
| F-09 | Structured data + localised meta | 1 |
| F-10 | Price placeholder system — §7 | 1 |
| F-11 | Legal pages as CMS placeholders + cookie consent | 1 |
| F-12 | Journal with categories, tags, RSS | 1 |
| F-13 | Site search (pages, catalogue items, cases, journal) | 2 |
| F-14 | Newsletter, double opt-in | 2 |
| F-15 | Media-kit PDF per case | 2 |
| F-16 | Multi-currency display toggle (build the formatter, not the UI) | 2 |
| F-17 | Google Sheets / email handoff of inquiries to the sales team | 1 |
| F-18 | Optional CRM sync (HubSpot/Zoho) later | 2 |
| F-19 | 企业微信 / Official Account upgrade of the WeChat block | 3 |
| F-20 | Quote request → PDF sent by a human, **no payment link** | 2 |

**Not in this brief at any phase:** payment, deposits, checkout, cart, OTP, availability, calendars, stock, and any connection to the internal portal's inventory data. Read-only availability is a **declared future option** (§16), not a phase commitment.

### 6.2 Inquiry form — the requirement that matters most now

Because no answer is given on the site, **the form must capture everything a human needs to give a complete first reply.** Field sets by service line:

| Common to all | Vehicle Rental | Tours | Event Design | Gift Boxes |
|---|---|---|---|---|
| name · email · WhatsApp number · **WeChat ID (shown on `zh` only)** · company (optional) · message · marketing consent · preferred contact channel · consent timestamp | **pickup date + time**, **return date + time**, pickup point, pax, luggage estimate, vehicle category or specific model, add-ons (child seat / cooler box / Wi-Fi), self-drive or with driver | start date, trip length, pax, group type (private/shared), interests, hotel or departure city | event date, alternate date, occasion type, venue (known/TBC), headcount band, services needed (multi-select), "is the date flexible?" | SKU, quantity, delivery date, delivery area/district, recipient name & phone, card message, corporate PO needed?, same-day requested? |

Rules:
- **No budget field** on any public form (D-15). Sales ask conversationally.
- **No date picker that implies availability** — a plain date field, with copy "we confirm availability in our reply".
- Optional fields marked optional; **required fields limited to what a reply actually needs** (long forms cost submissions).
- Validation inline, errors tied to fields, keyboard and screen-reader operable.
- Submission → routed email to the right department **in the locale of the visitor**, a CMS copy, CSV export, and an auto-acknowledgement stating the response promise. Auto-ack wording must not promise a car or a box — "thank you, we will reply with what we can offer on your date".
- Anti-spam: honeypot + Turnstile/reCAPTCHA + rate limiting.
- `form_start` / `form_submit` / `form_abandon {last_field}` analytics so we can see which field loses people (§10.3).

### 6.3 WhatsApp / WeChat pre-fill content

The pre-filled message is a **structured first inquiry**, so the chat opens with the information the form would have collected:
`[Service line] — [item name] — [date & time range] — [pax] — [pickup point / area] — from [locale] page {path}`.
It must be built from the current record's data, not a static string. The WeChat block instead shows a copy-to-clipboard message of the same shape plus the QR, since WeChat has no pre-fill equivalent from a browser (§4.5).

### 6.4 Static-vs-truth divergence rule (the one residual risk after decoupling)

Delivery zones, cutoff times, lead times and "seasonal" availability now live as **website content**, while the real rules live in the portal. Text can go stale. Mitigation, cheap and mandatory:
- Each such block is **one CMS field with a named owner and a `last_reviewed` date**, shown to editors in the dashboard when older than 90 days.
- Phrasing is guidance, never a guarantee: "we usually deliver in these areas — ask us about your address" rather than "we deliver to …".
- The indicative-information clause in §3.11 covers the legal side.
- **Owner assignment is field #12 in §0.2 — this is a company decision, not a build task.**

---

## 7. What must never appear on the site (consolidated)

| Never | Because |
|---|---|
| Any numeric price, "from Rp…", "starting at", tier ranges, budget bands | D-1, D-3 |
| `price` / `Offer.price` in JSON-LD while prices are withheld | an empty or invented price is an SEO and trust error |
| Availability: "in stock", "N free", "few left", "available on your date", calendars, date-availability badges | D-19 — the site reads no inventory |
| Stock counts, lot/expiry status, delivery-slot capacity | D-19 |
| Reservation, hold, cart, checkout, deposit, payment, refund automation | D-19, D-5 |
| Raw i18n keys, empty locale pages, machine-translated copy | §4.1, §4.4 |
| Any link, mention or reference to the internal portal | §2, security |

**Reserved price slots** (retained because D-1 said "reserve"):
- `price_mode` per record: `on_request` (default everywhere today) · `from_price` · `exact` · `hidden`.
- Empty/`on_request` renders a **labelled placeholder occupying exactly the geometry a price would**: "Harga: hubungi kami" / "Price on request" / "价格：请询价".
- Filling a real number later must cause **zero layout shift**.
- Fields, currency formatter and locale rules ship now; price filters/sorting are **disabled, not hidden-but-broken**.

---

## 8. Design requirements

- **Photography is the product.** A real shoot before launch; stock photography will visibly cost conversion. §11.
- Mobile-first, with the locale CTA persistent (§4.2).
- **Contact/inquiry components are the hero interaction now** — the form, the WhatsApp/WeChat block, and the response promise. Give them the design attention previously budgeted for the availability picker.
- Inclusion/exclusion tables must be legible on mobile — this is a table-heavy site, and these tables are the substitute for price transparency.
- Price and quantity placeholders must look intentional, never broken.
- Look: warm, editorial, premium-casual; Indonesian texture in imagery, not in ornament.
- **Design tokens:** colour, type scale, spacing, radius, shadow, button variants, image ratios.
- **Components to spec:** header + mega-menu · language switcher · locale CTA · hero · service card · vehicle card · inclusion/exclusion table · tour itinerary timeline · gift-box SKU card · corporate order block · case card · gallery + lightbox · accordion/FAQ · form fields incl. validation and error states · contact block (WhatsApp/WeChat/phone/email) · response-promise badge · testimonial · banner slot · footer · cookie banner.
- Dark mode out of scope. Motion subtle; `prefers-reduced-motion` respected.

---

## 9. Non-functional requirements

| Area | Requirement |
|------|-------------|
| Performance | LCP ≤ 2.5s p75 mobile 4G · CLS ≤ 0.1 · INP ≤ 200ms · entry JS ≤ 170KB gzipped · AVIF/WebP with `srcset` and explicit dimensions · lazy below the fold · no autoplay with audio |
| Assets | **no third-party host that fails in mainland China** (§4.3) |
| Devices | iOS Safari 16+, Android Chrome 110+, last two desktop versions; **the WeChat in-app browser** on iOS and Android must render, allow QR long-press, clipboard copy, phone links and external-navigation prompts |
| Accessibility | WCAG 2.1 AA: contrast, focus visibility, keyboard operation of nav, gallery, forms and language switcher, enforced alt text, landmarks, labelled inputs, errors tied to fields. Tables correctly associated with headers |
| SEO | SSR/SSG · per-locale titles & descriptions · canonical · hreflang + `x-default` · sitemap index per locale · robots · breadcrumbs · OG/Twitter cards · JSON-LD `Organization`, `LocalBusiness` (with PT identity), `Service`, `TouristTrip`, `Article`, `FAQPage`, `BreadcrumbList` — **no `Product`/`Offer` with a price or inventory claim** · no orphan pages · **Baidu webmaster registration, sitemap and push API** |
| Analytics | GA4 + Consent Mode v2 (banner blocks scripts until consent) · Meta Pixel in Phase 2 · Search Console + Baidu coverage · event taxonomy §10.3 |
| Security | HTTPS + HSTS · CSP, X-Content-Type-Options, Referrer-Policy · CMS MFA · **form rate limiting, honeypot and captcha** · input validation and sanitisation · no secrets in repo · dependency scanning · **staging behind auth + noindex** · no portal route reachable or referenced from here |
| Privacy | **PDP Law UU 27/2022** — consent with timestamp and source, data minimisation, named privacy contact, data-subject request path, retention **24 months** for inquiry data (confirm), no personal data in analytics payloads, indicative-information clause (§3.11) |
| Data residency | no Indonesian requirement (D-10) → **Singapore origin + CDN edge** |
| Backup / DR | content and inquiry records: daily automated, 30-day retention, tested restore. **Inquiries are the only records this system produces — losing them is losing leads**, so their store is the priority dataset. The operational system of record is the portal, with its own tighter targets |
| Monitoring | uptime · error tracking · **inquiry-submission failure alerting** — a silently broken form is now the single worst failure mode of this site, since the form is the only conversion path · index-coverage checks per locale and per engine |
| Environments | dev / staging (auth + noindex) / production · content and config promotion path |
| Code quality | repo · branch protection · code review · CI running lint, typecheck, build, e2e smoke **including a form submission** · preview deploy per PR |

**Removed from the previous version of this brief:** availability latency budget (`p95 ≤ 500ms`), stale-cache alerting, concurrency load testing, degraded-mode fallback, point-in-time recovery targets for `occupation`/stock data, and the shared-schema requirement. These belonged to the coupling that D-19 ended; the portal keeps its own versions.

---

## 10. Integrations, measurement, events

### 10.1 Integrations (all one-way out)

| System | Purpose | Phase | Notes |
|--------|---------|-------|-------|
| WhatsApp Business (click-to-chat) | primary conversion `id`/`en` | 1 | API for templated confirmations later, not needed now |
| **WeChat personal account** | primary conversion `zh` | 1 | QR + ID, CMS-editable, no automation, always a second path (§4.5) |
| Email (SES / Resend / SendGrid) | routed inquiry notifications + auto-acknowledgement | 1 | department routing by service line |
| **Google Sheet or email handoff to the sales team** | the entire "integration" with the internal side | 1 | **no DB or API connection to the portal** (D-19) |
| Google Analytics 4 + Consent Mode v2 | behaviour | 1 | under-reports mainland China |
| Google Search Console + **Baidu 搜索资源平台** | indexing | 1 | |
| Meta Pixel | retargeting | 2 | |
| CRM (HubSpot / Zoho / Sheet minimum) | lead pipeline | 2 | optional |
| Google Maps / Mapbox | offices, areas of operation | 1 | lazy, consent-gated, self-hosted wrapper where feasible |

### 10.2 Measurement
- Inquiries per month by service line, locale and channel preference.
- **Inquiry completeness rate** — submissions containing date + pax + location, i.e. answerable in one reply (§1.3 #1). The number that proves the form design works.
- Form start → submit rate; abandonment by field.
- `zh` health — WeChat QR views, ID copies, form completions. WhatsApp clicks **understate** this audience; never use them as its KPI.
- Non-brand organic entrances per locale; index coverage per locale **and per engine** (Baidu separately).
- Case engagement — views per case, cases per session; ≥ 1 case reached in ≥ 25% of sessions.
- Catalogue depth — sessions reaching a vehicle/tour/SKU detail page.
- Core Web Vitals p75 per locale, mobile.
- Downstream (from the portal, not this site): reply time, inquiry→booking rate, lost-reason distribution — **the only way to learn whether hiding prices (D-1) costs us bookings.**

### 10.3 Event taxonomy (implement exactly)

`page_view` · `language_switch` · `cta_click {id, page, locale}` · `whatsapp_click {service_line, item_ref, page}` · `phone_click` · `email_click` · `wechat_contact_view {page, item_ref}` · `wechat_id_copied` · `wechat_qr_saved` · `form_start {service_line}` · `form_progress {field}` · `form_submit {service_line, lead_id}` · `form_abandon {last_field}` · `catalogue_filter {type, value, results}` · `catalogue_item_view {ref, type}` · `inclusion_table_expand {ref}` · `gallery_open {album}` · `case_view {case_id, service_line}` · `media_kit_download {case_id}` · `search_query {term, results, locale}` · `faq_expand {id}` · `newsletter_signup` · `delivery_policy_view {sku}` · `price_slot_view {record}` · `scroll_depth {25,50,75,100}`.

---

## 11. What Product / Marketing will deliver (dependencies, not dates)

| Asset | Minimum | Required before |
|-------|---------|-----------------|
| Brand kit | 1 set | design start |
| **Fleet content: every vehicle, specs, photos, and its inclusion/exclusion set** | full fleet | catalogue build |
| **Photography — each vehicle needs front / side / interior / boot; plus events, tours, boxes, team** | full fleet + 300+ curated, ≥15 per case | design finalisation — **the real critical path** |
| Case studies written with result metrics | 10 (4 events, 2 tours, 2 transport, 2 gifting) | case build |
| Tour packages with itinerary + inclusions/exclusions | 6 | tour build |
| Gift-box SKU contents, sizes, perishability, occasions, corporate tiers | 12 | gifting build |
| **Delivery zone list, cutoff time, holiday blackouts + a named owner** | — | gifting & legal copy (§6.4) |
| **Response-time promise we will keep** | — | CTA copy (§1.3 #2) |
| Team bios & portraits; PT identity, NIB, licences, NPWP | — | trust & legal sections |
| Testimonials **with written permission** | 5 | reviews module |
| EN master copy incl. all metadata | all pages | translation start |
| ID + ZH human review sign-off | all pages | locale publish gate |
| FAQ list (≥ 20 real questions) | — | FAQ + `FAQPage` schema |
| **Legal text: T&C, privacy, cancellation, delivery, indicative-information clause** — privacy must name the internal operations system as an inquiry recipient (§3.11) | — | **go-live, hard gate (D-9)** |

**No longer required from the company for this site to launch:** fleet register in machine-readable form, driver roster and shift rules, open-booking import, a named Fleet Manager, baseline stock count, production capacity. **All of those moved to the portal brief, and this site no longer waits on them.** That is the main practical gain of D-19 — the website can now launch on its own schedule.

---

## 12. Technical direction

The coupling is gone, so the choice is genuinely open again:

| Option | Verdict |
|--------|---------|
| **Next.js + Tailwind + Payload/Sanity + Postgres** | **Recommended if one vendor builds both products** — shared components, one bill, one deploy pipeline. Still the cleanest three-locale routing and best CWV |
| **WordPress + WPML/Polylang** | **Now genuinely viable.** This is a content-and-catalogue brochure with no transactional inventory; if the content team wants to live in WordPress and a cheaper vendor is preferred, it fits. Costs: plugin/security maintenance, WPML licence, weaker structured-catalogue ergonomics |
| Webflow / Framer | Possible for a lighter brochure; **still a poor fit** for four structured catalogues with filters, 17 content types and three maintained locales |
| Two different vendors | Acceptable now — **there is no shared schema to agree.** The only contract between the products is the inquiry handoff (§10.1) |

Whatever is chosen must satisfy §4 (i18n), §5 (CMS), §6.2 (form), §7 (nothing forbidden appears), §9 (NFR) and §13 (DoD). Architecture, framework and hosting beyond those constraints are the team's decision.

---

## 13. Definition of Done — 16 items

**Locales & content**
1. All three locales crawlable, hreflang complete, indexed in Google Search Console **and registered with Baidu**.
2. Language switching on any deep page keeps the visitor on the equivalent page; no empty strings, no raw i18n keys, no empty translated pages.
3. Every page in every locale has a human-reviewed title, description and OG image, and `id`/`en`/`zh` string completeness reported from the CMS.
4. **An Editor can publish a new case study in all three locales unaided, in under 20 minutes.**

**Contact & conversion**
5. A test inquiry in each service line and locale lands in the CMS, emails the correct department **in the visitor's locale**, and appears in analytics with correct `service_line` and `locale`.
6. **Inquiry completeness: every form captures date, pax and location for its line**, so a salesperson can reply without a follow-up question. Verified by sending a real inquiry and answering it once.
7. WhatsApp, phone, email and the WeChat block work on iOS, Android, desktop and **inside the WeChat in-app browser**; `zh` shows WeChat + form as primary and **never** presents WhatsApp as the main action.
8. WeChat QR and ID are replaceable by the content team without a developer, and no browser-side call is made to WeChat.
9. A broken form fails loudly: submission failure raises an alert, tested by forcing a failure on staging.
10. Anti-spam works without blocking a genuine user: honeypot, captcha and rate limiting verified with a scripted burst.

**Claims & content integrity**
11. **Nothing on the site states availability, stock, price or budget.** No numeric price, no "from" hint, no "in stock", no calendar, no `price` in JSON-LD — while every reserved slot holds its geometry with **zero layout shift** when a value is later entered.
12. **No payment path exists anywhere** (D-5), and **no connection of any kind to the internal portal** — no shared DB, no API call, no inventory read (D-19).
13. Delivery-zone, cutoff and lead-time copy each sit in one owned CMS field with a `last_reviewed` date, and the §3.11 indicative-information clause is live in all three locales.

**Platform**
14. Mobile LCP ≤ 2.5s on home and one case page under throttled 4G; **zero third-party asset hosts that fail in mainland China**; SSR/SSG throughout.
15. Keyboard and screen-reader pass on nav, gallery, forms and language switcher; tables correctly headed; alt text enforced.
16. Legal pages live in all locales with `[DRAFT — Legal to supply]` states where text is pending, **the privacy policy names the internal operations system as the recipient of inquiry data (§3.11)**, cookie banner blocks analytics until consent, staging behind auth with noindex, restore of inquiry data tested. Handover pack delivered: illustrated admin guide, component documentation, deployment runbook, account/key inventory with named owners.

---

## 14. Scope phases — no durations

| Phase | Scope | Exit |
|-------|-------|------|
| **0 — Prep** | brand, IA, copy plan; photography shoot; catalogue data written up (incl. inclusion tables); legal text requested; response promise decided; staging up | wireframes approved, EN copy outline signed, photography delivered |
| **1 — Launch set** | §3 pages, four service lines, 10 cases, catalogue + filters, CMS with three locales, inquiry forms + WhatsApp/WeChat handoff, price placeholders, legal placeholders, SEO incl. Baidu, analytics, cookie consent | **§13 in full** |
| **2 — Growth** | Journal engine + 8 seed articles (3 planned for Chinese search intent), site search, newsletter, media kits, quote PDF (no payment), CRM sync, Meta Pixel, consent-mode hardening | ≥ 60% of organic entrances are non-home |
| **3 — Later options** | 企业微信 / Official Account upgrade, multi-currency display when prices are published, deeper personalisation | scoped from Phase 2 data |

**Independence gained:** this site no longer depends on fleet data exports, driver rosters, stock counts or a named operational owner. **It can launch before, after or without the portal.** The reverse is also true — the portal does not wait for this site.

---

## 15. Open questions

| # | Question | Blocking? | Default if unanswered |
|---|----------|-----------|----------------------|
| **Q-18** | **What response time will we actually keep?** It is now the site's central promise (§1.3 #2). Also: which hours, and who answers `zh`/WeChat at night? | **CTA copy + trust modules** | publish "we reply within 1 working day", and only if true |
| **Q-39** | Who owns the delivery-zone / cutoff / lead-time copy, and who reviews it quarterly (§6.4)? | gifting page accuracy | PM owns; 90-day review reminder in CMS |
| Q-40 | Is there any information we *want* to publish for real (deposit %, minimum order, what a driver's day includes) as static copy? With prices withheld, the inclusion tables carry all the weight. | catalogue completeness | publish inclusion/exclusion structure, no amounts |
| Q-41 | Do we keep the newsletter at all, or is email a dead channel against WhatsApp? | F-14 | keep the slot, launch in Phase 2, review after 6 months |
| Q-42 | Which WeChat ID goes on the site, and is it on a company-owned device (§4.5)? | `zh` channel launch | personal staff device — **not recommended** |
| Q-43 | Is 10 case studies enough at launch, given they are now the primary B2B proof? | Phase 1 scope | 10 minimum |
| Q-44 | Vendor model: one team for both products, or a cheaper vendor for the brochure now that they're decoupled (§12)? | build decision | one vendor, same stack — simpler, and WordPress stays available if cost is the driver |

**Closed by D-19** (no longer relevant to this site): Q-23 blocking/advisory holds · Q-11 safety stock · Q-12 day definition · Q-13 hold TTL · Q-19 driver hour rules · Q-20/21/22 occupation conventions · Q-24 odometer entry · Q-28 OTP · Q-17 Fleet Manager (still a **portal** blocker, not a website one) · Q-31/32/34 gift-box channels, stocktake and capacity (still **portal** blockers).

---

## 16. Out of scope

Payment, deposits, checkout, cart, refunds, card storage (D-5) · **real-time availability, calendars, "few left" badges, stock status, lot/expiry, delivery-slot capacity (D-19)** · customer-created holds or reservations · OTP · **any read of or write to the internal portal's inventory data — no shared schema, no API, no DB connection (D-19)** · customer accounts · tour booking engine · mobile app · ticketing · affiliate portal · multi-country network · machine-translated published copy · chatbot · third-party review aggregation · legacy content migration (D-8) · dark mode · mainland CDN acceleration.

**Declared future option, not built:** a read-only availability view, only after the portal has demonstrated inventory accuracy for a quarter and only if inquiry volume shows date-checking as the top reason for slow replies. Nobody should scope it now.

---

## 17. Glossary for translators (never machine-translate)

`NIB` · `PT` · `NPWP` · `TDPUPD` · `PB1 / 21% tax` · `QRIS` · `GoPay` · `OVO` · `DANA` · `Lebaran` · `Ramadan` · `MICE` · `hamper` → 礼盒 (not 篮子) · `inclusions/exclusions` → 费用包含/费用不含 · `termasuk / tidak termasuk` · `on request` → 请询价 / hubungi kami / Price on request · `indicative` → 仅供参考 / indikatif · `overtime` → 超时 / kelebihan jam · `extra km` → 超公里 / kelebihan kilometer · `cutoff` → 截单时间 / jam potong · `pax` → 人数 / jumlah orang · `made to order` → 现做 / dibuat sesuai pesanan · `seasonal` → 时令 / musiman.

---

## 18. Reading order for developers

1. §0.1 and §7 — what must **never** appear. Build the absence deliberately.
2. §6.2 — the inquiry form. It is the conversion mechanism now; its field sets are the highest-value page in this brief.
3. §4 (with 4.2, 4.3, 4.5) — locale rules, per-locale channels, mainland constraints. Built late, these cause the most rework.
4. §3.3 / §3.6 — inclusion/exclusion tables and delivery policy as content.
5. §9 — CWV, self-hosting, captcha, PDP, form-failure alerting.
6. §13 — the 16 acceptance criteria, incl. the zero-layout-shift and "no portal connection" tests.
7. §15 — Q-18 and Q-39 need answers before content goes live.
8. §16 — the future availability option is declared, not promised.

---

## 19. Decision log

| ID | Question | Decision | Consequence |
|----|----------|----------|-------------|
| D-1 | Public prices? | No — reserve the slot | §7; price fields and formatter ship now |
| D-2 | Legal entity? | Indonesian PT | PT identity + licences public; IDR base |
| D-3 | Budget bands? | No | removed from cases, events, forms, structured data |
| ~~D-4~~ | ~~Real-time fleet availability on the site?~~ | **REVOKED by D-19** | availability, calendars, concurrency and degraded-mode requirements removed from this brief; they remain the portal's business |
| D-5 | Online deposit? | No | payment never in scope |
| D-6 | Chinese customers via the site? | Yes | WeChat-first `zh`; self-hosted assets; SSR + Baidu; Chinese-intent content |
| D-7 | Locales maintained? | All three | per-locale owners; human-review publish gate |
| D-8 | Legacy site? | No | migration out; redirect table kept |
| D-9 | Privacy/cancellation text? | Legal, placeholders now | pages wired now; **go-live gate** |
| D-10 | Indonesian data residency? | Not required | Singapore origin + CDN |
| ~~D-11~~ | ~~Safety stock?~~ | moot for this site (portal config) | no public consequence |
| ~~D-12~~ | ~~Day definition 8h/100km?~~ | **portal-side only** | remains the portal's billing model; the site only needs "included / not included" copy |
| ~~D-13~~ | ~~Hold TTL / caps?~~ | moot for this site | customer-created holds no longer exist |
| D-14 | WeChat form? | Personal account | QR + copyable ID, CMS-editable, no automation, always a second path, company-owned device recommended |
| D-15 | Ask budget in conversation? | Yes; no public field | form has no budget field; captured in the portal checklist |
| D-16 | Where are bookings recorded? | Internal operations portal | second product, **now fully separate from this site** |
| D-17 | Deadlines for developers? | None imposed | scope groups + exit conditions only |
| D-18 | Portal scoped here? | No — separate brief | this document reads standalone |
| **D-19** | **Couple the two products or decouple them?** | **Decouple. The website is display + contact only: no availability, no stock, no holds, no integration.** | **Removed availability, calendars, dated requests, OTP, shared schema, concurrency and degraded-mode scope from this brief; DoD 26→16; F-list 27→20; the site can launch independently of the portal; WordPress becomes viable again (§12); read-only availability declared as a future option only (§16); the residual risk is static copy drifting from operational truth, mitigated in §6.4** |

---

## 20. Change log

| Date | Ver | Change |
|------|-----|--------|
| 2026-11-12 | v0.1 | Expanded from three bullet points into a full brief |
| 2026-11-12 | v0.2 | Availability, holds, price placeholders, per-locale channels, mainland constraints; payment and dates removed |
| 2026-11-12 | v0.3 | Inventory reworked around vehicle-time + 8h/100km; internal portal added as a second product |
| 2026-11-12 | v0.4 | Rewritten self-contained; 19 dangling "v0.2 §…" references inlined; portal scoping moved out |
| 2026-11-12 | **v1.0** | **D-19 decoupling applied.** Availability, calendars, dated requests, OTP, shared schema and all concurrency scope removed; §0.1 and §7 state the prohibitions positively; §6.2 inquiry-form field sets promoted to the central requirement; §6.3 WhatsApp/WeChat pre-fill made structured; §6.4 static-copy divergence rule added; §12 reopens WordPress as viable; §11 dependency list cut (fleet/driver/stock data no longer needed); DoD 26→16; features 27→20; Q-23/11/12/13/19/20/21/22/24/28 closed for this site, **Q-18 elevated to the most important open question**, Q-39…Q-44 opened. |
