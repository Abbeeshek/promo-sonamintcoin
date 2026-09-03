import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { UserUpload, VerificationResult } from '../../types/upload';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, ArrowRight, Award, AlertTriangle, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VerificationModalProps {
  upload: UserUpload | null;
  result: VerificationResult | null;
  isOpen: boolean;
  onClose: () => void;
  onFix: (upload: UserUpload) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  upload,
  result,
  isOpen,
  onClose,
  onFix,
}) => {
  const navigate = useNavigate();

  if (!upload || !result) return null;

  const isApproved = result.verificationStatus === 'APPROVED' || result.status === 'approved';
  const score = result.score ?? 0;
  const passingScore = result.passingScore ?? 75;
  const brandPassed = result.brandRelevancePassed;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Brand Verification Results (Engine v2.0)" maxWidth="md">
      <div className="space-y-6">
        {/* Engine v2.0 Header Tag */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
            <Cpu className="w-4 h-4 text-[#F3D068]" />
            <span>VERIFICATION ENGINE v2.0</span>
          </div>
          <span className="text-[10px] font-mono text-[#6B7280]">
            Evaluated: {new Date(result.evaluatedAt || Date.now()).toLocaleTimeString()}
          </span>
        </div>

        {/* Compliance Score Meter & Hard Gate Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#181A22] via-[#1A1D27] to-[#181A22] border border-[#D4AF37]/30 shadow-2xl shadow-gold-glow/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#F3D068]" />
              <span className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider">
                Overall Compliance Score
              </span>
            </div>
            <span className="text-xl font-black font-mono text-[#F3D068]">
              {score}% / 100%
            </span>
          </div>

          {/* Progress Meter Bar */}
          <div className="w-full h-3 rounded-full bg-[#0A0B0E] border border-white/10 overflow-hidden mb-3 relative">
            <div
              className={`h-full transition-all duration-700 ${
                isApproved ? 'bg-gold-gradient shadow-gold-glow' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>

          {/* Hard Gate & Passing Threshold Indicators */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#0A0B0E] border border-white/10 flex items-center justify-between">
              <span className="text-[#9CA3AF] text-[11px]">Brand Relevance Gate:</span>
              <span className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded ${
                brandPassed ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {brandPassed ? 'PASSED' : 'HARD GATE FAILED'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0A0B0E] border border-white/10 flex items-center justify-between">
              <span className="text-[#9CA3AF] text-[11px]">Approval Threshold:</span>
              <span className="font-mono font-bold text-[#F9FAFB] text-[11px]">
                {passingScore}% Score
              </span>
            </div>
          </div>
        </div>

        {/* Primary Decision Banner */}
        <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
          isApproved
            ? 'bg-green-500/10 border-green-500/30 text-green-300'
            : 'bg-red-500/10 border-red-500/30 text-red-300'
        }`}>
          {isApproved ? (
            <ShieldCheck className="w-8 h-8 text-green-400 shrink-0" />
          ) : (
            <ShieldAlert className="w-8 h-8 text-red-400 shrink-0" />
          )}

          <div>
            <h4 className="text-base font-bold font-display">
              {isApproved ? 'VERIFICATION APPROVED' : 'VERIFICATION REJECTED'}
            </h4>
            <p className="text-xs opacity-90 leading-relaxed">
              {isApproved
                ? `Score of ${score}% meets all Sona Mint Coin brand & technical guidelines. Asset approved for social publishing!`
                : !brandPassed
                ? 'Brand relevance could not be verified: Actual media file is not demonstrably related to official Sona Mint Coin reference assets. Metadata alone cannot bypass verification.'
                : `Compliance score of ${score}% is below the required ${passingScore}% approval threshold.`}
            </p>
          </div>
        </div>

        {/* Brand Evidence (If Available) */}
        {result.brandEvidence && result.brandEvidence.length > 0 && (
          <div className="p-3.5 rounded-xl bg-[#181A22] border border-[#D4AF37]/20 text-xs">
            <span className="font-bold text-[#F3D068] block mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Verified Brand Evidence
            </span>
            <ul className="space-y-1 text-[#9CA3AF] font-mono text-[11px]">
              {result.brandEvidence.map((ev, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">•</span> {ev}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Failure Reasons Breakdown (If Rejected) */}
        {!isApproved && result.failureReasons && result.failureReasons.length > 0 && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
            <span className="font-bold block mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" /> Verification Failure Rationale
            </span>
            <ul className="space-y-1 font-mono text-[11px] text-red-200">
              {result.failureReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-red-400">•</span> <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Itemized Guideline Breakdown Table */}
        <div>
          <h5 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Detailed Guideline Breakdown (Technical 30pts + Content 70pts)</span>
            <span>Points Earned</span>
          </h5>
          <div className="space-y-2.5">
            {result.checks.map((check) => (
              <div
                key={check.id}
                className="p-3.5 rounded-xl bg-[#181A22] border border-white/5 flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  {check.passed ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold text-[#F9FAFB] block">{check.label}</span>
                    <span className="text-[11px] text-[#9CA3AF] leading-relaxed">{check.details}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className={`text-xs font-bold font-mono ${
                    check.passed ? 'text-green-400' : 'text-red-400'
                  }`}>
                    +{check.scoreEarned}/{check.scoreWeight}
                  </span>
                  <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded uppercase mt-0.5 ${
                    check.passed ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {check.passed ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>

          {isApproved ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                onClose();
                navigate(`/app/create-post?assetId=${upload.id}`);
              }}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start Social Post
            </Button>
          ) : (
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                onClose();
                onFix(upload);
              }}
            >
              Fix Guideline Details
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
