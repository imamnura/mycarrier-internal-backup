import React from 'react';
import PropTypes from 'prop-types';
import { Box, Avatar } from '@material-ui/core';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import Typography from '@components/Typography';
import { dummyText, dummyTextEng } from '../../../constant';
import SectionMark from '../../SectionMark';
import TextField from '../../TextField';
import TextEditor from './component/texteditor';
import Image from '../../components/Image/image';
import useStyles from './styles';
import useActions from './hooks/useActions';

const Hero = (props) => {
  const { tab, level, previewMode } = props;

  const {
    handleUploadImage,
    _control,
    file,
    setFile,
    descriptionid,
    descriptionen,
    setEditableDesc,
    handleEditableDesc,
    iconHero,
    nameProduct,
    handleChangeIcon,
  } = useActions(props);

  const classes = useStyles();

  return (
    <div
      className={classes.wrapper}
      style={{ border: previewMode ? 'none' : '2px dashed #E4E7E9' }}
    >
      {!previewMode && <SectionMark title="Product Name & Logo" />}

      <Box
        minHeight={503}
        p={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          onClick={() => () => setEditableDesc(false)}
          position="absolute"
          sx={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            alt={dummyText.image}
            disabled={previewMode}
            getUpdateItem={(data) => handleUploadImage(data)}
            item={file}
            previewState={{
              preview: file,
              setPreview: setFile,
            }}
            sectionName="Product Name & Logo"
            type="background"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '50%',
          }}
        >
          <Box style={{ zIndex: '1' }}>
            {iconHero?.mediaPath ? (
              <Image
                alt={dummyText.image}
                disabled={previewMode}
                getUpdateItem={(data) => handleChangeIcon(data)}
                isIcon
                isValidateByPixel={true}
                item={iconHero}
                ratioPixel={[64, 64]}
                sectionName="Icon Product"
                type="icon"
              />
            ) : (
              <Avatar alt="Icon" className={classes.icon} />
            )}
          </Box>
          <Box style={{ zIndex: '1' }} width="100%">
            <Typography
              children={nameProduct}
              color="white"
              variant="h5"
              weight="medium"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '80%',
          }}
        >
          <Box style={{ zIndex: 1 }} width="90%">
            <TextField
              colorPlaceholder="white"
              control={_control}
              disabled={previewMode}
              fontSize="2.25rem"
              multiline={true}
              name={`${level}HeroTitle${tab}`}
              noSpacing
              placeholder={tab === 'id' ? dummyText.title : dummyTextEng.title}
              position="center"
              weight="bold"
            />
          </Box>
          <Box className={classes.descCenter} width="80%">
            <TextEditor
              onChange={(data) => handleEditableDesc(data)}
              previewMode={previewMode}
              tab={tab}
              value={tab === 'id' ? descriptionid : descriptionen}
            />
          </Box>
        </Box>
        <Box
          mt={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <Typography color="white" variant="caption">
            {tab === 'id' ? dummyText.scroll : dummyTextEng.scroll}
          </Typography>
          <ArrowDown className={classes.arrow} />
        </Box>
      </Box>
    </div>
  );
};

Hero.defaultProps = {
  file: {
    _file: null,
    _setFile: () => {},
  },
  level: '',
  previewMode: false,
  tab: '',
};

Hero.propTypes = {
  file: PropTypes.object,
  // formType: PropTypes.string.isRequired,
  level: PropTypes.string,
  previewMode: PropTypes.bool,
  tab: PropTypes.string,
};

export default Hero;
