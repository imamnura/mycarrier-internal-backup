import { useContext } from 'react';
import DocumentViewerContext from '../../context/DocumentViewer';

const useDocumentViewer = () => {
  const { setData } = useContext(DocumentViewerContext);

  const _onClose = (customClose) => () => {
    if (customClose) {
      customClose();
    }

    setData({
      action: [],
      title: '',
      url: '',
      onClose: () => {},
    });
  };

  const setDocumentViewer = (property) => {
    const {
      centered,
      onClose,
      title,
      url,
      action = [
        {
          label: 'Download',
          onClick: () => {
            window.open(url);
          },
        },
      ],
    } = property;

    setData({
      action,
      centered,
      onClose: _onClose(onClose),
      title,
      url,
    });
  };

  const closeDocumentViewer = _onClose();

  return {
    setDocumentViewer,
    closeDocumentViewer,
  };
};

export default useDocumentViewer;
