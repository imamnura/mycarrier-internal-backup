import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import { Box, Grid } from '@material-ui/core';
import { getValueObject } from '@utils/common';
import Status from '@components/Status';
import useStyles from './styles';

const Numbering = (props) => {
  const { number, data, alignItems, schema, size } = props;

  const classes = useStyles({ alignItems, size });

  let renderContent = null;

  if (schema.length) {
    renderContent = (
      <>
        {schema?.map(({ name, label, schemaStatus, hidden, converter }) => {
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
            <Grid
              alignItems="flex-start"
              container
              key={`numbering-item-${name}`}
            >
              <Grid item xs={4}>
                <Typography children={label} variant="caption" />
              </Grid>
              <Grid item xs={8}>
                <Typography children={child} variant="caption" />
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  } else if (['string', 'number'].includes(typeof data)) {
    renderContent = <Typography children={data} inline variant="caption" />;
  } else {
    renderContent = data;
  }

  return (
    <Box className={classes.root} my={2}>
      <div className={classes.number}>
        <Typography
          children={number}
          color="white"
          inline
          variant={{ default: 'h5', small: 'overline' }[size]}
          weight={{ default: 'medium', small: 'normal' }[size]}
        />
      </div>
      <Box pl={{ default: 3, small: 2 }[size]} width="100%">
        {renderContent}
      </Box>
    </Box>
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
