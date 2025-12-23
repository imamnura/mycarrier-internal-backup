import { useEffect, useState } from 'react';
import { getOptionsOrderNeucentrix } from '../../../../../_repositories/repositories';
import { cleanObject } from '@utils/common';
import { useWatch } from 'react-hook-form';

const useActions = (props) => {
  const { data, state, control, resetField } = props;
  const [firstMount, setFirstMount] = useState(true);

  const {
    setLoadingBillingAccount,
    setLoadingServiceAccount,
    optionsServiceAccount,
    optionsBillingAccount,
    setOptionsServiceAccount,
    setOptionsBillingAccount,
  } = state;

  const watchBillingAccount = useWatch({
    control: control,
    name: 'billingAccount',
  });
  const watchServiceAccount = useWatch({
    control: control,
    name: 'serviceAccount',
  });

  const fetchOptionServiceAccount = async (custAccntNum) => {
    const type = 'service-accounts';
    const params = {
      custAccntNum,
      billingAccount: watchBillingAccount,
    };

    try {
      setLoadingServiceAccount(true);
      const { data } = await getOptionsOrderNeucentrix(
        cleanObject(params),
        type,
      );
      setOptionsServiceAccount(data);
    } catch (e) {
      setOptionsServiceAccount([]);
    } finally {
      setLoadingServiceAccount(false);
    }
  };

  const fetchOptionBillingAccount = async (custAccntNum) => {
    const type = 'billing-accounts';
    const params = {
      custAccntNum,
    };

    try {
      setLoadingBillingAccount(true);
      const { data } = await getOptionsOrderNeucentrix(params, type);
      setOptionsBillingAccount(data);
    } catch (e) {
      setOptionsBillingAccount([]);
    } finally {
      setLoadingBillingAccount(false);
    }
  };

  useEffect(() => {
    setFirstMount(false);
    //to set the value after loadingOptions with keeping the dirtyFields empty
    resetField('billingAccount', {
      defaultValue: watchBillingAccount,
      keepDirty: false,
    });
    resetField('serviceAccount', {
      defaultValue: watchServiceAccount,
      keepDirty: false,
    });
  }, []);

  useEffect(() => {
    if (data?.custAccntNum) {
      if (!optionsBillingAccount.length)
        fetchOptionBillingAccount(data?.custAccntNum);
    }
  }, [data]);

  useEffect(() => {
    if (data?.custAccntNum) {
      if (watchBillingAccount) {
        fetchOptionServiceAccount(data?.custAccntNum);
      }
      if (!firstMount) {
        resetField('serviceAccount', { defaultValue: '', keepDirty: false });
        setOptionsServiceAccount([]);
      }
    }
  }, [watchBillingAccount]);

  return {
    optionsServiceAccount,
    optionsBillingAccount,
    watchBillingAccount,
  };
};

export default useActions;
