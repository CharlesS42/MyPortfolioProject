# 📁 My Digital Portfolio

This is a full-stack digital portfolio project that showcases my skills, experience, and projects. The backend is built using **Java (Spring Boot)**, the frontend is built with **TypeScript (React.js)**, and the database is **MongoDB**.

---

## 📜 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contact](#-contact)

---

## ✨ Features

- Responsive and dynamic portfolio showcasing projects, skills, and contact details.
- Backend API to manage portfolio content (projects, skills, etc.).
- MongoDB database integration for storing portfolio data.
- Authentication and authorization (future enhancement).
- Deployment-ready with Docker and CI/CD pipeline.

---

## 🛠 Tech Stack

**Frontend:**
- React.js (TypeScript)
- React Router
- Axios (for API calls)
- Styled-components/Tailwind CSS (for styling)

**Backend:**
- Java (Spring Boot)
- Spring WebFlux (Reactive Programming)
- Spring Data MongoDB
- Lombok

**Database:**
- MongoDB (Local/Atlas)

**Tools & Deployment:**
- GitHub (Version Control)
- Docker (Containerization)
- GitHub Actions (CI/CD)
- Postman (API Testing)

---

## ⚙️ Installation

### Prerequisites

- Install **Java 17+**, **Node.js (LTS version)**, and **MongoDB**
- Install package managers: `npm` or `yarn`
- Install a Java IDE (IntelliJ/Eclipse) and a code editor (VS Code)

### Steps to Run Locally

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/my-digital-portfolio.git
   cd my-digital-portfolio
   ```

2. **Backend Setup (Spring Boot)**  
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies and run the server:
     ```bash
     mvn clean install
     mvn spring-boot:run
     ```
   - The backend will run on `http://localhost:8080`

3. **Frontend Setup (React + TypeScript)**  
   - Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install dependencies and start the frontend:
     ```bash
     npm install
     npm start
     ```
   - The frontend will run on `http://localhost:3000`

4. **Database Setup (MongoDB)**  
   - Ensure MongoDB is running locally on `mongodb://localhost:27017/portfolio`
   - Optionally, configure MongoDB Atlas and update the connection string in `application.yml`

---

## 🚀 Usage

1. Open the frontend at `http://localhost:3000` to view the portfolio.
2. Use Postman to test API endpoints at `http://localhost:8080/api/v1`.
3. Modify content through the backend services and see the changes in real-time.

---

## 📡 API Endpoints

| Method | Endpoint           | Description               |
|--------|-------------------|---------------------------|
| GET    | `/api/v1/projects`  | Fetch all projects        |
| POST   | `/api/v1/projects`  | Add a new project         |
| PUT    | `/api/v1/projects/{id}` | Update a project     |
| DELETE | `/api/v1/projects/{id}` | Delete a project     |

---

## 🖼 Screenshots

🛠️ In development...

---

## 🐳 Docker Setup

1. Build and run using Docker Compose:  
   ```bash
   docker-compose up --build
   ```
2. Access the application at `http://localhost:3000`.

---

## 📬 Contact

- **Name:** Charles Séguin  
- **Email:** charles.seg42@gmail.com 
- **GitHub:** [CharlesS42](https://github.com/CharlesS42)  

---

_Developed with ❤️ by Charles Séguin._  
