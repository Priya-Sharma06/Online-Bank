import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Eye, EyeOff, Lock, Unlock, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VirtualCard = () => {
  const [showCVV, setShowCVV] = useState(false);
  const [cardFrozen, setCardFrozen] = useState(false);
  const { toast } = useToast();

  const cardDetails = {
    number: "4532 **** **** 7890",
    fullNumber: "4532 1234 5678 7890",
    name: "RAHUL KUMAR",
    expiry: "12/28",
    cvv: "123",
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(cardDetails.fullNumber.replace(/\s/g, ""));
    toast({
      title: "Card Number Copied",
      description: "Card number copied to clipboard",
    });
  };

  const toggleCardStatus = () => {
    setCardFrozen(!cardFrozen);
    toast({
      title: cardFrozen ? "Card Unfrozen" : "Card Frozen",
      description: cardFrozen
        ? "Your card is now active for transactions"
        : "Your card has been temporarily frozen",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Virtual Debit Card</h1>
            <p className="text-muted-foreground">Manage your digital payment card</p>
          </div>

          {/* Card Display */}
          <div className="mb-8 perspective-1000">
            <div className={`relative aspect-[1.586/1] max-w-md mx-auto ${cardFrozen ? 'opacity-60' : ''}`}>
              <Card className="h-full gradient-hero text-white p-8 flex flex-col justify-between overflow-hidden">
                {/* Card background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/20 translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-sm font-medium">SkyBank Virtual Card</div>
                    {cardFrozen && (
                      <div className="bg-destructive/20 px-3 py-1 rounded-full text-xs">
                        Frozen
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-2xl font-mono tracking-wider">{cardDetails.number}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={handleCopyNumber}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-white/70 mb-1">Cardholder Name</p>
                      <p className="text-sm font-medium">{cardDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70 mb-1">Valid Thru</p>
                      <p className="text-sm font-medium">{cardDetails.expiry}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70 mb-1">CVV</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium font-mono">
                          {showCVV ? cardDetails.cvv : "***"}
                        </p>
                        <button
                          onClick={() => setShowCVV(!showCVV)}
                          className="text-white/70 hover:text-white"
                        >
                          {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Card Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 card-shadow">
              <div className="flex items-center gap-4 mb-4">
                {cardFrozen ? (
                  <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-destructive" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <Unlock className="w-6 h-6 text-success" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">Card Status</h3>
                  <p className="text-sm text-muted-foreground">
                    {cardFrozen ? "Card is frozen" : "Card is active"}
                  </p>
                </div>
              </div>
              <Button
                variant={cardFrozen ? "default" : "destructive"}
                className="w-full"
                onClick={toggleCardStatus}
              >
                {cardFrozen ? (
                  <>
                    <Unlock className="w-4 h-4 mr-2" />
                    Unfreeze Card
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Freeze Card
                  </>
                )}
              </Button>
            </Card>

            <Card className="p-6 card-shadow">
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Card Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Card Type:</span>
                    <span className="font-medium">Virtual Debit Card</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network:</span>
                    <span className="font-medium">Visa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Limit:</span>
                    <span className="font-medium">₹50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`font-medium ${cardFrozen ? 'text-destructive' : 'text-success'}`}>
                      {cardFrozen ? 'Frozen' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Card Usage Tips */}
          <Card className="p-6 mt-6 bg-muted/30">
            <h3 className="font-semibold mb-3">Security Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Never share your CVV with anyone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Freeze your card immediately if you suspect unauthorized activity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Use your card only on secure websites with HTTPS</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VirtualCard;
