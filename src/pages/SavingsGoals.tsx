import { useState } from "react";
import { ArrowLeft, Plus, Target, TrendingUp, Calendar, DollarSign, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface SavingsGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  autoSave: boolean;
  autoSaveAmount: number;
  color: string;
}

const SavingsGoals = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: 1,
      name: "Emergency Fund",
      targetAmount: 500000,
      currentAmount: 320000,
      deadline: "2024-12-31",
      autoSave: true,
      autoSaveAmount: 5000,
      color: "hsl(var(--chart-1))",
    },
    {
      id: 2,
      name: "Vacation to Maldives",
      targetAmount: 150000,
      currentAmount: 85000,
      deadline: "2024-09-15",
      autoSave: true,
      autoSaveAmount: 3000,
      color: "hsl(var(--chart-2))",
    },
    {
      id: 3,
      name: "New Laptop",
      targetAmount: 80000,
      currentAmount: 80000,
      deadline: "2024-06-30",
      autoSave: false,
      autoSaveAmount: 0,
      color: "hsl(var(--chart-3))",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddMoneyDialogOpen, setIsAddMoneyDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [addAmount, setAddAmount] = useState("");

  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalDeadline, setNewGoalDeadline] = useState("");
  const [newGoalAutoSave, setNewGoalAutoSave] = useState(false);
  const [newGoalAutoSaveAmount, setNewGoalAutoSaveAmount] = useState("");

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  const handleAddGoal = () => {
    if (!newGoalName || !newGoalTarget || !newGoalDeadline) {
      toast.error("Please fill all required fields");
      return;
    }

    const newGoal: SavingsGoal = {
      id: Date.now(),
      name: newGoalName,
      targetAmount: parseFloat(newGoalTarget),
      currentAmount: 0,
      deadline: newGoalDeadline,
      autoSave: newGoalAutoSave,
      autoSaveAmount: newGoalAutoSave ? parseFloat(newGoalAutoSaveAmount || "0") : 0,
      color: `hsl(var(--chart-${(goals.length % 5) + 1}))`,
    };

    setGoals([...goals, newGoal]);
    setNewGoalName("");
    setNewGoalTarget("");
    setNewGoalDeadline("");
    setNewGoalAutoSave(false);
    setNewGoalAutoSaveAmount("");
    setIsAddDialogOpen(false);
    toast.success("Savings goal created successfully!");
  };

  const handleAddMoney = () => {
    if (!selectedGoal || !addAmount) {
      toast.error("Please enter an amount");
      return;
    }

    const amount = parseFloat(addAmount);
    const updatedGoals = goals.map((goal) => {
      if (goal.id === selectedGoal.id) {
        const newAmount = goal.currentAmount + amount;
        const isCompleted = newAmount >= goal.targetAmount;

        if (isCompleted && goal.currentAmount < goal.targetAmount) {
          // Goal just completed - trigger celebration
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
            toast.success(`🎉 Congratulations! You've achieved your "${goal.name}" goal!`);
          }, 100);
        }

        return {
          ...goal,
          currentAmount: newAmount,
        };
      }
      return goal;
    });

    setGoals(updatedGoals);
    setAddAmount("");
    setIsAddMoneyDialogOpen(false);
    toast.success(`₹${amount.toLocaleString("en-IN")} added to ${selectedGoal.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Savings Goals</h1>
              <p className="text-muted-foreground">Track and achieve your financial goals</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Savings Goal</DialogTitle>
                <DialogDescription>Set a new financial target to achieve</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="goalName">Goal Name *</Label>
                  <Input
                    id="goalName"
                    placeholder="e.g., Emergency Fund, Vacation"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount (₹) *</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="Enter target amount"
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Date *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoalDeadline}
                    onChange={(e) => setNewGoalDeadline(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSave">Enable Auto-Save</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save every month
                    </p>
                  </div>
                  <Switch
                    id="autoSave"
                    checked={newGoalAutoSave}
                    onCheckedChange={setNewGoalAutoSave}
                  />
                </div>
                {newGoalAutoSave && (
                  <div className="space-y-2">
                    <Label htmlFor="autoSaveAmount">Monthly Auto-Save Amount (₹)</Label>
                    <Input
                      id="autoSaveAmount"
                      type="number"
                      placeholder="Enter monthly amount"
                      value={newGoalAutoSaveAmount}
                      onChange={(e) => setNewGoalAutoSaveAmount(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGoal}>Create Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Saved</CardTitle>
              <CardDescription>Across all goals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{totalSaved.toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Target</CardTitle>
              <CardDescription>Combined goals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{totalTarget.toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Goals</CardTitle>
              <CardDescription>In progress</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{goals.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Savings Goals */}
        <div className="grid gap-6">
          {goals.map((goal) => {
            const percentage = (goal.currentAmount / goal.targetAmount) * 100;
            const isCompleted = goal.currentAmount >= goal.targetAmount;
            const remaining = goal.targetAmount - goal.currentAmount;
            const daysRemaining = Math.ceil(
              (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <Card key={goal.id} className={isCompleted ? "border-green-500 bg-green-50/50 dark:bg-green-950/20" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${goal.color}20` }}
                      >
                        <Target className="h-6 w-6" style={{ color: goal.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl flex items-center gap-2">
                          {goal.name}
                          {isCompleted && <Sparkles className="h-5 w-5 text-green-600" />}
                        </h3>
                        <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ₹{goal.currentAmount.toLocaleString("en-IN")} / ₹
                            {goal.targetAmount.toLocaleString("en-IN")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                          </span>
                        </div>
                        {goal.autoSave && (
                          <div className="mt-2 flex items-center gap-1 text-sm text-primary">
                            <TrendingUp className="h-4 w-4" />
                            <span>
                              Auto-saving ₹{goal.autoSaveAmount.toLocaleString("en-IN")}/month
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {!isCompleted && (
                      <Button
                        onClick={() => {
                          setSelectedGoal(goal);
                          setIsAddMoneyDialogOpen(true);
                        }}
                        size="sm"
                      >
                        Add Money
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{percentage.toFixed(1)}% Complete</span>
                      {!isCompleted && (
                        <span className="text-muted-foreground">
                          ₹{remaining.toLocaleString("en-IN")} to go
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-green-600 font-semibold">✓ Goal Achieved!</span>
                      )}
                    </div>
                    <Progress
                      value={Math.min(percentage, 100)}
                      className={`h-3 ${isCompleted ? "[&>*]:bg-green-600" : ""}`}
                    />
                  </div>

                  {isCompleted && (
                    <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                        🎉 Congratulations! You've successfully achieved this goal. Keep up the great work!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add Money Dialog */}
        <Dialog open={isAddMoneyDialogOpen} onOpenChange={setIsAddMoneyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Money to Goal</DialogTitle>
              <DialogDescription>
                {selectedGoal && `Adding to "${selectedGoal.name}"`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="addAmount">Amount (₹)</Label>
                <Input
                  id="addAmount"
                  type="number"
                  placeholder="Enter amount to add"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                />
              </div>
              {selectedGoal && (
                <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Amount:</span>
                    <span className="font-semibold">
                      ₹{selectedGoal.currentAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Adding:</span>
                    <span className="font-semibold text-primary">
                      +₹{addAmount ? parseFloat(addAmount).toLocaleString("en-IN") : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span>New Amount:</span>
                    <span className="font-bold">
                      ₹
                      {(
                        selectedGoal.currentAmount + (parseFloat(addAmount) || 0)
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddMoneyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMoney}>Add Money</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Savings Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Set realistic goals with achievable deadlines</li>
              <li>• Enable auto-save to build consistent saving habits</li>
              <li>• Break large goals into smaller milestones</li>
              <li>• Review and adjust your goals monthly</li>
              <li>• Celebrate small wins along the way!</li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SavingsGoals;
