import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  AlertTriangle,
  Plus,
  ArrowLeft,
  PiggyBank
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface FD {
  id: string;
  amount: number;
  interestRate: number;
  startDate: string;
  maturityDate: string;
  maturityAmount: number;
  status: "Active" | "Matured" | "Closed";
  interestEarned: number;
}

const FDList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedFD, setSelectedFD] = useState<FD | null>(null);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);

  // Demo data
  const fds: FD[] = [
    { 
      id: "FD001", 
      amount: 200000, 
      interestRate: 7.5, 
      startDate: "2024-06-15", 
      maturityDate: "2025-06-15", 
      maturityAmount: 215000,
      interestEarned: 15000,
      status: "Active" 
    },
    { 
      id: "FD002", 
      amount: 150000, 
      interestRate: 7.25, 
      startDate: "2024-01-20", 
      maturityDate: "2025-12-20", 
      maturityAmount: 172125,
      interestEarned: 22125,
      status: "Active" 
    },
    { 
      id: "FD003", 
      amount: 100000, 
      interestRate: 7.0, 
      startDate: "2023-03-10", 
      maturityDate: "2024-03-10", 
      maturityAmount: 107000,
      interestEarned: 7000,
      status: "Matured" 
    },
    { 
      id: "FD004", 
      amount: 50000, 
      interestRate: 6.5, 
      startDate: "2023-06-01", 
      maturityDate: "2023-12-01", 
      maturityAmount: 51625,
      interestEarned: 1625,
      status: "Closed" 
    },
    { 
      id: "FD005", 
      amount: 300000, 
      interestRate: 7.5, 
      startDate: "2024-09-01", 
      maturityDate: "2027-09-01", 
      maturityAmount: 374587,
      interestEarned: 74587,
      status: "Active" 
    },
  ];

  const filteredFDs = fds.filter(fd => {
    const matchesSearch = fd.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || fd.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30">Active</Badge>;
      case "Matured":
        return <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">Matured</Badge>;
      case "Closed":
        return <Badge className="bg-muted text-muted-foreground hover:bg-muted/80">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handlePrematureWithdraw = () => {
    setShowWithdrawDialog(false);
    toast({
      title: "Withdrawal Request Submitted",
      description: `Premature withdrawal request for ${selectedFD?.id} has been submitted. Amount will be credited after penalty deduction.`,
    });
    setSelectedFD(null);
  };

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

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Fixed Deposits</h1>
              <p className="text-muted-foreground mt-1">View and manage all your fixed deposits</p>
            </div>
            <Button className="mt-4 md:mt-0 gradient-primary text-white" asChild>
              <Link to="/fd/open-new">
                <Plus className="w-4 h-4 mr-2" />
                Open New FD
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <Card className="glass border-border/50 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by FD ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="matured">Matured</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FD Table */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-primary" />
                Fixed Deposits ({filteredFDs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFDs.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>FD ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Interest Rate</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Maturity Date</TableHead>
                        <TableHead>Maturity Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFDs.map((fd) => (
                        <TableRow key={fd.id}>
                          <TableCell className="font-medium">{fd.id}</TableCell>
                          <TableCell>₹{fd.amount.toLocaleString('en-IN')}</TableCell>
                          <TableCell>{fd.interestRate}% p.a.</TableCell>
                          <TableCell>{fd.startDate}</TableCell>
                          <TableCell>{fd.maturityDate}</TableCell>
                          <TableCell className="font-semibold text-emerald-500">
                            ₹{fd.maturityAmount.toLocaleString('en-IN')}
                          </TableCell>
                          <TableCell>{getStatusBadge(fd.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/fd/details/${fd.id}`}>
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                              {fd.status === "Active" && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-amber-500 hover:text-amber-600"
                                  onClick={() => {
                                    setSelectedFD(fd);
                                    setShowWithdrawDialog(true);
                                  }}
                                >
                                  <AlertTriangle className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <PiggyBank className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No fixed deposits found</p>
                  <Button className="mt-4" asChild>
                    <Link to="/fd/open-new">Open Your First FD</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interest Rates Card */}
          <Card className="glass border-border/50 mt-6">
            <CardHeader>
              <CardTitle>Current FD Interest Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-primary">6.5%</p>
                  <p className="text-sm text-muted-foreground">6 Months</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-primary">7.0%</p>
                  <p className="text-sm text-muted-foreground">12 Months</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-primary">7.25%</p>
                  <p className="text-sm text-muted-foreground">24 Months</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-primary">7.5%</p>
                  <p className="text-sm text-muted-foreground">36 Months</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                * Senior citizens are eligible for additional 0.5% interest on all tenures
              </p>
            </CardContent>
          </Card>
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
          
          {selectedFD && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">FD ID</p>
                    <p className="font-semibold">{selectedFD.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Principal Amount</p>
                    <p className="font-semibold">₹{selectedFD.amount.toLocaleString('en-IN')}</p>
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
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handlePrematureWithdraw}
            >
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FDList;
