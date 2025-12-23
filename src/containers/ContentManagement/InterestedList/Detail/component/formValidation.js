/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getListAM,
  getListCompany,
  checkAmValidSc,
} from '../../_repositories/repositories';
import Text from '@__old/components/elements/Text';
import SearchBox from '@__old/components/elements/SearchBoxAutocomplete';
import Dropdown from '@__old/components/elements/Dropdown';
import SendEmail from '@__old/components/forms/SendEmailAmMapping';
import CallbackAlert from '@__old/components/elements/CallbackAlert';
import AMProfile from './profile';
import Checkbox from '@components/Checkbox';
import TextField from '@components/TextField';

const Component = (props) => {
  const {
    classes,
    data,
    formValidation,
    loading,
    salesAssigned,
    selectedCompanyName,
    selectedCompanyNum,
    setDisableBtnSubmitEmail,
    setEmailAssigned,
    setNameAssigned,
    setNumberAssigned,
    setSelectedCompanyName,
    setSelectedCompanyNum,
    setSelectedPreAccount,
    ScIntegrationStatus,
    isNetworkConnectivity,

    // for testing
    initOptionsCompany,
    initLabelProfile,
    initLoadingListCompany,
    initLoadingListSales,
    initToggleProfile,
    initTypeProfil,
  } = props;

  const {
    query: { id },
  } = useRouter();
  const companyNameUser = data?.companyDetail?.companyName;

  const [valueCompany, setValueCompany] = useState(null);
  const [listCardCompany, setListCardCompany] = useState(null);
  const [loadingListSales, setLoadingListSales] =
    useState(initLoadingListSales);
  const [loadingListCompany, setLoadingListCompany] = useState(
    initLoadingListCompany,
  );
  const [loadingValidateAM, setLoadingValidateAM] = useState(
    initLoadingListCompany,
  );
  const [loadingCard, setLoadingCard] = useState(false);
  const [profile, setProfile] = useState([]);
  const [labelProfile, setLabelProfile] = useState(initLabelProfile);
  const [typeProfil, setTypeProfil] = useState(initTypeProfil);
  const [toggleProfile, setToggleProfile] = useState(initToggleProfile);
  const [optionsAM, setOptionsAM] = useState([]);
  const [optionsCompany, setOptionsCompany] = useState(initOptionsCompany);
  const [isCompanyNull, setIsCompanyNull] = useState(false);
  const [alert, setAlert] = useState({
    content: '',
    success: true,
  });
  const [isCompanyRegistered, setIsCompanyRegistered] = useState(false);
  const [companyRegisteredAccntNum, setCompanyRegisteredAccntNum] =
    useState('');
  const [checked, setChecked] = useState(false);

  const { setFailedAlert } = usePopupAlert();

  const fetchListAM = async () => {
    setLoadingListSales(true);
    try {
      const result = await getListAM({ isNetworkConnectivity });
      // const resultUserStarclick = await getListUserStarclick();
      if (result) {
        const { data } = result;
        let reshapeData = [];
        // let reshapeDataUserStarclick = [];
        data.map((item) => {
          reshapeData.push({ ...item, fullName: item.fullName });
        });
        // resultUserStarclick?.data.map(item => {
        //   reshapeDataUserStarclick.push({ ...item, fullName: item.name });
        // });
        // const allListAM = [...reshapeData, ...reshapeDataUserStarclick];
        setOptionsAM(reshapeData);
        setLoadingListSales(false);
      }
    } catch (err) {
      setFailedAlert({
        message: 'Failed to get list sales',
      });
      setLoadingListSales(false);
    }
  };

  const fetchListAllCompany = async () => {
    // const payload = {
    //   page: 1,
    //   size: 1000,
    //   segment: 'mycarrier',
    // };

    // const params = cleanObject(payload);

    setLoadingListCompany(true);
    try {
      const result = await getListCompany();
      // const result = await getListCompany({ params });
      const { data } = result;
      if (data) {
        const reMapData = result.data.map((item) => ({
          value: item.custAccntName,
          label: `${item.custAccntName} (${
            item.custAccntNum === '-' ? item.account_id : item.custAccntNum
          })`,
          data: item,
          status: (
            <div
              className={classes.cardStatus}
              style={{
                backgroundColor: item.preAccount ? '#FFF3BF' : '#ABEDC5',
                marginRight: 8,
              }}
            >
              <Text
                color={item.preAccount ? 'yellow' : 'green'}
                variant="captionBold"
                weight="bold"
              >
                {item.preAccount ? 'NOT YET REGISTERED' : 'REGISTERED'}
              </Text>
            </div>
          ),
        }));
        setOptionsCompany(reMapData);
        setLoadingListCompany(false);
      }
    } catch (err) {
      setFailedAlert({
        message: 'Failed to get list company',
      });
      setLoadingListCompany(false);
    }
  };

  const fetchAmValidSc = async (nik) => {
    setLoadingValidateAM(true);
    try {
      const result = await checkAmValidSc(nik);
      const { data } = result;
      if (data?.valid) return true;
      if (!data?.valid) return false;
      setLoadingValidateAM(false);
    } catch (err) {
      setFailedAlert({
        message: 'Failed to check AM starclick',
      });
      setLoadingValidateAM(false);
    }
  };

  useEffect(() => {
    fetchListAM();
    fetchListAllCompany();
  }, [id]);

  useEffect(() => {
    if (toggleProfile) {
      setTypeProfil('name');
      setLabelProfile('fullName');
    } else {
      setTypeProfil('nik');
      setLabelProfile('nik');
    }
  }, [toggleProfile]);

  const alertClose = () => {
    setAlert({
      content: '',
      success: true,
    });
  };

  const renderCallbackAlert = () => {
    return <CallbackAlert onClose={alertClose} {...alert} />;
  };

  const handleCheck = () => {
    if (!checked && selectedCompanyName === '')
      setSelectedCompanyName(companyNameUser);
    if (checked) setSelectedCompanyName('');
    setChecked(!checked);
  };
  const handleChangeText = (val) => selectedCompany(val, '', true);
  const handleChangeDropdown = (val) => {
    setValueCompany(val);
    selectedCompany(
      val?.value,
      val?.data?.custAccntNum || '',
      val?.data?.preAccount,
    );
  };

  const handleGetValueAM = async (value) => {
    const isExistNIK = Boolean(profile.find((f) => f.nik === value?.nik));
    const isExistUserCode = Boolean(
      profile.find((f) => f.userCode === value?.userCode && f.userCode !== ''),
    );
    const isAmValidStarclick =
      ScIntegrationStatus && isNetworkConnectivity
        ? await fetchAmValidSc(value?.nik)
        : true;

    if (profile.length >= 4)
      setFailedAlert({ message: `Assign AM can't be more than 4` });
    else if (isExistUserCode)
      setAlert({ content: `User has been selected`, info: true });
    else if (isExistNIK)
      setAlert({ content: `NIK ${value?.nik} has been selected`, info: true });
    else if (!isAmValidStarclick)
      setAlert({
        content: `NIK ${value?.nik} isn't valid on starclick`,
        info: true,
      });
    else {
      const dataAM = {
        nik: value?.nik,
        email: value?.email,
        fullName: value?.fullName,
        generalManager: value?.generalManager,
        jobTitle: value?.jobTitle,
        segment: value?.segment,
        phoneNumber: value?.phoneNumber,
        userCode: value?.userCode || value?.nik || '',
      };
      const data = [...profile];
      data.push(dataAM);
      setProfile(data);
      salesAssigned(data);
    }
  };

  const handleNewAM = (nik) => {
    const newData = [...profile].filter((d) => d.nik !== nik);
    setProfile(newData);
    salesAssigned(newData);
  };

  const required = (label) => {
    return (
      <>
        <Text color="primary" variant="subtitle2">
          *{' '}
        </Text>
        {label}
      </>
    );
  };

  const placeholderList = () => {
    if (loadingListSales) {
      return 'Loading Sales...';
    } else {
      return typeProfil === 'name'
        ? 'Search Name Sales Team'
        : 'Search NIK Sales Team';
    }
  };

  const selectedCompany = (custAccntName, custAccntNum, preAccount) => {
    setSelectedCompanyName(custAccntName);
    setSelectedCompanyNum(custAccntNum);
    setSelectedPreAccount(preAccount);
  };

  const renderFormValidation = (
    <>
      <Grid item sm={6} xs={12}>
        <div className={classes.subtitle}>
          <Text color="grey" variant="h4" weight="medium">
            Company Name Validation
          </Text>
        </div>
        <Dropdown
          isDisabled={loadingListCompany ? true : false}
          isSearchable
          label={required('Company Name')}
          normalLabel
          onChange={handleChangeDropdown}
          options={optionsCompany}
          placeholder={companyNameUser}
          value={valueCompany}
        />
        <div style={{ margin: 10 }}>
          <Checkbox checked={checked} onChange={handleCheck} />
          <Text color="grey" variant="subtitle1">
            {' '}
            customer not on list above?{' '}
          </Text>
        </div>

        {!!checked && (
          <TextField
            label="Company Name"
            onChange={handleChangeText}
            value={
              selectedCompanyName === '' ? companyNameUser : selectedCompanyName
            }
          />
        )}
      </Grid>
      <Grid item sm={6} xs={12}>
        {/* Form Input Sales Team */}
        {formValidation === 'form-sales-team' && (
          <>
            <div className={classes.subtitle}>
              <Text color="grey" variant="h4" weight="medium">
                Input Sales Team
              </Text>
            </div>
            <div style={{ cursor: 'pointer', margin: '43px 0 24px 0' }}>
              <SearchBox
                disabled={loadingListSales}
                getValue={handleGetValueAM}
                label={labelProfile}
                options={optionsAM}
                placeholder={placeholderList()}
              />
              {/* <Text className={classes.labelContainer} variant="status"> Search by
                <span className={typeProfil === 'name' ? classes.labelActive : classes.label}
                  id="toogleByName"
                  onClick={() => handleTypeProfil('name')}>Name</span>
                <span className={typeProfil === 'nik' ? classes.labelActive : classes.label}
                  id="toogleByNik"
                  onClick={() => handleTypeProfil('nik')}>NIK</span>
              </Text> */}
            </div>
            <AMProfile amProfile={profile} deleteAM={handleNewAM} />
          </>
        )}

        {/* Form Send Email */}
        {formValidation === 'form-email' && (
          <>
            <div className={classes.subtitle}>
              <Text color="grey" variant="h4">
                Type Email Recipient
              </Text>
            </div>
            <div style={{ cursor: 'pointer', margin: '36px 0 24px 0' }}>
              <SendEmail
                setDisableBtnSubmitEmail={setDisableBtnSubmitEmail}
                setEmailAssigned={setEmailAssigned}
                setNameAssigned={setNameAssigned}
                setNumberAssigned={setNumberAssigned}
              />
            </div>
          </>
        )}
      </Grid>
      {renderCallbackAlert()}
    </>
  );

  return (
    <>
      {loading ? (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
          <CircularProgress style={{ color: '#DE1B1B' }} />
        </div>
      ) : (
        renderFormValidation
      )}
    </>
  );
};

