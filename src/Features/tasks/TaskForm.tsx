import { UseFormRegister } from 'react-hook-form';
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea.tsx";
interface TaskFormData {
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
}

export default function TaskForm({ register }: { register: UseFormRegister<TaskFormData> }) {
  return (
    <div className="space-y-4 py-4">
      <Input 
        label="Title" 
        {...register("title", { required: true })} 
        placeholder="Task name..." 
        className="rounded-xl" 
      />
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea 
          label="Description"
          {...register("description")} 
          placeholder="Details..." 
          className="rounded-xl" 
        />
      </div>
    </div>
  );
}