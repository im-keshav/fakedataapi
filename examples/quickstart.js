/**
 * FakeDataAPI — Quickstart Example (JavaScript Fetch)
 * 
 * Run: node quickstart.js
 */

const BASE_URL = 'http://localhost:4000/api/v1'; // Replace with your live API URL in production

async function main() {
  console.log('--- 1. Fetch 5 Products ---');
  const productsRes = await fetch(`${BASE_URL}/products?limit=5&sortBy=price&order=desc`);
  const products = await productsRes.json();
  console.log(`Fetched ${products.data.length} products (Total: ${products.total}):`);
  products.data.forEach(p => console.log(`- [#${p.id}] ${p.title} - $${p.price}`));

  console.log('\n--- 2. Search Products ("phone") ---');
  const searchRes = await fetch(`${BASE_URL}/products/search?q=phone`);
  const searchResults = await searchRes.json();
  console.log(`Found ${searchResults.data.length} items matching "phone".`);

  console.log('\n--- 3. Fetch Product Categories ---');
  const catRes = await fetch(`${BASE_URL}/categories`);
  const categories = await catRes.json();
  console.log(`Available categories (${categories.total}):`, categories.data.slice(0, 5).map(c => c.name));
}

main().catch(console.error);
