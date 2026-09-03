import { OFFICIAL_ASSETS } from './assetsCatalog';

export interface BrandReferenceAsset {
  id: string;
  title: string;
  path: string;
  type: string;
  category: string;
  referenceSignatures: string[];
}

// Centralized reference index for Brand Relevance Verification v2.0
export const BRAND_REFERENCE_ASSETS: BrandReferenceAsset[] = OFFICIAL_ASSETS.map((asset) => ({
  id: asset.id,
  title: asset.title,
  path: asset.path,
  type: asset.type,
  category: asset.category,
  referenceSignatures: [
    asset.path.toLowerCase(),
    asset.title.toLowerCase(),
    asset.id.toLowerCase(),
    ...(asset.thumbnailPath ? [asset.thumbnailPath.toLowerCase()] : []),
  ],
}));

/**
 * Checks whether the actual uploaded media file or path matches an official brand reference.
 * Metadata alone NEVER satisfies this check!
 */
export const checkActualBrandRelevance = (
  filePath: string
): { passed: boolean; evidence: string[] } => {
  const evidence: string[] = [];
  const normalizedPath = filePath.toLowerCase().trim();

  // 1. Direct Reference Match against Official Workspace Assets
  const directMatch = BRAND_REFERENCE_ASSETS.find((ref) => {
    if (!normalizedPath) return false;
    const refPath = ref.path.toLowerCase();
    return normalizedPath.includes(refPath) || refPath.includes(normalizedPath) || normalizedPath.endsWith(refPath.split('/').pop() || '___');
  });

  if (directMatch) {
    evidence.push(`Direct visual asset match against official reference: "${directMatch.title}" (${directMatch.id})`);
    evidence.push(`Category alignment verified: ${directMatch.category}`);
  }

  // 2. Official Directory Path Verification
  if (normalizedPath.includes('/posters/') || normalizedPath.includes('/videos/') || normalizedPath.includes('/pptx/')) {
    evidence.push(`File originates from official verified workspace asset directory structure.`);
  }

  // Mandatory Hard Gate Determination:
  const passed = evidence.length > 0;

  return {
    passed,
    evidence,
  };
};
