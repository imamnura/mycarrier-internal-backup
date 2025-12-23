import { useContext } from 'react';
import DocumentViewerContext from '@context/DocumentViewer';

const useAction = () => {
  const {
    data: { url, action, onClose, title, centered },
  } = useContext(DocumentViewerContext);

  const onDownload = (onClick) => () => {
    onClick(url);
  };

  return {
    url,
    title,
    action,
    onClose,
    onDownload,
    centered,
  };
};

export default useAction;
