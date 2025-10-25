import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Phone, 
  MessageSquare, 
  Users,
  RefreshCw,
  Filter,
  Download,
  Sparkles
} from "lucide-react";

interface Activity {
  id: number;
  time: string;
  action: string;
  client: string;
  status: "success" | "pending" | "failed";
  type: "call" | "chat" | "lead";
  aiSummary: string;
}

const Activity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filterType, setFilterType] = useState<"all" | "call" | "chat" | "lead">("all");

  const mockActivities: Activity[] = [
    {
      id: 1,
      time: "2:34 PM",
      action: "Voice Call Completed",
      client: "Sarah Johnson - TechCorp",
      status: "success",
      type: "call",
      aiSummary: "Qualified lead. Interested in Enterprise plan. Follow-up scheduled for Thursday."
    },
    {
      id: 2,
      time: "2:28 PM",
      action: "Chatbot Conversation",
      client: "Michael Chen - Innovate.io",
      status: "success",
      type: "chat",
      aiSummary: "Product inquiry. Shared pricing information. Requested demo booking."
    },
    {
      id: 3,
      time: "2:15 PM",
      action: "New Lead Captured",
      client: "Emily Rodriguez - GrowthCo",
      status: "success",
      type: "lead",
      aiSummary: "High-intent lead from LinkedIn. Score: 85. Marketing agency looking for automation."
    },
    {
      id: 4,
      time: "1:56 PM",
      action: "Voice Call Attempted",
      client: "David Park - StartupX",
      status: "pending",
      type: "call",
      aiSummary: "No answer. Voicemail left. Auto-retry scheduled for tomorrow morning."
    },
    {
      id: 5,
      time: "1:42 PM",
      action: "Chatbot Escalation",
      client: "Lisa Anderson - Scale Ventures",
      status: "success",
      type: "chat",
      aiSummary: "Complex inquiry escalated to human agent. Technical integration questions."
    },
    {
      id: 6,
      time: "1:30 PM",
      action: "Voice Call Completed",
      client: "James Wilson - Digital Solutions",
      status: "success",
      type: "call",
      aiSummary: "Budget concerns addressed. Discussed Starter plan. Needs approval from management."
    },
    {
      id: 7,
      time: "1:18 PM",
      action: "New Lead Captured",
      client: "Amanda Foster - CloudTech",
      status: "success",
      type: "lead",
      aiSummary: "Website form submission. Score: 72. Interested in chatbot integration."
    },
    {
      id: 8,
      time: "1:05 PM",
      action: "Voice Call Failed",
      client: "Robert Martinez - BuildIt",
      status: "failed",
      type: "call",
      aiSummary: "Invalid phone number. CRM record needs updating. Marked for review."
    },
  ];

  useEffect(() => {
    setActivities(mockActivities);
    
    // Auto-refresh simulation
    const interval = setInterval(() => {
      setActivities(prev => prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredActivities = activities.filter(activity => 
    filterType === "all" || activity.type === filterType
  );

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "call": return <Phone className="h-5 w-5 text-purple-500" />;
      case "chat": return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "lead": return <Users className="h-5 w-5 text-blue-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-500/10 text-green-600 border-green-500/20",
      pending: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      failed: "bg-red-500/10 text-red-600 border-red-500/20"
    };
    return variants[status as keyof typeof variants] || "";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Activity & Insights</h1>
            <p className="text-muted-foreground">Real-time activity feed with AI summaries</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="hero">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Activities", value: activities.length, color: "from-blue-500 to-cyan-500" },
            { label: "Calls", value: activities.filter(a => a.type === "call").length, color: "from-purple-500 to-pink-500" },
            { label: "Chats", value: activities.filter(a => a.type === "chat").length, color: "from-green-500 to-emerald-500" },
            { label: "New Leads", value: activities.filter(a => a.type === "lead").length, color: "from-orange-500 to-red-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
                <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
            >
              <Filter className="mr-2 h-4 w-4" />
              All Activities
            </Button>
            <Button
              variant={filterType === "call" ? "default" : "outline"}
              onClick={() => setFilterType("call")}
            >
              <Phone className="mr-2 h-4 w-4" />
              Calls
            </Button>
            <Button
              variant={filterType === "chat" ? "default" : "outline"}
              onClick={() => setFilterType("chat")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chats
            </Button>
            <Button
              variant={filterType === "lead" ? "default" : "outline"}
              onClick={() => setFilterType("lead")}
            >
              <Users className="mr-2 h-4 w-4" />
              Leads
            </Button>
          </div>
        </Card>

        {/* Activity Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="w-32">Time</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>AI Summary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities.map((activity, index) => (
                    <motion.tr
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium text-muted-foreground">
                        {activity.time}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                            activity.type === "call" ? "bg-purple-500/10" :
                            activity.type === "chat" ? "bg-green-500/10" : "bg-blue-500/10"
                          }`}>
                            {getTypeIcon(activity.type)}
                          </div>
                          <span className="font-medium">{activity.action}</span>
                        </div>
                      </TableCell>
                      <TableCell>{activity.client}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(activity.status)}>
                          {activity.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2 max-w-md">
                          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {activity.aiSummary}
                          </p>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Activity;
