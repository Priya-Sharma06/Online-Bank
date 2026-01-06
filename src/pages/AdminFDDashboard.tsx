import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  PiggyBank, 
  TrendingUp, 
  Calendar, 
  IndianRupee,
  Users,
  AlertTriangle,
  Clock,
  Settings,
  FileText,
  Activity
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const AdminFDDashboard = () => {
  // Demo stats
  const stats = {
    totalActiveFDs: 156,
    totalFDAmount: 25000000,
    fdsMaturingSoon: 12,
    prematureWithdrawals: 5
  };

  const statusData = [
    { name: "Active", value: 156, color: "#22c55e" },
    { name: "Matured", value: 45, color: "#3b82f6" },
    { name: "Closed", value: 23, color: "#6b7280" }
  ];

  const monthlyData = [
    { month: "Jul", deposits: 8, amount: 1200000 },
    { month: "Aug", deposits: 12, amount: 1800000 },
    { month: "Sep", deposits: 15, amount: 2200000 },
    { month: "Oct", deposits: 10, amount: 1500000 },
    { month: "Nov", deposits: 18, amount: 2800000 },
    { month: "Dec", deposits: 14, amount: 2100000 }
  ];

  const recentActivity = [
    { id: "FD156", user: "Rahul Kumar", action: "Created", amount: 100000, time: "2 hours ago" },
    { id: "FD143", user: "Priya Sharma", action: "Matured", amount: 200000, time: "5 hours ago" },
    { id: "FD138", user: "Amit Patel", action: "Premature Withdrawal", amount: 50000, time: "1 day ago" },
    { id: "FD155", user: "Sneha Gupta", action: "Created", amount: 150000, time: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">FD Management Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage and monitor all fixed deposits</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline" asChild>
                <Link to="/admin/fd/rates">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Rates
                </Link>
              </Button>
              <Button className="gradient-primary text-white" asChild>
                <Link to="/admin/fd/records">
                  <FileText className="w-4 h-4 mr-2" />
                  View All FDs
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active FDs</CardTitle>
                <PiggyBank className="w-5 h-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.totalActiveFDs}</div>
                <p className="text-xs text-emerald-500 mt-1">+8 this week</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total FD Amount</CardTitle>
                <IndianRupee className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">₹{(stats.totalFDAmount / 10000000).toFixed(1)}Cr</div>
                <p className="text-xs text-muted-foreground mt-1">Locked in deposits</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Maturing Soon</CardTitle>
                <Clock className="w-5 h-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-500">{stats.fdsMaturingSoon}</div>
                <p className="text-xs text-muted-foreground mt-1">In next 30 days</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Premature Withdrawals</CardTitle>
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">{stats.prematureWithdrawals}</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* FD Status Distribution */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>FD Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {statusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Deposits Chart */}
            <Card className="lg:col-span-2 glass border-border/50">
              <CardHeader>
                <CardTitle>Monthly FD Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip 
                        formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, 'Amount']}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                      />
                      <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recent FD Activity
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/fd/audit-logs">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium text-foreground">{activity.user}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.id} - {activity.action}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">₹{activity.amount.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Link to="/admin/fd/records" className="group">
                  <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
                    <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-foreground">All FD Records</p>
                    <p className="text-xs text-muted-foreground">View & manage</p>
                  </div>
                </Link>
                <Link to="/admin/fd/rates" className="group">
                  <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
                    <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <p className="font-medium text-foreground">Interest Rates</p>
                    <p className="text-xs text-muted-foreground">Configure rates</p>
                  </div>
                </Link>
                <Link to="/admin/fd/audit-logs" className="group">
                  <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
                    <Activity className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="font-medium text-foreground">Audit Logs</p>
                    <p className="text-xs text-muted-foreground">Track changes</p>
                  </div>
                </Link>
                <Link to="/admin/users" className="group">
                  <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
                    <Users className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="font-medium text-foreground">Customers</p>
                    <p className="text-xs text-muted-foreground">Manage users</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminFDDashboard;
