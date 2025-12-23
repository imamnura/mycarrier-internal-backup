import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import useStyles from './styles';

const Note = (props) => {
  const { message, variant, children } = props;

  const classes = useStyles({ variant });

  return (
    <div className={classes.root}>
      {!!message && (
        <Typography children={message} variant="subtitle2" weight="medium" />
      )}
      {!!children && children}
    </div>
  );
};

Note.defaultProps = {
  children: null,
  message: '',
  variant: 'danger',
};

Note.propTypes = {
  children: PropTypes.node,
  message: PropTypes.string,
  variant: PropTypes.oneOf(['danger', 'success', 'general']),
};

export default Note;
