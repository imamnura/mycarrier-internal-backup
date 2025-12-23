import React from 'react';
import PropTypes from 'prop-types';
import SectionMark from '../../SectionMark';
import { Grid } from '@material-ui/core';
import TextField from '../../components/TextFieldContent';
import useActions from './hooks/useActions';
import Image from '../../components/Image/image';
import useStyles from './styles';
import { dummyText, dummyTextEng } from '../../../constant';
import TextEditor from './component/texteditor';
import LineButton from '../../components/LineButton/lineButton';

const ProductDescription = (props) => {
  const { tab, level } = props;

  const {
    handleUploadImage,
    previewMode,
    _control,
    handleDelete,
    addSection,
    sectionDataId,
    sectionDataEn,
    handleDescription,
  } = useActions(props);

  const classes = useStyles();

  return (
    <div
      style={{
        border: previewMode ? 'none' : '2px dashed #E4E7E9',
        borderTop: 'none',
        position: 'relative',
      }}
    >
      {!previewMode && <SectionMark title="Product Description" />}

      <div
        style={{
          padding: previewMode ? '5rem 1rem' : '5rem 4rem',
          width: '100%',
          maxWidth: '1280px',
          marginInline: 'auto',
        }}
      >
        {tab === 'id' &&
          sectionDataId?.map((d, i) => {
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
                  direction={i % 2 !== 0 ? 'row' : 'row-reverse'}
                  key={i}
                  spacing={2}
                >
                  <Grid item md={5} xs={12}>
                    <div
                      className={
                        i % 2 !== 0
                          ? classes.contentImageRight
                          : classes.contentImageLeft
                      }
                    >
                      <div style={{ width: '100%' }}>
                        <Image
                          alt={dummyText.image}
                          disabled={previewMode}
                          getUpdateItem={(data) => handleUploadImage(data, i)}
                          item={d.imageUrl}
                          sectionName={`Description${i}`}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={7} xs={12}>
                    <div
                      style={
                        i % 2 !== 0
                          ? { marginLeft: '2.5rem' }
                          : { marginRight: '2.5rem' }
                      }
                    >
                      <div style={{ marginBottom: '10px' }}>
                        <TextField
                          control={_control}
                          disabled={previewMode}
                          fontSize="2.25rem"
                          multiline={true}
                          name={`${level}ProductDescriptionid[${i}].title`}
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
                          value={d.description}
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        {tab === 'en' &&
          sectionDataEn?.map((d, i) => {
            return (
              <>
                <Grid
                  alignItems="center"
                  container
                  direction={i % 2 !== 0 ? 'row' : 'row-reverse'}
                  key={i}
                  spacing={2}
                >
                  <Grid item md={5} xs={12}>
                    <div
                      className={
                        i % 2 !== 0
                          ? classes.contentImageRight
                          : classes.contentImageLeft
                      }
                      style={{ pointerEvents: 'none' }}
                    >
                      <div style={{ width: '100%' }}>
                        <Image
                          alt={dummyText.image}
                          disabled={previewMode}
                          item={d.imageUrl}
                          sectionName={`Description${i}`}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={7} xs={12}>
                    <div
                      style={
                        i % 2 !== 0
                          ? { marginLeft: '2.5rem' }
                          : { marginRight: '2.5rem' }
                      }
                    >
                      <div style={{ marginBottom: '10px' }}>
                        <TextField
                          control={_control}
                          disabled={previewMode}
                          fontSize="2.25rem"
                          multiline={true}
                          name={`${level}ProductDescriptionen[${i}].title`}
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
                          value={d.description}
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
    </div>
  );
};

ProductDescription.propTypes = {
  level: PropTypes.string,
  tab: PropTypes.string,
};

ProductDescription.defaultProps = {
  level: '',
  tab: 'id',
};

export default ProductDescription;
