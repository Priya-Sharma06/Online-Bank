import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Eye, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminManageKYC = () => {
  const kycSubmissions = [
    { id: 1, name: "Rahul Kumar", account: "SKY1001", panCard: "ABCDE1234F", address: "Mumbai, MH", documentDate: "2024-01-15", status: "Pending" },
    { id: 2, name: "Priya Sharma", account: "SKY1002", panCard: "FGHIJ5678K", address: "Delhi, DL", documentDate: "2024-01-16", status: "Pending" },
    { id: 3, name: "Amit Patel", account: "SKY1003", panCard: "LMNOP9012Q", address: "Ahmedabad, GJ", documentDate: "2024-01-14", status: "Verified" },
    { id: 4, name: "Sneha Reddy", account: "SKY1004", panCard: "RSTUV3456W", address: "Bangalore, KA", documentDate: "2024-01-17", status: "Pending" },
    { id: 5, name: "Vikram Singh", account: "SKY1005", panCard: "XYZAB7890C", address: "Jaipur, RJ", documentDate: "2024-01-13", status: "Rejected" },
  ];

  const handleApprove = (name: string) => {
    toast({
      title: "KYC Approved",
      description: `${name}'s KYC has been approved successfully.`,
    });
  };

  const handleReject = (name: string) => {
    toast({
      title: "KYC Rejected",
      description: `${name}'s KYC has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">KYC Management</h1>
            <p className="text-muted-foreground mt-1">Review and approve customer KYC documents</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <h3 className="text-2xl font-bold mt-2">3</h3>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Approved Today</p>
              <h3 className="text-2xl font-bold mt-2">12</h3>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Rejected Today</p>
              <h3 className="text-2xl font-bold mt-2">2</h3>
            </CardContent>
          </Card>
        </div>

        {/* KYC Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>KYC Submissions</CardTitle>
            <CardDescription>Review and process customer KYC documents</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>PAN Card</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kycSubmissions.map((kyc) => (
                  <TableRow key={kyc.id}>
                    <TableCell className="font-medium">{kyc.name}</TableCell>
                    <TableCell>{kyc.account}</TableCell>
                    <TableCell>{kyc.panCard}</TableCell>
                    <TableCell>{kyc.address}</TableCell>
                    <TableCell>{kyc.documentDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          kyc.status === "Verified" ? "default" : 
                          kyc.status === "Pending" ? "secondary" : 
                          "destructive"
                        }
                      >
                        {kyc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        {kyc.status === "Pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(kyc.name)}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(kyc.name)}
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Reject
                            </Button>
                          </>
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

export default AdminManageKYC;
