import type { PostsPagination, PublicPost } from '../model/types';

export const fetchPublicPosts = async (
  page = 1,
  limit = 6,
): Promise<{ posts: PublicPost[]; pagination: PostsPagination }> => {
  const response = await fetch(`/api/posts?page=${page}&limit=${limit}`);
  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || 'Failed to load posts');
  }

  return {
    posts: data.posts,
    pagination: data.pagination,
  };
};
