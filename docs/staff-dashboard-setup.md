# RentCarOcean staff dashboard setup

The staff workspace is a separate, private enquiry system. It does not connect to the internal operations portal.

## Required Supabase project

Create a dedicated Supabase project for RentCarOcean. Do not reuse the DEQANT project or any operations-portal database.

Apply `supabase/migrations/20261120000100_staff_dashboard.sql` to the new project. The migration enables RLS and revokes direct table access from `anon` and `authenticated`; application server routes use the private service-role key only after verifying a signed-in staff member.

## Vercel environment variables

Add these to the **Preview** environment first:

- `NEXT_PUBLIC_SUPABASE_URL` — the dedicated RentCarOcean project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — the project's publishable key.
- `SUPABASE_URL` — the same project URL (server-side).
- `SUPABASE_SERVICE_ROLE_KEY` — private service-role key. Never prefix this with `NEXT_PUBLIC_`.
- `STAFF_ADMIN_EMAIL` — the exact email address for the first staff administrator.
- `STAFF_DASHBOARD_ENABLED=true` — enables saving vehicle enquiries to the private inbox.

Keep the service-role key server-only. Do not add it to source control, browser code, or public environment variables.

## First administrator

1. In Supabase Auth, invite or create the first administrator account using the exact email configured in `STAFF_ADMIN_EMAIL`.
2. Add the preview URL's `/staff/login` address to the Supabase Auth redirect allow-list.
3. Sign in at `/staff/login`. The server verifies the authenticated email and creates the first admin staff record automatically.
4. The administrator can invite managers and agents from the Staff members section.

Supabase Auth email delivery must be configured for staff invitations.

## Enquiry behaviour

When `STAFF_DASHBOARD_ENABLED=true`, a valid vehicle enquiry is persisted before the notification email is attempted. If email delivery fails, the lead remains in the dashboard and its notification status is marked failed. If the database write fails, the API does not report a successful submission.

When the flag is absent or false, the existing email and optional spreadsheet workflow remains in place and the staff dashboard is not enabled.

## Roles

- **Admin:** full inbox access, assignment, status updates, staff invitations.
- **Manager:** inbox access, assignment and status updates.
- **Agent:** inbox access, status updates and internal notes; cannot assign leads or invite staff.

All staff routes validate the Supabase Auth user on the server and check the active staff record. The database tables have RLS enabled and no public/authenticated table policies.
