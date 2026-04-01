import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <main style={{ padding: '120px 0' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gap: 20,
            maxWidth: 720,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div className="section-badge">404</div>
          <h1 className="section-title">Страница не найдена</h1>
          <p className="section-text">
            Возможно, ссылка устарела или страница была перемещена.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link className="button button--primary" to="/">
              На главную
            </Link>
            <Link className="button button--secondary" to="/blog">
              К новостям
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
