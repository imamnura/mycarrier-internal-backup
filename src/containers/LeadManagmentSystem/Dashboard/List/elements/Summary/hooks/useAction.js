import { useEffect, useMemo, useState } from 'react';
import { getSummaryLeadManagementSystem } from '../../../../_repositories/repositories';
import { useRouter } from 'next/router';
import { cleanObject } from '@utils/common';
import color from '@styles/color';
import { route } from '@configs';
import moment from 'moment';

const colors =
  {
    'Need Validation': color.blue.main,
    Valid: color.green.main,
    Invalid: color.primary.main,
    'Dispatch Lead': color.yellow.main,
  } || color.general.main;

const defaultFilterDate = [
  moment().add(-7, 'days').toJSON(),
  moment().toJSON(),
];

const useAction = () => {
  const router = useRouter();

  const [filterDateSubmit, _setFilterDateSubmit] = useState(defaultFilterDate);

  const setFilterDateSubmit = async (val) => {
    if (!!val[0] && !!val[1]) {
      _setFilterDateSubmit(val);
    } else {
      await _setFilterDateSubmit([null, null]);
      await _setFilterDateSubmit(defaultFilterDate);
    }
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    if (!filterDateSubmit[0] && !filterDateSubmit[1]) {
      return;
    }

    setLoading(true);
    const _params = {
      startDate: moment(filterDateSubmit[0]).format('YYYY-MM-DD'),
      endDate: moment(filterDateSubmit[1]).format('YYYY-MM-DD'),
    };

    const params = cleanObject(_params);

    try {
      const result = await getSummaryLeadManagementSystem({
        params,
        withCancel: true,
      });
      setLoading(false);
      setData(
        result.data.data.map(({ count, label }) => ({
          label: label,
          value: count,
          color: colors[label],
        })),
      );
    } catch (error) {
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [filterDateSubmit]);

  const redirectToReport = () =>
    router.push(route.reportLeadManagementSystem());

  const totalData = useMemo(() => {
    let arrayOfTotal = [];
    data?.map(({ value }) => arrayOfTotal.push(value));

    return arrayOfTotal.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }, [data]);

  return {
    data,
    filterDateSubmit,
    loading,
    redirectToReport,
    setFilterDateSubmit,
    totalData,
  };
};

export default useAction;
