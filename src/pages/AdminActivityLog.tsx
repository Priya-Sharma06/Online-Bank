import { useState } from "react";
import { ArrowLeft, Shield, UserCheck, Ban, AlertTriangle, FileCheck, DollarSign, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface AdminActivity {
  id: number;
  timestamp: string;
  admin: string;
  action: string;
  category: string;
  details: string;
  targetUser?: string;
  impact: "low" | "medium" | "high" | "critical";
}

const AdminActivityLog = () => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterAdmin, setFilterAdmin] = useState("all");

  const activities: AdminActivity[] = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:00",
      admin: "Admin User 1",
      action: "User Account Frozen",
      category: "user_management",
      details: "Froze user account due to suspicious activity",
      targetUser: "user@example.com",
      impact: "high",
    },
    {
      id: 2,
      timestamp: "2024-01-15 13:15:00",
      admin: "Admin User 2",
      action: "KYC Approved",
      category: "kyc",
      details: "Approved KYC documents for new user registration",
      targetUser: "newuser@example.com",
      impact: "medium",
    },
    {
      id: 3,
      timestamp: "2024-01-15 11:45:00",
      admin: "Admin User 1",
      action: "Loan Approved",
      category: "loan",
      details: "Approved personal loan application - ₹2,00,000",
      targetUser: "loanuser@example.com",
      impact: "high",
    },
    {
      id: 4,
      timestamp: "2024-01-15 10:20:00",
      admin: "Admin User 3",
      action: "Transaction Flagged",
      category: "transaction",
      details: "Flagged transaction for manual review - potential fraud",
      targetUser: "suspect@example.com",
      impact: "critical",
    },
    {
      id: 5,
      timestamp: "2024-01-14 16:30:00",
      admin: "Admin User 2",
      action: "Password Reset",
      category: "user_management",
      details: "Reset user password upon request",
      targetUser: "helpuser@example.com",
      impact: "medium",
    },
    {
      id: 6,
      timestamp: "2024-01-14 14:00:00",
      admin: "Admin User 1",
      action: "KYC Rejected",
      category: "kyc",
      details: "Rejected KYC - documents unclear",
      targetUser: "rejectuser@example.com",
      impact: "medium",
    },
    {
      id: 7,
      timestamp: "2024-01-14 11:15:00",
      admin: "Admin User 3",
      action: "System Configuration",
      category: "system",
      details: "Updated transaction limits for premium users",
      impact: "high",
    },
    {
      id: 8,
      timestamp: "2024-01-13 15:45:00",
      admin: "Admin User 2",
      action: "Loan Rejected",
      category: "loan",
      details: "Rejected loan application - insufficient credit score",
      targetUser: "loanreject@example.com",
      impact: "medium",
    },
    {
      id: 9,
      timestamp: "2024-01-13 10:00:00",
      admin: "Admin User 1",
      action: "User Account Unfrozen",
      category: "user_management",
      details: "Unfroze account after verification",
      targetUser: "verified@example.com",
      impact: "medium",
    },
  ];

  const getActivityIcon = (category: string) => {
    switch (category) {
      case "user_management":
        return UserCheck;
      case "kyc":
        return FileCheck;
      case "loan":
        return DollarSign;
      case "transaction":
        return AlertTriangle;
      case "system":
        return Shield;
      default:
        return Calendar;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "low":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "high":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400";
      case "critical":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const filteredActivities = activities.filter((activity) => {
    if (filterCategory !== "all" && activity.category !== filterCategory) {
      return false;
    }
    if (filterAdmin !== "all" && activity.admin !== filterAdmin) {
      return false;
    }
    return true;
  });

  const uniqueAdmins = Array.from(new Set(activities.map((a) => a.admin)));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Admin Activity Log</h1>
              <p className="text-muted-foreground">Audit trail of all administrative actions</p>
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
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="user_management">User Management</SelectItem>
                    <SelectItem value="kyc">KYC Actions</SelectItem>
                    <SelectItem value="loan">Loan Management</SelectItem>
                    <SelectItem value="transaction">Transaction Review</SelectItem>
                    <SelectItem value="system">System Changes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Admin User</label>
                <Select value={filterAdmin} onValueChange={setFilterAdmin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select admin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Admins</SelectItem>
                    {uniqueAdmins.map((admin) => (
                      <SelectItem key={admin} value={admin}>
                        {admin}
                      </SelectItem>
                    ))}
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
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User Actions</p>
                  <p className="text-2xl font-bold">
                    {activities.filter((a) => a.category === "user_management").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">KYC Reviews</p>
                  <p className="text-2xl font-bold">
                    {activities.filter((a) => a.category === "kyc").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loan Actions</p>
                  <p className="text-2xl font-bold">
                    {activities.filter((a) => a.category === "loan").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Critical Actions</p>
                  <p className="text-2xl font-bold">
                    {activities.filter((a) => a.impact === "critical").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
            <CardDescription>Complete audit trail of administrative activities</CardDescription>
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
                          {activity.targetUser && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Target User: {activity.targetUser}
                            </p>
                          )}
                        </div>
                        <Badge className={getImpactColor(activity.impact)}>
                          {activity.impact.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {activity.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {activity.admin}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Notice */}
        <Card className="mt-6 border-blue-500/50 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Compliance Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• All administrative actions are logged for compliance and security purposes</li>
              <li>• This audit trail is maintained for regulatory requirements (RBI guidelines)</li>
              <li>• High-impact and critical actions require additional authorization</li>
              <li>• Logs are stored securely and are tamper-proof</li>
              <li>• Unauthorized access to admin functions is automatically flagged</li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminActivityLog;
