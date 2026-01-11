import React from "react"; // Capitalized R

interface TasxProps { // Corrected "inteface"
    title: string;
    description?: string;
    created_at: string;
}

export default function Tasx({ title, description, created_at }: TasxProps) {
    return (
        <div className="task-card">
            <h3 className="task-title">{title}</h3>
            {description && <p className="task-description">{description}</p>}
            <span className="task-date">
                {new Date(created_at).toLocaleDateString()}
            </span>
        </div>
    );
}