
import { useState, useEffect } from "react";
import { 
  getInvestments, 
  getEarnings, 
  saveInvestment, 
  saveEarning, 
  deleteInvestment, 
  deleteEarning,
  getFinancialSummary,
  Transaction,
  FinancialSummary,
  generateId
} from "@/utils/localStorage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

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
  
  // Form states
  const [isAddInvestmentOpen, setIsAddInvestmentOpen] = useState(false);
  const [isAddEarningOpen, setIsAddEarningOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

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
    
    const newInvestment: Transaction = {
      id: generateId(),
      amount: parseFloat(amount),
      description: description || "Investment",
      date: Date.now()
    };
    
    saveInvestment(newInvestment);
    setAmount("");
    setDescription("");
    setIsAddInvestmentOpen(false);
    loadData();
  };

  const handleAddEarning = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    const newEarning: Transaction = {
      id: generateId(),
      amount: parseFloat(amount),
      description: description || "Earning",
      date: Date.now()
    };
    
    saveEarning(newEarning);
    setAmount("");
    setDescription("");
    setIsAddEarningOpen(false);
    loadData();
  };

  const handleDeleteTransaction = (id: string, type: 'investment' | 'earning') => {
    if (type === 'investment') {
      deleteInvestment(id);
    } else {
      deleteEarning(id);
    }
    loadData();
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
              <div key={item.id} 
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  item.type === 'investment' 
                    ? 'border-crypto-blue/20 bg-crypto-blue/5' 
                    : 'border-crypto-green/20 bg-crypto-green/5'
                }`}
              >
                <div>
                  <div className="flex items-center">
                    <span className={`font-medium ${
                      item.type === 'investment' ? 'text-crypto-blue' : 'text-crypto-green'
                    }`}>
                      {item.type === 'investment' ? '-' : '+'} ${item.amount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.date).toLocaleString()}
                  </p>
                </div>
                <button 
                  onClick={() => handleDeleteTransaction(item.id, item.type)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
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
    </div>
  );
};

export default Investment;
