import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Lock, Unlock, Key, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminManageUsers = () => {
  const users = [
    { id: 1, name: "Rahul Kumar", email: "rahul@example.com", mobile: "+91 98765 43210", account: "SKY1001", status: "Active", kyc: "Verified" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", mobile: "+91 98765 43211", account: "SKY1002", status: "Active", kyc: "Verified" },
    { id: 3, name: "Amit Patel", email: "amit@example.com", mobile: "+91 98765 43212", account: "SKY1003", status: "Frozen", kyc: "Pending" },
    { id: 4, name: "Sneha Reddy", email: "sneha@example.com", mobile: "+91 98765 43213", account: "SKY1004", status: "Active", kyc: "Verified" },
    { id: 5, name: "Vikram Singh", email: "vikram@example.com", mobile: "+91 98765 43214", account: "SKY1005", status: "Active", kyc: "Rejected" },
  ];

  const handleFreezeAccount = (name: string) => {
    toast({
      title: "Account Frozen",
      description: `${name}'s account has been frozen successfully.`,
    });
  };

  const handleUnfreezeAccount = (name: string) => {
    toast({
      title: "Account Unfrozen",
      description: `${name}'s account has been unfrozen successfully.`,
    });
  };

  const handleResetPassword = (name: string) => {
    toast({
      title: "Password Reset",
      description: `Password reset link sent to ${name}'s email.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
            <p className="text-muted-foreground mt-1">View and manage customer accounts</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by name, email, or account number..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>All Users ({users.length})</CardTitle>
            <CardDescription>Manage customer accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{user.account}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.kyc === "Verified" ? "default" : user.kyc === "Pending" ? "secondary" : "destructive"}>
                        {user.kyc}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {user.status === "Active" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFreezeAccount(user.name)}
                          >
                            <Lock className="w-3 h-3 mr-1" />
                            Freeze
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnfreezeAccount(user.name)}
                          >
                            <Unlock className="w-3 h-3 mr-1" />
                            Unfreeze
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResetPassword(user.name)}
                        >
                          <Key className="w-3 h-3 mr-1" />
                          Reset
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

export default AdminManageUsers;
