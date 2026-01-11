import React from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import TaskColumn from "../components/tasks/TaskColumn"; 
import diamo from "../assets/diamo.png"; 

function TasksPage() {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 dark:bg-slate-950">
      
      
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <img src={diamo} alt="" className="w-96" />
      </div>

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

export default TasksPage;