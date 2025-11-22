import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Wifi, Zap, Droplet, Flame, Tv, Smartphone, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminManageBills = () => {
  const billProviders = [
    { id: 1, name: "Airtel Mobile", category: "Mobile Recharge", icon: Smartphone, apiEndpoint: "api.airtel.com", status: "Active", transactions: 1248 },
    { id: 2, name: "Jio Mobile", category: "Mobile Recharge", icon: Smartphone, apiEndpoint: "api.jio.com", status: "Active", transactions: 2156 },
    { id: 3, name: "BSES Electricity", category: "Electricity", icon: Zap, apiEndpoint: "api.bses.com", status: "Active", transactions: 856 },
    { id: 4, name: "Mumbai Water", category: "Water", icon: Droplet, apiEndpoint: "api.mumwater.gov.in", status: "Active", transactions: 542 },
    { id: 5, name: "Indraprastha Gas", category: "Gas", icon: Flame, apiEndpoint: "api.iglonline.net", status: "Inactive", transactions: 324 },
    { id: 6, name: "Tata Sky DTH", category: "DTH", icon: Tv, apiEndpoint: "api.tatasky.com", status: "Active", transactions: 987 },
    { id: 7, name: "ACT Broadband", category: "Broadband", icon: Wifi, apiEndpoint: "api.actcorp.in", status: "Active", transactions: 654 },
  ];

  const handleToggleStatus = (name: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    toast({
      title: "Status Updated",
      description: `${name} has been ${newStatus.toLowerCase()}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bill Payment Integrations</h1>
            <p className="text-muted-foreground mt-1">Manage bill payment provider integrations</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Providers</p>
              <h3 className="text-2xl font-bold mt-2">{billProviders.length}</h3>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Active</p>
              <h3 className="text-2xl font-bold mt-2 text-green-500">
                {billProviders.filter(p => p.status === "Active").length}
              </h3>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Transactions</p>
              <h3 className="text-2xl font-bold mt-2">
                {billProviders.reduce((sum, p) => sum + p.transactions, 0).toLocaleString()}
              </h3>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 flex items-center justify-center">
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Provider
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Add New Provider Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Add New Bill Provider</CardTitle>
            <CardDescription>Configure a new bill payment integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Provider Name</Label>
                <Input placeholder="e.g., Vodafone Mobile" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input placeholder="e.g., Mobile Recharge" />
              </div>
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input placeholder="e.g., api.provider.com" />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="Enter API key" />
              </div>
            </div>
            <Button className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Integration
            </Button>
          </CardContent>
        </Card>

        {/* Providers Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Active Integrations</CardTitle>
            <CardDescription>Manage existing bill payment providers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>API Endpoint</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="flex items-center gap-2">
                      <provider.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{provider.name}</span>
                    </TableCell>
                    <TableCell>{provider.category}</TableCell>
                    <TableCell className="text-muted-foreground">{provider.apiEndpoint}</TableCell>
                    <TableCell>{provider.transactions.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={provider.status === "Active" ? "default" : "secondary"}>
                        {provider.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={provider.status === "Active"}
                          onCheckedChange={() => handleToggleStatus(provider.name, provider.status)}
                        />
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminManageBills;
