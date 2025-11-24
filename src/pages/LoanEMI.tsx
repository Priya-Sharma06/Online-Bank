import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Clock, Download, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const LoanEMI = () => {
  const loanDetails = {
    loanId: "LA2025001",
    principal: 200000,
    interestRate: 10.5,
    tenure: 24,
    monthlyEMI: 9268,
    totalInterest: 22432,
    totalPayable: 222432,
    startDate: "2025-02-01",
  };

  // Generate EMI schedule
  const generateSchedule = () => {
    const schedule = [];
    let balance = loanDetails.principal;
    const monthlyRate = loanDetails.interestRate / 12 / 100;

    for (let i = 1; i <= loanDetails.tenure; i++) {
      const interest = balance * monthlyRate;
      const principal = loanDetails.monthlyEMI - interest;
      balance -= principal;

      const date = new Date(2025, 1, 1);
      date.setMonth(date.getMonth() + (i - 1));

      schedule.push({
        emiNo: i,
        date: date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }),
        emi: loanDetails.monthlyEMI,
        principal: Math.round(principal),
        interest: Math.round(interest),
        balance: Math.max(0, Math.round(balance)),
        status: i <= 3 ? "Paid" : "Pending",
      });
    }
    return schedule;
  };

  const emiSchedule = generateSchedule();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">EMI Schedule</h1>
                <p className="text-muted-foreground">
                  Detailed payment schedule for Loan ID: {loanDetails.loanId}
                </p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Schedule
              </Button>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-scale-in">
            <Card className="card-shadow">
              <CardHeader className="pb-3">
                <CardDescription>Loan Amount</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹{loanDetails.principal.toLocaleString('en-IN')}</p>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader className="pb-3">
                <CardDescription>Monthly EMI</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">₹{loanDetails.monthlyEMI.toLocaleString('en-IN')}</p>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader className="pb-3">
                <CardDescription>Total Interest</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-accent">₹{loanDetails.totalInterest.toLocaleString('en-IN')}</p>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader className="pb-3">
                <CardDescription>Total Payable</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹{loanDetails.totalPayable.toLocaleString('en-IN')}</p>
              </CardContent>
            </Card>
          </div>

          {/* EMI Schedule Table */}
          <Card className="card-shadow animate-scale-in">
            <CardHeader>
              <CardTitle>Payment Schedule</CardTitle>
              <CardDescription>
                {loanDetails.tenure} monthly installments starting from {loanDetails.startDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>EMI No.</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">EMI Amount</TableHead>
                      <TableHead className="text-right">Principal</TableHead>
                      <TableHead className="text-right">Interest</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emiSchedule.map((emi) => (
                      <TableRow key={emi.emiNo}>
                        <TableCell className="font-medium">#{emi.emiNo}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {emi.date}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ₹{emi.emi.toLocaleString('en-IN')}
                        </TableCell>
                        <TableCell className="text-right">
                          ₹{emi.principal.toLocaleString('en-IN')}
                        </TableCell>
                        <TableCell className="text-right text-accent">
                          ₹{emi.interest.toLocaleString('en-IN')}
                        </TableCell>
                        <TableCell className="text-right">
                          ₹{emi.balance.toLocaleString('en-IN')}
                        </TableCell>
                        <TableCell>
                          {emi.status === "Paid" ? (
                            <Badge className="bg-success">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Paid
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button asChild size="lg">
              <Link to="/loan/repayment">Pay EMI</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/loan/prepayment">Prepay Loan</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/loan/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanEMI;
