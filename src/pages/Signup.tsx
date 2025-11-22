import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2, User, Mail, Phone, Lock, Calendar, MapPin, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    pan: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate account creation
    setTimeout(() => {
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to SkyBank. Redirecting to dashboard...",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background py-12">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SkyBank
            </span>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Create Your Account</h1>
          <p className="text-muted-foreground mt-2">Join India's first fully digital bank</p>
        </div>

        <Card className="p-8 card-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="pl-10"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    className="pl-10"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input
                  id="pan"
                  name="pan"
                  placeholder="ABCDE1234F"
                  value={formData.pan}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your complete address"
                  className="pl-10"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" required className="mt-1" />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to SkyBank's{" "}
                <Link to="/terms" className="text-accent hover:underline">
                  Terms & Conditions
                </Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-white"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-accent hover:underline font-medium">
                Login
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

export default Signup;
