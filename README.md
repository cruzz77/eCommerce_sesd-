<div align="center">

# ShopSphere
### Production-Oriented Full Stack E-Commerce System

---

[![Node.js](https://img.shields.io/badge/Node.js-Backend-green)]()
[![Express](https://img.shields.io/badge/Express.js-Framework-black)]()
[![React](https://img.shields.io/badge/React-Frontend-blue)]()
[![Database](https://img.shields.io/badge/Database-MongoDB%20%7C%20MySQL-orange)]()
[![Architecture](https://img.shields.io/badge/Architecture-Layered%20Design-purple)]()
[![Auth](https://img.shields.io/badge/Auth-JWT-red)]()

---

**Engineered with scalable architecture, backend rigor, and system design principles.**

</div>

---

## System Overview

ShopSphere is a backend-focused, production-inspired e-commerce platform designed with clean architecture and strong separation of concerns.

The project emphasizes:

- Structured backend layering
- Object-Oriented Design
- Real-world system modeling
- Scalable database relationships
- Security-driven API development

Backend weightage: 75%  
Frontend weightage: 25%

---

## Architecture Blueprint

### Backend Layering

```
Client
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Database
```

Each layer has a single responsibility, ensuring maintainability and extensibility.

---

## Engineering Principles Applied

### Object-Oriented Design

- Encapsulation → Business logic isolated in services  
- Abstraction → Repository layer abstracts persistence  
- Inheritance → Role-based user hierarchy  
- Polymorphism → Strategy-based payment processing  

### Design Patterns

- Repository Pattern  
- Service Layer Pattern  
- Singleton (Database connection)  
- Strategy (Payment processing)  
- Factory (Payment instantiation)  

---

## Core Functional Modules

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Protected admin routes
- Password hashing with bcrypt

### Product Management
- Category-based classification
- Stock tracking
- Price & discount handling
- Admin CRUD operations

### Cart System
- Persistent cart per user
- Quantity updates
- Total price calculation

### Order Management
- Order creation from cart
- Order items tracking
- Status transitions (Pending → Paid → Shipped → Delivered)

### Payment Processing
- Strategy-based payment handling
- Transaction recording
- Payment status validation

---

## Data Model Overview

### Primary Entities

- USER
- CATEGORY
- PRODUCT
- CART
- CART_ITEM
- ORDER
- ORDER_ITEM
- PAYMENT

### Relationship Highlights

- One-to-One → User ↔ Cart  
- One-to-Many → User → Orders  
- Many-to-Many → Orders ↔ Products (via OrderItem)  
- One-to-Many → Category → Products  

Detailed ER, Class, Sequence, and Use Case diagrams are included in the repository.

---

## Project Structure

```
src/
│
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
└── app.js
```

This modular organization ensures:

- Low coupling
- High cohesion
- Clear dependency boundaries

---

## Security Architecture

- Encrypted passwords (bcrypt)
- JWT token validation middleware
- Centralized error handling
- Request validation middleware
- Role-based route guards

---

## Data Simulation

A dataset containing 500 product records is included for testing and development:

```
shopsphere_products_500.csv
```

This allows realistic API testing and database seeding.

---

## Scalability Considerations

- Stateless API design
- Layer separation for easy microservice migration
- Clear domain modeling
- Repository abstraction for database swap flexibility
- Ready for containerization (Docker-ready structure)

---

## Potential Extensions

- Product reviews & ratings
- Wishlist module
- Coupon & discount engine
- Recommendation system
- Microservices decomposition
- Cloud deployment (AWS / GCP)
- Payment gateway integration (Stripe / Razorpay)

---

## Why This Project Stands Out

This is not a simple CRUD application.

It demonstrates:

- Backend-dominant architecture
- Real-world domain modeling
- Proper normalization
- Clean code layering
- Applied design patterns
- System design thinking

It reflects production-oriented backend engineering rather than academic-level implementation.

---

## Getting Started

### Install Dependencies

```
npm install
```

### Run Development Server

```
npm run dev
```

### Environment Variables

Create a `.env` file:

```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

<div align="center">

Built with structured engineering discipline.

</div>
