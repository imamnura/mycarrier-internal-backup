import Typography from '@components/Typography';
import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import useResponsive from '@utils/hooks/useResponsive';

const StateMessage = (props) => {
  const {
    ilustration: Ilustration,
    message,
    description,
    size,
    maxWidth,
  } = props;

  const mobileClient = useResponsive('xs');
  const classes = useStyles({ mobileClient, size, maxWidth });

  return (
    <div className={classes.root}>
      <Ilustration className={classes.ilustration} />
      {!!message && (
        <Typography color="general-dark" variant="h4" weight="medium">
          {message}
        </Typography>
      )}
      {!!description && (
        <Typography color="general-mid">{description}</Typography>
      )}
    </div>
  );
};

StateMessage.defaultProps = {
  description: '',
  maxWidth: '100%',
  size: 'large',
};

StateMessage.propTypes = {
  description: PropTypes.string,
  ilustration: PropTypes.func.isRequired,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  message: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
};

export default StateMessage;
