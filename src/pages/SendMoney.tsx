import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SendMoney = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate transfer
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast({
        title: "Transfer Successful!",
        description: `₹${formData.amount} sent successfully`,
      });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="container mx-auto max-w-2xl">
            <Card className="p-12 text-center animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-success" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Transfer Successful!</h2>
              <p className="text-muted-foreground mb-4">
                ₹{formData.amount} sent to account {formData.accountNumber}
              </p>
              <Button className="gradient-primary text-white" asChild>
                <Link to="/dashboard">Back to Dashboard</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-2xl">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Send Money</h1>
            <p className="text-muted-foreground">Transfer funds to another SkyBank account</p>
          </div>

          <Card className="p-8 card-shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Recipient Account Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter 10-digit account number"
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, accountNumber: e.target.value })
                  }
                  required
                  maxLength={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Input
                  id="note"
                  placeholder="Add a note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Please verify the recipient details before proceeding. This transaction cannot be
                  reversed.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full gradient-primary text-white"
                disabled={loading}
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Money
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
