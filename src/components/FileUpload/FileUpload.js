import Trash from '@assets/icon-v2/Trash';
import ImageCropper from '@components/ImageCropper';
import Loading from '@components/Loading';
import Typography from '@components/Typography';
import { ButtonBase, IconButton } from '@material-ui/core';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { formatBytes } from '@utils/text';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useStyles from './styles';
import { sizeValidate } from './validate';
import color from '@styles/color';

const FileUpload = (props) => {
  const { setFailedAlert } = usePopupAlert();
  const {
    accept,
    maxSize,
    label,
    // placeholder,
    required,
    helperText,
    error,
    value,
    onChange: _onChange,
    fetcher,
    customValidate,
    disabled,
    ratio,
    ratioPixel,
    withDelete,
    maxFile,
    withCropper,
    id = 'file-upload',
  } = props;

  const [loading, setLoading] = useState(false);

  const apiUploading = async (file) => {
    if (!fetcher) {
      return {
        fileUrl: URL.createObjectURL(file),
      };
    }

    setLoading(true);
    try {
      const result = await fetcher(file);
      setLoading(false);
      return result.data;
    } catch (error) {
      setLoading(false);
      setFailedAlert({
        message: error.message,
      });
      return null;
    }
  };

  const onUpload = async (file) => {
    const resData = await apiUploading(file);
    if (resData) {
      if (maxFile > 1) {
        _onChange([
          ...(Array.isArray(value) ? value : []),
          {
            file,
            data: resData,
            url: resData?.fileUrl,
            fileName: file.name,
          },
        ]);
      } else {
        _onChange({
          file,
          data: resData,
          url: resData?.fileUrl,
          fileName: file.name,
        });
      }
    }
  };

  const [image, setImage] = useState('');
  const [fileName, setFileName] = useState('');

  const onChange = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) {
      return;
    }

    const validSize = sizeValidate(file, maxSize);
    const validCustom = customValidate
      ? customValidate(file)
      : { passed: true };

    if (!validSize.passed) {
      setFailedAlert({ message: validSize.message });
    } else if (!validCustom.passed) {
      setFailedAlert({ message: validCustom.message });
    } else if (ratio[0] && ratio[1] && file.type.startsWith('image/')) {
      let img = new Image();
      img.src = window?.URL?.createObjectURL(file);

      img.onload = async () => {
        if (img.width / img.height !== ratio[0] / ratio[1]) {
          setFailedAlert({
            message: `image not valid, please upload image with ratio ${ratio[0]} : ${ratio[1]}`,
          });
        } else {
          onUpload(file);
        }
      };
    } else if (ratio[0] && ratio[1] && file.type.startsWith('video/')) {
      let video = document.createElement('video');
      video.src = window?.URL?.createObjectURL(file);
      video.preload = 'metadata'; // Load metadata to get video dimensions

      video.onloadedmetadata = async () => {
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        const aspectRatio = videoWidth / videoHeight;

        if (aspectRatio !== ratio[0] / ratio[1]) {
          setFailedAlert({
            message: `Video not valid, please upload a video with aspect ratio ${ratio[0]}:${ratio[1]}.`,
          });
        } else {
          onUpload(file);
        }
      };
    } else if (
      ratioPixel[0] &&
      ratioPixel[1] &&
      file.type.startsWith('image/')
    ) {
      let img = new Image();
      img.src = window?.URL?.createObjectURL(file);

      img.onload = async () => {
        if (img.width < ratioPixel[0] || img.height < ratioPixel[1]) {
          setFailedAlert({
            message: `image not valid, please upload image with minimum size ${ratioPixel[0]} x ${ratioPixel[1]} pixel`,
          });
        } else {
          if (withCropper) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = () => {
              setImage(reader.result);
            };
            reader.readAsDataURL(file);
          } else {
            onUpload(file);
          }
        }
      };
    } else if (
      ratioPixel[0] &&
      ratioPixel[1] &&
      file.type.startsWith('video/')
    ) {
      let video = document.createElement('video');
      video.src = window?.URL?.createObjectURL(file);
      video.preload = 'metadata'; // Load metadata to get video dimensions

      video.onloadedmetadata = async () => {
        if (
          video.videoWidth !== ratioPixel[0] ||
          video.videoHeight !== ratioPixel[1]
        ) {
          setFailedAlert({
            message: `Video not valid, please upload a video with dimensions ${ratioPixel[0]} x ${ratioPixel[1]} pixels.`,
          });
        } else {
          onUpload(file);
        }
      };
    } else {
      onUpload(file);
    }
  };

  const onDelete = (selected) => {
    if (maxFile > 1) {
      _onChange(value?.filter((item) => item?.url !== selected?.url));
    } else {
      // _onChange(undefined); // error delete on default values
      _onChange(null);
    }
  };

  const renderHelperText = () => {
    let text = '*';
    if (accept && accept.length > 0) {
      text += `File in ${accept.join('/')} only. `;
    }
    if (maxSize && maxFile === 1) {
      text += `Max ${formatBytes(maxSize)}. `;
    }
    if (maxFile > 1) {
      text += `Up to ${maxFile} files`;
      if (maxSize) {
        text += ` with max. ${formatBytes(maxSize)}/file`;
      }
      text += '.';
    }
    if (ratio[0] && ratio[1]) {
      text += `with ratio ${ratio[0]} : ${ratio[1]}`;
    }
    if (ratioPixel[0] && ratioPixel[1]) {
      text += `with size ${ratioPixel[0]} x ${ratioPixel[1]} pixel`;
    }
    return text;
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragAccept } =
    useDropzone({
      disabled: disabled,
      multiple: false,
    });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      onChange(acceptedFiles);
    }
  }, [acceptedFiles]);

  const classes = useStyles({ error, disabled, isDragAccept });

  return (
    <>
      {required && (
        <Typography
          children="*"
          className={classes.required}
          color="primary-main"
          variant="body2"
        />
      )}
      {!!label && (
        <Typography
          children={label}
          className={classes.label}
          variant="overline"
          weight="medium"
        />
      )}
      {maxFile > 1 || (maxFile === 1 && !value) ? (
        <ButtonBase
          {...getRootProps({
            className: classes.uploader,
          })}
          component="div"
          disabled={disabled || value?.length >= maxFile}
          id={id}
        >
          <Typography
            color={disabled ? 'general-light' : 'general-mid'}
            variant="body2"
          >
            {isDragAccept ? (
              'Drop your files to upload'
            ) : (
              <>
                Drag & Drop your files here or{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    color: color.blue.main,
                  }}
                >
                  Browse files
                </span>
              </>
            )}
          </Typography>
          {loading ? <Loading color="primary" /> : <span />}
          <input {...getInputProps()} accept={accept.join(',')} />
        </ButtonBase>
      ) : (
        <div className={classes.fileResult}>
          <Typography
            className={classes.fileLabel}
            color="general-main"
            variant="body2"
          >
            {value?.fileName}
          </Typography>
          {withDelete && (
            <IconButton
              className={classes.deleteButton}
              disabled={disabled}
              onClick={onDelete}
              size="medium"
              id={id + '-delete'}
            >
              <Trash />
            </IconButton>
          )}
        </div>
      )}
      <div className={classes.helper}>
        <Typography
          children={helperText || renderHelperText()}
          variant="caption"
        />
      </div>
      {maxFile > 1 &&
        value?.length > 0 &&
        value?.map((item, index) => (
          <div key={index} className={classes.fileResult}>
            <Typography
              className={classes.fileLabel}
              color="general-main"
              variant="body2"
            >
              {item?.fileName}
            </Typography>
            {withDelete && (
              <IconButton
                className={classes.deleteButton}
                disabled={disabled}
                onClick={() => onDelete(item)}
                size="medium"
                id={id + '-delete-' + index}
              >
                <Trash />
              </IconButton>
            )}
          </div>
        ))}
      {withCropper && image && (
        <ImageCropper
          minimum={{
            width: ratioPixel[0],
            height: ratioPixel[1],
          }}
          fileName={fileName}
          image={image}
          onClose={() => {
            setImage('');
          }}
          onSubmit={({ file }) => {
            onUpload(file);
            setImage('');
          }}
        />
      )}
    </>
  );
};

FileUpload.defaultProps = {
  accept: [],
  customValidate: null,
  disabled: false,
  error: false,
  fetcher: null,
  label: '',
  maxFile: 1,
  maxSize: 0,
  placeholder: 'Example: filename.ext',
  ratio: [],
  ratioPixel: [],
  required: false,
  value: null,
  withCropper: false,
  withDelete: true,
};

FileUpload.propTypes = {
  accept: PropTypes.arrayOf(PropTypes.string),
  customValidate: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fetcher: PropTypes.func,
  helperText: PropTypes.string,
  label: PropTypes.string,
  maxFile: PropTypes.number,
  maxSize: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  ratio: PropTypes.array,
  ratioPixel: PropTypes.array,
  required: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  withCropper: PropTypes.bool,
  withDelete: PropTypes.bool,
};

export default FileUpload;
