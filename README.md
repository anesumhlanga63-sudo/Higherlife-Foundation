# HigherLife Foundation — "I'm a Joshualite"

This is a deployable version of the app, ready to turn into an installable
PWA on your own domain. The app code itself (`src/App.jsx`) is unchanged
from what you've been using in Claude — only the storage layer was swapped
so it works outside of Claude's chat interface.

## 1. Install Node.js

If you don't already have it: download the LTS version from
https://nodejs.org and install it. This gives you `node` and `npm`.

## 2. Create a free Firebase project (this replaces Claude's storage)

The app needs somewhere to save posts, chats, members and photos. Firebase's
free tier is the fastest way to get that without writing a backend yourself.

1. Go to https://console.firebase.google.com and create a project (free).
2. In the left sidebar: **Build → Firestore Database → Create database**.
   Choose **test mode** for now (see the security note at the bottom).
3. Click the gear icon → **Project settings** → scroll to "Your apps" →
   click the **</>** (web) icon → register an app (any nickname).
4. Firebase shows you a config object. Copy your real values into
   `src/firebase-config.js` in this project, replacing the placeholders.

## 3. Install dependencies and try it locally

In this project folder:

npm install
npm run dev

Open the URL it prints (usually `http://localhost:5173`) and click around —
this confirms Firebase is wired up correctly before you deploy anywhere.

## 4. Deploy it so it has a real URL

The easiest free option is **Vercel**:

npm run build
npx vercel --prod

The first time, it'll ask you to log in (free account) and confirm some
defaults — accept them. It deploys the `dist/` folder and gives you a live
URL like `higherlife-foundation.vercel.app`.

(Netlify works the same way — `netlify.com/drop` lets you drag the `dist`
folder in directly if you'd rather not use the command line.)

## 5. Point your own domain at it

1. In the Vercel (or Netlify) dashboard, open your project → **Domains** →
   add your domain (e.g. `app.higherlifefoundation.org`).
2. It'll show you a DNS record to add (usually a `CNAME`, sometimes an `A`
   record for a root domain).
3. Go to wherever you bought the domain (Namecheap, GoDaddy, etc.), open DNS
   settings, and add that record.
4. DNS can take anywhere from a few minutes to a few hours to update.
   Vercel/Netlify both issue free HTTPS certificates automatically once it
   does.

## 6. Installing it as a PWA

Once it's live on HTTPS, that's it — no extra step needed:

- **Android/Chrome:** visit the site → menu → "Add to Home screen" / an
  install banner appears automatically.
- **iPhone/Safari:** visit the site → Share button → "Add to Home Screen".
- **Desktop Chrome/Edge:** an install icon appears in the address bar.

## Important: this is still a prototype, security-wise

There's no real login system behind this app — anyone who knows (or
guesses) an ID number can act as that member, and Firestore's "test mode"
means **anyone can read or write all data**, not just logged-in members.
That's fine for trying it out with a small trusted group, but before a
public launch you'd want to add real authentication (Firebase Auth is a
natural fit) and Firestore security rules that check it.