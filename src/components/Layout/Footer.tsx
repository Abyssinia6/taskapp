import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskMaster
            </span>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
          </div>

          {/* Social Section */}
          <div className="flex gap-5 text-slate-400">
            <a href="#" className="hover:text-slate-600 dark:hover:text-white transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-white transition-all">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-white transition-all">
              <Mail size={20} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;