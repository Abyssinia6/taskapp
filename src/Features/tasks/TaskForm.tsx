import { Input } from"@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TaskForm({ register }) {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input {...register("title", { required: true })} placeholder="Task name..." className="rounded-xl" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea {...register("description")} placeholder="Details..." className="rounded-xl" />
      </div>
    </div>
  );
}