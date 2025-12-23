import { useEffect, useState } from 'react';
import {
  getAMProfile,
  getCustomerProfile,
  addAMMapping,
} from '../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { route } from '@configs';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = () => {
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const router = useRouter();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [optionsAMProfile, setOptionsAMProfile] = useState([]);
  const [loadingAMProfile, setLoadingAMProfile] = useState(false);
  const [optionsCustomerProfile, setOptionsCustomerProfile] = useState([]);
  const [loadingCustomerProfile, setLoadingCustomerProfile] = useState(false);

  const [customer, setCustomer] = useState({});
  const [profile, setProfile] = useState({});
  const [typeProfil, setTypeProfil] = useState('name');
  const [labelProfile, setLabelProfile] = useState('fullName');
  const [typeCustomer, setTypeCustomer] = useState('name');
  const [labelCustomer, setLabelCustomer] = useState('custAccntName');
  const [toggleProfile, setToggleProfile] = useState(true);
  const [toggleCustomer, setToggleCustomer] = useState(true);

  const validateCustomer = Boolean(Object.keys(customer).length);
  const validateProfile = Boolean(Object.keys(profile).length);
  const buttonDisable = !validateProfile || !validateCustomer;
  const loading = loadingAMProfile || loadingCustomerProfile;

  const fetchAMProfile = async () => {
    setLoadingAMProfile(true);

    try {
      const { data } = await getAMProfile();
      let reshapeData = [];
      data.map((item) => {
        reshapeData.push({ ...item, fullName: item.metaData.fullName });
      });
      setOptionsAMProfile(reshapeData);
    } catch (err) {
      setFailedAlert({
        message: 'Failed to get list AM Profile',
      });
    } finally {
      setLoadingAMProfile(false);
    }
  };

  const fetchCustomerProfile = async () => {
    setLoadingCustomerProfile(true);

    try {
      const { data } = await getCustomerProfile();
      let reshapeData = [];
      data.map((item) => {
        reshapeData.push({ ...item, custAccntName: item.custAccntName });
      });
      setOptionsCustomerProfile(reshapeData);
    } catch (err) {
      setFailedAlert({ message: 'Failed to get list Customer Profile' });
    } finally {
      setLoadingCustomerProfile(false);
    }
  };

  useEffect(() => {
    fetchAMProfile();
    fetchCustomerProfile();
  }, []);

  useEffect(() => {
    if (toggleProfile) {
      setTypeProfil('name');
      setLabelProfile('fullName');
    } else {
      setTypeProfil('nik');
      setLabelProfile('nik');
    }

    // reset profil
    setProfile({});
  }, [toggleProfile]);

  useEffect(() => {
    if (toggleCustomer) {
      setLabelCustomer('custAccntName');
      setTypeCustomer('name');
    } else {
      setLabelCustomer('custAccntNum');
      setTypeCustomer('Account Number');
    }

    // reset customer
    setCustomer({});
  }, [toggleCustomer]);

  const handleGetValueAM = (value) => setProfile(value);

  const handleGetValueCustomer = (value) => setCustomer(value);

  const onClickCancel = () => router.push(route.amMapping('list'));

  const handleTypeSearchProfil = (value) => {
    if (value === 'name') return setToggleProfile(true);
    return setToggleProfile(false);
  };

  const handleTypeSearchCustomer = (value) => {
    if (value === 'custAccntName') return setToggleCustomer(true);
    return setToggleCustomer(false);
  };

  const fetchAddAMMApping = async (data, userId) => {
    setConfirmation();
    setLoadingAlert();

    try {
      await addAMMapping(data, userId);
      setSuccessAlert({
        message: 'New mapping successfully added',
        onClose: () => router.push(route.amMapping('detail', userId)),
      });
    } catch (err) {
      setFailedAlert({ message: err?.message });
    }
  };

  const handleMappingAM = () => {
    const data = {
      ...profile,
      metaData: {
        ...profile.metaData,
        ccHandled: [
          {
            ...customer,
            divre: `${customer.divre}`,
            corporateClientName: customer?.custAccntName,
          },
          ...(profile?.metaData?.ccHandled ?? {}),
        ],
      },
    };
    delete data.fullName;

    fetchAddAMMApping(JSON.stringify(data), profile.userId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation({
      message: 'Are you sure want to add this new mapping?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: handleMappingAM },
      ],
    });
  };

  return {
    optionsAMProfile,
    loadingAMProfile,
    optionsCustomerProfile,
    loadingCustomerProfile,
    onClickCancel,
    buttonDisable,
    loading,
    profile,
    customer,
    typeProfil,
    labelProfile,
    typeCustomer,
    labelCustomer,
    handleSubmit,
    handleGetValueAM,
    handleGetValueCustomer,
    handleTypeSearchProfil,
    handleTypeSearchCustomer,
  };
};

export default useActions;
