// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { Create } from "./pages/Create/Create";
import DocumentView from "./pages/DocumentView/DocumentView";
import LoginPage from "./pages/Login/Login";
import { Landing } from "./pages/Landing/Landing";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// App wrapper to use auth context
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={!isAuthenticated ? <Landing /> : <Navigate to="/home" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />}
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create" element={<Create />} />
        <Route path="document/:id" element={<DocumentView />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  // Set dark theme preference in HTML tag
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.className = "bg-dark-950 text-white min-h-screen";
  }, []);

  return (
    <Router>
      <AuthProvider>
        {/* Gradient background with animation */}
        <div className="gradient-bg"></div>

        {/* Animated background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Large translucent gradient orb in top right */}
          <div className="absolute top-[-300px] right-[-300px] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-secondary-600/10 to-primary-700/10 blur-3xl"></div>

          {/* Smaller orb in bottom left */}
          <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary-700/10 to-secondary-600/10 blur-3xl"></div>

          {/* Small accent orbs */}
          <div className="absolute top-[20%] left-[30%] w-[200px] h-[200px] rounded-full bg-secondary-700/5 blur-2xl"></div>
          <div className="absolute bottom-[30%] right-[20%] w-[150px] h-[150px] rounded-full bg-primary-700/5 blur-2xl"></div>
        </div>

        {/* App content */}
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
