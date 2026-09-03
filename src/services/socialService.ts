import { SocialAccount } from '../types/publishing';

const SOCIAL_STORAGE_KEY = 'smc_social_accounts';

const defaultAccounts: SocialAccount[] = [
  {
    id: 'acc-insta',
    platform: 'instagram',
    platformName: 'Instagram',
    displayName: 'Sona Mint Coin Official',
    handle: '@sonamintcoin',
    status: 'connected',
    connectedAt: '2026-08-01',
    avatarUrl: '/LOGO/Sonamitcoin/WhatsApp Image 2026-08-17 at 13.17.31 (2).jpeg',
  },
  {
    id: 'acc-[#14161D]-fb',
    platform: 'facebook',
    platformName: 'Facebook',
    displayName: 'Sona Mint Coin Global Page',
    handle: 'SonaMintCoinGlobal',
    status: 'connected',
    connectedAt: '2026-08-05',
    avatarUrl: '/LOGO/Sonamitcoin/WhatsApp Image 2026-08-17 at 13.17.31 (2).jpeg',
  },
  {
    id: 'acc-li',
    platform: 'linkedin',
    platformName: 'LinkedIn',
    displayName: 'Sona Mint Coin Corporate',
    handle: 'sona-mint-coin-official',
    status: 'connected',
    connectedAt: '2026-08-10',
    avatarUrl: '/LOGO/Sonamitcoin/WhatsApp Image 2026-08-17 at 13.17.31 (2).jpeg',
  },
  {
    id: 'acc-tw',
    platform: 'twitter',
    platformName: 'X (Twitter)',
    displayName: 'Sona Mint Coin',
    handle: '@sonamintcoin',
    status: 'disconnected',
  },
  {
    id: 'acc-pin',
    platform: 'pinterest',
    platformName: 'Pinterest',
    displayName: 'Sona Mint Coin Visuals',
    handle: 'sonamintcoin_pin',
    status: 'disconnected',
  },
];

export const getSocialAccounts = (): SocialAccount[] => {
  try {
    const raw = localStorage.getItem(SOCIAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SOCIAL_STORAGE_KEY, JSON.stringify(defaultAccounts));
      return defaultAccounts;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse social accounts:', e);
    return defaultAccounts;
  }
};

export const toggleSocialConnection = (accountId: string): SocialAccount[] => {
  const current = getSocialAccounts();
  const updated = current.map((acc) => {
    if (acc.id === accountId) {
      const isConnecting = acc.status === 'disconnected';
      return {
        ...acc,
        status: isConnecting ? ('connected' as const) : ('disconnected' as const),
        connectedAt: isConnecting ? new Date().toISOString().split('T')[0] : undefined,
      };
    }
    return acc;
  });
  localStorage.setItem(SOCIAL_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
