import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNavDrawer } from './MobileNavDrawer';

export const AppShell: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F9FAFB] flex font-sans">
      {/* Desktop Sidebar (Fixed) */}
      <div className="hidden lg:block shrink-0">
        <Sidebar className="h-screen sticky top-0" />
      </div>

      {/* Mobile Drawer Overlay */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="py-4 px-6 border-t border-white/[0.06] text-center text-xs text-[#6B7280]">
          Sona Mint Coin Promotional Hub &bull; Application Foundation
        </footer>
      </div>
    </div>
  );
};
