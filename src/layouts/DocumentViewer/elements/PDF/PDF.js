import React from 'react';
import { Box, Grid, Slide } from '@material-ui/core';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from '@utils/pdfWorker';
import Typography from '@components/Typography';
import useStyles from './styles';
import ZoomOut from '@assets/icon-v2/ZoomOut';
import ZoomIn from '@assets/icon-v2/ZoomIn';
import useAction from './hooks/useAction';
import ViewerContainer from '../ViewerContainer';

pdfjs.GlobalWorkerOptions.workerSrc = `/${workerSrc}`;

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PDF = () => {
  const {
    action,
    centered,
    numPages,
    onClose,
    onDocumentLoadSuccess,
    onDownload,
    onScrollDocument,
    page,
    scale,
    setScale,
    title,
    url,
  } = useAction();

  const classes = useStyles({ centered });

  return (
    <ViewerContainer
      action={action}
      emptyDoc={numPages === 0}
      onClose={onClose}
      onDownload={onDownload}
      onScrollDocument={onScrollDocument}
      open={!!url}
      title={title}
    >
      <div className={classes.wrapper}>
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
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
      </div>
      {numPages > 0 && (
        <div className={classes.navigationWrapper}>
          <div className={classes.navigation}>
            <Grid alignItems="center" container spacing={2}>
              <Grid
                children="Page"
                component={Typography}
                item
                variant="subtitle1"
                xs="auto"
              />
              <Grid
                children={page}
                component={Typography}
                item
                variant="subtitle1"
                xs="auto"
              />
              <Grid
                children="/"
                component={Typography}
                item
                variant="subtitle1"
                xs="auto"
              />
              <Grid
                children={numPages}
                component={Typography}
                item
                variant="subtitle1"
                xs="auto"
              />
              <Grid className={classes.zoom} item xs="auto">
                <Box
                  className={scale > 0 ? classes.icon : classes.disabled}
                  component={ZoomOut}
                  mt={0.5}
                  onClick={setScale(scale - 0.25)}
                />
              </Grid>
              <Grid item xs="auto">
                <Box
                  className={classes.icon}
                  component={ZoomIn}
                  mt={0.5}
                  onClick={setScale(scale + 0.25)}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </ViewerContainer>
  );
};

export default PDF;
