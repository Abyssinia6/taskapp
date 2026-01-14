import { useState } from "react";
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/Card";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    // REAL Supabase Login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white dark:bg-slate-900">
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-2xl font-black tracking-tight">Welcome back</CardTitle>
          <p className="text-sm text-slate-500">Enter your credentials to access your account</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-md font-bold text-center">
              {error}
            </div>
          )}
          
          <Input 
            label="Email" 
            type="email" 
            placeholder="name@example.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <div className="space-y-1">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <Link to="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline">
                  Forgot password?
                </Link>
             </div>
             <Input 
             label="Password"
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
             />
          </div>

          <Button 
            label={loading ? "Signing in..." : "Sign In"} 
            onClick={handleLogin} 
            disabled={loading}
            variant="primary" 
            className="w-full h-11 font-bold shadow-lg shadow-blue-500/20"
          />
        </CardContent>

        <CardFooter className="justify-center pb-8 pt-2">
          <p className="text-sm text-slate-500">
            Don't have an account? <Link to="/signup" className="font-bold text-blue-600 hover:underline">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}