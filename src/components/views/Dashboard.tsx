
import { useState, useEffect } from "react";
import { 
  getProjects, 
  getProjectStats, 
  getFinancialSummary,
  ProjectStats,
  FinancialSummary,
  Project
} from "@/utils/localStorage";

const Dashboard = () => {
  const [stats, setStats] = useState<ProjectStats>({
    totalProjects: 0,
    joinedProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0
  });
  const [financial, setFinancial] = useState<FinancialSummary>({
    totalInvestment: 0,
    totalEarnings: 0,
    roi: 0,
    monthlyEarnings: 0
  });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load data
    setStats(getProjectStats());
    setFinancial(getFinancialSummary());
    setProjects(getProjects().filter(p => p.joined));
  }, []);

  return (
    <div className="animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Track your crypto airdrops and tasks</p>
      </header>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="stats-card bg-gradient-blue text-white">
          <h3 className="text-xs font-medium opacity-80">Total Investment</h3>
          <p className="text-xl font-bold">${financial.totalInvestment.toFixed(2)}</p>
        </div>
        <div className="stats-card bg-gradient-green text-white">
          <h3 className="text-xs font-medium opacity-80">Total Earnings</h3>
          <p className="text-xl font-bold">${financial.totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Project Stats */}
      <div className="stats-card mb-6">
        <h2 className="font-semibold mb-2">Project Stats</h2>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-lg font-bold text-crypto-purple">{stats.joinedProjects}</p>
            <p className="text-xs text-gray-500">Joined</p>
          </div>
          <div className="text-gray-300">/</div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-400">{stats.totalProjects}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
        </div>
      </div>

      {/* Task Completion */}
      <div className="stats-card mb-6">
        <h2 className="font-semibold mb-2">Task Completion</h2>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-lg font-bold text-crypto-green">{stats.completedTasks}</p>
            <p className="text-xs text-gray-500">Completed</p>
          </div>
          <div className="text-gray-300">/</div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-400">{stats.totalTasks}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
        </div>

        {/* Progress bar */}
        {stats.totalTasks > 0 && (
          <div className="progress-bar mt-2">
            <div 
              className="progress-value bg-gradient-green" 
              style={{ width: `${(stats.completedTasks / stats.totalTasks) * 100}%` }} 
            />
          </div>
        )}
      </div>

      {/* My Projects */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-3">My Projects</h2>
        
        {projects.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No projects added yet</p>
            <p className="text-sm">Go to Tasks tab to add projects</p>
          </div>
        ) : (
          <div>
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
                  {project.logo ? (
                    <img src={project.logo} alt={project.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-gray-400 font-bold">{project.name.substring(0, 1)}</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-crypto-blue/10 text-crypto-blue text-xs px-2 py-1 rounded-full">
                  Joined
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
