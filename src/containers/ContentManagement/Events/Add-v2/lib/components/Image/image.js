import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { formatBytes } from '@utils/text';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useStyles from './styles';
import UploadImageWithCircle from '@assets/icon-v2/UploadImageWithCircle';
import { create_UUID } from '@utils/text';
import Typography from '@components/Typography';
import {
  // getUrlMediaNoCompress,
  deleteMedia,
  getUrlMedia,
} from '@containers/ContentManagement/Events/_repositories/repositories';

const UploadImage = (props) => {
  const {
    getUpdateItem,
    isValidateByPixel,
    item,
    maxSize,
    ratioPixel,
    sectionName,
    type,
    disabled,
    wordingImage,
    wordingVariant,
    initialPreview, //for testing
  } = props;

  const { setFailedAlert } = usePopupAlert();

  const [preview, setPreview] = useState(initialPreview);
  const [fileTemp, setFileTemp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles(preview, type);

  useEffect(() => {
    if (!item) {
      setPreview(null);
      setFileTemp(null);
    } else {
      setPreview(item?.mediaPath);
    }
  }, [item]);

  const deleteMediaExisting = async () => {
    try {
      await deleteMedia(`${fileTemp.mediaId}`);
      setFileTemp(null);
    } catch (error) {
      setFailedAlert({ message: `Failed to delete image before` });
    }
  };

  const uploadMedia = async (payload) => {
    try {
      const { data } = await getUrlMedia(payload, type);
      if (data) {
        getUpdateItem(data);
        setPreview(data.mediaPath);
        fileTemp ? deleteMediaExisting() : setFileTemp(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setFailedAlert({ message: `Failed to Upload Image ${sectionName}` });
    }
  };

  const validatePixel = (w, h, files, ratioPixel, onChange) => {
    if (w !== ratioPixel[0] && h !== ratioPixel[1]) {
      setFailedAlert({
        message: `File harus berdimensi ${ratioPixel[0]}:${ratioPixel[1]} pixel`,
      });
      setIsLoading(false);
    } else {
      onChange(files);
    }
  };

  const validImage = (files) => {
    let dataImage = new FormData();

    let fileImage = files;
    const nameImage = (fileImage?.name ?? '').replace(/\s+/g, '-');
    fileImage = new File([fileImage], nameImage, { type: fileImage?.type });
    dataImage.append('mediaPath', fileImage);
    dataImage.append('mediaId', create_UUID(true));
    dataImage.append('mediaName', files.name.slice(0, 10));

    uploadMedia(dataImage);
  };

  const handleChange = ({ target: { files } }) => {
    setIsLoading(true);

    const size = files[0]?.size;
    const name = files[0]?.name;

    if (size || name !== undefined) {
      if (size > maxSize) {
        setIsLoading(false);
        setFailedAlert({
          message: `File Maksimal Berukuran ${formatBytes(maxSize)}`,
        });
      } else if (isValidateByPixel) {
        let img = new Image();
        img.src = window?.URL?.createObjectURL(files[0]);
        img.onload = () => {
          validatePixel(
            img.width,
            img.height,
            files[0],
            ratioPixel,
            validImage,
          );
        };
      } else validImage(files[0]);
    } else {
      setIsLoading(false);
      setPreview(preview);
    }
  };

  return (
    <>
      {isLoading ? (
        <div alt="" className={classes.image}>
          <div
            className={classes.icon}
            style={{ width: '100%', textAlign: 'center', paddingTop: '10px' }}
          >
            <CircularProgress style={{ color: '#DE1B1B' }} />
          </div>
        </div>
      ) : (
        <label
          htmlFor={sectionName}
          style={{ cursor: disabled ? 'default' : 'pointer' }}
        >
          <div alt="" className={classes.image}>
            {preview ? (
              <div
                style={{ position: 'relative', width: '100%', height: '100%' }}
              >
                <img alt="" className={classes.image} src={preview} />
                {type === 'background' && <div className={classes.block} />}
              </div>
            ) : (
              <div className={classes.iconContainer}>
                <UploadImageWithCircle className={classes.icon} />
                {wordingImage && (
                  <div className={classes.wordingImage}>
                    <Typography
                      children={wordingImage}
                      color="general-light"
                      variant={wordingVariant}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </label>
      )}
      <input
        accept="image/*"
        disabled={disabled}
        hidden
        id={sectionName}
        onChange={handleChange}
        type="file"
      />
    </>
  );
};

UploadImage.defaultProps = {
  disabled: false,
  getUpdateItem: () => {},
  initialPreview: '',
  isValidateByPixel: false,
  item: null,
  maxSize: 358400,
  previewState: {},
  ratioPixel: [32, 32],
  sectionName: '',
  sizeBig: false,
  type: 'large',
  wordingImage: '',
  wordingVariant: 'h4',
};

UploadImage.propTypes = {
  disabled: PropTypes.bool,
  getUpdateItem: PropTypes.func,
  initialPreview: PropTypes.string,
  isValidateByPixel: PropTypes.bool,
  item: PropTypes.object,
  maxSize: PropTypes.number,
  previewState: PropTypes.object,
  ratioPixel: PropTypes.array,
  sectionName: PropTypes.string,
  sizeBig: PropTypes.bool,
  type: PropTypes.string,
  wordingImage: PropTypes.string,
  wordingVariant: PropTypes.string,
};

export default UploadImage;
