import React from 'react';
import { ParticleBackground } from '../components/home/ParticleBackground';
import { HomeNavbar } from '../components/home/HomeNavbar';
import { HeroSection } from '../components/home/HeroSection';
import { BrandStatement } from '../components/home/BrandStatement';
import { FeatureSection } from '../components/home/FeatureSection';
import { VisualShowcase } from '../components/home/VisualShowcase';
import { FinalCTA } from '../components/home/FinalCTA';
import { HomeFooter } from '../components/home/HomeFooter';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050506] text-[#F9FAFB] relative selection:bg-[#D4AF37]/30 selection:text-[#F3D068]">
      {/* HTML5 Canvas Gold Particle Atmosphere */}
      <ParticleBackground />

      {/* Glassmorphic Navbar with Official Logo */}
      <HomeNavbar />

      {/* Main Page Content */}
      <main className="relative z-10">
        <HeroSection />
        <BrandStatement />
        <FeatureSection />
        <VisualShowcase />
        <FinalCTA />
      </main>

      {/* Footer with Official Logo */}
      <HomeFooter />
    </div>
  );
};
