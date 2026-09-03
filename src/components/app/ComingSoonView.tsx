import React from 'react';
import { Card } from '../ui/Card';
import { Sparkles } from 'lucide-react';

interface ComingSoonViewProps {
  title: string;
  description?: string;
}

export const ComingSoonView: React.FC<ComingSoonViewProps> = ({
  title,
  description = 'This feature module will be implemented in a future phase of the Sona Mint Coin Promotional Hub.',
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center max-w-xl mx-auto">
      <Card className="w-full flex flex-col items-center p-8 sm:p-12 relative overflow-hidden">
        {/* Ambient Gold Light */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-14 h-14 rounded-2xl bg-[#181A22] border border-[#D4AF37]/30 flex items-center justify-center text-[#F3D068] mb-6 shadow-gold-glow">
          <Sparkles className="w-7 h-7" />
        </div>

        <h2 className="text-2xl font-bold font-display text-[#F9FAFB] mb-3">{title}</h2>
        
        <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
          {description}
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181A22] border border-white/10 text-xs font-medium text-[#D4AF37]">
          <span>Phase 1 Application Shell Foundation</span>
        </div>
      </Card>
    </div>
  );
};
