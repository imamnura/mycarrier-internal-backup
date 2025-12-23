import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FileViewer from '@layouts/FileViewer';
import Typography from '@components/Typography';

const Document = (props) => {
  const { value: _value } = props;
  const [previewFile, setPreviewFile] = useState(null);

  let value = _value;

  if (!Array.isArray(value)) {
    value = [_value];
  }

  return (
    <Box>
      <ul style={{ paddingLeft: 0, margin: 0, listStyleType: 'none' }}>
        {value.length
          ? value.map((item, i) => {
              if (item.fileName) {
                return (
                  <li key={`bdy-det-${item}-${i}`}>
                    <Box py="2px">
                      <Typography
                        children={item?.fileName}
                        color="blue-main"
                        onClick={() => setPreviewFile(item)}
                        style={{ cursor: 'pointer' }}
                        variant="caption"
                      />
                    </Box>
                  </li>
                );
              } else return '-';
            })
          : '-'}
      </ul>
      <FileViewer
        file={previewFile?.fileUrl}
        onClose={() => setPreviewFile(null)}
        open={Boolean(previewFile?.fileUrl)}
        title={previewFile?.fileName}
      />
    </Box>
  );
};

Document.defaultProps = {
  value: [],
};

Document.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Document;
