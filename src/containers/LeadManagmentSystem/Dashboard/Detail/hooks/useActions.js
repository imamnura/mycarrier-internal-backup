import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDetail,
  getPrerequisite,
  updateStatusLead,
} from '../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { cleanObject } from '@utils/common';
import { maskLeadStatus } from '../../utils';
import Tooltip from '@components/Tooltip';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import Information from '@assets/icon-v2/Information';

const useActions = () => {
  const router = useRouter();
  const {
    query: { id: interestId, stage },
  } = router;

  // const { feature } = props;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [loadingStageInfo, setLoadingStageInfo] = useState(true);

  const [popUp, _setPopUp] = useState({
    type: 'log',
    open: false,
  });

  const setPopUp =
    ({ type, open }) =>
    () =>
      _setPopUp({ type, open });

  const isPopUpOpen = (type) => {
    if (popUp.type === type) {
      return popUp.open;
    } else {
      return false;
    }
  };

  const [prerequisite, setPrerequisite] = useState({
    isHaveError: false,
    data: [],
  });

  const fetchPrerequisite = async () => {
    try {
      const result = await getPrerequisite(interestId);

      const isHaveError = !!result.data.filter(({ status }) => status === false)
        .length;

      setPrerequisite({
        isHaveError,
        data: result.data,
      });
    } catch (error) {
      setPrerequisite({
        isHaveError: false,
        data: [],
      });
    }
  };

  const fetchDetail = async () => {
    if (data) {
      setLoadingStageInfo(true);
    } else {
      setLoadingDetail(true);
    }

    const payload = cleanObject({
      status: stage === 'leadDetail' ? '' : stage,
    });

    try {
      const result = await getDetail(interestId, payload);
      await fetchPrerequisite();
      const resData = {
        ...result?.data,
        defaultStatus: result?.data?.status,
        status: maskLeadStatus(result?.data?.status),
      };

      setData(resData);
      setLoadingDetail(false);
      setLoadingStageInfo(false);
    } catch (error) {
      setData(null);
      setLoadingDetail(false);
      setLoadingStageInfo(false);
    }
  };

  useEffect(() => {
    if (interestId) {
      fetchDetail();
    }
  }, [interestId, stage]);

  const fetchUpdateStatus = (status, destination, reason, note) => async () => {
    setLoadingAlert();
    closeConfirmation();

    try {
      await updateStatusLead(interestId, status, { reason, note });
      await fetchDetail();

      if (reason) {
        _setPopUp({ type: 'invalidForm', open: false });
      }
      if (note) {
        _setPopUp({ type: 'retireForm', open: false });
      }
      setSuccessAlert({
        message: `Lead was successfully set to ${destination}`,
      });
    } catch (error) {
      setFailedAlert({
        message:
          typeof error.message === 'string'
            ? error.message
            : 'Failed to update Lead status',
      });
    }
  };

  const onUpdateStatus =
    (status) =>
    ({ reason, note }) => {
      const destination = {
        invalid: 'Invalid',
        qualify: 'Qualify',
        retire: 'Retire',
        convert: 'Opportunity',
        quote: 'Quote',
        agreement: 'Agreement',
        order: 'Order',
        // do other here
      }[status];

      setConfirmation({
        message: `Are you sure want to set this lead to ${destination}?`,
        action: [
          { children: 'no', variant: 'ghost', onClick: closeConfirmation },
          {
            children: 'yes',
            onClick: fetchUpdateStatus(status, destination, reason, note),
          },
        ],
      });
    };

  const caNumberConverter = (value) =>
    !data?.companyDetail?.statusCa ? (
      value
    ) : (
      <Tooltip
        placement="right"
        title="Need to contact WDM to create CA Number on Starclick"
      >
        <Box
          sx={{
            alignItems: 'center',
            cursor: 'default',
            display: 'flex',
            width: 'max-content',
          }}
        >
          <Typography children="Pre-CA Number" inline variant="subtitle1" />
          <Information style={{ height: 16, width: 16, marginLeft: 8 }} />
        </Box>
      </Tooltip>
    );

  return {
    data,
    fetchDetail,
    interestId,
    isPopUpOpen,
    loading: {
      detail: loadingDetail,
      stageInfo: loadingStageInfo,
    },
    onUpdateStatus,
    popUp,
    prerequisite,
    setData,
    setPopUp,
    caNumberConverter,
    fetchUpdateStatus,
  };
};

export default useActions;
