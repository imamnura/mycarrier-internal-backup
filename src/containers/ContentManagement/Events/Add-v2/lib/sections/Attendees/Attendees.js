import React from 'react';
import PropTypes from 'prop-types';
import { Clear } from '@material-ui/icons';
import { Box, Grid } from '@material-ui/core';
import TextField from '../../components/TextFieldContent';
import Button from '@components/Button';
import Typography from '@components/Typography';
import SectionMark from '../../components/SectionMark';
import useActions from './hooks/useActions';
import useStyles from './styles';

const Attendees = (props) => {
  const {
    previewMode,
    display: { isDisplayAttendees, setIsDisplayAttendees },
    useForm: { _watch },
    tab,
    initialValueAttendees,
  } = props;

  const {
    // _getValues,
    formState,
    control,
    handleAddAttendee,
    handleDeleteAttendee,
    valueAttendees,
  } = useActions(props);

  const classes = useStyles(previewMode);

  const itemAttendees = _watch('attendees') || initialValueAttendees;

  return (
    <div className={classes.root}>
      {!previewMode && (
        <SectionMark
          isDisplay={isDisplayAttendees}
          nonmandatory
          onChange={() => setIsDisplayAttendees(!isDisplayAttendees)}
          title="Attendees"
        />
      )}

      <Grid container direction="column" spacing={2}>
        <Grid item sm={5} xs={12}>
          <div>
            <Typography color="general-main" variant="h4" weight="medium">
              Siapa yang Harus Hadir?
            </Typography>
          </div>
        </Grid>

        {valueAttendees.length !== 8 && tab !== 'en' && (
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <Box className={classes.fieldContainer} mb={3}>
              <TextField
                control={control}
                fontSize="1.25rem"
                name="attendee"
                noSpacing
                placeholder="Ketik jabatan peserta"
                weight="medium"
              />

              <Button
                children="add attendee"
                className={classes.addButton}
                disabled={!formState.isValid}
                onClick={handleAddAttendee}
              />
            </Box>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {itemAttendees.length > 0 &&
              itemAttendees.map((v, i) => (
                <Grid item key={`product-${i}-${v}`}>
                  <div className={classes.itemContainer}>
                    <Typography
                      className={classes.itemsLabel}
                      color="general-main"
                      variant="h5"
                      weight="medium"
                    >
                      {v}
                    </Typography>

                    {tab !== 'en' && (
                      <Clear
                        className={classes.deleteIcon}
                        onClick={() => handleDeleteAttendee(i)}
                      />
                    )}
                  </div>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>

      <div className={!isDisplayAttendees && classes.disabledSection} />
    </div>
  );
};

Attendees.defaultProps = {
  initialValueAttendees: [],
  tab: 'id',
};

Attendees.propTypes = {
  display: PropTypes.object.isRequired,
  initialValueAttendees: PropTypes.array,
  previewMode: PropTypes.bool.isRequired,
  tab: PropTypes.string,
  useForm: PropTypes.object.isRequired,
};

export default Attendees;
