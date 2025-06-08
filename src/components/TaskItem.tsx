import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        group flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ease-in-out
        ${task.completed 
          ? 'bg-green-50/80 border border-green-200/50 transform' 
          : 'bg-white/80 border border-stone-200/50 hover:bg-stone-50/80 hover:border-stone-300/50'
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion Toggle */}
      <button
        onClick={onToggle}
        className={`
          flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200
          ${task.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-stone-300 hover:border-green-400 hover:bg-green-50'
          }
        `}
      >
        {task.completed && <Check className="w-3 h-3" />}
      </button>

      {/* Task Text */}
      <span
        className={`
          flex-1 font-serif transition-all duration-200
          ${task.completed
            ? 'text-green-700 line-through opacity-70'
            : 'text-stone-700'
          }
        `}
        style={{ fontFamily: 'Crimson Text, serif' }}
      >
        {task.text}
      </span>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className={`
          flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200
          ${isHovered
            ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
            : 'text-transparent'
          }
        `}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default TaskItem;