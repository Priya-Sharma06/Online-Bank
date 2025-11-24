import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, FileText, CheckCircle, XCircle, AlertTriangle, Eye, Download } from "lucide-react";

const AdminLoanApplications = () => {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const applications = [
    {
      id: "LA2025045",
      applicantName: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 9876543210",
      panNumber: "ABCDE1234F",
      amount: 250000,
      purpose: "Personal Use",
      tenure: 36,
      monthlyIncome: 75000,
      creditScore: 750,
      employment: "Salaried",
      appliedDate: "2025-01-23",
      status: "Pending",
      documents: {
        pan: true,
        salary: true,
        id: true,
      },
    },
    {
      id: "LA2025044",
      applicantName: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 9876543211",
      panNumber: "FGHIJ5678K",
      amount: 500000,
      purpose: "Business",
      tenure: 48,
      monthlyIncome: 150000,
      creditScore: 820,
      employment: "Self-Employed",
      appliedDate: "2025-01-22",
      status: "Under Review",
      documents: {
        pan: true,
        salary: true,
        id: true,
      },
    },
    {
      id: "LA2025043",
      applicantName: "Amit Kumar",
      email: "amit.kumar@email.com",
      phone: "+91 9876543212",
      panNumber: "LMNOP9012Q",
      amount: 150000,
      purpose: "Education",
      tenure: 24,
      monthlyIncome: 50000,
      creditScore: 680,
      employment: "Salaried",
      appliedDate: "2025-01-21",
      status: "Approved",
      documents: {
        pan: true,
        salary: true,
        id: true,
      },
    },
    {
      id: "LA2025042",
      applicantName: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 9876543213",
      panNumber: "RSTUV3456W",
      amount: 300000,
      purpose: "Wedding",
      tenure: 36,
      monthlyIncome: 40000,
      creditScore: 580,
      employment: "Salaried",
      appliedDate: "2025-01-20",
      status: "Flagged",
      documents: {
        pan: true,
        salary: false,
        id: true,
      },
    },
  ];

  const handleApprove = (id: string) => {
    toast({
      title: "Loan Approved",
      description: `Application ${id} has been approved successfully`,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Loan Rejected",
      description: `Application ${id} has been rejected`,
      variant: "destructive",
    });
  };

  const handleFlag = (id: string) => {
    toast({
      title: "Application Flagged",
      description: `Application ${id} has been flagged for review`,
    });
  };

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter;
    const matchesSearch =
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const ApplicationDetailDialog = ({ application }: { application: typeof applications[0] }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Loan Application Details</DialogTitle>
          <DialogDescription>Application ID: {application.id}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="personal" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="loan">Loan Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-semibold">{application.applicantName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold">{application.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">PAN Number</p>
                <p className="font-semibold">{application.panNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employment Type</p>
                <p className="font-semibold">{application.employment}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="font-semibold">₹{application.monthlyIncome.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credit Score</p>
                <Badge className={application.creditScore >= 700 ? "bg-success" : "bg-warning"}>
                  {application.creditScore}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Applied Date</p>
                <p className="font-semibold">{application.appliedDate}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="loan" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Loan Amount</p>
                <p className="text-2xl font-bold">₹{application.amount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tenure</p>
                <p className="text-2xl font-bold">{application.tenure} months</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Loan Purpose</p>
                <p className="font-semibold">{application.purpose}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interest Rate</p>
                <p className="font-semibold">10.5% p.a.</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated EMI</p>
                <p className="font-semibold">
                  ₹{Math.round((application.amount * 0.0105 * Math.pow(1 + 0.0105, application.tenure)) / (Math.pow(1 + 0.0105, application.tenure) - 1)).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">PAN Card</p>
                    <p className="text-xs text-muted-foreground">Identity verification</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {application.documents.pan ? (
                    <Badge className="bg-success">Uploaded</Badge>
                  ) : (
                    <Badge variant="destructive">Missing</Badge>
                  )}
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Salary Slip</p>
                    <p className="text-xs text-muted-foreground">Income proof</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {application.documents.salary ? (
                    <Badge className="bg-success">Uploaded</Badge>
                  ) : (
                    <Badge variant="destructive">Missing</Badge>
                  )}
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">ID Proof</p>
                    <p className="text-xs text-muted-foreground">Aadhaar / Passport</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {application.documents.id ? (
                    <Badge className="bg-success">Uploaded</Badge>
                  ) : (
                    <Badge variant="destructive">Missing</Badge>
                  )}
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 mt-6 pt-6 border-t">
          <Button
            className="flex-1 bg-success hover:bg-success/90"
            onClick={() => handleApprove(application.id)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve
          </Button>
          <Button
            className="flex-1"
            variant="destructive"
            onClick={() => handleReject(application.id)}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
          <Button
            className="flex-1 bg-warning hover:bg-warning/90"
            onClick={() => handleFlag(application.id)}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Flag
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Loan Applications</h1>
          <p className="text-muted-foreground">
            Review and manage loan applications
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 card-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID or name..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card className="card-shadow">
          <CardContent className="p-0">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Credit Score</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold">{app.applicantName}</p>
                          <p className="text-xs text-muted-foreground">{app.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{app.amount.toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell>{app.purpose}</TableCell>
                      <TableCell>
                        <Badge
                          className={app.creditScore >= 700 ? "bg-success" : "bg-warning"}
                        >
                          {app.creditScore}
                        </Badge>
                      </TableCell>
                      <TableCell>{app.appliedDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            app.status === "Approved"
                              ? "bg-success"
                              : app.status === "Pending"
                              ? "bg-warning"
                              : app.status === "Flagged"
                              ? "bg-destructive"
                              : "bg-accent"
                          }
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ApplicationDetailDialog application={app} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoanApplications;
