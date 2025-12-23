import { useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { downloadList } from '../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { cleanObject } from '@utils/common';

const useActions = ({ feature }) => {
  const { query, isReady } = useRouter();
  const {
    id: custAccntNum,
    params: projectId,
    search,
    regional,
    product,
    status,
  } = query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const { setFailedAlert, setSuccessAlert } = usePopupAlert();

  const fetchDownload = async () => {
    setLoadingDownload(true);
    const _params = {
      search,
      regional,
      product,
      status,
      projectId,
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

  const onClickDownload = () => () => fetchDownload();

  const action = () => {
    let actions = [];

    if (isHaveAccess(feature, 'read_download_service_list')) {
      actions.push({
        children: 'Download',
        onClick: onClickDownload(),
        loading: loadingDownload,
      });
    }

    return actions;
  };

  const hasAccess =
    isHaveAccess(feature, 'read_detail_service_list') && isReady;

  return {
    custAccntNum,
    projectId,
    data,
    setData,
    hasAccess,
    loading,
    setLoading,
    action,
    onClickDownload,
  };
};

export default useActions;
