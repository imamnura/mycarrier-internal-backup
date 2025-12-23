import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Clear } from '@material-ui/icons';
import { Grid, Card, CardContent, CardActions } from '@material-ui/core';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Image from '../../components/Image/image';
import SectionMark from '../../components/SectionMark';
import useActions from './hooks/useActions';
import useStyles from './styles';

const Sponsor = (props) => {
  const {
    previewMode,
    display: { isDisplaySponsor, setIsDisplaySponsor },
    tab,
  } = props;
  const {
    fields,
    remove,
    file,
    handleAddSponsor,
    handleAddFile,
    handleUpdateImage,
  } = useActions(props);
  const classes = useStyles(previewMode);

  const renderCards = () => {
    const cards = [];

    fields.forEach((v, i) => {
      cards.push(
        <Grid className={classes.cardGrid} item>
          <Card className={classes.card}>
            <CardContent
              className={clsx(classes.cardContent, classes.cardList)}
            >
              <div className={classes.imageContainer}>
                <Image
                  alt={`${v.mediaId}-${i}`}
                  getUpdateItem={(data) => handleUpdateImage(i, data)}
                  item={v}
                  key={Date.now()}
                  sectionName={`Sponsor${i}`}
                  type="stretch"
                  wordingImage="Upload .png/.jpg image, max 300 KB and size 204 x 120 px"
                  wordingVariant="caption"
                />
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

        {tab !== 'en' && (
          <Grid
            className={clsx(classes.addCardContainer, classes.cardGrid)}
            item
          >
            <Card className={clsx(classes.card, classes.dashedBorder)}>
              <CardContent className={classes.cardContent}>
                <div
                  className={classes.imageContainer}
                  style={{ marginBottom: '1rem' }}
                >
                  <Image
                    alt={'sponsor'}
                    getUpdateItem={(data) => handleAddFile(data)}
                    isValidateByPixel={true}
                    item={file}
                    key={Date.now()}
                    maxSize={307200} //300 Kb = 300x1024
                    ratioPixel={[204, 120]}
                    sectionName="Sponsor"
                    type="stretch"
                    wordingImage="Upload .png/.jpg image, max 300 KB and size 204 x 120 px"
                    wordingVariant="caption"
                  />
                </div>
              </CardContent>

              <CardActions className={classes.addCardButton}>
                <Button
                  disabled={!file}
                  onClick={handleAddSponsor}
                  style={{ width: '100%' }}
                  variant="filled"
                >
                  add sponsor
                </Button>
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
          isDisplay={isDisplaySponsor}
          nonmandatory
          onChange={() => setIsDisplaySponsor(!isDisplaySponsor)}
          title="Sponsor"
        />
      )}

      <Grid container direction="column" spacing={2}>
        <Grid item sm={5} xs={12}>
          <div>
            <Typography color="general-main" variant="h4" weight="medium">
              Sponsor
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Grid className={classes.cardsContainer} container spacing={1}>
            {renderCards()}
          </Grid>
        </Grid>
      </Grid>

      <div className={!isDisplaySponsor && classes.disabledSection} />
    </div>
  );
};

Sponsor.defaultProps = {
  tab: 'id',
};

Sponsor.propTypes = {
  display: PropTypes.object.isRequired,
  previewMode: PropTypes.bool.isRequired,
  tab: PropTypes.string,
  useForm: PropTypes.object.isRequired,
};

export default Sponsor;
