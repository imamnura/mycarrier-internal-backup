import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { formatBytes } from '@utils/text';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useStyles from './styles';
import UploadImageWithCircle from '@assets/icon-v2/UploadImageWithCircle';
import Typography from '@components/Typography';
import {
  postUploadIcon,
  deleteUploadIcon,
  postUploadCustomerLogo,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import clsx from 'clsx';
import IconButton from '../icon-button';
import PencilIcon from '@assets/icon-v2/PencilIcon';
import XIcon from '@assets/icon-v2/XIcon';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const UploadImage = (props) => {
  const {
    getUpdateItem,
    isValidateByPixel,
    maxSize,
    ratioPixel,
    sectionName,
    wordingImage,
    wordingVariant,
    value,
    bpNumber,
    id = 'upload-image',
  } = props;

  const { setFailedAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [imgPreview, setImgPreview] = useState();

  useEffect(() => {
    setImgPreview(value?.mediaUrl || '');
  }, [value?.mediaUrl]);

  const [isLoading, setIsLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const classes = useStyles();

  const deleteMediaExisting = async () => {
    setIsLoading(true);
    try {
      await deleteUploadIcon({ bpNumber });
      getUpdateItem(null);
    } catch (error) {
      setFailedAlert({ message: `Failed to delete logo` });
    } finally {
      setIsLoading(false);
      closeConfirmation();
    }
  };

  const uploadCustomerLogo = async (data) => {
    const payload = {
      bpNumber,
      iconCompany: {
        mediaId: data?.mediaId,
        mediaName: data?.mediaName,
        mediaPath: data?.mediaPath,
        mediaUrl: data?.mediaUrl,
      },
    };

    try {
      const { data } = await postUploadCustomerLogo(payload);
      if (data?.iconCompany) {
        getUpdateItem(data.iconCompany);
        // setImgPreview(data.iconCompany.mediaUrl || '');
      }
    } catch (error) {
      setIsLoading(false);
      setFailedAlert({ message: `Failed to Upload Image ${sectionName}` });
    }
  };

  const isHaveImage = !!imgPreview;

  const validatePixel = (w, h, files, ratioPixel, onChange) => {
    if (w <= ratioPixel[0] || h <= ratioPixel[1]) {
      setFailedAlert({
        message: `File minimal berdimensi ${ratioPixel[0]}x${ratioPixel[1]} pixel`,
      });
      setIsLoading(false);
    } else {
      onChange(files);
    }
  };

  const validImage = async (files) => {
    let dataImage = new FormData();

    let fileImage = files;
    const nameImage = (fileImage?.name ?? '').replace(/\s+/g, '-');
    fileImage = new File([fileImage], nameImage, { type: fileImage?.type });
    dataImage.append('file', fileImage);
    dataImage.append('type', 'reconciliation');

    try {
      const { success, data } = await postUploadIcon(dataImage);
      if (success) {
        uploadCustomerLogo(data);
      }
    } catch (error) {
      setFailedAlert({ message: `Failed to Upload Image ${sectionName}` });
    } finally {
      setIsLoading(false);
    }
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
      // setImgPreview(imgPreview);
      getUpdateItem(imgPreview);
    }
  };

  return (
    <>
      {isLoading ? (
        <div alt="" className={classes.image}>
          <div
            className={classes.icon}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <CircularProgress style={{ color: '#DE1B1B' }} />
          </div>
        </div>
      ) : (
        <label htmlFor={sectionName} style={{ cursor: 'pointer' }} id={id}>
          <div
            className={clsx({
              [classes.image]: !imgPreview,
              [classes.imageContainer]: imgPreview,
            })}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <input
              accept="image/*"
              hidden
              id={sectionName}
              onChange={handleChange}
              type="file"
            />
            {imgPreview && (
              <img
                src={imgPreview}
                className={clsx({
                  [classes.image]: !imgPreview,
                  [classes.imageRounded]: imgPreview,
                })}
                alt={sectionName}
                onError={() => {
                  // setImgPreview(imgPreview);
                  getUpdateItem(imgPreview);
                }}
              />
            )}
            {!isHaveImage && (
              <div className={classes.iconContainer}>
                <UploadImageWithCircle className={classes.icon} />
                {wordingImage && (
                  <div className={classes.wordingImage}>
                    <Typography
                      children={wordingImage}
                      color="general-main"
                      variant={wordingVariant}
                    />
                  </div>
                )}
              </div>
            )}
            {isHaveImage && isHover && (
              <div className={classes.positionIconPencil}>
                <PencilIcon className={classes.iconBtn} />
              </div>
            )}
            {isHaveImage && isHover && (
              <div className={classes.positionIconX}>
                <IconButton
                  id="delete-logo-customer"
                  className={classes.btnIconX}
                  onClick={() => {
                    setConfirmation({
                      message: 'Are you sure to delete this logo',
                      action: [
                        {
                          children: 'no',
                          variant: 'ghost',
                          onClick: closeConfirmation,
                        },
                        {
                          children: 'yes',
                          onClick: () => deleteMediaExisting(),
                        },
                      ],
                    });
                  }}
                >
                  <XIcon className={classes.iconBtn} />
                </IconButton>
              </div>
            )}
          </div>
        </label>
      )}
    </>
  );
};

UploadImage.defaultProps = {
  getUpdateItem: () => {},
  isValidateByPixel: false,
  maxSize: 358400,
  ratioPixel: [32, 32],
  sectionName: '',
  wordingImage: '',
  wordingVariant: 'h4',
  value: {},
  bpNumber: 0,
};

UploadImage.propTypes = {
  getUpdateItem: PropTypes.func,
  isValidateByPixel: PropTypes.bool,
  maxSize: PropTypes.number,
  ratioPixel: PropTypes.array,
  sectionName: PropTypes.string,
  wordingImage: PropTypes.string,
  wordingVariant: PropTypes.string,
  value: PropTypes.object,
  bpNumber: PropTypes.number,
};

export default UploadImage;
