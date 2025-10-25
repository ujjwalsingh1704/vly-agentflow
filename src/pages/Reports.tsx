import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  TrendingUp,
  Calendar,
  FileText,
  BarChart3
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const Reports = () => {
  const conversionData = [
    { month: "Jan", leads: 245, converted: 62, rate: 25 },
    { month: "Feb", leads: 312, converted: 84, rate: 27 },
    { month: "Mar", leads: 289, converted: 78, rate: 27 },
    { month: "Apr", leads: 354, converted: 99, rate: 28 },
    { month: "May", leads: 421, converted: 131, rate: 31 },
    { month: "Jun", leads: 487, converted: 159, rate: 33 },
  ];

  const voiceAgentData = [
    { week: "Week 1", calls: 156, qualified: 42, appointments: 18 },
    { week: "Week 2", calls: 189, qualified: 54, appointments: 24 },
    { week: "Week 3", calls: 172, qualified: 48, appointments: 21 },
    { week: "Week 4", calls: 203, qualified: 61, appointments: 28 },
  ];

  const chatbotData = [
    { day: "Mon", messages: 420, leads: 28 },
    { day: "Tue", messages: 510, leads: 35 },
    { day: "Wed", messages: 480, leads: 31 },
    { day: "Thu", messages: 590, leads: 42 },
    { day: "Fri", messages: 540, leads: 38 },
    { day: "Sat", messages: 380, leads: 24 },
    { day: "Sun", messages: 350, leads: 22 },
  ];

  const campaignData = [
    { name: "Email Campaign A", impressions: 12500, clicks: 1250, conversions: 125, roi: "320%" },
    { name: "LinkedIn Outreach", impressions: 8900, clicks: 890, conversions: 98, roi: "280%" },
    { name: "Google Ads", impressions: 24500, clicks: 2450, conversions: 196, roi: "245%" },
    { name: "Referral Program", impressions: 5200, clicks: 780, conversions: 89, roi: "410%" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive performance insights</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="hero">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", value: "$127,500", change: "+18.2%", color: "from-green-500 to-emerald-500" },
            { label: "Conversion Rate", value: "31.2%", change: "+4.8%", color: "from-blue-500 to-cyan-500" },
            { label: "Avg Deal Size", value: "$4,200", change: "+12.3%", color: "from-purple-500 to-pink-500" },
            { label: "ROI", value: "312%", change: "+25.7%", color: "from-orange-500 to-red-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
                <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                    {stat.change}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Lead Conversion Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Lead Conversion Trends</h3>
              <p className="text-sm text-muted-foreground">6-month performance overview</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={conversionData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConverted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem"
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="leads" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="converted" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorConverted)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Voice Agent & Chatbot Performance */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Voice Agent Success Metrics</h3>
                <p className="text-sm text-muted-foreground">Last 4 weeks</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={voiceAgentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem"
                    }}
                  />
                  <Legend />
                  <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="qualified" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="appointments" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Chatbot Engagement Metrics</h3>
                <p className="text-sm text-muted-foreground">Weekly breakdown</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chatbotData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem"
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="messages" stroke="hsl(var(--primary))" strokeWidth={3} />
                  <Line type="monotone" dataKey="leads" stroke="hsl(var(--accent))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Campaign Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Campaign Performance</h3>
              <p className="text-sm text-muted-foreground">Active campaigns overview</p>
            </div>
            <div className="space-y-4">
              {campaignData.map((campaign, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border/30"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {campaign.impressions.toLocaleString()} impressions
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Clicks</p>
                        <p className="text-xl font-bold">{campaign.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversions</p>
                        <p className="text-xl font-bold">{campaign.conversions}</p>
                      </div>
                      <div>
                        <Badge variant="default" className="text-base px-4 py-2 bg-green-500/10 text-green-600 border-green-500/20">
                          {campaign.roi} ROI
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Export Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Export Reports</h3>
                <p className="text-sm text-muted-foreground">Download comprehensive reports in various formats</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button variant="hero">
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
