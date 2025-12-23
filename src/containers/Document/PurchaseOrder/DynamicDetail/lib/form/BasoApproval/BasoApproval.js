import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import workerSrc from '@utils/pdfWorker';
import useAction from './hooks/useAction';
import Typography from '@components/Typography';
import { Document, Page, pdfjs } from 'react-pdf';
import NoData from '@assets/ilustration-v2/NoData';
import StateMessage from '@components/StateMessage';
import { Box, Dialog, Grid, Slide } from '@material-ui/core';
import DocumentPreview from './elements/DocumentPreview';
import ApproveDocument from './elements/ApproveDocument';
import Trash from '@assets/icon-v2/Trash';
import ApprovedDocumentReview from './elements/ApprovedDocumentReview';

pdfjs.GlobalWorkerOptions.workerSrc = `/${workerSrc}`;

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BasoApproval = (props) => {
  const {
    content,
    page,
    scale,
    step,
    onClose,
    emptyDoc,
    numPages,
    signatures,
    form,
    setContent,
    orderNumber,
    setForm,
    setSignatures,
    // setScale,
    setStep,
    onScrollDocument,
    onDocumentLoadSuccess,
    handleMouseDown,
    handleResizeMouseDown,
    handleMouseUp,
    handleMouseMove,
    deleteSignature,
    onCloseSuccess,
  } = useAction(props);

  const classes = useStyles({ step });

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullScreen
      open={content?.open}
      TransitionComponent={Transition}
    >
      {emptyDoc ? (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StateMessage
            description={`Document not found`}
            ilustration={NoData}
            message="Document Not Found"
          />
        </Box>
      ) : (
        <div
          className={classes.wrapper}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            id={`wrapper-doc`}
            className={classes.wrapperScroll}
            onScroll={onScrollDocument}
          >
            <div className={classes.wrapperDocument}>
              <Document
                file={content?.baso?.fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div
                    key={`page_${index + 1}`}
                    id={`page-container-${index + 1}`}
                  >
                    <Page
                      size="A4"
                      className={classes.page}
                      pageNumber={index + 1}
                      scale={scale}
                    />

                    {signatures && signatures.page === index + 1 && (
                      <div
                        onMouseDown={(e) =>
                          step == 1 && handleMouseDown(e, page)
                        }
                        className={classes.sign}
                        style={{
                          left: signatures?.x,
                          top: signatures?.y,
                          width: signatures?.width,
                          // height: signatures.height,
                          height: signatures?.width,
                        }}
                      >
                        {step == 1 && (
                          <Trash
                            className={classes.trash}
                            onClick={deleteSignature}
                          />
                        )}
                        {[
                          'top-left',
                          'top-right',
                          'bottom-left',
                          'bottom-right',
                        ].map((direction) => (
                          <div
                            key={direction}
                            onMouseDown={(e) =>
                              handleResizeMouseDown(
                                e,
                                signatures?.page,
                                direction,
                              )
                            }
                            className={step == 1 ? classes.resize : ''}
                            style={{
                              [direction.split('-')[0]]: -5,
                              [direction.split('-')[1]]: -5,
                              cursor: `${['top-left', 'bottom-right'].includes(direction) ? 'nwse-resize' : 'nesw-resize'}`,
                            }}
                          />
                        ))}
                        {step == 1 && (
                          <p className={classes.placeholderSign}>Your Sign</p>
                        )}
                        <img
                          src={content?.qrCode?.fileUrl}
                          alt="Signature"
                          style={{
                            width: '100%',
                            height: '100%',
                            opacity: step == 1 ? 0.2 : 1,
                          }}
                        />
                        {step == 2 && (
                          <Typography variant="caption" color="general-mid">
                            Approved at {signatures?.approved}
                          </Typography>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </Document>
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
                      {/* <Grid className={classes.zoom} item xs="auto">
                        <Box
                          className={
                            scale > 0 ? classes.icon : classes.disabled
                          }
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
                      </Grid> */}
                    </Grid>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* step 1 */}
          {step == 0 && (
            <DocumentPreview
              onClose={onClose}
              setStep={setStep}
              form={form}
              setForm={setForm}
              setContent={setContent}
              orderNumber={orderNumber}
            />
          )}
          {/* step 2 */}
          {step == 1 && (
            <ApproveDocument
              onClose={onClose}
              setStep={setStep}
              signatures={signatures}
              setSignatures={setSignatures}
              page={page}
            />
          )}
          {/* step 3 */}
          {step == 2 && (
            <ApprovedDocumentReview
              onClose={onClose}
              setStep={setStep}
              content={content}
              orderNumber={orderNumber}
              form={form}
              signatures={signatures}
              onCloseSuccess={onCloseSuccess()}
            />
          )}
        </div>
      )}
    </Dialog>
  );
};

BasoApproval.defaultProps = {
  emptyDoc: false,
  onScrollDocument: undefined,
};

BasoApproval.propTypes = {
  action: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  emptyDoc: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onScrollDocument: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default BasoApproval;
