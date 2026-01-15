import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";

interface TaskColumnProps {
  status: 'todo' | 'in_progress' | 'done';
title: string;
}

export default function TaskColumn({ status, title }: TaskColumnProps) {
 {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 dark:bg-slate-950">
       <Navbar />
<main className="flex-grow max-w-7xl mx-auto w-full p-6 z-10">
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight">My Workspace</h1>
          <p className="text-slate-500">Manage and track your daily activities.</p>
        </header>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <TaskColumn status="todo" title="To Do" />
           <TaskColumn status="in_progress" title="In Progress" />
           <TaskColumn status="done" title="Completed" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

}