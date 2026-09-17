# Fragment

Independent digital engineering studio site — Next.js 15 (App Router).

## Setup

```bash
cd ~/Desktop/Fragment
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/services` | Services + assemble diagram |
| `/work` | Portfolio |
| `/work/[slug]` | Project detail |
| `/team` | Team |
| `/contact` | Contact form + Calendly slot |

## Config

Set Calendly in `.env.local`:

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

Or pass `?calendly=…` on the contact page.

## Design source

Original Claude Design export lives in `design/` (`Fragment.dc.html`, `support.js`, Brand Kit).

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm start` — serve production build
