import { MoreHorizontal } from "lucide-react";
import Button from "../../components/ui/Button";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  created_at: string;
}

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="mb-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl p-4">
      <div className="flex flex-row items-center justify-between mb-2">
        <h3 className="text-sm font-bold dark:text-white leading-tight">
          {task.title}
        </h3>
        <Button
          label=""
          variant="secondary"
          onClick={() => {}}
          icon={<MoreHorizontal size={14} />}
        />
      </div>
      <div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-3">
          {task.description || "No description provided."}
        </p>
      </div>
    </div>
  );
}