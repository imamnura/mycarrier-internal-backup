import React, { useState, useEffect } from 'react';
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
import { create_UUID } from '../utils';
import { formatBytes } from '@utils/text';

const useStyles = makeStyles({
  image: (props) => ({
    backgroundImage: `url('${props.preview}')`,
    backgroundPosition: 'center',
    backgroundSize: `${props.sizeBig ? 'contain' : 'cover'}`,
    border: `${!props.preview ? '2px dashed #B3C3CA' : 'none'}`,
    backgroundRepeat: 'no-repeat',
    borderRadius: `${props.sizeBig ? '0px' : '16px'}`,
    cursor: 'pointer',
    height: `${props.sizeBig ? '467px' : '240px'}`,
    width: `${props.sizeBig ? '100%' : '320px'}`,
    position: 'relative',
  }),
  icon: (props) => ({
    display: `${!props.preview ? 'block' : 'none'}`,
    color: '#B3C3CA',
    width: `${props.sizeBig ? '200px' : '67px'}`,
    height: `${props.sizeBig ? '200px' : '67px'}`,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  }),
});

const Image = ({
  action,
  maxSize,
  sizeBig,
  item,
  isLoading,
  getUpdateItem,
}) => {
  const [preview, setPreview] = useState(null);
  const [alert, setAlert] = useState('');
  const props = { preview, sizeBig };
  const classes = useStyles(props);

  useEffect(() => {
    if (item.imageUrl.mediaPath !== 'link gambar disini..') {
      setPreview(item.imageUrl.mediaPath);
    }
  }, [item]);

  const handleChange = (e) => {
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
      action.getUrlMedia({ data: data, callback: callbackMedia });
      item.imageUrl.mediaId && action.deleteMedia(`/${item.imageUrl.mediaId}`);
    }
  };

  const callbackMedia = (data) => {
    getUpdateItem({ ...item, imageUrl: data });
  };

  return (
    <>
      {isLoading ? (
        <div alt="Submit" className={classes.image}>
          <div
            className={classes.icon}
            style={{ width: '100%', textAlign: 'center', paddingTop: '10px' }}
          >
            <CircularProgress style={{ color: '#DE1B1B' }} />
          </div>
        </div>
      ) : (
        <label htmlFor={item._uid}>
          <div alt="Submit" className={classes.image}>
            <CropOriginalIcon className={classes.icon} />
          </div>
        </label>
      )}
      <input
        accept="image/*"
        hidden
        id={item._uid}
        onChange={handleChange}
        type="file"
      />
      <CallbackAlert content={alert} onClose={() => setAlert('')} />
    </>
  );
};

Image.defaultProps = {
  action: {},
  isLoading: false,
  item: {},
  maxSize: 358400,
  media: {},
  page: {},
  sizeBig: false,
};

Image.propTypes = {
  action: PropTypes.object,
  getUpdateItem: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  item: PropTypes.object,
  maxSize: PropTypes.number,
  media: PropTypes.object,
  page: PropTypes.object,
  sizeBig: PropTypes.bool,
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
