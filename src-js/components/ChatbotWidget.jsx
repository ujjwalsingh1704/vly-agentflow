import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot,
  Sparkles,
  Phone
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const ChatbotWidget = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "👋 Hi there! I'm Vly AI Assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { label: "Book Demo", icon: Phone },
    { label: "Talk to AI", icon: Bot },
    { label: "Request Info", icon: Sparkles }
  ];

  const aiResponses = [
    "I'd be happy to help you with that! Our AI-powered CRM can automate your entire sales pipeline.",
    "Great question! Let me connect you with more information about our voice agent capabilities.",
    "We offer flexible pricing plans starting at $99/month. Would you like to schedule a demo?",
    "Our chatbot can handle thousands of conversations simultaneously, 24/7. Pretty impressive, right?",
    "I can help you get started right away. What specific features are you most interested in?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (label) => {
    setInput(label);
    handleSend();
    
    if (label === "Book Demo") {
      toast({
        title: "Demo Booking",
        description: "Redirecting to calendar...",
      });
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            {/* Test Toast Button - Remove in production */}
            <button 
              onClick={() => toast({
                title: "Test Notification",
                description: "This is a test notification from the chatbot.",
              })}
              className="absolute -top-12 right-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Test Toast
            </button>
            <Button
              variant="hero"
              size="lg"
              className="h-16 w-16 rounded-full shadow-glow hover:scale-110"
              onClick={() => setIsOpen(true)}
            >
              <MessageSquare className="h-7 w-7" />
            </Button>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-4 bg-gradient-primary text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Vly AI Assistant</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-white/90">Online</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background/50 to-background">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === "assistant" 
                        ? "bg-gradient-primary" 
                        : "bg-muted"
                    }`}>
                      {message.role === "assistant" ? (
                        <Bot className="h-5 w-5 text-white" />
                      ) : (
                        <span className="text-sm font-semibold">U</span>
                      )}
                    </div>
                    <div className={`flex flex-col gap-1 max-w-[70%] ${
                      message.role === "user" ? "items-end" : "items-start"
                    }`}>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.role === "assistant"
                          ? "bg-card border border-border/50"
                          : "bg-gradient-primary text-white"
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground px-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-2"
                  >
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '200ms' }} />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '400ms' }} />
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 1 && (
                <div className="p-4 pt-0 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-px flex-1 bg-border" />
                    <span>Quick replies</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 rounded-full gap-1.5"
                          onClick={() => handleQuickReply(item.label)}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {item.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="border-t border-border/50 p-4 bg-background/50">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-2xl border-border/50 focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="rounded-full h-10 w-10 flex-shrink-0"
                    disabled={!input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Vly AI Assistant - Powered by Vly AI
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
