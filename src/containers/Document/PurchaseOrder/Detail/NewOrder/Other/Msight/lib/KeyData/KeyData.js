import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import color from '@styles/color';
import Duplicate from '@assets/icon-v2/Duplicate';
import Hide from '@assets/Svg/Hide';
import Show from '@assets/Svg/Show';
import Typography from '@components/Typography';
import useActions from './hooks/useActions';
import useStyles from './styles';

const KeyData = ({ data, schema }) => {
  const classes = useStyles();
  const { copyToClipboard, hidden, setHidden } = useActions();

  return schema.map(({ name, label }, idx) => {
    const value = hidden[idx] ? `${data[name].slice(0, -4)}****` : data[name];
    return (
      <Grid alignItems="center" container key={idx}>
        <Grid className={classes.rootMargin} item xs={8}>
          <Typography
            children={label}
            className={classes.label}
            color="general-mid"
            inline
          />
          <Typography
            children={value}
            color="general-main"
            variant="h5"
            weight="medium"
          />
        </Grid>
        <Grid
          alignItems="center"
          className={classes.rootMargin}
          container
          item
          justifyContent="flex-end"
          spacing={2}
          xs={4}
        >
          <Grid
            className={classes.button}
            item
            onClick={() => setHidden({ ...hidden, [`${idx}`]: !hidden[idx] })}
          >
            {hidden[idx] ? <Show fill={color.general.general} /> : <Hide />}
          </Grid>
          <Grid
            className={classes.button}
            item
            onClick={copyToClipboard(data[name], label)}
          >
            <Duplicate />
          </Grid>
        </Grid>
      </Grid>
    );
  });
};

export default KeyData;

KeyData.defaultProps = {
  data: {},
  schema: [],
};

KeyData.propTypes = {
  data: PropTypes.object,
  schema: PropTypes.array,
};
