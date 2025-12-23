import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@material-ui/core';
import dynamic from 'next/dynamic';
import Typography from '@components/Typography';
import TextEditor from '../../../components/texteditor';
import Button from '@components/Button';
import { dummyText, dummyTextEng } from '../../../../constant';

const TextEditorComp = (props) => {
  const { onChange, value, tab, previewMode } = props;

  const renderLoading = (
    <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
      <CircularProgress style={{ color: '#DE1B1B' }} />
    </div>
  );

  const FroalaEditorView = dynamic(
    async () => {
      const values = await Promise.all([
        import('react-froala-wysiwyg/FroalaEditorView'),
      ]);
      return values[0];
    },
    {
      loading: () => renderLoading,
      ssr: false,
    },
  );

  const [editableDesc, setEditableDesc] = useState(false);
  const [descriptionid, setDescriptionid] = useState(
    value !== dummyText.description ? value : dummyText.description,
  );
  const [descriptionen, setDescriptionen] = useState(
    value !== dummyTextEng.description ? value : dummyTextEng.description,
  );

  const handleDescription = (e) => {
    tab === 'id'
      ? setDescriptionid(e || dummyText.description)
      : setDescriptionen(e || dummyTextEng.description);
  };

  const handleEditableDesc = (val) => {
    setEditableDesc(true);
    tab === 'id' ? setDescriptionid(val) : setDescriptionen(val);
  };

  const saveDesc = () => {
    setEditableDesc(false);
    onChange(tab === 'id' ? descriptionid : descriptionen);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      {editableDesc ? (
        <>
          <TextEditor
            getStory={(e) => handleDescription(e)}
            name="desc"
            type="explore"
            value={value}
          />
          <Box mt={2} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              children="SAVE"
              onClick={() => saveDesc()}
              style={{ marginRight: '10px' }}
            />
            <Button
              children="CANCEL"
              onClick={() => setEditableDesc(false)}
              variant="ghost"
            />
          </Box>
        </>
      ) : (
        <Typography
          onClick={() =>
            !previewMode
              ? handleEditableDesc(tab === 'id' ? descriptionid : descriptionen)
              : () => {}
          }
          variant="subtitle1"
          weight="light"
        >
          <FroalaEditorView model={value} />
        </Typography>
      )}
    </div>
  );
};

TextEditorComp.propTypes = {
  onChange: PropTypes.func.isRequired,
  previewMode: PropTypes.bool,
  tab: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

TextEditorComp.defaultProps = {
  previewMode: false,
};

export default TextEditorComp;
