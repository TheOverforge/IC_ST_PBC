import type { PublicPost } from '../model/types';

export const fetchPublicPostBySlug = async (
  slug: string,
): Promise<{ post: PublicPost; relatedPosts: PublicPost[] }> => {
  const response = await fetch(`/api/posts/${slug}`);
  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || 'Failed to load post');
  }

  return {
    post: data.post,
    relatedPosts: data.relatedPosts || [],
  };
};
