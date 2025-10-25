import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Activity as ActivityIcon,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  PhoneCall,
  Bot
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = () => {
  // Mock data
  const summaryCards = [
    {
      title: "Total Leads",
      value: "2,847",
      change: "+12.5%",
      positive: true,
      icon: Users,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Calls Completed",
      value: "1,293",
      change: "+8.2%",
      positive: true,
      icon: Phone,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Chatbot Interactions",
      value: "5,421",
      change: "+23.1%",
      positive: true,
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Active Voice Agents",
      value: "8",
      change: "+2",
      positive: true,
      icon: PhoneCall,
      color: "from-orange-500 to-red-500"
    }
  ];

  const callsData = [
    { name: "Mon", calls: 45, conversions: 12 },
    { name: "Tue", calls: 52, conversions: 15 },
    { name: "Wed", calls: 48, conversions: 14 },
    { name: "Thu", calls: 61, conversions: 18 },
    { name: "Fri", calls: 55, conversions: 16 },
    { name: "Sat", calls: 38, conversions: 10 },
    { name: "Sun", calls: 42, conversions: 11 },
  ];

  const leadScoreData = [
    { name: "Hot", value: 324, color: "#ef4444" },
    { name: "Warm", value: 891, color: "#f59e0b" },
    { name: "Cold", value: 1632, color: "#3b82f6" },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "call",
      client: "Acme Corp",
      action: "AI voice call completed",
      time: "2 mins ago",
      status: "success"
    },
    {
      id: 2,
      type: "chat",
      client: "TechStart Inc",
      action: "Chatbot qualified lead",
      time: "5 mins ago",
      status: "success"
    },
    {
      id: 3,
      type: "lead",
      client: "GrowthCo",
      action: "New lead captured",
      time: "12 mins ago",
      status: "new"
    },
    {
      id: 4,
      type: "call",
      client: "ScaleUp Agency",
      action: "Follow-up call scheduled",
      time: "18 mins ago",
      status: "pending"
    },
  ];

  const aiInsights = [
    "Peak call hours: 2-4 PM (23% higher conversion)",
    "Top performing script: 'Consultation Offer' (18% conversion)",
    "Recommended action: Follow up with 47 warm leads this week",
    "Chatbot engagement up 34% on mobile devices"
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your business overview</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <ActivityIcon className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="hero">
              <PhoneCall className="mr-2 h-4 w-4" />
              Start Campaign
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant={card.positive ? "default" : "destructive"} className="gap-1">
                    {card.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {card.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calls Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Calls & Conversions</h3>
                  <p className="text-sm text-muted-foreground">Last 7 days performance</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending Up
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={callsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem"
                    }}
                  />
                  <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="conversions" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Lead Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Lead Distribution</h3>
                <p className="text-sm text-muted-foreground">By temperature score</p>
              </div>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={leadScoreData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leadScoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-2xl bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">AI Insights</h3>
                  <p className="text-sm text-muted-foreground">Powered by machine learning</p>
                </div>
              </div>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                      activity.type === "call" ? "bg-purple-500/10" :
                      activity.type === "chat" ? "bg-green-500/10" : "bg-blue-500/10"
                    }`}>
                      {activity.type === "call" ? <Phone className="h-5 w-5 text-purple-500" /> :
                       activity.type === "chat" ? <Bot className="h-5 w-5 text-green-500" /> :
                       <Users className="h-5 w-5 text-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.client}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                    <Badge 
                      variant={activity.status === "success" ? "default" : "outline"}
                      className={activity.status === "success" ? "bg-green-500/10 text-green-600 border-green-500/20" : ""}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6">
                View All Activity
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
