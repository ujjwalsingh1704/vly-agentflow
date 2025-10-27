import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
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
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Bell,
  Search,
  UserCircle,
  HelpCircle,
  Sun,
  Moon
} from "lucide-react";
import { cn } from "../lib/utils";
import { AuthContext } from '../App';
import { useTheme } from "../hooks/use-theme";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const { theme, toggleTheme, isDarkModeDisabled } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      path: "/dashboard",
      badge: null
    },
    { 
      icon: Users, 
      label: "Leads", 
      path: "/leads",
      badge: '5+'
    },
    { 
      icon: Phone, 
      label: "Voice Agent", 
      path: "/voice-agent",
      badge: 'New'
    },
    { 
      icon: Activity, 
      label: "Activity", 
      path: "/activity",
      badge: null
    },
    { 
      icon: BarChart3, 
      label: "Reports", 
      path: "/reports",
      badge: null
    },
    { 
      icon: Settings, 
      label: "Settings", 
      path: "/settings",
      badge: null
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col",
        sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg p-1 -ml-1"
            aria-label="Go to home"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">VlyAgent</h1>
          </button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden h-8 w-8"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
            </div>
            {!isDarkModeDisabled && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-yellow-400" />
                ) : (
                  <Moon className="h-4 w-4 text-gray-600" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <div key={item.path} className="relative group">
                  <button
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-1.5 rounded-lg",
                        isActive 
                          ? "bg-indigo-100 dark:bg-indigo-800/50 text-indigo-600 dark:text-indigo-300"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center">
                      {item.badge && (
                        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200 ml-2">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className={cn(
                        "h-4 w-4 ml-1 transition-transform duration-200",
                        isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500"
                      )} />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => {
                navigate('/help');
                setSidebarOpen(false);
              }}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & Support
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              v1.0.0 • {new Date().getFullYear()} VlyAgent
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-72 transition-all duration-300">
        {/* Header */}
        <header className={cn(
          "sticky top-0 z-30 border-b border-gray-200 dark:border-gray-800 transition-all duration-300",
          scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md" : "bg-white dark:bg-gray-900"
        )}>
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="h-10 px-3 rounded-full flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden md:inline-flex items-center">
                    {user?.name || 'User'}
                    <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform", mobileMenuOpen ? 'transform rotate-180' : '')} />
                  </span>
                </Button>
                
                {/* Dropdown menu */}
                {mobileMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            navigate('/profile');
                            setMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Your Profile
                        </button>
                        <button
                          onClick={() => {
                            navigate('/settings');
                            setMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
