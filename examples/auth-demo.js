/**
 * FakeDataAPI — Authentication & Protected Profile Example
 * 
 * Run: node auth-demo.js
 */

const BASE_URL = 'http://localhost:4000/api/v1';

async function authFlow() {
  console.log('--- 1. Login with demo credentials ---');
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'caseyanderson42', // Or 'kminchelle'
      password: 'password123'
    })
  });

  const authData = await loginRes.json();
  if (!loginRes.ok) {
    console.error('Login failed:', authData.error);
    return;
  }

  console.log('✅ Logged in successfully!');
  console.log(`User: ${authData.firstName} ${authData.lastName} (${authData.email})`);
  console.log(`Role: ${authData.role}`);
  console.log(`JWT Token: ${authData.token.slice(0, 30)}...`);

  console.log('\n--- 2. Fetching Protected Profile with Bearer Token ---');
  const profileRes = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${authData.token}`
    }
  });

  const profile = await profileRes.json();
  console.log('✅ Protected Profile Loaded:', {
    id: profile.id,
    name: `${profile.firstName} ${profile.lastName}`,
    company: profile.company?.name,
    city: profile.address?.city
  });
}

authFlow().catch(console.error);
