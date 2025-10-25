import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot,
  Sparkles,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatbotWidget = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "👋 Hi there! I'm Vly AI Assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    const userMessage: Message = {
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
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (label: string) => {
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

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-card border border-border/50">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="h-2 w-2 bg-primary rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="h-2 w-2 bg-primary rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="h-2 w-2 bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="px-4 py-3 border-t border-border/50 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleQuickReply(reply.label)}
                      >
                        <reply.icon className="h-3 w-3 mr-1" />
                        {reply.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-border/50 bg-card">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    variant="hero"
                    size="icon"
                    disabled={!input.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Powered by Vly AI
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
