import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import Divider from '@__old/components/elements/Divider';
import { image } from '@configs';
import Generator from './lib/Generator';
import useStyles from './styles';

export default function Content(props) {
  const {
    header: { title, subtitle },
    label,
    schema,
    additionalContent,
  } = props;

  const classes = useStyles();

  return (
    <Box className={classes.mainWrapper}>
      <Grid alignItems="center" container spacing={2}>
        <Grid item lg={2} md={3} xs={4}>
          <img
            alt="mycarrier-logo"
            className={classes.logo}
            src={image.logoSquare}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography children={title} variant="h5" weight="medium" />
          <Box mt="4px">
            <Typography children={subtitle} variant="subtitle1" />
          </Box>
        </Grid>
      </Grid>
      <Box my={2}>
        <Divider />
      </Box>
      <Box mb={1} mt={4}>
        <Typography variant="subtitle1">{label}</Typography>
      </Box>
      <Generator schema={schema} />
      <Box>{additionalContent}</Box>
    </Box>
  );
}

Content.defaultProps = {
  header: {
    caption: '',
    title: '',
  },
  label: '',
  schema: [],
  additionalContent: null,
};

Content.propTypes = {
  header: PropTypes.object,
  label: PropTypes.string,
  schema: PropTypes.array,
  additionalContent: PropTypes.node,
};
