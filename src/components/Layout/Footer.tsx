const Footer = () => {
  return (
    <footer className="w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
         
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskManager
            </span>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

         

          

        </div>
      </div>
    </footer>
  );
};

export default Footer;