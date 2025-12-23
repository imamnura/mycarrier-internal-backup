/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-pascal-case */
import DocumentViewerContext from '@context/DocumentViewer';
import { getFileInformation } from '@utils/common';
import React, { useContext } from 'react';
import Excel from './elements/Excel';
import Image from './elements/Image';
import PDF from './elements/PDF';

const DocumentViewer = () => {
  const { data } = useContext(DocumentViewerContext);

  const { extension } = getFileInformation(data.url);

  if (extension === 'pdf') {
    return <PDF />;
  }

  if (['xls', 'xlsx'].includes(extension)) {
    return <Excel />;
  }

  if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(extension)) {
    return <Image />;
  }

  return null;
};

export default DocumentViewer;
