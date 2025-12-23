import React, { Fragment } from 'react';
import Proptypes from 'prop-types';
import Dialog from '../Dialog';
import { HighlightOff } from '@material-ui/icons';
import Text from '../Text';
import Button from '../Button';
import { CircularProgress } from '@material-ui/core';
import htmlString from '../../../../utils/htmlString';
import Success from '../../../../assets/Svg/Success';
import Info from '../../../../assets/Svg/Info';

const Component = (props) => {
  const {
    classes,
    content,
    onClose,
    onClick,
    isLoading,
    success,
    subContent,
    withHtml,
    title,
    info,
    buttonLabel,
    customButton,
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
    (Boolean(content || title) || isLoading) && (
      <Dialog
        customWidth={classes.root}
        disableClose={isLoading}
        maxWidth=""
        onClose={onClose}
        open={Boolean(content || title) || isLoading}
      >
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          {isLoading ? (
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
            {isLoading && 'Please Wait'}
            {withHtml ? htmlString(content) : content}
          </Text>
          <br />
          {!isLoading && subContent && (
            <Text variant="caption">
              {withHtml ? htmlString(subContent) : subContent}
              <br />
            </Text>
          )}
          <br />
          {customButton ? (
            <Button disabled={isLoading} onClick={onClick} variant="primary">
              {buttonLabel}
            </Button>
          ) : (
            <Button disabled={isLoading} onClick={onClose} variant="primary">
              {buttonLabel || (info ? 'GOT IT' : 'OKAY')}
            </Button>
          )}
        </div>
      </Dialog>
    )
  );
};

Component.defaultProps = {
  buttonLabel: '',
  content: '',
  customButton: false,
  info: false,
  isLoading: true,
  subContent: '',
  success: false,
  title: '',
  withHtml: false,
};

Component.propTypes = {
  buttonLabel: Proptypes.string,
  classes: Proptypes.object.isRequired,
  content: Proptypes.string,
  customButton: Proptypes.bool,
  info: Proptypes.bool,
  isLoading: Proptypes.bool,
  onClick: Proptypes.func.isRequired,
  onClose: Proptypes.func.isRequired,
  subContent: Proptypes.string,
  success: Proptypes.bool,
  title: Proptypes.string,
  withHtml: Proptypes.bool,
};

export default Component;
