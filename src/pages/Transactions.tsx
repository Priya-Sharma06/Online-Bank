import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Download } from "lucide-react";

const Transactions = () => {
  const transactions = [
    { id: 1, type: "credit", amount: 5000, description: "Salary Credit", date: "2025-01-15", time: "10:30 AM", balance: 45250.75 },
    { id: 2, type: "debit", amount: 1200, description: "Electricity Bill", date: "2025-01-14", time: "03:45 PM", balance: 40250.75 },
    { id: 3, type: "debit", amount: 500, description: "Mobile Recharge", date: "2025-01-13", time: "11:20 AM", balance: 39050.75 },
    { id: 4, type: "credit", amount: 2000, description: "Transfer from Priya", date: "2025-01-12", time: "09:15 AM", balance: 38550.75 },
    { id: 5, type: "debit", amount: 850, description: "Online Shopping", date: "2025-01-11", time: "07:30 PM", balance: 36550.75 },
    { id: 6, type: "debit", amount: 300, description: "DTH Recharge", date: "2025-01-10", time: "02:10 PM", balance: 35700.75 },
    { id: 7, type: "credit", amount: 1500, description: "Freelance Payment", date: "2025-01-09", time: "04:25 PM", balance: 35400.75 },
    { id: 8, type: "debit", amount: 2500, description: "Rent Payment", date: "2025-01-08", time: "10:00 AM", balance: 33900.75 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-6xl">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
              <p className="text-muted-foreground">View all your account transactions</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/statement">
                <Download className="w-4 h-4 mr-2" />
                Download Statement
              </Link>
            </Button>
          </div>

          <Card className="card-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Date & Time</th>
                    <th className="text-left p-4 font-semibold">Description</th>
                    <th className="text-left p-4 font-semibold">Type</th>
                    <th className="text-right p-4 font-semibold">Amount</th>
                    <th className="text-right p-4 font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-t border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{transaction.date}</p>
                          <p className="text-sm text-muted-foreground">{transaction.time}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium">{transaction.description}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === "credit"
                                ? "bg-success/20 text-success"
                                : "bg-destructive/20 text-destructive"
                            }`}
                          >
                            {transaction.type === "credit" ? (
                              <ArrowDownLeft className="w-4 h-4" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4" />
                            )}
                          </div>
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "credit" ? "text-success" : "text-destructive"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}₹
                          {transaction.amount.toLocaleString('en-IN')}
                        </p>
                      </td>
                      <td className="p-4 text-right">
                        <p className="font-medium">
                          ₹{transaction.balance.toLocaleString('en-IN')}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
