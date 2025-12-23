import React from 'react';
import PropTypes from 'prop-types';
import SectionMark from '../../SectionMark';
import { Grid } from '@material-ui/core';
import TextField from '../../TextField';
import useActions from './hooks/useActions';
import Image from '../../components/Image/image';
import useStyles from './styles';
import { dummyText, dummyTextEng } from '../../../constant';
import TextEditor from './component/texteditor';
import LineButton from '../../components/LineButton/lineButton';

const ProductSpesifications = (props) => {
  const { tab, level } = props;

  const {
    handleUploadImage,
    setFile,
    previewMode,
    _control,
    handleDelete,
    addSection,
    sectionDataId,
    sectionDataEn,
    handleDescription,
    isDisplayProductSpesifications,
    setIsDisplayProductSpesifications,
  } = useActions(props);

  const classes = useStyles();

  if (isDisplayProductSpesifications || !previewMode) {
    return (
      <div
        style={{
          border: previewMode ? 'none' : '2px dashed #E4E7E9',
          borderTop: 'none',
          position: 'relative',
        }}
      >
        {!previewMode && (
          <SectionMark
            isDisplay={isDisplayProductSpesifications}
            nonmandatory
            onChange={() =>
              setIsDisplayProductSpesifications(!isDisplayProductSpesifications)
            }
            title="Product Spesifications"
          />
        )}

        <div
          style={{
            padding: previewMode ? '5rem 1rem' : '5rem 4rem',
            width: '100%',
            maxWidth: '1280px',
            marginInline: 'auto',
          }}
        >
          {tab === 'id' &&
            sectionDataId?.map((item, i) => {
              return (
                <div key={i}>
                  {i !== 0 && tab === 'id' && !previewMode && (
                    <LineButton
                      handleClick={() => handleDelete(i)}
                      label="DELETE SECTION"
                      variant="primary"
                    />
                  )}
                  <Grid
                    alignItems="center"
                    container
                    direction={i % 2 === 0 ? 'row-reverse' : 'row'}
                    key={i}
                    spacing={2}
                  >
                    <Grid item md={5} xs={12}>
                      <div
                        className={
                          i % 2 === 0
                            ? classes.contentImageRight
                            : classes.contentImageLeft
                        }
                      >
                        <div style={{ width: '100%' }}>
                          <Image
                            alt={dummyText.image}
                            disabled={previewMode}
                            getUpdateItem={(data) => handleUploadImage(data, i)}
                            item={item.imageUrl}
                            previewState={{
                              preview: item.imageUrl,
                              setPreview: setFile,
                            }}
                            sectionName={`Spesifications${i}`}
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <div
                        style={
                          i % 2 == 0
                            ? { marginRight: '2.5rem' }
                            : { marginLeft: '2.5rem' }
                        }
                      >
                        <div style={{ marginBottom: '10px' }}>
                          <TextField
                            control={_control}
                            disabled={previewMode}
                            fontSize="2.25rem"
                            multiline={true}
                            name={`${level}ProductSpesificationsid[${i}].title`}
                            noSpacing
                            placeholder={dummyText.title}
                            position="left"
                            weight="bold"
                          />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                          <TextEditor
                            onChange={(data) => handleDescription(data, i)}
                            previewMode={previewMode}
                            tab={tab}
                            value={item.description}
                          />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          {tab === 'en' &&
            sectionDataEn?.map((item, i) => {
              return (
                <>
                  <Grid
                    alignItems="center"
                    container
                    direction={i % 2 === 0 ? 'row-reverse' : 'row'}
                    key={i}
                    spacing={2}
                  >
                    <Grid item md={5} xs={12}>
                      <div
                        className={
                          i % 2 === 0
                            ? classes.contentImageRight
                            : classes.contentImageLeft
                        }
                        style={{ pointerEvents: 'none' }}
                      >
                        <div style={{ width: '100%' }}>
                          <Image
                            alt={dummyText.image}
                            disabled={previewMode}
                            item={item.imageUrl}
                            previewState={{
                              preview: item.imageUrl,
                              setPreview: setFile,
                            }}
                            sectionName={`Spesifications${i}`}
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <div
                        style={
                          i % 2 == 0
                            ? { marginRight: '2.5rem' }
                            : { marginLeft: '2.5rem' }
                        }
                      >
                        <div style={{ marginBottom: '10px' }}>
                          <TextField
                            control={_control}
                            disabled={previewMode}
                            fontSize="2.25rem"
                            multiline={true}
                            name={`${level}ProductSpesificationsen[${i}].title`}
                            noSpacing
                            placeholder={dummyTextEng.title}
                            position="left"
                            weight="bold"
                          />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                          <TextEditor
                            onChange={(data) => handleDescription(data, i)}
                            previewMode={previewMode}
                            tab={tab}
                            value={item.description}
                          />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          {tab === 'id' && !previewMode && sectionDataId?.length < 4 && (
            <LineButton handleClick={addSection} label="ADD SECTION" />
          )}
        </div>

        <div
          className={!isDisplayProductSpesifications && classes.disabledSection}
        />
      </div>
    );
  }

  return <></>;
};

ProductSpesifications.propTypes = {
  level: PropTypes.string,
  tab: PropTypes.string,
};

ProductSpesifications.defaultProps = {
  level: '',
  tab: '',
};

export default ProductSpesifications;
