import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Text from '../../__old/components/elements/Text';
import Button from '../../__old/components/elements/Button';
import { Document, Page, pdfjs } from 'react-pdf';
import ZoomIn from '../../assets/Svg/ZoomIn';
import ZoomOut from '../../assets/Svg/ZoomOut';
import workerSrc from '@utils/pdfWorker';

pdfjs.GlobalWorkerOptions.workerSrc = `/${workerSrc}`;

export default function Component(props) {
  const { classes, file, onClose, actionButton, title, loading, open } = props;
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);

  const mobileClient = useMediaQuery(useTheme().breakpoints.down('xs'));
  const [scale, setScale] = useState(1.25);

  useEffect(() => {
    if (mobileClient) setScale(0.5);
  }, [mobileClient]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageChange = (event) => {
    const { scrollTop, scrollHeight } = event.target;
    const d = new Array(numPages).fill(Math.ceil(scrollHeight / numPages));
    let z = [];

    d.forEach((v, i) => {
      const offset = i > 0 ? v + z[i - 1] : v;
      z.push(offset - offset / 2);
    });

    z.forEach((offset, index) => {
      if (index > 0) {
        if (scrollTop < offset && scrollTop > z[index - 1]) setPage(index + 1);
      } else {
        if (scrollTop < offset) setPage(index + 1);
      }
    });
  };

  return (
    <Dialog
      classes={{ paperFullScreen: classes.root }}
      fullScreen
      open={open}
      PaperProps={{
        onScroll: handlePageChange,
      }}
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
            <Button autoFocus color="inherit" onClick={() => window.open(file)}>
              Download
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.pagesWrapper}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Document
            file={file}
            // eslint-disable-next-line no-console
            onLoadError={(x) => console.log(x)}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`}>
                <Page
                  className={classes.page}
                  pageNumber={index + 1}
                  scale={scale}
                />
              </div>
            ))}
          </Document>
        )}
      </div>
      {numPages > 0 && (
        <div className={classes.helper}>
          <div className={classes.helperContent}>
            <div className={classes.pageCount}>
              <Text children="Page" variant="subtitle1" />
              <Text children={page || '-'} variant="subtitle1" />
              <Text children="/" variant="subtitle1" />
              <Text children={numPages || '-'} variant="subtitle1" />
            </div>
            <div className={classes.zoomWrapper}>
              <div
                className={classes.icon}
                onClick={() => setScale(scale - 0.25)}
              >
                <ZoomOut />
              </div>
              &nbsp;&nbsp;
              <div
                className={classes.icon}
                onClick={() => setScale(scale + 0.25)}
              >
                <ZoomIn />
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}

Component.defaultProps = {
  actionButton: null,
  file: '',
  loading: false,
  open: false,
  title: '',
};

Component.propTypes = {
  actionButton: PropTypes.node,
  classes: PropTypes.object.isRequired,
  file: PropTypes.string,
  loading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
};
