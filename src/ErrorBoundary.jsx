import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('TraceCrumb render failure', { error, componentStack: info.componentStack });
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="page-shell" role="alert">
        <section className="panel">
          <p className="eyebrow">TraceCrumb recovery boundary</p>
          <h1>The interface could not finish rendering.</h1>
          <p>
            Your incident data has not been submitted by this recovery screen. Reload the page;
            if the failure repeats, capture the browser console and the exact workflow step.
          </p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload TraceCrumb
          </button>
        </section>
      </main>
    );
  }
}
