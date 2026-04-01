import { Route, Routes } from 'react-router-dom';
import { LandingPage } from '../pages/landing/ui/LandingPage';
import { BlogPostPage } from '../pages/blog-post/ui/BlogPostPage';
import { BlogListPage } from '../pages/blog-list/ui/BlogListPage';
import { NotFoundPage } from '../pages/not-found/ui/NotFoundPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
