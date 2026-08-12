# Pwned Password Checker

A simple React app that checks whether a password has appeared in known data breaches using the [Pwned Passwords API](https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange) with k-anonymity.

## How it works

1. The password is hashed locally with SHA-1 in the browser.
2. Only the first 5 characters of the hash are sent to `https://api.pwnedpasswords.com/range/{prefix}`.
3. The API returns matching hash suffixes with occurrence counts.
4. The full hash comparison happens client-side — the password never leaves your browser in plain text.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```
