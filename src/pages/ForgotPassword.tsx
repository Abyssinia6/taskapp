import { useState } from "react";
import { supabase } from '../lib/supabase';
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
const handleReset = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage(null);
 const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
 setLoading(false);
if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ 
        type: 'success', 
        text: "Reset link sent! Please check your email inbox." 
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-6">
      <Card className="w-full max-w-md shadow-xl border-none bg-white dark:bg-slate-900">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-black">Reset Password</CardTitle>
          <p className="text-sm text-slate-500">We'll send a recovery link to your email.</p>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {message && (
            <div className={`p-3 rounded-lg text-sm font-bold text-center ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-600 dark:bg-green-900/20' 
                : 'bg-red-50 text-red-600 dark:bg-red-900/20'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-4">
            <Input 
              label="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="name@company.com"
              isRequired={true}
            />
            <Button 
              label={loading ? "Sending..." : "Send Reset Link"} 
              disabled={loading}
              className="w-full h-11 font-bold" 
              variant="primary"
              type="submit"
            />
          </form>
          <Button 
            label="Back to Login" 
            variant="ghost" 
            onClick={() => navigate('/login')} 
            className="w-full text-slate-500 hover:text-slate-900" 
          />
        </CardContent>
      </Card>
    </div>
  );
}