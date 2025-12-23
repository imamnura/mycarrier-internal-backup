import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  postUploadFile,
  getOptionBakes,
  getOptionsOrderNeucentrix,
} from '../../../../../_repositories/repositories';
import { useWatch } from 'react-hook-form';
import { cleanObject } from '@utils/common';
import { dateDiff } from '@utils/parser';

const useActions = (props) => {
  const { control, clearErrors, data, resetField, setValue, state } = props;

  const { setOptionsBakesNumber } = state;

  const [loadingBakesNumber, setLoadingBakesNumber] = useState(true);
  const [firstMount, setFirstMount] = useState(true);

  const {
    radioBakes,
    bakesStartDate,
    bakesEndDate,
    agreementMasterNumber,
    purchaseOrderDate,
  } = useWatch({ control });

  const fetchOptionBakes = async (custAccntNum, search) => {
    try {
      setLoadingBakesNumber(true);
      const { data } = await getOptionBakes({ custAccntNum, search });
      setOptionsBakesNumber(data);
    } catch (e) {
      setOptionsBakesNumber([]);
    } finally {
      setLoadingBakesNumber(false);
    }
  };

  const fetchOptionAgreeNumber = async (search, prevOptions, { page }) => {
    const type = 'agree-master';
    const params = cleanObject({
      search,
      page,
      size: search ? 10 : 20,
      custAccntNum: data?.custAccntNum,
    });

    try {
      const { data, meta } = await getOptionsOrderNeucentrix(params, type);
      const normalizeRes = data.map((v) => ({
        label: v?.agreeNumber,
        value: v?.agreeNumber,
        data: v,
        customOption: {
          type: 'status',
          subLabel: v?.custAccntName,
        },
      }));
      return {
        additional: {
          page: page + 1,
        },
        hasMore: meta?.page < meta?.totalPage,
        options: [...prevOptions, ...normalizeRes],
      };
    } catch (error) {
      return {
        additional: {
          page: page,
        },
        hasMore: false,
        options: prevOptions,
      };
    }
  };

  useEffect(() => {
    if (!firstMount) {
      if (moment(bakesEndDate).isBefore(bakesStartDate)) {
        resetField('bakesEndDate', { defaultValue: '' });
      }
      if (moment(purchaseOrderDate).isBefore(bakesStartDate)) {
        resetField('purchaseOrderDate', { defaultValue: '' });
      }
    }
  }, [bakesStartDate]);

  useEffect(() => {
    if (bakesStartDate && bakesEndDate) {
      resetField('bakesDuration', {
        defaultValue: Math.ceil(
          dateDiff('months', bakesStartDate, bakesEndDate, true),
        ).toString(),
      });
    } else {
      resetField('bakesDuration', { defaultValue: '' });
    }
  }, [bakesStartDate, bakesEndDate]);

  useEffect(() => {
    setFirstMount(false);
  }, []);

  const getDateOrCurrentDate = (inputDate) => {
    const dateToCheck = moment(inputDate, 'MM/DD/YYYY HH:mm:ss');
    const currentDate = moment();
    return dateToCheck.isBefore(currentDate) ? currentDate : dateToCheck;
  };

  useEffect(() => {
    if (!firstMount) {
      resetField('bakesStartDate', {
        defaultValue:
          // moment(agreementMasterNumber?.data?.startDate).toISOString() || '',
          moment(
            getDateOrCurrentDate(agreementMasterNumber?.data?.startDate),
          ).toISOString() || '',
      });
      resetField('bakesEndDate', {
        defaultValue:
          // moment(agreementMasterNumber?.data?.endDate).toISOString() || '',
          moment(
            getDateOrCurrentDate(agreementMasterNumber?.data?.endDate),
          ).toISOString() || '',
      });
      resetField('bakesDuration', { defaultValue: '' });
      resetField('purchaseOrderDate', { defaultValue: '' });
    }
  }, [JSON.stringify(agreementMasterNumber)]);

  useEffect(() => {
    fetchOptionBakes(data?.custAccntNum);
  }, [data]);

  useEffect(() => {
    if (radioBakes !== '1') clearErrors('bakesNumberAuto');
    else clearErrors(['bakesFile', 'bakesNumber']);
  }, [radioBakes]);

  useEffect(() => {
    if (!loadingBakesNumber) {
      if (radioBakes === '1' || data?.isExistingBakes) {
        resetField('bakesNumberAuto', {
          defaultValue: data?.bakesNumber,
          keepDirty: true,
        });
      }
    }

    setValue('loading.bakesNumber', loadingBakesNumber, { shouldDirty: false });
  }, [loadingBakesNumber]);

  const agreementAsyncProps = {
    loadOptions: fetchOptionAgreeNumber,
    additional: { page: 1 },
  };

  return {
    agreementMasterNumber,
    agreementAsyncProps,
    bakesStartDate,
    bakesEndDate,
    radioBakes,
    postUploadFile,
    loadingBakesNumber,
  };
};

export default useActions;
