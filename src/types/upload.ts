import { ContentType, Language, Category } from './assets';

export type VerificationStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'APPROVED' | 'REJECTED';

export interface VerificationCheck {
  id: string;
  label: string;
  passed: boolean;
  scoreWeight: number; // Max points
  scoreEarned: number; // Points awarded
  details: string;
}

export interface VerificationResult {
  verificationVersion: string; // "2.0"
  verificationStatus: 'APPROVED' | 'REJECTED';
  status: VerificationStatus;
  score: number; // Overall Score 0 - 100
  passingScore: number; // 75%
  brandRelevancePassed: boolean; // MANDATORY HARD GATE
  brandEvidence: string[];
  checks: VerificationCheck[];
  failureReasons: string[];
  evaluatedAt: string;
  rejectionReason?: string;
}

export interface UserUpload {
  id: string;
  title: string;
  description?: string;
  contentType: ContentType;
  path: string; // Object URL or file path
  thumbnailPath?: string;
  fileSize: number; // in bytes
  fileSizeFormatted: string;
  fileExtension: string;
  language: Language;
  category: Category;
  tags: string[];
  verificationStatus: VerificationStatus;
  createdAt: string;
  verificationResult?: VerificationResult;
}

export const UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  VIDEO_MAX_SIZE: 50 * 1024 * 1024, // 50MB (per Phase 7 spec)
  DOCUMENT_MAX_SIZE: 25 * 1024 * 1024, // 25MB
};
