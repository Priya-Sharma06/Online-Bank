import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Download,
  CreditCard,
  Settings,
  HelpCircle,
  Eye,
  Zap,
  PiggyBank,
  Landmark,
  TrendingUp,
  Target,
} from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const user = {
    name: "Rahul Kumar",
    accountNumber: "1234567890",
    balance: 45250.75,
  };

  const recentTransactions = [
    { id: 1, type: "credit", amount: 5000, description: "Salary Credit", date: "2025-01-15", balance: 45250.75 },
    { id: 2, type: "debit", amount: 1200, description: "Electricity Bill", date: "2025-01-14", balance: 40250.75 },
    { id: 3, type: "debit", amount: 500, description: "Mobile Recharge", date: "2025-01-13", balance: 39050.75 },
    { id: 4, type: "credit", amount: 2000, description: "Transfer from Priya", date: "2025-01-12", balance: 38550.75 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">Here's your financial overview</p>
          </div>

          {/* Balance Card */}
          <Card className="p-8 mb-8 gradient-hero text-white card-shadow animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm mb-1">Account Number</p>
                <p className="text-xl font-semibold">{user.accountNumber}</p>
              </div>
              <Button variant="secondary" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            <div className="mt-6">
              <p className="text-white/80 text-sm mb-1">Available Balance</p>
              <p className="text-5xl font-bold">₹{user.balance.toLocaleString('en-IN')}</p>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link to="/send-money">
              <Card className="p-6 hover-scale card-shadow cursor-pointer group">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">Send Money</span>
                </div>
              </Card>
            </Link>

            <Link to="/transactions">
              <Card className="p-6 hover-scale card-shadow cursor-pointer group">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Receipt className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">Transactions</span>
                </div>
              </Card>
            </Link>

            <Link to="/bill-payment">
              <Card className="p-6 hover-scale card-shadow cursor-pointer group">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">Pay Bills</span>
                </div>
              </Card>
            </Link>

            <Link to="/virtual-card">
              <Card className="p-6 hover-scale card-shadow cursor-pointer group">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-warning flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">Virtual Card</span>
                </div>
              </Card>
            </Link>
          </div>

          {/* Secondary Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link to="/fd/dashboard">
              <Card className="p-6 hover-scale card-shadow cursor-pointer group border-primary/20">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PiggyBank className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">Fixed Deposits</span>
                </div>
              </Card>
            </Link>

            <Link to="/loan/dashboard">
              <Card className="p-6 hover-scale card-shadow cursor-pointer group">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Landmark className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">Loans</span>
                </div>
              </Card>
            </Link>

            <Link to="/expense-tracker">
              <Card className="p-6 hover-scale card-shadow cursor-pointer group">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">Expenses</span>
                </div>
              </Card>
            </Link>

            <Link to="/savings-goals">
              <Card className="p-6 hover-scale card-shadow cursor-pointer group">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">Savings Goals</span>
                </div>
              </Card>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Transactions */}
            <div className="lg:col-span-2">
              <Card className="p-6 card-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recent Transactions</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/transactions">View All</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "credit"
                              ? "bg-success/20 text-success"
                              : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "credit" ? "text-success" : "text-destructive"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}₹
                          {transaction.amount.toLocaleString('en-IN')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ₹{transaction.balance.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <Link to="/statement">
                <Card className="p-6 card-shadow hover-scale cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Download className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Download Statement</p>
                      <p className="text-sm text-muted-foreground">Get account statement</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/profile">
                <Card className="p-6 card-shadow hover-scale cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Settings className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Profile Settings</p>
                      <p className="text-sm text-muted-foreground">Manage your account</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/support">
                <Card className="p-6 card-shadow hover-scale cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold">Help & Support</p>
                      <p className="text-sm text-muted-foreground">24/7 assistance</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
