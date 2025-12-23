'use client';
/* eslint-disable import/extensions */

import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import * as config from './configs';
import Typography from '@components/Typography';
import useStyles from './styles';
import Skeleton from '@components/Skeleton';

const FroalaEditorComponent = dynamic(
  async () => {
    const values = await Promise.all([
      import('react-froala-wysiwyg'),
      import('froala-editor/css/froala_style.min.css'),
      import('froala-editor/css/froala_editor.pkgd.min.css'),
      import('froala-editor/js/plugins.pkgd.min.js'),
      import('froala-editor/js/plugins/image.min.js'),
    ]);
    return values[0];
  },
  {
    loading: () => <Skeleton height={290} />,
    ssr: false,
  },
);

const Wysiwyg = (props) => {
  const {
    error,
    helperText,
    onChange,
    value,
    variant,
    config: _config,
  } = props;

  const classes = useStyles({ error });

  const baseConfig = {
    charCounterCount: false,
    heightMin: 240,
    imagePaste: false,
    toolbarSticky: false,
    imageUpload: false,
    key: 'jUA1yA4D4E4C1E1A1pZGCTRSAPJWTLPLZHTQQb1JGZxE2F2G2D1B10B2B2E6F1C1==',
    pastePlain: false,
    quickInsertTags: [],
    tableStyles: {
      borderless: 'Borderless',
      'content-table': 'Table Content',
    },
    tabSpaces: 4,
    wordDeniedAttrs: ['width', 'height'],
    wordPasteKeepFormatting: false,
    wordPasteModal: false,
    scrollableContainer: '#wysiwyg-root',
  };

  const configVariant = {
    document: config.document,
    field: config.field,
    article: config.article,
    product: config.product,
  }[variant];

  return (
    <div className={classes.root} id="wysiwyg-root">
      <FroalaEditorComponent
        config={{
          ...baseConfig,
          ...configVariant,
          ..._config,
        }}
        model={value}
        onModelChange={onChange}
      />
      {helperText && (
        <div className={classes.helper}>
          <Typography children={helperText} variant="caption" />
        </div>
      )}
    </div>
  );
};

Wysiwyg.defaultProps = {
  config: {},
  error: false,
  helperText: '',
  value: '',
  variant: 'field',
};

Wysiwyg.propTypes = {
  config: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  variant: PropTypes.oneOf(['document', 'field', 'article', 'product']),
};

export default Wysiwyg;
