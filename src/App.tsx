import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { SignupPage } from './pages/Login/SignupPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppShell } from './components/app/AppShell';
import { AppDashboardPage } from './pages/AppDashboardPage';
import { AllContentPage } from './pages/Content/AllContentPage';
import { VideosPage } from './pages/Content/VideosPage';
import { PostersPage } from './pages/Content/PostersPage';
import { PresentationsPage } from './pages/Content/PresentationsPage';
import { MyUploadsPage } from './pages/Upload/MyUploadsPage';
import { CreatePostPage } from './pages/Publishing/CreatePostPage';
import { SocialAccountsPage } from './pages/Social/SocialAccountsPage';
import { SchedulePage } from './pages/Schedule/SchedulePage';
import { PublishingHistoryPage } from './pages/PublishingHistory/PublishingHistoryPage';
import { AnalyticsPage } from './pages/Analytics/AnalyticsPage';
import { AutomationPage } from './pages/Automation/AutomationPage';
import { NotificationsPage } from './pages/Notifications/NotificationsPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Cinematic Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Application Routes under /app */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppShell />}>
          <Route index element={<AppDashboardPage />} />

          {/* Content Management Suite */}
          <Route path="content" element={<AllContentPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="posters" element={<PostersPage />} />
          <Route path="presentations" element={<PresentationsPage />} />
          <Route path="my-uploads" element={<MyUploadsPage />} />

          {/* Publishing & Scheduling Suite */}
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="social-accounts" element={<SocialAccountsPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="publishing-history" element={<PublishingHistoryPage />} />

          {/* Insights & Automation */}
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="automation" element={<AutomationPage />} />

          {/* System & Preferences */}
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Fallback Wildcard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
