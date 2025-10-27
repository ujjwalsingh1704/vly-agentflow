import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { AuthContext } from "../App";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e) => {
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

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    console.log('handleVerifyOTP called with OTP:', otp);
    
    if (!otp) {
      console.log('No OTP provided');
      toast({
        title: "Error",
        description: "Please enter the OTP",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    console.log('Starting OTP verification...');
    
    try {
      // Simulate API call
      console.log('Simulating API call...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save auth token and update auth state
      const authToken = `dummy-auth-token-${Date.now()}`;
      console.log('Calling login function with token:', authToken);
      login(authToken);
      console.log('Login function completed');
      
      // Verify token is set in localStorage
      const tokenInStorage = localStorage.getItem('authToken');
      console.log('Token in localStorage after login:', tokenInStorage);
      
      toast({
        title: "Welcome to Vly AI!",
        description: "Authentication successful.",
      });
      
      console.log('Navigating to dashboard...');
      // Navigate to dashboard using react-router's navigate
      console.log('Navigation initiated to /dashboard');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error in handleVerifyOTP:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to verify OTP",
        variant: "destructive"
      });
    } finally {
      console.log('Cleaning up loading state');
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      // Set a guest token
      const guestToken = `guest-token-${Date.now()}`;
      localStorage.setItem('authToken', guestToken);
      
      // Update auth context
      login(guestToken);
      
      toast({
        title: "Guest Access Granted",
        description: "Exploring as guest user.",
      });
      
      // Navigate to dashboard
      navigate("/dashboard", { replace: true });
      
    } catch (error) {
      console.error('Error in guest login:', error);
      toast({
        title: "Error",
        description: "Failed to start guest session",
        variant: "destructive"
      });
    }
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
            <h1 className="text-2xl font-bold text-center">Welcome to Vly AI</h1>
            <p className="text-muted-foreground text-center">
              {step === "email" 
                ? "Sign in with your email" 
                : "Enter the verification code"}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Continue with Email"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  type="button"
                  className="gap-2"
                  disabled={isLoading}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  type="button"
                  className="gap-2"
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.108 0-.612.492-1.108 1.1-1.108s1.1.497 1.1 1.108c0 .613-.493 1.108-1.1 1.108zm8 6.891h-1.706v-3.6c0-.832-.014-1.9-1.158-1.9-1.16 0-1.337.906-1.337 1.838v3.662h-1.704v-7.33h1.637v1.005h.024c.309-.585 1.065-1.203 2.191-1.203 2.345 0 2.777 1.541 2.777 3.548v3.98h-1.7v.001z" />
                  </svg>
                  Guest
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">
                  We've sent a verification code to <span className="font-medium text-foreground">{email}</span>
                </p>
                <div className="space-y-2">
                  <Label htmlFor="otp" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Verification Code
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="text-center text-xl tracking-widest font-mono h-14 bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Didn't receive a code? <button type="button" className="text-primary hover:underline">Resend</button>
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>
              
              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                ← Back to sign in
              </button>
            </form>
          )}
        </Card>
        
        <p className="mt-6 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{' '}
          <a href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
