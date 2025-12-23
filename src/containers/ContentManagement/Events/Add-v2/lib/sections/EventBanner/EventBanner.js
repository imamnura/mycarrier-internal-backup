/* eslint-disable import/extensions */

import React from 'react';
import PropTypes from 'prop-types';
import useActions from './hooks/useActions';
import useStyles from './styles';
import { Box } from '@material-ui/core';
import { dummyText } from './../../../constant';
import SectionMark from '../../components/SectionMark';
import Image from '../../components/Image/image';
import Wysiwyg from '@components/Wysiwyg';
import Skeleton from '@components/Skeleton';
import dynamic from 'next/dynamic';

const EventBanner = (props) => {
  const { tab, previewMode } = props;

  const {
    handleUploadImage,
    file,
    setFile,
    handleEditableDesc,
    descriptionid,
    descriptionen,
  } = useActions(props);

  const classes = useStyles();

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

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {!previewMode && <SectionMark title="Event Banner" />}
        <Box height={440}>
          <Image
            alt={dummyText.image}
            disabled={previewMode}
            getUpdateItem={(data) => handleUploadImage(data)}
            isValidateByPixel={true}
            item={file}
            maxSize={1024000} //1Mb 1000x1024
            previewState={{
              preview: file,
              setPreview: setFile,
            }}
            ratioPixel={[880, 440]}
            sectionName="Event Banner"
            type="background"
            wordingImage="Upload .png/.jpg image, max 1 MB and size 880 x 440 px"
          />
        </Box>
      </div>

      <div style={{ padding: '14px 0' }}>
        {previewMode ? (
          <FroalaEditorComponent
            model={tab === 'id' ? descriptionid : descriptionen}
          />
        ) : (
          <Wysiwyg
            onChange={(data) => handleEditableDesc(data)}
            tab={tab}
            value={tab === 'id' ? descriptionid : descriptionen}
            variant="article"
          />
        )}
      </div>
    </div>
  );
};

EventBanner.propTypes = {
  previewMode: PropTypes.bool,
  tab: PropTypes.string,
};

EventBanner.defaultProps = {
  previewMode: false,
  tab: 'id',
};

export default EventBanner;
