import React from 'react';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@material-ui/core';
import useStyles from './styles';
import CircleCancel from '@assets/icon-v2/CircleCancel';
import Typography from '@components/Typography';
import CircleAdd from '@assets/icon-v2/CircleAdd';
import CircleEdit from '@assets/icon-v2/CircleEdit';
import Trash from '@assets/icon-v2/Trash';
import Edit from '@assets/icon-v2/Edit';
import CircleWarning from '@assets/icon-v2/CircleWarning';
import Add from '@assets/icon-v2/Add';
import Loading from '@components/Loading';

const ButtonMinimal = (props) => {
  const { variant, type = 'ghost', label, onClick: _onClick, loading } = props;

  const classes = useStyles(props);

  const Icon = {
    add: type == 'filled' ? Add : CircleAdd,
    edit: CircleEdit,
    delete: CircleCancel,
    trash: Trash,
    pencil: Edit,
    minus: CircleWarning,
  }[variant];

  const visibilityLoading = loading ? 'inherit' : 'hidden';
  const visibilityContent = loading ? 'hidden' : 'inherit';

  const onClick = (e) => {
    if (!loading) {
      _onClick(e);
    }
  };

  return (
    <ButtonBase className={classes.root} onClick={onClick}>
      <Box
        position="absolute"
        visibility={visibilityLoading}
        display="flex"
        alignItems="center"
      >
        <Loading color="success" />
        <Typography className={classes.label} variant="buttonM" weight="bold">
          Please wait...
        </Typography>
      </Box>
      <Box style={{
        display: 'flex',
        alignItems: 'center'
      }} visibility={visibilityContent}>
        <Icon className={classes.icon} />
        <Typography className={classes.label} variant="buttonM" weight="bold">
          {label}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

ButtonMinimal.defaultProps = {
  label: '',
  onClick: () => {},
  type: 'ghost',
  loading: false,
};

ButtonMinimal.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    'add',
    'edit',
    'delete',
    'pencil',
    'trash',
    'minus',
  ]).isRequired,
  type: PropTypes.oneOf(['filled', 'ghost']),
  loading: PropTypes.bool,
};

export default ButtonMinimal;
