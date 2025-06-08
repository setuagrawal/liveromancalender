import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';

interface DayColumnProps {
  date: Date;
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  isToday: boolean;
}

const DayColumn: React.FC<DayColumnProps> = ({
  date,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  isToday
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const dayName = date.toLocaleLowerName('it-IT', { weekday: 'long' });
  const dayNumber = date.getDate();

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim());
      setNewTaskText('');
      setIsAddingTask(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setIsAddingTask(false);
      setNewTaskText('');
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className={`
      bg-white/60 backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:shadow-lg h-full flex flex-col
      ${isToday 
        ? 'border-amber-200 bg-amber-50/60 shadow-md' 
        : 'border-stone-200/70 hover:border-stone-300/70'
      }
    `}>
      {/* Day Header */}
      <div className={`
        p-4 border-b border-stone-200/50 rounded-t-2xl
        ${isToday ? 'bg-amber-100/50' : 'bg-stone-50/50'}
      `}>
        <div className="text-center">
          <h3 className="text-lg font-serif capitalize text-stone-600 mb-1" style={{ fontFamily: 'Crimson Text, serif' }}>
            {dayName}
          </h3>
          <div className={`
            text-2xl font-serif font-semibold inline-flex items-center justify-center w-10 h-10 rounded-full
            ${isToday 
              ? 'bg-amber-200 text-amber-800' 
              : 'text-stone-700'
            }
          `} style={{ fontFamily: 'Playfair Display, serif' }}>
            {dayNumber}
          </div>
        </div>
      </div>

      {/* Tasks Area */}
      <div className="flex-1 p-4 flex flex-col overflow-hidden">
        {/* Pending Tasks */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
          {pendingTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggleTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}

          {/* Add Task Input */}
          {isAddingTask ? (
            <div className="flex items-center space-x-2 bg-stone-50/80 rounded-lg p-2 border border-stone-200/50">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nuovo compito..."
                className="flex-1 bg-transparent border-none outline-none text-stone-700 placeholder-stone-400 font-serif"
                style={{ fontFamily: 'Crimson Text, serif' }}
                autoFocus
              />
              <button
                onClick={handleAddTask}
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsAddingTask(false);
                  setNewTaskText('');
                }}
                className="text-stone-400 hover:text-stone-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingTask(true)}
              className="flex items-center justify-center space-x-2 py-3 px-4 text-stone-500 hover:text-stone-600 hover:bg-stone-50/80 rounded-lg transition-all duration-200 border-2 border-dashed border-stone-200 hover:border-stone-300"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-serif" style={{ fontFamily: 'Crimson Text, serif' }}>
                Aggiungi compito
              </span>
            </button>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="border-t border-stone-200/50 pt-4">
            <div className="space-y-2">
              {completedTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => onToggleTask(task.id)}
                  onDelete={() => onDeleteTask(task.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayColumn;