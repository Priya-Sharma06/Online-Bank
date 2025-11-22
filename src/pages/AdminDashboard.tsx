import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck, CreditCard, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "12,453",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Pending KYC",
      value: "248",
      change: "+5.2%",
      icon: FileCheck,
      color: "text-yellow-500",
    },
    {
      title: "Active Cards",
      value: "9,821",
      change: "+8.3%",
      icon: CreditCard,
      color: "text-green-500",
    },
    {
      title: "Flagged Transactions",
      value: "32",
      change: "-2.1%",
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ];

  const quickActions = [
    { title: "Manage Users", href: "/admin/users", icon: Users },
    { title: "KYC Approvals", href: "/admin/kyc", icon: FileCheck },
    { title: "Transactions", href: "/admin/transactions", icon: Activity },
    { title: "Bill Integrations", href: "/admin/bills", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor SkyBank operations</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="glass-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage key administrative functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  asChild
                >
                  <Link to={action.href}>
                    <action.icon className="w-6 h-6" />
                    <span>{action.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New user registration", user: "Rahul Kumar", time: "2 minutes ago" },
                { action: "KYC document submitted", user: "Priya Sharma", time: "15 minutes ago" },
                { action: "Large transaction detected", user: "Amit Patel", time: "1 hour ago" },
                { action: "Account frozen", user: "Admin Action", time: "2 hours ago" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
