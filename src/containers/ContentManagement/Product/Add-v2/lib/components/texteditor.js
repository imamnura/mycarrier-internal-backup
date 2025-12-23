/* eslint-disable import/extensions */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { CircularProgress } from '@material-ui/core';

// import FroalaEditorComponent from 'react-froala-wysiwyg';
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/css/froala_editor.pkgd.min.css';
// import 'froala-editor/js/plugins.pkgd.min.js';
// import 'froala-editor/js/plugins/image.min.js';

const renderLoading = (
  <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
    <CircularProgress style={{ color: '#DE1B1B' }} />
  </div>
);

const FroalaEditorComponent = dynamic(
  async () => {
    const values = await Promise.all([
      import('react-froala-wysiwyg'), // must be first import since we are doing values[0] in return
      import('froala-editor/css/froala_style.min.css'),
      import('froala-editor/css/froala_editor.pkgd.min.css'),
      import('froala-editor/js/plugins.pkgd.min.js'),
      import('froala-editor/js/plugins/image.min.js'),
    ]);
    return values[0];
  },
  {
    loading: () => renderLoading,
    ssr: false,
  },
);

const Component = (props) => {
  const { getStory, value } = props;
  const [model, setModel] = useState(value);
  useEffect(() => {
    getStory(model);
  }, [model]);

  const handleChange = (value) => {
    setModel(value);
  };

  const mainConfig = {
    key: 'aLF3c1B8A5D6E3F2A2C-7SLJCKHXOSLMc2YGSGe1ZXHSa1CgC3E3G3B2B7A4E4F4D2E3==',
    pastePlain: true,
    // charCounterCount: false,
    quickInsertTags: [],
    attribution: false,
    charCounterMax: 1500,
  };

  const editorType = () => {
    return {
      placeholderText: 'Edit Your Content Here!',
      imageUpload: false,
      imagePaste: false,
      pastePlain: true,
      wordPasteModal: false,
      wordPasteKeepFormatting: false,
      wordDeniedAttrs: ['width', 'height'],
      toolbarButtons: {
        moreText: {
          buttons: [
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'subscript',
            'superscript',
            'fontFamily',
            'fontSize',
            'textColor',
            'backgroundColor',
            'inlineClass',
            'inlineStyle',
            'clearFormatting',
          ],
        },
        moreParagraph: {
          buttons: [
            'alignLeft',
            'alignCenter',
            'formatOLSimple',
            'alignRight',
            'alignJustify',
            'formatOL',
            'formatUL',
            'paragraphFormat',
            'paragraphStyle',
            'lineHeight',
            'outdent',
            'indent',
            'quote',
          ],
        },
        moreRich: {
          buttons: [
            'insertLink',
            'insertTable',
            'emoticons',
            'specialCharacters',
            'insertHR',
            'Undo',
            'Redo',
          ],
        },
        moreMisc: {
          buttons: [
            'undo',
            'redo',
            'fullscreen',
            'print',
            'getPDF',
            'spellChecker',
            'selectAll',
            'html',
            'help',
          ],
        },
      },
    };
  };

  const additionalConfig = {
    ...mainConfig,
    ...editorType(),
  };

  return (
    <FroalaEditorComponent
      config={additionalConfig}
      model={model}
      onModelChange={handleChange}
      tag="textarea"
    />
  );
};

Component.defaultProps = {
  value: '',
};

Component.propTypes = {
  getStory: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Component;
