import { Task } from '../types/Task';

const STORAGE_KEY = 'weekly-calendar-tasks';

export const loadTasks = (): { [key: string]: Task[] } => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};
    
    const parsed = JSON.parse(saved);
    
    // Convert date strings back to Date objects
    Object.keys(parsed).forEach(dateKey => {
      parsed[dateKey] = parsed[dateKey].map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
    });
    
    return parsed;
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return {};
  }
};

export const saveTasks = (tasks: { [key: string]: Task[] }): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};