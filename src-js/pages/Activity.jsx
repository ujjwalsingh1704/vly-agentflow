import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { 
  Phone, 
  MessageSquare, 
  Users,
  RefreshCw,
  Filter,
  Download,
  Sparkles,
  ChevronDown,
  Check,
  X,
  Clock,
  User,
  Zap,
  Bell
} from "lucide-react";
import { cn } from "../lib/utils";

const Activity = () => {
  // State and other logic here
  const [activities, setActivities] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [expandedRow, setExpandedRow] = useState(null);

  const mockActivities = [
    {
      id: 1,
      time: "2:34 PM",
      action: "Voice Call Completed",
      client: "Sarah Johnson - TechCorp",
      status: "success",
      type: "call",
      aiSummary: "Qualified lead. Interested in Enterprise plan. Follow-up scheduled for Thursday.",
      duration: "4:32",
      sentiment: "positive"
    },
    {
      id: 2,
      time: "2:28 PM",
      action: "Chatbot Conversation",
      client: "Michael Chen - Innovate.io",
      status: "success",
      type: "chat",
      aiSummary: "Product inquiry. Shared pricing information. Requested demo booking.",
      duration: "2:15",
      sentiment: "neutral"
    },
    {
      id: 3,
      time: "2:15 PM",
      action: "New Lead Captured",
      client: "Emily Rodriguez - GrowthCo",
      status: "success",
      type: "lead",
      aiSummary: "High-intent lead from LinkedIn. Score: 85. Marketing agency looking for automation.",
      source: "LinkedIn",
      score: 85
    },
    {
      id: 4,
      time: "1:56 PM",
      action: "Voice Call Attempted",
      client: "David Park - StartupX",
      status: "pending",
      type: "call",
      aiSummary: "No answer. Voicemail left. Auto-retry scheduled for tomorrow morning.",
      duration: "0:12",
      sentiment: "neutral"
    },
    {
      id: 5,
      time: "1:42 PM",
      action: "Chatbot Escalation",
      client: "Lisa Anderson - Scale Ventures",
      status: "success",
      type: "chat",
      aiSummary: "Complex inquiry escalated to human agent. Technical integration questions.",
      duration: "8:23",
      sentiment: "positive"
    },
    {
      id: 6,
      time: "1:30 PM",
      action: "Voice Call Completed",
      client: "James Wilson - Digital Solutions",
      status: "success",
      type: "call",
      aiSummary: "Budget concerns addressed. Discussed Starter plan. Needs approval from management.",
      duration: "12:45",
      sentiment: "positive"
    },
    {
      id: 7,
      time: "1:18 PM",
      action: "New Lead Captured",
      client: "Amanda Foster - CloudTech",
      status: "success",
      type: "lead",
      aiSummary: "CTO interested in API integration. Requested technical documentation.",
      source: "Website Form",
      score: 92
    },
    {
      id: 8,
      time: "12:55 PM",
      action: "Voice Call Completed",
      client: "Robert Kim - TechStart",
      status: "success",
      type: "call",
      aiSummary: "Demo scheduled for next week. Decision maker is the CEO. High interest in automation.",
      duration: "7:32",
      sentiment: "very_positive"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setActivities(mockActivities);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredActivities = filterType === "all" 
    ? activities 
    : activities.filter(activity => activity.type === filterType);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-600">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
          Completed
        </Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-amber-500/20 bg-amber-500/10 text-amber-600">
          <div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5" />
          Pending
        </Badge>;
      case 'failed':
        return <Badge variant="outline" className="border-red-500/20 bg-red-500/10 text-red-600">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5" />
          Failed
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'call':
        return <Phone className="h-4 w-4 text-blue-500" />;
      case 'chat':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'lead':
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getSentimentBadge = (sentiment) => {
    const config = {
      very_positive: { text: "Very Positive", className: "bg-green-100 text-green-800" },
      positive: { text: "Positive", className: "bg-green-50 text-green-700" },
      neutral: { text: "Neutral", className: "bg-gray-100 text-gray-700" },
      negative: { text: "Negative", className: "bg-red-50 text-red-700" }
    };
    
    const { text, className } = config[sentiment] || config.neutral;
    
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${className}`}>
        {text}
      </span>
    );
  };

  const handleRefresh = () => {
    setActivities([]);
    const timer = setTimeout(() => {
      setActivities(mockActivities);
    }, 800);
    return () => clearTimeout(timer);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Activity Log</h1>
          <p className="text-sm text-muted-foreground">Track all system and user activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 mr-2 ${activities.length === 0 ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="space-y-6">

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            All Activities
          </Button>
          <Button
            variant={filterType === "call" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("call")}
            className="flex items-center gap-1.5"
          >
            <Phone className="h-3.5 w-3.5" />
            Calls
          </Button>
          <Button
            variant={filterType === "chat" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("chat")}
            className="flex items-center gap-1.5"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Chats
          </Button>
          <Button
            variant={filterType === "lead" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("lead")}
            className="flex items-center gap-1.5"
          >
            <Users className="h-3.5 w-3.5" />
            Leads
          </Button>
          <div className="ml-auto flex items-center space-x-2">
            <div className="relative">
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                More Filters
                <ChevronDown className="h-3.5 w-3.5 ml-1.5 opacity-50" />
              </Button>
            </div>
          </div>
        </div>

        {/* Activity Table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Time</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Loading activities...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredActivities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No activities found matching the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredActivities.map((activity) => (
                    <motion.tr 
                      key={activity.id}
                      className={cn(
                        "border-b hover:bg-muted/50 cursor-pointer",
                        expandedRow === activity.id && "bg-muted/30"
                      )}
                      onClick={() => setExpandedRow(expandedRow === activity.id ? null : activity.id)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="mr-2">
                            {getTypeIcon(activity.type)}
                          </div>
                          {activity.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{activity.action}</div>
                        {activity.duration && (
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.duration}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{activity.client}</div>
                        {activity.score && (
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Zap className="h-3 w-3 mr-1 text-amber-500" />
                            Score: {activity.score}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(activity.status)}
                        {activity.sentiment && (
                          <div className="mt-1">
                            {getSentimentBadge(activity.sentiment)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            expandedRow === activity.id && "rotate-180"
                          )} />
                        </Button>
                      </TableCell>
                      {expandedRow === activity.id && (
                        <TableCell colSpan={5} className="bg-muted/20 p-0">
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4">
                              <div className="flex items-start">
                                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                  <Sparkles className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium mb-1">AI Summary</h4>
                                  <p className="text-sm text-muted-foreground">{activity.aiSummary}</p>
                                  <div className="mt-3 flex space-x-2">
                                    <Button variant="outline" size="sm">
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      View Details
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Bell className="h-4 w-4 mr-2" />
                                      Create Follow-up
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </TableCell>
                      )}
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Activity;
