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
  Download,
  ArrowLeft,
  Activity,
  PlusCircle,
  XCircle,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

interface AuditLog {
  id: string;
  fdId: string;
  customerId: string;
  customerName: string;
  action: "Created" | "Matured" | "Closed" | "Premature Withdrawal" | "Rate Changed";
  amount: number;
  timestamp: string;
  details: string;
  performedBy: string;
}

const AdminFDAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");

  // Demo audit logs
  const logs: AuditLog[] = [
    { id: "LOG001", fdId: "FD156", customerId: "C008", customerName: "Rahul Kumar", action: "Created", amount: 100000, timestamp: "2025-01-06 14:30:00", details: "New FD created for 12 months @ 7.0%", performedBy: "System" },
    { id: "LOG002", fdId: "FD143", customerId: "C003", customerName: "Priya Sharma", action: "Matured", amount: 200000, timestamp: "2025-01-06 09:00:00", details: "FD matured, amount ₹214,500 credited", performedBy: "System" },
    { id: "LOG003", fdId: "FD138", customerId: "C005", customerName: "Amit Patel", action: "Premature Withdrawal", amount: 50000, timestamp: "2025-01-05 16:45:00", details: "Premature withdrawal with 1% penalty", performedBy: "Customer" },
    { id: "LOG004", fdId: "FD155", customerId: "C010", customerName: "Sneha Gupta", action: "Created", amount: 150000, timestamp: "2025-01-05 11:20:00", details: "New FD created for 24 months @ 7.25%", performedBy: "System" },
    { id: "LOG005", fdId: "N/A", customerId: "N/A", customerName: "N/A", action: "Rate Changed", amount: 0, timestamp: "2025-01-04 10:00:00", details: "6-month rate updated from 6.25% to 6.5%", performedBy: "Admin" },
    { id: "LOG006", fdId: "FD142", customerId: "C007", customerName: "Vikram Singh", action: "Closed", amount: 300000, timestamp: "2025-01-04 09:30:00", details: "FD closed after maturity withdrawal", performedBy: "Customer" },
    { id: "LOG007", fdId: "FD151", customerId: "C009", customerName: "Meera Reddy", action: "Created", amount: 75000, timestamp: "2025-01-03 15:00:00", details: "New FD created for 6 months @ 6.5%", performedBy: "System" },
    { id: "LOG008", fdId: "FD130", customerId: "C002", customerName: "Arjun Nair", action: "Premature Withdrawal", amount: 100000, timestamp: "2025-01-02 12:00:00", details: "Emergency withdrawal requested", performedBy: "Customer" },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.fdId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action.toLowerCase().includes(actionFilter);
    return matchesSearch && matchesAction;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case "Created":
        return <PlusCircle className="w-4 h-4 text-emerald-500" />;
      case "Matured":
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      case "Closed":
        return <XCircle className="w-4 h-4 text-muted-foreground" />;
      case "Premature Withdrawal":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "Rate Changed":
        return <Activity className="w-4 h-4 text-primary" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "Created":
        return <Badge className="bg-emerald-500/20 text-emerald-500">Created</Badge>;
      case "Matured":
        return <Badge className="bg-blue-500/20 text-blue-500">Matured</Badge>;
      case "Closed":
        return <Badge className="bg-muted text-muted-foreground">Closed</Badge>;
      case "Premature Withdrawal":
        return <Badge className="bg-amber-500/20 text-amber-500">Premature</Badge>;
      case "Rate Changed":
        return <Badge className="bg-primary/20 text-primary">Rate Changed</Badge>;
      default:
        return <Badge>{action}</Badge>;
    }
  };

  // Stats
  const createdCount = logs.filter(l => l.action === "Created").length;
  const maturedCount = logs.filter(l => l.action === "Matured").length;
  const prematureCount = logs.filter(l => l.action === "Premature Withdrawal").length;

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
              <h1 className="text-3xl font-bold text-foreground">FD Audit Logs</h1>
              <p className="text-muted-foreground mt-1">Track all FD-related activities and changes</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="glass border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <PlusCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{createdCount}</p>
                  <p className="text-sm text-muted-foreground">FDs Created</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{maturedCount}</p>
                  <p className="text-sm text-muted-foreground">FDs Matured</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{prematureCount}</p>
                  <p className="text-sm text-muted-foreground">Premature Withdrawals</p>
                </div>
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
                  <Select value={actionFilter} onValueChange={setActionFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="created">Created</SelectItem>
                      <SelectItem value="matured">Matured</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="premature">Premature Withdrawal</SelectItem>
                      <SelectItem value="rate">Rate Changed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Log Table */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Activity Log ({filteredLogs.length} entries)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>FD ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Performed By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm">
                          <div>
                            <p className="font-medium">{log.timestamp.split(' ')[0]}</p>
                            <p className="text-xs text-muted-foreground">{log.timestamp.split(' ')[1]}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getActionIcon(log.action)}
                            {getActionBadge(log.action)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{log.fdId}</TableCell>
                        <TableCell>
                          {log.customerName !== "N/A" ? (
                            <div>
                              <p className="font-medium">{log.customerName}</p>
                              <p className="text-xs text-muted-foreground">{log.customerId}</p>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {log.amount > 0 ? (
                            <span className="font-medium">₹{log.amount.toLocaleString('en-IN')}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <p className="text-sm text-muted-foreground truncate" title={log.details}>
                            {log.details}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.performedBy}</Badge>
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

export default AdminFDAuditLogs;
