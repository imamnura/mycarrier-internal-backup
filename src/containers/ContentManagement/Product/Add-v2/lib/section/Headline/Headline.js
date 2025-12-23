import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import SectionMark from '../../SectionMark';
import TextField from '../../components/TextFieldContent';
import { dummyText, dummyTextEng } from '../../../constant';
import useActions from './hooks/useActions';
import useStyles from './styles';

const Headline = (props) => {
  const { tab, previewMode, stepName } = props;
  const { _control } = useActions(props);
  const classes = useStyles(previewMode);

  const renderContent = () => {
    if (stepName === 'L0 - Content Page') {
      if (tab === 'id') {
        return (
          <>
            <Grid item md={5} sm={5} xs={12}>
              <div className={classes.mTitle}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="2.25rem"
                  multiline={true}
                  name={`l0HeadlineTitleid`}
                  placeholder={dummyText.title}
                  position="left"
                  weight="bold"
                />
              </div>
            </Grid>
            <Grid item md={7} sm={7} xs={12}>
              <div className={classes.mDesc}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="1rem"
                  minRows={2}
                  multiline={true}
                  name={`l0HeadlineDescid`}
                  placeholder={dummyText.description}
                  position="left"
                  weight="normal"
                />
              </div>
            </Grid>
          </>
        );
      }

      if (tab === 'en') {
        return (
          <>
            <Grid item md={5} sm={5} xs={12}>
              <div className={classes.mTitle}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="2.25rem"
                  multiline={true}
                  name={`l0HeadlineTitleen`}
                  placeholder={dummyTextEng.title}
                  position="left"
                  weight="bold"
                />
              </div>
            </Grid>
            <Grid item md={7} sm={7} xs={12}>
              <div className={classes.mDesc}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="1rem"
                  minRows={2}
                  multiline={true}
                  name={`l0HeadlineDescen`}
                  placeholder={dummyTextEng.description}
                  position="left"
                  weight="normal"
                />
              </div>
            </Grid>
          </>
        );
      }
    }

    if (stepName === 'L1 - Content Page') {
      if (tab === 'id') {
        return (
          <>
            <Grid item md={5} sm={5} xs={12}>
              <div className={classes.mTitle}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="2.25rem"
                  multiline={true}
                  name={`l1HeadlineTitleid`}
                  placeholder={dummyText.title}
                  position="left"
                  weight="bold"
                />
              </div>
            </Grid>
            <Grid item md={7} sm={7} xs={12}>
              <div className={classes.mDesc}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="1rem"
                  minRows={2}
                  multiline={true}
                  name={`l1HeadlineDescid`}
                  placeholder={dummyText.description}
                  position="left"
                  weight="normal"
                />
              </div>
            </Grid>
          </>
        );
      }

      if (tab === 'en') {
        return (
          <>
            <Grid item md={5} sm={5} xs={12}>
              <div className={classes.mTitle}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="2.25rem"
                  multiline={true}
                  name={`l1HeadlineTitleen`}
                  placeholder={dummyTextEng.title}
                  position="left"
                  weight="bold"
                />
              </div>
            </Grid>
            <Grid item md={7} sm={7} xs={12}>
              <div className={classes.mDesc}>
                <TextField
                  control={_control}
                  disabled={previewMode}
                  fontSize="1rem"
                  minRows={2}
                  multiline={true}
                  name={`l1HeadlineDescen`}
                  placeholder={dummyTextEng.description}
                  position="left"
                  weight="normal"
                />
              </div>
            </Grid>
          </>
        );
      }
    }
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.borderSection]: !previewMode,
      })}
    >
      {!previewMode && <SectionMark title="Headline" />}

      <Grid className={classes.content} container>
        {renderContent()}
      </Grid>
    </div>
  );
};

Headline.defaultProps = {
  previewMode: false,
  stepName: '',
  tab: 'id',
};

Headline.propTypes = {
  previewMode: PropTypes.bool,
  stepName: PropTypes.string,
  tab: PropTypes.string,
};

export default Headline;
