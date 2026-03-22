# 🍔 Food Store Project

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![NestJS](https://img.shields.io/badge/NestJS-microservices-red)
![React](https://img.shields.io/badge/React-frontend-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v13+-lightblue)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-message--broker-orange)

A full-stack Food Store application built with **NestJS microservices** (backend) and **React + TailwindCSS** (frontend).  
The backend uses **PostgreSQL** for persistence, **RabbitMQ/AMQP** for microservices communication, **JWT** for authentication, and **Nodemailer** for email sending.

---

## 🏗️ Architecture Overview

**Frontend (React + TailwindCSS)**  
&nbsp;&nbsp;↓ (API calls)  
**API Gateway (NestJS)**  
&nbsp;&nbsp;↓ (Microservices via RabbitMQ)  
- **auth** → User authentication  
- **user** → User management  
- **food** → Food catalog CRUD  
- **contact-us** → Contact form  
- **gmail** → Email service  

**Database:** PostgreSQL (`food-store`)  
**Message Broker:** RabbitMQ/AMQP  
**Auth:** JWT + bcrypt  
**Email:** SMTP (Gmail)

---

## 📋 Prerequisites

- Node.js (v18+)  
- PostgreSQL (v13+)  
- RabbitMQ (for microservices communication)  
- Redis (optional, for caching)  
- npm or yarn  

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Environment Setup
Database
```bash
createdb food-store
```
Or via psql:
CREATE DATABASE food-store;

# Backend Configuration
Update config.ts in each microservice (backend/apps/*/src/config.ts):
```ts
export const DB_PASSWORD = 'your_postgres_password';
export const JWT_SECRET = 'your-super-secret-jwt-key-min-32-chars';
```

Gmail Service (backend/apps/gmail/src/config.ts)
```ts
export const SMTP_USER = 'your-gmail@gmail.com';
export const SMTP_PASS = 'your-app-password';  // Use Gmail App Password
```

# Frontend
No special config needed. Update API base URL if required (defaults to localhost:3000 via proxy).

### 3. Start Services
Open multiple terminals in backend/:

```bash
npm run start:user        # User service
npm run start:auth        # Auth service
npm run start:food        # Food service
npm run start:contact-us  # Contact service
npm run start:gmail       # Gmail service
npm run start:api-gateway # API Gateway
```
Default Ports:

Service	Port
API Gateway	8080
User/Auth/etc	via RabbitMQ
Frontend	3000
# Frontend:
```bash
cd frontend
npm start
```
Opens at http://localhost:3000

# Add Food Data to the Database
Uncomment the commented part in insertFood method and populate the data by calling api using postman only once.
POST request URL: http://localhost:8080/api/food
with this body:
```bash
{
    "name": "Pineapple Banana Smoothie",
    "description": "In a blender, combine pineapple chunks, milk, Greek yogurt, banana, and honey. Blend until smooth and creamy. Add ice cubes and blend again until the smoothie is chilled. Pour into a glass and enjoy the tropical goodness of this Pineapple Banana Smoothie!",
    "category": "Beverages",
    "image": "https://cdn.dummyjson.com/recipe-images/50.webp"
    ,"price": 70.20
}```

### 4. Verify Setup
Backend Health: http://localhost:8080
Frontend: http://localhost:3000
Database: Check food-store DB has tables (user, food, contact_us)

🛠️ Development Scripts
Backend (from backend/):

```bash
npm run start:dev   # Development with watch
npm run build       # Production build
npm run lint        # Lint code
npm run test        # Run tests
npm run test:cov    # Tests with coverage
```
Frontend (from frontend/):

```bash
npm start           # Dev server
npm run build       # Production build
npm test            # Run tests
📁 Project Structure
Code
Food Store/
├── backend/                 # NestJS Monorepo
│   ├── apps/
│   │   ├── api-gateway/    # Main entrypoint
│   │   ├── auth/
│   │   ├── user/
│   │   ├── food/
│   │   ├── contact-us/
│   │   └── gmail/
│   └── package.json
├── frontend/                # React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
│   └── package.json
└── README.md
```
# 🔧 Required Services
Service	Purpose	Default Port
PostgreSQL	Database	5432
RabbitMQ	Message Queue	5672
Docker Compose (Recommended):

```bash
docker run -d -p 5432:5432 -e POSTGRES_DB=food-store -e POSTGRES_PASSWORD=postgres postgres:16
docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

# 🌐 API Endpoints
Base URL: http://localhost:8080/api/

Endpoint	Method	Description
/user	POST	Create user
/auth/login	POST	User login
/food	GET/POST	Food CRUD
