import { motion } from "framer-motion";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Phone, 
  MessageSquare, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  Mail,
  Building,
  Sparkles,
  PhoneCall
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: "hot" | "warm" | "cold";
  score: number;
  lastContact: string;
}

const Leads = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "hot" | "warm" | "cold">("all");

  const mockLeads: Lead[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@techcorp.com",
      phone: "+1 (555) 123-4567",
      company: "TechCorp Solutions",
      source: "Website",
      status: "hot",
      score: 92,
      lastContact: "2 hours ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@innovate.io",
      phone: "+1 (555) 234-5678",
      company: "Innovate.io",
      source: "LinkedIn",
      status: "hot",
      score: 88,
      lastContact: "5 hours ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily@growthco.com",
      phone: "+1 (555) 345-6789",
      company: "GrowthCo",
      source: "Referral",
      status: "warm",
      score: 75,
      lastContact: "1 day ago"
    },
    {
      id: 4,
      name: "David Park",
      email: "d.park@startupx.com",
      phone: "+1 (555) 456-7890",
      company: "StartupX",
      source: "Google Ads",
      status: "warm",
      score: 68,
      lastContact: "2 days ago"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa@scaleventures.com",
      phone: "+1 (555) 567-8901",
      company: "Scale Ventures",
      source: "Website",
      status: "cold",
      score: 45,
      lastContact: "1 week ago"
    },
  ];

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = statusFilter === "all" || lead.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleStartCall = (lead: Lead) => {
    toast({
      title: "Voice Agent Starting",
      description: `Initiating AI call with ${lead.name}...`,
    });
  };

  const handleStartChat = (lead: Lead) => {
    toast({
      title: "Opening Chat",
      description: `Starting conversation with ${lead.name}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "hot": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "warm": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "cold": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default: return "";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600";
    if (score >= 60) return "text-orange-600";
    return "text-blue-600";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Leads & CRM</h1>
            <p className="text-muted-foreground">Manage and engage with your prospects</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Enter the lead information to add them to your CRM
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Acme Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Input id="source" placeholder="Website" />
                </div>
                <Button type="submit" variant="hero" className="w-full">
                  Add Lead
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: mockLeads.length, color: "from-blue-500 to-cyan-500" },
            { label: "Hot Leads", value: mockLeads.filter(l => l.status === "hot").length, color: "from-red-500 to-pink-500" },
            { label: "Warm Leads", value: mockLeads.filter(l => l.status === "warm").length, color: "from-orange-500 to-yellow-500" },
            { label: "Avg Score", value: Math.round(mockLeads.reduce((acc, l) => acc + l.score, 0) / mockLeads.length), color: "from-purple-500 to-pink-500" }
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
                <p className="text-3xl font-bold">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads by name, company, or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "hot" ? "default" : "outline"}
                onClick={() => setStatusFilter("hot")}
                className={statusFilter === "hot" ? "bg-red-500 hover:bg-red-600" : ""}
              >
                Hot
              </Button>
              <Button
                variant={statusFilter === "warm" ? "default" : "outline"}
                onClick={() => setStatusFilter("warm")}
                className={statusFilter === "warm" ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                Warm
              </Button>
              <Button
                variant={statusFilter === "cold" ? "default" : "outline"}
                onClick={() => setStatusFilter("cold")}
                className={statusFilter === "cold" ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                Cold
              </Button>
            </div>
          </div>
        </Card>

        {/* Leads Table */}
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
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead, index) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {lead.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          {lead.company}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.source}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(lead.status)}>
                          {lead.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </span>
                          <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {lead.lastContact}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartCall(lead)}
                          >
                            <PhoneCall className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartChat(lead)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
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

export default Leads;
