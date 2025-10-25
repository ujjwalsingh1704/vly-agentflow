import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Workflow
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

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
      name: "Pro",
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
      name: "Agency",
      price: "$799",
      description: "For marketing agencies",
      features: [
        "2,000 AI voice calls/month",
        "10,000 chatbot conversations",
        "White-label solution",
        "Dedicated support",
        "Unlimited team members",
        "Advanced analytics",
        "Custom integrations"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited AI calls",
        "Unlimited conversations",
        "Custom AI training",
        "24/7 support",
        "Dedicated account manager",
        "Custom SLA",
        "On-premise deployment"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechStart Inc",
      content: "Vly AI transformed our lead generation. We're closing 3x more deals with half the effort.",
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Director, GrowthCo",
      content: "The AI voice agents are incredible. They sound natural and qualify leads better than our team.",
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Founder, ScaleUp Agency",
      content: "We manage 50+ clients with Vly AI. The automation workflows are a game-changer.",
      avatar: "EW"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Vly AI CRM</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/auth")}>Sign In</Button>
            <Button variant="hero" onClick={() => navigate("/auth")}>Start Free Trial</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20" variant="outline">
            <Bot className="h-3 w-3 mr-1" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Automate Your Business Growth with AI Agents
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Transform your sales pipeline with AI-powered voice calls, intelligent lead scoring, and automated marketing workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="glass" size="lg">
              <Phone className="mr-2 h-5 w-5" />
              Book Demo
            </Button>
          </div>

          {/* Hero Image/Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/10 to-background p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-full">
                  {[
                    { icon: Phone, label: "Voice AI", color: "text-purple-500" },
                    { icon: Target, label: "Lead Intelligence", color: "text-blue-500" },
                    { icon: Workflow, label: "Agentic Workflow", color: "text-green-500" },
                    { icon: MessageSquare, label: "Chatbot", color: "text-orange-500" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-card/70 backdrop-blur-sm border border-border/30 hover:shadow-glow transition-all cursor-pointer hover:scale-105"
                    >
                      <item.icon className={`h-10 w-10 ${item.color}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" variant="outline">
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Scale
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful AI agents that work 24/7 to grow your business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all hover:scale-[1.02] cursor-pointer">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 bg-gradient-primary text-white shadow-glow">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10M+", label: "AI Calls Made" },
              { value: "25K+", label: "Active Users" },
              { value: "3.5x", label: "Avg. Lead Increase" },
              { value: "95%", label: "Customer Satisfaction" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-purple-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Card>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" variant="outline">
            Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`p-8 h-full border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all hover:scale-105 ${plan.popular ? 'border-primary shadow-glow' : ''}`}>
                {plan.popular && (
                  <Badge className="mb-4 bg-gradient-primary text-white">Most Popular</Badge>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full mb-6"
                  onClick={() => navigate("/auth")}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" variant="outline">
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Businesses Worldwide
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-12 md:p-16 bg-gradient-primary text-white shadow-glow text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses using AI to automate growth. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="glass" 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => navigate("/auth")}
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90 border-0">
                <Phone className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold">Vly AI CRM</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Automate your business growth with AI agents.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Use Cases</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Vly AI CRM. All rights reserved. Secured by Vly AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
