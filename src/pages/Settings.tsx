import { motion } from "framer-motion";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Bell, 
  Palette, 
  Bot,
  Phone,
  Key,
  Save,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and AI agent preferences</p>
        </div>

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
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
            </div>
          </Card>
        </motion.div>

        {/* Voice Agent Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Voice Agent Configuration</h3>
                <p className="text-sm text-muted-foreground">Customize your AI voice agent behavior</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voiceTone">Voice Tone & Personality</Label>
                <Select defaultValue="professional">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="callScript">Default Call Script</Label>
                <Textarea 
                  id="callScript" 
                  placeholder="Enter your default call script template..."
                  className="min-h-[120px]"
                  defaultValue="Hello! I'm calling on behalf of [Company Name]. I'd like to discuss how our solutions can help your business..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Primary Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Chatbot Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Chatbot Configuration</h3>
                <p className="text-sm text-muted-foreground">Customize chatbot tone and behavior</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chatbotTone">Chatbot Personality</Label>
                <Select defaultValue="helpful">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="helpful">Helpful</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="witty">Witty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea 
                  id="welcomeMessage" 
                  placeholder="Enter welcome message..."
                  defaultValue="👋 Hi there! How can I help you today?"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium">Auto-escalation</p>
                  <p className="text-sm text-muted-foreground">Automatically transfer complex queries to human agents</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Workflow Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Agentic Workflow Templates</h3>
                <p className="text-sm text-muted-foreground">Manage automated workflow templates</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { name: "Lead Qualification Flow", status: "Active", leads: 324 },
                { name: "Follow-up Sequence", status: "Active", leads: 156 },
                { name: "Appointment Booking", status: "Active", leads: 89 },
                { name: "Nurture Campaign", status: "Paused", leads: 42 }
              ].map((workflow, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div>
                    <p className="font-medium">{workflow.name}</p>
                    <p className="text-sm text-muted-foreground">{workflow.leads} leads processed</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      workflow.status === "Active" 
                        ? "bg-green-500/10 text-green-600" 
                        : "bg-orange-500/10 text-orange-600"
                    }`}>
                      {workflow.status}
                    </span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Key className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Integration Keys</h3>
                <p className="text-sm text-muted-foreground">Manage API keys and connections</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="n8nWebhook">n8n Webhook URL</Label>
                <Input 
                  id="n8nWebhook" 
                  type="url" 
                  placeholder="https://your-n8n-instance.com/webhook/..."
                  defaultValue="https://ujjwalsingh1703.app.n8n.cloud/webhook-test/voice-agent-trigger"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleSheets">Google Sheets API Key</Label>
                <Input id="googleSheets" type="password" placeholder="Enter API key..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                <Input id="slackWebhook" type="url" placeholder="https://hooks.slack.com/services/..." />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Control how you receive updates</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Browser and mobile notifications</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              <Separator />
              <div>
                <Label className="mb-3 block">Notify me about:</Label>
                <div className="space-y-3">
                  {[
                    "New leads captured",
                    "Voice calls completed",
                    "Chatbot escalations",
                    "Weekly performance reports"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Appearance</h3>
                <p className="text-sm text-muted-foreground">Customize the interface theme</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Button variant="hero" size="lg" className="w-full md:w-auto" onClick={handleSave}>
            <Save className="mr-2 h-5 w-5" />
            Save All Changes
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
