import React from 'react';
import PropTypes from 'prop-types';
import SectionMark from '../../SectionMark';
import { Box, Grid, CardActions } from '@material-ui/core';
import Button from '@components/Button';
import Image from '../../components/Image/image';
import TextField from '../../components/TextFieldContent';
import useActions from './hooks/useActions';
import useStyles from './styles';
import { dummyText, dummyTextEng } from '../../../constant';

export default function ServiceLevel(props) {
  const { tab, previewMode, level } = props;
  const {
    _control,
    control,
    formState: { isValid, isDirty },
    fieldsId,
    fieldsEn,
    handleAddType,
    handleDelete,
    handleUploadImage,
    file,
    setFile,
    isDisplayProductGuarantee,
    setIsDisplayProductGuarantee,
  } = useActions(props);
  const classes = useStyles();

  const renderCards = () => {
    const cardsId = [];
    const cardsEn = [];

    if (tab === 'id') {
      fieldsId.forEach((data, i) => {
        cardsId.push(
          <Grid
            alignItems="center"
            container
            item
            key={data.id}
            lg={4}
            md={6}
            xs={12}
          >
            <Grid className={classes.cardPreview} container>
              <Grid item md={3} xs={3}>
                <img
                  alt={data.imageUrl?.mediaName}
                  className={classes.image}
                  src={data.imageUrl?.mediaPath}
                />
              </Grid>
              <Grid item md={9} xs={9}>
                <div style={{ marginTop: '14px' }}>
                  <TextField
                    control={_control}
                    disabled={previewMode}
                    fontSize="1rem"
                    multiline={true}
                    name={`${level}GuaranteeList${tab}[${i}].title`}
                    noSpacing
                    placeholder={dummyText.titleProduct}
                    weight="medium"
                  />
                </div>
                <div>
                  <TextField
                    control={_control}
                    disabled={previewMode}
                    fontSize="1.5rem"
                    multiline={true}
                    name={`${level}GuaranteeList${tab}[${i}].caption`}
                    noSpacing
                    placeholder={dummyText.caption}
                    weight="bold"
                  />
                </div>
              </Grid>
              {!previewMode && (
                <div
                  className={classes.deleteIcon}
                  onClick={() => handleDelete(i)}
                >
                  &#10006;
                </div>
              )}
            </Grid>
          </Grid>,
        );
      });
    } else {
      fieldsEn.forEach((data, i) => {
        cardsEn.push(
          <Grid
            alignItems="center"
            container
            item
            key={data.id}
            lg={4}
            md={6}
            xs={12}
          >
            <Grid className={classes.cardPreview} container>
              <Grid item md={3} xs={3}>
                <img
                  alt={data.imageUrl?.mediaName}
                  className={classes.image}
                  src={data.imageUrl?.mediaPath}
                />
              </Grid>
              <Grid item md={9} xs={9}>
                <div style={{ marginTop: '14px' }}>
                  <TextField
                    control={_control}
                    disabled={previewMode}
                    fontSize="1rem"
                    multiline={true}
                    name={`${level}GuaranteeList${tab}[${i}].title`}
                    noSpacing
                    placeholder={dummyTextEng.titleProduct}
                    weight="medium"
                  />
                </div>
                <div>
                  <TextField
                    control={_control}
                    disabled={previewMode}
                    fontSize="1.5rem"
                    multiline={true}
                    name={`${level}GuaranteeList${tab}[${i}].caption`}
                    noSpacing
                    placeholder={dummyTextEng.caption}
                    weight="bold"
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>,
        );
      });
    }

    return (
      <Grid
        className={classes.cardContainer}
        container
        item
        justifyContent="center"
        md={12}
        spacing={3}
      >
        {tab === 'id' && cardsId.length > 0 ? cardsId : ''}
        {tab === 'en' && cardsEn.length > 0 ? cardsEn : ''}
        {tab === 'id' && !previewMode && (
          <Grid container item lg={4} md={6} xs={12}>
            <Box className={classes.card}>
              <Grid item md={3} xs={12}>
                <Image
                  alt={dummyText.image}
                  getUpdateItem={handleUploadImage}
                  isValidateByPixel={true}
                  item={file}
                  key={Date.now()}
                  previewState={{
                    preview: file,
                    setPreview: setFile,
                  }}
                  ratioPixel={[32, 32]}
                  sectionName="ServiceLevel"
                  type="small"
                />
              </Grid>
              <Grid item md={9} style={{ width: '150px' }} xs={12}>
                <TextField
                  control={control}
                  fontSize="1rem"
                  name={`${level}GuaranteeTitleCard${tab}`}
                  placeholder={dummyText.titleCard}
                  weight="medium"
                />
                <TextField
                  control={control}
                  fontSize="1.5rem"
                  name={`${level}GuaranteeCaption${tab}`}
                  noSpacing
                  placeholder={dummyText.caption}
                  weight="bold"
                />
              </Grid>
              <CardActions
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                }}
              >
                <Button
                  disabled={!file || !isValid || !isDirty}
                  onClick={handleAddType}
                  variant="filled"
                >
                  Add SLG
                </Button>
              </CardActions>
            </Box>
          </Grid>
        )}
      </Grid>
    );
  };

  if (isDisplayProductGuarantee || !previewMode) {
    return (
      <Box
        className={!previewMode && classes.wrapper}
        style={{ position: 'relative' }}
      >
        {!previewMode && (
          <SectionMark
            isDisplay={isDisplayProductGuarantee}
            nonmandatory
            onChange={() =>
              setIsDisplayProductGuarantee(!isDisplayProductGuarantee)
            }
            title="Service Level Guarantee"
          />
        )}

        <Box
          px={8}
          py={4}
          sx={{
            padding: previewMode ? '5rem 1rem' : '4rem 4rem 2rem',
            width: '100%',
            maxWidth: '1280px',
            marginInline: 'auto',
          }}
        >
          <TextField
            control={_control}
            disabled={previewMode}
            fontSize="2.25rem"
            multiline={true}
            name={`${level}GuaranteeTitle${tab}`}
            placeholder={tab === 'id' ? dummyText.title : dummyTextEng.title}
            position="center"
            weight="bold"
          />
          {renderCards()}
        </Box>

        <div
          className={!isDisplayProductGuarantee && classes.disabledSection}
        />
      </Box>
    );
  }

  return <></>;
}

ServiceLevel.defaultProps = {
  previewMode: false,
  tab: 'id',
};

ServiceLevel.propTypes = {
  level: PropTypes.string.isRequired,
  previewMode: PropTypes.bool,
  tab: PropTypes.string,
};
