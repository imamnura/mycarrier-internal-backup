import React, { useState } from 'react';
import FileUpload from '@components/FileUpload';

const FileUploadWrapper = (props) => {
  const [value, setValue] = useState();

  return <FileUpload onChange={setValue} value={value} {...props} />;
};

const tooltipOverview = {
  component: FileUploadWrapper,
  variant: [
    {
      grid: 4,
      name: 'Default',
      props: {
        accept: ['.jpg', '.png'],
        helperText: 'Upload .png or .jpg image, max 2 MB ',
        label: 'Upload Media',
        maxFile: 1,
        maxSize: 2097152,
      },
    },
  ],
};

export default tooltipOverview;
