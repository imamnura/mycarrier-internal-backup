import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  getListCompany,
  getOptionsProduct,
  getSource,
  postCreateLead,
  getListContact,
} from '../../_repositories/repositories';
import validation from '../validation';
import { cleanObject } from '@utils/common';

const useAction = (props) => {
  const router = useRouter();
  const { initialValidBy } = props;

  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: validation,
    mode: 'onChange',
    defaultValues: {
      validBy: '',
      company: [],
      phone: '+62',
    },
  });

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const onSuccessSubmit = () =>
    router.replace(
      `${route.dashboadLeadManagementSystem('list')}?tab=leadValid`,
    );

  const fetchSubmitLead = (data) => async () => {
    closeConfirmation();
    setLoadingAlert();
    try {
      await postCreateLead({ data });
      setSuccessAlert({
        message: 'This lead was successfully added',
        onClose: onSuccessSubmit,
      });
    } catch (error) {
      // setFailedAlert({ message: error.message });
      setFailedAlert({ message: 'Something went wrong when create new lead' });
    }
  };

  // const onSubmit = handleSubmit(async (value) => {
  const onSubmit = (value) => {
    const {
      amMapping,
      businessType,
      companyName,
      companySize,
      contactEmail,
      description,
      descriptionType,
      fullName,
      isOtherCustomer,
      isOtherContact,
      otherBusinessType,
      otherDescriptionType,
      location,
      name,
      occupation,
      otherCompanyName,
      phone,
      phoneNumber,
      product,
      otherProduct,
      source,
      // otherSource,
      recipientEmail,
      validBy,
      otherName,
    } = value;

    const pickProduct = product?.data
      ? product?.data
      : { productId: '0', productName: otherProduct };

    // let company = isOtherCustomer ? {
    //   companyName: otherCompanyName
    // } : {
    //   company: companyName.data,
    //   companyName: companyName.data.custAccntName
    // };
    let company = {
      company: companyName?.data,
      companyName: companyName?.data?.custAccntName,
    };

    if (isOtherCustomer) company = { companyName: otherCompanyName };
    if (!isOtherCustomer && validBy === 'dispatchMyTens')
      company = { companyName: companyName?.data?.custAccntName };

    let assign =
      validBy === 'amMapping'
        ? {
            amMapping: amMapping.map(
              ({
                nik,
                email,
                generalManager,
                jobTitle,
                segment,
                phoneNumber,
                userCode,
                name: fullName,
              }) => ({
                nik,
                email,
                generalManager,
                jobTitle,
                segment,
                phoneNumber,
                userCode,
                fullName,
              }),
            ),
          }
        : {
            recipientEmail,
            phoneNumber,
            fullName,
          };

    if (validBy === 'dispatchMyTens') assign = {};

    const payload = {
      ...pickProduct,
      ...assign,
      ...company,
      businessType:
        businessType === 'Others' ? otherBusinessType : businessType,
      companySize,
      contactEmail,
      description,
      descriptionType:
        descriptionType === 'Others' ? otherDescriptionType : descriptionType,
      location,
      ...(isOtherContact
        ? {
            name: otherName,
            occupation,
            phone,
          }
        : {
            name: name?.data?.name,
            ...(name?.data?.clientId?.filter(Boolean)?.length
              ? {
                  clientId: name?.data?.clientId,
                }
              : {}),
            occupation,
            phone,
          }),
      validBy,
      source,
      // source: source === 'Others' ? otherSource : source
    };

    setConfirmation({
      message: 'Are you sure want to add this new lead?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchSubmitLead(payload) },
      ],
    });
  };

  const isOthersProduct = watch('product')?.value == 'Others';
  // const isOthersSource = watch('source') == 'Others';
  const isBusinessTypeOthers = watch('businessType') == 'Others';
  const isDescriptionTypeOthers = watch('descriptionType') == 'Others';
  const isOtherCustomer = watch('isOtherCustomer');
  const isOtherContact = watch('isOtherContact');
  const validBy = initialValidBy || watch('validBy');
  const name = watch('name');
  // const phoneNumber = watch('phoneNumber');

  useEffect(() => {
    setValue('companyName', undefined);
  }, [isOtherCustomer]);

  useEffect(() => {
    setValue('name', undefined);
    setValue('occupation', undefined);
    setValue('phone', undefined);
    setValue('contactEmail', undefined);
  }, [isOtherContact]);

  useEffect(() => {
    if (name?.data) {
      setValue('occupation', name?.data?.occupation);
      setValue('phone', name?.data?.phone);
      setValue('contactEmail', name?.data?.contactEmail);
    }
  }, [name]);

  useEffect(() => {
    if (validBy !== 'amMapping') setValue('amMapping', '[]');
    if (validBy === 'sendEmail') setValue('phoneNumber', '+62');
    if (validBy !== 'sendEmail') {
      setValue('fullName', '');
      setValue('phoneNumber', '');
      setValue('recipientEmail', '');
    }
  }, [validBy]);

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [optionProduct, setOptionProduct] = useState([]);

  const fetchOptionProduct = async () => {
    setLoadingProduct(true);
    try {
      const result = await getOptionsProduct();
      const opt = result.data.map(({ productId, productName }) => ({
        label: productName,
        value: productName,
        data: {
          productId: productId.toString(),
          productName: productName,
        },
      }));
      setOptionProduct([...opt, { label: 'Others', value: 'Others' }]);
      setLoadingProduct(false);
    } catch (error) {
      setOptionProduct([]);
      setLoadingProduct(false);
    }
  };
  const [loadingSource, setLoadingSource] = useState(true);
  const [optionSource, setOptionSource] = useState([]);

  const fetchOptionSource = async () => {
    setLoadingSource(true);
    try {
      const result = await getSource();
      const opt = result.data.map(({ name, value }) => ({
        label: name,
        value: value,
      }));
      setOptionSource(opt);
      setLoadingSource(false);
    } catch (error) {
      setOptionSource([]);
      setLoadingSource(false);
    }
  };

  const fetchOptionCompany = async (search, prevOptions, { page }) => {
    try {
      const result = await getListCompany({ search, page, size: 10 });
      const normalizeRes = result.data.map(
        ({ preAccount, custAccntName, custAccntNum, account_id }) => ({
          label: custAccntName,
          value: custAccntNum,
          data: {
            custAccntName,
            custAccntNum,
            preAccount,
          },
          customOption: {
            type: 'status',
            variant: preAccount ? 'warning' : 'success',
            children: preAccount ? 'Unregistered' : 'Registered',
            subLabel: `(${custAccntNum === '-' ? account_id : custAccntNum})`,
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

  const fetchOptionContact = async (search, prevOptions, { page }) => {
    try {
      const result = await getListContact(
        cleanObject({ search, page, size: 10 }),
      );
      const normalizeRes = result.data
        .filter(({ name }) => !!name)
        .map(({ name, clientId, phone, contactEmail }, index) => ({
          label: name,
          value: index,
          data: {
            name,
            clientId,
            phone,
            contactEmail,
          },
        }));

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

  useEffect(() => {
    fetchOptionProduct();
    fetchOptionSource();
  }, []);

  const customerAsyncProps = {
    loadOptions: fetchOptionCompany,
    additional: { page: 1 },
  };

  const contactAsyncProps = {
    loadOptions: fetchOptionContact,
    additional: { page: 1 },
  };

  return {
    validBy,
    control,
    isOthersProduct,
    isBusinessTypeOthers,
    isDescriptionTypeOthers,
    isOtherCustomer,
    isOtherContact,
    loadingProduct,
    loadingSource,
    onSubmit,
    optionProduct,
    optionSource,
    handleSubmit,
    fetchOptionCompany,
    fetchOptionContact,
    fetchSubmitLead,
    onSuccessSubmit,
    customerAsyncProps,
    contactAsyncProps,
  };
};

export default useAction;
