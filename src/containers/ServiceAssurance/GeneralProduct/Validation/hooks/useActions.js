import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { validation1 } from '../yupResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getComplaint,
  getDetailGeneralProduct,
  getDetailDummy,
  getDummySid,
  getFirstCall,
  getProduct,
  // getSegment,
  // getService,
  getSymptomp,
  getUrgency,
  submitValidation,
} from '../../_repositories/repositories';
import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { isHaveAccess } from '@utils/common';
import { capitalize } from '@utils/text';
import { useRouter } from 'next/router';

const useAction = (props) => {
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [firstCall, setFirstCall] = useState([]);
  const [loadingFirstCall, setLoadingFirstCall] = useState(false);
  const [product, setProduct] = useState([]);
  const [productFull, setProductFull] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const [urgency, setUrgency] = useState([]);
  const [loadingUrgency, setLoadingUrgency] = useState(false);

  const [symptoms, setSymptoms] = useState([]);
  const [loadingSymptoms, setLoadingSymptoms] = useState(false);

  const [complaint, setComplaint] = useState([]);
  const [loadingComplaint, setLoadingComplaint] = useState(false);

  const [dummySid, setDummySid] = useState([]);
  const [loadingDummySid, setLoadingDummySid] = useState(false);

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [detail, setDetail] = useState({});

  const { feature } = props;

  const {
    query: { id },
  } = router;
  const { control, handleSubmit, formState, setValue, watch, getValues } =
    useForm({
      resolver: yupResolver(validation1),
      mode: 'onChange',
    });

  const watchServiceId = watch('serviceId');
  const watchProductId = watch('productId');
  const watchServiceName = watch('serviceName');

  useEffect(() => {
    handleDummyClick(watchServiceId);
  }, [watchServiceId]);

  useEffect(() => {
    fetchProduct();
  }, [detail.nipnas]);

  useEffect(() => {
    if (isHaveAccess(feature, 'update_validate_ticket_general_product')) {
      fetchDetail(id);
      fetchComplaint();
      fetchFirstCall();
      fetchUrgency();
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
        onClose: () => router.push(route.generalProduct('list')),
      });
    }
  }, [id]);

  useEffect(() => {
    const payload = {
      // serviceId : watchServiceId,
      productId: watchServiceName,
      content: 'ROOT',
    };
    fetchSymptoms(payload);
  }, [watchServiceName]);

  useEffect(() => {
    const selected = productFull.filter(
      ({ productId }) => productId === getValues('productId'),
    );
    if (selected.length !== 0) {
      setValue('serviceName', selected[0].serviceName);
      setValue('product', selected[0].productType);
      setValue('segment', selected[0].segment);
      setValue('cid', selected[0].cid);
    }
  }, [watchProductId, productFull]);

  const serviceId = detail.serviceId || '';

  const fetchDetail = async (refId) => {
    const validatePath =
      router.asPath === route.generalProduct('validation', refId);

    if (validatePath) {
      try {
        const { data } = await getDetailGeneralProduct(id);
        setDetail(data);
        setValue('firstCallResolution', 'no');
        setValue('serviceId', data.serviceId);
        setValue('productId', data.productId);
        setValue('description', data.description);
        setValue('address', data.address);
        setValue('picName', data.picName);
        setValue('picPhone', data.picNumber);
        setValue('product', data.productType);
      } catch (e) {
        setDetail({});
      }
    }
  };

  const fetchComplaint = async () => {
    setLoadingComplaint(true);
    try {
      const result = await getComplaint();
      const resOptions = result.data.map(({ complaintName, complaintId }) => ({
        label: capitalize(complaintName),
        value: complaintId,
      }));
      setLoadingComplaint(false);
      setComplaint(resOptions);
    } catch (error) {
      setLoadingComplaint(false);
      setComplaint([]);
    }
  };

  const fetchSymptoms = async (payload) => {
    setLoadingSymptoms(true);
    try {
      const result = await getSymptomp(payload);
      setLoadingSymptoms(false);
      setSymptoms(result.data);
    } catch (error) {
      setLoadingSymptoms(false);
      setSymptoms([]);
    }
  };

  const fetchUrgency = async () => {
    setLoadingUrgency(true);
    try {
      const result = await getUrgency();
      const resOptions = result.data.map(({ urgencyName, urgencyId }) => ({
        label: capitalize(urgencyName),
        value: urgencyId,
      }));
      setLoadingUrgency(false);
      setUrgency(resOptions);
    } catch (error) {
      setLoadingUrgency(false);
      setUrgency([]);
    }
  };

  const fetchFirstCall = async () => {
    setLoadingFirstCall(true);
    try {
      const result = await getFirstCall();
      const resOptions = result.data.map(({ firstCallName, firstCallId }) => ({
        label: firstCallName,
        value: firstCallId,
      }));
      setLoadingFirstCall(false);
      setFirstCall(resOptions);
    } catch (error) {
      setLoadingFirstCall(false);
      setFirstCall([]);
    }
  };

  const fetchSubmitValidation = async (payload, id) => {
    return await submitValidation(payload, id);
  };

  const fetchProduct = async () => {
    setLoadingProduct(true);

    const payload = {
      nipnas: detail.nipnas,
      // email: detail.picEmail
    };

    try {
      const result = await getProduct(payload);
      const initialProduct = result.data.filter(
        ({ productName }) => productName === detail.productName,
      );
      const resOptions = result.data.map(({ productName, productId }) => ({
        label: productName,
        value: productId,
        id: productId,
      }));
      setLoadingProduct(false);
      setProductFull(result.data);
      setProduct(resOptions);
      if (initialProduct.length > 0) {
        setValue('productId', initialProduct[0].productId);
      }
    } catch (error) {
      setLoadingProduct(false);
      setProductFull([]);
      setProduct([]);
    }
  };

  const handleDummySid = () => {
    fetchDummySid();
  };

  const fetchDummySid = async () => {
    setLoadingDummySid(true);
    const payload = {
      email: detail.picEmail,
      soldDTP: detail.soldDTP,
      nipnas: detail?.nipnas || '',
    };

    try {
      const result = await getDummySid(payload);
      const resOptions = result.data.map(({ serviceId, productName }) => ({
        label: serviceId,
        value: { serviceId, productName },
      }));
      setLoadingDummySid(false);
      setDummySid(resOptions);
    } catch (error) {
      setLoadingDummySid(false);
      setDummySid([]);
    }
  };

  const handleValidationSubmit = async (val) => {
    setLoadingAlert();
    const getProductName = product.filter(function (item) {
      return item.value === val.productId;
    });

    const payload = {
      // 'idOGD':detail.idOGD,
      sid: val.serviceId,
      address: val.address,
      olo: detail.olo,
      soldDTP: detail.soldDTP,
      picEmail: detail.picEmail,
      productName: getProductName[0].label,
      productType: val.product,
      // 'serviceCategory': val.service,
      segment: val.segment,
      symptompName: val.symptompName,
      symptompId: val.symptoms,
      symptompDesc: val.symptompDesc,
      symptompPath: val.symptompPath,
      picName2: val.contactName,
      picNumber2: val.contactPhone,
      picName: val.picName,
      picNumber: val.picPhone,
      urgency: val.urgency,
      complaint: val.hardComplaint,
      description: val.description,
      note: val.occNote,
      cid: val.cid,
    };

    try {
      const { data } = await fetchSubmitValidation(payload, id);
      setSuccessAlert({
        message: `General Product ticket successfully submitted, please write down the Ticket Number:${data.ticketNumber}`,
        onClose: () => router.push(route.generalProduct('detail', id)),
      });
    } catch (error) {
      if (error?.details?.eventCode === 3) {
        setFailedAlert({
          message:
            error?.details?.message ||
            `Track ID ${id} already regisetred in MyCX`,
          onClose: () => router.push(route.generalProduct('detail', id)),
        });
      } else {
        setFailedAlert({
          message: `Failed to Validate Ticket`,
        });
      }
    }
  };

  const handleDummyClick = async (value) => {
    const getProductName = dummySid.filter(function (item) {
      return item.value.serviceId === value;
    });

    if (getProductName.length !== 0) {
      const payload = {
        email: detail.picEmail,
        productName: getProductName[0].value.productName || ' ',
        serviceId: value,
      };
      try {
        const { data } = await getDetailDummy(payload);
        setValue('productId', data.productId);
      } catch (e) {
        setValue('productId', '');
      }
    }
  };

  const confirmValidation = (val) => {
    const confirmation = {
      message: 'Are you sure want to submit this general product ticket?',
      action: [
        {
          children: 'No',
          onClick: closeConfirmation,
          variant: 'ghost',
        },
        {
          children: 'Yes',
          onClick: () => {
            closeConfirmation();
            handleValidationSubmit(val);
          },
        },
      ],
    };

    setConfirmation(confirmation);
  };

  const handleCheck = () => {
    setChecking(!checking);
  };

  const handleChangeSymptomp = (v) => () => {
    setValue('symptompName', v.symptompName);
    setValue('symptoms', v.symptompId);
    setValue('symptompDesc', v.symptompDesc);
    setValue('symptompPath', v.symptompPath);
  };

  return {
    control,
    formState,
    handleSubmit,
    setValue,
    confirmValidation,
    handleCheck,
    checking,
    dropdown: {
      firstCall,
      product,
      // service, segment,
      urgency,
      complaint,
      symptoms,
      dummySid,
    },
    fetch: { fetchDummySid, fetchSubmitValidation },
    loading: {
      loadingFirstCall,
      loadingProduct,
      // loadingService, loadingSegment,
      loadingUrgency,
      loadingComplaint,
      loadingSymptoms,
      loadingDummySid,
    },
    detail,
    serviceId,
    handleDummySid,
    handleChangeSymptomp,
  };
};

export default useAction;
