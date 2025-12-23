import React from 'react';
import { Box, Grid } from '@material-ui/core';
import ButtonMinimal from '@components/ButtonMinimal';
import PropTypes from 'prop-types';

const Separator = ({ onClick, variant, label }) => {
  return (
    <Box mb={2} mt={2}>
      <Grid alignItems="center" container justifyContent="flex-end">
        <Grid item md={10} xs={5}>
          <div style={{ borderTop: '2px dashed #B3C3CA' }} />
        </Grid>

        <Grid align="center" item md={2} xs={7}>
          <ButtonMinimal label={label} onClick={onClick} variant={variant} />
        </Grid>
      </Grid>
    </Box>
  );
};

Separator.defaultProps = {
  label: '',
  variant: '',
};

Separator.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

export default Separator;
