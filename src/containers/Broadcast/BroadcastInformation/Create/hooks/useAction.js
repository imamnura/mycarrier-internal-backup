import { route } from '@configs/';
import { isHaveAccess } from '@utils/common';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  getDetailBroadcastInformation,
  getOptionContactGroup,
  postBroadcastInformation,
} from '../../_repositories/repositories';
import validation from '../validation';

const useAction = (props) => {
  const router = useRouter();
  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { enqueueSnackbar } = useSnackbar();

  const { broadcastId, keep, edit } = router.query;
  const { feature } = props;

  const { control, handleSubmit, watch, setValue, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
    defaultValues: { isSendNow: true },
  });

  const redirectToDetail = (id) => () =>
    router.push(route.broadcastInformation('detail', id));
  const isWithoutApproval = isHaveAccess(
    feature,
    'update_broadcast_information_without_status_need_approval_cdm',
  );

  const fetchSubmit =
    ({ isSubmit, values }) =>
    async () => {
      const _payload = {
        broadcastName: values.broadcastName,
        contactGroup: values.contactGroup.map((d) => d.value),
        attachment: values?.media?.data,
        sendDate: values.schedule,
        submit: isSubmit,
        message: {
          paragraph1: values.paragraph1,
          paragraph2: values.paragraph2,
          paragraph3: values.paragraph3,
        },
        send: isWithoutApproval && edit ? true : false,
      };

      const payload = cleanObject(_payload);

      if (isSubmit) {
        setLoadingAlert();
      }
      setConfirmation();

      try {
        const result = await postBroadcastInformation(broadcastId, payload);
        if (isSubmit) {
          setSuccessAlert({
            message: 'success',
            onClose: redirectToDetail(result.data.broadcastId || broadcastId),
          });
        } else {
          enqueueSnackbar('Broadcast saved as draft.', {
            variant: 'default',
            autoHideDuration: 2000,
          });
          router.push(
            `${route.broadcastInformation(
              'create',
              result.data.broadcastId || broadcastId,
            )}&keep=true`,
            undefined,
            { shallow: true },
          );
        }
      } catch (error) {
        setFailedAlert({
          message: error.message,
        });
      }
    };

  // type: 'draft' | 'submit'
  const onSubmit = (type) => (values) => {
    if (type === 'submit') {
      setConfirmation({
        message: `Are you sure want to ${
          edit ? 'edit' : 'create'
        } this broadcast?`,
        action: [
          { children: 'no', variant: 'ghost', onClick: closeConfirmation },
          { children: 'yes', onClick: fetchSubmit({ values, isSubmit: true }) },
        ],
      });
    } else {
      fetchSubmit({ values, isSubmit: false })();
    }
  };

  const isSendNow = watch('isSendNow');
  const scheduleTime = watch('schedule');
  const paragraph1 = watch('paragraph1');
  const paragraph2 = watch('paragraph2');
  const paragraph3 = watch('paragraph3');
  const media = watch('media');

  useEffect(() => {
    if (isSendNow) {
      setValue('schedule', undefined);
    }
  }, [isSendNow]);

  const [loadingContactGroup, setLoadingContactGroup] = useState(true);
  const [optionContactGroup, setOptionContactGroup] = useState([]);

  const fetchOptionContactGroup = async () => {
    setLoadingContactGroup(true);
    try {
      const result = await getOptionContactGroup();
      setOptionContactGroup(result.data.map((d) => ({ label: d, value: d })));
      setLoadingContactGroup(false);
    } catch (error) {
      setOptionContactGroup([]);
      setLoadingContactGroup(false);
    }
  };

  useEffect(() => {
    fetchOptionContactGroup();
  }, []);

  const [loading, setLoading] = useState(false);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getDetailBroadcastInformation(broadcastId);
      const {
        broadcastInfo: { broadcastName, message, contactGroup, scheduleTime },
        attachment,
      } = result.data;

      const defaultValues = {
        broadcastName,
        contactGroup: contactGroup.map((d) => ({ value: d, label: d })),
        paragraph1: message.paragraph1 || message,
        paragraph2: message.paragraph2,
        paragraph3: message.paragraph3,
        isSendNow: !scheduleTime,
        schedule: scheduleTime || undefined,
        media: attachment
          ? {
              data: attachment,
              url: attachment.fileUrl,
              fileName: attachment.fileName,
            }
          : undefined,
      };
      reset(defaultValues);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (broadcastId && !keep) {
      fetchDetail();
    }
  }, [broadcastId, keep]);

  const remainingParagraphLength = useMemo(() => {
    return {
      paragraph1: 900 - (paragraph2?.length || 0) - (paragraph3?.length || 0),
      paragraph2: 900 - (paragraph1?.length || 0) - (paragraph3?.length || 0),
      paragraph3: 900 - (paragraph1?.length || 0) - (paragraph2?.length || 0),
    };
  }, [paragraph1, paragraph2, paragraph3]);

  return {
    control,
    fetchSubmit,
    handleSubmit,
    isSendNow,
    loading,
    loadingContactGroup,
    media,
    onSubmit,
    optionContactGroup,
    paragraph1,
    paragraph2,
    paragraph3,
    redirectToDetail,
    remainingParagraphLength,
    scheduleTime,
    setValue,
  };
};

export default useAction;
