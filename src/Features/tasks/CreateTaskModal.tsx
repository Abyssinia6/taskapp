import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import Button from "../../components/ui/Button"; 
import Input from "../../components/ui/Input";
import { Loader2, Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../../components/ui/Dialog";

export default function CreateTaskModal() {
 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('todo');
  
  const queryClient = useQueryClient();

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert("You must be logged in");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .insert([
        { 
          title, 
          description,
          user_id: user.id, 
          status: status,      
          start_date: startDate || null, 
          end_date: endDate || null     
        }
      ]);

    setIsLoading(false);

    if (error) {
      alert(error.message);
    } else {
    
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setStatus('todo');
      
      setOpen(false); 
      
     
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          label="New Task" 
          variant="primary" 
          className="flex items-center gap-2"
          icon={<Plus size={18} />} 
        />
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        

        <form onSubmit={handleAddTask} className="space-y-4 pt-4">
          {/* Title */}
          <Input 
            label="Task Title"
            type='text'
            placeholder="e.g. Design Database"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isRequired
          />

     
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Description (Optional)
            </label>
            <textarea 
              className="w-full p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-blue-500 outline-none transition-all text-sm"
              rows={3}
              placeholder="Add some details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

  
          <div className="grid grid-cols-2 gap-4">
            <Input 
            placeholder='start date'
              label="Start Date" 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
            <Input 
            placeholder='end date'
              label="End Date" 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>

        
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Initial Status
            </label>
            <select 
              className="w-full p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-blue-500 outline-none transition-all text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Completed</option>
            </select>
          </div>

       
          <Button 
            label={isLoading ? "Saving..." : "Create Task"} 
            disabled={isLoading || !title}
            variant="primary"
            className="w-full py-4 mt-2"
            icon={isLoading ? <Loader2 className="animate-spin" size={18} /> : null}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}