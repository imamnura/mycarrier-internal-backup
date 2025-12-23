import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const DocumentViewer = () => {
  const { query } = useRouter();

  const { url, name } = query;

  const { setDocumentViewer } = useDocumentViewer();

  useEffect(() => {
    if (url && name) {
      setDocumentViewer({
        title: name,
        url: url,
      });
    }
  }, [url, name]);

  return <></>;
};

export default DocumentViewer;
