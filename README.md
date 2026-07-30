# 🛒 E-Commerce Website

A modern E-Commerce web application built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

The application allows users to browse products, authenticate, manage their shopping cart, and view price details while following clean architecture principles such as separation of concerns, service layer architecture, and Context API state management.

---

## Features

### Authentication
- Register
- Login
- Logout
- Persistent authentication using Local Storage

### Products
- Product Listing
- Product Details Page

### Shopping Cart
- Add to Cart
- Remove from Cart
- Increase Quantity
- Decrease Quantity
- Clear Cart
- Cart Badge
- Price Details

### User Experience
- Loading States
- Error Handling
- Toast Notifications
- Responsive Design

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Context API
- useReducer
- JSON Server
- FakeStore API
- React Toastify

---

## Folder Structure

```text
src/
├── app/
├── components/
├── context/
├── services/
├── types/
├── validators/
```

---

## Architecture

The application follows a layered architecture.

```
Components
      ↓
Context
      ↓
Services
      ↓
API / JSON Server
      ↓
Context
      ↓
UI
```

### Design Decisions

- Server is the source of truth for cart data.
- Reducers remain pure.
- API logic is separated into service files.
- Components never communicate directly with APIs.
- Derived state is calculated instead of stored.
- Context coordinates business operations.

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/kanishk2566/E-commerce-web.git
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Start JSON Server

```bash
npm run server
```

Open:

```
http://localhost:3000
```

---

## What I Learned

Through this project I gained practical experience with:

- React Context API
- useReducer
- TypeScript
- Service Layer Architecture
- Separation of Concerns
- Single Responsibility Principle
- Derived State
- State Management
- API Integration
- Form Validation
- Component Composition

---

## Future Improvements

- Product Search
- Filters
- Sorting
- Wishlist
- Checkout
- Order History
- Payment Gateway Integration

---

## Author

**Kanishk Patel**

GitHub: https://github.com/kanishk2566