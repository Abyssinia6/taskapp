import React, { useState } from "react";
import Button from "../components/ui/Button";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/Card";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState(""); // New State
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");

    // 1. Validate Full Name (Letters and Spaces only)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullName)) {
      setError("Full Name must only contain letters.");
      return;
    }

    // 2. Validate Password Length (At least 8 characters)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      // 3. Simulated Email Logic
      // In a real app, you'd call an API here to send the "Welcome" email
      console.log(`Sending welcome email to: ${email}`);
      
      // Navigate to dashboard on success
      navigate('/Dashboard'); 
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] p-6">
      <Card className="w-full max-w-md shadow-2xl rounded-[32px] border-none">
        <CardHeader className="pt-10 pb-2">
          <CardTitle className="text-3xl font-black text-center text-slate-900 dark:text-white">
            Welcome Back
          </CardTitle>
          {error && <p className="text-red-500 text-center text-sm font-bold mt-2">{error}</p>}
        </CardHeader>
        
        <CardContent className="space-y-5 px-8 pb-8">
          {/* Full Name Input - Added Validation logic */}
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          <Button 
            label="Sign In" 
            onClick={handleLogin} 
            variant="primary"
            size="lg"
            className="w-full h-12 text-md font-bold rounded-2xl shadow-lg shadow-blue-500/20"
          />
         
        </CardContent>

        <CardFooter className="bg-slate-50 dark:bg-slate-800/50 rounded-b-[32px] p-6 justify-center">
          <p className="text-sm text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-bold hover:underline">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;