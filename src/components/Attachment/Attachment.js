import React from 'react';
import PropTypes from 'prop-types';
import { getFileIcon, getFileInformation } from '@utils/common';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import Eye from '@assets/icon-v2/Eye';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { Text } from '@legion-ui/core';

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

  const Icon = getFileIcon(extension);

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
    <div className={classes.root} onClick={onPreview}>
      <Grid alignItems="center" container spacing={2}>
        <Grid item>
          <Icon className={classes.icon} />
        </Grid>
        <Grid className={classes.title} item xs>
          <Text>{fileName || name}</Text>
        </Grid>
        <Grid item>
          <div className={classes.actionIcon}>
            <Eye />
          </div>
        </Grid>
      </Grid>
    </div>
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
