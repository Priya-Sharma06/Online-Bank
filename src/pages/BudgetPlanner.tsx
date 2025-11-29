import { useState } from "react";
import { ArrowLeft, Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Budget {
  id: number;
  category: string;
  limit: number;
  spent: number;
  color: string;
}

const BudgetPlanner = () => {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: 1, category: "Food & Dining", limit: 20000, spent: 15000, color: "hsl(var(--chart-1))" },
    { id: 2, category: "Travel", limit: 10000, spent: 8000, color: "hsl(var(--chart-2))" },
    { id: 3, category: "Bills & Utilities", limit: 15000, spent: 12000, color: "hsl(var(--chart-3))" },
    { id: 4, category: "Shopping", limit: 15000, spent: 18000, color: "hsl(var(--chart-4))" },
    { id: 5, category: "Others", limit: 5000, spent: 5000, color: "hsl(var(--chart-5))" },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newLimit, setNewLimit] = useState("");

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const overallProgress = (totalSpent / totalBudget) * 100;

  const handleAddBudget = () => {
    if (!newCategory || !newLimit) {
      toast.error("Please fill all fields");
      return;
    }

    const newBudget: Budget = {
      id: Date.now(),
      category: newCategory,
      limit: parseFloat(newLimit),
      spent: 0,
      color: `hsl(var(--chart-${(budgets.length % 5) + 1}))`,
    };

    setBudgets([...budgets, newBudget]);
    setNewCategory("");
    setNewLimit("");
    setIsAddDialogOpen(false);
    toast.success("Budget added successfully!");
  };

  const handleDeleteBudget = (id: number) => {
    setBudgets(budgets.filter((b) => b.id !== id));
    toast.success("Budget deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/expense-tracker">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Budget Planner</h1>
              <p className="text-muted-foreground">Set and manage your spending limits</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Budget</DialogTitle>
                <DialogDescription>Set a spending limit for a category</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Bills & Utilities">Bills & Utilities</SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit">Monthly Limit (₹)</Label>
                  <Input
                    id="limit"
                    type="number"
                    placeholder="Enter amount"
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBudget}>Add Budget</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overall Budget Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Budget</CardTitle>
              <CardDescription>Monthly limit</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{totalBudget.toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Spent</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{totalSpent.toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Remaining</CardTitle>
              <CardDescription>Available balance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${totalSpent > totalBudget ? "text-destructive" : "text-green-600"}`}>
                ₹{Math.abs(totalBudget - totalSpent).toLocaleString("en-IN")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overall Budget Usage</CardTitle>
            <CardDescription>{overallProgress.toFixed(1)}% of total budget used</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={Math.min(overallProgress, 100)} className="h-3" />
            {overallProgress > 100 && (
              <div className="mt-4 flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-semibold">
                  You've exceeded your total budget by ₹{(totalSpent - totalBudget).toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category-wise Budgets */}
        <div className="grid gap-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100;
            const isOverBudget = budget.spent > budget.limit;

            return (
              <Card key={budget.id} className={isOverBudget ? "border-destructive" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: budget.color }}
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{budget.category}</h3>
                        <p className="text-sm text-muted-foreground">
                          ₹{budget.spent.toLocaleString("en-IN")} of ₹{budget.limit.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteBudget(budget.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{percentage.toFixed(1)}% used</span>
                      {isOverBudget && (
                        <span className="text-destructive font-semibold">
                          Over by ₹{(budget.spent - budget.limit).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <Progress
                      value={Math.min(percentage, 100)}
                      className={`h-2 ${isOverBudget ? "[&>*]:bg-destructive" : ""}`}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Budget Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Review and adjust your budgets monthly based on spending patterns</li>
              <li>• Set alerts to notify you when you reach 80% of any budget</li>
              <li>• Try to keep some buffer for unexpected expenses</li>
              <li>• Track daily spending to stay within your monthly limits</li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BudgetPlanner;
