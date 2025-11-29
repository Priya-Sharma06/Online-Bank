import { useState } from "react";
import { ArrowLeft, LogIn, Send, CreditCard, FileText, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: number;
  timestamp: string;
  action: string;
  category: string;
  details: string;
  ipAddress: string;
  device: string;
  status: "success" | "failed" | "pending";
}

const ActivityLog = () => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("7days");

  const activities: Activity[] = [
    {
      id: 1,
      timestamp: "2024-01-15 10:30:45",
      action: "Login",
      category: "authentication",
      details: "Successful login from Chrome browser",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
      status: "success",
    },
    {
      id: 2,
      timestamp: "2024-01-15 10:35:20",
      action: "Money Transfer",
      category: "transaction",
      details: "Transferred ₹5,000 to John Doe (****1234)",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
      status: "success",
    },
    {
      id: 3,
      timestamp: "2024-01-15 11:15:00",
      action: "Bill Payment",
      category: "transaction",
      details: "Paid electricity bill - ₹1,200",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
      status: "success",
    },
    {
      id: 4,
      timestamp: "2024-01-15 14:20:30",
      action: "Profile Update",
      category: "account",
      details: "Updated phone number",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
      status: "success",
    },
    {
      id: 5,
      timestamp: "2024-01-14 09:45:12",
      action: "Failed Login Attempt",
      category: "authentication",
      details: "Failed login - incorrect password",
      ipAddress: "203.45.67.89",
      device: "Firefox on Android",
      status: "failed",
    },
    {
      id: 6,
      timestamp: "2024-01-14 16:00:00",
      action: "Virtual Card Request",
      category: "account",
      details: "Requested new virtual debit card",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
      status: "success",
    },
    {
      id: 7,
      timestamp: "2024-01-13 12:30:45",
      action: "Statement Download",
      category: "account",
      details: "Downloaded account statement for December 2023",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
      status: "success",
    },
    {
      id: 8,
      timestamp: "2024-01-13 18:45:00",
      action: "Loan Application",
      category: "loan",
      details: "Applied for personal loan - ₹2,00,000",
      ipAddress: "192.168.1.100",
      device: "Safari on iPhone",
      status: "pending",
    },
  ];

  const getActivityIcon = (category: string) => {
    switch (category) {
      case "authentication":
        return LogIn;
      case "transaction":
        return Send;
      case "account":
        return User;
      case "loan":
        return FileText;
      default:
        return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "failed":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const filteredActivities = activities.filter((activity) => {
    if (filterCategory !== "all" && activity.category !== filterCategory) {
      return false;
    }
    return true;
  });

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
              <h1 className="text-3xl font-bold">Activity Log</h1>
              <p className="text-muted-foreground">Track all your account activities</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="authentication">Authentication</SelectItem>
                    <SelectItem value="transaction">Transactions</SelectItem>
                    <SelectItem value="account">Account Changes</SelectItem>
                    <SelectItem value="loan">Loan Activities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Time Period</label>
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24hours">Last 24 Hours</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <LogIn className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Logins</p>
                  <p className="text-2xl font-bold">
                    {activities.filter((a) => a.category === "authentication").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">
                    {activities.filter((a) => a.category === "transaction").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profile Updates</p>
                  <p className="text-2xl font-bold">
                    {activities.filter((a) => a.category === "account").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-red-500/10">
                  <LogIn className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Failed Logins</p>
                  <p className="text-2xl font-bold">
                    {activities.filter((a) => a.status === "failed").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your complete activity history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((activity) => {
                const Icon = getActivityIcon(activity.category);
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <div>
                          <h4 className="font-semibold">{activity.action}</h4>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                        </div>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {activity.timestamp}
                        </span>
                        <span>IP: {activity.ipAddress}</span>
                        <span>{activity.device}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Review your activity log regularly for any suspicious actions</li>
              <li>• If you notice any unauthorized activity, change your password immediately</li>
              <li>• Enable two-factor authentication for additional security</li>
              <li>• Be cautious of login attempts from unfamiliar locations or devices</li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ActivityLog;
