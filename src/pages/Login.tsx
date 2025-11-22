import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2, Mail, Lock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login Successful!",
          description: "Welcome back to SkyBank",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SkyBank
            </span>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Login to access your account</p>
        </div>

        <Card className="p-8 card-shadow">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Mobile</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or mobile"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary text-white" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full">
              Login with OTP
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-accent hover:underline font-medium">
                Create Account
              </Link>
            </p>
          </form>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
