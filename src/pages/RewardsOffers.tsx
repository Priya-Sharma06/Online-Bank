import { ArrowLeft, Gift, Percent, Star, TrendingUp, Tag, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RewardsOffers = () => {
  const cashbackOffers = [
    {
      id: 1,
      title: "10% Cashback on Food Delivery",
      description: "Get up to ₹150 cashback on orders from Swiggy and Zomato",
      cashback: "10%",
      maxAmount: "₹150",
      validTill: "31 Jan 2024",
      minSpend: "₹500",
      category: "Food",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 2,
      title: "5% Cashback on Fuel",
      description: "Save on every fuel purchase at any petrol pump",
      cashback: "5%",
      maxAmount: "₹250",
      validTill: "28 Feb 2024",
      minSpend: "₹1000",
      category: "Fuel",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "15% Off on Shopping",
      description: "Exclusive discount on Amazon, Flipkart, and Myntra",
      cashback: "15%",
      maxAmount: "₹500",
      validTill: "15 Feb 2024",
      minSpend: "₹2000",
      category: "Shopping",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const discountCoupons = [
    {
      id: 1,
      title: "Netflix Premium - 2 Months Free",
      description: "Subscribe to any plan and get 2 months free with SkyBank Card",
      code: "SKYNET24",
      validTill: "31 Mar 2024",
      partner: "Netflix",
      image: "🎬",
    },
    {
      id: 2,
      title: "BookMyShow - Flat ₹200 Off",
      description: "Book movie tickets and get instant discount",
      code: "SKYBMS200",
      validTill: "28 Feb 2024",
      partner: "BookMyShow",
      image: "🎟️",
    },
    {
      id: 3,
      title: "Uber - 50% Off on 5 Rides",
      description: "Use this code for your next 5 Uber rides",
      code: "SKYUBER50",
      validTill: "15 Feb 2024",
      partner: "Uber",
      image: "🚗",
    },
  ];

  const partnerOffers = [
    {
      id: 1,
      partner: "Amazon",
      title: "Prime Membership - 1 Year Free",
      description: "Get Amazon Prime membership for free with premium accounts",
      logo: "📦",
    },
    {
      id: 2,
      partner: "Spotify",
      title: "Premium - 6 Months Free",
      description: "Enjoy ad-free music streaming for 6 months",
      logo: "🎵",
    },
    {
      id: 3,
      partner: "Starbucks",
      title: "Buy 1 Get 1 Free",
      description: "Every Friday on all beverages with SkyBank Card",
      logo: "☕",
    },
  ];

  const rewardsProgress = 8500;
  const rewardsTarget = 10000;
  const progressPercentage = (rewardsProgress / rewardsTarget) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Rewards & Offers</h1>
            <p className="text-muted-foreground">Exclusive deals and cashback for you</p>
          </div>
        </div>

        {/* Rewards Progress */}
        <Card className="mb-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/20">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Your Rewards Balance</h3>
                  <p className="text-2xl font-bold text-primary">₹{rewardsProgress.toLocaleString("en-IN")}</p>
                </div>
              </div>
              <Badge className="bg-primary/20 text-primary">
                <TrendingUp className="h-3 w-3 mr-1" />
                ₹{(rewardsTarget - rewardsProgress).toLocaleString("en-IN")} to next reward
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to ₹10,000 milestone</span>
                <span className="font-semibold">{progressPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Spend ₹{(rewardsTarget - rewardsProgress).toLocaleString("en-IN")} more to unlock exclusive premium offers!
            </p>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="cashback" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cashback">Cashback Offers</TabsTrigger>
            <TabsTrigger value="coupons">Discount Coupons</TabsTrigger>
            <TabsTrigger value="partners">Partner Offers</TabsTrigger>
          </TabsList>

          {/* Cashback Offers */}
          <TabsContent value="cashback" className="space-y-4 mt-6">
            {cashbackOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-2 bg-gradient-to-r ${offer.color}`} />
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{offer.category}</Badge>
                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
                          {offer.cashback} Cashback
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Max Cashback: </span>
                          <span className="font-semibold">{offer.maxAmount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Min Spend: </span>
                          <span className="font-semibold">{offer.minSpend}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Valid Till: </span>
                          <span className="font-semibold">{offer.validTill}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-full bg-gradient-to-br ${offer.color} text-white flex items-center justify-center font-bold text-xl ml-4`}>
                      <Percent className="h-8 w-8" />
                    </div>
                  </div>
                  <Button className="w-full mt-4">Activate Offer</Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Discount Coupons */}
          <TabsContent value="coupons" className="space-y-4 mt-6">
            {discountCoupons.map((coupon) => (
              <Card key={coupon.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{coupon.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">{coupon.partner}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{coupon.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{coupon.description}</p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 p-3 border-2 border-dashed border-primary rounded-lg bg-primary/5">
                          <p className="text-xs text-muted-foreground mb-1">Coupon Code</p>
                          <p className="text-lg font-mono font-bold text-primary">{coupon.code}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Copy Code
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Valid till {coupon.validTill}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Partner Offers */}
          <TabsContent value="partners" className="space-y-4 mt-6">
            {partnerOffers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-5xl">{offer.logo}</div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{offer.partner}</h3>
                        <h4 className="font-semibold text-primary mb-2">{offer.title}</h4>
                        <p className="text-sm text-muted-foreground">{offer.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      View Details
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* How to Earn */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              How to Earn Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Make Transactions</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn 1 reward point for every ₹100 spent using your SkyBank card
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Activate Offers</h4>
                  <p className="text-sm text-muted-foreground">
                    Browse and activate cashback offers before making purchases
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Redeem Rewards</h4>
                  <p className="text-sm text-muted-foreground">
                    Use your reward points to get discounts or convert to cashback
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default RewardsOffers;
