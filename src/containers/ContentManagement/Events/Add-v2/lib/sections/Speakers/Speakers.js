import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Clear } from '@material-ui/icons';
import { Grid, Card, CardContent, CardActions } from '@material-ui/core';
import TextField from '../../components/TextFieldContent';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Image from '../../components/Image/image';
import SectionMark from '../../components/SectionMark';
import useActions from './hooks/useActions';
import useStyles from './styles';

const Speakers = (props) => {
  const {
    previewMode,
    display: { isDisplaySpeakers, setIsDisplaySpeakers },
    tab,
  } = props;
  const {
    formState,
    control,
    _control,
    fields,
    remove,
    file,
    handleAddFile,
    handleAddSpeaker,
    handleUpdateImage,
  } = useActions(props);
  const classes = useStyles(previewMode);

  const renderCards = () => {
    const cards = [];

    fields.forEach((v, i) => {
      cards.push(
        <Grid className={classes.cardGrid} item>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <div className={classes.imageContainer}>
                <Image
                  alt={''}
                  getUpdateItem={(data) => handleUpdateImage(i, data)}
                  item={v.imageUrl}
                  key={Date.now()}
                  sectionName={`Speaker${i}`}
                  type="stretch"
                  wordingImage="Upload .png/.jpg image, max 300 KB and size 214 x 169 px"
                  wordingVariant="caption"
                />
              </div>

              <div className={classes.cardFields}>
                <div>
                  <TextField
                    control={_control}
                    fontSize="1rem"
                    multiline={true}
                    name={`speakers[${i}].name`}
                    noSpacing
                    placeholder="Ketik nama speaker"
                    weight="medium"
                  />
                </div>
                <div>
                  <TextField
                    control={_control}
                    multiline={true}
                    name={`speakers[${i}].position`}
                    noSpacing
                    placeholder="Ketik jabatan speaker"
                  />
                </div>
              </div>
            </CardContent>

            {tab !== 'en' && (
              <Clear className={classes.deleteIcon} onClick={() => remove(i)} />
            )}
          </Card>
        </Grid>,
      );
    });

    return (
      <>
        {cards}

        {tab !== 'en' && fields.length !== 4 && (
          <Grid
            className={clsx(classes.addCardContainer, classes.cardGrid)}
            item
          >
            <Card className={clsx(classes.card, classes.dashedBorder)}>
              <CardContent className={classes.cardContent}>
                <div className={classes.imageContainer}>
                  <Image
                    alt={''}
                    getUpdateItem={handleAddFile}
                    isValidateByPixel={true}
                    item={file}
                    key={Date.now()}
                    maxSize={307200} //300 Kb = 300x1024
                    ratioPixel={[214, 169]}
                    sectionName="Speaker"
                    type="stretch"
                    wordingImage="Upload .png/.jpg image, max 300 KB and size 214 x 169 px"
                    wordingVariant="caption"
                  />
                </div>

                <div className={classes.cardFields}>
                  <div>
                    <TextField
                      control={control}
                      fontSize="1rem"
                      multiline={true}
                      name="speakerName"
                      noSpacing
                      placeholder="Ketik nama speaker"
                      weight="medium"
                    />
                  </div>
                  <div>
                    <TextField
                      control={control}
                      multiline={true}
                      name="speakerPosition"
                      noSpacing
                      placeholder="Ketik jabatan speaker"
                    />
                  </div>
                </div>
              </CardContent>
              <CardActions className={classes.addCardButton}>
                <Button
                  children="add speaker"
                  disabled={!formState.isValid || !file}
                  onClick={handleAddSpeaker}
                  style={{ width: '100%' }}
                />
              </CardActions>
            </Card>
          </Grid>
        )}
      </>
    );
  };

  return (
    <div className={classes.root}>
      {!previewMode && (
        <SectionMark
          isDisplay={isDisplaySpeakers}
          nonmandatory
          onChange={() => setIsDisplaySpeakers(!isDisplaySpeakers)}
          title="Speakers"
        />
      )}

      <Grid container direction="column" spacing={2}>
        <Grid item sm={5} xs={12}>
          <div>
            <Typography color="general-main" variant="h4" weight="medium">
              Pembicara
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Grid className={classes.cardsContainer} container spacing={1}>
            {renderCards()}
          </Grid>
        </Grid>
      </Grid>

      <div className={!isDisplaySpeakers && classes.disabledSection} />
    </div>
  );
};

Speakers.defaultProps = {
  tab: 'id',
};

Speakers.propTypes = {
  display: PropTypes.object.isRequired,
  previewMode: PropTypes.bool.isRequired,
  tab: PropTypes.string,
  useForm: PropTypes.object.isRequired,
};

export default Speakers;
