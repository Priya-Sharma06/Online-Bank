import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  CreditCard,
  FileText,
  Shield,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "credit",
      icon: TrendingUp,
      title: "Money Received",
      message: "₹5,000 credited from Priya Sharma",
      time: "5 mins ago",
      read: false,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: 2,
      type: "loan",
      icon: FileText,
      title: "Loan Update",
      message: "Your personal loan application is under review",
      time: "2 hours ago",
      read: false,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: 3,
      type: "bill",
      icon: Bell,
      title: "Bill Reminder",
      message: "Electricity bill payment due in 2 days",
      time: "1 day ago",
      read: true,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      id: 4,
      type: "kyc",
      icon: CheckCircle,
      title: "KYC Approved",
      message: "Your KYC documents have been verified successfully",
      time: "2 days ago",
      read: true,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: 5,
      type: "security",
      icon: Shield,
      title: "Security Alert",
      message: "Login from new device detected",
      time: "3 days ago",
      read: true,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      id: 6,
      type: "debit",
      icon: TrendingDown,
      title: "Payment Successful",
      message: "₹1,200 debited for electricity bill",
      time: "4 days ago",
      read: true,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  const unreadNotifications = notifications.filter((n) => !n.read);
  const allNotifications = notifications;

  const NotificationItem = ({ notification }: { notification: typeof notifications[0] }) => {
    const Icon = notification.icon;
    return (
      <Card
        className={`p-4 mb-3 hover:bg-muted/50 transition-colors cursor-pointer ${
          !notification.read ? "border-l-4 border-l-primary" : ""
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${notification.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm">{notification.title}</h3>
              {!notification.read && (
                <Badge variant="default" className="text-xs">New</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{notification.time}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">Notifications</h1>
              <Button variant="ghost" size="sm">
                Mark all as read
              </Button>
            </div>
            <p className="text-muted-foreground">
              Stay updated with your account activities
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="animate-scale-in">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="all">
                All ({allNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread ({unreadNotifications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-0">
              {allNotifications.length > 0 ? (
                allNotifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              ) : (
                <Card className="p-12 text-center">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No notifications yet</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="unread" className="space-y-0">
              {unreadNotifications.length > 0 ? (
                unreadNotifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              ) : (
                <Card className="p-12 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-success" />
                  <p className="text-muted-foreground">You're all caught up!</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
