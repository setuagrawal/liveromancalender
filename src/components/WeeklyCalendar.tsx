import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DayColumn from './DayColumn';
import { Task } from '../types/Task';
import { getWeekDates, formatWeekRange } from '../utils/dateUtils';
import { loadTasks, saveTasks } from '../utils/localStorage';

const WeeklyCalendar: React.FC = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});

  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const weekDates = getWeekDates(currentWeekStart);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  const addTask = (date: string, text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    };

    setTasks(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), newTask]
    }));
  };

  const toggleTask = (date: string, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [date]: prev[date]?.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      ) || []
    }));
  };

  const deleteTask = (date: string, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [date]: prev[date]?.filter(task => task.id !== taskId) || []
    }));
  };

  return (
    <div className="h-screen flex flex-col p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigateWeek('prev')}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-stone-200/50"
        >
          <ChevronLeft className="w-6 h-6 text-stone-600" />
        </button>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-stone-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Settimana
          </h1>
          <p className="text-lg md:text-xl text-stone-500 font-serif" style={{ fontFamily: 'Crimson Text, serif' }}>
            {formatWeekRange(currentWeekStart)}
          </p>
        </div>

        <button
          onClick={() => navigateWeek('next')}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-stone-200/50"
        >
          <ChevronRight className="w-6 h-6 text-stone-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-7 gap-1 md:gap-4 lg:gap-6 max-w-7xl mx-auto w-full">
        {weekDates.map((date, index) => {
          const dateString = date.toISOString().split('T')[0];
          return (
            <DayColumn
              key={dateString}
              date={date}
              tasks={tasks[dateString] || []}
              onAddTask={(text) => addTask(dateString, text)}
              onToggleTask={(taskId) => toggleTask(dateString, taskId)}
              onDeleteTask={(taskId) => deleteTask(dateString, taskId)}
              isToday={date.toDateString() === new Date().toDateString()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;