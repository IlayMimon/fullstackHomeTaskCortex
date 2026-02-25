# Interactive Traffic Dashboard

Fullstack web application built with **React** and **Firebase**.  
Features include user authentication, traffic data management with **Firestore**, and interactive visualization in both table and chart formats. Backend logic is handled with **Firebase Cloud Functions**.

---

## Prerequisites

- Node.js >= 18
- npm or yarn
- Firebase CLI (`npm install -g firebase-tools`)
- Git

---

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/IlayMimon/fullstackHomeTaskCortex
cd fullstackHomeTaskCortex
```

## 2. Install Frontend Dependencies

Make sure you are in the root folder of your project, Then run:

```bash
npm install
```

## 3. Install Firebase functions dependencies

```bash
cd functions
npm install
```

## 4. Configure Firebase

Make sure you have a Firebase project and set up the .env

## Running Locally with Firebase Emulator

You will need **two terminals**:

### Frontend (React)

npm run dev

This will start the React app at [http://localhost:5173](http://localhost:5173) (default Vite port).

### Backend (Firebase Functions Emulator)

cd functions  
npm run serve

This will start the Firebase Functions emulator locally (usually at [http://localhost:5001](http://localhost:5001)).

> Now your frontend can call your local Firebase Functions while developing.

---
