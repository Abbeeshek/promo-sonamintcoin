import React from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { MinimalNav } from '../components/landing/MinimalNav';
import { CinematicHero } from '../components/landing/CinematicHero';
import { MinimalFooter } from '../components/landing/MinimalFooter';

export const LandingPage: React.FC = () => {
  return (
    <PageWrapper>
      <MinimalNav />
      <main className="flex-1 flex flex-col justify-center">
        <CinematicHero />
      </main>
      <MinimalFooter />
    </PageWrapper>
  );
};
