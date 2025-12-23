import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { TextField } from '@components/FormField';
import SectionMark from '../../components/SectionMark';
import useStyles from './styles';

const RegistrationLink = ({ previewMode, useform: { control }, tab }) => {
  const classes = useStyles(previewMode);

  return (
    <div className={classes.root}>
      {!previewMode && <SectionMark title="Registration Link" />}

      <Grid container direction="column">
        <Grid item sm={5} xs={12}>
          <Box>
            <TextField
              control={control}
              disabled={tab === 'en' ? true : false}
              label="Event Registration"
              maxLength={240}
              minRows={3}
              multiline
              name="eventRegistration"
              required
            />
          </Box>

          <Box mt={3}>
            <TextField
              control={control}
              disabled={tab === 'en' ? true : false}
              label="Link (for Past Event)"
              maxLength={240}
              minRows={3}
              multiline
              name="pastLink"
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

RegistrationLink.defaultProps = {
  tab: 'id',
};

RegistrationLink.propTypes = {
  previewMode: PropTypes.bool.isRequired,
  tab: PropTypes.string,
  useform: PropTypes.object.isRequired,
};

export default RegistrationLink;
