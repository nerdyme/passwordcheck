# Pwned Password Checker

A React + TypeScript app that checks whether a password has appeared in known data breaches using the [Pwned Passwords API](https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange) with k-anonymity.

## Stack

- **React 18** with **TypeScript**
- **Vite** for dev server and production builds
- **Sass (SCSS)** for styles with shared variables and mixins

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

## Project structure

```
src/
├── main.tsx                 # React entry point
├── App.tsx                  # Main UI component
├── types/passwordCheck.ts   # Shared TypeScript types
├── utils/checkPassword.ts   # k-anonymity API logic
├── styles/
│   ├── _variables.scss      # Colors, spacing, breakpoints
│   └── _mixins.scss         # Reusable style mixins
├── index.scss               # Global styles
└── App.scss                 # Component styles
```
