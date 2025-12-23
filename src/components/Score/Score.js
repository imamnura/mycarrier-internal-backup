import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@legion-ui/core';
import useStyles from './styles';

const Score = (props) => {
  const { value, total } = props;
  const classes = useStyles({ value });

  return (
    <div className={classes.root}>
      <Text size="34px" weight="700" children={value} />
      <Text size="16px" weight="600" children={`/${total}`} />
    </div>
  );
};

Score.defaultProps = {
  total: 10,
  value: 0,
};

Score.propTypes = {
  total: PropTypes.number,
  value: PropTypes.number,
};

export default Score;
