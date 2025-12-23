import { route } from '@configs';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
// import useQueryParams from '@utils/hooks/useQueryParams';
// import { paramsToDateRange } from '@utils/parser';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getDownloadLeadManagementSystem } from '../../_repositories/repositories';

const useAction = (props) => {
  const { setLoadingAlert, setSuccessAlert, setFailedAlert } = usePopupAlert();
  const router = useRouter();
  // const { queryParams } = useQueryParams();
  const { feature } = props;

  // const search = queryParams.search || '';
  // const tab = queryParams.tab || 'needValidation';
  // const filterSource = queryParams.source || '';
  // const filterDateSubmit = paramsToDateRange(
  //   queryParams?.dateSubmit,
  //   'YYYY-MM-DD',
  // );
  // const filterLastUpdate = paramsToDateRange(
  //   queryParams?.lastUpdate,
  //   'YYYY-MM-DD',
  // );
  // const filterLastContacted = paramsToDateRange(
  //   queryParams?.lastContact,
  //   'YYYY-MM-DD',
  // );

  const onCreate = () =>
    router.push(route.dashboadLeadManagementSystem('create'));

  const [formDownload, _setFormDownload] = useState(false);
  const setFormDownload = (val) => () => _setFormDownload(val);

  const onDownload = async ({ email }) => {
    _setFormDownload(false);
    setLoadingAlert();
    // const status = {
    //   needValidation: 'need_validation',
    //   leadValid: 'valid',
    //   leadInvalid: 'invalid',
    // }[tab];

    const _params = {
      email,
      // size: 10000,
      // page: 1,
      // search,
      // source: filterSource,
      // status,
      // dateSubmitStart: filterDateSubmit[0],
      // dateSubmitEnd: filterDateSubmit[1],
      // lastUpdateStart: filterLastUpdate[0],
      // lastUpdateEnd: filterLastUpdate[1],
      // lastContactedStart: filterLastContacted[0],
      // lastContactedEnd: filterLastContacted[1],
    };

    const params = cleanObject(_params);

    try {
      await getDownloadLeadManagementSystem({ params });
      await setSuccessAlert({
        message:
          "Your download request was successful! Please check your spam folder if it does'nt arrive in your inbox",
      });
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  return {
    setFormDownload,
    formDownload,
    onCreate,
    onDownload,
    feature,
  };
};

export default useAction;
