import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Calculator } from "lucide-react";

const LoanApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("36");
  const [purpose, setPurpose] = useState("");

  const calculateEMI = () => {
    if (!loanAmount) return 0;
    const principal = parseFloat(loanAmount);
    const monthlyRate = 10.5 / 12 / 100;
    const months = parseInt(tenure);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "We're reviewing your application. You'll hear from us soon!",
    });
    setTimeout(() => {
      navigate("/loan/documents");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Loan Application</h1>
            <p className="text-muted-foreground">
              Complete the form below to apply for your loan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card className="card-shadow animate-scale-in">
                <CardHeader>
                  <CardTitle>Personal Loan Application</CardTitle>
                  <CardDescription>Fill in your loan requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="10-digit mobile number"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <Input
                        id="panNumber"
                        placeholder="ABCDE1234F"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        placeholder="Enter loan amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        min="10000"
                        max="500000"
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Min: ₹10,000 | Max: ₹5,00,000
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="tenure">Loan Tenure</Label>
                      <Select value={tenure} onValueChange={setTenure}>
                        <SelectTrigger id="tenure">
                          <SelectValue placeholder="Select tenure" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 Months</SelectItem>
                          <SelectItem value="24">24 Months</SelectItem>
                          <SelectItem value="36">36 Months</SelectItem>
                          <SelectItem value="48">48 Months</SelectItem>
                          <SelectItem value="60">60 Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="purpose">Loan Purpose</Label>
                      <Select value={purpose} onValueChange={setPurpose}>
                        <SelectTrigger id="purpose">
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal Use</SelectItem>
                          <SelectItem value="medical">Medical Emergency</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="home">Home Renovation</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        placeholder="Enter monthly income"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="employment">Employment Type</Label>
                      <Select>
                        <SelectTrigger id="employment">
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salaried">Salaried</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="business">Business Owner</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Continue to Document Upload <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* EMI Calculator */}
            <div>
              <Card className="card-shadow animate-scale-in sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    EMI Calculator
                  </CardTitle>
                  <CardDescription>Estimated monthly payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-primary to-accent">
                      <p className="text-white/80 text-sm mb-1">Monthly EMI</p>
                      <p className="text-3xl font-bold text-white">
                        ₹{calculateEMI().toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-semibold">
                          ₹{loanAmount ? parseFloat(loanAmount).toLocaleString('en-IN') : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-semibold">10.5% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tenure</span>
                        <span className="font-semibold">{tenure} months</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-muted-foreground">Total Amount</span>
                        <span className="font-semibold">
                          ₹{(calculateEMI() * parseInt(tenure)).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Interest</span>
                        <span className="font-semibold text-accent">
                          ₹{((calculateEMI() * parseInt(tenure)) - parseFloat(loanAmount || "0")).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        * This is an estimated calculation. Actual EMI may vary based on processing fees and other charges.
                      </p>
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

export default LoanApplication;
