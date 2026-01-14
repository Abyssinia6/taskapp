📝 TaskFlow: Modern Task Management System
TaskFlow is a high-performance, responsive task management application designed to help users organize their daily activities using a Kanban-style workflow. It features secure authentication, real-time database syncing, and a dual-theme (Dark/Light) interface.

🚀 Key Features
Secure Authentication: Full Sign-up, Login, and Password Recovery powered by Supabase Auth.
Kanban Workflow: Organizes tasks into "Not Started" (Red), "In Progress" (Green), and "Completed" (Purple).
Smart Transitions: Easily move tasks forward to the next stage or back to a previous stage to correct mistakes.
Two-Way Sync: Server state management using TanStack Query for instant UI updates and caching.
Dark Mode Support: Context-aware theme switching that persists across sessions.
Responsive Design: Mobile-first approach using Tailwind CSS.

🛠️ Tech Stack
Frontend: React 18 + TypeScript + Vite
Backend/Database: Supabase (PostgreSQL + Auth)
State Management: TanStack Query (React Query) & React Context API
Styling: Tailwind CSS & Lucide React (Icons)
UI Components: Radix UI (via Shadcn/UI)

📦 Required Libraries
To function correctly, the following dependencies must be installed. If you are setting this up from scratch or moving code to another app, run:

Bash
# Core Dependencies
npm install @supabase/supabase-js @tanstack/react-query lucide-react react-router-dom
# UI & Styling
npm install tailwind-merge clsx lucide-react @radix-ui/react-dialog
# Development Tools
npm install -D typescript vite @types/react @types/node
⚙️ Project Structure
Plaintext

src/
├── assets/             # Images 
├── components/         
│   ├── Layout/         # Navbar, Footer
│   ├── ui/             # Reusable Shadcn components (Button, Input, Card, Dialog)
│   └── tasks/          # TaskCard, TaskColumn
├── context/            # Auth and Theme Context providers
├── features/           # Complex logic (CreateTaskModal)
├── lib/                # Supabase client and utility functions
├── pages/              # Main route components (TasksPage, Dashboard, Login)
└── App.tsx             # Main routing and Provider setup
🔧 Setup Instructions
1. Environment Variables
Create a .env file in the root directory and add your Supabase credentials:

Code snippet

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
2. Database Schema
Ensure your Supabase tasks table has the following columns:

id: uuid (Primary Key)

user_id: uuid (References auth.users)

title: text

description: text (nullable)

status: text (default: 'todo') — Enum: todo, in_progress, done

start_date: date (nullable)

end_date: date (nullable)

created_at: timestamp

3. Run Locally
Bash

# Install dependencies
npm install

# Start development server
npm run dev
🛡️ Security (RLS)
This app is built with Row Level Security (RLS). Ensure your Supabase policies are set so that:

Users can only Select tasks where auth.uid() == user_id.

Users can only Insert/Update/Delete tasks where auth.uid() == user_id.