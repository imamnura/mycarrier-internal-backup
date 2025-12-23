/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  fetchSubmitContent,
  getDetailBanner,
  getListProduct,
  getSlugByCatId, //product v2,
} from '@containers/ContentManagement/Homepage/_repositories/repositories';
import { create_UUID } from '@utils/text';
import { route } from '@configs';
import { isHaveAccess } from '@utils/common';
import { languages } from '../constant';
import { normalizeDetail } from '../utils';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = (props) => {
  const { feature } = props;

  const router = useRouter();
  const id = router.query.id;
  const isEdit = id ? true : false;
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const [detail, setDetail] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [slugProduct, setSlugProduct] = useState('');
  const [slugProductBefore, setSlugProductBefore] = useState(''); //product v2
  const [optionsProduct, setOptionsProduct] = useState([]);
  const [displayBanner, setDisplayBanner] = useState(false);
  const [tab, setTab] = useState('id');
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState, setValue, watch, reset, trigger } =
    useForm({
      resolver: yupResolver(validation),
      mode: 'onChange',
      defaultValue: {
        titleid: '',
        titleen: '',
        descriptionid: '',
        descriptionen: '',
        type: '',
        linkedTo: '',
        linkedToEksternal: '',
      },
    });

  const watchTranslate = watch([
    'titleid',
    'descriptionid',
    'titleen',
    'descriptionen',
  ]);
  const watchTypeBanner = watch('type');
  const idProductSlug = watch('linkedTo');
  const desktopImage = watch('imageDesktop');
  const mobileImage = watch('imageMobile');

  const fetchListProduct = async () => {
    setLoadingProduct(true);

    const params = { page: 1, size: 1000 }; //product v1

    try {
      const { data } = await getListProduct({ params });
      let remappedProduct = [];

      data.length > 0 &&
        data.map((item) =>
          remappedProduct.push({
            // label: item.name, //product v2
            // value: item.catId //product v2
            label: item.productName, //product v1
            value: item.productId, //product v1
            category: item.category, //product v1
            productSlug: item.productSlug, //product v1
          }),
        );

      setOptionsProduct(remappedProduct);
    } catch (error) {
      setOptionsProduct([]);
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleTabChange = () => {
    switch (tab) {
      case 'id':
        watchTranslate[0]
          ? setValue('titleid', watchTranslate[0])
          : setValue('titleid', '');
        watchTranslate[1]
          ? setValue('descriptionid', watchTranslate[1])
          : setValue('descriptionid', '');
        break;
      case 'en':
        watchTranslate[2]
          ? setValue('titleen', watchTranslate[2])
          : setValue('titleen', '');
        watchTranslate[3]
          ? setValue('descriptionen', watchTranslate[3])
          : setValue('descriptionen', '');
        break;
    }
  };

  useEffect(() => {
    handleTabChange();
  }, [tab]);

  useEffect(() => {
    fetchListProduct();
  }, []);

  const handleSwap = () => {
    setTab(tab === 'id' ? 'en' : 'id');
    trigger(['titleid', 'titleen', 'descriptionid', 'descriptionen', 'type']);
    watchTypeBanner === 'internal'
      ? trigger('linkedTo')
      : trigger('linkedToEksternal');
  };

  const submitBanner = (val) => async () => {
    setConfirmation();
    setLoadingAlert();

    let localizations = [
      {
        id: create_UUID(true),
        language: 'id',
        baseLanguage: true,
        title: watchTranslate[0],
        description: watchTranslate[1],
      },
      {
        id: create_UUID(true),
        language: 'en',
        baseLanguage: false,
        title: watchTranslate[2],
        description: watchTranslate[3],
      },
    ];

    const payload = {
      type: 'banner',
      urlType: watchTypeBanner,
      linkedTo:
        watchTypeBanner === 'internal' ? slugProduct : val.linkedToEksternal,
      // productId: watchTypeBanner === 'internal' ? idProductSlug : '-', //product v2
      productId: watchTypeBanner === 'internal' ? val.linkedTo.toString() : '-', //product v1
      imageUrl: {
        desktop: desktopImage?.data?.mediaPath,
        mobile: mobileImage?.data?.mediaPath,
      },
      isDisplay: isEdit ? displayBanner : true,
      localizations,
    };

    try {
      //product v2
      // if (watchTypeBanner === 'internal') {
      //   await fetchGetSlugByCatId(payload.productId);
      //   payload.linkedTo = slugProductBefore;
      // }
      //product v2 end

      const { data } = await fetchSubmitContent({
        data: payload,
        method: isEdit ? 'PUT' : 'POST',
        id: isEdit ? detail.bannerId : '',
      });

      data &&
        setSuccessAlert({
          message: `Banner was successfully ${isEdit ? 'edited' : 'added'}`,
          onClose: () => router.push(route.homepageManagement('list')),
        });

      setDetail({});
    } catch (error) {
      setFailedAlert({
        message:
          typeof error?.message === 'string'
            ? error.message
            : `Failed to ${isEdit ? 'Edit' : 'Add'} Banner`,
      });
    }
  };

  const confirmAdd = (val) => {
    if (
      isEdit
        ? isHaveAccess(feature, 'update_banner')
        : isHaveAccess(feature, 'create_banner')
    ) {
      setConfirmation({
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: submitBanner(val) },
        ],
        message: `Are you sure want to ${isEdit ? 'edit' : 'add'} this banner?`,
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to ${
          isEdit ? `edit` : `add`
        } this banner.`,
      });
    }
  };

  //product v2
  // const fetchGetSlugByCatId = async (catId) => {
  //   try {
  //     const { data } = await getSlugByCatId(catId);
  //     setSlugProductBefore(data);
  //   } catch (error) {
  //     setSlugProductBefore('');
  //   }
  // };

  // const remappingSlug = async (catId) => {
  //   await fetchGetSlugByCatId(catId);
  //   setSlugProduct(slugProductBefore);
  // };
  //product v2 end

  //product v1
  const remappingSlug = (id) => {
    const filterProductById = optionsProduct.filter(
      (item) => item.value === id.toString(),
    );
    const getProductSlug = filterProductById
      .map((el) => el.productSlug)
      .toString();
    const getCatSlug = filterProductById
      .map((el) => el.category.map((el) => el.catSlug).join('/'))
      .toString();
    const getSlug = getCatSlug.replace(/\/[^/]*$/, '/' + getProductSlug);

    return getSlug;
  };
  //product v1 end

  useEffect(() => {
    if (watchTypeBanner === 'internal') {
      // idProductSlug && remappingSlug(idProductSlug); //product v2

      //product v1
      //Get Product Id slug to set in dropdown
      if (optionsProduct.length > 0 && idProductSlug) {
        const resultRemappingSlug = remappingSlug(idProductSlug);
        resultRemappingSlug && setSlugProduct(resultRemappingSlug);
      }

      //product v1 end
    } else {
      setValue('linkedTo', '');
      setSlugProduct('');
    }
  }, [idProductSlug, watchTypeBanner, optionsProduct]);

  const handleSetDataBanner = (data) => {
    reset({ ...normalizeDetail(data) });
  };

  const fetchDetail = async () => {
    setIsLoading(true);
    try {
      const { data } = await getDetailBanner(id);
      setDetail(data);
      handleSetDataBanner(data);
    } catch (error) {
      setDetail({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  useEffect(() => {
    if (isEdit) {
      detail?.urlType === 'internal' && setSlugProduct(detail?.linkedTo);
      setDisplayBanner(detail?.isDisplay);
    }
  }, [detail]);

  const handleCancel = () => router.push(route.homepageManagement('list'));

  const { isValid, isDirty } = formState;

  const validateForm = id ? !isValid : !isValid || !isDirty;

  return {
    id,
    control,
    handleSubmit,
    confirmAdd,
    optionsProduct,
    loadingProduct,
    watchTypeBanner,
    languages,
    tab,
    setTab,
    handleSwap,
    isLoading,
    handleCancel,
    validateForm,
  };
};

export default useActions;
