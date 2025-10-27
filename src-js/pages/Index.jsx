import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Phone, 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  Users, 
  BarChart3,
  Check,
  ArrowRight,
  Sparkles,
  Bot,
  Target,
  Workflow,
  Menu
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Phone,
      title: "AI Voice Calls",
      description: "Intelligent voice agents that qualify leads and book appointments automatically.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Lead Qualification & Scoring",
      description: "AI-powered lead intelligence that prioritizes your best opportunities.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageSquare,
      title: "Chatbot Engagement",
      description: "24/7 conversational AI that engages prospects and captures qualified leads.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Workflow,
      title: "Automated Marketing Workflows",
      description: "Agentic workflows that nurture leads from first touch to closed deal.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$99",
      description: "Perfect for small businesses",
      features: [
        "100 AI voice calls/month",
        "500 chatbot conversations",
        "Basic lead scoring",
        "Email support",
        "1 team member"
      ]
    },
    {
      name: "Professional",
      price: "$299",
      description: "For growing teams",
      features: [
        "500 AI voice calls/month",
        "2,000 chatbot conversations",
        "Advanced lead scoring",
        "Priority support",
        "5 team members",
        "Custom workflows",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited voice calls",
        "Unlimited chatbot",
        "Custom AI training",
        "Dedicated account manager",
        "SLA guarantees",
        "On-premise deployment",
        "Custom development"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mr-2">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  VlyAgent
                </span>
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#features" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Features
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Pricing
                </a>
                <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Testimonials
                </a>
              </div>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth')}
                className="text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                Get Started
              </Button>
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1 bg-white">
            <a href="#features" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
              Features
            </a>
            <a href="#pricing" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
              Pricing
            </a>
            <a href="#testimonials" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
              Testimonials
            </a>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4 space-x-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  onClick={() => navigate('/auth')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Lead Generation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Business with <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Agents</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Automate lead generation, qualification, and engagement with our AI-powered platform. 
              Close more deals while saving time and resources.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25"
                onClick={() => navigate('/auth')}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 hover:bg-gray-50"
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to automate and scale your lead generation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${feature.gradient} mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'lg:scale-105 z-10' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-1 text-sm font-medium text-white bg-indigo-600 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}
                <Card className={`h-full flex flex-col overflow-hidden ${plan.popular ? 'border-2 border-indigo-500' : ''}`}>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== 'Custom' && <span className="text-gray-600">/month</span>}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto p-6 pt-0">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                      size="lg"
                      onClick={() => navigate('/auth')}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to grow your business?</h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using our platform to streamline their lead generation and sales processes.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-indigo-700 hover:bg-gray-100 font-medium"
              onClick={() => navigate('/auth')}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
