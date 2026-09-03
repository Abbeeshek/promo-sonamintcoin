import { UserUpload } from '../types/upload';

const STORAGE_KEY = 'smc_user_uploads';

const initialSampleUploads: UserUpload[] = [];

export const getStoredUploads = (): UserUpload[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSampleUploads));
      return initialSampleUploads;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse user uploads from localStorage:', e);
    return initialSampleUploads;
  }
};

export const saveUpload = (upload: UserUpload): UserUpload[] => {
  const current = getStoredUploads();
  const updated = [upload, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const updateUpload = (updatedUpload: UserUpload): UserUpload[] => {
  const current = getStoredUploads();
  const updated = current.map((u) => (u.id === updatedUpload.id ? updatedUpload : u));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteUpload = (id: string): UserUpload[] => {
  const current = getStoredUploads();
  const updated = current.filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
