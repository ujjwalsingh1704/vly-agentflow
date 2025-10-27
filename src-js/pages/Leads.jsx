import { motion } from "framer-motion";
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
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
  PhoneCall,
  Download
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Leads = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "Website",
    status: "warm"
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const mockLeads = [
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
      name: "Jessica Williams",
      email: "jessica@digitalminds.com",
      phone: "+1 (555) 567-8901",
      company: "Digital Minds",
      source: "Cold Call",
      status: "cold",
      score: 45,
      lastContact: "1 week ago"
    },
    {
      id: 6,
      name: "Robert Kim",
      email: "rkim@techstart.com",
      phone: "+1 (555) 678-9012",
      company: "TechStart",
      source: "Trade Show",
      status: "cold",
      score: 32,
      lastContact: "2 weeks ago"
    }
  ];

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const indexOfLastLead = currentPage * itemsPerPage;
  const indexOfFirstLead = indexOfLastLead - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    // In a real app, you would add the new lead to your database here
    toast({
      title: "Lead Added",
      description: `${newLead.name} has been added to your leads.`,
    });
    setIsDialogOpen(false);
    // Reset form
    setNewLead({
      name: "",
      email: "",
      phone: "",
      company: "",
      source: "Website",
      status: "warm"
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "hot":
        return <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-orange-500">{status}</Badge>;
      case "warm":
        return <Badge variant="secondary" className="bg-gradient-to-r from-amber-400 to-yellow-500">{status}</Badge>;
      case "cold":
        return <Badge variant="outline" className="border-blue-400 text-blue-500">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col h-full w-full p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Leads</h1>
            <p className="text-sm text-muted-foreground">Manage and track your sales pipeline</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lead
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Lead</DialogTitle>
                  <DialogDescription>
                    Add a new lead to your pipeline. This will help you track potential customers.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddLead} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={newLead.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={newLead.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      value={newLead.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={newLead.company} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source">Source</Label>
                    <select
                      id="source"
                      name="source"
                      value={newLead.source}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Website">Website</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Trade Show">Trade Show</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex space-x-2">
                      {['hot', 'warm', 'cold'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          className={`px-3 py-1 text-sm rounded-full border ${
                            newLead.status === status 
                              ? status === 'hot' 
                                ? 'bg-red-100 text-red-700 border-red-200' 
                                : status === 'warm' 
                                  ? 'bg-amber-100 text-amber-700 border-amber-200' 
                                  : 'bg-blue-100 text-blue-700 border-blue-200'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                          onClick={() => setNewLead(prev => ({ ...prev, status }))}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add Lead</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden border shadow-sm">
          {/* Toolbar */}
          <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search leads..."
                  className="w-full bg-background pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filter:</span>
              </div>
              <div className="flex gap-1">
                {['all', 'hot', 'warm', 'cold'].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    className="capitalize"
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Last Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentLeads.length > 0 ? (
                  currentLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{lead.email}</span>
                          <span className="text-xs text-muted-foreground">{lead.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.source}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {lead.lastContact}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No leads found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredLeads.length > 0 && (
            <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{indexOfFirstLead + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastLead, filteredLeads.length)}
                </span>{' '}
                of <span className="font-medium">{filteredLeads.length}</span> leads
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show first, last and current page with neighbors
                    if (totalPages <= 5 || i === 0 || i === totalPages - 1 || (i >= currentPage - 2 && i <= currentPage)) {
                      return (
                        <Button
                          key={i}
                          variant={i + 1 === currentPage ? 'default' : 'outline'}
                          size="sm"
                          className="w-10 h-10 p-0"
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      );
                    }
                    // Show ellipsis
                    if (i === 1 || i === totalPages - 2) {
                      return <span key={i} className="px-2">...</span>;
                    }
                    return null;
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Leads;
