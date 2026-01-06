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
  Download,
  ArrowLeft,
  FileText,
  Users
} from "lucide-react";

interface FDRecord {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  interestRate: number;
  startDate: string;
  maturityDate: string;
  maturityAmount: number;
  status: "Active" | "Matured" | "Closed" | "Premature";
}

const AdminFDRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Demo data
  const records: FDRecord[] = [
    { id: "FD001", customerId: "C001", customerName: "Rahul Kumar", amount: 200000, interestRate: 7.5, startDate: "2024-06-15", maturityDate: "2025-06-15", maturityAmount: 215000, status: "Active" },
    { id: "FD002", customerId: "C002", customerName: "Priya Sharma", amount: 150000, interestRate: 7.25, startDate: "2024-01-20", maturityDate: "2025-12-20", maturityAmount: 172125, status: "Active" },
    { id: "FD003", customerId: "C003", customerName: "Amit Patel", amount: 100000, interestRate: 7.0, startDate: "2023-03-10", maturityDate: "2024-03-10", maturityAmount: 107000, status: "Matured" },
    { id: "FD004", customerId: "C004", customerName: "Sneha Gupta", amount: 50000, interestRate: 6.5, startDate: "2023-06-01", maturityDate: "2023-12-01", maturityAmount: 51625, status: "Closed" },
    { id: "FD005", customerId: "C005", customerName: "Vikram Singh", amount: 300000, interestRate: 7.5, startDate: "2024-09-01", maturityDate: "2027-09-01", maturityAmount: 374587, status: "Active" },
    { id: "FD006", customerId: "C006", customerName: "Meera Reddy", amount: 75000, interestRate: 7.0, startDate: "2024-02-15", maturityDate: "2025-02-15", maturityAmount: 80250, status: "Premature" },
    { id: "FD007", customerId: "C007", customerName: "Arjun Nair", amount: 500000, interestRate: 7.5, startDate: "2024-04-01", maturityDate: "2027-04-01", maturityAmount: 623750, status: "Active" },
    { id: "FD008", customerId: "C001", customerName: "Rahul Kumar", amount: 100000, interestRate: 7.0, startDate: "2023-08-01", maturityDate: "2024-08-01", maturityAmount: 107000, status: "Matured" },
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter;
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
      case "Premature":
        return <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30">Premature</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalActive = records.filter(r => r.status === "Active").length;
  const totalMatured = records.filter(r => r.status === "Matured").length;
  const totalPremature = records.filter(r => r.status === "Premature").length;
  const totalAmount = records.filter(r => r.status === "Active").reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              <h1 className="text-3xl font-bold text-foreground">FD Records</h1>
              <p className="text-muted-foreground mt-1">View and manage all customer fixed deposits</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              <Download className="w-4 h-4 mr-2" />
              Export Records
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="glass border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-emerald-500">{totalActive}</p>
                <p className="text-sm text-muted-foreground">Active FDs</p>
              </CardContent>
            </Card>
            <Card className="glass border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-500">{totalMatured}</p>
                <p className="text-sm text-muted-foreground">Matured</p>
              </CardContent>
            </Card>
            <Card className="glass border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-amber-500">{totalPremature}</p>
                <p className="text-sm text-muted-foreground">Premature</p>
              </CardContent>
            </Card>
            <Card className="glass border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">₹{(totalAmount / 100000).toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">Active Amount</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="glass border-border/50 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by FD ID, Customer Name or ID..."
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
                      <SelectItem value="premature">Premature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Records Table */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                All FD Records ({filteredRecords.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>FD ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Maturity Date</TableHead>
                      <TableHead>Maturity Amt</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{record.customerName}</p>
                            <p className="text-xs text-muted-foreground">{record.customerId}</p>
                          </div>
                        </TableCell>
                        <TableCell>₹{record.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell>{record.interestRate}%</TableCell>
                        <TableCell>{record.startDate}</TableCell>
                        <TableCell>{record.maturityDate}</TableCell>
                        <TableCell className="font-semibold text-emerald-500">
                          ₹{record.maturityAmount.toLocaleString('en-IN')}
                        </TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminFDRecords;
