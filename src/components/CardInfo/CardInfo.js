import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import Skeleton from '@components/Skeleton';
import { Box } from '@material-ui/core';
import { Text } from '@legion-ui/core';
import color from '@styles/color';

const CardInfo = (props) => {
  const { title, content, onClick, loading, actionLocator, id, design, key } =
    props;

  const classes = useStyles(props);
  const titleStyles = {
    basic: {
      size: '16px',
      weight: '700',
    },
    extended: {
      color: color.general.mid,
      size: '14px',
      weight: '600',
    },
  }[design];

  if (loading) {
    return <Skeleton className={classes.baseBox} height={125} width="100%" />;
  }

  const onClickCard = design === 'basic' ? onClick : undefined;

  return (
    <div className={classes.baseBox} id={id} key={key} onClick={onClickCard}>
      <div className={classes.mainBox}>
        <Text children={title} {...titleStyles} />
        <Text children={content} size="34px" weight={600} />
        {design === 'extended' && (
          <Box sx={{ pt: 1 }}>
            <Text
              className={classes.action}
              color={color.primary.main}
              onClick={onClick}
              size="12px"
              weight={700}
              id={actionLocator}
            >
              VIEW ALL
            </Text>
          </Box>
        )}
      </div>
    </div>
  );
};

CardInfo.defaultProps = {
  content: '',
  design: 'extended',
  loading: false,
  isActive: false,
  onClick: null,
  title: '',
  variant: 'information',
};

CardInfo.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  design: PropTypes.oneOfType(['extended', 'basic']),
  loading: PropTypes.bool,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['information', 'warning', 'success']),
};

export default CardInfo;
