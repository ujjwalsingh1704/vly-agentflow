import { motion } from "framer-motion";
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { 
  User, 
  Bell, 
  Palette, 
  Bot,
  Phone,
  Key,
  Save,
  Sparkles,
  Mail,
  Lock,
  Globe,
  Volume2,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Plus,
  Trash2,
  CreditCard,
  FileText
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [billingPlan, setBillingPlan] = useState("pro");
  const [aiVoice, setAiVoice] = useState("emma");
  const [aiPace, setAiPace] = useState("normal");
  const [apiKey, setApiKey] = useState("sk_***************");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 123-4567");
  const [callRecording, setCallRecording] = useState(true);
  const [callTranscription, setCallTranscription] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("12h");
  const [signature, setSignature] = useState("Best regards,\n[Your Name]\n[Your Position]");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [integrations, setIntegrations] = useState([
    { id: 1, name: "Slack", connected: true },
    { id: 2, name: "Google Calendar", connected: true },
    { id: 3, name: "Salesforce", connected: false },
    { id: 4, name: "HubSpot", connected: false },
    { id: 5, name: "Zapier", connected: false },
  ]);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleIntegrationToggle = (id) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected } 
        : integration
    ));
  };

  const handleRegenerateApiKey = () => {
    const newKey = `sk_${Math.random().toString(36).substring(2, 18)}`;
    setApiKey(newKey);
    toast({
      title: "API Key Regenerated",
      description: "Your API key has been successfully regenerated.",
    });
  };

  const handleAddWebhook = () => {
    if (webhookUrl) {
      toast({
        title: "Webhook Added",
        description: "Your webhook has been added successfully.",
      });
      setWebhookUrl("");
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "aiSettings", label: "AI Settings", icon: Sparkles },
  ];

  const timezones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Phoenix",
    "America/Anchorage",
    "America/Honolulu",
    "UTC",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Dubai",
    "Australia/Sydney"
  ];

  const aiVoices = [
    { id: "emma", name: "Emma (US English)" },
    { id: "liam", name: "Liam (US English)" },
    { id: "ava", name: "Ava (UK English)" },
    { id: "noah", name: "Noah (Australian English)" },
    { id: "sophia", name: "Sophia (US English)" },
    { id: "william", name: "William (UK English)" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Profile Information</h3>
                <p className="text-sm text-muted-foreground">Update your personal details</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Corp" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map(tz => (
                        <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date & Time Format</Label>
                  <div className="flex space-x-2">
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={timeFormat} onValueChange={setTimeFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signature">Email Signature</Label>
                <Textarea 
                  id="signature" 
                  value={signature} 
                  onChange={(e) => setSignature(e.target.value)}
                  rows={4}
                  placeholder="Enter your email signature"
                />
              </div>
            </div>
          </div>
        );
      
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Email notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email notifications</p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Marketing emails</p>
                      <p className="text-sm text-muted-foreground">Receive product updates and offers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Weekly reports</p>
                      <p className="text-sm text-muted-foreground">Get a weekly summary of your activity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Push Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Push notifications</p>
                      <p className="text-sm text-muted-foreground">Enable push notifications in your browser</p>
                    </div>
                    <Switch 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Sound alerts</p>
                      <p className="text-sm text-muted-foreground">Play sound for new notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">New leads</p>
                      <p className="text-sm text-muted-foreground">Get notified when new leads are captured</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Call activities</p>
                      <p className="text-sm text-muted-foreground">Notifications about call activities</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">System updates</p>
                      <p className="text-sm text-muted-foreground">Important system updates and maintenance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Security Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your account security</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button className="mt-2">Update Password</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <div className="space-y-4">
                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">SMS Authentication</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Use your phone to verify your identity</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Key className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">Authenticator App</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Use an authenticator app for verification</p>
                    </div>
                    <Button variant="outline">Set Up</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Sessions</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                        <span>Active now</span>
                        <span className="mx-2">•</span>
                        <span>Chrome on Windows</span>
                        <span className="mx-2">•</span>
                        <span>New York, NY</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Sign Out</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                    <div>
                      <p className="font-medium">Previous Session</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>2 days ago</span>
                        <span className="mx-2">•</span>
                        <span>Safari on iPhone</span>
                        <span className="mx-2">•</span>
                        <span>San Francisco, CA</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="mt-2">Sign out of all other sessions</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-red-600">Danger Zone</h4>
                <div className="space-y-4">
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <h5 className="font-medium flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                      Delete Account
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" className="mt-3">Delete My Account</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Billing & Plans</h3>
                <p className="text-sm text-muted-foreground">Manage your subscription and payment methods</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Current Plan</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      id: "starter",
                      name: "Starter",
                      price: "$49",
                      period: "/month",
                      description: "Perfect for individuals and small teams",
                      features: ["100 AI calls/month", "Basic analytics", "Email support"],
                      button: billingPlan === "starter" ? "Current Plan" : "Downgrade"
                    },
                    {
                      id: "pro",
                      name: "Pro",
                      price: "$149",
                      period: "/month",
                      description: "For growing businesses",
                      features: ["500 AI calls/month", "Advanced analytics", "Priority support", "API access"],
                      featured: true,
                      button: billingPlan === "pro" ? "Current Plan" : "Upgrade"
                    },
                    {
                      id: "enterprise",
                      name: "Enterprise",
                      price: "Custom",
                      period: "",
                      description: "For large organizations",
                      features: ["Unlimited calls", "Custom integrations", "Dedicated account manager", "SLA"],
                      button: "Contact Sales"
                    }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      className={`relative border rounded-lg p-6 ${
                        plan.featured 
                          ? 'ring-2 ring-blue-500 border-blue-500' 
                          : 'border-border'
                      }`}
                    >
                      {plan.featured && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                            Most Popular
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <div className="mt-2 flex items-baseline">
                        <span className="text-3xl font-extrabold">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                      <ul className="mt-4 space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full mt-6 ${
                          billingPlan === plan.id 
                            ? 'bg-gray-100 text-foreground hover:bg-gray-200' 
                            : plan.featured 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : ''
                        }`}
                        variant={billingPlan === plan.id || plan.featured ? 'default' : 'outline'}
                        disabled={billingPlan === plan.id}
                      >
                        {plan.button}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Payment Methods</h4>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Payment Method
                  </Button>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-12 rounded bg-muted flex items-center justify-center mr-3">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-12 rounded bg-muted flex items-center justify-center mr-3">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Mastercard ending in 5555</p>
                        <p className="text-sm text-muted-foreground">Expires 10/24</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Billing History</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30">
                      <tr className="text-left">
                        <th className="p-3 font-medium">Date</th>
                        <th className="p-3 font-medium">Description</th>
                        <th className="p-3 font-medium text-right">Amount</th>
                        <th className="p-3 font-medium text-right">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        { id: 1, date: "Jun 15, 2023", description: "Pro Plan - Monthly", amount: "$149.00", status: "Paid" },
                        { id: 2, date: "May 15, 2023", description: "Pro Plan - Monthly", amount: "$149.00", status: "Paid" },
                        { id: 3, date: "Apr 15, 2023", description: "Pro Plan - Monthly", amount: "$149.00", status: "Paid" },
                        { id: 4, date: "Mar 15, 2023", description: "Starter to Pro Upgrade", amount: "$100.00", status: "Paid" },
                        { id: 5, date: "Mar 1, 2023", description: "Starter Plan - Monthly", amount: "$49.00", status: "Paid" },
                      ].map((item) => (
                        <tr key={item.id} className="hover:bg-muted/30">
                          <td className="p-3 text-muted-foreground">{item.date}</td>
                          <td className="p-3">{item.description}</td>
                          <td className="p-3 text-right font-medium">{item.amount}</td>
                          <td className="p-3 text-right">
                            <Button variant="ghost" size="sm" className="h-8">
                              <FileText className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" className="mt-2">
                    View All Invoices
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "integrations":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Integrations</h3>
                <p className="text-sm text-muted-foreground">Connect with your favorite tools</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Available Integrations</h4>
                  <div className="relative">
                    <Input 
                      placeholder="Search integrations..." 
                      className="pl-8 w-64"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            {integration.name === 'Slack' && (
                              <svg className="h-6 w-6 text-[#E01E5A]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 15a2 2 0 01-2 2a2 2 0 01-2-2a2 2 0 012-2h2v2zm1 0a2 2 0 012 2v2a2 2 0 11-4 0v-2a2 2 0 012-2h1zm-1-6a2 2 0 01-2-2a2 2 0 012-2a2 2 0 012 2v2H6zm0 1a2 2 0 01-2 2a2 2 0 01-2-2a2 2 0 012-2h2v2zm5-1a2 2 0 012-2a2 2 0 012 2v6a2 2 0 01-2 2a2 2 0 01-2-2V9zm1 0a2 2 0 012-2a2 2 0 012 2v6a2 2 0 01-2 2a2 2 0 01-2-2V9zm7-2a2 2 0 00-2 2a2 2 0 002 2h1v2a2 2 0 01-2 2a2 2 0 01-2-2a2 2 0 012-2h2V9zm-1 0a2 2 0 012-2a2 2 0 012 2a2 2 0 01-2 2h-2v2a2 2 0 01-2 2a2 2 0 01-2-2a2 2 0 012-2h1V9z" />
                              </svg>
                            )}
                            {integration.name === 'Google Calendar' && (
                              <svg className="h-6 w-6 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z" />
                              </svg>
                            )}
                            {integration.name === 'Salesforce' && (
                              <svg className="h-6 w-6 text-[#00A1E0]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10.006 5.415a4.375 4.375 0 013.17-1.31 4.33 4.33 0 013.168 1.311 4.367 4.367 0 011.311 3.17 4.36 4.36 0 01-1.311 3.17 4.33 4.33 0 01-3.168 1.311 4.33 4.33 0 01-3.17-1.311A4.36 4.36 0 018.695 8.59c0-1.2.437-2.25 1.311-3.175zm-6.16 7.089a5.9 5.9 0 00-1.72 4.277c0 1.6.573 2.954 1.72 4.062 1.146 1.108 2.54 1.676 4.18 1.703 1.64-.027 3.034-.595 4.18-1.703a5.53 5.53 0 001.719-4.062c0-1.6-.573-2.959-1.72-4.063a5.9 5.9 0 00-4.18-1.72 5.9 5.9 0 00-4.18 1.72zm14.3 0a5.9 5.9 0 00-4.18-1.72 5.9 5.9 0 00-4.18 1.72 5.9 5.9 0 00-1.72 4.277c0 1.6.573 2.954 1.72 4.062 1.146 1.108 2.54 1.676 4.18 1.703 1.64-.027 3.034-.595 4.18-1.703a5.53 5.53 0 001.72-4.062 5.53 5.53 0 00-1.72-4.063z" />
                              </svg>
                            )}
                            {integration.name === 'HubSpot' && (
                              <svg className="h-6 w-6 text-[#FF7A59]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.5 0A3.5 3.5 0 0124 3.5v17a3.5 3.5 0 01-3.5 3.5h-17A3.5 3.5 0 010 20.5v-17A3.5 3.5 0 013.5 0zM6 7.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zm-1.5 2a1.5 1.5 0 10-1.5 1.5 1.5 1.5 0 101.5-1.5zm0 4a1.5 1.5 0 10-1.5 1.5 1.5 1.5 0 001.5-1.5zm3-6a1.5 1.5 0 10-1.5 1.5 1.5 1.5 0 001.5-1.5zm0 4a1.5 1.5 0 10-1.5 1.5 1.5 1.5 0 001.5-1.5zm0 4a1.5 1.5 0 10-1.5 1.5 1.5 1.5 0 001.5-1.5zM12 6a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8zm8-8a1 1 0 10-1-1 1 1 0 001 1zm-1 2a1 1 0 101 1 1 1 0 00-1-1zm0 4a1 1 0 101 1 1 1 0 00-1-1zm-1 2a1 1 0 101 1 1 1 0 00-1-1z" />
                              </svg>
                            )}
                            {integration.name === 'Zapier' && (
                              <svg className="h-6 w-6 text-[#FF4A00]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 5.5h3v2.25h-3V5.5zm0 3h3v2.25h-3V8.5zm0 3h3v2.25h-3v-2.25zm-3 3h9v2.25h-9v-2.25zm0-3h9v2.25h-9v-2.25z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{integration.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {integration.connected ? 'Connected' : 'Not connected'}
                            </p>
                          </div>
                        </div>
                        <Switch 
                          checked={integration.connected}
                          onCheckedChange={() => handleIntegrationToggle(integration.id)}
                        />
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm" className="w-full">
                          {integration.connected ? 'Configure' : 'Connect'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Webhooks</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="https://your-webhook-url.com/endpoint"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                    />
                    <Button onClick={handleAddWebhook}>Add Webhook</Button>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-3 border-b flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">https://webhook.site/abc123</p>
                          <p className="text-xs text-muted-foreground">Last triggered: 2 hours ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-3 bg-muted/30 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">https://webhook.site/def456</p>
                          <p className="text-xs text-muted-foreground">Error: Connection timed out</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">API Access</h4>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleRegenerateApiKey}
                      >
                        Regenerate
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="api-key"
                        value={apiKey}
                        readOnly
                        className="font-mono"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(apiKey);
                          toast({
                            title: "API Key Copied",
                            description: "Your API key has been copied to clipboard.",
                          });
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Keep your API key secure and do not share it publicly.
                    </p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      View API Documentation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "aiSettings":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Agent Settings</h3>
                <p className="text-sm text-muted-foreground">Customize your AI agent's behavior</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Voice Settings</h4>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ai-voice">AI Voice</Label>
                      <Select value={aiVoice} onValueChange={setAiVoice}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {aiVoices.map(voice => (
                            <SelectItem key={voice.id} value={voice.id}>
                              {voice.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ai-pace">Speaking Pace</Label>
                      <Select value={aiPace} onValueChange={setAiPace}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select speaking pace" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="fast">Fast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="call-recording" checked={callRecording} onCheckedChange={setCallRecording} />
                    <Label htmlFor="call-recording">Enable call recording</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="call-transcription" checked={callTranscription} onCheckedChange={setCallTranscription} />
                    <Label htmlFor="call-transcription">Enable call transcription</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Call Handling</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Caller ID Number</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="phone-number" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="max-w-xs"
                      />
                      <Button variant="outline">Verify</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This number will be displayed when the AI makes outbound calls
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Business Hours</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>From</Label>
                        <Select defaultValue="9:00">
                          <SelectTrigger>
                            <SelectValue placeholder="Start time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => {
                              const hour = i % 12 || 12;
                              const period = i < 12 ? 'AM' : 'PM';
                              return (
                                <SelectItem key={i} value={`${i}:00`}>
                                  {`${hour}:00 ${period}`}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>To</Label>
                        <Select defaultValue="17:00">
                          <SelectTrigger>
                            <SelectValue placeholder="End time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => {
                              const hour = i % 12 || 12;
                              const period = i < 12 ? 'AM' : 'PM';
                              return (
                                <SelectItem key={i} value={`${i}:00`}>
                                  {`${hour}:00 ${period}`}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="business-hours" defaultChecked />
                      <Label htmlFor="business-hours">Only make calls during business hours</Label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">AI Behavior</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-instructions">Custom Instructions</Label>
                    <Textarea 
                      id="ai-instructions" 
                      placeholder="Example: Always be polite and professional. If the caller asks about pricing, direct them to our pricing page."
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      Provide specific instructions to guide the AI's behavior during calls
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ai-learning" defaultChecked />
                    <Label htmlFor="ai-learning">Enable AI learning from conversations</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    When enabled, the AI will learn from past conversations to improve future interactions.
                    No personally identifiable information is stored.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-3" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            {renderTabContent()}
            
            {/* Save Button - Only show for certain tabs */}
            {!['billing', 'integrations'].includes(activeTab) && (
              <div className="mt-8 pt-6 border-t flex justify-end">
                <Button 
                  onClick={handleSave}
                  className="flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
