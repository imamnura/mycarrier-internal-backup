import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import SectionMark from '../../components/SectionMark';
import useStyles from './styles';
import Rundown from '../../components/Rundown';
import useActions from './hooks/useActions';

const SectionRundown = (props) => {
  const {
    tab,
    display: { isDisplayRundown, setIsDisplayRundown },
    previewMode,
    useForm: { _setValue },
    isLoading,
    isLoadingDetail,
    isClickPreview,
  } = props;

  const classes = useStyles();

  const {
    starDateRange,
    onChangeRundownId,
    onChangeRundownEn,
    watchRundownid,
    watchRundownen,
    handleRange,
  } = useActions(props);

  const watchField = {
    rundownen: watchRundownen,
    rundownid: watchRundownid,
  };

  return (
    <div className={classes.root}>
      {!previewMode && (
        <SectionMark
          isDisplay={isDisplayRundown}
          nonmandatory
          onChange={() => setIsDisplayRundown(!isDisplayRundown)}
          title="Rundown"
        />
      )}

      <Grid alignItems="center" container direction="row">
        <Grid item sm={12} xs={12}>
          <div style={{ marginBottom: '1rem' }}>
            <Typography
              children="Rangkaian Acara"
              color="general-main"
              variant="h4"
              weight="medium"
            />
          </div>
          {!starDateRange[0] && !starDateRange[1] && (
            <div style={{ paddingLeft: '30px' }}>
              <Typography
                children="Tanggal otomatis terpilih.."
                color="general-general"
                variant="h5"
                weight="medium"
              />
            </div>
          )}
        </Grid>
      </Grid>

      {!isLoading && (
        <Grid container direction="column">
          <Grid item xs={12}>
            <Rundown
              isClickPreview={isClickPreview}
              isLoadingDetail={isLoadingDetail}
              onChangeDataEn={(val) => onChangeRundownEn(val)}
              onChangeDataId={(val) => onChangeRundownId(val)}
              range={starDateRange}
              setRange={(v) => handleRange(v)}
              setValue={_setValue}
              tab={tab}
              watchField={watchField}
            />
          </Grid>
        </Grid>
      )}

      <div className={!isDisplayRundown && classes.disabledSection} />
    </div>
  );
};

SectionRundown.defaultProps = {
  isClickPreview: 'false',
  tab: 'id',
};

SectionRundown.propTypes = {
  display: PropTypes.object.isRequired,
  isClickPreview: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  isLoadingDetail: PropTypes.bool.isRequired,
  previewMode: PropTypes.bool.isRequired,
  tab: PropTypes.string,
  useForm: PropTypes.object.isRequired,
};

export default SectionRundown;
