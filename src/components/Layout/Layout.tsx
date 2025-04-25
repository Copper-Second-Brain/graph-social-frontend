// src/components/Layout/Layout.tsx
import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Home,
  User,
  PlusCircle,
  LogOut,
  Globe,
  Menu,
  X,
  ChevronRight,
  Search,
} from "lucide-react";

export const Layout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get first letter of username for avatar
  const userInitial = currentUser?.username.charAt(0).toUpperCase() || "U";

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - fixed on large screens, sliding on mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 glass-card-dark border-r border-white/10 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close button - only on mobile */}
        <button
          className="absolute top-4 right-4 p-1 text-white/70 hover:text-white lg:hidden"
          onClick={closeSidebar}
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 mb-2">
          <Globe className="text-secondary-600" size={24} />
          <span className="text-xl font-bold gradient-text">
            Knowledge Graph
          </span>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-secondary-900/50 text-white font-medium"
                  : "text-white/70 hover:bg-dark-800/60 hover:text-white"
              }`
            }
            onClick={closeSidebar}
          >
            <Home size={18} />
            <span>Home</span>
            <ChevronRight
              size={16}
              className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${
                location.pathname === "/home" ? "opacity-100" : ""
              }`}
            />
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-secondary-900/50 text-white font-medium"
                  : "text-white/70 hover:bg-dark-800/60 hover:text-white"
              }`
            }
            onClick={closeSidebar}
          >
            <User size={18} />
            <span>Profile</span>
            <ChevronRight
              size={16}
              className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${
                location.pathname === "/profile" ? "opacity-100" : ""
              }`}
            />
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-secondary-900/50 text-white font-medium"
                  : "text-white/70 hover:bg-dark-800/60 hover:text-white"
              }`
            }
            onClick={closeSidebar}
          >
            <PlusCircle size={18} />
            <span>Create</span>
            <ChevronRight
              size={16}
              className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${
                location.pathname === "/create" ? "opacity-100" : ""
              }`}
            />
          </NavLink>
        </nav>

        {/* User section at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-4">
          <div className="glass-card-dark flex items-center gap-3 p-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-medium">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser?.username}
              </p>
              <p className="text-xs text-white/50 truncate">
                {currentUser?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-dark-800/60 hover:text-white transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 glass-card-dark border-b border-white/10 px-4 py-4 shadow-md backdrop-blur-md">
          <div className="flex items-center justify-between">
            {/* Mobile menu toggle */}
            <button
              className="p-2 rounded-lg text-white/70 hover:bg-dark-800/60 hover:text-white lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>

            {/* Search bar */}
            <form
              className="hidden md:flex flex-1 max-w-md mx-6"
              onSubmit={handleSearch}
            >
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search knowledge graph..."
                  className="w-full bg-dark-800/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary-600/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Title - shown on mobile */}
            <h1 className="text-lg font-bold gradient-text md:hidden">
              Knowledge Graph
            </h1>

            {/* User avatar - optional on larger screens */}
            <div className="flex items-center gap-3 ml-auto lg:ml-0">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-medium md:hidden">
                {userInitial}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-dark-950/80 z-30 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};
