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
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const FDDashboard = () => {
  // Demo data
  const fdStats = {
    totalActiveFDs: 3,
    totalInvested: 500000,
    totalInterestEarned: 32500,
    totalMaturityAmount: 532500
  };

  const recentFDs = [
    { id: "FD001", amount: 200000, rate: 7.5, maturityDate: "2025-06-15", status: "Active" },
    { id: "FD002", amount: 150000, rate: 7.25, maturityDate: "2025-12-20", status: "Active" },
    { id: "FD003", amount: 150000, rate: 7.0, maturityDate: "2024-03-10", status: "Matured" },
  ];

  const upcomingMaturities = [
    { id: "FD001", amount: 200000, maturityDate: "2025-06-15", daysLeft: 160 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Fixed Deposits</h1>
              <p className="text-muted-foreground mt-1">Manage your fixed deposit investments</p>
            </div>
            <Button className="mt-4 md:mt-0 gradient-primary text-white" asChild>
              <Link to="/fd/open-new">
                <Plus className="w-4 h-4 mr-2" />
                Open New FD
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active FDs</CardTitle>
                <PiggyBank className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{fdStats.totalActiveFDs}</div>
                <p className="text-xs text-muted-foreground mt-1">Total active deposits</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
                <IndianRupee className="w-5 h-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">₹{fdStats.totalInvested.toLocaleString('en-IN')}</div>
                <p className="text-xs text-muted-foreground mt-1">Principal amount</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Interest Earned</CardTitle>
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-500">₹{fdStats.totalInterestEarned.toLocaleString('en-IN')}</div>
                <p className="text-xs text-muted-foreground mt-1">Total interest earned</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Maturity Amount</CardTitle>
                <Calendar className="w-5 h-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">₹{fdStats.totalMaturityAmount.toLocaleString('en-IN')}</div>
                <p className="text-xs text-muted-foreground mt-1">Expected returns</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent FDs */}
            <Card className="lg:col-span-2 glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Fixed Deposits</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/fd/list">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFDs.map((fd) => (
                    <div key={fd.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          fd.status === 'Active' ? 'bg-emerald-500/20' : 'bg-blue-500/20'
                        }`}>
                          {fd.status === 'Active' ? (
                            <Clock className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{fd.id}</p>
                          <p className="text-sm text-muted-foreground">₹{fd.amount.toLocaleString('en-IN')} @ {fd.rate}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          fd.status === 'Active' 
                            ? 'bg-emerald-500/20 text-emerald-500' 
                            : 'bg-blue-500/20 text-blue-500'
                        }`}>
                          {fd.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Matures: {fd.maturityDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Maturities */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Upcoming Maturities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMaturities.length > 0 ? (
                    upcomingMaturities.map((fd) => (
                      <div key={fd.id} className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-foreground">{fd.id}</span>
                          <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full">
                            {fd.daysLeft} days left
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Amount: ₹{fd.amount.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-muted-foreground">Matures: {fd.maturityDate}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No upcoming maturities</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Link to="/fd/open-new" className="group">
              <Card className="glass border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Open New FD</h3>
                    <p className="text-sm text-muted-foreground">Start a new fixed deposit</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/fd/list" className="group">
              <Card className="glass border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                    <PiggyBank className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">My FDs</h3>
                    <p className="text-sm text-muted-foreground">View all your deposits</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/fd/list" className="group">
              <Card className="glass border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Interest Rates</h3>
                    <p className="text-sm text-muted-foreground">Check current FD rates</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FDDashboard;
