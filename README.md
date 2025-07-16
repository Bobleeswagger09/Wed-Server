# 💼 Wedly Backend API

**Wedly** is a backend server built with **Express.js**, powering a minimal **Wedding Coordinator Marketplace** application. It exposes endpoints for retrieving wedding coordinators and submitting bookings.

---

## 🌐 Live API (Render Deployed)

**Base URL:** `https://wedly-backend.onrender.com/api`

> Replace the link above with your actual deployed API URL.

---

## 📦 Tech Stack

- **Backend Framework:** Node.js + Express.js
- **Data Source:** Static JSON (`file.json`) and generated JSON (`bookings.json`)
- **Middleware:** CORS, Body-Parser
- **Storage Strategy:** In-memory + file-based persistence
- **Deployment:** Render.com

---

## 🔌 API Endpoints

### 👥 Coordinators

- `GET /api/coordinators`  
  Returns a list of all available coordinators.

- `GET /api/coordinators/:id`  
  Returns details of a specific coordinator by `id`.

---

### 📅 Bookings

- `GET /api/bookings`  
  Fetch all booking records (ordered by newest first).

- `POST /api/bookings`  
  Create a new booking request.  
  **Required Fields in `req.body`:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "date": "2025-08-20",
    "guests": "120",
    "coordinatorId": "1"
  }
