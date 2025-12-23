import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import Typography from '@components/Typography';
import Button from '@components/Button';

const ActionHighlight = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Typography color="general-dark" variant="h4" weight="medium">
        {props.title}
      </Typography>
      {typeof props.subTitle === 'string' && props.subTitle && (
        <Typography color="general-mid" variant="subtitle1">
          {props.subTitle}
        </Typography>
      )}
      {!!Array.isArray(props.subTitle) &&
        props.subTitle.map((text, i) => (
          <Typography color="general-mid" key={i} variant="subtitle1">
            {text}
          </Typography>
        ))}
      {!!props.action && (
        <div className={classes.action}>
          <Button {...props.action} />
        </div>
      )}
    </div>
  );
};

ActionHighlight.defaultProps = {
  action: null,
  subTitle: null,
  title: '',
  variant: 'default',
};

ActionHighlight.propTypes = {
  action: PropTypes.object,
  subTitle: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  variant: PropTypes.oneOf(['default', 'warning', 'danger']),
};

export default ActionHighlight;
