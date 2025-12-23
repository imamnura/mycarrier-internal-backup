import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Text from '@__old/components/elements/Text';
import DocPDF from '@assets/Svg/DocPDF';
import DocZIP from '@assets/Svg/DocZIP';
import DocPNG from '@assets/Svg/DocPNG';
import DocJPG from '@assets/Svg/DocJPG';
import DeleteIcon from '@assets/Svg/Delete';
import EditIcon from '@assets/Svg/Pencil';
import Download from '@assets/Svg/Download';
import Show from '@assets/Svg/Show';
import FileViewer from '@layouts/FileViewer';
import moment from 'moment';

const Icon = (params) => {
  switch (params.type) {
    case 'PDF':
    case 'pdf':
      return <DocPDF />;
    case 'ZIP':
      return <DocZIP />;
    case 'PNG':
    case 'png':
      return <DocPNG />;
    case 'JPG':
    case 'jpg':
    case 'jpeg':
      return <DocJPG />;
    case 'EDIT':
      return <EditIcon />;
    case 'DELETE':
      return <DeleteIcon />;
    default:
      return <DocPDF />;
  }
};

const Component = (props) => {
  const {
    classes,
    file,
    fileName,
    url,
    type,
    actionButton,
    description,
    size,
    date,
  } = props;

  const [openPreview, setOpenPreview] = useState(false);

  const handleDownload = () => {
    if (['PDF', 'pdf'].includes(type)) {
      setOpenPreview(true);
    } else {
      window.open(`https://${url}`, '_blank');
    }
  };

  const view = ['PDF', 'pdf'].includes(type) ? (
    <Show fill="#DE1B1B" style={{ fontSize: 24, color: '#DE1B1B' }} />
  ) : (
    <Download fill="#DE1B1B" style={{ fontSize: 24, color: '#DE1B1B' }} />
  );

  return (
    <div style={{ width: '100%' }}>
      <Grid alignItems="center" className={classes.root} container>
        <Grid item xs={12}>
          <div className={classes.fileWithButton}>
            <Grid
              className={classes.file}
              container
              style={{ flexGrow: 1, marginRight: 12 }}
            >
              <Grid
                item
                md={8}
                style={{ display: 'flex', alignItems: 'center' }}
                xs={12}
              >
                <Icon type={type} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className={classes.detailContainer}>
                  <Text variant="h5">{fileName}</Text>
                  <br />
                  <Text variant="subtitle2">{description}</Text>
                </div>
              </Grid>

              <Grid item md={2} xs={10}>
                <Text variant="subtitle1">
                  {moment(date).format('DD/MM/YYYY HH:mm')} | {size}
                </Text>
              </Grid>

              <Grid
                item
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                xs={2}
              >
                <div
                  children={view}
                  className={classes.downloadIcon}
                  onClick={handleDownload}
                />
                {actionButton.map((item) => (
                  <div
                    className={classes.label}
                    key={item.label}
                    onClick={() => item.onClick(file)}
                  >
                    <Icon type={item.type} />
                  </div>
                ))}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <FileViewer
        file={`https://${url}`}
        onClose={() => setOpenPreview(false)}
        open={openPreview}
        title={fileName}
      />
    </div>
  );
};

Component.defaultProps = {
  actionButton: [],
  date: '',
  description: '',
  file: {},
  fileName: '-',
  size: 0,
  status: '',
  type: 'ZIP',
  url: '',
};

Component.propTypes = {
  actionButton: PropTypes.array,
  classes: PropTypes.object.isRequired,
  date: PropTypes.string,
  description: PropTypes.string,
  file: PropTypes.object,
  fileName: PropTypes.string,
  size: PropTypes.number,
  status: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
};

export default Component;
