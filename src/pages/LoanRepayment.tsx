import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Building2, Wallet, CheckCircle } from "lucide-react";

const LoanRepayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("netbanking");

  const loanDetails = {
    loanId: "LA2025001",
    nextEMI: 9268,
    dueDate: "2025-02-01",
    outstandingAmount: 150000,
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment Successful",
      description: "Your EMI payment has been processed successfully",
    });
    setTimeout(() => {
      navigate("/loan/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Loan Repayment</h1>
            <p className="text-muted-foreground">
              Pay your EMI or make additional payments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="card-shadow animate-scale-in">
                <CardHeader>
                  <CardTitle>Make Payment</CardTitle>
                  <CardDescription>Choose your payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-6">
                    {/* Amount Selection */}
                    <div>
                      <Label htmlFor="amount">Payment Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        defaultValue={loanDetails.nextEMI}
                        min={loanDetails.nextEMI}
                        max={loanDetails.outstandingAmount}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Min: ₹{loanDetails.nextEMI.toLocaleString('en-IN')} (One EMI) | 
                        Max: ₹{loanDetails.outstandingAmount.toLocaleString('en-IN')} (Outstanding)
                      </p>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <Label className="mb-3 block">Select Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <Card className={`cursor-pointer ${paymentMethod === "netbanking" ? "border-primary" : ""}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="netbanking" id="netbanking" />
                              <Label htmlFor="netbanking" className="flex items-center gap-3 cursor-pointer flex-1">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <Building2 className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold">Net Banking</p>
                                  <p className="text-xs text-muted-foreground">Pay via your bank account</p>
                                </div>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className={`cursor-pointer ${paymentMethod === "debit" ? "border-primary" : ""}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="debit" id="debit" />
                              <Label htmlFor="debit" className="flex items-center gap-3 cursor-pointer flex-1">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                  <CreditCard className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                  <p className="font-semibold">Debit/Credit Card</p>
                                  <p className="text-xs text-muted-foreground">Pay using your card</p>
                                </div>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className={`cursor-pointer ${paymentMethod === "upi" ? "border-primary" : ""}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="upi" id="upi" />
                              <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                                  <Wallet className="w-5 h-5 text-success" />
                                </div>
                                <div>
                                  <p className="font-semibold">UPI / Wallet</p>
                                  <p className="text-xs text-muted-foreground">Pay via UPI or digital wallet</p>
                                </div>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>
                      </RadioGroup>
                    </div>

                    {/* Payment Details based on method */}
                    {paymentMethod === "debit" && (
                      <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" type="password" placeholder="123" maxLength={3} />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input id="upiId" placeholder="yourname@upi" />
                      </div>
                    )}

                    <Button type="submit" className="w-full" size="lg">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Pay Now
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Payment Summary */}
            <div>
              <Card className="card-shadow animate-scale-in sticky top-24">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                  <CardDescription>Loan ID: {loanDetails.loanId}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-primary to-accent">
                      <p className="text-white/80 text-sm mb-1">Next EMI Amount</p>
                      <p className="text-3xl font-bold text-white">
                        ₹{loanDetails.nextEMI.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Date</span>
                        <span className="font-semibold">{loanDetails.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Outstanding Balance</span>
                        <span className="font-semibold">
                          ₹{loanDetails.outstandingAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span className="font-semibold capitalize">{paymentMethod.replace("_", " ")}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="bg-success/10 rounded-lg p-3 text-sm">
                        <p className="text-success font-semibold mb-1">✓ Secure Payment</p>
                        <p className="text-muted-foreground text-xs">
                          Your payment is protected with 256-bit encryption
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

export default LoanRepayment;
