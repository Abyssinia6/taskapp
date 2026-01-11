import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Clock, Users, CheckCircle, Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  created_at: string;
}

export default function Tasks() {
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tasks').select('*');
      if (error) throw error;
      return data as Task[];
    }
  });

  const sampleTasks: Task[] = [
    { id: '1', title: 'Design landing page', description: 'Create mockups in Figma', status: 'todo', created_at: new Date().toISOString() },
    { id: '4', title: 'Write API documentation', description: 'Use Swagger for docs', status: 'in_progress', created_at: new Date().toISOString() },
    { id: '6', title: 'Deploy to production', description: 'Final server check', status: 'done', created_at: new Date().toISOString() },
  ];

  const allTasks = tasks && tasks.length > 0 ? tasks : sampleTasks;
  
  const columns = [
    { title: 'To Do', icon: <Clock className="text-blue-500" />, status: 'todo', color: 'bg-blue-500' },
    { title: 'In Progress', icon: <Users className="text-amber-500" />, status: 'in_progress', color: 'bg-amber-500' },
    { title: 'Done', icon: <CheckCircle className="text-green-500" />, status: 'done', color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Task Board</h1>
          <p className="text-slate-500 font-medium">Manage your workflow efficiently.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-2xl font-bold hover:scale-105 transition-transform">
          <Plus size={20} />
          New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {columns.map((column) => (
          <div key={column.status} className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              {column.icon}
              <h2 className="font-bold text-lg">{column.title}</h2>
              <span className="ml-auto bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-bold">
                {allTasks.filter(t => t.status === column.status).length}
              </span>
            </div>
            
            <div className="space-y-4 min-h-[500px]">
              {allTasks.filter(t => t.status === column.status).map(task => (
                <Card key={task.id} className="cursor-grab active:cursor-grabbing border-l-4" style={{ borderLeftColor: column.color === 'bg-blue-500' ? '#3b82f6' : column.color === 'bg-amber-500' ? '#f59e0b' : '#22c55e' }}>
                  <CardContent className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">{task.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{task.description}</p>
                    <div className="pt-2 flex items-center justify-between">
                       <span className="text-[10px] font-medium text-slate-400">
                         {new Date(task.created_at).toLocaleDateString()}
                       </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}