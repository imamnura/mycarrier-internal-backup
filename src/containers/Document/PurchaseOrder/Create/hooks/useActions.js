import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { cleanObject, isHaveAccess } from '@utils/common';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useForm, useWatch, useFieldArray } from 'react-hook-form';
import { route } from '@configs/index';
import {
  mergeForms,
  normalizeAdditionalDataProduct,
  normalizeSolutionData,
} from '../utils';
import {
  postPurchaseOrder,
  getDetailHistoryOfTariffCalculator,
} from '../../_repositories/repositories';
import useQueryParams from '@utils/hooks/useQueryParams';
import { string } from 'yup';
import { IS_CDNAAS } from '@constants/env';

const useAction = (props) => {
  const { feature } = props;
  const router = useRouter();
  const { queryParams } = useQueryParams();
  const routeList = {
    pathname: route.purchaseOrder('list'),
  };

  const { setFailedAlert, setLoadingAlert, setSuccessAlert, onCloseAlert } =
    usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [modalProduct, setModalProduct] = useState({ open: false });
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);

  const formPO = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const fieldsProducts = useFieldArray({
    control: formPO?.control,
    name: 'products',
  });

  const watchProducts = useWatch({
    control: formPO?.control,
    name: 'products',
  });

  const watchCustomer = useWatch({
    control: formPO?.control,
    name: 'customer',
  });

  const onClickContactHelpdesk = () => {
    const whatsAppHelpDesk = '6282188885448';
    const messageHelpDesk = `PO saya untuk customer ${watchCustomer?.label} tidak bisa diproses karena partnerID tidak ditemukan. Mohon bantuan untuk diproses lebih lanjut`;
    const encodedMessage = encodeURIComponent(messageHelpDesk);

    window.open(
      `https://wa.me/${whatsAppHelpDesk}?text=${encodedMessage}`,
      '_blank',
    );
    onCloseAlert();
  };

  const fetchUpdateStatus = async (
    formStatePO,
    formStateUpdateStatus,
    content,
  ) => {
    const customer = cleanObject({
      custAccntName: formStatePO?.customer?.data?.custAccntName,
      custAccntNum: formStatePO?.customer?.data?.custAccntNum,
      pic: {
        ...formStatePO?.pic,
        name: formStatePO?.selectedPIC?.label,
      },
    });

    const products = formStatePO?.products?.map((product) => {
      let additionalDataProduct = {};

      const mergedForms = mergeForms([product], queryParams.orderType, {
        formtype: [
          'Text Field',
          'Text Area',
          'Dropdown',
          'Upload File',
          'Upload BAKES',
        ],
        isSpecialRequireField: false,
      });

      mergedForms.forEach((fieldProps) => {
        return (additionalDataProduct = {
          ...additionalDataProduct,
          ...normalizeAdditionalDataProduct(formStatePO, fieldProps),
        });
      });
      const mergedSpecialForms = mergeForms([product], queryParams.orderType, {
        formtype: [
          'Text Field',
          'Text Area',
          'Dropdown',
          'Upload File',
          'Packages',
        ],
        isSpecialRequireField: true,
      });

      mergedSpecialForms.forEach((fieldProps) => {
        return (additionalDataProduct = {
          ...additionalDataProduct,
          ...normalizeAdditionalDataProduct(product, fieldProps),
        });
      });

      if (
        ['fabd solution (without partner access)', 'fabd solution'].includes(
          product?.productFlow?.toLowerCase(),
        )
      ) {
        additionalDataProduct = {
          ...additionalDataProduct,
          ...normalizeSolutionData(product),
        };
      }

      return cleanObject({
        productId: product?.productId,
        productName: product?.productName,
        categoryId: product?.categoryId,
        categoryName: product?.categoryName,
        productFlow: product?.productFlow,
        orderType: queryParams.orderType,
        ...cleanObject(additionalDataProduct),
      });
    });

    const payload = cleanObject({
      customer,
      products,
      ...formStateUpdateStatus,
    });

    try {
      setLoadingAlert();
      await postPurchaseOrder(payload);
      setSuccessAlert({
        message: content?.success,
        onClose: onCloseSuccess,
      });
    } catch (e) {
      if (e?.message.toLowerCase().includes('partner id')) {
        setFailedAlert({
          variant: 'noResult',
          message: e?.message,
          customAction: [
            {
              label: 'Cancel',
              onClick: onCloseAlert,
              variant: 'ghost',
              mr: 8,
            },
            {
              label: 'Contact Helpdesk',
              onClick: onClickContactHelpdesk,
            },
          ],
        });
      } else {
        setFailedAlert({
          message: e?.message ?? 'Failed to Update Data',
        });
      }
    }
  };

  const onClickSubmit = (formStateUpdateStatus, content) => {
    formPO?.handleSubmit((formStatePO) => {
      let payloadProduct = formStatePO;
      if (
        formStatePO.products[0].productId === IS_CDNAAS
      ) {
        const normalizeCDNaasProduct = formStatePO.products.map(
          (productItem) => {
            const packagesSolutions = productItem.packagesSolutions.map(
              (packageItem) => {
                packageItem.item = packageItem.packageName;
                
                packageItem.itemId = packageItem.id;
                if (packageItem?.attributes?.length) {
                  const splitSubItem = packageItem.subItem.split(',');
                  packageItem.packageName = `${packageItem.packageName} ${splitSubItem[1]}`;
                  packageItem.subItem = splitSubItem[1];
                  packageItem.subItemId = splitSubItem[0];
                }

                delete packageItem.attributes;
                return packageItem;
              },
            )
            return {
              ...productItem,
              packagesSolutions,
            };
          },
        );

        payloadProduct = {
          ...payloadProduct,
          products: normalizeCDNaasProduct,
        };
      }

      fetchUpdateStatus(payloadProduct, formStateUpdateStatus, content);
    })();
  };

  const onCloseSuccess = () => router.push(routeList);

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

    if (formPO?.formState?.isDirty) setConfirmation(confirmation);
    else router.push(route);
  };

  const onClickModalUpdateStatus = (v) => () => setModalUpdateStatus(v);

  const action = () => {
    let actions = [];

    actions.push(
      {
        variant: 'ghost',
        children: 'cancel',
        onClick: onClickCancel(routeList),
      },
      {
        children: 'submit All',
        disabled: !(
          formPO?.formState?.isValid &&
          formPO?.formState?.isDirty &&
          watchProducts?.length > 0
        ),
        hideDivider: true,
        ml: 24,
        type: 'submit',
        onClick: onClickModalUpdateStatus({
          schema: [
            {
              name: 'noteProgress',
              placeholder: 'Please describe the note..',
              label: 'Note',
              maxLength: 1000,
              minRows: 3,
              multiline: true,
              required: true,
            },
          ],
          validation: {
            noteProgress: string().required().label('Note'),
          },
          open: true,
          caption:
            'Once you approved this, it will be process and data will be sent to delivery automatically.',
          status: 'approved',
          success: 'Order successfully submitted',
          title: 'Are you sure want to submit order?',
        }),
      },
    );
    return actions;
  };

  const breadcrumb = [
    {
      label: 'Purchase Order',
      onClick: onClickCancel(routeList),
    },
    { label: 'New Order' },
  ];

  const fetchCalculatorTariff = async (id) => {
    try {
      setLoadingAlert();
      const { data } = await getDetailHistoryOfTariffCalculator(id);
      fieldsProducts.append(data?.productList);
      onCloseAlert();
    } catch (e) {
      setFailedAlert({
        message: e?.message || 'Failed get data calculator tariff',
      });
    }
  };

  const getParamsId = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    if (id) fetchCalculatorTariff(id);
  };

  useEffect(() => {
    if (!isHaveAccess(feature, 'read_detail')) {
      setFailedAlert({
        message: "You don't have permission to view this page.",
        onClose: _onClickCancel(routeList),
      });
    }

    getParamsId();

    return () => {
      formPO?.reset();
    };
  }, []);

  return {
    formPO,
    action,
    breadcrumb,
    modalProduct,
    setModalProduct,
    watchProducts,
    watchCustomer,
    fieldsProducts,
    onClickSubmit,
    modalUpdateStatus,
    setModalUpdateStatus,
  };
};

export default useAction;
