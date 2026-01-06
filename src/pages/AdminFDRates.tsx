import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  TrendingUp, 
  Save,
  AlertCircle,
  Info
} from "lucide-react";

interface TenureRate {
  tenure: string;
  months: number;
  rate: number;
  seniorRate: number;
  enabled: boolean;
}

const AdminFDRates = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [rates, setRates] = useState<TenureRate[]>([
    { tenure: "6 Months", months: 6, rate: 6.5, seniorRate: 7.0, enabled: true },
    { tenure: "12 Months", months: 12, rate: 7.0, seniorRate: 7.5, enabled: true },
    { tenure: "24 Months", months: 24, rate: 7.25, seniorRate: 7.75, enabled: true },
    { tenure: "36 Months", months: 36, rate: 7.5, seniorRate: 8.0, enabled: true },
    { tenure: "60 Months", months: 60, rate: 7.75, seniorRate: 8.25, enabled: false },
  ]);

  const handleRateChange = (index: number, field: 'rate' | 'seniorRate', value: string) => {
    const newRates = [...rates];
    newRates[index][field] = parseFloat(value) || 0;
    setRates(newRates);
  };

  const handleToggleEnabled = (index: number) => {
    const newRates = [...rates];
    newRates[index].enabled = !newRates[index].enabled;
    setRates(newRates);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    toast({
      title: "Rates Updated",
      description: "FD interest rates have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/admin/fd/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to FD Dashboard
            </Link>
          </Button>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">FD Interest Rates</h1>
              <p className="text-muted-foreground mt-1">Configure interest rates for different tenures</p>
            </div>
            <Button 
              className="mt-4 md:mt-0 gradient-primary text-white"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {/* Info Alert */}
          <Card className="glass border-primary/30 bg-primary/5 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Rate Configuration Guidelines</p>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• Senior citizen rates automatically include 0.5% additional interest</li>
                    <li>• Disabled tenures will not be available for new FD creation</li>
                    <li>• Existing FDs will continue at their original rates until maturity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rates Configuration */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Interest Rate Configuration
              </CardTitle>
              <CardDescription>Set interest rates for each tenure period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-muted-foreground">
                  <div className="col-span-3">Tenure</div>
                  <div className="col-span-3">Regular Rate (%)</div>
                  <div className="col-span-3">Senior Citizen Rate (%)</div>
                  <div className="col-span-3">Status</div>
                </div>

                {/* Rate Rows */}
                {rates.map((rate, index) => (
                  <div 
                    key={rate.tenure} 
                    className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg ${
                      rate.enabled ? 'bg-muted/30' : 'bg-muted/10 opacity-60'
                    }`}
                  >
                    <div className="col-span-3">
                      <p className="font-medium text-foreground">{rate.tenure}</p>
                      <p className="text-xs text-muted-foreground">{rate.months} months</p>
                    </div>
                    <div className="col-span-3">
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.25"
                          min="0"
                          max="15"
                          value={rate.rate}
                          onChange={(e) => handleRateChange(index, 'rate', e.target.value)}
                          className="pr-8"
                          disabled={!rate.enabled}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.25"
                          min="0"
                          max="15"
                          value={rate.seniorRate}
                          onChange={(e) => handleRateChange(index, 'seniorRate', e.target.value)}
                          className="pr-8"
                          disabled={!rate.enabled}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center gap-3">
                      <Switch
                        checked={rate.enabled}
                        onCheckedChange={() => handleToggleEnabled(index)}
                      />
                      <Label className={rate.enabled ? 'text-emerald-500' : 'text-muted-foreground'}>
                        {rate.enabled ? 'Enabled' : 'Disabled'}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Penalty Settings */}
          <Card className="glass border-border/50 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Premature Withdrawal Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="penalty">Penalty Rate (%)</Label>
                  <div className="relative">
                    <Input
                      id="penalty"
                      type="number"
                      step="0.25"
                      defaultValue="1.0"
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Penalty deducted from applicable interest rate
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minDays">Minimum Lock-in Period (Days)</Label>
                  <Input
                    id="minDays"
                    type="number"
                    defaultValue="7"
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum days before premature withdrawal is allowed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Rates Preview */}
          <Card className="glass border-border/50 mt-6">
            <CardHeader>
              <CardTitle>Current Active Rates Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {rates.filter(r => r.enabled).map((rate) => (
                  <div key={rate.tenure} className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                    <p className="text-2xl font-bold text-primary">{rate.rate}%</p>
                    <p className="text-sm text-muted-foreground">{rate.tenure}</p>
                    <p className="text-xs text-emerald-500 mt-1">Senior: {rate.seniorRate}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminFDRates;
