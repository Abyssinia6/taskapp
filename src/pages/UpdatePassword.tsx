import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully!");
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
      <h2 className="text-2xl font-black mb-2">Set New Password</h2>
      <p className="text-slate-500 text-sm mb-6">Enter your new secure password below.</p>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input 
          label="New Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isRequired
        />
        <Button 
          label={loading ? "Updating..." : "Update Password"} 
          className="w-full h-11 font-bold"
          type="submit"
          disabled={loading || password.length < 6}
          variant="primary"
        />
      </form>
    </div>
  );
}