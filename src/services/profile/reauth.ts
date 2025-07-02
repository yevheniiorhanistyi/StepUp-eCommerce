const reauthenticate = async (email: string, password: string) => {
  await fetch('/api/auth/logout', { method: 'DELETE' });

  const loginResponse = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (!loginResponse.ok) {
    const err = await loginResponse.json();
    throw new Error(err.message || 'Failed to reauthenticate');
  }
};

export default reauthenticate;
