import { UserUpload, VerificationResult, VerificationCheck, UPLOAD_LIMITS } from '../types/upload';
import { checkActualBrandRelevance } from '../data/brandReferenceAssets';

export const verifyUploadAsset = (upload: UserUpload): VerificationResult => {
  const checks: VerificationCheck[] = [];
  const failureReasons: string[] = [];

  // ==========================================
  // PART 1: TECHNICAL COMPLIANCE (30 POINTS)
  // ==========================================

  // A. File Format & Integrity (10 Points)
  const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'pdf', 'pptx'];
  const extPassed = validExtensions.includes(upload.fileExtension.toLowerCase());
  checks.push({
    id: 'tech-format',
    label: '1A. File Format & Media Integrity (10 pts)',
    passed: extPassed,
    scoreWeight: 10,
    scoreEarned: extPassed ? 10 : 0,
    details: extPassed
      ? `Valid format (${upload.fileExtension.toUpperCase()}) with readable media headers.`
      : `Unsupported file format (.${upload.fileExtension}). Must be JPG, PNG, WEBP, MP4, MOV, PDF, or PPTX.`,
  });
  if (!extPassed) failureReasons.push(`Invalid file format: .${upload.fileExtension} is unsupported.`);

  // B. File Size & Resolution Boundaries (10 Points)
  let maxLimit = UPLOAD_LIMITS.IMAGE_MAX_SIZE; // 10MB
  if (upload.contentType === 'videos') maxLimit = UPLOAD_LIMITS.VIDEO_MAX_SIZE; // 50MB per Phase 7 spec
  if (upload.contentType === 'presentations') maxLimit = UPLOAD_LIMITS.DOCUMENT_MAX_SIZE;

  const sizePassed = upload.fileSize > 0 && upload.fileSize <= maxLimit;
  checks.push({
    id: 'tech-size',
    label: '1B. File Size & Dimension Boundaries (10 pts)',
    passed: sizePassed,
    scoreWeight: 10,
    scoreEarned: sizePassed ? 10 : 0,
    details: sizePassed
      ? `${upload.fileSizeFormatted} is within boundary limit (${Math.round(maxLimit / 1024 / 1024)} MB max).`
      : `File size ${upload.fileSizeFormatted} exceeds maximum limit of ${Math.round(maxLimit / 1024 / 1024)} MB.`,
  });
  if (!sizePassed) failureReasons.push(`File size ${upload.fileSizeFormatted} exceeds allowable system boundary.`);

  // C. Metadata Completeness (10 Points)
  const titlePassed = upload.title.trim().length >= 3;
  const descPassed = !!(upload.description && upload.description.trim().length >= 5);
  const metadataPassed = titlePassed && descPassed;
  checks.push({
    id: 'tech-metadata',
    label: '1C. Metadata Completeness (10 pts)',
    passed: metadataPassed,
    scoreWeight: 10,
    scoreEarned: metadataPassed ? 10 : titlePassed ? 5 : 0,
    details: metadataPassed
      ? 'Asset title and description metadata complete.'
      : titlePassed
      ? 'Title complete, but description needs at least 5 characters.'
      : 'Title must be at least 3 descriptive characters long.',
  });
  if (!metadataPassed) failureReasons.push('Incomplete metadata: Provide a clear title and description.');

  // ==========================================
  // PART 2: CONTENT COMPLIANCE (70 POINTS)
  // ==========================================

  // A. Brand Relevance (40 Points) — MANDATORY HARD GATE
  // Evaluates actual media reference evidence. Metadata keywords alone CANNOT satisfy this check!
  const brandRelevance = checkActualBrandRelevance(upload.path);
  const brandRelevancePassed = brandRelevance.passed;

  checks.push({
    id: 'content-brand-relevance',
    label: '2A. Brand Relevance Hard Gate (40 pts)',
    passed: brandRelevancePassed,
    scoreWeight: 40,
    scoreEarned: brandRelevancePassed ? 40 : 0,
    details: brandRelevancePassed
      ? `Brand evidence verified: ${brandRelevance.evidence.join('; ')}`
      : 'HARD GATE FAILURE: Media file does not match official Sona Mint Coin reference assets. Metadata alone cannot approve uploaded content.',
  });
  if (!brandRelevancePassed) {
    failureReasons.push('Brand relevance could not be verified: Actual media file is not demonstrably related to official Sona Mint Coin reference assets.');
  }

  // B. Language & Regional Compliance (10 Points)
  const validLanguages = ['English', 'Hindi', 'Tamil', 'General'];
  const langPassed = validLanguages.includes(upload.language);
  checks.push({
    id: 'content-language',
    label: '2B. Language & Regional Compliance (10 pts)',
    passed: langPassed,
    scoreWeight: 10,
    scoreEarned: langPassed ? 10 : 0,
    details: langPassed
      ? `Supported language selection: "${upload.language}".`
      : 'Language tag must be English, Hindi, Tamil, or General.',
  });
  if (!langPassed) failureReasons.push(`Unsupported language tag: "${upload.language}".`);

  // C. Promotional Content Suitability (20 Points)
  const categoryPassed = !!upload.category;
  checks.push({
    id: 'content-suitability',
    label: '2C. Promotional Context & Category Alignment (20 pts)',
    passed: categoryPassed,
    scoreWeight: 20,
    scoreEarned: categoryPassed ? 20 : 0,
    details: categoryPassed
      ? `Category alignment verified: "${upload.category}".`
      : 'Asset must belong to an official promotional campaign category.',
  });
  if (!categoryPassed) failureReasons.push('Missing promotional category assignment.');

  // ==========================================
  // FINAL SCORE & HARD GATE DECISION
  // ==========================================
  const totalScore = checks.reduce((acc, c) => acc + c.scoreEarned, 0);
  const passingScore = 75;

  // MANDATORY HARD GATE EVALUATION
  let verificationStatus: 'APPROVED' | 'REJECTED' = 'REJECTED';

  if (!brandRelevancePassed) {
    verificationStatus = 'REJECTED';
  } else if (totalScore >= passingScore) {
    verificationStatus = 'APPROVED';
  } else {
    verificationStatus = 'REJECTED';
  }

  const isApproved = verificationStatus === 'APPROVED';

  return {
    verificationVersion: '2.0',
    verificationStatus,
    status: isApproved ? 'approved' : 'rejected',
    score: totalScore,
    passingScore,
    brandRelevancePassed,
    brandEvidence: brandRelevance.evidence,
    checks,
    failureReasons,
    evaluatedAt: new Date().toISOString(),
    rejectionReason: isApproved
      ? undefined
      : !brandRelevancePassed
      ? 'REJECTED (Hard Gate Failed): Actual media file is not demonstrably related to Sona Mint Coin official reference assets.'
      : `REJECTED: Overall compliance score of ${totalScore}% is below the required ${passingScore}% threshold.`,
  };
};
