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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
