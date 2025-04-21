
// Local storage keys
export const STORAGE_KEYS = {
  PROJECTS: 'dropdeck-projects',
  INVESTMENTS: 'dropdeck-investments',
  EARNINGS: 'dropdeck-earnings',
  TASKS: 'dropdeck-tasks',
  LAST_RESET: 'dropdeck-last-reset'
};

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error('LocalStorage is not available:', e);
    return false;
  }
};

// Generic get function
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (!isLocalStorageAvailable()) return defaultValue;
  
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Generic set function
export const setToStorage = <T>(key: string, value: T): void => {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Function to clear a specific key from storage
export const clearFromStorage = (key: string): void => {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

// Project related types and functions
export interface Project {
  id: string;
  name: string;
  logo: string;
  joined: boolean;
  completed: boolean;
  createdAt: number;
}

export const getProjects = (): Project[] => 
  getFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, []);

export const saveProject = (project: Project): void => {
  const projects = getProjects();
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.push(project);
  }
  
  setToStorage(STORAGE_KEYS.PROJECTS, projects);
};

export const deleteProject = (id: string): void => {
  const projects = getProjects().filter(project => project.id !== id);
  setToStorage(STORAGE_KEYS.PROJECTS, projects);
  
  // Also delete related tasks
  const tasks = getTasks().filter(task => task.projectId !== id);
  setToStorage(STORAGE_KEYS.TASKS, tasks);
};

// Financial transaction types and functions
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: number;
  projectId?: string;
}

export const getInvestments = (): Transaction[] => 
  getFromStorage<Transaction[]>(STORAGE_KEYS.INVESTMENTS, []);

export const saveInvestment = (investment: Transaction): void => {
  const investments = getInvestments();
  const existingIndex = investments.findIndex(i => i.id === investment.id);
  
  if (existingIndex >= 0) {
    investments[existingIndex] = investment;
  } else {
    investments.push(investment);
  }
  
  setToStorage(STORAGE_KEYS.INVESTMENTS, investments);
};

export const deleteInvestment = (id: string): void => {
  const investments = getInvestments().filter(inv => inv.id !== id);
  setToStorage(STORAGE_KEYS.INVESTMENTS, investments);
};

export const getEarnings = (): Transaction[] => 
  getFromStorage<Transaction[]>(STORAGE_KEYS.EARNINGS, []);

export const saveEarning = (earning: Transaction): void => {
  const earnings = getEarnings();
  const existingIndex = earnings.findIndex(e => e.id === earning.id);
  
  if (existingIndex >= 0) {
    earnings[existingIndex] = earning;
  } else {
    earnings.push(earning);
  }
  
  setToStorage(STORAGE_KEYS.EARNINGS, earnings);
};

export const deleteEarning = (id: string): void => {
  const earnings = getEarnings().filter(earn => earn.id !== id);
  setToStorage(STORAGE_KEYS.EARNINGS, earnings);
};

// Task related types and functions
export interface Task {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export const getTasks = (): Task[] => 
  getFromStorage<Task[]>(STORAGE_KEYS.TASKS, []);

export const saveTask = (task: Task): void => {
  const tasks = getTasks();
  const existingIndex = tasks.findIndex(t => t.id === task.id);
  
  if (existingIndex >= 0) {
    tasks[existingIndex] = task;
  } else {
    tasks.push(task);
  }
  
  setToStorage(STORAGE_KEYS.TASKS, tasks);
  updateProjectCompletionStatus(task.projectId);
};

export const deleteTask = (id: string): void => {
  const taskToDelete = getTasks().find(task => task.id === id);
  const projectId = taskToDelete?.projectId;
  
  const tasks = getTasks().filter(task => task.id !== id);
  setToStorage(STORAGE_KEYS.TASKS, tasks);
  
  if (projectId) {
    updateProjectCompletionStatus(projectId);
  }
};

export const toggleTaskCompletion = (id: string): void => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex >= 0) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    setToStorage(STORAGE_KEYS.TASKS, tasks);
    updateProjectCompletionStatus(tasks[taskIndex].projectId);
  }
};

// Function to update project completion status based on tasks
const updateProjectCompletionStatus = (projectId: string): void => {
  const tasks = getTasks().filter(task => task.projectId === projectId);
  const projects = getProjects();
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex >= 0 && tasks.length > 0) {
    const allTasksCompleted = tasks.every(task => task.completed);
    projects[projectIndex].completed = allTasksCompleted;
    setToStorage(STORAGE_KEYS.PROJECTS, projects);
  }
};

// Daily reset function for tasks
export const checkAndResetTasks = (): void => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const lastReset = getFromStorage<number>(STORAGE_KEYS.LAST_RESET, 0);
  
  if (lastReset < today) {
    // Reset all tasks to uncompleted status
    const tasks = getTasks().map(task => ({
      ...task,
      completed: false
    }));
    
    setToStorage(STORAGE_KEYS.TASKS, tasks);
    setToStorage(STORAGE_KEYS.LAST_RESET, today);
    
    // Also reset project completion status
    const projects = getProjects().map(project => ({
      ...project,
      completed: false
    }));
    
    setToStorage(STORAGE_KEYS.PROJECTS, projects);
  }
};

// Calculate financial summary
export interface FinancialSummary {
  totalInvestment: number;
  totalEarnings: number;
  roi: number;
  monthlyEarnings: number;
}

export const getFinancialSummary = (): FinancialSummary => {
  const investments = getInvestments();
  const earnings = getEarnings();
  
  const totalInvestment = investments.reduce((sum, item) => sum + item.amount, 0);
  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  
  // Calculate ROI
  const roi = totalInvestment > 0 
    ? ((totalEarnings - totalInvestment) / totalInvestment) * 100
    : 0;
  
  // Calculate monthly earnings (earnings from the current month)
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const monthlyEarnings = earnings
    .filter(earning => earning.date >= startOfMonth)
    .reduce((sum, item) => sum + item.amount, 0);
  
  return {
    totalInvestment,
    totalEarnings,
    roi,
    monthlyEarnings
  };
};

// Get project statistics
export interface ProjectStats {
  totalProjects: number;
  joinedProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
}

export const getProjectStats = (): ProjectStats => {
  const projects = getProjects();
  const tasks = getTasks();
  
  return {
    totalProjects: projects.length,
    joinedProjects: projects.filter(project => project.joined).length,
    completedProjects: projects.filter(project => project.completed).length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.completed).length
  };
};

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
