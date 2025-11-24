import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, AlertCircle, CheckCircle, Calculator } from "lucide-react";

const LoanPrepayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prepaymentType, setPrepaymentType] = useState("partial");
  const [prepayAmount, setPrepayAmount] = useState("");

  const loanDetails = {
    loanId: "LA2025001",
    outstandingAmount: 150000,
    remainingTenure: 21,
    currentEMI: 9268,
    interestRate: 10.5,
  };

  const calculateSavings = () => {
    if (!prepayAmount || parseFloat(prepayAmount) <= 0) return { saved: 0, newEMI: loanDetails.currentEMI };
    
    const prepay = parseFloat(prepayAmount);
    const newPrincipal = loanDetails.outstandingAmount - prepay;
    const monthlyRate = loanDetails.interestRate / 12 / 100;
    const months = loanDetails.remainingTenure;
    
    const newEMI = (newPrincipal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
    
    const oldTotal = loanDetails.currentEMI * loanDetails.remainingTenure;
    const newTotal = newEMI * months;
    const saved = oldTotal - newTotal - prepay;
    
    return { saved: Math.round(saved), newEMI: Math.round(newEMI) };
  };

  const handlePrepayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Prepayment Successful",
      description: `₹${parseFloat(prepayAmount).toLocaleString('en-IN')} has been applied to your loan`,
    });
    setTimeout(() => {
      navigate("/loan/dashboard");
    }, 1500);
  };

  const savings = calculateSavings();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Loan Prepayment</h1>
            <p className="text-muted-foreground">
              Pay extra towards your loan and save on interest
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Prepayment Form */}
            <div className="lg:col-span-2">
              <Card className="card-shadow animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Prepay Your Loan
                  </CardTitle>
                  <CardDescription>Reduce your interest burden by prepaying</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePrepayment} className="space-y-6">
                    {/* Prepayment Type */}
                    <div>
                      <Label className="mb-3 block">Prepayment Type</Label>
                      <RadioGroup value={prepaymentType} onValueChange={setPrepaymentType}>
                        <Card className={`cursor-pointer ${prepaymentType === "partial" ? "border-primary" : ""}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="partial" id="partial" className="mt-1" />
                              <Label htmlFor="partial" className="cursor-pointer flex-1">
                                <p className="font-semibold mb-1">Partial Prepayment</p>
                                <p className="text-xs text-muted-foreground">
                                  Pay a portion of the outstanding amount. EMI will be reduced while tenure remains same.
                                </p>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className={`cursor-pointer ${prepaymentType === "full" ? "border-primary" : ""}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="full" id="full" className="mt-1" />
                              <Label htmlFor="full" className="cursor-pointer flex-1">
                                <p className="font-semibold mb-1">Full Prepayment (Foreclosure)</p>
                                <p className="text-xs text-muted-foreground">
                                  Close your loan by paying the entire outstanding amount.
                                </p>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>
                      </RadioGroup>
                    </div>

                    {/* Prepayment Amount */}
                    <div>
                      <Label htmlFor="prepayAmount">
                        {prepaymentType === "full" ? "Total Amount to Pay" : "Prepayment Amount"}
                      </Label>
                      <Input
                        id="prepayAmount"
                        type="number"
                        placeholder="Enter amount"
                        value={prepaymentType === "full" ? loanDetails.outstandingAmount : prepayAmount}
                        onChange={(e) => setPrepayAmount(e.target.value)}
                        disabled={prepaymentType === "full"}
                        min={prepaymentType === "partial" ? "1000" : undefined}
                        max={prepaymentType === "partial" ? loanDetails.outstandingAmount : undefined}
                        required
                      />
                      {prepaymentType === "partial" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Min: ₹1,000 | Max: ₹{loanDetails.outstandingAmount.toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>

                    {/* Benefits Display */}
                    {prepaymentType === "partial" && prepayAmount && parseFloat(prepayAmount) > 0 && (
                      <div className="space-y-3 p-4 bg-success/10 rounded-lg border border-success/20">
                        <div className="flex items-center gap-2 text-success">
                          <Calculator className="w-5 h-5" />
                          <p className="font-semibold">Prepayment Benefits</p>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>New Monthly EMI</span>
                            <span className="font-semibold">₹{savings.newEMI.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>EMI Reduction</span>
                            <span className="font-semibold text-success">
                              ₹{(loanDetails.currentEMI - savings.newEMI).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-success/20">
                            <span>Total Interest Saved</span>
                            <span className="font-semibold text-success">
                              ₹{Math.max(0, savings.saved).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Important Notes */}
                    <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                      <div className="flex items-start gap-2 text-warning mb-2">
                        <AlertCircle className="w-5 h-5 mt-0.5" />
                        <p className="font-semibold">Important Information</p>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                        <li>• No prepayment charges for this loan</li>
                        <li>• Prepayment will be effective from next EMI cycle</li>
                        <li>• You'll receive an updated EMI schedule via email</li>
                        {prepaymentType === "full" && (
                          <li>• Foreclosure certificate will be issued within 7 days</li>
                        )}
                      </ul>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm Prepayment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Loan Summary */}
            <div>
              <Card className="card-shadow animate-scale-in sticky top-24">
                <CardHeader>
                  <CardTitle>Loan Summary</CardTitle>
                  <CardDescription>Current loan details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-primary to-accent">
                      <p className="text-white/80 text-sm mb-1">Outstanding Amount</p>
                      <p className="text-3xl font-bold text-white">
                        ₹{loanDetails.outstandingAmount.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan ID</span>
                        <span className="font-semibold">{loanDetails.loanId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current EMI</span>
                        <span className="font-semibold">
                          ₹{loanDetails.currentEMI.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Remaining Tenure</span>
                        <span className="font-semibold">{loanDetails.remainingTenure} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-semibold">{loanDetails.interestRate}% p.a.</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="bg-accent/10 rounded-lg p-3 text-sm">
                        <p className="text-accent font-semibold mb-1">💡 Pro Tip</p>
                        <p className="text-muted-foreground text-xs">
                          Prepaying early in your loan tenure saves more interest as most of your initial EMIs go towards interest.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanPrepayment;
