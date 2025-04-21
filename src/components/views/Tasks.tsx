
import { useState, useEffect } from "react";
import { 
  getProjects, 
  getTasks, 
  saveProject, 
  saveTask,
  deleteProject,
  deleteTask,
  toggleTaskCompletion,
  Project,
  Task,
  generateId
} from "@/utils/localStorage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";

// Extract ProjectItem component to simplify the main component
const ProjectItem = ({ 
  project, 
  tasks, 
  onAddTask, 
  onDeleteProject, 
  onToggleTask, 
  onDeleteTask 
}) => {
  const projectTasks = tasks.filter(task => task.projectId === project.id);
  const progress = projectTasks.length === 0 
    ? 0 
    : (projectTasks.filter(task => task.completed).length / projectTasks.length) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
            {project.logo ? (
              <img src={project.logo} alt={project.name} className="h-full w-full object-cover" />
            ) : (
              <div className="text-gray-400 font-bold">{project.name.substring(0, 1)}</div>
            )}
          </div>
          <div>
            <h3 className="font-medium flex items-center">
              {project.name}
              {project.completed && (
                <span className="ml-2 text-xs bg-crypto-green/10 text-crypto-green px-2 py-0.5 rounded-full">
                  Done
                </span>
              )}
            </h3>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <span>{projectTasks.filter(t => t.completed).length}</span>
              <span>/</span>
              <span>{projectTasks.length} tasks</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => onAddTask(project.id)}
            variant="ghost"
            size="sm"
            className="h-8 px-2"
          >
            <Plus size={16} />
          </Button>
          <Button 
            onClick={() => onDeleteProject(project.id)}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-3">
        <div 
          className="progress-value bg-gradient-green" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      {/* Task list */}
      <div className="space-y-2 mt-4">
        {projectTasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center p-2">No tasks yet</p>
        ) : (
          projectTasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-2 border-b border-gray-100">
              <div className="flex items-center">
                <Checkbox 
                  id={task.id}
                  checked={task.completed}
                  onCheckedChange={() => onToggleTask(task.id)}
                  className="mr-2"
                />
                <label 
                  htmlFor={task.id}
                  className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
                >
                  {task.title}
                </label>
              </div>
              <Button 
                onClick={() => onDeleteTask(task.id)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Add task button */}
      <Button 
        onClick={() => onAddTask(project.id)}
        variant="outline"
        size="sm"
        className="w-full mt-3 text-gray-500"
      >
        <Plus size={14} className="mr-1" />
        Add Task
      </Button>
    </div>
  );
};

const Tasks = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  // Form states
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectLogo, setProjectLogo] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    try {
      console.log("Loading tasks data");
      loadData();
    } catch (error) {
      console.error("Error loading tasks data:", error);
    }
  }, []);

  const loadData = () => {
    try {
      const loadedProjects = getProjects();
      const loadedTasks = getTasks();
      console.log("Loaded projects:", loadedProjects);
      console.log("Loaded tasks:", loadedTasks);
      setProjects(loadedProjects);
      setTasks(loadedTasks);
    } catch (error) {
      console.error("Error in loadData:", error);
      // Initialize with empty arrays if there's an error
      setProjects([]);
      setTasks([]);
    }
  };

  const handleAddProject = () => {
    if (!projectName.trim()) return;
    
    const newProject = {
      id: generateId(),
      name: projectName.trim(),
      logo: projectLogo || "",
      joined: true,
      completed: false,
      createdAt: Date.now()
    };
    
    saveProject(newProject);
    setProjectName("");
    setProjectLogo("");
    setIsAddProjectOpen(false);
    loadData();
  };

  const handleDeleteProject = (id) => {
    deleteProject(id);
    loadData();
  };

  const handleAddTask = () => {
    if (!taskTitle.trim() || !activeProjectId) return;
    
    const newTask = {
      id: generateId(),
      projectId: activeProjectId,
      title: taskTitle.trim(),
      completed: false,
      createdAt: Date.now()
    };
    
    saveTask(newTask);
    setTaskTitle("");
    setIsAddTaskOpen(false);
    loadData();
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
    loadData();
  };

  const handleToggleTask = (id) => {
    toggleTaskCompletion(id);
    loadData();
  };

  const handleOpenAddTask = (projectId) => {
    setActiveProjectId(projectId);
    setIsAddTaskOpen(true);
  };

  return (
    <div className="animate-fade-in pb-6">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500">Manage your crypto airdrop tasks</p>
        </div>
        <Button 
          onClick={() => setIsAddProjectOpen(true)}
          variant="outline"
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          <span>Project</span>
        </Button>
      </header>

      {/* Projects and Tasks */}
      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No projects added yet</p>
          <p className="text-sm">Add a project to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map(project => (
            <ProjectItem 
              key={project.id}
              project={project}
              tasks={tasks}
              onAddTask={handleOpenAddTask}
              onDeleteProject={handleDeleteProject}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Add Project Dialog */}
      <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Name</label>
              <Input
                placeholder="Airdrop project name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Logo URL (optional)</label>
              <Input
                placeholder="https://..."
                value={projectLogo}
                onChange={(e) => setProjectLogo(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProjectOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProject}>
              Add Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Title</label>
              <Input
                placeholder="Complete KYC..."
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
