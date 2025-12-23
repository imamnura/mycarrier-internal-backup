import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { validation1 } from '../yupResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getComplaint,
  getDetail,
  getDetailDummy,
  getDummySid,
  getFirstCall,
  getProduct,
  // getSegment,
  // getService,
  getSymptomp,
  getUrgency,
  updateTicket,
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
  const [dummy, setDummy] = useState(false);

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [detail, setDetail] = useState({});

  const { feature } = props;

  const {
    query: { id },
  } = router;
  const {
    control,
    handleSubmit,
    formState,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(validation1),
    mode: 'onChange',
    defaultValues: {
      firstCallResolution: 'no',
    },
  });

  const watchServiceId = watch('serviceId');
  const watchProductId = watch('productId');
  const watchServiceName = watch('serviceName');
  const watchProduct = watch('product');

  useEffect(() => {
    handleDummyClick(watchServiceId);
  }, [watchServiceId]);

  useEffect(() => {
    if (detail?.nipnas) {
      reset(detail);
      fetchProduct();
    }
  }, [detail]);

  useEffect(() => {
    if (isHaveAccess(feature, 'update_approve_ticket_gameqoo')) {
      fetchDetail(id);
      fetchComplaint();
      fetchFirstCall();
      fetchUrgency();
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
        onClose: () => router.push(route.gameqoo('list')),
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
  }, [watchProduct]);

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
  }, [watchProductId]);

  const serviceId = detail.serviceId || '';

  const fetchDetail = async (refId) => {
    const validatePath = router.asPath === route.gameqoo('validation', refId);

    if (validatePath) {
      try {
        const { data } = await getDetail(id);
        setDetail(data);
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
    return await updateTicket(id, payload);
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
    setDummy(true);
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

    const payload = new FormData();
    payload.append('note', val.occNote);
    payload.append('noteOcc', val.occNote);
    payload.append('networkType', 'network');
    payload.append('sid', val.serviceId);
    payload.append('productType', val.product);
    payload.append('productName', getProductName[0]?.label);
    payload.append('segment', val.segment);
    payload.append('cid', val.cid);
    payload.append('olo', detail?.dataCustomerAccount?.custAccntName);
    payload.append('symptompName', val.symptompName);
    payload.append('symptompId', val.symptoms);
    payload.append('symptompDesc', val.symptompDesc);
    payload.append('symptompPath', val.symptompPath);
    payload.append('description', val.description);
    payload.append('complaint', val.hardComplaint);
    payload.append('urgency', val.urgency);
    payload.append('picNumber', val.picPhoneNumber);
    payload.append('picEmail', detail.picEmail);
    payload.append('address', val.address);
    payload.append('soldDTP', detail.soldDTP);
    payload.append('picName', val.picName);
    payload.append('picNumber', val.picPhoneNumber);
    payload.append('picName2', val.contactName);
    payload.append('picNumber2', val.contactPhone);
    payload.append('status', 'Approved');

    try {
      const { data } = await fetchSubmitValidation(payload, id);
      setSuccessAlert({
        message: `GameQoo ticket successfully escalated to NOSS-A & approved, 
        please write down the Ticket Number: ${data.ticketId}`,
        onClose: () => router.push(route.gameqoo('detail', id)),
      });
      return val;
    } catch (error) {
      setFailedAlert({
        message: `Failed to Validate Ticket`,
      });
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
    dummy,
    handleValidationSubmit,
  };
};

export default useAction;
