import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps a route to require authentication.
 * Shows a loading spinner while session is being restored,
 * then redirects to / if unauthenticated.
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-venture-accent/20" />
            <div className="absolute inset-0 rounded-full border-4 border-t-venture-accent animate-spin" />
          </div>
          <p className="text-muted-foreground text-sm animate-pulse">
            Restoring session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/" replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
