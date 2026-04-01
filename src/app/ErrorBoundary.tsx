import React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string;
};

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'Unexpected application error',
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Public UI crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
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
              <div className="section-badge">Ошибка</div>
              <h1 className="section-title">Что-то пошло не так</h1>
              <p className="section-text">
                Во время загрузки интерфейса произошла ошибка.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  className="button button--primary"
                  type="button"
                  onClick={() => window.location.reload()}
                >
                  Перезагрузить страницу
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
