import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';

const SectionContainer = ({ title, children }) => (
  <Box mt={4}>
    <Typography
      children={title}
      color="general-mid"
      variant="h4"
      weight="medium"
    />
    <Box children={children} mt={4} />
  </Box>
);

SectionContainer.defaultProps = {
  title: '',
};

SectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default SectionContainer;
