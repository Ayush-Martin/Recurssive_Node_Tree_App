# Full Stack Recursive Node Tree

A professional full-stack implementation of a recursive node tree application. This project demonstrates recursive data handling, persistent state management, and modern frontend optimization.

## 🚀 Live Demo
- **Frontend (Vercel):** https://recurssive-node-tree-app.vercel.app

## 🛠️ Tech Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Vite
- **Backend:** Node.js, Express, TypeScript, InversifyJS (DI)
- **Database:** MongoDB (Mongoose)

## ✨ Implemented Features

### 1. Node Creation (Recursive Structure)
- Support for multiple **Root Nodes**.
- **Infinite Nesting**: Nodes can have children, which in turn can have further children indefinitely.
- Persistent storage of the hierarchical structure in MongoDB.

### 2. Recursive UI
- **Recursive Display**: The UI uses a recursive component pattern to render the tree.
- **Interactive State**: Each node is collapsed by default. Clicking the toggle button expands/collapses that specific branch.
- **Visual Feedback**: Spinning icons during expansion to indicate data fetching from the backend.

### 3. Management & Optimization
- **Delete Functionality**: Deleting a node recursively removes all its nested descendants from the database.
- **Skeleton Loaders**: Polished loading states for a smooth perceived performance.
- **Error Handling**: Standardized API responses with global toast notifications for feedback.
- **Memoization**: Uses `React.memo` for optimized tree rendering, ensuring high performance even with large datasets.

## 📦 Local Setup

### Server
1. `cd server`
2. `npm install`
3. Configure `.env` with `MONGO_URI`.
4. `npm run dev`

### Client
1. `cd client`
2. `npm install`
3. Configure `.env` with `VITE_SERVER_BASE_URL`.
4. `npm run dev`

## 🌐 Deployment Info

- **Frontend:** Hosted on **Vercel** as a Static Site (Vite build).
- **Backend:** Hosted on **Render** as a Node.js Web Service.
- **Database:** Hosted on **MongoDB Atlas**.
