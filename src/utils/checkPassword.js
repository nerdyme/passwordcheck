async function sha1Hex(password) {
  const encoded = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export async function checkPassword(password) {
  if (!password) {
    throw new Error('Please enter a password to check.');
  }

  const hash = await sha1Hex(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
    headers: {
      'Add-Padding': 'true',
    },
  });

  if (!response.ok) {
    throw new Error('Unable to reach the Pwned Passwords service. Please try again.');
  }

  const text = await response.text();
  const lines = text.split('\r\n');

  for (const line of lines) {
    const [hashSuffix, count] = line.split(':');
    if (hashSuffix.toUpperCase() === suffix) {
      return { pwned: true, count: parseInt(count, 10) };
    }
  }

  return { pwned: false, count: 0 };
}
