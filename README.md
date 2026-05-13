# 🚀 PitchShark AI — AI Shark Tank for Startups

> *Where startup ideas meet AI-powered investor analysis.*

Next.js + FastAPI powered hackathon project that simulates a smart investor panel for startup founders.  
Users pitch their startup idea, and the AI evaluates it like a real Shark Tank investor — analyzing market potential, business clarity, scalability, innovation, risks, and overall startup strength.

---

# 🌟 Problem Statement

Many early-stage founders struggle to validate startup ideas before investing time and money.

They often ask:
- Is this idea actually good?
- Does it solve a real problem?
- Is there market demand?
- Would investors even care?

PitchShark AI helps founders get **instant AI-driven startup feedback** before they build.

---

# 💡 Solution

PitchShark AI acts like an AI investor panel.

Users submit:
- Startup Name
- Problem Statement
- Solution
- Target Audience
- Revenue Model
- Market Information

The AI then:
- Evaluates the startup idea
- Generates startup scores
- Analyzes business potential
- Highlights strengths & weaknesses
- Simulates investor-style questioning
- Provides actionable feedback

---

# 🧠 Features

✅ AI Startup Analysis  
✅ Investor-style Feedback  
✅ Market Potential Evaluation  
✅ Startup Scoring System  
✅ AI-generated Summary  
✅ Modern Responsive UI  
✅ Real-time API Integration  
✅ Zustand State Management  
✅ Smooth Animations using Framer Motion  
✅ Fully Deployable Architecture

---

# 🏗️ Tech Stack

## Frontend
- Next.js 15
- TypeScript
- TailwindCSS
- Framer Motion
- Zustand
- Axios

## Backend
- FastAPI
- Python
- REST APIs

## Deployment
- Vercel (Frontend)
- Render / Railway (Backend)

---

# 📂 Project Structure

```bash
frontend/
├── src/
│   ├── app/
│   ├── components/
│   ├── store/
│   ├── services/
│   ├── data/
│   ├── types/
│   └── styles/

backend/
├── routes/
├── services/
├── models/
├── utils/
└── main.py
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd pitchShark-ai
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

## 3️⃣ Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```bash
http://localhost:8000
```

---

# 🔗 Environment Variables

Create a `.env` file inside frontend/backend if required.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# 🚀 Deployment

## Frontend Deployment

Deployed using Vercel

## Backend Deployment

Deployed using:
- Render


---



# 🧪 Example Workflow

1. User enters startup details
2. Frontend sends data to backend API
3. AI processes startup information
4. Analysis engine generates:
   - Startup Score
   - Market Potential
   - Investor Feedback
   - AI Summary
5. Results displayed in a clean dashboard UI

---


# 🎯 Hackathon Track Relevance

This project fits the:
- AI/ML Track
- Software Innovation Track
- Startup & Productivity Tools Category

---

# 🔥 Why This Project Matters

PitchShark AI helps:
- Student founders
- Early-stage startups
- Hackathon teams
- Indie builders

validate ideas faster using AI-driven insights.

Instead of spending weeks building an idea blindly, users can quickly understand:
- feasibility
- clarity
- scalability
- investor attractiveness

---

# 🛠️ Future Improvements

- Multi-agent AI investor panel
- Voice-based startup pitching
- AI-generated pitch decks
- Competitor analysis
- Market trend integration
- Investor recommendation engine
- Real-time startup benchmarking

---


#  Final Thought

> “Ideas are cheap. Execution is everything.”

PitchShark AI focuses on helping builders validate and improve ideas before turning them into products.
