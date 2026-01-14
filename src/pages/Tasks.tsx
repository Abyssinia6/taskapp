import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Card, CardContent } from '../components/ui/Card';
import { Clock, Users, CheckCircle, Trash2, Calendar } from 'lucide-react';
import CreateTaskModal from '../Features/tasks/CreateTaskModal';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  start_date?: string; // Added
  end_date?: string;   // Added
  created_at: string;
}

export default function Tasks() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as Task[];
    },
  });

  const deleteTask = async (taskId: string) => {
    if (!confirm("Delete this task?")) return;
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (!error) queryClient.invalidateQueries({ queryKey: ['tasks'] });
  };

  const columns = [
    { title: 'To Do', icon: <Clock className="text-blue-500" />, status: 'todo', color: 'border-blue-500' },
    { title: 'In Progress', icon: <Users className="text-amber-500" />, status: 'in_progress', color: 'border-amber-500' },
    { title: 'Done', icon: <CheckCircle className="text-green-500" />, status: 'done', color: 'border-green-500' },
  ];

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
           <h1 className="text-3xl font-black tracking-tight">Tasks</h1>
           <p className="text-slate-500 text-sm">Manage your project workflow</p>
        </div>
        <CreateTaskModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col.status} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl min-h-[500px]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              {col.icon}
              <h2 className="font-bold">{col.title}</h2>
              <span className="ml-auto text-xs font-bold bg-white dark:bg-slate-800 px-2 py-1 rounded-full shadow-sm">
                {(tasks || []).filter(t => t.status === col.status).length}
              </span>
            </div>

            <div className="space-y-3">
              {(tasks || []).filter(t => t.status === col.status).map(task => (
                <Card key={task.id} className={`border-l-4 ${col.color} shadow-sm hover:shadow-md transition-shadow`}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{task.title}</h3>
                      <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {task.description && <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>}
                    
                    {/* DATES DISPLAY */}
                    {(task.start_date || task.end_date) && (
                      <div className="flex items-center gap-2 pt-2 text-[10px] text-slate-400 font-medium">
                        <Calendar size={12} />
                        <span>
                          {task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Start'} 
                          {' - '}
                          {task.end_date ? new Date(task.end_date).toLocaleDateString() : 'End'}
                        </span>
                      </div>
                    )}
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