import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import SectionMark from '../../SectionMark';
import TextField from '../../components/TextFieldContent';
import Image from '../../components/Image/image';
import { dummyText, dummyTextEng } from '../../../constant';
import useActions from './hooks/useActions';
import useStyles from './styles';

const Banner = (props) => {
  const { tab, previewMode, stepName } = props;
  const { handleUploadImage, _control, file, setFile } = useActions(props);
  const classes = useStyles(previewMode);

  const renderContent = () => {
    if (stepName === 'L0 - Content Page') {
      if (tab === 'id') {
        return (
          <>
            <Box className={classes.leftSection}>
              <div className={classes.mbField}>
                <TextField
                  autoFocus={true}
                  control={_control}
                  disabled={previewMode}
                  fontSize="2.25rem"
                  multiline={true}
                  name={`l0BannerTitleid`}
                  noSpacing
                  placeholder={dummyText.title}
                  position="left"
                  weight="bold"
                />
              </div>
            </Box>
            <Box className={classes.leftSection}>
              <div className={classes.mbField}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="1rem"
                  minRows={2}
                  multiline={true}
                  name={`l0BannerDescid`}
                  noSpacing
                  placeholder={dummyText.description}
                  position="left"
                  weight="normal"
                />
              </div>
            </Box>
          </>
        );
      }

      if (tab === 'en') {
        return (
          <>
            <Box className={classes.leftSection}>
              <div className={classes.mbField}>
                <TextField
                  autoFocus={true}
                  control={_control}
                  disabled={previewMode}
                  fontSize="2.25rem"
                  multiline={true}
                  name={`l0BannerTitleen`}
                  noSpacing
                  placeholder={dummyTextEng.title}
                  position="left"
                  weight="bold"
                />
              </div>
            </Box>
            <Box className={classes.leftSection}>
              <div className={classes.mbField}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="1rem"
                  minRows={2}
                  multiline={true}
                  name={`l0BannerDescen`}
                  noSpacing
                  placeholder={dummyTextEng.description}
                  position="left"
                  weight="normal"
                />
              </div>
            </Box>
          </>
        );
      }
    }

    if (stepName === 'L1 - Content Page') {
      if (tab === 'id') {
        return (
          <>
            <Box className={classes.leftSection}>
              <div className={classes.mbField}>
                <TextField
                  autoFocus={true}
                  control={_control}
                  disabled={previewMode}
                  fontSize="2.25rem"
                  multiline={true}
                  name={`l1BannerTitleid`}
                  noSpacing
                  placeholder={dummyText.title}
                  position="left"
                  weight="bold"
                />
              </div>
            </Box>
            <Box className={classes.leftSection}>
              <div className={classes.mbField}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="1rem"
                  minRows={2}
                  multiline={true}
                  name={`l1BannerDescid`}
                  noSpacing
                  placeholder={dummyText.description}
                  position="left"
                  weight="normal"
                />
              </div>
            </Box>
          </>
        );
      }

      if (tab === 'en') {
        return (
          <>
            <Box className={classes.leftSection}>
              <div className={classes.mbField}>
                <TextField
                  autoFocus={true}
                  control={_control}
                  disabled={previewMode}
                  fontSize="2.25rem"
                  multiline={true}
                  name={`l1BannerTitleen`}
                  noSpacing
                  placeholder={dummyTextEng.title}
                  position="left"
                  weight="bold"
                />
              </div>
            </Box>
            <Box className={classes.leftSection}>
              <div className={classes.mbField}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="1rem"
                  minRows={2}
                  multiline={true}
                  name={`l1BannerDescen`}
                  noSpacing
                  placeholder={dummyTextEng.description}
                  position="left"
                  weight="normal"
                />
              </div>
            </Box>
          </>
        );
      }
    }
  };

  return (
    <div className={classes.root}>
      {!previewMode && <SectionMark title="Banner" />}

      <Box className={classes.container}>
        <Box
          className={classes.contentImage}
          // eslint-disable-next-line no-undef
          onClick={() => () => setEditableDesc(false)}
          position="absolute"
        >
          <Image
            alt={dummyText.image}
            disabled={previewMode}
            getUpdateItem={handleUploadImage}
            item={file}
            previewState={{
              preview: file,
              setPreview: setFile,
            }}
            sectionName="Product Name & Logo"
            type="banner"
          />
        </Box>
        <div className={classes.clipBackground} />

        <Box className={classes.leftContainer}>{renderContent()}</Box>
      </Box>
    </div>
  );
};

Banner.defaultProps = {
  file: {
    _file: null,
    _setFile: () => {},
  },
  previewMode: false,
  stepName: '',
  tab: 'id',
};

Banner.propTypes = {
  file: PropTypes.object,
  previewMode: PropTypes.bool,
  stepName: PropTypes.string,
  tab: PropTypes.string,
};

export default Banner;
