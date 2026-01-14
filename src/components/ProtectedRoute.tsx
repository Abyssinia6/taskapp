import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!session) {
   
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};