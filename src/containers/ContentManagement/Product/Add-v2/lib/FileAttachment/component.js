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
import Show from '@assets/Svg/Show';
import FileViewer from '@layouts/FileViewer';

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
  const { classes, fileName, url, type, onDelete, tab } = props;

  const [openPreview, setOpenPreview] = useState(false);

  const handleDownload = () => {
    if (['PDF', 'pdf'].includes(type)) {
      setOpenPreview(true);
    } else {
      window.open(`https://${url}`, '_blank');
    }
  };

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
              <Grid className={classes.fileDetail} item md={11} xs={12}>
                <div
                  style={{
                    width: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon type={type} />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Text variant="h5">{fileName}</Text>
                </div>
                <div
                  children={
                    <Show
                      fill="#DE1B1B"
                      style={{ fontSize: 24, color: '#DE1B1B' }}
                    />
                  }
                  className={classes.downloadIcon}
                  onClick={handleDownload}
                />
              </Grid>

              {tab === 'id' && (
                <Grid
                  item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                  }}
                  xs={1}
                >
                  <div className={classes.label} onClick={onDelete}>
                    <Icon type="DELETE" />
                  </div>
                </Grid>
              )}
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
  file: {},
  fileName: '',
  onDelete: () => {},
  status: '',
  tab: 'id',
  type: 'png',
  url: '',
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  file: PropTypes.object,
  fileName: PropTypes.string,
  onDelete: PropTypes.func,
  status: PropTypes.string,
  tab: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
};

export default Component;
