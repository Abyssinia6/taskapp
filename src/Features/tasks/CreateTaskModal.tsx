import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import Button  from "../components/ui/Button"; 
import Input  from "../components/ui/Input";   
import { Loader2, Plus } from "lucide-react";
// Import your shadcn Dialog components here
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialog";

export default function CreateTaskModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  const queryClient = useQueryClient();

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert("You must be logged in");
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .insert([
        { 
          title, 
          description,
          user_id: user.id, 
          status: 'todo' 
        }
      ]);

    setIsLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setTitle('');
      setDescription('');
      setOpen(false); // Close modal
      // IMPORTANT: This tells TanStack Query to refresh the dashboard list
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button label="New Task" variant="primary" className="flex items-center gap-2">
          <Plus size={18} /> New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddTask} className="space-y-4 pt-4">
          <Input 
            label="Task Title"
            placeholder="e.g. Design Database"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isRequired
          />
          <div className="space-y-2">
             <label className="text-sm font-semibold">Description (Optional)</label>
             <textarea 
               className="w-full p-3 rounded-xl border-2 border-slate-200 dark:bg-slate-800"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
             />
          </div>
          <Button 
            label={isLoading ? "Saving..." : "Create Task"} 
            disabled={isLoading || !title}
            className="w-full"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}