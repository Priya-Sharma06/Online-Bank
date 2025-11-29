import { useState } from "react";
import { ArrowLeft, Shield, Smartphone, Mail, Check, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TwoFactorAuth = () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"email" | "sms" | null>(null);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleEnable2FA = (method: "email" | "sms") => {
    setSelectedMethod(method);
    setIsVerifyDialogOpen(true);
    // Simulate sending verification code
    toast.success(`Verification code sent to your ${method === "email" ? "email" : "phone number"}`);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      if (verificationCode === "123456") {
        setTwoFAEnabled(true);
        setIsVerifyDialogOpen(false);
        setVerificationCode("");
        toast.success("Two-Factor Authentication enabled successfully!");
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    }, 1000);
  };

  const handleDisable2FA = () => {
    setTwoFAEnabled(false);
    setSelectedMethod(null);
    toast.success("Two-Factor Authentication disabled");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16 max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Two-Factor Authentication</h1>
            <p className="text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
        </div>

        {/* Status Card */}
        <Card className={`mb-6 ${twoFAEnabled ? "border-green-500 bg-green-50/50 dark:bg-green-950/20" : ""}`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${twoFAEnabled ? "bg-green-500/20" : "bg-muted"}`}>
                  <Shield className={`h-6 w-6 ${twoFAEnabled ? "text-green-600" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Two-Factor Authentication is {twoFAEnabled ? "Enabled" : "Disabled"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {twoFAEnabled
                      ? `Active via ${selectedMethod === "email" ? "Email OTP" : "SMS OTP"}`
                      : "Protect your account with an extra security layer"}
                  </p>
                </div>
              </div>
              {twoFAEnabled && (
                <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
                  <Check className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 2FA Methods */}
        {!twoFAEnabled && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Email OTP</CardTitle>
                    <CardDescription>Receive codes via email</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a 6-digit verification code sent to your registered email address each time you log in.
                </p>
                <Button className="w-full" onClick={() => handleEnable2FA("email")}>
                  Enable Email 2FA
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>SMS OTP</CardTitle>
                    <CardDescription>Receive codes via SMS</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a 6-digit verification code sent to your registered mobile number each time you log in.
                </p>
                <Button className="w-full" onClick={() => handleEnable2FA("sms")}>
                  Enable SMS 2FA
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Disable 2FA */}
        {twoFAEnabled && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Manage Two-Factor Authentication</CardTitle>
              <CardDescription>You can disable 2FA anytime, but we recommend keeping it enabled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {selectedMethod === "email" ? (
                    <Mail className="h-5 w-5 text-primary" />
                  ) : (
                    <Smartphone className="h-5 w-5 text-primary" />
                  )}
                  <div>
                    <p className="font-medium">
                      {selectedMethod === "email" ? "Email OTP" : "SMS OTP"} Method
                    </p>
                    <p className="text-sm text-muted-foreground">Currently active</p>
                  </div>
                </div>
                <Button variant="destructive" onClick={handleDisable2FA}>
                  Disable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Security Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Always enable 2FA:</strong> It significantly reduces the risk of unauthorized access
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Keep your contact info updated:</strong> Ensure your email and phone number are current
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Never share OTP codes:</strong> Bank officials will never ask for your verification codes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Use strong passwords:</strong> Combine 2FA with a strong, unique password for maximum security
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Monitor your activity:</strong> Regularly check your activity log for any suspicious logins
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How Two-Factor Authentication Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Enter Your Password</h4>
                  <p className="text-sm text-muted-foreground">
                    Log in with your email and password as usual
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Receive Verification Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Get a 6-digit code via your chosen method (Email/SMS)
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Enter the Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Input the code to verify your identity and access your account
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Dialog */}
        <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify Your Identity</DialogTitle>
              <DialogDescription>
                Enter the 6-digit verification code sent to your{" "}
                {selectedMethod === "email" ? "email address" : "phone number"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Demo: Use code <span className="font-mono font-semibold">123456</span> to verify
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsVerifyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleVerify} disabled={isVerifying || verificationCode.length !== 6}>
                {isVerifying ? "Verifying..." : "Verify & Enable"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default TwoFactorAuth;
