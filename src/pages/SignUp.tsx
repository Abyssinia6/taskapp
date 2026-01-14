import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Button from "../components/ui/Button"; 
import Input from "../components/ui/Input";   
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [city, setCity] = useState('');
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
        // Store extra data in user metadata
        data: {
          full_name: fullName,
          job_title: jobTitle,
          city: city,
        }
      },
    });

    setIsLoading(false);

    if (error) {
      alert(error.message);
    } else {
      if (data.session) {
        navigate('/dashboard');
      } else {
        alert('Account created! Please check your email to verify.');
        navigate('/login');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-2xl font-black tracking-tight">Create an Account</h2>
        <p className="text-sm text-slate-500">Join us to start managing your tasks.</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <Input 
          label="Full Name" 
          type="text" 
          placeholder="John Doe"
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
          isRequired
        />

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Job Title" 
            type="text" 
            placeholder="Designer"
            value={jobTitle} 
            onChange={(e) => setJobTitle(e.target.value)} 
            isRequired
          />
          <Input 
            label="City" 
            type="text" 
            placeholder="New York"
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            isRequired
          />
        </div>

        <Input 
          label="Email address"
          type="email" 
          placeholder="name@example.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          isRequired
        />

        <Input 
          label="Password"
          type="password" 
          placeholder="••••••••" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          isRequired
        />

        <Button 
          label={isLoading ? "Creating Account..." : "Sign Up"} 
          variant="primary"
          className="w-full h-11 font-bold mt-2"
          disabled={isLoading}
          type="submit"
        />
      </form>
      
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline font-bold">
          Log In
        </button>
      </p>
    </div>
  );
}