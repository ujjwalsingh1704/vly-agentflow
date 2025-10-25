import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  MessageSquare, 
  Activity, 
  BarChart3, 
  Settings, 
  Sparkles,
  LogOut,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Leads", path: "/leads" },
    { icon: Phone, label: "Voice Agent", path: "/voice-agent" },
    { icon: Activity, label: "Activity", path: "/activity" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Vly AI CRM</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12 rounded-xl",
                    isActive && "bg-primary/10 text-primary font-medium hover:bg-primary/15"
                  )}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 rounded-xl"
              onClick={() => navigate("/")}
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
