import React from 'react';
import PropTypes from 'prop-types';
import Text from '@__old/components/elements/Text';
import SearchBox from '@__old/components/elements/SearchBoxAutocomplete';
import NoData from '@assets/Svg/NoData';

const Component = (props) => {
  const {
    classes,
    handleGetValueAM,
    handleTypeSearchProfil,
    labelProfile,
    loadingAMProfile,
    optionsAMProfile,
    profile,
    typeProfil,
  } = props;

  const contentEmpty = Object.keys(profile).length < 1 && (
    <div className={classes.emptyData}>
      <NoData />
      <div className={classes.emptyContainer}>
        <Text variant="h5">Search your data with specific keyword.</Text>
      </div>
    </div>
  );

  const contentProfile = profile.metaData && (
    <>
      <div className={classes.content}>
        <div className={classes.item}>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> Name </Text>
            <Text variant="subtitle1Bold">
              {profile.metaData.fullName || '-'}
            </Text>
          </div>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> Segment </Text>
            <Text variant="subtitle1Bold">
              {profile.metaData.segment || '-'}
            </Text>
          </div>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> Position </Text>
            <Text variant="subtitle1Bold">
              {profile.metaData.jobTitle || '-'}
            </Text>
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> NIK </Text>
            <Text variant="subtitle1Bold">{profile.metaData.nik || '-'}</Text>
          </div>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> GM Segment </Text>
            <Text variant="subtitle1Bold">
              {profile.metaData.atasan.nama || '-'}
            </Text>
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.item}>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> Contact Number </Text>
            <Text variant="subtitle1Bold">
              {profile.metaData.phoneNumber || '-'}
            </Text>
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> Email </Text>
            <Text variant="subtitle1Bold">{profile.metaData.email || '-'}</Text>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className={classes.subtitle}>
        <Text color="grey" variant="h4">
          Input AM Profile
        </Text>
      </div>
      <div className={classes.searchWrapper}>
        <SearchBox
          disabled={loadingAMProfile}
          getValue={handleGetValueAM}
          label={labelProfile}
          options={optionsAMProfile}
          placeholder={
            loadingAMProfile ? 'Loading AM Profile..' : 'Search AM Profile'
          }
        />
        <Text className={classes.labelContainer} variant="status">
          {' '}
          Search by
          <span
            className={
              typeProfil === 'name' ? classes.labelActive : classes.label
            }
            id="toogleSearchProfileByName"
            onClick={() => handleTypeSearchProfil('name')}
          >
            Name
          </span>
          <span
            className={
              typeProfil === 'nik' ? classes.labelActive : classes.label
            }
            id="toogleSearchProfileByNik"
            onClick={() => handleTypeSearchProfil('nik')}
          >
            NIK
          </span>
        </Text>
      </div>
      <>
        {contentEmpty}
        {contentProfile}
      </>
    </>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  handleGetValueAM: PropTypes.func.isRequired,
  handleTypeSearchProfil: PropTypes.func.isRequired,
  labelProfile: PropTypes.string.isRequired,
  loadingAMProfile: PropTypes.bool.isRequired,
  optionsAMProfile: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  typeProfil: PropTypes.string.isRequired,
};

export default Component;
