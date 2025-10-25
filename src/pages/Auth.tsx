import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP send
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      toast({
        title: "OTP Sent!",
        description: "Check your email for the verification code.",
      });
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to Vly AI!",
        description: "Authentication successful.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const handleGuestLogin = () => {
    toast({
      title: "Guest Access Granted",
      description: "Exploring as guest user.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="p-8 md:p-10 bg-card/80 backdrop-blur-xl border-border/50 shadow-glow">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold">Vly AI CRM</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {step === "email" ? "Sign in to your account" : "Enter verification code"}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    Continue with Email <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12"
                onClick={handleGuestLogin}
              >
                Continue as Guest
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 h-12 rounded-xl text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Code sent to {email}
                </p>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                className="w-full h-12"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    Verify & Continue <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setStep("email")}
              >
                Back to Email
              </Button>
            </form>
          )}

          <p className="text-xs text-center text-muted-foreground mt-8">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          🔒 Secured by Vly AI
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
