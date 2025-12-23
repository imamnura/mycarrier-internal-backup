import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { validation1 } from '../yupResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getComplaint,
  getListCustomer,
  getFirstCall,
  getProduct,
  getSymptomp,
  getUrgency,
  submitValidation,
  getListSidCreate,
  submitCreate,
  getSourceChannel,
  getDummySid,
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

  const [channel, setChannel] = useState([]);
  const [loadingChannel, setLoadingChannel] = useState(false);

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

  // eslint-disable-next-line no-unused-vars
  const [detail, setDetail] = useState({});

  const { feature } = props;

  const { control, handleSubmit, formState, setValue, watch, getValues } =
    useForm({
      resolver: yupResolver(validation1),
      mode: 'onChange',
    });

  // const watchServiceId = watch('serviceId');
  const watchProductId = watch('productId');
  const watchServiceName = watch('serviceName');
  const watchCustomer = watch('customer');

  // useEffect(() => {
  //   handleDummyClick(watchServiceId);
  // }, [watchServiceId]);

  useEffect(() => {
    if (getValues('customer')) {
      fetchProduct();
    }
  }, [watchCustomer]);

  useEffect(() => {
    if (isHaveAccess(feature, 'create_ticket_general_product')) {
      fetchChannel();
      fetchComplaint();
      fetchFirstCall();
      fetchUrgency();
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
        onClose: () => router.push(route.generalProduct('list')),
      });
    }
  }, []);

  useEffect(() => {
    if (getValues('productId')) {
      fetchListProductSid();
      const payload = {
        productId: watchServiceName,
        content: 'ROOT',
      };
      fetchSymptoms(payload);
    }
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
  }, [watchProductId]);

  const serviceId = detail.serviceId || '';

  const fetchOptionCustomer = async (search, prevOptions, { page }) => {
    const params = {
      search,
      page,
      size: 10,
    };
    try {
      const result = await getListCustomer(params);
      const normalizeRes = result.data.map(
        ({ nipnas, customerAccntName, customerAccntNum }) => ({
          label: capitalize(customerAccntName),
          value: nipnas,
          data: {
            nipnas,
            customerAccntName,
            customerAccntNum,
          },
        }),
      );

      return {
        additional: {
          page: page + 1,
        },
        hasMore: result.meta.page < result.meta.totalPage,
        options: [...prevOptions, ...normalizeRes],
      };
    } catch (error) {
      return {
        additional: {
          page: page,
        },
        hasMore: false,
        options: prevOptions,
      };
    }
  };

  const customerAsyncProps = {
    loadOptions: fetchOptionCustomer,
    additional: { page: 1 },
  };

  const fetchChannel = async () => {
    setLoadingChannel(true);
    try {
      const result = await getSourceChannel();
      setLoadingChannel(false);
      setChannel(result.data);
    } catch (error) {
      setLoadingChannel(false);
      setComplaint([]);
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

  const fetchSubmitValidation = async (payload) => {
    return await submitValidation(payload);
  };

  const fetchProduct = async () => {
    setLoadingProduct(true);

    const payload = {
      nipnas: getValues('customer')?.value,
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

  const fetchListProductSid = async () => {
    setLoadingDummySid(true);

    const payload = {
      productType: getValues('product'),
      nipnas: getValues('customer')?.value || '',
    };

    try {
      const result = await getListSidCreate(payload);
      const resOptions = result.data.map(({ serviceId, serviceName }) => ({
        label: serviceId,
        value: { serviceId, serviceName },
      }));
      setLoadingDummySid(false);
      setDummy(true);
      setDummySid(resOptions);
    } catch (error) {
      setLoadingDummySid(false);
      setDummySid([]);
    }
  };

  const handleDummySid = () => {
    setDummy(true);
    fetchDummySid();
  };

  const fetchDummySid = async () => {
    setLoadingDummySid(true);

    const payload = {
      soldDTP: getValues('customer')?.data?.customerAccntNum || '',
      nipnas: getValues('customer')?.value || '',
    };

    try {
      const result = await getDummySid(payload);
      const resOptions = result.data.map(({ serviceId, serviceName }) => ({
        label: serviceId,
        value: { serviceId, serviceName },
      }));
      setLoadingDummySid(false);
      setDummySid(resOptions);
    } catch (error) {
      setLoadingDummySid(false);
      setDummySid([]);
    }
  };

  // const handleDummyClick = async (value) => {
  //   const getProductName =  dummySid.filter(function(item) {
  //     return item.value.serviceId === value;
  //   });

  //   if ( getProductName.length!==0 ) {
  //     const payload = {
  //       email: detail.picEmail,
  //       productName: getProductName[0].value.productName || ' ',
  //       serviceId: value
  //     };
  //     try {
  //       const { data } = await getDetailDummy(payload);
  //       setValue('productId', data.productId);
  //     } catch (e) {
  //       setValue('productId', '');
  //     }
  //   }
  // };

  const handleValidationSubmit = async (val) => {
    setLoadingAlert();
    const getProductName = product.filter(function (item) {
      return item.value === val.productId;
    });

    const payload = {
      nipnas: val.customer.value,
      custAccntNum: val.customer.data.customerAccntNum,
      productName: getProductName[0].label,
      sid: val.serviceId,
      address: val.address,
      olo: val.customer.data.customerAccntName,
      soldDTP: val.customer.data.customerAccntNum,
      picEmail: '',
      productType: val.product,
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
      segment: val.segment,
      sourceChannel: val.sourceChannel,
    };

    try {
      const { data } = await submitCreate(payload);
      setSuccessAlert({
        message: `General Product ticket successfully submitted, please write down the Ticket Number:${data.ticketNumber}`,
        onClose: () => router.push(route.generalProduct('list')),
      });
    } catch (error) {
      setFailedAlert({
        message: `Failed to Validate Ticket`,
      });
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
      urgency,
      complaint,
      symptoms,
      dummySid,
      channel,
    },
    fetch: { fetchDummySid, fetchSubmitValidation },
    loading: {
      loadingFirstCall,
      loadingProduct,
      loadingUrgency,
      loadingComplaint,
      loadingSymptoms,
      loadingDummySid,
      loadingChannel,
    },
    customerAsyncProps,
    detail,
    serviceId,
    handleDummySid,
    dummy,
    handleChangeSymptomp,
  };
};

export default useAction;
