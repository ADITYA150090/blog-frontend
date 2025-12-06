import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import RocketLoader from './components/RocketLoader';
import WorkshopPopup from './components/WorkshopPopup';
import SEO from './components/SEO';

import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import ProjectDetail from './pages/ProjectDetail';
import UserProfile from './pages/UserProfile';
import SearchPage from './pages/SearchPage';
import AdminDashboard from './pages/AdminDashboard';
import AllBlogs from './pages/AllBlogs';
import AllProjects from './pages/AllProjects';
import HowToWrite from './pages/HowToWrite';
import NotFound from './pages/NotFound';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <RocketLoader isLoading={isLoading} />
      <WorkshopPopup />
      <SEO />


      <div className="app-container">
        <Sidebar
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />

        <main className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/profile/:username" element={<UserProfile />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/how-to-write" element={<HowToWrite />} />
            {/* 404 Page - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;

