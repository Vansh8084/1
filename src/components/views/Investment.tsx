
import { useState, useEffect } from "react";
import { 
  getInvestments, 
  getEarnings, 
  saveInvestment, 
  saveEarning, 
  deleteInvestment, 
  deleteEarning,
  getFinancialSummary,
  getProjects,
  Transaction,
  FinancialSummary,
  Project,
  generateId
} from "@/utils/localStorage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Create a separate component for history item
const HistoryItem = ({ item, onDelete, getProjectName, getProjectLogo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="space-y-2">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-3 rounded-lg border cursor-pointer transition-all ${
          item.type === 'investment' 
            ? 'border-crypto-blue/20 bg-crypto-blue/5' 
            : 'border-crypto-green/20 bg-crypto-green/5'
        } ${isExpanded ? 'rounded-b-none' : ''}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {item.projectId && getProjectLogo(item.projectId) && (
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
                <img 
                  src={getProjectLogo(item.projectId)} 
                  alt={getProjectName(item.projectId)} 
                  className="h-full w-full object-cover" 
                />
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">{item.description}</p>
              {item.projectId && (
                <p className="text-xs text-gray-500">{getProjectName(item.projectId)}</p>
              )}
              <p className="text-xs text-gray-400">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <span className={`font-medium ${
            item.type === 'investment' ? 'text-crypto-blue' : 'text-crypto-green'
          }`}>
            {item.type === 'investment' ? '-' : '+'} ${item.amount.toFixed(2)}
          </span>
        </div>
      </div>
      {isExpanded && (
        <div className="p-2 rounded-b-lg border-x border-b border-gray-200 bg-gray-50 flex justify-end">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id, item.type);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

const Investment = () => {
  const [financial, setFinancial] = useState<FinancialSummary>({
    totalInvestment: 0,
    totalEarnings: 0,
    roi: 0,
    monthlyEarnings: 0
  });
  const [investments, setInvestments] = useState<Transaction[]>([]);
  const [earnings, setEarnings] = useState<Transaction[]>([]);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Form states
  const [isAddInvestmentOpen, setIsAddInvestmentOpen] = useState(false);
  const [isAddEarningOpen, setIsAddEarningOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [customProjectName, setCustomProjectName] = useState("");
  const [customProjectLogo, setCustomProjectLogo] = useState("");
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: 'investment' | 'earning'} | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load financial summary
    setFinancial(getFinancialSummary());
    
    // Load transactions
    const invs = getInvestments();
    const earns = getEarnings();
    
    setInvestments(invs);
    setEarnings(earns);
    
    // Load projects
    setProjects(getProjects());
    
    // Combine and sort history
    const combined = [
      ...invs.map(inv => ({ ...inv, type: 'investment' })),
      ...earns.map(earn => ({ ...earn, type: 'earning' }))
    ] as (Transaction & { type: string })[];
    
    // Sort by date, newest first
    combined.sort((a, b) => b.date - a.date);
    setHistory(combined as any);
  };

  const handleAddInvestment = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    let projectInfo = null;
    
    // Check if we need to create a custom project
    if (selectedProject === "custom" && customProjectName) {
      const newProject = {
        id: generateId(),
        name: customProjectName.trim(),
        logo: customProjectLogo || "",
        joined: true,
        completed: false,
        createdAt: Date.now()
      };
      
      projectInfo = newProject;
    }
    
    const newInvestment: Transaction = {
      id: generateId(),
      amount: parseFloat(amount),
      description: description || "Investment",
      date: Date.now(),
      projectId: selectedProject === "custom" ? projectInfo?.id : (selectedProject || undefined)
    };
    
    // If custom project, save it first
    if (projectInfo) {
      import("@/utils/localStorage").then(module => {
        module.saveProject(projectInfo);
      });
    }
    
    saveInvestment(newInvestment);
    toast.success("Investment added", {
      description: `$${parseFloat(amount).toFixed(2)} investment has been recorded.`
    });
    
    setAmount("");
    setDescription("");
    setSelectedProject("");
    setCustomProjectName("");
    setCustomProjectLogo("");
    setIsAddInvestmentOpen(false);
    loadData();
  };

  const handleAddEarning = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    let projectInfo = null;
    
    // Check if we need to create a custom project
    if (selectedProject === "custom" && customProjectName) {
      const newProject = {
        id: generateId(),
        name: customProjectName.trim(),
        logo: customProjectLogo || "",
        joined: true,
        completed: false,
        createdAt: Date.now()
      };
      
      projectInfo = newProject;
    }
    
    const newEarning: Transaction = {
      id: generateId(),
      amount: parseFloat(amount),
      description: description || "Earning",
      date: Date.now(),
      projectId: selectedProject === "custom" ? projectInfo?.id : (selectedProject || undefined)
    };
    
    // If custom project, save it first
    if (projectInfo) {
      import("@/utils/localStorage").then(module => {
        module.saveProject(projectInfo);
      });
    }
    
    saveEarning(newEarning);
    toast.success("Earning added", {
      description: `$${parseFloat(amount).toFixed(2)} earning has been recorded.`
    });
    
    setAmount("");
    setDescription("");
    setSelectedProject("");
    setCustomProjectName("");
    setCustomProjectLogo("");
    setIsAddEarningOpen(false);
    loadData();
  };

  const confirmDeleteTransaction = (id: string, type: 'investment' | 'earning') => {
    setItemToDelete({ id, type });
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteTransaction = () => {
    if (!itemToDelete) return;
    
    const { id, type } = itemToDelete;
    
    if (type === 'investment') {
      deleteInvestment(id);
      toast.success("Investment deleted", {
        description: "The investment has been successfully removed."
      });
    } else {
      deleteEarning(id);
      toast.success("Earning deleted", {
        description: "The earning has been successfully removed."
      });
    }
    
    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
    loadData();
  };

  // Find project name by ID
  const getProjectName = (projectId?: string) => {
    if (!projectId) return "";
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : "";
  };
  
  // Find project logo by ID
  const getProjectLogo = (projectId?: string) => {
    if (!projectId) return "";
    const project = projects.find(p => p.id === projectId);
    return project ? project.logo : "";
  };

  return (
    <div className="animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Investment & Earning</h1>
        <p className="text-gray-500">Track your crypto investments and earnings</p>
      </header>

      {/* Financial Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="stats-card bg-gradient-purple text-white">
          <h3 className="text-xs font-medium opacity-80">ROI</h3>
          <p className="text-xl font-bold">{financial.roi.toFixed(2)}%</p>
        </div>
        <div className="stats-card bg-gradient-orange text-white">
          <h3 className="text-xs font-medium opacity-80">Monthly Earnings</h3>
          <p className="text-xl font-bold">${financial.monthlyEarnings.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="stats-card">
          <h3 className="text-xs font-medium text-gray-500">Total Investment</h3>
          <p className="text-xl font-bold text-gray-900">${financial.totalInvestment.toFixed(2)}</p>
        </div>
        <div className="stats-card">
          <h3 className="text-xs font-medium text-gray-500">Total Earnings</h3>
          <p className="text-xl font-bold text-gray-900">${financial.totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <Button 
          onClick={() => setIsAddInvestmentOpen(true)}
          className="flex-1 bg-gradient-blue text-white"
        >
          Add Investment
        </Button>
        <Button 
          onClick={() => setIsAddEarningOpen(true)}
          className="flex-1 bg-gradient-green text-white"
        >
          Add Earning
        </Button>
      </div>

      {/* History Log */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-3">History Log</h2>
        {history.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item: any) => (
              <HistoryItem 
                key={item.id} 
                item={item} 
                onDelete={confirmDeleteTransaction}
                getProjectName={getProjectName}
                getProjectLogo={getProjectLogo}
              />
            ))}
          </div>
        )}
      </section>

      {/* Add Investment Dialog */}
      <Dialog open={isAddInvestmentOpen} onOpenChange={setIsAddInvestmentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Investment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount ($)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
                <option value="custom">Add new project</option>
              </select>
            </div>
            
            {selectedProject === "custom" && (
              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <Input
                    placeholder="Project name"
                    value={customProjectName}
                    onChange={(e) => setCustomProjectName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Logo URL (optional)</label>
                  <Input
                    placeholder="https://..."
                    value={customProjectLogo}
                    onChange={(e) => setCustomProjectLogo(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Initial investment..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddInvestmentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddInvestment}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Earning Dialog */}
      <Dialog open={isAddEarningOpen} onOpenChange={setIsAddEarningOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Earning</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount ($)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
                <option value="custom">Add new project</option>
              </select>
            </div>
            
            {selectedProject === "custom" && (
              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <Input
                    placeholder="Project name"
                    value={customProjectName}
                    onChange={(e) => setCustomProjectName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Logo URL (optional)</label>
                  <Input
                    placeholder="https://..."
                    value={customProjectLogo}
                    onChange={(e) => setCustomProjectLogo(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Airdrop reward..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEarningOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEarning}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTransaction}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Investment;