Component.defaultProps = {
  initLabelProfile: 'fullName',
  initLoadingListCompany: false,
  initLoadingListSales: false,
  initOptionsCompany: null,
  initToggleProfile: true,
  initTypeProfil: 'name',
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  formValidation: PropTypes.string.isRequired,
  initLabelProfile: PropTypes.string,
  initLoadingListCompany: PropTypes.bool,
  initLoadingListSales: PropTypes.bool,
  initOptionsCompany: PropTypes.array,
  initToggleProfile: PropTypes.bool,
  initTypeProfil: PropTypes.string,
  isNetworkConnectivity: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  salesAssigned: PropTypes.func.isRequired,
  ScIntegrationStatus: PropTypes.bool.isRequired,
  selectedCompanyName: PropTypes.string.isRequired,
  selectedCompanyNum: PropTypes.string.isRequired,
  setDisableBtnSubmitEmail: PropTypes.func.isRequired,
  setEmailAssigned: PropTypes.func.isRequired,
  setNameAssigned: PropTypes.func.isRequired,
  setNumberAssigned: PropTypes.func.isRequired,
  setSelectedCompanyName: PropTypes.func.isRequired,
  setSelectedCompanyNum: PropTypes.func.isRequired,
  setSelectedPreAccount: PropTypes.func.isRequired,
};

export default Component;
