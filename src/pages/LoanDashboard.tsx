import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Clock,
  CheckCircle,
  Wallet,
  TrendingUp,
  ArrowRight,
  Gift,
  Shield,
  Calendar,
} from "lucide-react";

const LoanDashboard = () => {
  const loanEligibility = {
    maxAmount: 500000,
    interestRate: 10.5,
    tenure: 60,
    emiAmount: 10624,
  };

  const existingLoans = [
    {
      id: 1,
      type: "Personal Loan",
      amount: 200000,
      outstandingAmount: 150000,
      emi: 8500,
      nextEmiDate: "2025-02-01",
      status: "Active",
      progress: 25,
    },
  ];

  const preApprovedOffers = [
    {
      id: 1,
      title: "Pre-Approved Personal Loan",
      amount: 300000,
      rate: 9.99,
      tenure: 48,
      badge: "Limited Time",
      color: "bg-accent",
    },
    {
      id: 2,
      title: "Special Festival Offer",
      amount: 150000,
      rate: 10.25,
      tenure: 36,
      badge: "Zero Processing Fee",
      color: "bg-success",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Loan Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your loans and explore pre-approved offers
            </p>
          </div>

          {/* Eligibility Card */}
          <Card className="mb-8 gradient-hero text-white card-shadow animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">Loan Eligibility</CardTitle>
                  <CardDescription className="text-white/80">
                    Based on your credit score and income
                  </CardDescription>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-white/80 text-sm mb-1">Maximum Amount</p>
                  <p className="text-2xl font-bold">₹{loanEligibility.maxAmount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">Interest Rate</p>
                  <p className="text-2xl font-bold">{loanEligibility.interestRate}% p.a.</p>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">Tenure</p>
                  <p className="text-2xl font-bold">{loanEligibility.tenure} months</p>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">EMI Starting From</p>
                  <p className="text-2xl font-bold">₹{loanEligibility.emiAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <div className="mt-6">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/loan/apply">
                    Apply for New Loan <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Existing Loans */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Your Active Loans</h2>
              {existingLoans.map((loan) => (
                <Card key={loan.id} className="mb-4 card-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{loan.type}</CardTitle>
                        <CardDescription>Loan Amount: ₹{loan.amount.toLocaleString('en-IN')}</CardDescription>
                      </div>
                      <Badge className="bg-success">{loan.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Outstanding Amount</span>
                          <span className="font-semibold">₹{loan.outstandingAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <Progress value={loan.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{loan.progress}% Paid</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Monthly EMI</p>
                            <p className="font-semibold">₹{loan.emi.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Next EMI Date</p>
                            <p className="font-semibold">{loan.nextEmiDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link to="/loan/emi-schedule">View EMI Schedule</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link to="/loan/repayment">Pay Now</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Link to="/loan/status">
                <Card className="p-6 card-shadow hover-scale cursor-pointer border-dashed border-2">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <FileText className="w-5 h-5" />
                    <span>View All Loan Applications</span>
                  </div>
                </Card>
              </Link>
            </div>

            {/* Quick Actions & Offers */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              
              <Link to="/loan/apply">
                <Card className="p-6 card-shadow hover-scale cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">New Application</p>
                      <p className="text-sm text-muted-foreground">Apply for loan</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/loan/status">
                <Card className="p-6 card-shadow hover-scale cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Application Status</p>
                      <p className="text-sm text-muted-foreground">Track your loan</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/loan/prepayment">
                <Card className="p-6 card-shadow hover-scale cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold">Prepayment</p>
                      <p className="text-sm text-muted-foreground">Pay in advance</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Pre-Approved Offers</h3>
                {preApprovedOffers.map((offer) => (
                  <Card key={offer.id} className="mb-3 card-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Gift className="w-5 h-5 text-accent" />
                          <CardTitle className="text-base">{offer.title}</CardTitle>
                        </div>
                        <Badge className={offer.color}>{offer.badge}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount</span>
                          <span className="font-semibold">₹{offer.amount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rate</span>
                          <span className="font-semibold">{offer.rate}% p.a.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tenure</span>
                          <span className="font-semibold">{offer.tenure} months</span>
                        </div>
                      </div>
                      <Button asChild className="w-full mt-4" size="sm">
                        <Link to="/loan/apply">Apply Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDashboard;
