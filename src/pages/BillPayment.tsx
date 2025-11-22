import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Zap, Smartphone, Lightbulb, Droplet, Flame, Wifi, Tv, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BillPayment = () => {
  const { toast } = useToast();

  const bills = [
    { icon: Smartphone, name: "Mobile Recharge", amount: 499, color: "bg-primary" },
    { icon: Lightbulb, name: "Electricity Bill", amount: 1200, color: "bg-warning" },
    { icon: Droplet, name: "Water Bill", amount: 350, color: "bg-accent" },
    { icon: Flame, name: "Gas Bill", amount: 800, color: "bg-destructive" },
    { icon: Wifi, name: "Broadband", amount: 699, color: "bg-success" },
    { icon: Tv, name: "DTH Recharge", amount: 300, color: "bg-primary" },
    { icon: CreditCard, name: "Loan EMI", amount: 5000, color: "bg-accent" },
  ];

  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);

  const handlePayAll = () => {
    toast({
      title: "Payment Successful!",
      description: `All bills paid successfully. Total: ₹${totalAmount.toLocaleString('en-IN')}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-6xl">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Bill Payment Hub</h1>
            <p className="text-muted-foreground">Pay all your bills in one place</p>
          </div>

          {/* Pay All Section */}
          <Card className="p-6 mb-8 gradient-hero text-white card-shadow">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">One-Click Pay All Bills</h2>
                <p className="text-white/90 mb-4">
                  Total monthly bills: ₹{totalAmount.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-white/80">{bills.length} pending bills</p>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8"
                onClick={handlePayAll}
              >
                <Zap className="w-5 h-5 mr-2" />
                Pay All Now
              </Button>
            </div>
          </Card>

          {/* Individual Bills */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bills.map((bill, index) => (
              <Card key={index} className="p-6 card-shadow hover-scale cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${bill.color} flex items-center justify-center`}>
                    <bill.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{bill.name}</h3>
                    <p className="text-sm text-muted-foreground">Monthly</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">₹{bill.amount.toLocaleString('en-IN')}</p>
                  <Button size="sm" variant="outline">
                    Pay Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Add New Biller */}
          <Card className="p-8 text-center mt-8 border-dashed border-2">
            <h3 className="font-semibold mb-2">Add New Biller</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect more billers for automatic payments
            </p>
            <Button variant="outline">Add Biller</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillPayment;
