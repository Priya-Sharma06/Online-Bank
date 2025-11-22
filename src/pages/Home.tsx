import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Shield,
  Smartphone,
  CreditCard,
  Zap,
  Lock,
  Clock,
  CheckCircle2,
  Star,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Smartphone,
      title: "100% Online Banking",
      description: "Open account in minutes. No branch visits required.",
    },
    {
      icon: Lock,
      title: "Secure Login & OTP",
      description: "Multi-layer security with biometric and OTP authentication.",
    },
    {
      icon: CreditCard,
      title: "Free Virtual Card",
      description: "Get instant virtual debit card for online transactions.",
    },
    {
      icon: Zap,
      title: "Instant Transfers",
      description: "Send and receive money instantly 24/7.",
    },
    {
      icon: CheckCircle2,
      title: "One-Click Bill Pay",
      description: "Pay all your bills with a single click.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round the clock customer support for all your needs.",
    },
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Best digital banking experience! No more branch visits.",
    },
    {
      name: "Rahul Verma",
      rating: 5,
      comment: "Lightning fast transfers and amazing UI. Highly recommend!",
    },
    {
      name: "Amit Patel",
      rating: 5,
      comment: "The one-click bill payment feature is a game changer.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-accent/10 text-accent text-sm font-medium">
              India's First Fully Digital Bank
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Banking Reimagined for the Digital Age
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of banking. Open your account in minutes, manage your finances
              effortlessly, and enjoy seamless digital transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-white text-lg px-8" asChild>
                <Link to="/signup">Open Account Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span>RBI Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-accent" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>FDIC Insured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SkyBank?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience banking without boundaries. All the features you need, none of the hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover-scale card-shadow hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Started in 3 Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account with basic details in under 5 minutes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Verify KYC</h3>
              <p className="text-muted-foreground">
                Complete your KYC with PAN and Aadhaar verification
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Banking</h3>
              <p className="text-muted-foreground">
                Get your virtual card and start transacting immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6 card-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{review.comment}"</p>
                <p className="font-semibold">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <Card className="p-12 text-center gradient-hero">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Experience Digital Banking?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made the switch to SkyBank. Open your
              account today and get ₹500 welcome bonus!
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link to="/signup">Open Free Account</Link>
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
