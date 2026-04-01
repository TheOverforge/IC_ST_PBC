import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import { fetchPublicPostBySlug } from '../../../entities/post/api/fetchPublicPostBySlug';
import type { PublicPost } from '../../../entities/post/model/types';
import { getImageUrl } from '../../../shared/lib/getImageUrl';
import { applyDocumentMeta } from '../../../shared/lib/meta';
import { applyCanonical } from '../../../shared/lib/canonical';
import { SITE_URL } from '../../../shared/config/api';
import { getReadingTime } from '../../../shared/lib/getReadingTime';
import { trackEvent } from '../../../shared/lib/trackEvent';
import { publicText } from '../../../shared/config/publicText';
import { Header } from '../../../widgets/header/ui/Header';
import { Footer } from '../../../widgets/footer/ui/Footer';

const { blog } = publicText;

const formatDate = (value?: string | null) => {
  if (!value) return blog.draft;

  return new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
};

export const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<PublicPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<PublicPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [copyDone, setCopyDone] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      try {
        setHasError(false);
        setIsLoading(true);

        const data = await fetchPublicPostBySlug(slug);
        setPost(data.post);
        setRelatedPosts(data.relatedPosts);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPost();
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const url = window.location.href;
    const imageUrl = post.cover_image
      ? getImageUrl(post.cover_image)
      : `${SITE_URL}/og-cover.jpg`;

    applyDocumentMeta({
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || '',
      image: imageUrl,
      url,
    });

    applyCanonical(url);

    trackEvent('blog.post.view', { slug: post.slug, title: post.title });
  }, [post]);

  const readingTime = useMemo(() => getReadingTime(post?.content), [post?.content]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2000);
      trackEvent('blog.post.share', { method: 'copy_link', slug: post?.slug });
    } catch {
      // clipboard not available
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="blog-post-page">
          <div className="container">
            <div className="blog__state">{blog.loadingPost}</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (hasError || !post) {
    return (
      <>
        <Header />
        <main className="blog-post-page">
          <div className="container">
            <div className="blog__state">{blog.postError}</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="blog-post-page">
      <div className="container">
        <Link to="/blog" className="blog-post-page__back">
          {blog.back}
        </Link>

        <article className="blog-post-article">
          <div className="article-meta-row">
            <span className="article-meta-pill">{blog.published}</span>
            <span className="article-meta-item">{formatDate(post.published_at)}</span>
            <span className="article-meta-item">{readingTime}</span>
            <span className="article-meta-item">
              {blog.by} {post.author_name || blog.authorFallback}
            </span>
          </div>

          <h1 className="blog-post-article__title">{post.title}</h1>

          {post.excerpt ? <p className="blog-post-article__lead">{post.excerpt}</p> : null}

          <div className="article-author-summary">
            <div className="article-author-summary__avatar">
              {(post.author_name || blog.authorFallback).charAt(0)}
            </div>
            <div className="article-author-summary__content">
              <strong>{post.author_name || blog.authorFallback}</strong>
              <span>Материал IntelClinic о цифровых процессах и медицинской платформе</span>
            </div>
          </div>

          {post.cover_image ? (
            <img
              className="blog-post-article__image"
              src={getImageUrl(post.cover_image)}
              alt={post.title}
            />
          ) : null}

          <div className="blog-post-article__content markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content || ''}</ReactMarkdown>
          </div>

          <footer className="blog-post-article__footer">
            <div className="blog-post-article__share">
              <span className="blog-post-article__share-label">{blog.share}</span>
              <div className="blog-post-article__share-actions">
                <button
                  type="button"
                  className="blog-post-article__share-link"
                  onClick={handleCopyLink}
                >
                  {copyDone ? blog.copied : blog.copyLink}
                </button>
              </div>
            </div>

          </footer>
        </article>

        {!!relatedPosts.length && (
          <section className="related-posts">
            <div className="related-posts__head">
              <h2 className="related-posts__title">{blog.related}</h2>
            </div>

            <div className="blog__grid">
              {relatedPosts.map((item) => (
                <article key={item.id} className="blog-card">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">{blog.published}</span>
                    <span className="blog-card__date">{formatDate(item.published_at)}</span>
                  </div>

                  {item.cover_image ? (
                    <img
                      className="blog-card__image"
                      src={getImageUrl(item.cover_image)}
                      alt={item.title}
                    />
                  ) : null}

                  <h3 className="blog-card__title">{item.title}</h3>
                  <p className="blog-card__text">{item.excerpt}</p>

                  <div className="blog-card__submeta">
                    {item.author_name ? <span>{item.author_name}</span> : null}
                    <span>{getReadingTime(item.content)}</span>
                  </div>

                  <Link className="blog-card__link" to={`/blog/${item.slug}`}>
                    {blog.readMore}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
      </main>
      <Footer />
    </>
  );
};
