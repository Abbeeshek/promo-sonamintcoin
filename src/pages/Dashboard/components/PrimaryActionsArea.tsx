import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { UploadCloud, ArrowRight, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PrimaryActionsArea: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold font-display text-[#F3D068] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> High Priority Actions
        </h3>
        <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
          Quick Launch
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Action 1: Create & Publish Post */}
        <Card className="relative overflow-hidden p-6 sm:p-7 border-2 border-[#D4AF37]/50 bg-gradient-to-br from-[#181A22] via-[#1A1D28] to-[#14161D] shadow-2xl shadow-gold-glow/20 flex flex-col justify-between group">
          {/* Radiant Gold Flare Background */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-gradient p-0.5 shadow-gold-glow">
                <div className="w-full h-full rounded-[14px] bg-[#0A0B0E] flex items-center justify-center text-[#F3D068]">
                  <Send className="w-6 h-6" />
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-bold text-[#F3D068]">
                Publishing Suite
              </span>
            </div>

            <h3 className="text-xl font-extrabold font-display text-[#F9FAFB] mb-2 group-hover:text-[#F3D068] transition-colors">
              Start Social Publishing
            </h3>
            <p className="text-xs text-[#9CA3AF] leading-relaxed mb-6">
              Select approved brand videos or posters, compose your caption, pick target platforms, and publish immediately or schedule on calendar.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/app/create-post')}
            className="w-full shadow-gold-glow"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Create Your Post Now
          </Button>
        </Card>

        {/* Action 2: Upload Custom Media */}
        <Card className="relative overflow-hidden p-6 sm:p-7 border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#181A22] via-[#1A1D28] to-[#14161D] shadow-2xl shadow-gold-glow/15 flex flex-col justify-between group">
          {/* Radiant Gold Flare Background */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#F3D068]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#181A22] border border-[#D4AF37]/50 flex items-center justify-center text-[#F3D068]">
                <UploadCloud className="w-6 h-6 text-[#F3D068]" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-bold text-[#F3D068]">
                Personal Workspace
              </span>
            </div>

            <h3 className="text-xl font-extrabold font-display text-[#F9FAFB] mb-2 group-hover:text-[#F3D068] transition-colors">
              Upload Your Content
            </h3>
            <p className="text-xs text-[#9CA3AF] leading-relaxed mb-6">
              Upload your custom promotional video clips or posters, run transparent rule checks, and submit for brand approval.
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/app/my-uploads')}
            className="w-full border-[#D4AF37]/60 text-[#F3D068] hover:bg-[#D4AF37]/10"
            icon={<ShieldCheck className="w-4 h-4" />}
          >
            Go to My Uploads Workspace
          </Button>
        </Card>
      </div>
    </div>
  );
};
