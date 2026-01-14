import { Trash2, Calendar, ArrowRight, Check } from "lucide-react";

interface TaskCardProps {
  task: any;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function TaskCard({ task, onDelete, onUpdate }: TaskCardProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'todo': 
        return { circle: "border-red-500 text-red-500", label: "Not Started" };
      case 'in_progress': 
        return { circle: "border-green-500 text-green-500", label: "In Progress" };
      case 'done': 
        return { circle: "border-purple-500 text-purple-500", label: "Completed" };
      default: 
        return { circle: "border-slate-300", label: status };
    }
  };

  const styles = getStatusStyles(task.status);

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md rounded-2xl p-4 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${styles.circle}`}>
          {task.status === 'done' && <Check size={8} />}
        </div>

        <div className="flex-grow">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight mb-1">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <button 
          onClick={onDelete} 
          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <Calendar size={12} />
          <span>{task.end_date ? new Date(task.end_date).toLocaleDateString() : 'No deadline'}</span>
        </div>
        {task.status !== 'done' && (
          <button 
            onClick={onUpdate}
            className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Move Next <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}