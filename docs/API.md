# 📡 API Documentation

## Base URL

```
Development: http://localhost:3001/api
Production: https://api.globalmove.com.br/api
```

## Autenticação

A API usa JWT (JSON Web Tokens) para autenticação.

### Headers

```
Authorization: Bearer <token>
```

## Endpoints

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-08-13T00:30:00.000Z",
  "services": {
    "supabase": "connected"
  }
}
```

---

### Auth

#### Register

```http
POST /api/auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token"
  }
}
```

#### Login

```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token"
  }
}
```

---

### Countries

#### Get All Countries

```http
GET /api/countries
```

**Query Parameters:**
- `continent` (optional): Filter by continent
- `region` (optional): Filter by region
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Offset for pagination (default: 0)

**Response:**
```json
{
  "status": "success",
  "data": {
    "countries": [
      {
        "id": "uuid",
        "name": "Polônia",
        "isoCode": "PL",
        "flag": "🇵🇱",
        "continent": "Europe",
        "currency": "PLN"
      }
    ],
    "pagination": {
      "total": 190,
      "limit": 50,
      "offset": 0,
      "pages": 4
    }
  }
}
```

#### Get Country by ID

```http
GET /api/countries/:id
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "country": {
      "id": "uuid",
      "name": "Polônia",
      "officialName": "Republic of Poland",
      "isoCode": "PL",
      "iso3": "POL",
      "flag": "🇵🇱",
      "continent": "Europe",
      "region": "Eastern Europe",
      "currency": "PLN",
      "language": "Polish",
      "population": 38000000,
      "capital": "Warsaw",
      "timezone": "Europe/Warsaw",
      "cities": [...],
      "visaRoutes": [...],
      "costOfLiving": [...]
    }
  }
}
```

---

### Financial

#### Calculate Viability

```http
POST /api/financial/viability
```

**Body:**
```json
{
  "financial": {
    "currentCapital": 50000,
    "monthlyIncome": 8000,
    "monthlySavings": 2500,
    "currency": "BRL"
  },
  "timeline": {
    "months": 24,
    "scenario": "realistic"
  },
  "costs": {
    "installationCost": 15000,
    "monthlyCost": 3000,
    "flightCost": 5000,
    "visaCost": 2000
  }
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "requiredCapital": 70000,
    "projectedCapital": 110000,
    "deficit": 0,
    "surplus": 40000,
    "status": "viable",
    "monthsToGoal": 0,
    "percentageAchieved": 157.14
  }
}
```

---

### Visas

#### Get Visas by Country

```http
GET /api/visas/country/:countryId
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "visas": [
      {
        "id": "uuid",
        "name": "Poland Work Visa",
        "category": "work",
        "description": "Visto de trabalho para profissionais qualificados",
        "minIncome": 4000,
        "fee": 440,
        "feeCurrency": "PLN",
        "processingTime": "2-3 meses",
        "renewable": true,
        "allowsPermanentResidence": true
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "status": "error",
  "message": "No token provided"
}
```

### 404 Not Found

```json
{
  "status": "error",
  "message": "Country not found"
}
```

### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## Rate Limiting

- **Window**: 15 minutos
- **Max Requests**: 100 por IP

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1692000000
```

---

**GlobalMove API** — Documentação completa.