import React from 'react';
import PropTypes from 'prop-types';
import { getFileInformation } from '@utils/common';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import Eye from '@assets/icon-v2/Eye';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { Text } from '@legion-ui/core';
import Image from 'next/image';
import { textLimit } from '@utils/text';

const Attachment = (props) => {
  const {
    fileName,
    fileUrl,
    hidePreviewDownload,
    previewAction,
    previewCentered,
  } = props;

  const { setDocumentViewer } = useDocumentViewer();
  const { name, extension } = getFileInformation(fileUrl);

  const classes = useStyles();

  const onPreview = () => {
    if (
      ['pdf', 'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'webp', 'gif'].includes(
        extension,
      )
    ) {
      if (hidePreviewDownload) {
        setDocumentViewer({
          title: fileName || name,
          url: fileUrl,
          centered: previewCentered,
          action: [],
        });
      } else {
        setDocumentViewer({
          title: fileName || name,
          url: fileUrl,
          centered: previewCentered,
          action: previewAction,
        });
      }
    } else {
      window.open(fileUrl);
    }
  };

  return (
    <Grid
      alignItems="center"
      justifyContent="center"
      container
      onClick={onPreview}
      className={classes.root}
    >
      <Grid item xs={12}>
        {['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv'].includes(extension) ? (
          <video autoPlay className={classes.image} loop src={fileUrl} />
        ) : (
          <Image
            alt=""
            className={classes.image}
            height={160}
            src={fileUrl}
            unoptimized={true}
            width={160}
          />
        )}
      </Grid>
      <Grid item style={{ wordBreak: 'break-all' }} xs={10}>
        <Text variant="subtitle1">{textLimit(fileName, 17)}</Text>
      </Grid>
      <Grid item xs={2} align="right">
        <div className={classes.actionIcon}>
          <Eye className={classes.icon} />
        </div>
      </Grid>
    </Grid>
  );
};

Attachment.defaultProps = {
  fileName: '',
  fileUrl: '',
  hidePreviewDownload: false,
  previewAction: undefined,
  previewCentered: false,
};

Attachment.propTypes = {
  fileName: PropTypes.string,
  fileUrl: PropTypes.string,
  hidePreviewDownload: PropTypes.bool,
  previewAction: PropTypes.array,
  previewCentered: PropTypes.bool,
};

export default Attachment;
