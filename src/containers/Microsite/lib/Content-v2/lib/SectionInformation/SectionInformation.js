import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { getValueObject } from '@utils/common';
import Typography from '@components/Typography';
import useStyles from '../../styles';
import Document from '../../elements/Document';

const SectionInformation = (props) => {
  const { schema, data } = props;
  const classes = useStyles();

  return (
    <Box className={classes.content} my={2}>
      {schema?.map(({ name, label, converter, type, render }, idx) => {
        let value = getValueObject({ name, data });

        if (!name && type === 'custom') {
          return render;
        }

        if (converter) {
          value = converter(value);
        }

        if (type === 'list') {
          if (Array.isArray(value) && !!value) {
            value = (
              <ul className={classes.list}>
                {value.map((item, i) => (
                  <li key={`list-${item}-${i}`}>
                    <Box py="2px">
                      <Typography variant="caption">{item}</Typography>
                    </Box>
                  </li>
                ))}
              </ul>
            );
          } else value = '-';
        }

        if (type === 'document') {
          value = <Document value={value} />;
        }

        value = <Typography variant="caption">{value || '-'}</Typography>;

        return (
          <Grid container key={`${name}-${idx}`} spacing={1}>
            <Grid item xs={6}>
              <Typography children={label} variant="caption" />
            </Grid>
            <Grid item xs={1}>
              <Typography children=":" variant="caption" />
            </Grid>
            <Grid item xs={5}>
              {value}
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};

SectionInformation.defaultProps = {
  data: null,
  schema: [],
};

SectionInformation.propTypes = {
  data: PropTypes.object,
  schema: PropTypes.array,
};

export default SectionInformation;
