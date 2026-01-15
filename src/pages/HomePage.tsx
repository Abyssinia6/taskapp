import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Sparkles, Target, Calendar, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function HomePage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-slate-100 transition-all duration-500">
      <header className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto flex justify-end">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-xl hover:scale-110 transition-all duration-200 border border-white/20 dark:border-slate-700/20"
          >
            {isDarkMode ? <Sun className="text-yellow-400 w-5 h-5" /> : <Moon className="text-blue-600 w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-widest uppercase">
                <Sparkles size={16} />
                <span>Smart Task Management</span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]">Organize Your World</h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg font-medium leading-relaxed">
                Plan your tasks and boost your productivity with our intuitive task manager built for modern teams.
              </p>
              <Button
                label="Get Started"
                onClick={() => navigate('/login')}
                variant="primary"
                size="lg"
                icon={<ArrowRight size={20} />}
              />
            </div>
          </div>
        </div>
      </main>

      <section className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-8">
              <Target className="mx-auto mb-6 text-blue-500" size={32} />
              <h3 className="text-2xl font-bold mb-4">Set Objectives</h3>
              <p className="text-slate-600 dark:text-slate-300">Track progress and celebrate achievements.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-8">
              <Calendar className="mx-auto mb-6 text-green-500" size={32} />
              <h3 className="text-2xl font-bold mb-4">Smart Calendar</h3>
              <p className="text-slate-600 dark:text-slate-300">Visualize tasks and deadlines at a glance.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}