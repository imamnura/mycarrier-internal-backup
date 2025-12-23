import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, CardActions } from '@material-ui/core';
import Button from '@components/Button';
import SectionMark from '../../SectionMark';
import TextField from '../../components/TextFieldContent';
import useActions from './hooks/useActions';
import useStyles from './styles';
import Image from '../../components/Image/image';
// import ImageUpload from '../../ImageUpload';
import { dummyText, dummyTextEng } from '../../../constant';

const ProductBenefits = (props) => {
  const { tab, level, previewMode } = props;

  const {
    _control,
    control,
    formState: { isValid, isDirty },
    fieldsId,
    fieldsEn,
    handleAddBenefit,
    handleDelete,
    handleUploadImage,
    file,
    setFile,
    isDisplayProductBenefits,
    setIsDisplayProductBenefits,
  } = useActions(props);
  const classes = useStyles();

  const renderCards = () => {
    const cardsId = [];
    const cardsEn = [];

    if (tab === 'id') {
      fieldsId.forEach((data, i) => {
        cardsId.push(
          <Grid item key={data.id} md={4} xs={12}>
            <Card className={classes.card}>
              <CardContent
                style={{ padding: 0, textAlign: 'center', width: '100%' }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <img
                    alt={data.imageUrl?.mediaName}
                    src={data.imageUrl?.mediaPath}
                    style={{ width: 72, height: 72 }}
                  />
                </div>
                <div>
                  <TextField
                    control={_control}
                    disabled={previewMode}
                    fontSize="1.25rem"
                    multiline={true}
                    name={`${level}BenefitList${tab}[${i}].title`}
                    noSpacing
                    placeholder={dummyText.titleProduct}
                    position="center"
                    weight="medium"
                  />
                </div>
                <div>
                  <TextField
                    control={_control}
                    disabled={previewMode}
                    multiline={true}
                    name={`${level}BenefitList${tab}[${i}].description`}
                    noSpacing
                    placeholder={dummyText.descProduct}
                    position="center"
                  />
                </div>
              </CardContent>

              {!previewMode && (
                <div
                  className={classes.deleteIcon}
                  onClick={() => handleDelete(i)}
                >
                  &#10006;
                </div>
              )}
            </Card>
          </Grid>,
        );
      });
    } else {
      fieldsEn.forEach((data, i) => {
        cardsEn.push(
          <Grid item key={`ProductBenefits${i}`} md={4} xs={12}>
            <Card className={classes.card}>
              <CardContent
                style={{ padding: 0, textAlign: 'center', width: '100%' }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <img
                    alt={data.imageUrl?.mediaName}
                    src={data.imageUrl?.mediaPath}
                    style={{ width: 72, height: 72 }}
                  />
                </div>
                <div>
                  <TextField
                    control={_control}
                    disabled={previewMode}
                    fontSize="1.25rem"
                    multiline={true}
                    name={`${level}BenefitList${tab}[${i}].title`}
                    noSpacing
                    placeholder={dummyTextEng.titleProductBenefits}
                    position="center"
                    weight="medium"
                  />
                </div>
                <div>
                  <TextField
                    control={_control}
                    disabled={previewMode}
                    multiline={true}
                    name={`${level}BenefitList${tab}[${i}].description`}
                    noSpacing
                    placeholder={dummyTextEng.descProductBenefits}
                    position="center"
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>,
        );
      });
    }

    return (
      <>
        {tab === 'id' && cardsId.length > 0 ? cardsId : ''}
        {tab === 'en' && cardsEn.length > 0 ? cardsEn : ''}

        {!previewMode && tab === 'id' && (
          <Grid item md={4} xs={12}>
            <Card className={classes.card}>
              <CardContent style={{ padding: 0, width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <Image
                    alt={dummyText.image}
                    getUpdateItem={handleUploadImage}
                    item={file}
                    key={Date.now()}
                    previewState={{
                      preview: file,
                      setPreview: setFile,
                    }}
                    sectionName="Benefit"
                    type="icon"
                  />
                </div>

                <TextField
                  control={control}
                  fontSize="1.25rem"
                  multiline={true}
                  name={`${level}BenefitTitle${tab}`}
                  noSpacing
                  placeholder={dummyText.titleProductBenefits}
                  position="center"
                  weight="medium"
                />
                <TextField
                  control={control}
                  multiline={true}
                  name={`${level}BenefitDesc${tab}`}
                  noSpacing
                  placeholder={dummyText.descProductBenefits}
                  position="center"
                />
              </CardContent>
              <CardActions
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                }}
              >
                <Button
                  disabled={!isValid || !isDirty || !file?.mediaPath}
                  onClick={handleAddBenefit}
                  variant="filled"
                >
                  add product benefit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}

        <div className={!isDisplayProductBenefits && classes.disabledSection} />
      </>
    );
  };

  if (isDisplayProductBenefits || !previewMode) {
    return (
      <div
        style={{
          border: previewMode ? 'none' : '2px dashed #E4E7E9',
          borderTop: 'none',
          background: '#F5F5F5',
          position: 'relative',
        }}
      >
        {!previewMode && (
          <SectionMark
            isDisplay={isDisplayProductBenefits}
            nonmandatory
            onChange={() =>
              setIsDisplayProductBenefits(!isDisplayProductBenefits)
            }
            title="Product Benefits"
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
          <div style={{ marginBottom: '1rem' }}>
            <TextField
              control={_control}
              disabled={previewMode}
              fontSize="2.25rem"
              multiline={true}
              name={`${level}productDetailBenefitTitle${tab}`}
              noSpacing
              placeholder={tab === 'id' ? dummyText.title : dummyTextEng.title}
              position="center"
              weight="bold"
            />
          </div>

          <Grid className={classes.cardContainer} container spacing={5}>
            {renderCards()}
          </Grid>
        </div>
      </div>
    );
  }

  return <></>;
};

ProductBenefits.defaultProps = {
  // data: [],
  previewMode: false,
  useform: {},
};

ProductBenefits.propTypes = {
  // data: PropTypes.array,
  level: PropTypes.string.isRequired,
  previewMode: PropTypes.bool,
  tab: PropTypes.string.isRequired,
  useform: PropTypes.object,
};

export default ProductBenefits;
