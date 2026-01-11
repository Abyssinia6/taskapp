import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Button  from "../components/ui/Button"; 
import Input  from "../components/ui/Input";   
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    setIsLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the confirmation link!'); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <Input 
          type="email" 
          placeholder="Email" 
          label='Email address'
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          isRequired={true}
        />
        <Input 
          type="password" 
            label='Password'
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
            isRequired={true}
        />
       <Button 
    label={isLoading ? "Signing Up..." : "Sign Up"} 
    variant="primary"
    className="w-full"
    disabled={isLoading}
  />
      </form>
    </div>
  );
}