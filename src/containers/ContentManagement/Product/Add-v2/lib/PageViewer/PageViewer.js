import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Dialog, IconButton, Slide, Toolbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Text from '@__old/components/elements/Text';
import Button from '@__old/components/elements/Button';
import useStyles from './styles';
import Script from 'next/script';
import { ASSETS_URL } from '@constants/env';

export default function PageViewer(props) {
  const { onClose, actionButton, title, open, children } = props;
  const classes = useStyles();

  return (
    <>
      {open && (
        <Script
          defer
          src={`${ASSETS_URL}/ewz-mycarrier-pub-dev/bundlejs/externalComponents.bundle.js`}
        />
      )}

      <Dialog
        classes={{ paperFullScreen: classes.root }}
        fullScreen
        open={open}
        PaperProps={
          {
            // onScroll: handlePageChange
          }
        }
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
            <Text children={title} variant="subtitle1" />
            <div className={classes.grow} />
            {actionButton ? (
              actionButton
            ) : (
              <Button autoFocus color="inherit" onClick={onClose}>
                Close
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <div className={classes.pagesWrapper}>
          <div
            className={classes.nav}
            data-navigation="['test', 'test2']"
            id="prefix-menu"
          />

          <div className={classes.block} />

          <div style={{ paddingTop: 72 }}>{children}</div>
        </div>
      </Dialog>
    </>
  );
}

PageViewer.defaultProps = {
  actionButton: null,
  children: '',
  open: false,
  title: '',
};

PageViewer.propTypes = {
  actionButton: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
};
