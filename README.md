# Looksy – Fast Fashion Web Application

A fast-fashion web application designed for small to medium-scale sellers using a **made-to-order** model.  
Built using **React.js** (frontend), **Spring Boot (Java)** (backend), and **MongoDB** (database).

---

## 🚀 Project Overview
- **Frontend:** React.js — interactive UI and client-side logic
- **Backend:** Spring Boot — RESTful APIs for products, orders, and users
- **Database:** MongoDB — NoSQL database for flexible data storage
- **Architecture:** Full-stack web application with separated frontend & backend modules

---

## ✨ Features
- 📦 **Product Management** — Add, edit, delete, and view products
- 🛒 **Order Management** — Place, track, and manage orders
- 👤 **User Management** — Seller & customer accounts
- 🔍 **Search & Filter** — Easily browse fashion catalog
- 🔐 **Authentication** — Secure login/registration (JWT/session)
- ⚡ **Made-to-order model** — Efficient small-seller inventory handling

---

## 🛠️ Tech Stack
- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Java 11+, Spring Boot
- **Database:** MongoDB / MongoDB Atlas
- **Build Tools:** Maven/Gradle, npm/yarn
- **Version Control:** Git & GitHub

---
## 📂 Project Structure

Looksy-Fast-Fashion-Web-Application-main/
├── Looksy_Backend-main/ # Spring Boot backend
│ ├── src/main/java/... # Java source code
│ ├── src/main/resources/... # Config files (application.properties/yml)
│ └── pom.xml or build.gradle # Build file
│
└── Looksy_Frontend-main/ # React.js frontend
├── src/ # React components, hooks, etc.
├── public/ # Static assets
└── package.json # Node.js dependencies

---

## ⚙️ Getting Started

### ✅ Prerequisites
- Install **Java JDK 11+**
- Install **Maven** (or Gradle)
- Install **Node.js & npm/yarn**
- Setup **MongoDB** (local or cloud with MongoDB Atlas)

---

### 🔹 Backend Setup (Spring Boot)
```bash
cd Looksy_Backend-main
# Update MongoDB connection in application.properties
./mvnw spring-boot:run
# or if using Gradle:
./gradlew bootRun

API will run at: http://localhost:8080

🔹 Frontend Setup (React.js)
cd Looksy_Frontend-main
npm install
npm start

App will run at: http://localhost:3000

🔑 Environment Variables

Create a .env file in both frontend and backend if required.

Backend:

MONGODB_URI → MongoDB connection string

JWT_SECRET → Secret key for authentication (if JWT used)

Frontend:

REACT_APP_API_URL=http://localhost:8080

📜 License

This project is licensed under the MIT License.
Feel free to use and modify it for learning or commercial purposes.

👨‍💻 Authors

Vaibhav Raj
PG-DAC | Full-Stack Developer
Skills: Java, Spring Boot, React.js, MongoDB, MySQL, Python, C++

