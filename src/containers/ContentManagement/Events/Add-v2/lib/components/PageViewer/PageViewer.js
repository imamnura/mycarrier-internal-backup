import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Dialog, IconButton, Slide, Toolbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Typography from '@components/Typography';
import Button from '@components/Button';
import useStyles from './styles';
import { customerUrl } from '@configs';

export default function PageViewer(props) {
  const { onClose, actionButton, title, open, eventId, idPreviewPage, tab } =
    props;
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paperFullScreen: classes.root }}
      fullScreen
      open={open}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
    >
      <AppBar
        classes={{ root: classes.mainAppBar }}
        color="inherit"
        position="fixed"
      >
        <Toolbar classes={{ root: classes.mainHeader }}>
          <IconButton onClick={onClose} size="medium">
            <Close />
          </IconButton>
          <Typography children={title} variant="subtitle1" />
          <div className={classes.grow} />
          {actionButton ? (
            actionButton
          ) : (
            <Button
              autoFocus
              children="Close"
              color="inherit"
              onClick={onClose}
            />
          )}
        </Toolbar>
      </AppBar>

      <div className={classes.pagesWrapper}>
        <iframe
          height="100%"
          loading="eager"
          src={`${customerUrl}${tab === 'id' ? '/id/' : '/'}events/${
            eventId ? eventId : 'preview'
          }?id=${idPreviewPage}`}
          title="Event"
          width="100%"
        />
      </div>
    </Dialog>
  );
}

PageViewer.defaultProps = {
  actionButton: null,
  eventId: '',
  idPreviewPage: '',
  open: false,
  tab: 'id',
  title: '',
};

PageViewer.propTypes = {
  actionButton: PropTypes.node,
  eventId: PropTypes.string,
  idPreviewPage: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  tab: PropTypes.string,
  title: PropTypes.string,
};
