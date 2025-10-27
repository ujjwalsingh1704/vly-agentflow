import { motion } from "framer-motion";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  PhoneOff,
  FileText,
  Sparkles,
  PhoneCall,
  Activity,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VoiceAgent = () => {
  const { toast } = useToast();
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const handleStartCall = async () => {
    try {
      setIsCallActive(true);

      const response = await fetch(
        "https://ujjwalsingh1703.app.n8n.cloud/webhook-test/voice-agent-trigger",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            action: "start_call",
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Voice Agent Activated ✅",
          description: "AI voice agent is now active and ready to engage.",
        });
      }
    } catch {
      toast({
        title: "Connection Error",
        description: "Failed to trigger voice agent. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    toast({
      title: "Call Ended",
      description: "Voice agent session has been terminated.",
    });
  };

  const handleLogInteraction = () => {
    toast({
      title: "Interaction Logged",
      description: "Call details have been saved to CRM.",
    });
  };

  const formatTime = (time) =>
    `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;

  const stats = [
    {
      label: "Active Time",
      value: isCallActive ? formatTime(callDuration) : "0:00",
    },
    { label: "Calls Today", value: "24" },
    { label: "Success Rate", value: "87%" },
    { label: "Avg Duration", value: "4:32" },
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Voice Agent</h1>
            <p className="text-muted-foreground">
              AI-powered voice calling interface
            </p>
          </div>
          <Badge
            variant={isCallActive ? "default" : "outline"}
            className={`flex items-center ${
              isCallActive
                ? "bg-green-500/10 text-green-600 border-green-500/20 animate-pulse"
                : ""
            }`}
          >
            <Activity className="h-3 w-3 mr-1.5" />
            {isCallActive ? `Active - ${formatTime(callDuration)}` : "Inactive"}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm text-center shadow-sm">
                <p className="text-sm text-muted-foreground mb-2">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Left section (Main Voice Agent) */}
          <motion.div
            className="md:col-span-2 flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm flex flex-col flex-grow">
              {/* Header */}
              <div className="p-6 border-b border-border/50 bg-gradient-primary/5 flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Omnidim Voice Agent</h3>
                  <p className="text-sm text-muted-foreground">
                    Powered by advanced AI
                  </p>
                </div>
              </div>

              {/* Iframe */}
              <div className="p-6 bg-background/50 flex-grow">
                <iframe
                  src="https://www.omnidim.io/agent/47943"
                  className="w-full h-[55vh] md:h-[60vh] rounded-2xl shadow-lg border border-border/50"
                  allow="microphone; autoplay"
                  title="Omnidim Voice Agent"
                />
              </div>

              {/* Controls */}
              <div className="p-6 border-t border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    onClick={handleStartCall}
                    disabled={isCallActive}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Start Call
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="flex-1"
                    onClick={handleEndCall}
                    disabled={!isCallActive}
                  >
                    <PhoneOff className="mr-2 h-5 w-5" />
                    End Call
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLogInteraction}
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Log Interaction
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right section (Sidebar Info) */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Agent Status */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Agent Status</h3>
              <div className="space-y-4">
                {[
                  { label: "Mode", value: "Interactive" },
                  { label: "Language", value: "English" },
                  { label: "Voice", value: "Professional" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10"
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {item.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Calls */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Calls</h3>
              <div className="space-y-3">
                {[
                  { name: "Sarah Johnson", duration: "5:24", outcome: "Qualified" },
                  { name: "Michael Chen", duration: "3:15", outcome: "Follow-up" },
                  { name: "Emily Rodriguez", duration: "7:42", outcome: "Qualified" },
                  { name: "David Park", duration: "2:08", outcome: "No Answer" },
                ].map((call, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                      {call.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{call.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <PhoneCall className="h-3 w-3" />
                        {call.duration}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        call.outcome === "Qualified"
                          ? "bg-green-500/10 text-green-600 border-green-500/20"
                          : call.outcome === "Follow-up"
                          ? "bg-orange-500/10 text-orange-600 border-orange-500/20"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {call.outcome}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  View Call Scripts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Analytics Dashboard
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VoiceAgent;
