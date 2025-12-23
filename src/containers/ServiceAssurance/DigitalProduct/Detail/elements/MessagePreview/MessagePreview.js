import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import useStyles from './styles';
import Profile from '@assets/ilustration-v2/Profile';
import Person404 from '@assets/ilustration-v2/Person404';
import Dialog from '@__old/components/elements/Dialog';
import Attachment from '@components/Attachment';
import Loading from '@components/Loading';
import Typography from '@components/Typography';
import { Box, Grid } from '@material-ui/core';
import { textLimit } from '@utils/text';
import useActions from './hooks/useActions';
import { dateFormat } from '@utils/parser';

const PreviewMessage = (props) => {
  const { message, loading, modalMessage, onClose } = useActions(props);

  const classes = useStyles();

  const renderMessage = () => {
    return message.map((v, i) => (
      <div
        key={`message-${v.title}-${i}`}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: v.title === 'staff' ? 'end' : 'start',
        }}
      >
        <div
          className={clsx(classes.previewMessageBox, {
            [classes.previewMessageBoxStaff]: v.title === 'staff',
            [classes.previewMessageBoxUser]: v.title === 'user',
          })}
        >
          <div
            className={clsx(classes.previewMessageTriangle, {
              [classes.previewMessageTriangleStaff]: v.title === 'staff',
              [classes.previewMessageTriangleUser]: v.title === 'user',
            })}
          />

          <Grid container spacing={2}>
            <Grid className={classes.profileBox} item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Profile className={classes.profileIlustration} />
                <div>
                  <Typography inline weight="bold">
                    {v.username}
                  </Typography>
                  <Typography color="general-light">
                    {v.title} • {v.email}
                  </Typography>
                </div>
              </div>
              <div>
                <Typography color="general-light" variant="overline">
                  {dateFormat({ date: v.createdDate, type: 'date-time' })}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography>{v.chat}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            {v?.evidence?.length >= 0 &&
              v?.evidence?.map((file, fileId) => (
                <Grid
                  className={classes.fileContainer}
                  item
                  key={`${v.username}-evidence-${fileId}`}
                  md={6}
                  xs={12}
                >
                  <Attachment
                    fileName={textLimit(file.fileName, 15) || ''}
                    fileUrl={file.fileUrl || ''}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    ));
  };

  if (loading) {
    return (
      <Dialog onClose={onClose} open={modalMessage}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" weight="medium">
              Chat History
            </Typography>
          </Grid>

          <Grid align="center" item xs={12}>
            <Loading color="primary" />
          </Grid>
        </Grid>
      </Dialog>
    );
  }

  if (message.length === 0) {
    return (
      <Dialog onClose={onClose} open={modalMessage}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" weight="medium">
              Chat History
            </Typography>
          </Grid>

          <Grid align="center" item xs={12}>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Person404
                style={{ height: 120, width: 'auto', marginBottom: 16 }}
              />
              <Typography variant="h4" weight="medium">
                Chat not found
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Dialog>
    );
  }

  return (
    <Dialog maxWidth="md" onClose={onClose} open={modalMessage}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" weight="medium">
            Chat History
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <div className={classes.previewBg}>{renderMessage()}</div>
        </Grid>
      </Grid>
    </Dialog>
  );
};

PreviewMessage.defaultProps = {
  modalMessage: false,
  referenceId: '',
  setModalMessage: () => {},
};

PreviewMessage.propTypes = {
  modalMessage: PropTypes.bool,
  referenceId: PropTypes.string,
  setModalMessage: PropTypes.func,
};

export default PreviewMessage;
