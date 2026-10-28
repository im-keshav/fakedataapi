#!/usr/bin/env bash
# FakeDataAPI — cURL Cheatsheet
BASE_URL="http://localhost:4000/api/v1"

echo "=== 1. Get 3 Products ==="
curl -s "$BASE_URL/products?limit=3" | jq .

echo "=== 2. Search ==="
curl -s "$BASE_URL/products/search?q=phone" | jq .

echo "=== 3. Categories ==="
curl -s "$BASE_URL/categories?limit=5" | jq .

echo "=== 4. Login ==="
curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"caseyanderson42","password":"password123"}' | jq .
