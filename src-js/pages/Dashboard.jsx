import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
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
  Bot,
  Calendar
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

// Sample data for the charts
const barData = [
  { name: 'Mon', calls: 20, conversions: 8 },
  { name: 'Tue', calls: 35, conversions: 15 },
  { name: 'Wed', calls: 25, conversions: 12 },
  { name: 'Thu', calls: 40, conversions: 18 },
  { name: 'Fri', calls: 30, conversions: 10 },
  { name: 'Sat', calls: 15, conversions: 5 },
  { name: 'Sun', calls: 10, conversions: 3 },
];

const Dashboard = () => {
  // Mock data
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
      type: "ai",
      client: "Global Solutions",
      action: "AI agent scheduled follow-up",
      time: "12 mins ago",
      status: "pending"
    },
    {
      id: 4,
      type: "call",
      client: "InnovateX",
      action: "Missed call - left voicemail",
      time: "25 mins ago",
      status: "warning"
    },
    {
      id: 5,
      type: "chat",
      client: "NextGen Tech",
      action: "New lead captured",
      time: "42 mins ago",
      status: "success"
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-blue-500">Calls:</span> {payload[0].value}
          </p>
          <p className="text-sm">
            <span className="text-emerald-500">Conversions:</span> {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-6">
      {/* Header with Status */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here's what's happening with your AI agents.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-4 py-2 rounded-lg">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="font-medium">AI Agent Active</span>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            This Month
          </Button>
        </div>
      </div>
      <div className="space-y-6">

        {/* Bar Chart Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Weekly Call Analytics</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Total Calls</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Conversions</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    border: 'none'
                  }}
                />
                <Bar 
                  dataKey="calls" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
                <Bar 
                  dataKey="conversions" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Summary Cards */}
      <div className="container mx-auto p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {summaryCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                    <div className={`mt-2 inline-flex items-center text-sm ${
                      card.positive ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {card.positive ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {card.change}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Calls & Conversions Chart */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Calls & Conversions</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Week</Button>
                <Button variant="ghost" size="sm">Month</Button>
                <Button variant="ghost" size="sm">Year</Button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={callsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    yAxisId="left" 
                    orientation="left" 
                    stroke="#3b82f6"
                    axisLine={false} 
                    tickLine={false}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#10b981"
                    axisLine={false} 
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="calls"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversions"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Lead Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Lead Distribution</h3>
            <div className="flex flex-col md:flex-row items-center">
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadScoreData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {leadScoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 mt-6 md:mt-0 md:ml-8">
                {leadScoreData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{
                            width: `${(item.value / leadScoreData.reduce((a, b) => a + b.value, 0)) * 100}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-border last:border-0 last:pb-0">
                <div className={`p-2 rounded-lg mr-4 ${
                  activity.type === 'call' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'chat' ? 'bg-blue-100 text-blue-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  {activity.type === 'call' ? (
                    <Phone className="h-4 w-4" />
                  ) : activity.type === 'chat' ? (
                    <MessageSquare className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.client}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-3">{activity.time}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
