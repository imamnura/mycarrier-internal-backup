import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, CardActions } from '@material-ui/core';
import Button from '@components/Button';
import SectionMark from '../../SectionMark';
import TextField from '../../components/TextFieldContent';
import useStyles from './styles';
import { dummyText, dummyTextEng } from '../../../constant';
import useActions from './hooks/useActions';

const ProductTypes = (props) => {
  const { tab, level, previewMode } = props;

  const {
    _control,
    control,
    _getValues,
    formState: { isValid, isDirty },
    fieldsId,
    fieldsEn,
    handleAddType,
    handleDelete,
    isDisplayProductType,
    setIsDisplayProductType,
  } = useActions(props);

  const classes = useStyles();

  const renderCards = () => {
    const cardsId = [];
    const cardsEn = [];

    if (tab === 'id') {
      fieldsId.forEach((data, i) => {
        cardsId.push(
          <Grid item key={data.id} md={5} xs={12}>
            <Card className={classes.card}>
              <div style={{ width: 61, display: 'flex' }}>
                <div className={classes.number}>{i + 1}</div>
              </div>
              <CardContent
                style={{
                  width: 'calc(100% - 61px)',
                  paddingLeft: 0,
                  paddingTop: 8,
                }}
              >
                {previewMode &&
                Boolean(!_getValues(`l2TypeListid[${i}].title`)) ? (
                  ''
                ) : (
                  <div>
                    <TextField
                      control={_control}
                      disabled={previewMode}
                      multiline={true}
                      name={`l2TypeListid[${i}].title`}
                      placeholder={dummyText.titleProduct}
                      weight="bold"
                    />
                  </div>
                )}
                <div>
                  <TextField
                    control={_control}
                    disabled={previewMode}
                    multiline={true}
                    name={`l2TypeListid[${i}].description`}
                    noSpacing={
                      previewMode &&
                      Boolean(!_getValues(`l2TypeListid[${i}].title`))
                        ? false
                        : true
                    }
                    placeholder={dummyText.descProduct}
                    weight="medium"
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
          <Grid item key={data.id} md={5} xs={12}>
            <Card className={classes.card}>
              <div style={{ width: 61, display: 'flex' }}>
                <div className={classes.number}>{i + 1}</div>
              </div>
              <CardContent
                style={{
                  width: 'calc(100% - 61px)',
                  paddingLeft: 0,
                  paddingTop: 8,
                }}
              >
                {previewMode &&
                Boolean(!_getValues(`l2TypeListen[${i}].title`)) ? (
                  ''
                ) : (
                  <div>
                    <TextField
                      control={_control}
                      disabled={previewMode}
                      multiline={true}
                      name={`l2TypeListen[${i}].title`}
                      placeholder={dummyTextEng.titleProduct}
                      weight="bold"
                    />
                  </div>
                )}
                <div>
                  <TextField
                    control={_control}
                    disabled={previewMode}
                    multiline={true}
                    name={`l2TypeListen[${i}].description`}
                    noSpacing={
                      previewMode &&
                      Boolean(!_getValues(`l2TypeListen[${i}].title`))
                        ? false
                        : true
                    }
                    placeholder={dummyTextEng.descProduct}
                    weight="medium"
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
          <Grid item md={5} xs={12}>
            <Card className={classes.card}>
              <div style={{ width: 61, display: 'flex' }}>
                <div className={classes.number}>...</div>
              </div>
              <CardContent
                style={{
                  width: 'calc(100% - 61px)',
                  paddingLeft: 0,
                  paddingTop: 8,
                }}
              >
                <TextField
                  control={control}
                  multiline
                  name={`${level}TypeTitle${tab}`}
                  placeholder={dummyText.titleProduct}
                  weight="bold"
                />
                <TextField
                  control={control}
                  multiline
                  name={`${level}TypeDesc${tab}`}
                  noSpacing
                  placeholder={dummyText.descProduct}
                />
              </CardContent>
              {tab === 'id' && (
                <CardActions
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translate(-50%, 50%)',
                  }}
                >
                  <Button
                    disabled={!isValid || !isDirty}
                    onClick={handleAddType}
                    variant="filled"
                  >
                    add product type
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        )}
      </>
    );
  };

  if (isDisplayProductType || !previewMode) {
    return (
      <div
        className={classes.root}
        style={{
          border: previewMode ? 'none' : '2px dashed #E4E7E9',
          borderTop: 'none',
          position: 'relative',
        }}
      >
        {!previewMode && (
          <SectionMark
            isDisplay={isDisplayProductType}
            nonmandatory
            onChange={() => setIsDisplayProductType(!isDisplayProductType)}
            title="Product Types"
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
          <div style={{ marginBottom: '2rem' }}>
            <TextField
              control={_control}
              disabled={previewMode}
              fontSize="2.25rem"
              multiline={true}
              name={`${level}productDetailTypeTitle${tab}`}
              noSpacing
              placeholder={tab === 'id' ? dummyText.title : dummyTextEng.title}
              position="center"
              weight="bold"
            />
            {previewMode &&
            Boolean(!_getValues(`${level}productDetailTypeDesc${tab}`)) ? (
              ''
            ) : (
              <TextField
                control={_control}
                disabled={previewMode}
                multiline={true}
                name={`${level}productDetailTypeDesc${tab}`}
                placeholder={
                  tab === 'id'
                    ? dummyText.description
                    : dummyTextEng.description
                }
                position="center"
              />
            )}
          </div>

          <Grid className={classes.cardContainer} container spacing={5}>
            {renderCards()}
          </Grid>
        </div>

        <div className={!isDisplayProductType && classes.disabledSection} />
      </div>
    );
  }

  return <></>;
};

ProductTypes.defaultProps = {
  previewMode: false,
  useform: {},
};

ProductTypes.propTypes = {
  level: PropTypes.string.isRequired,
  previewMode: PropTypes.bool,
  tab: PropTypes.string.isRequired,
  useform: PropTypes.object,
};

export default ProductTypes;
