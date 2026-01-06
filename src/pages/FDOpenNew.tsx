import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Calculator, 
  IndianRupee, 
  Calendar, 
  TrendingUp,
  ArrowLeft,
  Info,
  CheckCircle2
} from "lucide-react";

const FDOpenNew = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [amount, setAmount] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [interestType, setInterestType] = useState<string>("compound");

  // Interest rates based on tenure
  const interestRates: Record<string, number> = {
    "6": 6.5,
    "12": 7.0,
    "24": 7.25,
    "36": 7.5
  };

  // Calculated values
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [interestEarned, setInterestEarned] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);

  useEffect(() => {
    if (amount && tenure) {
      const principal = parseFloat(amount);
      const rate = interestRates[tenure] || 0;
      const years = parseInt(tenure) / 12;
      
      setInterestRate(rate);
      
      if (interestType === "compound") {
        // Compound interest: A = P(1 + r/n)^(nt), quarterly compounding
        const n = 4; // quarterly
        const maturity = principal * Math.pow(1 + (rate / 100) / n, n * years);
        setMaturityAmount(Math.round(maturity));
        setInterestEarned(Math.round(maturity - principal));
      } else {
        // Simple interest: SI = P * R * T / 100
        const interest = (principal * rate * years) / 100;
        setMaturityAmount(Math.round(principal + interest));
        setInterestEarned(Math.round(interest));
      }
    } else {
      setMaturityAmount(0);
      setInterestEarned(0);
      setInterestRate(0);
    }
  }, [amount, tenure, interestType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !tenure) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(amount) < 10000) {
      toast({
        title: "Minimum Amount Required",
        description: "Minimum FD amount is ₹10,000",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    toast({
      title: "FD Created Successfully!",
      description: `Your Fixed Deposit of ₹${parseFloat(amount).toLocaleString('en-IN')} has been created.`,
    });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <Card className="glass border-border/50 text-center py-12">
              <CardContent>
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">FD Created Successfully!</h2>
                <p className="text-muted-foreground mb-6">Your Fixed Deposit has been created successfully.</p>
                
                <div className="bg-muted/30 rounded-lg p-6 mb-6 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Principal Amount</p>
                      <p className="font-semibold text-foreground">₹{parseFloat(amount).toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tenure</p>
                      <p className="font-semibold text-foreground">{tenure} Months</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="font-semibold text-foreground">{interestRate}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Maturity Amount</p>
                      <p className="font-semibold text-emerald-500">₹{maturityAmount.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/fd/dashboard">Go to FD Dashboard</Link>
                  </Button>
                  <Button className="gradient-primary text-white" asChild>
                    <Link to="/fd/list">View My FDs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/fd/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to FD Dashboard
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Open New Fixed Deposit</CardTitle>
                  <CardDescription>Create a new FD and earn guaranteed returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Deposit Amount */}
                    <div className="space-y-2">
                      <Label htmlFor="amount">Deposit Amount (₹)</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount (Min: ₹10,000)"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-10"
                          min="10000"
                          step="1000"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Minimum: ₹10,000 | Maximum: ₹1,00,00,000</p>
                    </div>

                    {/* Tenure Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="tenure">Tenure</Label>
                      <Select value={tenure} onValueChange={setTenure}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tenure" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 Months @ 6.5% p.a.</SelectItem>
                          <SelectItem value="12">12 Months @ 7.0% p.a.</SelectItem>
                          <SelectItem value="24">24 Months @ 7.25% p.a.</SelectItem>
                          <SelectItem value="36">36 Months @ 7.5% p.a.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Interest Rate (Read-only) */}
                    <div className="space-y-2">
                      <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
                      <Input
                        id="rate"
                        type="text"
                        value={interestRate ? `${interestRate}%` : "Select tenure to view rate"}
                        readOnly
                        className="bg-muted/50"
                      />
                    </div>

                    {/* Interest Type */}
                    <div className="space-y-3">
                      <Label>Interest Calculation Type</Label>
                      <RadioGroup value={interestType} onValueChange={setInterestType} className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="compound" id="compound" />
                          <Label htmlFor="compound" className="cursor-pointer">Compound Interest (Quarterly)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="simple" id="simple" />
                          <Label htmlFor="simple" className="cursor-pointer">Simple Interest</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-primary mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">Terms & Conditions</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Interest rates are subject to change as per RBI guidelines</li>
                            <li>Premature withdrawal penalty: 1% of applicable interest rate</li>
                            <li>TDS applicable as per Income Tax rules</li>
                            <li>Senior citizens are eligible for 0.5% additional interest</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" className="flex-1" asChild>
                        <Link to="/fd/dashboard">Cancel</Link>
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 gradient-primary text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Creating FD..." : "Create FD"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Calculator Section */}
            <div>
              <Card className="glass border-border/50 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    FD Calculator
                  </CardTitle>
                  <CardDescription>Live calculation based on your inputs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Principal Amount</span>
                      <span className="font-semibold text-foreground">
                        ₹{amount ? parseFloat(amount).toLocaleString('en-IN') : '0'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Interest Rate</span>
                      <span className="font-semibold text-foreground">
                        {interestRate}% p.a.
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Tenure</span>
                      <span className="font-semibold text-foreground">
                        {tenure ? `${tenure} Months` : '-'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        Interest Earned
                      </span>
                      <span className="font-bold text-emerald-500">
                        ₹{interestEarned.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <span className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-primary" />
                        Maturity Amount
                      </span>
                      <span className="text-xl font-bold text-primary">
                        ₹{maturityAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    * Calculations are indicative and may vary slightly based on actual interest computation
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FDOpenNew;
