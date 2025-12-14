# Emotion Recognition AI System 🤖🧠

An end-to-end Emotion Recognition AI System developed as part of a college–industry training program in collaboration with **ADVI Group of Companies**, under the program  
**“Deployment of CUDA Python in NVIDIA Boards.”**

This system integrates full-stack web development, machine learning inference, and GPU-accelerated processing to analyze human emotions from images, audio, and video in real time.

---

## 🎯 Project Overview

The application allows authenticated users to upload or stream multimedia inputs (image, audio, video), processes them using machine learning models accelerated with CUDA on NVIDIA hardware, and presents consolidated emotional insights along with AI-generated responses.

The goal of this project was to understand **how real ML systems are deployed and consumed through production-ready web applications**, not just model training.

---

## 🚀 Key Features

- Secure user authentication (Login & Registration)
- Role-controlled dashboard access
- Image-based emotion recognition
- Audio-based emotion recognition
- Video emotion recognition:
  - Emotion analysis every 10 seconds
  - Audio extraction and transcription from video
- Unified emotional insight generation
- AI-powered response generation based on detected emotions
- Pricing and dashboard UI for system access
- GPU-accelerated ML inference using CUDA on NVIDIA boards

---

## 🧠 System Architecture

### Dual Backend Design

- **Express.js (Node.js):**
  - Authentication & authorization
  - Input validation
  - API orchestration
  - Secure data flow control

- **Flask (Python):**
  - Machine learning model inference
  - Emotion detection APIs
  - CUDA-based performance optimization on NVIDIA hardware

This separation ensures clean responsibility boundaries between application logic and ML workloads.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Authentication pages (Login, Register)
- Dashboard & Pricing UI
- Token-based access handling

### Backend
- Node.js with Express.js
- Flask for ML API services
- RESTful API communication

### Database
- MongoDB
- Password hashing using bcrypt

### Authentication & Security
- JWT-based authentication
- Strong password policies
- Token storage and validation

### Machine Learning
- CUDA Python
- NVIDIA GPU boards
- Models for:
  - Image emotion recognition
  - Audio emotion recognition
  - Video emotion recognition
  - Speech-to-text transcription

---

## 🎥 Demo & Live Application

- **Live App:** https://naveenintern.netlify.app/
- **Demo Video (LinkedIn):**  
  https://www.linkedin.com/posts/naveen-fullstackdeveloper_reactjs-nodejs-flaskapi-activity-7355531868122869760-6PEl

  <img width="1359" height="548" alt="navintern" src="https://github.com/user-attachments/assets/9517057a-c718-49a5-88ce-f1f5cec49e98" />


---

## 🌐 Source Code

- **GitHub Repository:** https://github.com/naveen-dev-dotcom/navintern

---

## 📚 What I Learned

- Designing and integrating dual-backend architectures (Node.js + Flask)
- Deploying machine learning models on NVIDIA hardware using CUDA
- Handling real-time multimedia processing pipelines
- Securing full-stack applications with JWT and encrypted credentials
- Bridging frontend applications with GPU-accelerated AI systems
- Understanding production constraints beyond model accuracy

---

## 🧩 Challenges Faced

- Coordinating data flow between Express and Flask services
- Managing real-time video processing with fixed interval analysis
- Ensuring secure authentication across multiple backend services
- Optimizing ML inference performance using CUDA under hardware constraints

---

## 👤 Author & Ownership

**Naveen (Nav)**  
Full Stack Developer | AI & ML Integration  
Computer Science & Engineering Student  

- Developed independently as part of a college–industry training program  
- Deployed and tested on NVIDIA hardware  
- Focused on real-world ML deployment, not just experimentation
