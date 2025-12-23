import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { create_UUID } from '../../../utils';
import { formatBytes } from '@utils/text';
import { getAccessToken } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import fetch from '@utils/fetch';
import useStyles from './styles';
import UploadImageWithCircle from '../../Icon/UploadImageWithCircle';
import { useLottie } from 'lottie-react';

const LottieComponent = (props) => {
  const { url } = props;

  const style = {
    width: 64,
    height: 64,
  };

  const options = {
    path: url,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return View;
};

const getUrlMedia = (data, type) => {
  const options = {
    method: 'POST',
    url:
      type === 'icon'
        ? `/explore/v1/media?useCompression=false`
        : `/explore/v1/media`,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

const deleteMedia = (mediaId) => {
  const options = {
    method: 'DELETE',
    url: `/explore/v1/media/${mediaId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

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
    isIcon,
  } = props;

  const { setFailedAlert } = usePopupAlert();

  const [preview, setPreview] = useState(null);
  const [fileTemp, setFileTemp] = useState(null);
  const [isJSONFile, setIsJSONFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles(preview, type);

  useEffect(() => {
    // if (!item) setPreview(null); setFileTemp(null);
    if (!item) {
      setPreview(null);
      setFileTemp(null);
    } else {
      setIsJSONFile(Boolean(item?.mediaPath.split('.').pop() === 'json'));
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
    const nameImage = (fileImage?.name || '').replace(/\s+/g, '-');
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
      } else if (isValidateByPixel && name.split('.').pop() !== 'json') {
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

      // BACKUP
      // if (size || name !== undefined) {
      //   if (size > maxSize) {
      //     setIsLoading(false);
      //     setFailedAlert({ message: `File Maksimal Berukuran ${formatBytes(maxSize)}` });
      //   } else {
      //     let fileImage = e.target.files[0];
      //     const nameImage = (fileImage?.name).replace(/\s+/g, '-');
      //     fileImage = new File([fileImage], nameImage, { type: fileImage?.type });
      //     dataImage.append('mediaPath', fileImage);
      //     dataImage.append('mediaId', create_UUID(true));
      //     dataImage.append('mediaName', name.slice(0, 10));

      //     try {
      //       const { data } = await getUrlMedia(dataImage);
      //       if (data) {
      //         getUpdateItem(data);
      //         setPreview(data);
      //         fileTemp ? deleteMediaExisting() : setFileTemp(data);
      //         setIsLoading(false);
      //       }
      //     } catch (error) {
      //       setIsLoading(false);
      //       setFailedAlert({ message: `Failed to Upload Image ${sectionName}` });
      //     }
      //   }
      // } else {
      //   setIsLoading(false);
      //   setPreview(preview);
      // }
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
                {isJSONFile ? (
                  <LottieComponent url={preview} />
                ) : (
                  // <div>test</div>
                  <>
                    <img alt="" className={classes.image} src={preview} />
                    {type === 'background' && <div className={classes.block} />}
                  </>
                )}
              </div>
            ) : (
              <UploadImageWithCircle className={classes.icon} />
            )}
          </div>
        </label>
      )}
      <input
        accept={isIcon ? '.png, application/json' : 'image/*'}
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
  isIcon: false,
  isValidateByPixel: false,
  item: null,
  maxSize: 358400,
  previewState: {},
  ratioPixel: [32, 32],
  sectionName: '',
  sizeBig: false,
  type: 'large',
};

UploadImage.propTypes = {
  disabled: PropTypes.bool,
  getUpdateItem: PropTypes.func,
  isIcon: PropTypes.bool,
  isValidateByPixel: PropTypes.bool,
  item: PropTypes.object,
  maxSize: PropTypes.number,
  previewState: PropTypes.object,
  ratioPixel: PropTypes.array,
  sectionName: PropTypes.string,
  sizeBig: PropTypes.bool,
  type: PropTypes.string,
};

export default UploadImage;
