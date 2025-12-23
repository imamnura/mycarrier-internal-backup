import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import Typography from '@components/Typography';
import Skeleton from '@components/Skeleton';

const CardSummary = (props) => {
  const { title, content, caption, onClick, loading } = props;

  const classes = useStyles(props);

  if (loading) {
    return <Skeleton className={classes.baseBox} height={96} width="100%" />;
  }

  return (
    <div className={classes.baseBox} onClick={onClick}>
      <div className={classes.title}>
        <Typography variant="subtitle2" weight="medium">
          {title}
        </Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="h3" weight="medium">
          {content}
        </Typography>
      </div>
      <div className={classes.caption}>
        <Typography variant="body2" weight="normal">
          {caption}
        </Typography>
      </div>
    </div>
  );
};

CardSummary.defaultProps = {
  caption: '',
  content: '',
  loading: false,
  onClick: null,
  title: '',
  variant: 'info',
};

CardSummary.propTypes = {
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
  variant: PropTypes.oneOf([
    'info',
    'warning',
    'success',
    'alert',
    'danger',
    'general',
  ]),
};

export default CardSummary;
