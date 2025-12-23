import 'cropperjs/dist/cropper.css';
import { useEffect, useState } from 'react';
import Cropper from 'react-cropper';
import { dataUrlToFile } from './utlis';
import { Button, Modal } from '@legion-ui/core';
import { Grid } from '@material-ui/core';
import { getFileInformation } from '@utils/common';

const ImageCropper = (props) => {
  const { image, minimum, onClose, onSubmit, fileName } = props;

  const [cropper, setCropper] = useState();

  const [minCropWidth, setMinCropWidth] = useState(0);

  useEffect(() => {
    const newImg = new Image(730);
    newImg.src = image;
    newImg.onload = function () {
      setMinCropWidth((minimum.width / newImg.naturalWidth) * newImg.width);
    };
  }, [image]);

  const onSubmitCrop = async () => {
    if (typeof cropper !== 'undefined') {
      let base = await cropper.getCroppedCanvas().toDataURL();

      const { extension } = getFileInformation(fileName);

      if (extension === 'jpg') {
        base = await cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.9);
      }

      await onSubmit({
        base,
        file: dataUrlToFile(base, new Date().getTime().toString() + fileName),
      });
    }
  };

  return (
    <Modal width="100%" show={!!image} title="Image Cropping" onClose={onClose}>
      {!!minCropWidth && (
        <div style={{ position: 'relative' }}>
          <Cropper
            src={image}
            style={{ maxHeight: '70vh', maxWidth: '60vw' }}
            aspectRatio={minimum.width / minimum.height}
            guides={false}
            minCropBoxWidth={minCropWidth}
            zoomOnWheel={false}
            zoomOnTouch={false}
            viewMode={1}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
          <br />
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Button
                variant="outline"
                type="button"
                id="btn-cancel-crop"
                onClick={onClose}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button type="button" id="btn-crop" onClick={onSubmitCrop}>
                CROP IMAGE
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </Modal>
  );
};

export default ImageCropper;
