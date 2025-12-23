import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useForm } from 'react-hook-form';
import { route } from '@configs/index';
import { cleanObject, isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailBanner,
  postBanner,
} from '@containers/ContentManagement/Homepage/_repositories/repositories';
import { filter, map } from 'lodash';
import { normalizeDetail } from '../utils';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: bannerId } = router.query;

  const routeList = {
    pathname: route.homepageManagement('list'),
  };

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const formBanner = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit = (v) => () => {
    fetchUpdateStatus(v);
    closeConfirmation();
  };

  const onClickSubmit = (values) => {
    const confirmation = {
      message: 'Are you sure want to add this banner hero?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: onSubmit(values) },
      ],
    };
    setConfirmation(confirmation);
  };

  const onCloseSuccess = () => () => router.push(routeList);

  const _onClickCancel = (route) => () => {
    closeConfirmation();
    router.push(route);
  };

  const onClickCancel = (route) => () => {
    const confirmation = {
      message:
        'Do you want to cancel this draft? If yes you must fill the form start over.',
      action: [
        { children: 'NO', variant: 'ghost', onClick: closeConfirmation },
        { children: 'YES', onClick: _onClickCancel(route) },
      ],
    };

    if (formBanner?.formState?.isDirty) setConfirmation(confirmation);
    else router.push(route);
  };

  const fetchDetailBanner = async () => {
    setLoading(true);
    try {
      const { data } = await getDetailBanner(bannerId);
      setData(data);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdateStatus = async (formstateBanner) => {
    const payload = cleanObject({
      id: bannerId,
      isDisplay: formstateBanner?.isDisplay ?? false,
      mediaUrl:
        formstateBanner?.media?.data?.mediaPath ||
        formstateBanner?.media?.fileUrl,
      localizations: map(formstateBanner?.localizations, (data, language) => ({
        ...data,
        language: language?.toLowerCase(),
        ctaButtons: filter(
          map(data?.ctaButtons, (buttonData, btnVariant) => {
            if (
              !(
                btnVariant === 'secondary' &&
                !formstateBanner?.withSecondaryButton
              )
            ) {
              return {
                ...buttonData,
                buttonType: btnVariant,
              };
            }
          }),
          Boolean,
        ),
      })),
    });

    try {
      setLoadingAlert();
      await postBanner({
        data: payload,
        method: bannerId ? 'PUT' : 'POST',
      });
      setSuccessAlert({
        message: bannerId
          ? 'Banner was successfully edited'
          : 'Banner was successfully added',
        onClose: onCloseSuccess(),
      });
    } catch (e) {
      setFailedAlert({
        message: bannerId ? 'Failed to Edit Banner' : 'Failed to Add Banner',
      });
    }
  };

  const action = () => {
    let actions = [];

    actions.push(
      {
        variant: 'ghost',
        children: 'cancel',
        onClick: onClickCancel(routeList),
      },
      {
        children: 'SAVE',
        disabled: !(
          formBanner?.formState?.isValid && formBanner?.formState?.isDirty
        ),
        hideDivider: true,
        ml: 24,
        type: 'submit',
        onClick: formBanner?.handleSubmit(onClickSubmit),
      },
    );
    return actions;
  };

  const breadcrumb = [
    {
      label: 'Homepage Management',
      onClick: onClickCancel(routeList),
    },
    { label: 'Banner Hero' },
    { label: bannerId || 'Add Banner Hero' },
  ];

  useEffect(() => {
    if (bannerId && isHaveAccess(feature, 'update_banner')) {
      fetchDetailBanner();
    } else if (!bannerId && isHaveAccess(feature, 'create_banner')) {
      setLoading(false);
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
        onClose: _onClickCancel(routeList),
      });
    }

    return () => {
      setData(null);
      setLoading(true);
    };
  }, [bannerId]);

  useEffect(() => {
    if (data) formBanner?.reset(normalizeDetail(data));
    return () => {
      formBanner?.reset();
    };
  }, [data]);

  return {
    action,
    breadcrumb,
    formBanner,
    loading,
    bannerId,
    data,
  };
};

export default useAction;
