📝 TaskFlow
TaskFlow is a modern, responsive Kanban-style task management application. It helps users organize workflows with a clear visual interface, featuring secure authentication and real-time data persistence.

✨ Features
Kanban Workflow: Drag-free task transitions (Next/Back) between status columns.
User Profiles: Automatic profile creation on signup (Name, Job Title, City).
Authentication: Secure Login, Sign Up, and Password Reset via Supabase.
Real-time Sync: Powered by TanStack Query for instant UI updates.
Theme Support: Fully responsive Dark and Light mode.

🛠️ Tech Stack
Frontend: React 18, TypeScript, Vite
Styling: Tailwind CSS, Lucide Icons
Database & Auth: Supabase (PostgreSQL)
Deployment: Netlify

⚙️ Project Structure
Plaintext
taskmgr/
├── public/                # Static assets (including _redirects for Netlify)
├── src/
│   ├── components/        # UI components (TaskCards, Navbar, etc.)
│   ├── context/           # Auth and Theme providers
│   ├── lib/               # Supabase client configuration
│   ├── pages/             # Full page views (Dashboard, Profile, Login)
│   ├── App.tsx            # Main Routing
│   └── main.tsx           # Entry point
├── .env                   # Environment variables (VITE_SUPABASE_URL, etc.)
└── vite.config.ts         # Vite configuration
🚀 Getting Started
1. Environment Variables
Create a .env file in the root directory and add your keys:
Code snippet
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
2. Installation & Run
Bash

# Install dependencies
npm install
# Start development server
npm run dev
🌐 Deployment on Netlify
Build Settings: * Build Command: npm run build
Publish directory: dist
Environment Variables: Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the Netlify Dashboard.
Routing: Ensure public/_redirects exists with /* /index.html 200 to allow page refreshing.