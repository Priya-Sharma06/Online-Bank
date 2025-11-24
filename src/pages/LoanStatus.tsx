import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const LoanStatus = () => {
  const applications = [
    {
      id: "LA2025001",
      type: "Personal Loan",
      amount: 200000,
      appliedDate: "2025-01-20",
      status: "Approved",
      statusColor: "bg-success",
      icon: CheckCircle,
      iconColor: "text-success",
      remarks: "Congratulations! Your loan has been approved.",
    },
    {
      id: "LA2025002",
      type: "Personal Loan",
      amount: 150000,
      appliedDate: "2025-01-22",
      status: "Pending",
      statusColor: "bg-warning",
      icon: Clock,
      iconColor: "text-warning",
      remarks: "Your application is under review. We'll notify you soon.",
    },
    {
      id: "LA2024998",
      type: "Personal Loan",
      amount: 300000,
      appliedDate: "2025-01-15",
      status: "Rejected",
      statusColor: "bg-destructive",
      icon: XCircle,
      iconColor: "text-destructive",
      remarks: "Unable to process due to insufficient credit score.",
    },
  ];

  const getStatusSteps = (status: string) => {
    const steps = [
      { label: "Application Submitted", completed: true },
      { label: "Document Verification", completed: status !== "Pending" },
      { label: "Credit Check", completed: status === "Approved" },
      { label: status === "Rejected" ? "Rejected" : "Approved", completed: status !== "Pending" },
    ];
    return steps;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Loan Application Status</h1>
            <p className="text-muted-foreground">
              Track the status of all your loan applications
            </p>
          </div>

          {/* Applications */}
          <div className="space-y-6">
            {applications.map((app) => {
              const Icon = app.icon;
              const steps = getStatusSteps(app.status);
              
              return (
                <Card key={app.id} className="card-shadow animate-scale-in">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{app.type}</CardTitle>
                          <Badge className={app.statusColor}>{app.status}</Badge>
                        </div>
                        <CardDescription>
                          Application ID: {app.id} • Applied on {app.appliedDate}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                        <p className="text-2xl font-bold">₹{app.amount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Progress Steps */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between relative">
                        {steps.map((step, index) => (
                          <div key={index} className="flex flex-col items-center flex-1 relative z-10">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                                step.completed
                                  ? app.status === "Rejected" && index === steps.length - 1
                                    ? "bg-destructive"
                                    : "bg-success"
                                  : "bg-muted"
                              }`}
                            >
                              {step.completed ? (
                                app.status === "Rejected" && index === steps.length - 1 ? (
                                  <XCircle className="w-6 h-6 text-white" />
                                ) : (
                                  <CheckCircle className="w-6 h-6 text-white" />
                                )
                              ) : (
                                <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
                              )}
                            </div>
                            <p className="text-xs text-center font-medium">{step.label}</p>
                          </div>
                        ))}
                        {/* Connection Line */}
                        <div className="absolute top-5 left-0 right-0 h-1 bg-muted -z-0">
                          <div
                            className={`h-full ${
                              app.status === "Rejected"
                                ? "bg-destructive"
                                : app.status === "Approved"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                            style={{
                              width: `${
                                app.status === "Approved"
                                  ? "100%"
                                  : app.status === "Rejected"
                                  ? "75%"
                                  : "50%"
                              }`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Remarks */}
                    <div className={`p-4 rounded-lg ${app.statusColor}/10 mb-4`}>
                      <div className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 ${app.iconColor} mt-0.5`} />
                        <div>
                          <p className="font-semibold mb-1">Status Update</p>
                          <p className="text-sm text-muted-foreground">{app.remarks}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {app.status === "Approved" && (
                        <>
                          <Button asChild size="sm">
                            <Link to="/loan/emi-schedule">View EMI Schedule</Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link to="/loan/dashboard">Go to Dashboard</Link>
                          </Button>
                        </>
                      )}
                      {app.status === "Pending" && (
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      )}
                      {app.status === "Rejected" && (
                        <Button asChild variant="outline" size="sm">
                          <Link to="/loan/apply">Apply Again</Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Download Application
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* New Application CTA */}
          <Link to="/loan/apply">
            <Card className="mt-8 p-6 card-shadow hover-scale cursor-pointer border-dashed border-2 animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <FileText className="w-5 h-5" />
                <span>Apply for a New Loan</span>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoanStatus;
