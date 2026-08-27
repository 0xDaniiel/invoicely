# Invoicely

A minimal invoicing platform. Fill in a form, preview the invoice live, then download it as a polished PDF — no bloated accounting software required.

## Features

- Form-based invoice creation (business info, client info, line items, tax, due date, notes)
- Live preview that matches the exported PDF exactly
- Flexible payment options per invoice — bank details, a custom payment link, or a crypto wallet address (with QR code)
- Google sign-in
- Dashboard with invoice/PDF history

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Zustand for form state
- `@react-pdf/renderer` for PDF generation
- NextAuth.js (Google provider)
- Postgres (Supabase/Neon) for invoice history

## Getting started

\`\`\`
pnpm install
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000).

## Status

Early development.
