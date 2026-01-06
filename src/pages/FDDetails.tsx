import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Calendar, 
  IndianRupee, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Info
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FDDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showMaturityDialog, setShowMaturityDialog] = useState(false);

  // Demo FD data (in real app, fetch by ID)
  const fd = {
    id: id || "FD001",
    amount: 200000,
    interestRate: 7.5,
    interestType: "Compound (Quarterly)",
    startDate: "2024-06-15",
    maturityDate: "2025-06-15",
    maturityAmount: 215000,
    interestEarned: 15000,
    status: "Active" as "Active" | "Matured" | "Closed",
    tenure: "12 Months",
    daysCompleted: 200,
    totalDays: 365,
    accountNumber: "XXXX XXXX 1234",
    nominee: "John Doe",
    autoRenewal: false
  };

  const progressPercent = (fd.daysCompleted / fd.totalDays) * 100;
  const daysRemaining = fd.totalDays - fd.daysCompleted;

  const handleWithdraw = () => {
    setShowWithdrawDialog(false);
    toast({
      title: "Withdrawal Request Submitted",
      description: "Your premature withdrawal request has been submitted. Amount will be credited after penalty deduction.",
    });
    navigate("/fd/list");
  };

  const handleMaturityWithdraw = () => {
    setShowMaturityDialog(false);
    toast({
      title: "FD Withdrawn Successfully",
      description: `₹${fd.maturityAmount.toLocaleString('en-IN')} has been credited to your account.`,
    });
    navigate("/fd/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/fd/list">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to FD List
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* FD Summary Card */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{fd.id}</CardTitle>
                      <CardDescription>Fixed Deposit Details</CardDescription>
                    </div>
                    <Badge className={
                      fd.status === "Active" 
                        ? "bg-emerald-500/20 text-emerald-500" 
                        : fd.status === "Matured"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-muted text-muted-foreground"
                    }>
                      {fd.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <IndianRupee className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Principal</p>
                      <p className="text-xl font-bold text-foreground">₹{fd.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="text-xl font-bold text-foreground">{fd.interestRate}% p.a.</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Tenure</p>
                      <p className="text-xl font-bold text-foreground">{fd.tenure}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Maturity Amount</p>
                      <p className="text-xl font-bold text-emerald-500">₹{fd.maturityAmount.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Card */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Maturity Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Days Completed</span>
                      <span className="font-medium">{fd.daysCompleted} of {fd.totalDays} days</span>
                    </div>
                    <Progress value={progressPercent} className="h-3" />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium">{fd.startDate}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{daysRemaining}</p>
                        <p className="text-sm text-muted-foreground">Days Left</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Maturity Date</p>
                        <p className="font-medium">{fd.maturityDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interest Breakdown */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Interest Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-muted-foreground">Principal Amount</span>
                      <span className="font-semibold">₹{fd.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-muted-foreground">Interest Type</span>
                      <span className="font-semibold">{fd.interestType}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-semibold">{fd.interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-muted-foreground">Total Interest Earned</span>
                      <span className="font-bold text-emerald-500">₹{fd.interestEarned.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <span className="font-medium">Maturity Amount</span>
                      <span className="text-xl font-bold text-primary">₹{fd.maturityAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms & Conditions */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Terms & Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Interest rates are subject to change as per RBI guidelines and bank policies.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Premature withdrawal is allowed with a penalty of 1% on the applicable interest rate.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      TDS will be deducted as per Income Tax rules if interest exceeds ₹40,000 (₹50,000 for senior citizens).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Loan against FD is available up to 90% of the deposit amount.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      On maturity, the amount will be automatically credited to your linked savings account.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {fd.status === "Matured" ? (
                    <Button 
                      className="w-full gradient-primary text-white"
                      onClick={() => setShowMaturityDialog(true)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Withdraw FD
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full text-amber-500 border-amber-500/50 hover:bg-amber-500/10"
                      onClick={() => setShowWithdrawDialog(true)}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Premature Withdrawal
                    </Button>
                  )}
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>

              {/* Account Details */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Linked Account</p>
                    <p className="font-medium">{fd.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nominee</p>
                    <p className="font-medium">{fd.nominee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Auto Renewal</p>
                    <p className="font-medium">{fd.autoRenewal ? "Enabled" : "Disabled"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Need Help */}
              <Card className="glass border-border/50 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Need help with your FD?</p>
                  <Button variant="outline" size="sm">Contact Support</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Premature Withdrawal Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-500">
              <AlertTriangle className="w-5 h-5" />
              Premature Withdrawal
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to withdraw this FD before maturity?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">FD ID</p>
                  <p className="font-semibold">{fd.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Principal</p>
                  <p className="font-semibold">₹{fd.amount.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <p className="text-sm text-amber-500 font-medium mb-2">⚠️ Penalty Notice</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 1% penalty on applicable interest rate</li>
                <li>• Interest will be calculated at reduced rate</li>
                <li>• Processing may take 1-2 business days</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleWithdraw}>
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Maturity Withdrawal Dialog */}
      <Dialog open={showMaturityDialog} onOpenChange={setShowMaturityDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-500">
              <CheckCircle2 className="w-5 h-5" />
              Withdraw Matured FD
            </DialogTitle>
            <DialogDescription>
              Your FD has matured. Withdraw the amount to your linked account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Total Amount to be Credited</p>
            <p className="text-3xl font-bold text-emerald-500">₹{fd.maturityAmount.toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground mt-2">Including ₹{fd.interestEarned.toLocaleString('en-IN')} interest</p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMaturityDialog(false)}>
              Cancel
            </Button>
            <Button className="gradient-primary text-white" onClick={handleMaturityWithdraw}>
              Withdraw Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FDDetails;
