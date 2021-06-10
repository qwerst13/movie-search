import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? <h3>Something went wrong...</h3> : children;
  }
}
