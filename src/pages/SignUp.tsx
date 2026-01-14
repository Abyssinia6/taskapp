import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Button from "../components/ui/Button"; 
import Input from "../components/ui/Input";   
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      if (data.session) {
        navigate('/dashboard');
      } else {
        alert('Account created! Please check your email to verify (or disable this in Supabase settings).');
        navigate('/login');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md">
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-2xl font-bold">Create an Account</h2>
        <p className="text-sm text-slate-500">Join us to start managing your tasks.</p>
      </div>

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
      
      <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline font-medium">
          Log In
        </button>
      </p>
    </div>
  );
}