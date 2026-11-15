# Internal Operations Portal — Product Requirements Brief (v1.1 draft)

**Companion to:** [company-website-brief-EN.md](file:///C:/Users/苗双笛/Documents/Qoder/2026-11-12/45cd5f11/docs/company-website-brief-EN.md) — **v1.0, and deliberately independent of it.** Decision **D-19** fully decoupled the two products: the website neither reads nor writes anything in this portal, and this portal works whether or not the website exists. **This document supersedes nothing and assumes nothing from that brief except §15.**
**Status:** Draft for developer review. Blocking questions in §12 — Q-17, Q-31, Q-32, Q-34 unanswered.
**Owner:** [Product Manager]　**Date:** 2026-11-12
**Scheduling:** no durations or deadlines for the development team. Sequencing is expressed as dependencies only.

---

## 1. What this product is

The company runs two properties. Since D-19 they are **two products, not one system with two faces**.

| | Public website | **This portal** |
|---|---|---|
| Role | **Show** | **Manage** |
| Audience | customers, Google, Baidu | fleet, dispatch, sales, production, warehouse |
| Owns state? | **none.** No availability, no stock, no holds, no bookings | **authoritative for every resource type in this document** |
| Money handled | none | **none** — it records, it does not charge (decision D-5) |
| Integration | **zero, in both directions** | **zero** — it is the only system of record it needs |

The portal manages **four resources**. Treating them as one "stock quantity" is the failure mode this document exists to prevent:

| Resource | Type | Unit of supply | Who consumes it |
|----------|------|----------------|-----------------|
| **① Vehicles + drivers** | **time** | an occupation window `start_dt → end_dt` | rentals, transfers, tour blocks |
| **② Gift boxes & components** | **quantity of perishable matter** | units per lot, with an expiry date | box orders, production consumption, waste |
| **③ Sales records** | **process state** | a lead's lifecycle position | staff actions, one lead one owner |
| **④ Delivery capacity** | **time × space** | rider-trips per zone per slot | every box and flower order |

② cannot reach a customer without ④: same-day gifting is sold on a slot exactly like a car is sold on a date.

Plus a fifth and sixth that are declared but **not built in Phase 1**: tour departure seat capacity, and event/decor assets & vendor availability (§11).

### 1.1 Why this portal exists at all

Its previous justification was the public site's live availability and stock display. **That reason no longer exists** — D-19 stripped every quantity and availability claim off the website. What remains is a better reason, and it does not depend on the website at all:

**Today nobody can answer "is a Hiace free on 24 January?" without asking a person.** Cars get double-booked, boxes get promised without the fruit in hand, overtime kilometres are never collected, and a lead answered three days late is simply gone. The portal exists to be the single place where the answer to that question is written down — by staff, for staff.

> **Adoption is still the success condition, and D-19 makes it harder, not easier.** With no public page forcing accuracy, a parallel WhatsApp note or spreadsheet no longer produces a visible bug. It produces a quietly wrong system that everyone continues to trust.
> Two rules follow. They are design constraints, not slogans:
> **R1 — a phone booking must be creatable in ≤3 fields, on a phone, in under 30 seconds.** Anything slower loses to a WhatsApp note.
> **R2 — a job that is not in the portal is not a job.** A management rule; it needs Q-17 (a named Fleet Manager) to exist at all.

---

## 2. Roles and permissions

### 2.1 Roles

`Owner/Admin` · `Fleet Manager` · `Dispatcher` · `Sales` · `Sales Manager` · `Production/Gifting Lead` · `Stock Keeper` · `Rider/Courier` (Phase 2, Q-26) · `Driver` (Phase 2, Q-26) · `Content Editor` · `Read-only Auditor`

### 2.2 Permission matrix (defaults; adjust per Q-26)

| Capability | Fleet Mgr | Dispatcher | Sales | Sales Mgr | Prod Lead | Stock Keeper | Admin | Auditor |
|---|---|---|---|---|---|---|---|---|
| View calendar / stock | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| **Write vehicle/driver availability** | ✔ | ✔ | ✖ | ✖ | ✖ | ✖ | ✔ | ✖ |
| Create booking (any channel) | ✔ | ✔ | ✔ | ✔ | ✖ | ✖ | ✔ | ✖ |
| Turn an inquiry into a hold / booking | ✔ | ✔ | ✔ | ✔ | ✖ | ✖ | ✔ | ✖ |
| Release/extend a hold | ✔ | ✖ | ✖ | ✖ | ✖ | ✖ | ✔ | ✖ |
| Own leads only | – | – | ✔ | ✔ | – | – | ✔ | – |
| **All leads + reassign** | ✖ | ✖ | ✖ | ✔ | ✖ | ✖ | ✔ | ✖ |
| **Edit lead `source` / `utm`** | ✖ | ✖ | ✖ | **✖** | ✖ | ✖ | ✖ (system-set only) | ✖ |
| Box order intake | ✔ | – | ✔ | ✔ | ✔ | ✔ | ✔ | – |
| **Stock ledger write (receipt/issue/waste)** | ✖ | ✖ | ✖ | ✖ | ✔ | ✔ | ✔ | ✖ |
| Stocktake session | ✔ | ✖ | ✖ | ✖ | ✔ | ✔ | ✔ | ✖ |
| **See rate cards / money** | ✔ | ✖ | ✔ | ✔ | ✖ | ✖ | ✔ | ✔ |
| Edit fleet register | ✔ | ✖ | ✖ | ✖ | ✖ | ✖ | ✔ | ✖ |
| Edit operational config (§9) | ✔ | ✖ | ✖ | ✖ | ✔ | ✔ | ✔ | ✖ |
| Audit log | ✔ | ✖ | ✖ | ✔ | ✔ | ✔ | ✔ | ✔ |

Three rules worth calling out:
- **`can_view_rates` is a separate permission.** D-1 keeps prices off the public site, but internal visibility must not be blanket — a rider does not need the fleet rate card.
- **Lead source is immutable by design.** Marketing ROI dies the moment a salesperson can retype `utm_source` as "I closed this". Staff write outcomes and notes; the system writes attribution.
- **No role can delete operational history.** Corrections are compensating ledger entries (§4.2), never overwrites.

### 2.3 Auth

Staff accounts, no shared logins (shared logins destroy the audit log, which is the point of DoD 22 (§13)). MFA enforced for every role that can write availability, stock or money-adjacent data. Session timeout, device listing, revocation. Driver/Rider logins are Phase 2 and read-scoped to their own jobs (Q-26).

---

## 3. Module ① — Fleet & driver time inventory

**This model is owned entirely by this document.** Under D-19 there is no counterpart on the website side; the public site holds no time or quantity data of any kind.

**Objects:** `vehicle` (category, seats, transmission, plate, `driver_required`, `self_drive_ok`, `status: active|maintenance|retired|holdback`) · `driver` (languages `zh/en/id`, zone, `max_hours_per_day`, `min_rest_hours`, availability) · `occupation` (start/end, buffer, `usage_type: full_day|half_day|transfer|tour_block|maintenance|company_hold`, state `hold|provisional|confirmed|completed|cancelled|expired|no_show`, `included_hours = 8 × days`, `included_km = 100 × days`, actual pickup/return, odometer in/out, `overage_hours`, `overage_km`, hold code, derived expiry, source channel, owner) · `blackout`.

**Rules:** overlap = time-range intersection with buffer widening; **atomic anti-double-booking**; car-and-driver pairing (a vehicle can be unofferable because *no Chinese-speaking driver is free*, which is a different answer from "no car" and must be displayed as such); buffer, lead time, horizon, cutoff all operator-editable; **safety stock = 0 as an internal allocation rule (D-11)** — every in-service unit is offerable.
**Occupation semantics after D-19 (formerly Q-23):** an inbound inquiry — web, phone, WhatsApp, WeChat or walk-in — **never creates an occupation automatically**. It creates a `lead`. Only a person creates a hold or booking. Holds block other staff by default; overriding a hold is allowed and logged with the actor.

**Portal-side requirements:**

| # | Requirement |
|---|-------------|
| FL-1 | Three calendar views: by category (density of free units per day), by vehicle (one row, intra-day jobs visible), by driver (shifts + assignments). Day cells expand into the intra-day view; **one vehicle may hold two jobs in one day** — the model must support split-day occupations, not one-row-per-date |
| FL-2 | Drag to create/block; right-click (long-press on mobile) for the action sheet. Keyboard-free operation must be possible on a phone |
| FL-3 | **Conflict banner, not a report**: a late return that overlaps the next occupation raises it at the moment `actual_return_dt` is entered, with the affected next booking named and one-tap actions (extend buffer / swap vehicle / notify customer) |
| FL-4 | **Under-assignment detection**: confirmed occupation with no driver, or driver booked past `max_hours_per_day` / into a `min_rest_hours` violation, or a car assigned while `status = maintenance` |
| FL-5 | **Dated-inquiry queue**: inbound inquiries carrying a customer date (leads, not occupations, per above). One-tap *hold* (creates an occupation) or *release*; plus **stale queue** — inquiries with no logged follow-up for N hours. D-13's expiry table still governs holds, anchored on the date the customer asked for: ≥14 days out → until 7 days before pickup; 7–14 → 48h; 3–7 → 12h; <3 → 4h. Operator-editable, **no fixed system TTL, no per-contact limit** |
| FL-6 | Close-out enforcement: a booking cannot move to `completed` without `actual_return_dt`, `odometer_out`, and derived overage (Q-24 — who enters this) |
| FL-7 | Anomaly alerting, **no hard limits** (D-13): notify Fleet Manager when a date is covered by > N unconfirmed holds, when a category sits at 0 free units with no confirmed booking, or when a single contact opens many requests — alert, do not block |
| FL-8 | Bulk actions: block fleet for a holiday (Lebaran, Chinese New Year), mass-extend, mass-release expired holds |
| FL-9 | Utilisation by vehicle and category; days idle; per-vehicle overage realised (this is unbilled revenue, §7) |

---

## 4. Module ② — Physical stock (perishable)

This is a genuinely different problem from vehicle time. Fruit and flowers **rot**, so the system must track *which units*, not just *how many*.

### 4.1 Objects

| Object | Fields |
|--------|--------|
| `stock_item` | sku, `kind: finished_box \| component \| packaging \| consumable`, `uom: box\|pc\|kg\|bunch\|stem\|sheet`, `perishable`, `storage: ambient\|chilled\|frozen\|dry`, `shelf_life_days`, `lot_tracked`, `reorder_point`, `availability_kind: in_stock \| seasonal \| made_to_order`, `active`, locale-aware name + description |
| `stock_location` | name, city, `has_cold_storage`, capacity, pickup-point address (the website's coverage text is editorial copy derived from this list — §15) |
| `stock_lot` | item, lot_code, supplier, received_at, qty_received, qty_remaining, **`expiry_date`**, unit cost, location |
| **`stock_ledger`** | **append-only movement log**: `receipt \| issue_to_order \| assembly_consume \| transfer_in/out \| adjustment_gain \| adjustment_loss \| waste \| count_variance`. Each row: item, lot, qty, reason_code, reference (order/booking), actor, timestamp, note |
| `bom` | finished box SKU → component lines (qty + uom) + packaging + card + `labour_minutes` |
| `capacity_rule` | max finished boxes **per day per location**, optionally per size tier; custom-design slot count |
| `order_line` / `box_order` | SKU, qty, delivery or pickup, date + slot, zone, card message, occasion, corporate PO ref, status `requested\|confirmed\|in_production\|ready\|out_for_delivery\|delivered\|cancelled` |
| `stocktake` | session, location, expected vs counted per item, variance with reason code, who counted |
| `supplier` | contact, items, lead time, MOQ, terms text (no payment processing) |

### 4.2 Quantity is derived, never stored

> **`on_hand(item) = Σ stock_ledger`. There is no `quantity` column to edit.**
> A directly-editable stock count is how perishable systems silently drift. After D-19 the drift no longer appears as a wrong badge on a web page — it appears as a salesperson quoting a box quantity that cannot be assembled, which is worse because it arrives with a promise attached. Every change is a ledger entry with a reason code and an actor, and it is reversible only by a compensating entry.

### 4.3 Perishable-specific requirements

| # | Requirement | Default / note |
|---|-------------|----------------|
| ST-1 | **FEFO allocation** — first-expiry-first-out, not FIFO. A 3-day box must not consume fruit with 2 days left if 5-day stock exists | configurable, on by default |
| ST-2 | **Quality-at-delivery rule** — a lot may only be allocated if `expiry_date ≥ delivery_date + min_remaining_days` | ASSUMPTION `min_remaining_days = 1`; fruit that is fine when packed and tired when handed over is the most common gift-box complaint |
| ST-3 | **Component-level availability.** A box is sellable only if *every* BOM line is available. `sellable(sku, date)` = min over components, minus reserved, **capped by `capacity_rule` for that day** | prevents the classic error of counting finished boxes while the ribbon runs out |
| ST-4 | **Production capacity as a resource.** A kitchen assembles a finite number of boxes per day. Overselling capacity is as damaging as overselling cars | number required — Q-34 |
| ST-5 | **Cold chain recorded** per item and location; chilled stock cannot be allocated to a hot-zone same-day delivery beyond a stated time | ASSUMPTION simple rule: chilled items require a delivery slot ≤ 3h from dispatch |
| ST-6 | **Waste with reason codes** (`expired`, `damaged`, `quality_reject`, `overproduction`, `customer_return`). Waste is the real cost line of a perishable business; it must be one-tap to record | mandatory reporting |
| ST-7 | **Receiving** against a purchase note, creating lots with expiry dates captured at the door | Q-33: who buys fruit today, and on what paper |
| ST-8 | **Made-to-order SKUs** need no stock; they consume only capacity + packaging. `availability_kind` (§4.1) is stored here as the **operational fact**; the website's `in stock / seasonal / made to order` badge is static editorial text copied from it, never read live (D-19) | keeps the two reconcilable without a link — §15 |
| ST-9 | **Stocktake**: scheduled sessions; variances reported; a location that hasn't been counted for N days is flagged, because **every quantity a salesperson quotes is a claim made on this system's behalf** | Q-32 |
| ST-10 | **Seasonal assortment switching** — Lebaran/Christmas/CNY SKUs active for a window, then retired with their leftover lots visible | not a delete |
| ST-11 | **Corporate orders** reserve stock in bulk with a delivery date and are cancellable up to a stated lead time; quantity-tier pricing is internal-only (D-1/D-3) | |
| ST-12 | **Concurrent oversell protection**: two channels selling the last box — two salespeople, or a salesperson and a marketplace sale — must produce exactly one confirmed order and one clean failure, same guarantee as §3 | DoD |

### 4.4 Multi-channel warning (must be answered before building)

If the company also sells gift boxes on **Shopee / Tokopedia / TikTok Shop / Instagram DM / GoSend**, those sales consume the **same physical fruit**. If that stock lives in a different place, the portal is wrong on day one. D-19 changed the shape of this question but not its difficulty: **the website is no longer one of the channels** — it only produces inquiries — so Q-31 must enumerate the remaining ones completely. This is currently unanswered.

---

## 5. Module ③ — Sales records (leads, ownership, follow-up)

What "记录销售人员" actually needs to mean, specified so it is usable and not just surveillant.

| # | Requirement |
|---|-------------|
| SR-1 | **Lead inbox** with queues: unassigned · mine · all · stale (> N hours without action) · waiting-on-customer · won · lost. Filter by locale, service line, channel, owner, date |
| SR-2 | **One lead, one owner**, assignment manual or round-robin per service line (Sales Manager config). Ownership transfer is logged |
| SR-3 | **Immutable attribution**: `landing_page`, `utm_*`, `referrer`, `locale`, `channel(web_form\|whatsapp\|wechat\|phone\|walkin\|referral\|marketplace)`, `first_seen`. System-set at creation; **no role can edit it** (§2.2). For `web_form` leads these arrive **inside the inquiry payload** (§15), not from a shared session |
| SR-4 | **Follow-up log**: timestamp, channel, direction, outcome, free-text note, **next action + scheduled time**. The next-action field is what makes the queue honest — leads with no next action go stale and get flagged |
| SR-5 | **Status machine**: `new → contacted → qualified → quoted → booked / lost(reason)`. Lost reasons coded (`price`, `date_unavailable`, `no_response`, `competitor`, `budget_cancelled`). *This* is the feedback loop that tells us whether D-1 (hiding prices) is costing us — and after D-19 it is **the only** feedback loop, because the website no longer converts anything itself |
| SR-6 | **SLA timer** per lead against the company response promise (Q-18 — unanswered; the site must not publish a promise we haven't confirmed), with breach flag and a manager queue |
| SR-7 | **Booking creation from a lead in one tap**, inheriting customer fields — this is the ≤3-field path that protects R1 |
| SR-8 | **Conversion link**: lead ↔ occupation ↔ box order ↔ tour departure. Without it, we can't tell which inquiries actually turned into vehicles deployed |
| SR-9 | **Per-staff view**: their leads, their response times, their bookings. **Manager view**: comparisons. **No public leaderboard** and no cross-staff visibility of others' notes by default — adoption depends on this not feeling like surveillance (see §12 note) |
| SR-10 | **Customer record** (lightweight): name, phone (+62), WhatsApp, **WeChat ID**, email, company, address book, notes, consent state, history. Not a CRM pipeline beyond SR-5 statuses (§11) |
| SR-11 | **Consent & PDP handling at record level**: marketing consent captured with timestamp and source; a data-subject request or deletion is a portal action with an audit trail; retention (24 months) enforced with a purge job that preserves aggregate, non-personal counts for reporting. Portal-side PII arrives from the website as **owned data**, so the site's privacy policy must name the internal system as a recipient (§15) |
| SR-12 | **Qualification checklist** — a short, structured set of asks captured on the lead: headcount, date flexibility, budget range **volunteered by the customer or asked conversationally**, decision-maker, occasion, deadline. **No budget field exists on any public form** (website decision D-15, website §6.2), so this checklist is the only place budget information is recorded. Checklist completion is what separates `qualified` from `contacted` in SR-5 |
| SR-13 | **Quotes**: internal `quote` object with rate lines from the internal rate card, PDF export with company branding, valid-until date, sent-as-attachment by a human. **No payment link** (D-5). Quote accepted → creates occupation/order |

### 5.1 The uncomfortable fact about sales records

Staff conversations happen on **personal WhatsApp and WeChat accounts** (and per D-14 the WeChat side is a personal number — website §4.5). A portal **cannot** capture those chats, and trying to is the sort of requirement that makes staff hate the system.

So the portal records **outcomes and dates, not conversations**. Consequences the company should accept knowingly:
- Note quality depends entirely on discipline; the record is a summary written by the person who did the work.
- **When a staff member leaves, the chat history leaves with them.** Customer relationships held on personal accounts are not a company asset. The mitigation is organisational (a company-owned device/number — already recommended for WeChat in D-14), not a portal feature.
- If the company later wants shared inboxes, that is a **WhatsApp Business API / 企业微信** decision — declared, not built (§11).
- **D-19 increases the weight of this section.** Since the website no longer answers "is it available?", that answer now lives only in a staff member's head, WhatsApp notes, or here.

---

## 6. Module ④ — Delivery capacity

Boxes and flowers fail on the last mile, so capacity is a real resource.

| # | Requirement |
|---|-------------|
| DL-1 | **Zones** with fee logic (internal, per D-1), surcharge list, out-of-zone → pickup-only. **The portal holds the only definition**; the website's coverage/surcharge text is editorial copy reviewed against it (Q-39, §15) |
| DL-2 | **Slots per zone per day** (morning/afternoon/evening or hourly), each with a capacity = rider-trips available |
| DL-3 | **Cutoff times** with `Asia/Jakarta` label; after cutoff, intake offers only future dates. One rule, one home: this table. Any cutoff printed on the website is text copied from here |
| DL-4 | Rider/driver assignment; a rider can be the same person who drives a rental car — the roster must not silently double-book a human across modules ① and ④ |
| DL-5 | **Proof of delivery**: photo + recipient name + timestamp; failures recorded with reason (customer absent, wrong address, refused) and a re-attempt action |
| DL-6 | Perishable handover SLA per delivery (chilled ≤ 3h in transit, ST-5) and a breach flag |
| DL-7 | Corporate bulk delivery: multi-stop manifest per date, sequence, and one delivery-day capacity check across all stops |
| DL-8 | Blackout calendar for holidays and public transport restrictions (Lebaran mudik reduces rider supply — this is a **capacity** problem exactly when gift demand peaks) |

---

## 7. Reporting

| Area | Reports |
|------|---------|
| Fleet | utilisation % per vehicle & category; idle days; **overage hours & km realised but not yet billed** (money currently leaking); no-show rate; late-return conflicts per month; inquiry→hold→confirmed conversion and expired-hold release rate |
| Stock | on-hand by item/lot; value (internal); **waste by reason and by item**; shrinkage %; FEFO adherence; stocktake variance; days since last count per location; reorder alerts; best/worst selling SKU by locale |
| Orders | fill rate (requests delivered as asked), delivery on-time %, cancellations with reasons, corporate order volume by period |
| Sales | leads by locale / service line / **channel and source (attribution matters, SR-3)**; response time median and breach rate; lead→booking conversion; lost-reason distribution (the D-1 feedback loop); per-staff and per-team |
| Accuracy | **inventory accuracy incidents** — every "we said free, it wasn't" logged with cause. Target 0; any count >0 is a defect report, not a statistic. Post-D-19 these happen **in staff conversations** instead of on a web page, which is precisely why they still have to be counted |

---

## 8. Non-functional

| Area | Requirement |
|------|-------------|
| **Mobile-first for the yard** | booking creation, hold creation, stock receipt, waste entry and POD all work one-handed on a phone. Responsive is not sufficient — the primary flows get a phone-sized target, big touch areas, no hover-only affordances |
| Speed | calendar and queue screens load p95 < 2s on office 4G; booking creation p95 < 1s to confirm |
| **Weak connectivity** | the yard and delivery vans have poor signal. Flows must tolerate a dropped request: queue locally, retry visibly, never double-submit an occupation or ledger entry (idempotency keys). No offline *editing* of inventory in Phase 1 — a queued write that lands an hour later must be marked as such |
| **Backup / recovery** | the portal is a system of record — and after D-19 the **only** one, since the website now records nothing. **RPO ≤ 15 min, RTO ≤ 2h** for `occupation`, `stock_ledger`, `lead`, `box_order`: data that cannot be reconstructed from a chat log. Point-in-time recovery, restore tested |
| Security | hard auth wall; `noindex, nofollow` + robots disallow on every route; **no link to it from anywhere public**; MFA for writers (§2.3); session hardening; per-role data scoping; dependency scanning; audit log (actor, before/after, timestamp) retained ≥ 24 months |
| Privacy | leads and customers are PII; access to customer records is itself logged; retention purge per SR-11; **no third-party analytics on portal routes** |
| Time/numbers | UTC storage, `Asia/Jakarta` display, ISO-ish date input for staff typing, IDR amounts with proper formatting; internal price values display normally (D-1 constrains the public site only) |
| Environments | dev / staging (seeded with **synthetic** fleet, stock and bookings) / production; promotion path for config; **never test concurrency or stocktake on real inventory** |
| Data quality | seeded from real fleet register + baseline stock count + open bookings before go-live (§14 P0) |
| Accessibility | AA on portal screens too — staff spend all day in it; contrast and keyboard nav on the two screens staff use most (calendar, booking form) |
| **Independence** | no feature may fail because the public website is down, unreachable or not yet built. The only coupling permitted is the inbound inquiry payload (§15), and its absence must be survivable |

---

## 9. Screen inventory

1. **Today** (ops dashboard): unassigned leads · today's jobs by category · conflicts · expired holds to release · stock below reorder · deliveries pending
2. Fleet calendar (category / vehicle / driver views + intra-day)
3. Booking create/edit (≤3-field quick mode + full mode)
4. Dated-inquiry queue (+ stale queue)
5. Vehicle register (+ per-vehicle history)
6. Driver roster, shifts, languages, hour limits
7. Lead inbox + lead detail (timeline, next action, one-tap booking)
8. Customer record + history
9. Quote list + PDF generation
10. Box order list + order detail (allocation view: which lots, FEFO order)
11. Stock on-hand by item / lot / location (+ expiry heat)
12. Receiving & purchase notes
13. Waste & adjustment entry (one-tap, reason-coded)
14. Stocktake sessions
15. Delivery schedule by zone & slot (+ rider assignment, POD)
16. Rate card & rule editor (gated by `can_view_rates`)
17. Blackout / holiday calendar
18. Reports (fleet / stock / sales / accuracy)
19. Operational config (cutoffs, thresholds, lead time, horizon, expiry table, capacity, zones)
20. Users, roles, devices, audit log

Phase-1 screens: **1–5, 7–8, 10–11, 13, 15–20**, with 12 and 14 as a basic version. A perishable stock system without receiving is not credible; if the MVP must cut them, ST-3/ST-4 must degrade to conservative manual checks **and the gifting line must stop accepting date-guaranteed orders** until they exist.

---

## 10. Technical direction

**D-19 reversed the earlier guidance.** An earlier draft recommended "two front-ends, one database, one service layer, one codebase". That is now **withdrawn**. Build this as a standalone internal application with its own repository, database, auth and deployment. Do not share anything with the marketing site.

Portal-specific guidance:
- **Own store, real transactions.** PostgreSQL (or equivalent) because `tstzrange` + `EXCLUDE USING gist` overlap constraints and an append-only ledger are the core patterns. A design that cannot do both is the wrong design.
- **Ledger-based stock (§4.2)** for ②; **time-range exclusion constraints** for ① and ④. Same guarantee, two mechanisms: no two overlapping rows for one resource.
- **Idempotent writes** for occupations, ledger entries and holds (mobile retries, §8).
- **Availability, capacity and cutoff maths live in exactly one place** — behind a service/API that the screens call, never re-implemented per screen. This "single seam" rule is what would make a future read-only availability feed to the website (declared in website §16) an added endpoint instead of a rewrite. **Build the seam; do not build the endpoint.**
- **Inbound inquiries arrive as a payload** (webhook, email parse, or CSV import) and become a `lead`. A malformed or missing field must degrade to a lead with what was captured, not a rejected submission. **If the website is not built yet, import by CSV and lose nothing but `utm_*` granularity.**
- **Permissions as data**, not hardcoded role names, so `can_view_rates` and reassignment rules survive the first org change.
- **Event stream/webhook per state change**, so a CRM/notification/WhatsApp layer in Phase 2 doesn't need to re-read tables.
- Left to the developers: framework, ORM, queue, cache — provided the DoD load tests pass. **Hosting is chosen for internal-tool needs** (private network access, backups meeting §8, an identity provider that supports MFA), not for SEO or CDN cost.

---

## 11. Out of scope (declared, not built)

Payment collection, deposits, refunds, card storage (D-5) · **invoicing, faktur pajak, accounting, tax filing** — export CSV for whoever does it (Q-25) · payroll & staff attendance · driver expense claims · a full CRM pipeline beyond SR-5 statuses · a customer self-service login · warehouse management beyond lots/expiry (no bin locations, no barcode picking in Phase 1) · procurement automation beyond a purchase note · **tour departure seat capacity** (Phase 2 — declared as a third time resource) · **event/decor asset & venue/vendor availability** (Phase 2/3 — the same occupation pattern as module ①, applied to assets and vendors) · shared WhatsApp Business / 企业微信 inbox (org decision, §5.1) · BI warehouse · a mobile app store release (the portal is a responsive web app; Q-35) · **and anything pointing at the public website** (D-19).

---

## 12. Open questions

**Blocking** — cannot start the relevant module:

| # | Question | Blocks | Default |
|---|----------|--------|---------|
| **Q-17** | **Named Fleet Manager** who owns accuracy and enforces R2 | go-live | unassigned → the portal will be bypassed |
| **Q-31** | **Where do gift boxes actually sell?** WhatsApp, walk-in, hotel/corporate partners, Shopee / Tokopedia / TikTok / Instagram — the website is *not* a channel any more (D-19), so this must list the rest. Every channel that consumes the same fruit writes to the same ledger, or stock accuracy is fiction | module ② | web-derived + walk-in only |
| **Q-34** | **Production capacity**: how many boxes can be assembled per day, per size tier, per location? | ST-3/ST-4 | unknown → capacity rules cannot be set; overselling guaranteed at peak |
| **Q-32** | **Baseline stock count and stocktake ownership**: who counts, how often, and will they? Perishable stock without counts drifts within days | module ② go-live | weekly count by Stock Keeper |

**Non-blocking** — defaults apply:

| # | Question | Default |
|---|----------|---------|
| Q-23 | *(repositioned by D-19 — no longer about a public promise)* Do **staff-created holds** block other staff, or only confirmed bookings? | holds block by default; override allowed and logged |
| **Q-19** | *transferred from the website brief by D-19* — driver working-hour and rest rules: actual `max_hours_per_day` and `min_rest_hours`, and **where the roster physically lives today** (paper? WhatsApp? one person's head?) | 10h + 10h rest; roster source unknown → FL-4 can flag but not enforce |
| **Q-20** | Do the 8h/100km entitlements **pool across a multi-day rental**, or reset each day? | pool across the booking, settle on return — this is what "超时超公里另计" usually means in practice |
| **Q-21** | Does "a day" have a fixed shape (e.g. 08:00→18:00) or is it simply `start_dt + 8h`? Is a **half-day** an offerable unit staff can book? | anchored on actual pickup time; half-day bookable internally, never advertised |
| **Q-22** | Does an **airport transfer** consume a day, or occupy only its real window + turnaround buffer? | occupies its window + buffer; a category may therefore show "no full day free" while transfers are still possible |
| **Q-18** | Is "reply within 2 working hours" real? **More load-bearing than before**: after D-19 the website's only conversion promise is how fast we answer, and SR-6's timer needs the number regardless | don't publish it; set the internal timer to 2 working hours |
| Q-26 | Portal users: how many staff, which roles, do **drivers/riders** get logins? | staff only; driver/rider logins Phase 2 |
| Q-27 | Existing rental/fleet software to integrate rather than rebuild? | build fresh |
| Q-30 | Is stock tracked **at all** today, on paper or in any app? What is the component list for the 12 SKUs? | no system; build from a SKU component worksheet we create |
| Q-33 | Who buys fruit/flowers, from whom, and on what document? Is there a purchase price list to import as lot cost? | manual buying; capture cost at receiving |
| Q-35 | Portal delivery: responsive web only, or do we need PWA install / offline mode for vans with no signal? | responsive web + queued writes; PWA if Q-36 says signal is bad |
| Q-36 | Where is stock physically held, and how many locations? Is there cold storage? | 1 location, some chilled — confirm |
| Q-24 | Who enters actual return time + odometer — dispatcher, driver or Fleet Manager? Can a booking close without it? | Dispatcher; close blocked without it |
| Q-25 | Portal-side invoicing? | **No** |
| Q-37 | Do multiple branches/cities exist, and can a lead in one city be served by another's fleet? | single base |
| Q-38 | Is per-staff performance comparison wanted, and who sees it? Affects SR-9 defaults and adoption | visible to the person + Sales Manager only |

> **Note on SR-9 / Q-38.** The sales-records module is the one part of this brief that can turn into surveillance if it is configured carelessly. Outcome metrics are useful; reading a colleague's notes is not. Defaults are deliberately narrow, and widening them should be a decision recorded against Q-38, not a checkbox someone ticks.

---

## 13. Definition of Done

1. **The portal is the only writer of operational state.** A booking created in quick mode changes what the next staff user sees within the same request cycle, with no cache able to serve a stale availability view — **and there is no code path, credential, shared table or API call connecting this product to the public website** (D-19).
2. **Quick-mode booking: ≤3 fields, completed in under 30 seconds on a phone**, tested by someone who did not build it.
3. **Concurrency, time resources**: two simultaneous requests for the last vehicle → exactly one occupation, one clean failure, verified by script.
4. **Concurrency, perishable stock**: two channels selling the last box → exactly one confirmed order; the other gets a stock-unavailable message, not a partial allocation.
5. **No stored quantity column exists**: `on_hand` is derived from the ledger, and a direct DB edit is impossible by design; every movement has a reason code and an actor.
6. **FEFO + quality-at-delivery enforced**: allocating a box consumes the earliest-expiring eligible lot, and refuses lots that would not survive to `delivery_date + min_remaining_days`.
7. **Component-level + capacity-limited sellability**: a box cannot be confirmed when any BOM line is short or the day's production capacity is exhausted — with a clear reason shown.
8. **Late-return conflict banner fires** the moment an over-due `actual_return_dt` is entered against a following occupation, with one-tap remediation.
9. **Pairing violations blocked or flagged**: confirmed job without a driver; driver over `max_hours_per_day`; job against a `maintenance` vehicle.
10. **Lead `source`/`utm`/`locale` cannot be edited by any role**, including Admin; verified by an attempted edit.
11. **Lost-reason codes collected** and reported — post-D-19 this is the only remaining signal on whether hiding prices (D-1) is costing bookings.
12. **Waste is one-tap to record** with a reason code and appears in the monthly report by item.
13. **Stocktake variance report** produces a count difference with reasons; a location stale for > N days is flagged.
14. **Zones, slots and cutoffs have exactly one definition** — editing a cutoff changes order intake immediately without a deploy, and nothing needs to propagate anywhere else.
15. **Proof of delivery** captures photo + recipient + timestamp; a failed delivery creates a re-attempt action and a reason code.
16. **No hard per-contact limit exists anywhere** in the codebase (D-13 honoured); anomaly alerting fires instead, tested with a seeded surge.
17. **Inbound inquiries never create occupations.** An import of N web inquiries produces N leads and zero holds; a human converts. Verified with the real website payload shape (§15).
18. **Every write-role session requires MFA**; the portal is unreachable without auth and returns `noindex` + auth wall to a crawler; it is not linked from the public site.
19. **Point-in-time restore of `occupation`, `stock_ledger`, `lead`, `box_order`** tested from a ≥ 15-minute-old backup; documented; RPO/RTO figures in §8 met.
20. **Queued-write resilience**: a booking submitted with the network cut mid-request does not produce a duplicate occupation or a duplicate ledger line.
21. **The portal functions with the website switched off** — demonstrated by importing a CSV instead of a webhook; no feature errors.
22. **Audit log** shows who changed what, from which value to which, when — for every state change in §3–§6.
23. **Operator-editable config** (cutoffs, few-left threshold, lead time, horizon, expiry table, production capacity, zones, buffers) change live without a developer.
24. **Go-live data loaded**: full fleet register, driver roster, baseline stock count with lots and expiry dates, and **all open bookings imported**, reconciled and signed off by the Fleet Manager.
25. **A dispatcher can run a normal day** — answer a WhatsApp booking, block a car for service, record a fruit delivery, log waste — without contacting the development team.

---

## 14. Phasing — no durations

| Phase | Scope | Exit |
|-------|-------|------|
| **P0 — Data prep & decisions** | Q-17 named; Q-31/Q-32/Q-34 answered; fleet register + driver roster + **baseline stock count** + component worksheet per SKU; open bookings exported; inquiry payload field list agreed with website §6.2 | data machine-readable and owned |
| **P1 — Portal core** | Auth+MFA+RBAC · modules ①③ fully · ② with lots/expiry/waste/receiving-basic/stocktake-basic · ④ zones+slots+cutoff+POD · reports for fleet & sales · config · audit. **Independent of the website's schedule** — it may ship before, after, or never | §13 items 1–25 except those depending on P2 |
| **P2 — Depth** | full BOM-driven stock, capacity modelling, purchasing & supplier costs, value/shrinkage reporting, corporate bulk manifests, driver & rider logins, quote PDF polish, CRM sync out | accuracy incidents sustained at 0 for a full peak period (§7) |
| **P3 — Extensions** | tour departure seat capacity, event/decor asset & venue availability, shared WhatsApp Business inbox, PWA/offline, BI export, **and only if asked for: a read-only availability endpoint for the website** (website §16) | only after P1/P2 accuracy data |

**Honest scope statement:** modules ①+③ are what make *the answer given to a customer* correct — availability quoted on a call, a lead that cannot be dropped. After D-19 the website no longer depends on that, but the business does. Adding ②+④ (perishable stock + last-mile capacity) turns this into an ERP-lite product. If the budget conversation forces a cut, **the right cut is P1 first and let the gifting line keep its spreadsheet until P2 — with one condition: staff must stop quoting box quantities from that spreadsheet as if they were facts.**

---

## 15. Contract with the public website (one-way, after D-19)

There is no shared system. One artefact crosses the boundary and the rules are asymmetric on purpose.

| Rule | Detail |
|---|---|
| **Portal → website** | **Nothing.** No availability read, no "few left", no stock badge, no cutoff feed, no zone validation, no shared session, table or credential. Anything of this kind on the website is out of scope (website §0.1 and §7) |
| **Website → portal** | One inquiry per form submission: contact fields, service line, requested date(s), party size, message, `locale`, `channel=web_form`, plus `landing_page` / `referrer` / `utm_*` as captured by the form itself. Field list = website §6.2. Transport: email **and** a webhook or CSV the portal can ingest |
| **Ingestion guarantees** | The inquiry becomes a `lead`, never a hold or occupation (SR-3, DoD 17). Missing optional fields degrade gracefully; a duplicate submission is deduplicated by contact + date + service line, with the duplicate visible, not silently dropped |
| **If the website breaks** | Portal unaffected. Staff keep booking from phone, WhatsApp, WeChat, walk-in |
| **If the portal breaks** | Website unaffected — it publishes no live data. Manual fallback is the same one used today |
| **PII ownership** | Customer data arriving from the website becomes **portal-owned data**, and the portal inherits its retention and PDP obligations (SR-11). The website's privacy policy must therefore name the internal system as a recipient (website §3.11, §11, DoD 16) |
| **Reconciliation, not integration** | The website's static claims (delivery zones, cutoff, lead times, seasonal badge, minimum order) are copied from portal config **by a human** and reviewed quarterly — website Q-39 owns the reminder; the portal only needs to make the current values easy to read |
| **Future option** | If the company later wants read-only availability on the site, it is an added **published read endpoint on this portal's existing allocation service** (the §10 seam, P3). It must never become a second implementation of the availability maths, and it is not in this brief's scope |

---

## 16. Change log

| Date | Ver | Change |
|------|-----|--------|
| 2026-11-12 | v1.0 | First standalone portal brief. Supersedes website brief §7. Added perishable/lot/FEFO stock model (§4), production capacity (ST-4), delivery capacity module (§6), sales-records module (§5) with immutable attribution and outcome-only recording, 23 DoD items, P0–P3 scope groups, Q-17/23 carried, Q-30…Q-38 opened, RPO tightened to 15 min as a system of record |
| 2026-11-12 | **v1.1** | **D-19 decoupling applied.** §10's "two front-ends, one database, one codebase" guidance **withdrawn** in favour of a standalone internal app; §15 rewritten as a one-way inquiry-handoff contract; DoD rewritten — old items 1 and 14 asserted public-site propagation and are replaced, new items 17 and 21 assert the *absence* of coupling (25 items); Q-23 closed for the public side, repositioned and moved to non-blocking; ST-8/ST-9/DL-1/DL-3 reclassified as "portal owns the fact, the website copies the text"; §1.1 rationale rewritten — the portal now stands on operational accuracy, not on a public page; SR-5 named as the sole feedback loop; §8 gained an Independence row; §9/§14 wording no longer tied to the website's phases; `availability_kind` added to `stock_item` so the website's badge has a source of truth to be copied from; **Q-19/Q-20/Q-21/Q-22 transferred in from the website brief** — they were always operational questions, and the portal is the only product left that can answer them |
