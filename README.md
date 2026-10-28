# FakeDataAPI

[FakeDataAPI](http://localhost:3000) is a free online REST API that you can use whenever you need pseudo-real dummy data for your e-commerce, social, or productivity application without running any backend or database from scratch.  
It's awesome for teaching purposes, tutorials, sample codes, mobile app testing, prototyping, and UI/UX design.

You can visit the in-detail interactive docs and API Studio at [FakeDataAPI Studio](http://localhost:3000).

---

## Why?

When developing frontend applications or prototyping new concepts, developers frequently waste hours writing mock backend servers, configuring databases, or using boring `lorem ipsum` placeholders.  
Existing mock APIs are often stateless (any POST or PUT is instantly lost on the next refresh) or limited to very few items.

**FakeDataAPI** solves this by providing:
- **11 Realistic Datasets:** Products, Categories, Users, Carts, Orders, Reviews, Posts, Comments, Todos, Notifications, and Auth.
- **Two Operating Modes:**
  - **Stateless Mock Mode:** Instant response with simulated IDs (zero configuration).
  - **Persistent Sandbox Mode (`X-Session-ID`):** Real MongoDB-backed isolated testing where your POST, PUT, and DELETE operations persist for 24 hours!
- **Zero-Config Database:** Automatically spins up an embedded in-memory MongoDB with all 500+ records seeded if no external database is connected.

---

## Resources

Main resources provided out of the box:

- **Products** — `/api/v1/products` (500 products with stock, dimensions, SKU, ratings, categories)
- **Categories** — `/api/v1/categories` (30 taxonomy categories with product counts)
- **Carts** — `/api/v1/carts` (150 multi-item shopping carts with discount calculations)
- **Orders** — `/api/v1/orders` (1,000 fulfillment orders with tracking numbers)
- **Users** — `/api/v1/users` (200 user profiles with addresses, coordinates, avatars)
- **Login Token** — `/api/v1/auth/login` (Signed JWT token + 5-attempt brute-force protection)
- **User Profile** — `/api/v1/auth/me` (Protected route requiring `Bearer <token>`)
- **Reviews** — `/api/v1/reviews` (2,000 customer reviews with star ratings 1-5)
- **Posts** — `/api/v1/posts` (200 developer blog posts with tags and reaction counters)
- **Comments** — `/api/v1/comments` (500 discussion comments mapped to posts)
- **Todos** — `/api/v1/todos` (200 productivity tasks with completion status)
- **Notifications** — `/api/v1/notifications` (300 system alerts and dispatch notices)
- **Sandbox Sessions** — `/api/v1/sessions` (Ephemeral 24-hour persistent mutation sessions)
- **Chaos Simulator** — `/api/v1/http/:statusCode` (Simulate 400, 401, 404, 429, 500, etc.)

---

## How To

You can fetch data using any HTTP method you know (`fetch`, `axios`, jQuery AJAX, curl, etc.).

### Get all products

```js
fetch('http://localhost:4000/api/v1/products')
  .then(res => res.json())
  .then(json => console.log(json));

/* will return
{
  "data": [
    {
      "id": 1,
      "title": "Quantum ANC Wireless Headphone",
      "price": 149.99,
      "description": "Experience exceptional audio...",
      "category": "audio",
      "brand": "SoundPulse",
      "rating": 4.8,
      "stock": 45,
      "thumbnail": "https://..."
    },
    ...
  ],
  "total": 500,
  "limit": 20,
  "skip": 0,
  "hasMore": true
}
*/
```

---

### Get a single product

```js
fetch('http://localhost:4000/api/v1/products/1')
  .then(res => res.json())
  .then(json => console.log(json));

/* will return
{
  "id": 1,
  "title": "Quantum ANC Wireless Headphone",
  "price": 149.99,
  "description": "Experience exceptional audio...",
  "category": "audio",
  "brand": "SoundPulse",
  "rating": 4.8,
  "stock": 45,
  "thumbnail": "https://..."
}
*/
```

---

### Search products

```js
fetch('http://localhost:4000/api/v1/products/search?q=phone')
  .then(res => res.json())
  .then(json => console.log(json));
```

---

### Limit, Pagination & Sorting

You can use query strings to paginate results or sort by any property `asc` | `desc`:

```js
// Get 5 products sorted by price descending
fetch('http://localhost:4000/api/v1/products?limit=5&skip=0&sortBy=price&order=desc')
  .then(res => res.json())
  .then(json => console.log(json));
```

---

### Filter by category

```js
// Get all categories
fetch('http://localhost:4000/api/v1/categories')
  .then(res => res.json())
  .then(json => console.log(json));

// Get products in a specific category
fetch('http://localhost:4000/api/v1/products/category/audio')
  .then(res => res.json())
  .then(json => console.log(json));
```

---

### Add new product

```js
fetch('http://localhost:4000/api/v1/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Test Ergonomic Mouse',
    price: 39.99,
    description: 'High precision optical sensor with silent click.',
    category: 'electronics',
    brand: 'LogiTech'
  })
})
  .then(res => res.json())
  .then(json => console.log(json));

/* will return (Stateless Mode):
{
  "data": {
    "id": 501,
    "title": "Test Ergonomic Mouse",
    "price": 39.99,
    "category": "electronics",
    "brand": "LogiTech"
  },
  "message": "Simulated successfully. Use X-Session-ID header for real persistence.",
  "persisted": false
}
*/
```

---

### Updating a product

```js
// Full update
fetch('http://localhost:4000/api/v1/products/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Updated Headphone Title',
    price: 129.99
  })
})
  .then(res => res.json())
  .then(json => console.log(json));

// Partial update
fetch('http://localhost:4000/api/v1/products/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    price: 119.99
  })
})
  .then(res => res.json())
  .then(json => console.log(json));
```

---

### Deleting a product

```js
fetch('http://localhost:4000/api/v1/products/1', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(json => console.log(json));

/* will return
{
  "message": "Product 1 deleted successfully.",
  "id": 1,
  "persisted": false
}
*/
```

---

### User Authentication & Login (JWT)

Test your login forms, protected routes, and token storage with real JWT signing:

```js
// 1. Login to receive JWT token
fetch('http://localhost:4000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'caseyanderson42', // Or 'kminchelle'
    password: 'password123'
  })
})
  .then(res => res.json())
  .then(data => {
    console.log('JWT Token:', data.token);

    // 2. Fetch authenticated user profile using Bearer token
    return fetch('http://localhost:4000/api/v1/auth/me', {
      headers: {
        'Authorization': `Bearer ${data.token}`
      }
    });
  })
  .then(res => res.json())
  .then(profile => console.log('Current User Profile:', profile));
```

> 🛡️ **Account Lockout Security:** If 5 consecutive failed passwords are submitted, the account/IP is locked for 15 minutes (`HTTP 429 Too Many Requests`).

---

### Persistent Sandbox Mode (`X-Session-ID`)

Unlike standard fake APIs that discard mutations, FakeDataAPI lets your create, update, and delete calls persist in your own isolated sandbox:

```js
// 1. Create a 24-hour sandbox session
const sessionRes = await fetch('http://localhost:4000/api/v1/sessions', { method: 'POST' });
const { sessionId } = await sessionRes.json();
console.log('Your Sandbox Session:', sessionId); // e.g. "sbx_a1b2c3d4..."

// 2. Send X-Session-ID header on mutations to persist!
await fetch('http://localhost:4000/api/v1/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Session-ID': sessionId
  },
  body: JSON.stringify({ title: 'My Persistent Product', price: 99.99 })
});

// 3. GET /products with that session header returns your newly created product!
const myProducts = await fetch('http://localhost:4000/api/v1/products?limit=1', {
  headers: { 'X-Session-ID': sessionId }
}).then(r => r.json());
console.log(myProducts.data[0]); // Contains "My Persistent Product"
```

---

### Chaos Testing (Simulate Delays & Failures)

```js
// Add 2000ms delay to test loading skeletons
fetch('http://localhost:4000/api/v1/products?delay=2000');

// Inject 20% random HTTP 500 server errors
fetch('http://localhost:4000/api/v1/products?failRate=0.2');

// Direct HTTP status simulator
fetch('http://localhost:4000/api/v1/http/404'); // Returns 404
fetch('http://localhost:4000/api/v1/http/500'); // Returns 500
```

---

## All Available Routes

### Products

```js
fields:
{
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  brand: String,
  sku: String,
  stock: Number,
  rating: Number,
  thumbnail: String,
  images: [String]
}
```

- `GET /api/v1/products` (get all products)
- `GET /api/v1/products/1` (get product by id)
- `GET /api/v1/products/search?q=phone` (search products)
- `GET /api/v1/products?limit=10&skip=20` (pagination)
- `GET /api/v1/products?sortBy=price&order=desc` (sort by field)
- `GET /api/v1/products?select=id,title,price` (field projection)
- `GET /api/v1/products/categories` (get all category names)
- `GET /api/v1/products/category/audio` (products by category)
- `GET /api/v1/products/1/reviews` (reviews for specific product)
- `POST /api/v1/products` (add product)
- `PUT /api/v1/products/1` (full update)
- `PATCH /api/v1/products/1` (partial update)
- `DELETE /api/v1/products/1` (delete product)

---

### Categories

```js
fields:
{
  id: Number,
  name: String,
  slug: String,
  productCount: Number
}
```

- `GET /api/v1/categories` (get all 30 categories)
- `GET /api/v1/categories/1` (get category by id)
- `POST /api/v1/categories` (create category)

---

### Users

```js
fields:
{
  id: Number,
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  email: String,
  phone: String,
  username: String,
  birthDate: String,
  avatar: String,
  address: {
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  company: {
    name: String,
    title: String,
    department: String
  },
  role: String
}
```

- `GET /api/v1/users` (get all users)
- `GET /api/v1/users/1` (get user by id)
- `GET /api/v1/users/search?q=alex` (search users)
- `POST /api/v1/users` (create user)

---

### Carts & Orders

```js
fields:
{
  id: Number,
  userId: Number,
  date: String,
  products: [
    { productId: Number, quantity: Number, price: Number, total: Number }
  ],
  totalQuantity: Number,
  totalPrice: Number,
  discountedTotal: Number
}
```

- `GET /api/v1/carts` (get all carts)
- `GET /api/v1/carts/1` (get cart by id)
- `GET /api/v1/carts/user/1` (get cart for user)
- `POST /api/v1/carts` (create/populate cart)
- `GET /api/v1/orders` (get all fulfillment orders)
- `GET /api/v1/orders/1` (get order details)
- `GET /api/v1/orders/user/1` (orders for user)
- `POST /api/v1/orders` (place order)

---

### Social, Blog & Productivity

- `GET /api/v1/reviews` (get customer product reviews)
- `GET /api/v1/posts` (get blog posts with tags & reactions)
- `GET /api/v1/posts/1` (get single blog post)
- `GET /api/v1/posts/1/comments` (get comments for post)
- `GET /api/v1/comments` (get all comments)
- `GET /api/v1/todos` (get todos)
- `GET /api/v1/todos/user/1` (get todos for user)
- `GET /api/v1/notifications` (get user notifications)

---

### Auth & JWT

```js
fields:
{
  username: String,
  password: String
}
```

- `POST /api/v1/auth/login` (obtain JWT token)
- `GET /api/v1/auth/me` (requires `Authorization: Bearer <token>`)
- `POST /api/v1/auth/refresh` (refresh token)

---

### Sandbox Sessions

- `POST /api/v1/sessions` (create new 24h sandbox)
- `GET /api/v1/sessions/current` (inspect current session)
- `POST /api/v1/sessions/current/reset` (reset sandbox to baseline data)
- `DELETE /api/v1/sessions/current` (terminate session)

---

## ⚡ Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run dev servers (Express on :4000, React Vite on :3000)
npm run dev
```

Run test suite:
```bash
npm test
```

Build production bundle:
```bash
npm run build
```

---

## 📄 License

MIT License. Free and open source for developers.
