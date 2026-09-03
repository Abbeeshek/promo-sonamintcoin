import { ScheduledPost } from '../types/scheduling';
import { DEMO_SCHEDULED_POSTS } from '../data/demoData';

const SCHEDULE_STORAGE_KEY = 'smc_scheduled_posts';

export const getScheduledPosts = (): ScheduledPost[] => {
  try {
    const raw = localStorage.getItem(SCHEDULE_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(DEMO_SCHEDULED_POSTS));
      return DEMO_SCHEDULED_POSTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse scheduled posts from localStorage:', e);
    return DEMO_SCHEDULED_POSTS;
  }
};

export const saveScheduledPost = (post: ScheduledPost): ScheduledPost[] => {
  const current = getScheduledPosts();
  const updated = [post, ...current];
  localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const updateScheduledPost = (updatedPost: ScheduledPost): ScheduledPost[] => {
  const current = getScheduledPosts();
  const updated = current.map((p) => (p.id === updatedPost.id ? updatedPost : p));
  localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteScheduledPost = (id: string): ScheduledPost[] => {
  const current = getScheduledPosts();
  const updated = current.filter((p) => p.id !== id);
  localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const cancelScheduledPost = deleteScheduledPost;
