import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/Auth';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Clock, Users, CheckCircle, ArrowUpRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || "User";
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-red-500 text-center">Error loading tasks. Please try again.</div>;
  }
  const allTasks = tasks || [];
  const todoTasks = allTasks.filter((t: any) => t.status === 'todo');
  const inProgressTasks = allTasks.filter((t: any) => t.status === 'in_progress');
  const doneTasks = allTasks.filter((t: any) => t.status === 'done');

  return (
    <div className="space-y-8 p-6 lg:p-10">
 
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          Welcome back, {userName}!
        </h1>
        <p className="text-slate-500 font-medium">Here is what's happening today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="To Do" 
          count={todoTasks.length} 
          icon={<Clock className="text-blue-600" size={32} />} 
          bgColor="bg-blue-500/10" 
        />
        <StatCard 
          title="In Progress" 
          count={inProgressTasks.length} 
          icon={<Users className="text-amber-600" size={32} />} 
          bgColor="bg-amber-500/10" 
        />
        <StatCard 
          title="Done" 
          count={doneTasks.length} 
          icon={<CheckCircle className="text-green-600" size={32} />} 
          bgColor="bg-green-500/10" 
        />
      </div>

    
      <Card className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <CardTitle>Recent Tasks</CardTitle>
          <button 
            onClick={() => navigate('/tasks')} 
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowUpRight size={24} className="text-slate-400" />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {allTasks.length === 0 ? (
              <div className="p-10 text-center text-slate-400">No tasks found.</div>
            ) : (
              allTasks.slice(0, 5).map((task: any) => (
                <div key={task.id} className="flex items-center justify-between p-6">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">{task.title}</p>
                    <p className="text-xs text-slate-500">{new Date(task.created_at).toLocaleDateString()}</p>
                  </div>
                  <StatusBadge status={task.status} />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, count, icon, bgColor }: any) {
  return (
    <Card className="bg-white dark:bg-slate-900 rounded-[24px] border-none shadow-sm">
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