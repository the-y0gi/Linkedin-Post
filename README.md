# LinkedIn Post Generator 🚀

An AI-powered tool to generate professional LinkedIn posts based on user prompts. Built with a modern tech stack involving a Next.js frontend and an Express.js backend powered by Google Gemini AI.

## ✨ Features

- **AI Content Generation**: Leverages Google Gemini AI to create high-quality LinkedIn posts.
- **Modern UI**: Clean and responsive design built with Tailwind CSS and Framer Motion.
- **Easy Integration**: Decoupled frontend and backend for better scalability.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15+](https://nextjs.org/)
- **UI Libraries**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management/Data Fetching**: Axios, React Hooks

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Utilities**: CORS, Helmet, Morgan, Zod (Validation)

## 📁 Project Structure

```bash
linkedin-post/
├── frontend/          # Next.js application
│   ├── src/           # Application source code
│   └── public/        # Static assets
├── backend/           # Express.js server
│   ├── src/           # Server logic and routes
│   └── api/           # Vercel serverless integration
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/the-y0gi/Linkedin-Post
   cd Linkedin-Post
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory:

   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start Backend**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

Visit `http://localhost:3000` to use the application!


