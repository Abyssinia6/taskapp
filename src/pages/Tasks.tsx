import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Clock, Users, CheckCircle, Trash2, Calendar, ArrowRight } from 'lucide-react';
import CreateTaskModal from '../Features/tasks/CreateTaskModal';
import TaskCard from  '../Features/tasks/TaskCard';

export default function Tasks() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const updateTaskStatus = async (taskId: string, currentStatus: string) => {
    let nextStatus = '';
    if (currentStatus === 'todo') nextStatus = 'in_progress';
    else if (currentStatus === 'in_progress') nextStatus = 'done';
    else return; 

    const { error } = await supabase
      .from('tasks')
      .update({ status: nextStatus })
      .eq('id', taskId);

    if (!error) queryClient.invalidateQueries({ queryKey: ['tasks'] });
  };

  const deleteTask = async (taskId: string) => {
    if (!confirm("Delete this task?")) return;
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (!error) queryClient.invalidateQueries({ queryKey: ['tasks'] });
  };

  const columns = [
    { title: 'Not Started', icon: <Clock size={18} />, status: 'todo', color: 'border-red-500' },
    { title: 'In Progress', icon: <Users size={18} />, status: 'in_progress', color: 'border-green-500' },
    { title: 'Completed', icon: <CheckCircle size={18} />, status: 'done', color: 'border-purple-500' },
  ];

  if (isLoading) return <div className="p-10 text-center">Loading Workspace...</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
           <h1 className="text-3xl font-black tracking-tight">My Workspace</h1>
           <p className="text-slate-500 text-sm">Track your progress and future tasks.</p>
        </div>
        <CreateTaskModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col.status} className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl min-h-[500px] border border-slate-200/50 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <div className={`p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm ${col.color.replace('border', 'text')}`}>
                {col.icon}
              </div>
              <h2 className="font-bold text-slate-700 dark:text-slate-200">{col.title}</h2>
              <span className="ml-auto text-xs font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-800 px-2 py-1 rounded-full">
                {(tasks || []).filter(t => t.status === col.status).length}
              </span>
            </div>

            <div className="space-y-4">
              {(tasks || []).filter(t => t.status === col.status).map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onDelete={() => deleteTask(task.id)}
                  onUpdate={() => updateTaskStatus(task.id, task.status)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}