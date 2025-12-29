# 🎨 Sticker Verse — Comic-Style E-Commerce Website

Sticker Verse is a **comic-inspired, interactive e-commerce website** built to showcase premium superhero stickers.  
The project focuses on **UI/UX excellence, smooth animations, and real shopping-flow behavior**, simulating a modern shopping platform like Amazon — **entirely on the frontend**.

---

## 🚀 Project Overview

Sticker Verse delivers a **single-page shopping experience** where users can:

- Browse superhero sticker collections
- Filter products by company and heroes
- View detailed product pages
- Add items to cart with comic-style animations
- Apply discount coupons
- Checkout and view order history
- Customize their profile as a superhero fan

All functionality is handled on the **client side** using JavaScript and browser storage.

---

## 🧩 Features Breakdown

### 🏠 Home Page
- Comic-style hero section
- Trending products showcase
- Deal of the Day banner with countdown UI
- Community reviews section
- Brand highlights (durability, shipping, exclusivity)

---

### 🛍 Shop Page
- Dynamic product grid
- Category filters (Marvel / DC)
- Hero-based filtering (Batman, Iron Man, Spider-Man, etc.)
- Search with live filtering
- Hover effects and micro-interactions
- Active filter chips for clarity

---

### 📦 Product Detail Page (PDP)
- Large animated product display
- Price, rating, and description
- Add-to-cart with comic “POW” animation
- Review preview section
- Feature highlights (waterproof, scratch-proof, premium vinyl)

---

### 🛒 Cart System
- Add / remove products
- Quantity increment & decrement
- Subtotal, shipping, and total calculation
- Coupon support (`HERO20`, `POW50`)
- Sticky order summary panel
- Empty-cart state UI

---

### 💳 Checkout Page
- Shipping address form UI
- Payment method UI simulation
- Animated order processing feedback
- Order placement confirmation

---

### 👤 Profile Page
- User dashboard layout
- Order history timeline
- Profile statistics
- “Fan of” superhero section
- Profile completion indicator
- Mission-style navigation (comic theme)

---

## 🎬 Comic-Style Animations

Sticker Verse uses **CSS-only animations** to deliver a Framer Motion–like experience:

- Add-to-cart fly animation
- Cart icon wiggle
- Page slide transitions
- Button smash / press effects
- Floating hero visuals
- Comic SVG effects like **POW / BAM / ZAP**
- Skeleton loaders and staggered reveals

No animation libraries are used.

---

## 🧠 How It Works (Logic & Flow)

### 🔁 Routing System
- Custom JavaScript router
- Pages are shown/hidden with smooth transitions
- No page reloads (SPA-like behavior)

Flow:
Home → Shop → Product → Cart → Checkout → Profile


---

### 📦 Product Rendering Algorithm
- Products stored in a central JavaScript array
- UI cards generated dynamically using `.map()`
- Filters applied using category, hero, and search conditions

---

### 🛒 Cart Algorithm
- Cart state stored in `localStorage`
- Quantity changes auto-recalculate totals
- Coupons apply percentage-based discounts
- Cart badge updates in real time

---

### 📜 Order Simulation
- Checkout generates a mock order object
- Orders saved in `localStorage`
- Order history rendered in profile page

---

### 🧠 State Management
A single `state` object manages:
- Cart items
- Orders
- Coupons
- Active filters

This structure mimics real-world frontend state handling.

---

## 🗂 Project Structure

index.html
│
├── Tailwind CSS (CDN)
├── Lucide Icons
├── Inline CSS animations
└── Inline JavaScript
├── Routing
├── Product mapping
├── Cart handling
├── UI interactions
└── Animation logic


---

## 🛠 Tech Stack

- HTML5  
- Tailwind CSS  
- Vanilla JavaScript  
- Lucide Icons  
- CSS Animations  
- LocalStorage API  

No backend, database, or authentication is used.

---

## ▶️ How to Run the Project

This project is **frontend-only** and does not require any build tools.

### Option 1: Run Locally
1. Clone the repository:

   git clone https://github.com/your-username/sticker-verse.git
   
Open the project folder:


cd sticker-verse
