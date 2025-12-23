import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Select } from '@components/FormField';
import Calendar from '@assets/Svg/Calendar';
import DateRangePicker from '@components/DateRangePicker';
import Typography from '@components/Typography';
import SectionMark from '../../components/SectionMark';
import TextFieldContent from '../../components/TextFieldContent';
import { TextField } from '@components/FormField';
import {
  dummyText,
  dummyTextEng,
  optionsEventType,
} from '@containers/ContentManagement/Events/Add-v2/constant';
import useActions from './hooks/useActions';
import useStyles from './styles';
import { dateFormat } from '@utils/parser';

const EventDetails = (props) => {
  const {
    tab,
    previewMode,
    useForm: { _control },
  } = props;
  const classes = useStyles();

  const {
    getStartDate,
    getEndDate,
    handleChangeDate,
    getStartTimeRundown,
    getEndTimeRundown,
  } = useActions(props);

  const endTimeRundown = dateFormat({ date: getEndTimeRundown, type: 'time' });

  return (
    <div className={classes.root} style={{ paddingBottom: 0 }}>
      {!previewMode && <SectionMark title="Event Details" />}

      <Grid alignItems="center" container direction="row">
        <div className={classes.wrapper}>
          <Typography
            children="Event"
            className={classes.card}
            color="blue-main"
            variant="caption"
            weight="bold"
          />
          <Calendar />
          <DateRangePicker
            disabled={tab === 'en' ? true : false}
            inputFormat={'DD MMMM YYYY'}
            label="Pilih tanggal event.."
            name="eventDate"
            onChange={handleChangeDate}
            value={[getStartDate, getEndDate]}
          />
          {getStartDate === getEndDate &&
            getStartTimeRundown &&
            getEndTimeRundown && (
              <>
                <Typography children="-" style={{ marginRight: '10px' }} />
                <Typography
                  children={
                    getStartTimeRundown + ' - ' + endTimeRundown + ' WIB '
                  }
                />
              </>
            )}
        </div>
      </Grid>

      <Grid container direction="column">
        <Grid item sm={6} xs={12}>
          <div style={{ marginBottom: '10px' }}>
            {tab === 'id' ? (
              <TextFieldContent
                control={_control}
                fontSize="24px"
                multiline={true}
                name="titleid"
                noSpacing
                placeholder={dummyText.title}
                weight="medium"
              />
            ) : (
              <TextFieldContent
                control={_control}
                fontSize="24px"
                multiline={true}
                name="titleen"
                noSpacing
                placeholder={dummyTextEng.title}
                weight="medium"
              />
            )}
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div style={{ marginBottom: '10px' }}>
            {tab === 'id' ? (
              <TextField
                control={_control}
                fontSize="24px"
                label={dummyText.slug}
                maxLength={40}
                minRows={1}
                multiline={true}
                name={`slugid`}
                required
              />
            ) : (
              <TextField
                control={_control}
                fontSize="24px"
                label={dummyTextEng.slug}
                maxLength={40}
                minRows={1}
                multiline={true}
                name={`slugen`}
                required
              />
            )}
          </div>
        </Grid>
        <Grid item sm={10} xs={12}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={classes.cardLocation}>
              <TextFieldContent
                colorInput="#78858B"
                colorPlaceholder="#78858B"
                control={_control}
                disabled={tab === 'id' ? false : true}
                fontSize="1rem"
                multiline={true}
                name="location"
                noSpacing
                placeholder="Ketik lokasi.."
                weight="medium"
              />
            </div>
            <div style={{ display: 'flex', zIndex: '3', paddingTop: '15px' }}>
              <Select
                control={_control}
                isDisabled={tab === 'id' ? false : true}
                isMulti={false}
                name="typeLocation"
                options={optionsEventType}
                placeholder="Choose Type"
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

EventDetails.defaultProps = {
  tab: 'id',
};

EventDetails.propTypes = {
  previewMode: PropTypes.bool.isRequired,
  tab: PropTypes.string,
  useForm: PropTypes.object.isRequired,
};

export default EventDetails;
