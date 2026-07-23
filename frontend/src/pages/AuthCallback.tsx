import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * OAuth Callback Page
 * Google redirects here with ?token=<accessToken>
 * We grab the token, clear it from the URL, fetch user, and redirect.
 */
const AuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      // Store token in memory via a custom event so AuthContext can pick it up
      // We re-use refreshAuth to sync state from the httpOnly cookie that was set
      // The access token from the URL is only used briefly to fetch the user
      window.history.replaceState({}, document.title, "/auth/callback");

      // Use the token from URL to bootstrap auth state
      const initFromToken = async () => {
        try {
          // Manually set token in sessionStorage briefly for the auth fetch
          sessionStorage.setItem("_tmp_at", token);
          await refreshAuth();
          sessionStorage.removeItem("_tmp_at");
        } finally {
          navigate("/start", { replace: true });
        }
      };

      initFromToken();
    } else {
      navigate("/login?error=oauth_failed", { replace: true });
    }
  }, [params, navigate, refreshAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-venture-accent/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-venture-accent animate-spin" />
        </div>
        <p className="text-muted-foreground text-sm animate-pulse">
          Completing sign-in...
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
