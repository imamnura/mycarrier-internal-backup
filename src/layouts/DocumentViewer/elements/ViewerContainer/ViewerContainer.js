import Cancel from '@assets/icon-v2/Cancel';
import Download from '@assets/icon-v2/Download';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { Box, Dialog, IconButton, Slide } from '@material-ui/core';
import React, { Fragment } from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { route } from '@configs/index';
import StateMessage from '@components/StateMessage';
import NoData from '@assets/ilustration-v2/NoData';
import useResponsive from '@utils/hooks/useResponsive';

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewerHeader = (props) => {
  const mobileClient = useResponsive('xs');
  const classes = useStyles({ mobileClient });
  const router = useRouter();

  const {
    open,
    onScrollDocument,
    onClose,
    action,
    onDownload,
    title,
    children,
    emptyDoc,
  } = props;

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullScreen
      open={open}
      PaperProps={{ onScroll: onScrollDocument }}
      TransitionComponent={Transition}
    >
      <div className={classes.header}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!(router.pathname === route.documentViewer()) && (
            <Cancel className={classes.icon} onClick={onClose} />
          )}
          <Typography
            children={title}
            className={classes.title}
            variant="subtitle1"
          />
        </Box>
        <div>
          <div className={classes.actionButton}>
            {!emptyDoc &&
              action.map(({ withDivider = false, label, ...btnProps }, i) => {
                if ((btnProps.children || label).toLowerCase() === 'download') {
                  return (
                    <Fragment key={i}>
                      <Box sx={{ mr: -1 }}>
                        <IconButton size="medium">
                          <Download
                            className={classes.downloadIcon}
                            onClick={onDownload(btnProps.onClick)}
                          />
                        </IconButton>
                      </Box>
                    </Fragment>
                  );
                }

                return (
                  <Fragment key={i}>
                    {withDivider && <div className={classes.actionDivider} />}
                    <Button
                      children={label}
                      ml={withDivider ? 0 : 16}
                      {...btnProps}
                      key={`act-btn-${i}`}
                    />
                  </Fragment>
                );
              })}
          </div>
        </div>
      </div>
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
            description={`Document "${title}" not found`}
            ilustration={NoData}
            message="Document Not Found"
          />
        </Box>
      ) : (
        children
      )}
    </Dialog>
  );
};

ViewerHeader.defaultProps = {
  emptyDoc: false,
  onScrollDocument: undefined,
};

ViewerHeader.propTypes = {
  action: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  emptyDoc: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onScrollDocument: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default ViewerHeader;
