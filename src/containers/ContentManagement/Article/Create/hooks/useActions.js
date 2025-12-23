/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../yupResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  submitArticle,
  getArticle,
  getListProduct,
  getListCategory,
} from '../../_repositories/repositories';
import { create_UUID, slugValidate } from '@utils/text';
import { route } from '@configs';
import { cleanObject, isHaveAccess } from '@utils/common';
import { languages, dummyTextId, dummyTextEn } from '../constant';
import { normalizeDetail } from './normalizeDetail';

const useActions = (props) => {
  const { feature } = props;

  const router = useRouter();
  const id = router.query.id;
  const isEdit = id ? true : false;
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const [detail, setDetail] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [optionsCategory, setOptionsCategory] = useState([]);
  const [optionsProduct, setOptionsProduct] = useState([]);
  const [tab, setTab] = useState('id');
  const [isLoading, setIsLoading] = useState(false);
  const [chipRelatedProduct, setChipRelatedProduct] = useState([]);
  const [chipKeyword, setChipKeyword] = useState([]);
  const [story, setStory] = useState(null);

  const {
    control,
    handleSubmit,
    formState,
    setValue,
    watch,
    reset,
    trigger,
    getValues,
    setError,
    resetField,
  } = useForm({
    resolver: yupResolver(validation(optionsCategory)),
    mode: 'onChange',
    defaultValue: {
      nameid: '',
      nameen: '',
      captionid: '',
      captionen: '',
      loadingCategory: true,
    },
  });

  const watchTranslate = watch(['nameid', 'captionid', 'nameen', 'captionen']);
  const storyIdValue = watch('storyid') || dummyTextId;
  const storyEnValue = watch('storyen') || dummyTextEn;
  const loadingCategory = watch('loadingCategory');
  const relatedProductSelected = watch('relatedProduct');
  const image = watch('imageFile');

  const fetchListProduct = async () => {
    setLoadingProduct(true);
    // const params = { page: 1, size: 1000 }; //product v1

    try {
      const { data } = await getListProduct();
      let remappedProduct = [];

      data.length > 0 &&
        data.map((item) =>
          remappedProduct.push({
            // label: item.name, //product v2
            // value: item.catId //product v2
            label: item.productName, //product v1
            value: item.productId, //product v1
          }),
        );

      setOptionsProduct(remappedProduct);
    } catch (error) {
      setOptionsProduct([]);
    } finally {
      setLoadingProduct(false);
    }
  };

  const fetchListCategory = async () => {
    setValue('loadingCategory', true);

    try {
      const { data } = await getListCategory();
      const options = data.map(({ value }) => value);
      setOptionsCategory(options);
    } catch (error) {
      setOptionsCategory([]);
    } finally {
      setValue('loadingCategory', false);
    }
  };

  const handleTabChange = () => {
    switch (tab) {
      case 'id':
        watchTranslate[0]
          ? setValue('nameid', watchTranslate[0])
          : setValue('nameid', '');
        watchTranslate[1]
          ? setValue('captionid', watchTranslate[1])
          : setValue('captionid', '');
        break;
      case 'en':
        watchTranslate[2]
          ? setValue('nameen', watchTranslate[2])
          : setValue('nameen', '');
        watchTranslate[3]
          ? setValue('captionen', watchTranslate[3])
          : setValue('captionen', '');
        break;
    }
  };

  useEffect(() => {
    handleTabChange();
  }, [tab]);

  useEffect(() => {
    fetchListProduct();
    fetchListCategory();
  }, []);

  useEffect(() => {
    chipKeyword.length < 1 &&
      setError('keyword', {
        type: 'value',
        message: 'Keyword is a required field',
      });
  }, [chipKeyword]);

  const handleSwap = () => {
    setTab(tab === 'id' ? 'en' : 'id');
    trigger(['nameid', 'nameen', 'captionid', 'captionen']);
    chipKeyword.length < 1 &&
      setError('keyword', {
        type: 'value',
        message: 'Keyword is a required field',
      });
  };

  const submitContent = (result) => async () => {
    setConfirmation();
    setLoadingAlert();

    let localization = [
      {
        id: create_UUID(true),
        language: 'id',
        baseLanguage: true,
        title: result.nameid,
        caption: result.captionid,
        story: result.storyid,
        slug: slugValidate(result.nameid).substring(0, 50),
        createdAt: new Date().toISOString(),
      },
      {
        id: create_UUID(true),
        language: 'en',
        baseLanguage: false,
        title: result.nameen,
        caption: result.captionen,
        story: result.storyen,
        slug: slugValidate(result.nameen).substring(0, 50),
        createdAt: new Date().toISOString(),
      },
    ];

    const reshapeCatId = (data = []) => data?.map((item) => item?.catId);

    const payload = cleanObject({
      localization,
      imageUrl: image?.data,
      isDisplay: isEdit ? detail?.isDisplay : true,
      keyword: chipKeyword,
      type: 'article',
      // relatedProduct: reshapeCatId(chipRelatedProduct), // product v2
      // linkedTo: reshapeCatId(chipRelatedProduct), // product v1
      productLink: reshapeCatId(chipRelatedProduct),
      categoryArticle: result.categoryArticle,
      articleId: detail?.articleId,
    });

    try {
      const { success } = await submitArticle({
        data: payload,
        method: isEdit ? 'PUT' : 'POST',
        id,
      });

      success &&
        setSuccessAlert({
          message: `Article was successfully ${isEdit ? 'edited' : 'added'}`,
          onClose: () => router.push(route.article('list')),
        });

      setDetail({});
    } catch (err) {
      setFailedAlert({
        message:
          typeof err?.message === 'string'
            ? err.message
            : `Failed to ${isEdit ? 'Edit' : 'Add'} Article`,
      });
    }
  };

  const confirmAdd = (val) => {
    if (
      isEdit
        ? isHaveAccess(feature, 'update_article')
        : isHaveAccess(feature, 'create_article')
    ) {
      setConfirmation({
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: submitContent(val) },
        ],
        message: `Are you sure want to ${
          isEdit ? 'edit' : 'add'
        } this article?`,
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to ${
          isEdit ? `edit` : `add`
        } this article.`,
      });
    }
  };

  const onDeleteChipKeyword = (chipToDelete) => (e) => {
    setChipKeyword(chipKeyword.filter((chip) => chip !== chipToDelete));
  };

  const handleSetKeyword = (v) => {
    if (v) {
      if (chipKeyword.includes(v)) {
        setError('keyword', {
          type: 'value',
          message: 'Keyword already exists',
        });
        return;
      }
      setChipKeyword([...chipKeyword, v]);
      resetField('keyword');
    } else {
      return;
    }
  };

  const onKeyDownKeyword = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let keywordValue = getValues('keyword');

      handleSetKeyword(keywordValue);
    } else {
      return;
    }
  };

  const handleGetStory = (e) => setStory(e);

  const onSelectProduct = () => {
    if (relatedProductSelected) {
      const selected = optionsProduct.filter(
        ({ value }) => value === relatedProductSelected,
      );

      const normalizeSelected = {
        label: selected[0]?.label,
        catId: selected[0]?.value,
      };

      if (
        chipRelatedProduct.some(
          ({ catId }) => catId === normalizeSelected.catId,
        )
      ) {
        setError('relatedProduct', {
          type: 'value',
          message: 'Product already exists',
        });
        return;
      }
      setChipRelatedProduct([...chipRelatedProduct, normalizeSelected]);
    }
  };

  useEffect(() => {
    onSelectProduct();
  }, [relatedProductSelected]);

  const onDeleteChipRelatedProduct = (chipToDelete) => (e) => {
    setChipRelatedProduct(
      chipRelatedProduct.filter((chip) => chip !== chipToDelete),
    );
    resetField('relatedProduct');
  };

  const handleEditStory = (val) => {
    if (tab === 'id') {
      const checkText = val ? val : dummyTextId;
      setValue(`storyid`, checkText);
    } else {
      const checkText = val ? val : dummyTextEn;
      setValue(`storyen`, checkText);
    }
  };

  const handleSetDataEvent = (data) => {
    reset({ ...normalizeDetail(data) });
    setChipKeyword(data?.keyword.split(','));
  };

  const fetchDetail = async () => {
    setIsLoading(true);
    try {
      const { data } = await getArticle(id);
      setDetail(data);
      handleSetDataEvent(data);
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

  const findArray = (value) => {
    return optionsProduct.find((element) => element.value === value);
  };

  useEffect(() => {
    const optionsProductNotEmpty = optionsProduct?.length > 0;
    const detailNotEmpty = Object.keys(detail).length > 0;
    // const relatedProductNotEmpty = detail?.relatedProduct?.length > 0; //product v2
    // v1 linkedTo -> new productLink
    const productLinkNotEmpty = detail?.productLink?.length > 0;

    // if (optionsProductNotEmpty && detailNotEmpty && relatedProductNotEmpty) { //product v2
    if (optionsProductNotEmpty && detailNotEmpty && productLinkNotEmpty) {
      //product v1

      // const arrRelatedProduct = detail?.relatedProduct.map(item => findArray(item)); //product v2
      const arrRelatedProduct = detail?.productLink.map((item) =>
        findArray(item),
      );

      //filter related product is not exist
      // const filterResult = arrRelatedProduct.filter(item => item); //product v2
      const filterResult = arrRelatedProduct.filter((item) => item); //product v1

      let remappedProduct = [];

      filterResult.length > 0 &&
        filterResult.map((item) =>
          remappedProduct.push({
            label: item?.label,
            catId: item?.value,
          }),
        );

      setChipRelatedProduct(remappedProduct);
    }
  }, [detail, optionsProduct]);

  const handleCancel = () => router.push(route.article('list'));

  const validateStoryId = storyIdValue !== dummyTextId;
  const validateStoryEn = storyEnValue !== dummyTextEn;
  const { isValid, isDirty } = formState;

  const commonValidation =
    !isValid || !validateStoryId || !validateStoryEn || !chipKeyword.length > 0;

  const validateForm = id ? commonValidation : commonValidation || !isDirty;

  return {
    chipKeyword,
    chipRelatedProduct,
    control,
    confirmAdd,
    detail,
    formState,
    handleCancel,
    handleEditStory,
    handleGetStory,
    handleSubmit,
    handleSwap,
    id,
    isLoading,
    image,
    languages,
    loadingCategory,
    loadingProduct,
    onKeyDownKeyword,
    onDeleteChipKeyword,
    onDeleteChipRelatedProduct,
    optionsCategory,
    optionsProduct,
    setTab,
    story,
    storyIdValue,
    storyEnValue,
    tab,
    validateForm,
    watchTranslate,
  };
};

export default useActions;
