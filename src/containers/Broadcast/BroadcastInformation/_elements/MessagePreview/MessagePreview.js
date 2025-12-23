import Typography from '@components/Typography';
import { TITLE_BROADCAST } from '@constants/env';
import { Box, Grid } from '@material-ui/core';
import { getFileIcon, getFileInformation } from '@utils/common';
import { textLimit } from '@utils/text';
import moment from 'moment';
import PropTypes from 'prop-types';
import useAction from './MessagePreview.hooks';
import useStyles from './styles';

const PreviewMessage = (props) => {
  const { message, media, time } = props;
  const { timeNow } = useAction();

  const classes = useStyles();

  const url = media?.url || media?.fileUrl || '';

  const { extension } = getFileInformation(url);

  const Icon = getFileIcon(extension);

  const _message =
    typeof message === 'string' ? (
      message
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p>{message[0]}</p>
        <p>{message[1]}</p>
        <p>{message[2]}</p>
      </div>
    );

  return (
    <div className={classes.previewBg}>
      <div className={classes.previewMessageBox}>
        <div className={classes.previewMessageTriangle} />
        <div>
          {media && (
            <>
              {extension === 'pdf' ? (
                <div className={classes.pdfShow}>
                  <Grid alignItems="center" container spacing={2}>
                    <Grid item xs="auto">
                      <Icon />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{textLimit(media?.fileName, 15)}</Typography>
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <img
                  alt="media-broadcast"
                  className={classes.previemMessageImage}
                  src={url}
                />
              )}
            </>
          )}
          {message ? (
            <>
              <Typography inline weight="bold">
                MyCarrier Broadcast Update
              </Typography>
              <Box sx={{ pt: 2 }}>
                <Typography>{TITLE_BROADCAST}</Typography>
              </Box>
              <Box sx={{ py: 2 }}>
                <Typography>{_message}</Typography>
              </Box>
              <Typography inline weight="bold">
                MyCarrier by Telkom Indonesia
              </Typography>
            </>
          ) : (
            <Typography color="general-mid">
              <i>Broadcast message goes here..</i>
            </Typography>
          )}
        </div>
        <div className={classes.previewMessageTime}>
          <Typography color="general-mid" variant="overline">
            {moment(time || timeNow).format('hh:mm a')}
          </Typography>
        </div>
      </div>
    </div>
  );
};

PreviewMessage.defaultProps = {
  media: null,
  message: [],
  time: '',
};

PreviewMessage.propTypes = {
  media: PropTypes.object,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  time: PropTypes.string,
};

export default PreviewMessage;
