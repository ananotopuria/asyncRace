# Async Race 🏎️💨

**Deployed:** https://merry-strudel-fccec5.netlify.app/


**Backend API:** https://github.com/mikhama/async-race-api

**Score:** 390 / 400

## Description

Async Race is a Single Page Application (SPA) built with **React v18+**, **TypeScript**, and **Redux Toolkit** that lets users manage a collection of radio-controlled cars, operate their engines, and host drag-racing competitions entirely in the browser.  
Users can:

- Create, edit, and delete cars with custom names and colors
- Start and stop individual car engines, with animated transitions
- Generate 100 random cars at the click of a button
- Launch a full-page race where all cars accelerate across the track in parallel, and see who wins
- Persist race results to a simulated backend and explore past winners in a sortable, paginated table

## Technologies Used 🚀

- **React v18+** (SPA architecture)
- **TypeScript** (strict mode, noImplicitAny)
- **Redux Toolkit** (state management)
- **React Router** (view navigation)
- **Framer Motion** (animations)
- **Tailwind CSS** (utility-first styling)
- **ESLint** (Airbnb style guide)
- **Prettier** (code formatting)
- **Vite** (build tooling)
- **JSON-Server** (mock backend for cars & winners)
- **Netlify / Vercel / GitHub Pages** (deployment)

## Checklist

### 🚀 UI Deployment

- [x] Deployed to a hosting platform ( Netlify ) and link provided above

### ✅ Requirements to Commits and Repository

- [x] Commit guidelines complied with (Conventional Commits format)
- [x] Checklist included in README.md
- [x] Score calculation included in README.md
- [x] UI deployment link included in README.md

### Basic Structure (80 points)

- [x] Two Views: "Garage" and "Winners" (10/10)
- [x] Garage View Content: name, car creation/editing, race controls, garage section (30/30)
- [x] Winners View Content: name, winners table, pagination (10/10)
- [x] Persistent state across view switches (30/30)

### Garage View (90 points)

- [x] Car creation & editing with validation (20/20)
- [x] Color picker displays selected color on car (10/10)
- [x] Random car generation (100 cars) (20/20)
- [x] Update & delete buttons for each car (10/10)
- [x] Pagination (7 cars per page) (10/10)
- [x] Extra: empty garage handled (message shown) (20/20)

### 🏆 Winners View (50 points)

- [x] Display winners after each race (15/15)
- [x] Pagination for winners (10 per page) (10/10)
- [x] Table: №, image, name, wins, best time (15/15)
- [x] Sorting by wins and time (ascending/descending) (10/10)

### 🚗 Race (170 points)

- [x] Start engine animation with velocity/distance (20/20)
- [x] Stop engine animation and reset position (20/20)
- [x] Responsive animations (works down to 500px) (30/30)
- [x] Start race button for all cars on page (10/10)
- [x] Reset race button to initial positions (15/15)
- [x] Winner announcement modal (5/5)
- [x] Button states disabled/enabled appropriately (20/20)
- [x] Actions blocked during race for consistency (50/50)

### 🎨 Prettier and ESLint Configuration (10 points)

- [ ] Prettier setup with `format` and `ci:format` scripts (0/5)
- [ ] ESLint configured with Airbnb style guide (0/5)

_Total: 390 / 400_

<img width="1447" alt="Screenshot 2025-05-02 at 00 18 13" src="https://github.com/user-attachments/assets/961425b0-eeb4-41d3-ae70-aa5afa993aba" />
<img width="1443" alt="Screenshot 2025-05-02 at 00 18 44" src="https://github.com/user-attachments/assets/088cd133-182d-4509-a8be-2d711dff9b9b" />
