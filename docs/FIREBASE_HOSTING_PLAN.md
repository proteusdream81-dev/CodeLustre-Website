# CodeLustre Website → Firebase Hosting Rebuild Plan

**Date:** 2026-11-14  
**Status:** In progress — inspection + config prep only. Live site unchanged.  
**Source of truth:** `proteusdream81-dev/CodeLustre-Website` @ `7686bbf`  
**Live site:** https://codelustre.com (Cloudflare + Caddy/uvicorn origin — Base44 hosting style)  
**Decision:** Rebuild for Firebase Hosting (not a straight Base44 → Firebase migration). Preview first; production/DNS only after explicit approval.

---

## 1. Current architecture (reference)

| Layer | Current |
|-------|---------|
| Frontend | Vite 8 + React 18 + Tailwind + React Router |
| Backend / data | Base44 (entities: Lead, Order, Product, User; functions: submitLead, PayPal/checkout) |
| Auth | Base44 AuthProvider (public marketing routes are open) |
| Analytics | GA4 `G-YEBSEY0ZHS` in `index.html` |
| Build | `npm run build` → `./dist` (see `base44/config.jsonc`) |
| Hosting today | Base44-managed (not Firebase) |

### Public routes (from `src/App.jsx`)

- `/` Home  
- `/services`  
- `/care-plans`  
- `/work`  
- `/shop`  
- `/about`  
- `/contact`  
- `/cart`  
- `/checkout/cart`  
- `/order/success`  

Shop, cart, checkout and lead form currently depend on Base44 SDK + functions.

---

## 2. Target architecture (Firebase Hosting)

**Phase 1 — Marketing site on Firebase Hosting (recommended first)**

- Static SPA (or static + light client JS) built from the existing Vite React app, or a simplified static export of the marketing pages.
- Host on Firebase Hosting with SPA rewrite to `index.html`.
- Keep GA4 as-is.
- Contact / lead form: either  
  - (A) temporary form action still pointing at the existing Base44 `submitLead` function, or  
  - (B) new Firebase Cloud Function / Formspree / similar (prefer (A) short-term to avoid scope creep).
- Shop / PayPal: leave behind a “coming soon / enquire” state on the Firebase preview, or keep linking to the live Base44 shop until a full e-commerce cutover is planned. Do **not** break checkout without a replacement.

**Phase 2 (later, optional)**

- Move lead capture to Cloud Functions + Firestore.  
- Rebuild shop on Firebase (or keep a separate Base44/commerce system).  
- Custom domain cutover after preview sign-off.

---

## 3. What this prep delivers

Files on branch `firebase-hosting`:

- `firebase.json` — Hosting config: `public: dist`, SPA rewrite, caching, security headers.
- `.firebaserc` — Project alias placeholder (`REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID`).
- This plan document.

Commands once Firebase project + CLI login exist:

```bash
# One-time
npm install -g firebase-tools
firebase login
firebase use <your-project-id>   # or edit .firebaserc

# Build + preview (does not touch production)
cd CodeLustre-Website
git checkout firebase-hosting
npm ci
npm run build
firebase hosting:channel:deploy preview --expires 7d
# → temporary preview URL for QA
```

Production deploy (only after explicit approval):

```bash
firebase deploy --only hosting
# Then DNS: point codelustre.com to Firebase (as Firebase console shows)
```

---

## 4. Rebuild vs “migrate existing”

Notion task is explicit: **rebuild** for Firebase Hosting rather than migrate the existing website.

1. Keep the current GitHub source as the **content and design reference**.
2. Prefer a clean Hosting-friendly build path (Vite → `dist` → Hosting) with minimal Base44 runtime dependency for the public marketing pages.
3. Do not point production DNS until the preview is verified (responsive, nav, content, GA4 events).
4. Leave the live Base44 site running until cutover day.

---

## 5. Outstanding unknowns (need your input)

1. **Firebase project ID** to use (new project vs existing e.g. ShelfLife-related?).  
2. Who owns the domain registrar / DNS for codelustre.com (for later cutover).  
3. Whether shop/PayPal must work on the Firebase preview day-one, or can stay “enquire / see live site” temporarily.  
4. Preferred contact form backend for the Firebase version (keep Base44 function short-term vs new Cloud Function).

---

## 6. Next actions

- [x] Inspect source + mark task In Progress  
- [x] Add `firebase.json` + `.firebaserc` + plan on branch `firebase-hosting`  
- [ ] Confirm Firebase project ID (or “create new”)  
- [ ] Confirm shop behaviour on preview  
- [ ] `firebase login` + preview channel deploy  
- [ ] QA: desktop + mobile, routes, contact form, GA4 real-time  
- [ ] Explicit approval → production Hosting + DNS  

**Live site remains unchanged until that approval.**
