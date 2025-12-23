import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../action';
import styles from './styles';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import CallbackAlert from '@__old/components/elements/CallbackAlert';

// style
import { makeStyles, CircularProgress } from '@material-ui/core';
import { create_UUID, dummyText, replacer } from '../utils';
import { formatBytes } from '@utils/text';

const useStyles = makeStyles({
  image: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '16px',
    cursor: 'pointer',
    height: '280px',
    width: '240px',
    position: 'relative',
  },
  icon: {
    color: '#B3C3CA',
    width: '67px',
    height: '67px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
});

const Image = ({ action, maxSize, item, isLoading, getUpdateItem, data }) => {
  const [alert, setAlert] = useState('');
  const [dataImage, setDataImage] = useState(data);
  const classes = useStyles();

  const handleChange = (e, id) => {
    const { size, name } = e.target.files[0];
    let data = new FormData();
    if (size > maxSize) {
      setAlert(`File Maksimal Berukuran ${formatBytes(maxSize)}`);
    } else {
      let fileImage = e.target.files[0];
      const nameImage = fileImage.name.replace(/\s+/g, '-');
      fileImage = new File([fileImage], nameImage, { type: fileImage.type });
      data.append('mediaPath', fileImage);
      data.append('mediaId', create_UUID(true));
      data.append('mediaName', name.slice(0, 10));
      action.getUrlMedia({ data: data, callback: callbackMedia, id });
      item.imageUrl.mediaId && action.deleteMedia(`/${item.imageUrl.mediaId}`);
    }
  };

  const callbackMedia = (data, id) => {
    let index = id.charAt(id.length - 1);
    let valueImage = replacer(dataImage, index, { ...data, id: id });
    getUpdateItem({ ...item, imageUrl: valueImage });
    setDataImage(valueImage);
  };

  return (
    <div style={{ display: 'flex' }}>
      {dataImage.map((item) => (
        <>
          {isLoading ? (
            <div alt="Submit" className={classes.image}>
              <div
                className={classes.icon}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  paddingTop: '10px',
                }}
              >
                <CircularProgress style={{ color: '#DE1B1B' }} />
              </div>
            </div>
          ) : (
            <label htmlFor={item.id}>
              {item.mediaPath === dummyText.image ? (
                <div
                  alt="Submit"
                  className={classes.image}
                  style={{
                    border: '2px dashed #B3C3CA',
                    display: 'block',
                    marginRight: '15px',
                  }}
                >
                  <CropOriginalIcon className={classes.icon} />
                </div>
              ) : (
                <div
                  alt="Submit"
                  className={classes.image}
                  style={{
                    backgroundImage: `url('${item.mediaPath}')`,
                    marginRight: '15px',
                  }}
                />
              )}
            </label>
          )}
          <input
            accept="image/*"
            hidden
            id={item.id}
            onChange={(e) => handleChange(e, item.id)}
            type="file"
          />
        </>
      ))}
      <CallbackAlert content={alert} onClose={() => setAlert('')} />
    </div>
  );
};

Image.defaultProps = {
  action: {},
  data: {},
  isLoading: false,
  item: {},
  maxSize: 358400,
  media: {},
  page: {},
};

Image.propTypes = {
  action: PropTypes.object,
  data: PropTypes.object,
  getUpdateItem: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  item: PropTypes.object,
  maxSize: PropTypes.number,
  media: PropTypes.object,
  page: PropTypes.object,
};

function mapStateToProps(state) {
  const { isLoading } = state.loading;
  const { page, media } = state.productManagement;
  return {
    page,
    media,
    isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

const Styled = withStyles(styles)(Image);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
