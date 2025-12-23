import { cleanObject, isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useQueryParams from '@utils/hooks/useQueryParams';
import moment from 'moment';
import { useRouter } from 'next/router';
import { getDownloadDataUnsettle } from '../../_repositories/repositories';
import { useEffect } from 'react';

const useAction = (props) => {
  const router = useRouter();
  const {
    query: { segment, invoiceGroup },
  } = router;

  const { queryParams } = useQueryParams();
  const {
    search,
    cutOffDate: _cutOffDate,
    aging,
    iddb,
    sort,
    orderBy,
  } = queryParams;

  const cutOff = _cutOffDate ? moment(_cutOffDate) : undefined;
  const cutOffDate = cutOff?.isValid() ? cutOff.toJSON() : undefined;

  const { feature } = props;
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const onDownload = async () => {
    setLoadingAlert();
    const _payload = {
      endDate: cutOffDate ? moment(cutOffDate).format('YYYY-MM-DD') : '',
      iddb,
      invoiceGroup,
      orderBy,
      periode: aging,
      search,
      segment,
      sort,
    };

    const payload = cleanObject(_payload);

    try {
      const result = await getDownloadDataUnsettle('detail', payload);
      window.open(result.data.fileUrlDownload, '_blank');
      setSuccessAlert({
        message: 'Data Unsettle table successfully downloaded',
      });
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  useEffect(() => {
    if (!isHaveAccess(feature, 'read_detail_data_unsettle')) {
      setFailedAlert({
        message: "You don't have permission to view detail.",
      });
    }
  }, []);

  return {
    data: {
      segment,
      invoiceGroup,
    },
    feature,
    onDownload,
  };
};

export default useAction;
