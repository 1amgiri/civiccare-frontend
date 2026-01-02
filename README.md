# 🚨 CivicCare – Local Emergency & Civic Support Platform

CivicCare is a **full-stack civic emergency response platform** designed to provide **instant SOS alerts**, **verified emergency contacts**, and **blood donor availability** for a local city or region.

This project focuses on **real-world problem solving**, clean backend architecture, and smooth frontend–backend integration.

---

## 🔥 Key Features

### 🆘 SOS Emergency Alert System
- One-tap SOS trigger from the frontend
- Automatically captures **GPS coordinates**
- Persists SOS alerts in the database
- Generates unique Alert ID with server timestamp
- Admin-ready for monitoring and resolution

### 🚓 Emergency Services Directory
- Police, Ambulance, Fire services
- Verified service listing
- Search and filter by service type
- Backend-driven REST APIs

### 🩸 Blood Donation Module
- Register blood donors
- Filter donors by blood group
- View available donors with contact details
- Real-time backend synchronization

### 📊 Dashboard Analytics
- Active SOS count
- Available blood donors count
- Verified emergency services count
- Clean and responsive UI

---

## 🛠 Tech Stack

### Backend
- Java 17  
- Spring Boot  
- Spring Data JPA  
- MySQL  
- REST APIs  
- Maven  

### Frontend
- React (TypeScript)  
- Tailwind CSS  
- Axios  
- Lucide Icons  
- Vite  

---

## 🧱 Project Architecture

### Backend (Spring Boot)
controller/ → REST API endpoints
service/ → Business logic
repository/ → Database access (JPA)
model/ → Entity definitions


### Frontend (React)


pages/ → Application screens
services/ → API communication
types/ → TypeScript models
components/ → Reusable UI components


---

## 🔗 Important API Endpoints

### SOS


POST /api/sos
Body:
{
"latitude": number,
"longitude": number
}


### Dashboard Stats


GET /api/dashboard/stats


### Emergency Services


GET /api/emergency-services
POST /api/emergency-services


### Blood Donors


GET /api/blood-donors
POST /api/blood-donors


---

## 🧪 How to Run Locally

### Backend

cd civiccare-backend
mvn spring-boot:run


Runs on:

http://localhost:8080

### Frontend
cd civiccare-frontend
npm install
npm run dev

--- 
### Runs on:

http://localhost:3000

--- 
### 🗄 Database Configuration

Create a MySQL database:

CREATE DATABASE civiccare_db;

---
### Update application.properties:
```bash

spring.datasource.url=jdbc:mysql://localhost:3306/civiccare_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```
---
### 🎯 What This Project Demonstrates

End-to-end full-stack development

Clean Spring Boot architecture

REST API design and integration

Real-world SOS emergency workflow

Database persistence and analytics

Frontend UX aligned with backend data

---
### 🚀 Future Enhancements

Admin SOS monitoring dashboard

Authentication & role-based access

City-based emergency routing

Map integration for live SOS tracking

WebSocket real-time alerts

---
## 👤 Author

Giri G
BCA Student | Java & Full-Stack Developer
📍 Tirupati, India
