import React from 'react';
import PropTypes from 'prop-types';
import SectionMark from '../../SectionMark';
import { Grid } from '@material-ui/core';
import TextField from '../../components/TextFieldContent';
import useActions from './hooks/useActions';
import TextEditor from './component/texteditor';
import useStyles from './styles';
import { dummyText, dummyTextEng } from '../../../constant';
import { ASSETS_URL } from '@constants/env';

const QualityService = (props) => {
  const { tab, level, previewMode } = props;

  const {
    _control,
    descriptionid,
    descriptionen,
    handleEditableDesc,
    isDisplayProductQuality,
    setIsDisplayProductQuality,
  } = useActions(props);

  const classes = useStyles();

  if (isDisplayProductQuality || !previewMode) {
    return (
      <div
        style={{
          border: previewMode ? 'none' : '2px dashed #E4E7E9',
          backgroundImage: `url(${ASSETS_URL}/ewz-mytens-pub-prod/catalogpublic/mycarrier/assets/metro-ethernet/metro-ethernet-qos.jpeg)`,
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        {!previewMode && (
          <SectionMark
            isDisplay={isDisplayProductQuality}
            nonmandatory
            onChange={() =>
              setIsDisplayProductQuality(!isDisplayProductQuality)
            }
            title="Quality of Service"
          />
        )}

        <Grid
          container
          style={{
            padding: previewMode ? '3rem 5rem' : '5rem 4rem 3rem',
            width: '100%',
            maxWidth: '1280px',
            marginInline: 'auto',
            alignItems: 'center',
          }}
        >
          <Grid item md={7} sm={7} xs={12}>
            <div style={{ marginBottom: '10px' }}>
              <TextField
                colorPlaceholder="white"
                control={_control}
                disabled={previewMode}
                fontSize="1.25rem"
                multiline={true}
                name={`${level}QualityServiceTitle${tab}`}
                noSpacing
                placeholder={
                  tab === 'id' ? dummyText.title : dummyTextEng.title
                }
                position="left"
                weight="bold"
              />
            </div>
          </Grid>
          <Grid
            item
            md={5}
            sm={5}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            xs={12}
          >
            <div style={{ marginBottom: '10px', color: '#E4E7E9' }}>
              <TextEditor
                onChange={(data) => handleEditableDesc(data)}
                previewMode={previewMode}
                tab={tab}
                value={tab === 'id' ? descriptionid : descriptionen}
              />
            </div>
          </Grid>
        </Grid>

        <div className={!isDisplayProductQuality && classes.disabledSection} />
      </div>
    );
  }

  return <></>;
};

QualityService.defaultProps = {
  level: '',
  previewMode: false,
  tab: 'id',
};

QualityService.propTypes = {
  level: PropTypes.string,
  previewMode: PropTypes.bool,
  tab: PropTypes.string,
};

export default QualityService;
