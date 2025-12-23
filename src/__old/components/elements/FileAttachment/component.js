import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Text from '../Text';
import DocPDF from '../../../../assets/Svg/DocPDF';
import DocZIP from '../../../../assets/Svg/DocZIP';
import DocPNG from '../../../../assets/Svg/DocPNG';
import DocJPG from '../../../../assets/Svg/DocJPG';
import DocWord from '../../../../assets/Svg/DocWord';
import DocText from '../../../../assets/Svg/DocText';
import Download from '../../../../assets/Svg/Download';
import Show from '../../../../assets/Svg/Show';
import FileViewer from '../../../../layouts/FileViewer';
import Button from '../Button';

const Icon = (params) => {
  switch (params.type) {
    case 'PDF':
      return <DocPDF />;
    case 'ZIP':
      return <DocZIP />;
    case 'PNG':
      return <DocPNG />;
    case 'JPG':
      return <DocJPG />;
    case 'doc':
    case 'docx':
    case 'word':
      return <DocWord />;
    case 'txt':
      return <DocText />;
    default:
      return <DocPDF />;
  }
};

const Component = (props) => {
  const { classes, label, file, fileName, url, type, actionButton, readOnly } =
    props;

  const [openPreview, setOpenPreview] = useState(false);

  const handleDownload = () => {
    if (['PDF', 'pdf'].includes(type)) {
      setOpenPreview(true);
    } else {
      window.open(url, '_blank');
    }
  };

  const view = ['PDF', 'pdf'].includes(type) ? (
    <Show fill="#FFF" style={{ fontSize: 18, color: 'white' }} />
  ) : (
    <Download />
  );

  return (
    <div style={{ width: '100%' }}>
      <Grid alignItems="center" className={classes.root} container>
        {label && (
          <Grid item xs={12}>
            <Text className={classes.label} color="grey" variant="body2">
              {label}
            </Text>
          </Grid>
        )}
        <Grid item xs={12}>
          {actionButton?.length > 0 ? (
            <div className={classes.fileWithButton}>
              <div
                className={classes.file}
                onClick={!readOnly && handleDownload}
                style={{ flexGrow: 1, marginRight: 12 }}
              >
                <Icon type={type} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Text variant="subtitle1">{fileName}</Text>
                <span style={{ flexGrow: 1 }} />
                {!readOnly && (
                  <div children={view} className={classes.downloadIcon} />
                )}
              </div>
              {actionButton.map((item) => (
                <Button key={item.label} onClick={() => item.onClick(file)}>
                  {item.label}
                </Button>
              ))}
            </div>
          ) : (
            <div className={classes.file} onClick={!readOnly && handleDownload}>
              <Icon type={type} />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Text variant="subtitle1">{fileName}</Text>
              <span style={{ flexGrow: 1 }} />
              {!readOnly && (
                <div children={view} className={classes.downloadIcon} />
              )}
            </div>
          )}
        </Grid>
      </Grid>
      <FileViewer
        file={url}
        onClose={() => setOpenPreview(false)}
        open={openPreview}
        title={fileName}
      />
    </div>
  );
};

Component.defaultProps = {
  actionButton: [],
  file: {},
  fileName: '-',
  label: '',
  readOnly: false,
  status: '',
  type: 'ZIP',
  url: '',
};

Component.propTypes = {
  actionButton: PropTypes.array,
  classes: PropTypes.object.isRequired,
  file: PropTypes.object,
  fileName: PropTypes.string,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  status: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
};

export default Component;
