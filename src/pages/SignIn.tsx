
import React from "react";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PenAnimation from "@/components/PenAnimation";
import MainLayout from "@/layouts/MainLayout";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard after successful login
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container max-w-md py-16">
        <Card className="border border-kavya-pink/20 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <PenAnimation className="mb-2" />
            <CardTitle className="text-2xl font-bold text-kavya-darkblue dark:text-kavya-lightpink">
              लॉग इन करें
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              अपने खाते में प्रवेश करें और अपनी कविताएँ साझा करें
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="ईमेल पता"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    placeholder="पासवर्ड"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Link to="/forgot-password" className="text-kavya-purple hover:text-kavya-pink">
                    पासवर्ड भूल गए?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-kavya-purple to-kavya-pink hover:opacity-90 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>लॉग इन हो रहा है...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>लॉग इन करें</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <span>खाता नहीं है? </span>
              <Link to="/signup" className="text-kavya-purple hover:text-kavya-pink font-medium">
                रजिस्टर करें
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              <Link to="/" className="hover:text-kavya-purple">
                होम पेज पर वापस जाएं
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SignIn;
