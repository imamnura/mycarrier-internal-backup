import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailCustomer,
  downloadList,
} from '../../../_repositories/repositories';
import { cleanObject } from '@utils/common';
import { isHaveAccess } from '@utils/common';

const useAction = (props) => {
  const { feature } = props;
  const { query, isReady } = useRouter();
  const { setFailedAlert, setSuccessAlert } = usePopupAlert();

  const { id: custAccntNum, tab, search, regional, product, status } = query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const { data } = await getDetailCustomer(custAccntNum);
      setData(data);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchDownload = async () => {
    setLoadingDownload(true);
    const _params = {
      search,
      regional,
      product,
      status,
    };
    const params = cleanObject(_params);

    try {
      const result = await downloadList(custAccntNum, params);
      if (result.data.fileUrlDownload) {
        window.location.href = result.data.fileUrlDownload;
        setSuccessAlert({
          message: 'File successfully downloaded',
        });
      }
      setLoadingDownload(false);
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
      setLoadingDownload(false);
    }
  };

  useEffect(() => {
    if (isReady && custAccntNum) {
      if (isHaveAccess(feature, 'read_detail_service_list')) {
        fetchDetail();
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
        setData(null);
      }
    }
  }, [custAccntNum]);

  const onClickDownload = () => () => fetchDownload();

  const action = () => {
    let actions = [];

    if (
      isHaveAccess(feature, 'read_download_service_list') &&
      tab === 'serviceList'
    ) {
      actions.push({
        children: 'Download',
        onClick: onClickDownload(),
        loading: loadingDownload,
      });
    }

    return actions;
  };

  return {
    custAccntNum,
    data,
    loading,
    fetchDetail,
    action,
    onClickDownload,
  };
};

export default useAction;
