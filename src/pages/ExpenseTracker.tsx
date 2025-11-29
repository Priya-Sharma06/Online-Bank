import { useState } from "react";
import { ArrowLeft, Download, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ExpenseTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState("current");

  // Mock data for monthly spending
  const monthlyData = [
    { month: "Jan", amount: 45000 },
    { month: "Feb", amount: 52000 },
    { month: "Mar", amount: 48000 },
    { month: "Apr", amount: 61000 },
    { month: "May", amount: 55000 },
    { month: "Jun", amount: 58000 },
  ];

  // Mock data for category-wise spending
  const categoryData = [
    { name: "Food & Dining", value: 15000, color: "hsl(var(--chart-1))" },
    { name: "Travel", value: 8000, color: "hsl(var(--chart-2))" },
    { name: "Bills & Utilities", value: 12000, color: "hsl(var(--chart-3))" },
    { name: "Shopping", value: 18000, color: "hsl(var(--chart-4))" },
    { name: "Others", value: 5000, color: "hsl(var(--chart-5))" },
  ];

  const totalExpenses = categoryData.reduce((sum, item) => sum + item.value, 0);
  const currentBudget = 65000;
  const budgetUsed = (totalExpenses / currentBudget) * 100;
  const isOverBudget = totalExpenses > currentBudget;

  // Mock recent transactions with categories
  const transactions = [
    { id: 1, date: "2024-01-15", description: "Swiggy Order", category: "Food & Dining", amount: 450 },
    { id: 2, date: "2024-01-14", description: "Uber Ride", category: "Travel", amount: 280 },
    { id: 3, date: "2024-01-13", description: "Electricity Bill", category: "Bills & Utilities", amount: 1200 },
    { id: 4, date: "2024-01-12", description: "Amazon Shopping", category: "Shopping", amount: 3500 },
    { id: 5, date: "2024-01-11", description: "Zomato Order", category: "Food & Dining", amount: 650 },
    { id: 6, date: "2024-01-10", description: "Spotify Subscription", category: "Others", amount: 199 },
  ];

  const handleDownloadReport = () => {
    toast.success("Expense report downloaded successfully!");
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
              <h1 className="text-3xl font-bold">Expense Tracker</h1>
              <p className="text-muted-foreground">Track and analyze your spending patterns</p>
            </div>
          </div>
          <Button onClick={handleDownloadReport} className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Budget Alert */}
        {isOverBudget && (
          <Card className="mb-6 border-destructive bg-destructive/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-destructive" />
                <p className="text-destructive font-semibold">
                  Budget Alert: You've exceeded your monthly budget by ₹{(totalExpenses - currentBudget).toLocaleString("en-IN")}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Budget Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Spent</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{totalExpenses.toLocaleString("en-IN")}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {isOverBudget ? (
                  <span className="text-destructive flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Over budget
                  </span>
                ) : (
                  <span className="text-green-600 flex items-center gap-1">
                    <TrendingDown className="h-4 w-4" />
                    Within budget
                  </span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget</CardTitle>
              <CardDescription>Set limit</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{currentBudget.toLocaleString("en-IN")}</p>
              <Link to="/budget-planner">
                <Button variant="link" className="px-0 mt-2">
                  Adjust Budget →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Usage</CardTitle>
              <CardDescription>Percentage spent</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{budgetUsed.toFixed(1)}%</p>
              <div className="w-full bg-secondary rounded-full h-2 mt-4">
                <div
                  className={`h-2 rounded-full transition-all ${
                    isOverBudget ? "bg-destructive" : "bg-primary"
                  }`}
                  style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Spending Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending Trend</CardTitle>
              <CardDescription>Last 6 months overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Amount (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category-wise Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Category-wise Breakdown</CardTitle>
              <CardDescription>Current month distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="text-sm font-semibold">₹{category.value.toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions with Categories */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Categorized Transactions</CardTitle>
                <CardDescription>Recent expenses with categories</CardDescription>
              </div>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Month</SelectItem>
                  <SelectItem value="last">Last Month</SelectItem>
                  <SelectItem value="last2">2 Months Ago</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Description</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-right py-3 px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="border-b">
                      <td className="py-3 px-4 text-muted-foreground">{txn.date}</td>
                      <td className="py-3 px-4">{txn.description}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{txn.category}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right text-destructive font-semibold">
                        -₹{txn.amount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ExpenseTracker;
