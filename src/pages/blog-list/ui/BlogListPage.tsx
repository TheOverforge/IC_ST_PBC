import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { PostsPagination, PublicPost } from '../../../entities/post/model/types';
import { getImageUrl } from '../../../shared/lib/getImageUrl';
import { getReadingTime } from '../../../shared/lib/getReadingTime';
import { publicText } from '../../../shared/config/publicText';
import { Header } from '../../../widgets/header/ui/Header';
import { Footer } from '../../../widgets/footer/ui/Footer';
import { applyDocumentMeta } from '../../../shared/lib/meta';
import { applyCanonical } from '../../../shared/lib/canonical';
import { SITE_URL } from '../../../shared/config/api';

const { blog } = publicText;

const formatDate = (value?: string | null) => {
  if (!value) return '';

  return new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
};

export const BlogListPage = () => {
  useEffect(() => {
    const url = `${SITE_URL}/blog`;
    applyDocumentMeta({
      title: 'Новости IntelClinic — обновления платформы и отраслевые материалы',
      description:
        'Новости платформы IntelClinic, истории внедрения, цифровые процессы и материалы о развитии медицинской ИТ-среды.',
      image: `${SITE_URL}/og-cover.jpg`,
      url,
    });
    applyCanonical(url);
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Math.max(Number(searchParams.get('page') || 1), 1);
  const currentSearch = searchParams.get('search') || '';

  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [pagination, setPagination] = useState<PostsPagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setHasError(false);
        setIsLoading(true);

        const url = `/api/posts?page=${currentPage}&limit=7${
          currentSearch ? `&search=${encodeURIComponent(currentSearch)}` : ''
        }`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || !data.ok) throw new Error(data.message || 'Failed to load posts');

        setPosts(data.posts);
        setPagination(data.pagination);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPosts();
  }, [currentPage, currentSearch]);

  const changePage = (page: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(page));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      next.set('search', searchInput.trim());
    } else {
      next.delete('search');
    }
    next.set('page', '1');
    setSearchParams(next);
  };

  const pageButtons = pagination
    ? Array.from({ length: pagination.totalPages }, (_, index) => index + 1)
    : [];

  const featuredPost = useMemo(() => posts[0] ?? null, [posts]);
  const regularPosts = useMemo(() => posts.slice(1), [posts]);

  return (
    <>
      <Header />
      <main className="blog-list-page">
      <div className="container">
        <div className="blog-list-page__head">
          <div>
            <span className="blog__badge">{blog.badge}</span>
            <h1 className="blog__title" style={{ marginTop: 12 }}>
              {blog.title}
            </h1>
          </div>

          <p className="blog__description">{blog.description}</p>
        </div>

        <form className="blog-search" onSubmit={handleSearchSubmit}>
          <input
            className="blog-search__input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={blog.searchPlaceholder}
          />
          <button className="blog-search__button" type="submit">
            {blog.searchButton}
          </button>
        </form>

        {isLoading && <div className="blog__state">{blog.loadingList}</div>}
        {hasError && <div className="blog__state">{blog.listError}</div>}
        {!isLoading && !hasError && !posts.length && (
          <div className="blog__state">{blog.noPosts}</div>
        )}

        {!isLoading && !hasError && featuredPost ? (
          <>
            <article className="featured-post">
              <div className="featured-post__content">
                <div className="featured-post__meta">
                  <span className="blog-card__category">{blog.featured}</span>
                  <span className="blog-card__date">{formatDate(featuredPost.published_at)}</span>
                </div>

                <h2 className="featured-post__title">{featuredPost.title}</h2>
                <p className="featured-post__excerpt">{featuredPost.excerpt}</p>

                <div className="blog-card__submeta">
                  {featuredPost.author_name ? <span>{featuredPost.author_name}</span> : null}
                  <span>{getReadingTime(featuredPost.content)}</span>
                </div>

                <Link className="featured-post__link" to={`/blog/${featuredPost.slug}`}>
                  {blog.readFeatured}
                </Link>
              </div>

              {featuredPost.cover_image ? (
                <img
                  className="featured-post__image"
                  src={getImageUrl(featuredPost.cover_image)}
                  alt={featuredPost.title}
                />
              ) : null}
            </article>

            {!!regularPosts.length && (
              <div className="blog__grid">
                {regularPosts.map((post) => (
                  <article key={post.id} className="blog-card">
                    <div className="blog-card__meta">
                      <span className="blog-card__category">{blog.published}</span>
                      <span className="blog-card__date">{formatDate(post.published_at)}</span>
                    </div>

                    {post.cover_image ? (
                      <img
                        className="blog-card__image"
                        src={getImageUrl(post.cover_image)}
                        alt={post.title}
                      />
                    ) : null}

                    <h2 className="blog-card__title">{post.title}</h2>
                    <p className="blog-card__text">{post.excerpt}</p>

                    <div className="blog-card__submeta">
                      {post.author_name ? <span>{post.author_name}</span> : null}
                      <span>{getReadingTime(post.content)}</span>
                    </div>

                    <Link className="blog-card__link" to={`/blog/${post.slug}`}>
                      {blog.readMore}
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {pagination && pagination.totalPages > 1 ? (
              <div className="blog-pagination">
                <button
                  type="button"
                  className="blog-pagination__button"
                  disabled={pagination.page <= 1}
                  onClick={() => changePage(pagination.page - 1)}
                >
                  {blog.prev}
                </button>

                {pageButtons.map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`blog-pagination__button${page === pagination.page ? ' blog-pagination__button--active' : ''}`}
                    onClick={() => changePage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="blog-pagination__button"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => changePage(pagination.page + 1)}
                >
                  {blog.next}
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
      </main>
      <Footer />
    </>
  );
};
