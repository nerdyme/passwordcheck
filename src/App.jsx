import { useState } from 'react';
import { checkPassword } from './utils/checkPassword';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const checkResult = await checkPassword(password);
      setResult(checkResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function formatCount(count) {
    return count.toLocaleString();
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <h1>Pwned Passwords</h1>
          <p className="subtitle">
            Check if your password has appeared in known data breaches
          </p>

          <form className="search-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
                autoComplete="off"
                spellCheck="false"
                aria-label="Password to check"
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                )}
              </button>
            </div>
            <button type="submit" className="check-btn" disabled={loading || !password}>
              {loading ? 'Checking…' : 'Check'}
            </button>
          </form>

          {error && (
            <div className="result result-error" role="alert">
              <p>{error}</p>
            </div>
          )}

          {result && !result.pwned && (
            <div className="result result-safe" role="status">
              <div className="result-icon safe">✓</div>
              <h3>Good news — no pwnage found!</h3>
              <p>
                This password wasn&apos;t found in any of the Pwned Passwords loaded into
                Have I Been Pwned. That doesn&apos;t necessarily mean it&apos;s a good
                password, merely that it&apos;s not indexed on this site.
              </p>
            </div>
          )}

          {result && result.pwned && (
            <div className="result result-pwned" role="alert">
              <div className="result-icon pwned">!</div>
              <h3>Oh no — pwned!</h3>
              <p className="count">
                This password has been seen{' '}
                <strong>{formatCount(result.count)}</strong> times before in data
                breaches!
              </p>
              <p>
                This password has previously appeared in a data breach and should never
                be used. If you&apos;ve ever used it anywhere before, change it
                immediately!
              </p>
            </div>
          )}
        </div>
      </header>

      <section className="privacy">
        <div className="container">
          <h2>Privacy Through K-Anonymity</h2>
          <p>
            Pwned Passwords uses a model called{' '}
            <a
              href="https://en.wikipedia.org/wiki/K-anonymity"
              target="_blank"
              rel="noopener noreferrer"
            >
              k-anonymity
            </a>{' '}
            to let you check whether a password has been seen before without ever
            sending the full password or its complete hash to the service. Instead,
            your password is hashed locally and only the first 5 characters of the
            SHA-1 hash are sent to the API. The service returns a list of matching
            suffixes, and the full comparison happens on your side so the password
            itself remains private.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>
            Powered by the{' '}
            <a
              href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pwned Passwords API
            </a>
            . No API key required.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
