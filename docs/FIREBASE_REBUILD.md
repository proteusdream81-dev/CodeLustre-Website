# CodeLustre Firebase rebuild

## Decision

Rebuild the CodeLustre site as a Firebase-native application rather than carrying the Base44 runtime into production. Keep the existing `main` branch and Base44 deployment untouched while this work happens on `firebase-rebuild`.

## Repository baseline (verified from the current GitHub default branch)

- Frontend: React 18, Vite, React Router.
- Existing public routes: home, services, care plans, work, shop, about, contact, cart, checkout and order success.
- Existing account-related pages/components: login, registration, MFA, forgot password, reset password and OAuth consent.
- Existing Base44 data entity definitions: Lead, Order, Product and User.
- Existing Base44 backend function folders: submitLead, Stripe checkout/session operations and PayPal order operations.
- Existing assets include `public/images/greyhound-rehoming-homepage.webp`.
- The current app startup and authentication context call the Base44 SDK. These must be replaced before the new deployment can be considered independent of Base44.

This inventory describes repository code, not verified production behaviour or a confirmed live data inventory. Before switching production, export and reconcile any existing users, leads, products and orders through an authorised source.

## Target architecture

- **Firebase Hosting** serves the Vite production build from `dist/`.
- **Firebase Authentication** replaces Base44 login/session handling. Configure only the providers actually required; enable MFA after testing enrolment, recovery and sign-in flows.
- **Cloud Firestore** stores leads, catalogue records and order metadata. Define ownership and administrator access in security rules; never ship permissive rules.
- **Cloud Functions for Firebase (2nd gen)** handles privileged lead submission, payment session creation, PayPal order creation/capture and payment webhooks.
- **Firebase Storage** is optional and should be enabled only if managed media uploads are needed.
- **Stripe and PayPal** credentials remain in server-side secrets. Never put private keys in Vite client environment variables.

## Implementation sequence

1. Preserve the existing Base44 deployment and `main` branch.
2. Establish the correct Google Cloud/Firebase project, billing owner, IAM access and domain ownership.
3. Replace Base44 SDK startup/authentication with Firebase client SDK and a tested Auth provider.
4. Port the existing public pages and preserve design/content/assets.
5. Port data models and backend functions; implement Firestore rules and payment webhooks.
6. Add emulator-based tests for Auth, Firestore rules and Functions.
7. Build and preview the Vite site; run lint/type checks and route/payment smoke tests.
8. Deploy to a temporary Firebase Hosting channel, verify functionality, then connect the production domain only after explicit production cutover approval.
9. Keep rollback to the current Base44 deployment available until the Firebase site is accepted.

## Current blockers / unknowns

- Firebase project ID and confirmed project access for the CodeLustre website are not yet verified.
- Domain registrar/DNS ownership and current production hosting configuration are not yet verified.
- Existing Base44 production data volume, export format and migration permissions are not yet verified.
- Payment provider account configuration, webhook endpoints and secrets are not yet verified.
- The actual live site and its approved final content/design have not yet been reconciled against this repository.

## Safety rules

- Do not change the production DNS or Base44 deployment during development.
- Do not delete or overwrite production data.
- Do not copy secrets into Git, Notion or chat.
- Do not deploy permissive Firestore rules.
- Do not mark the rebuild complete until test evidence and a rollback path are recorded.
