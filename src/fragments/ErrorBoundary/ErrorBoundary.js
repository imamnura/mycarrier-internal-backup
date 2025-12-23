/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  // componentDidCatch(error, errorInfo) {
  // You can use your own error logging service here
  // console.log({ error, errorInfo });
  // }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <Typography inline variant="h4">
            Oops, there is an error!
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
