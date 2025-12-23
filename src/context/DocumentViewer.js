import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const DocumentViewerContext = createContext({
  data: {
    url: '',
    title: '',
    action: [{ label: '', onClick: () => {} }],
    onClose: () => {},
  },
});

const Provider = DocumentViewerContext.Provider;

export const DocumentViewerProvider = (props) => {
  const [documentViewer, setDocumentViewer] = useState({
    url: '',
    title: '',
    action: [{ label: '', onClick: () => {} }],
    onClose: () => {},
  });

  return (
    <Provider
      value={{
        data: documentViewer,
        setData: setDocumentViewer,
      }}
    >
      {props.children}
    </Provider>
  );
};

DocumentViewerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DocumentViewerContext;
