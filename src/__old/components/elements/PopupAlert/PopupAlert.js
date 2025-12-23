import React, { Fragment } from 'react';
import Proptypes from 'prop-types';
import Dialog from '../Dialog';
import { HighlightOff } from '@material-ui/icons';
import Text from '../Text';
import Button from '../Button';
import { Box, CircularProgress } from '@material-ui/core';
import htmlString from '../../../../utils/htmlString';
import Success from '../../../../assets/Svg/Success';
import Info from '../../../../assets/Svg/Info';
import { useSelector } from 'react-redux';
import useStyles from './hooks/useStyles';

const PopupAlert = () => {
  const classes = useStyles();
  const props = useSelector((s) => s.popupAlert.data);
  const {
    content,
    info,
    loading,
    onClose,
    subContent,
    success,
    title,
    withHtml,
  } = props;

  const icon = () => {
    if (success) {
      return <Success className={classes.icon} />;
    } else if (info) {
      return <Info className={classes.iconInfo} />;
    } else {
      return <HighlightOff className={classes.iconFail} />;
    }
  };

  return (
    <Dialog
      customWidth={classes.root}
      disableClose={loading}
      maxWidth=""
      onClose={onClose}
      open={Boolean(content || title) || loading}
    >
      <Box paddingX="24px" textAlign="center">
        {loading ? (
          <CircularProgress
            size={50}
            style={{ margin: 28, color: '#DE1B1B' }}
            thickness={4}
          />
        ) : (
          <Fragment>{icon()}</Fragment>
        )}
        <br />
        <Text component="p" variant="h5">
          {title}
        </Text>
        <Text component="p" variant="body1">
          {loading ? 'Please Wait' : ''}
          {withHtml ? htmlString(content) : content}
        </Text>
        <br />
        {!loading && subContent && (
          <Text variant="caption">
            {withHtml ? htmlString(subContent) : subContent}
            <br />
          </Text>
        )}
        <br />
        <Button disabled={loading} onClick={onClose} variant="primary">
          {info ? 'GOT IT' : 'OKAY'}
        </Button>
      </Box>
    </Dialog>
  );
};

PopupAlert.defaultProps = {
  classes: {},
  content: '',
  info: false,
  loading: true,
  onClose: () => {},
  subContent: '',
  success: false,
  title: '',
  withHtml: false,
};

PopupAlert.propTypes = {
  classes: Proptypes.object,
  content: Proptypes.string,
  info: Proptypes.bool,
  loading: Proptypes.bool,
  onClose: Proptypes.func,
  subContent: Proptypes.string,
  success: Proptypes.bool,
  title: Proptypes.string,
  withHtml: Proptypes.bool,
};

export default PopupAlert;
