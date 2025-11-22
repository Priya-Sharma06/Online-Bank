import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Flag, Eye, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminManageTransactions = () => {
  const transactions = [
    { id: "TXN001", date: "2024-01-20", from: "Rahul Kumar (SKY1001)", to: "Priya Sharma (SKY1002)", amount: "₹15,000", type: "Transfer", status: "Completed", flagged: false },
    { id: "TXN002", date: "2024-01-20", from: "Amit Patel (SKY1003)", to: "External", amount: "₹85,000", type: "Transfer", status: "Completed", flagged: true },
    { id: "TXN003", date: "2024-01-19", from: "Sneha Reddy (SKY1004)", to: "Bill Payment", amount: "₹2,500", type: "Bill Payment", status: "Completed", flagged: false },
    { id: "TXN004", date: "2024-01-19", from: "Vikram Singh (SKY1005)", to: "External", amount: "₹1,20,000", type: "Transfer", status: "Pending", flagged: true },
    { id: "TXN005", date: "2024-01-18", from: "Priya Sharma (SKY1002)", to: "Card Payment", amount: "₹8,500", type: "Card", status: "Completed", flagged: false },
  ];

  const handleFlagTransaction = (id: string) => {
    toast({
      title: "Transaction Flagged",
      description: `Transaction ${id} has been flagged for review.`,
      variant: "destructive",
    });
  };

  const handleUnflagTransaction = (id: string) => {
    toast({
      title: "Flag Removed",
      description: `Transaction ${id} has been unflagged.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transaction Management</h1>
            <p className="text-muted-foreground mt-1">Monitor and review all transactions</p>
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
              <p className="text-sm text-muted-foreground">Today's Volume</p>
              <h3 className="text-2xl font-bold mt-2">₹45.2L</h3>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Transactions</p>
              <h3 className="text-2xl font-bold mt-2">1,248</h3>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Flagged</p>
              <h3 className="text-2xl font-bold mt-2 text-red-500">32</h3>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <h3 className="text-2xl font-bold mt-2">8</h3>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by transaction ID, account, or amount..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>View and manage customer transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id} className={txn.flagged ? "bg-destructive/10" : ""}>
                    <TableCell className="font-medium">{txn.id}</TableCell>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.from}</TableCell>
                    <TableCell>{txn.to}</TableCell>
                    <TableCell className="font-semibold">{txn.amount}</TableCell>
                    <TableCell>{txn.type}</TableCell>
                    <TableCell>
                      <Badge variant={txn.status === "Completed" ? "default" : "secondary"}>
                        {txn.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        {txn.flagged ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnflagTransaction(txn.id)}
                          >
                            Unflag
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFlagTransaction(txn.id)}
                          >
                            <Flag className="w-3 h-3 mr-1" />
                            Flag
                          </Button>
                        )}
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

export default AdminManageTransactions;
