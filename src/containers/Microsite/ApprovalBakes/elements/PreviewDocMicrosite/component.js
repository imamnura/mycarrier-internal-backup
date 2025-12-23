import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';
import Text from '../../../../../__old/components/elements/Text';
import workerSrc from '@utils/pdfWorker';

pdfjs.GlobalWorkerOptions.workerSrc = `/${workerSrc}`;

export default function Component(props) {
  const { classes, file } = props;

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{ marginBottom: 14 }}>
      {!file ? (
        <Text variant="caption">Fail to Generate</Text>
      ) : (
        file && (
          <Document
            file={file}
            id="document"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                className={classes.page}
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={0.5}
              />
            ))}
          </Document>
        )
      )}
    </div>
  );
}

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  file: PropTypes.string.isRequired,
};
