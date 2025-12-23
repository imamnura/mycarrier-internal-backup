import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import { generateFile, generatePreviewFile } from './action';
import FileViewer from '../../../../layouts/FileViewer';

export default function Component(props) {
  const { data, onClose, onSubmit, endpoint, isPreview, open } = props;

  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (open) {
      if (isPreview) {
        generatePreviewFile(data, endpoint, (v) => {
          setFile(v);
          setLoading(false);
        });
      } else {
        generateFile(data, endpoint, (v) => {
          setFile(v);
          setLoading(false);
        });
      }
    }
  }, [open]);

  return (
    <FileViewer
      actionButton={
        <div>
          {!isPreview && (
            <Button disabled={!file} onClick={onSubmit}>
              Submit
            </Button>
          )}
        </div>
      }
      file={file}
      loading={loading}
      onClose={onClose}
      open={open}
      title="Review Document"
    />
  );
}

Component.defaultProps = {
  isPreview: false,
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  endpoint: PropTypes.object.isRequired,
  isPreview: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  scale: PropTypes.number.isRequired,
};
