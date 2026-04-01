import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../../shared/ui/section/Section';
import { fetchPublicPosts } from '../../../entities/post/api/fetchPublicPosts';
import type { PublicPost } from '../../../entities/post/model/types';
import { getImageUrl } from '../../../shared/lib/getImageUrl';
import { getReadingTime } from '../../../shared/lib/getReadingTime';
import { publicText } from '../../../shared/config/publicText';

const { blog } = publicText;

const formatDate = (value?: string | null) => {
  if (!value) return '';

  return new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
};

export const BlogSection = () => {
  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setHasError(false);
        setIsLoading(true);
        const data = await fetchPublicPosts(1, 6);
        setPosts(data.posts);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPosts();
  }, []);

  return (
    <Section id="blog" className="blog page-section page-section--compact page-section--soft news-section">
      <div className="blog__head">
        <div>
          <div className="blog__badge">{blog.badge}</div>
          <h2 className="blog__title">{blog.title}</h2>
        </div>

        <p className="blog__description">{blog.description}</p>
      </div>

      {isLoading && <div className="blog__state">{blog.loadingList}</div>}
      {hasError && <div className="blog__state">{blog.listError}</div>}

      {!isLoading && !hasError && !posts.length && (
        <div className="blog__state">{blog.noPostsYet}</div>
      )}

      {!!posts.length && (
        <>
          <div className="blog__grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card__meta">
                  <span className="blog-card__category">{blog.published}</span>
                  <span className="blog-card__date">{formatDate(post.published_at)}</span>
                </div>

                {post.cover_image ? (
                  <img className="blog-card__image" src={getImageUrl(post.cover_image)} alt={post.title} />
                ) : null}

                <h3 className="blog-card__title">{post.title}</h3>
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

          <div className="blog__footer">
            <Link className="blog-card__link" to="/blog">
              {blog.viewAll}
            </Link>
          </div>
        </>
      )}
    </Section>
  );
};
