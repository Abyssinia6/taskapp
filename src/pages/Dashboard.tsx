import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Clock, Users, CheckCircle, ArrowUpRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  created_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();

  // 1. Fetching Logic with TanStack Query 
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false }); // Sort by newest first 
      
      if (error) throw error;
      return data as Task[];
    },
  });

  // 2. Graceful Loading State 
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-slate-500 font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  // 3. Graceful Error State 
  if (error) {
    return (
      <div className="p-10 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400 font-bold">Error loading tasks</p>
          <p className="text-sm text-red-500">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  // Filter tasks for stats
  const allTasks = tasks || [];
  const todoTasks = allTasks.filter(t => t.status === 'todo');
  const inProgressTasks = allTasks.filter(t => t.status === 'in_progress');
  const doneTasks = allTasks.filter(t => t.status === 'done');

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back! Here is what's happening today.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="To Do" count={todoTasks.length} icon={<Clock className="text-blue-600" size={32} />} bgColor="bg-blue-500/10" />
        <StatCard title="In Progress" count={inProgressTasks.length} icon={<Users className="text-amber-600" size={32} />} bgColor="bg-amber-500/10" />
        <StatCard title="Done" count={doneTasks.length} icon={<CheckCircle className="text-green-600" size={32} />} bgColor="bg-green-500/10" />
      </div>

      {/* Recent Tasks List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <CardTitle>Recent Tasks</CardTitle>
            <p className="text-sm text-slate-500">Your latest project updates</p>
          </div>
          <button onClick={() => navigate('/tasks')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowUpRight size={24} className="text-slate-400" />
          </button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {allTasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center justify-between p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{task.title}</p>
                  <p className="text-xs text-slate-500">Added {new Date(task.created_at).toLocaleDateString()}</p>
                </div>
                <StatusBadge status={task.status} />
              </div>
            ))}
            {allTasks.length === 0 && (
              <div className="p-10 text-center text-slate-400">No tasks found. Start by creating one!</div>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50/50 dark:bg-slate-800/50 justify-center p-4">
          <button onClick={() => navigate('/tasks')} className="text-sm font-bold text-blue-600 hover:underline">
            View Full Task Board
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Helper Components for cleaner code [cite: 55, 56]
function StatCard({ title, count, icon, bgColor }: any) {
  return (
    <Card>
      <CardContent className="p-8 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <p className="text-4xl font-black text-slate-900 dark:text-slate-50">{count}</p>
        </div>
        <div className={`${bgColor} p-4 rounded-2xl`}>{icon}</div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    done: 'bg-green-500/10 text-green-600',
    in_progress: 'bg-amber-500/10 text-amber-600',
    todo: 'bg-blue-500/10 text-blue-600'
  };
  return (
    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[status]}`}>
      {status.replace('_', ' ')}
    </div>
  );
}