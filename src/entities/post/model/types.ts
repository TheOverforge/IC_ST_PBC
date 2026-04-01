export interface PublicPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  cover_image?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
  scheduled_publish_at?: string | null;
  author_name?: string | null;
}

export interface PostsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  search?: string;
}
