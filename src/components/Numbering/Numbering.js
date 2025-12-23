import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Typography';
import { Box, Grid } from '@material-ui/core';
import useStyles from './styles';
import Information from '@components/Information';
import { getValueObject } from '@utils/common';
import Status from '@components/Status';

const Numbering = (props) => {
  const { number, data, alignItems, schema, size } = props;

  const classes = useStyles({ alignItems, size });

  let renderContent = null;

  if (schema.length) {
    renderContent = (
      <Grid container spacing={2}>
        {schema?.map(
          ({ name, label, schemaStatus, hidden, grid = 6, converter }) => {
            const value = getValueObject({ name, data });

            let child = value || '-';

            if (converter) {
              child = converter(value);
            }

            if (schemaStatus && !!value) {
              child = (
                <Box sx={{ display: 'flex' }}>
                  <Status children={value} variant={schemaStatus[value]} />
                </Box>
              );
            } else if (hidden && !value) {
              return null;
            }

            return (
              <Grid item key={name} sm={grid} xs={12}>
                <Information label={label} value={child} />
              </Grid>
            );
          },
        )}
      </Grid>
    );
  } else if (['string', 'number'].includes(typeof data)) {
    renderContent = <Typography children={data} inline variant="subtitle1" />;
  } else {
    renderContent = data;
  }

  return (
    <div className={classes.root}>
      <div className={classes.number}>
        <Typography
          children={number}
          color="white"
          inline
          variant={{ default: 'h5', small: 'overline' }[size]}
          weight={{ default: 'medium', small: 'normal' }[size]}
        />
      </div>
      <Box
        className={classes.content}
        pl={{ default: 3, small: 2 }[size]}
        width="100%"
      >
        {renderContent}
      </Box>
    </div>
  );
};

Numbering.defaultProps = {
  alignItems: 'center',
  data: null,
  number: 0,
  schema: [],
  size: 'default',
};

Numbering.propTypes = {
  alignItems: PropTypes.oneOf(['center', 'flex-start']),
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  schema: PropTypes.array,
  size: PropTypes.oneOf(['default', 'small']),
};

export default Numbering;
