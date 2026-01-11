import React from "react";
import { cn } from "../../lib/utils";

interface InputProps {
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  isRequired?: boolean;
  variant?: "primary" | "outlined" | "filled";
  className?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Input({ 
  label, 
  type, 
  placeholder, 
  isRequired = false, 
  variant = "primary",
  className,
  error,
  value,
  onChange
}: InputProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400 dark:focus:ring-blue-400/20";
      case "outlined":
        return "border-2 border-slate-300 focus:border-blue-600 dark:border-slate-600 dark:focus:border-blue-400";
      case "filled":
        return "bg-slate-100 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:focus:bg-slate-700 dark:focus:ring-blue-400";
      default:
        return "border-2 border-slate-200 focus:border-blue-500";
    }
  };

  return (
    <div className="space-y-2 w-full">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label} {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        type={type}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full px-4 py-3 rounded-2xl transition-all duration-200 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400",
          "bg-white dark:bg-slate-800",
          getVariantStyles(),
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
      />
      
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export default Input;