import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, AlertCircle, CheckCircle, Clock, Users } from "lucide-react";

const AdminLoanDashboard = () => {
  const stats = {
    totalApplications: 1245,
    pending: 87,
    approved: 1023,
    rejected: 135,
    totalDisbursed: 15750000,
    avgProcessingTime: "2.5 days",
  };

  const recentApplications = [
    {
      id: "LA2025045",
      applicantName: "Rahul Sharma",
      amount: 250000,
      purpose: "Personal",
      appliedDate: "2025-01-23",
      status: "Pending",
      priority: "high",
    },
    {
      id: "LA2025044",
      applicantName: "Priya Patel",
      amount: 500000,
      purpose: "Business",
      appliedDate: "2025-01-23",
      status: "Under Review",
      priority: "medium",
    },
    {
      id: "LA2025043",
      applicantName: "Amit Kumar",
      amount: 150000,
      purpose: "Education",
      appliedDate: "2025-01-22",
      status: "Approved",
      priority: "low",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Loan Management Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage all loan applications
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Total Applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{stats.totalApplications}</p>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Pending Review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-warning">{stats.pending}</p>
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Approved This Month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-success">{stats.approved}</p>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Rejected Applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-destructive">{stats.rejected}</p>
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Total Disbursed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">₹{(stats.totalDisbursed / 10000000).toFixed(1)}Cr</p>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Avg. Processing Time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{stats.avgProcessingTime}</p>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/admin/loan/applications">
            <Card className="card-shadow hover-scale cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">View All Applications</p>
                    <p className="text-sm text-muted-foreground">Review pending loans</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="card-shadow hover-scale cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold">Disbursement Queue</p>
                  <p className="text-sm text-muted-foreground">Process approved loans</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow hover-scale cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Customer Analytics</p>
                  <p className="text-sm text-muted-foreground">View insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card className="card-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Loan Applications</CardTitle>
                <CardDescription>Latest applications requiring attention</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin/loan/applications">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold">{app.applicantName}</p>
                      <Badge variant="outline" className="text-xs">{app.id}</Badge>
                      {app.priority === "high" && (
                        <Badge className="bg-destructive text-xs">High Priority</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>₹{app.amount.toLocaleString('en-IN')}</span>
                      <span>•</span>
                      <span>{app.purpose}</span>
                      <span>•</span>
                      <span>{app.appliedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        app.status === "Approved"
                          ? "bg-success"
                          : app.status === "Pending"
                          ? "bg-warning"
                          : "bg-accent"
                      }
                    >
                      {app.status}
                    </Badge>
                    <Button asChild size="sm">
                      <Link to={`/admin/loan/applications?id=${app.id}`}>
                        Review
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoanDashboard;
