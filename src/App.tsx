import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Transactions from "./pages/Transactions";
import BillPayment from "./pages/BillPayment";
import VirtualCard from "./pages/VirtualCard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManageUsers from "./pages/AdminManageUsers";
import AdminManageKYC from "./pages/AdminManageKYC";
import AdminManageTransactions from "./pages/AdminManageTransactions";
import AdminManageBills from "./pages/AdminManageBills";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import LoanDashboard from "./pages/LoanDashboard";
import LoanApplication from "./pages/LoanApplication";
import LoanDocuments from "./pages/LoanDocuments";
import LoanStatus from "./pages/LoanStatus";
import LoanEMI from "./pages/LoanEMI";
import LoanRepayment from "./pages/LoanRepayment";
import LoanPrepayment from "./pages/LoanPrepayment";
import AdminLoanDashboard from "./pages/AdminLoanDashboard";
import AdminLoanApplications from "./pages/AdminLoanApplications";
import ExpenseTracker from "./pages/ExpenseTracker";
import BudgetPlanner from "./pages/BudgetPlanner";
import SavingsGoals from "./pages/SavingsGoals";
import ActivityLog from "./pages/ActivityLog";
import AdminActivityLog from "./pages/AdminActivityLog";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import RewardsOffers from "./pages/RewardsOffers";
import FDDashboard from "./pages/FDDashboard";
import FDOpenNew from "./pages/FDOpenNew";
import FDList from "./pages/FDList";
import FDDetails from "./pages/FDDetails";
import AdminFDDashboard from "./pages/AdminFDDashboard";
import AdminFDRates from "./pages/AdminFDRates";
import AdminFDRecords from "./pages/AdminFDRecords";
import AdminFDAuditLogs from "./pages/AdminFDAuditLogs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/bill-payment" element={<BillPayment />} />
          <Route path="/virtual-card" element={<VirtualCard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminManageUsers />} />
          <Route path="/admin/kyc" element={<AdminManageKYC />} />
          <Route path="/admin/transactions" element={<AdminManageTransactions />} />
          <Route path="/admin/bills" element={<AdminManageBills />} />
          <Route path="/admin/loan/dashboard" element={<AdminLoanDashboard />} />
          <Route path="/admin/loan/applications" element={<AdminLoanApplications />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/loan/dashboard" element={<LoanDashboard />} />
          <Route path="/loan/apply" element={<LoanApplication />} />
          <Route path="/loan/documents" element={<LoanDocuments />} />
          <Route path="/loan/status" element={<LoanStatus />} />
          <Route path="/loan/emi-schedule" element={<LoanEMI />} />
          <Route path="/loan/repayment" element={<LoanRepayment />} />
          <Route path="/loan/prepayment" element={<LoanPrepayment />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/budget-planner" element={<BudgetPlanner />} />
          <Route path="/savings-goals" element={<SavingsGoals />} />
          <Route path="/activity-log" element={<ActivityLog />} />
          <Route path="/admin/activity-log" element={<AdminActivityLog />} />
          <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
          <Route path="/rewards" element={<RewardsOffers />} />
          {/* Fixed Deposit Routes */}
          <Route path="/fd/dashboard" element={<FDDashboard />} />
          <Route path="/fd/open-new" element={<FDOpenNew />} />
          <Route path="/fd/list" element={<FDList />} />
          <Route path="/fd/details/:id" element={<FDDetails />} />
          {/* Admin FD Routes */}
          <Route path="/admin/fd/dashboard" element={<AdminFDDashboard />} />
          <Route path="/admin/fd/rates" element={<AdminFDRates />} />
          <Route path="/admin/fd/records" element={<AdminFDRecords />} />
          <Route path="/admin/fd/audit-logs" element={<AdminFDAuditLogs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
