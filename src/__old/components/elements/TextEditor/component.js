/* eslint-disable import/extensions */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

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
    loading: () => <p>LOADING!!!</p>,
    ssr: false,
  },
);

const Component = (props) => {
  const { getStory, input, type } = props;

  useEffect(() => {
    if (getStory) {
      getStory(input.value);
    }
  }, [input]);

  const mainConfig = {
    key: 'jUA1yA4D4E4C1E1A1pZGCTRSAPJWTLPLZHTQQb1JGZxE2F2G2D1B10B2B2E6F1C1==',
    pastePlain: true,
    charCounterCount: false,
    quickInsertTags: [],
    attribution: false,
  };

  const editorType = () => {
    if (type === 'explore') {
      return {
        placeholderText: 'Edit Your Content Here!',
        imagePaste: false,
        toolbarButtonsXS: {
          moreText: {
            buttons: [
              'bold',
              'italic',
              'underline',
              'insertLink',
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
            buttonsVisible: 4,
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
            buttonsVisible: 4,
          },
        },
      };
    }

    if (type === 'evaluate') {
      return {
        heightMin: 200,
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
              'clearFormatting',
              'alignLeft',
              'alignCenter',
              'alignRight',
              'alignJustify',
              'formatOL',
              'formatUL',
              'outdent',
              'indent',
              'insertLink',
              'insertTable',
              'specialCharacters',
            ],
            buttonsVisible: 100,
          },
          moreMisc: {
            buttons: ['undo', 'redo'],
            align: 'right',
            buttonsVisible: 2,
          },
        },
      };
    }
    return {};
  };

  const additionalConfig = {
    ...mainConfig,
    ...editorType(),
  };

  return (
    <FroalaEditorComponent
      config={additionalConfig}
      model={input.value}
      onModelChange={input.onChange}
      tag="textarea"
    />
  );
};

Component.defaultProps = {
  input: {},
  story: '',
  type: '',
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  getStory: PropTypes.func.isRequired,
  input: PropTypes.object,
  story: PropTypes.string,
  type: PropTypes.string,
};

export default Component;
