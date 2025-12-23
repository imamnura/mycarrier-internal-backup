import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultConfirm } from '@constants/dialogDefaultValue';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { languages, defaultValueForm, messageSuccess } from '../constant';
import { validation } from '../yupResolver';
import { getSteps, create_UUID, slugValidate, validatePixel } from '../utils';
import {
  payloadL0Information,
  payloadL0Content,
  payloadL1Information,
  payloadL1Content,
  payloadL2Information,
  payloadL2Content,
} from './payload';
import { normalizeEditData } from './normalizaEdit';
import {
  createProduct,
  getMedia,
  deleteMedia,
} from '../../_repositories/repositories';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import {
  L0ContentPage,
  L1ContentPage,
  L2ContentPage,
} from './validateContentPage';

const useActions = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { enqueueSnackbar } = useSnackbar();

  const formType = query.type ? query.type : 'full';
  const editLevel = query.level;
  const steps = getSteps(formType, editLevel?.slice(-1));

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const [disableAction, setDisableAction] = useState(false);
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState(languages[0].value);
  const [level, setLevel] = useState(editLevel ? editLevel : 'l0');
  const [iconFile, setIconFile] = useState(null);
  const [keywordChip, setKeywordChip] = useState([]);
  const [l0KeywordChip, setL0KeywordChip] = useState([]);
  const [l1KeywordChip, setL1KeywordChip] = useState([]);
  const [l2KeywordChip, setL2KeywordChip] = useState([]);
  const [l2CategoryChip, setL2CategoryChip] = useState([]);
  const [confirmation, setConfirmation] = useState(defaultConfirm);
  const [iconFileTemp, _setIconFileTemp] = useState(null);
  const [dataInformation, setDataInformation] = useState({});
  const [dataContent, setDataContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [openPreview, setOpenPreview] = useState(false);

  // L0 State
  const [productServicesData, setProductServicesData] = useState({
    id: [],
    en: [],
  });
  const [l0Banner, setL0Banner] = useState(null);

  // L1 State
  const [productDetailsData, setProductDetailsData] = useState({
    id: [],
    en: [],
  });
  const [l1Banner, setL1Banner] = useState(null);

  // L2 State
  // const [l2TypeList, setL2TypeList] = useState([]);
  const [l2TypeListid, setL2TypeListid] = useState([]);
  const [l2TypeListen, setL2TypeListen] = useState([]);
  const [l2ProductBenefits, setL2ProductBenefits] = useState([]);
  const [l2Documents, setL2Documents] = useState([]);
  const [l2MappingOptions, setL2MappingOptions] = useState([]);
  const [l2Hero, setL2Hero] = useState(null);

  // sectionDisabled state
  const [isDisplayProductType, setIsDisplayProductType] = useState(true);
  const [isDisplayProductBenefits, setIsDisplayProductBenefits] =
    useState(true);
  const [isDisplayProductSpesifications, setIsDisplayProductSpesifications] =
    useState(true);
  const [isDisplayProductQuality, setIsDisplayProductQuality] = useState(true);
  const [isDisplayProductGuarantee, setIsDisplayProductGuarantee] =
    useState(true);
  const [
    isDisplayProductMarketingToolkit,
    setIsDisplayProductMarketingToolkit,
  ] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [filterSectionTree, setFilterSectionTree] = useState({
    value: '',
    label: 'Section Tree',
  });

  const {
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    watch,
    reset,
    resetField,
    setError,
    clearErrors,
    trigger,
  } = useForm({
    resolver: yupResolver(validation(steps[step], formType, query)),
    mode: 'all',
    defaultValues: defaultValueForm,
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control, name: 'test' },
  );

  const {
    fields: productDetailsFieldsId,
    append: productDetailsAppendId,
    remove: productDetailsRemoveId,
  } = useFieldArray({
    control,
    name: 'productDetailsId',
    defaultValues: {
      productDetailsId: [],
    },
  });

  const {
    fields: productDetailsFieldsEn,
    append: productDetailsAppendEn,
    remove: productDetailsRemoveEn,
  } = useFieldArray({
    control,
    name: 'productDetailsEn',
    defaultValues: {
      productDetailsEn: [],
    },
  });

  //validation Button NextStep
  const validateIconL0 = getValues('iconL0');
  const validateFormState = !formState.isDirty || !formState.isValid;

  const isNextDisable = () => {
    switch (steps[step]) {
      case 'L0 - Product Information':
        if (formType === 'edit') {
          return (
            !formState.isValid ||
            !validateIconL0?.mediaPath ||
            !l0KeywordChip.length > 0
          );
        }
        return (
          validateFormState ||
          !validateIconL0?.mediaPath ||
          !l0KeywordChip.length > 0
        );

      case 'L0 - Content Page':
        if (formType === 'edit') {
          if (dataInformation?.isSingleProduct)
            return !formState.isValid || L2ContentPage(getValues);
        } else {
          if (formType === 'single' || dataInformation?.isSingleProduct) {
            return validateFormState || L2ContentPage(getValues);
          }
        }
        return L0ContentPage(getValues) || validateFormState;

      case 'L1 - Product Information':
        if (formType === 'edit') {
          if (dataInformation?.isSingleProduct) {
            return !formState.isValid || !l1KeywordChip.length > 0;
          }
          return (
            !formState.isValid ||
            !l1KeywordChip.length > 0 ||
            !l2CategoryChip.length > 0
          );
        }
        if (formType === 'create' && query.isSingleProduct === 'true') {
          return !formState.isValid || !l1KeywordChip.length > 0;
        }
        if (formType === 'half') {
          return validateFormState || !l1KeywordChip.length > 0;
        }
        return (
          validateFormState ||
          !l1KeywordChip.length > 0 ||
          !l2CategoryChip.length > 0
        );

      case 'L1 - Content Page':
        if (formType === 'edit') {
          if (formType === 'half' || dataInformation?.isSingleProduct) {
            return !formState.isValid || L2ContentPage(getValues);
          }
        }
        if (
          formType === 'half' ||
          (formType === 'create' && query.isSingleProduct === 'true') ||
          dataInformation?.isSingleProduct
        ) {
          return validateFormState || L2ContentPage(getValues);
        }
        return L1ContentPage(getValues) || validateFormState;

      case 'Product Detail - Product Information':
        if (formType === 'edit') {
          return !formState.isValid || !l2KeywordChip.length > 0;
        }
        return !formState.isValid || !l2KeywordChip.length > 0;

      case 'Product Detail - Content Page':
        if (formType === 'edit') {
          return !formState.isValid || L2ContentPage(getValues);
        }
        return validateFormState || L2ContentPage(getValues);
    }
    return false;
  };

  //Validation Slug in Product Information
  const getProductName = watch(`${level}ProductName`);
  const getSlug = watch(`${level}ProductSlug`);

  useEffect(() => {
    getProductName &&
      setValue(`${level}ProductSlug`, slugValidate(getProductName));
  }, [getProductName]);

  useEffect(() => {
    getSlug && setValue(`${level}ProductSlug`, slugValidate(getSlug));
  }, [getSlug]);
  //End Validation Slug in Product Information

  const onSwitchSection = (nameSection) => {
    nameSection === 'cardWithNumber' &&
      setIsDisplayProductType(!isDisplayProductType);
    nameSection === 'cardWithIcon' &&
      setIsDisplayProductBenefits(!isDisplayProductBenefits);
    nameSection === 'productSpecifications' &&
      setIsDisplayProductSpesifications(!isDisplayProductSpesifications);
    nameSection === 'qualityService' &&
      setIsDisplayProductQuality(!isDisplayProductQuality);
    nameSection === 'cardWithCaption' &&
      setIsDisplayProductGuarantee(!isDisplayProductGuarantee);
    nameSection === 'brochure' &&
      setIsDisplayProductMarketingToolkit(!isDisplayProductMarketingToolkit);
  };

  const sectionTreeOptions = [
    {
      customOption: {
        type: 'star',
      },
      label: 'Product Name & Logo',
      value: 'hero',
    },
    {
      customOption: {
        type: 'star',
      },
      label: 'Product Overview',
      value: 'overview',
    },
    {
      customOption: {
        type: 'star',
      },
      label: 'Product Description',
      value: 'description',
    },
    {
      customOption: {
        onChange: () => onSwitchSection('cardWithNumber'),
        type: 'switch',
        value: isDisplayProductType,
      },
      label: 'Product Types',
    },
    {
      customOption: {
        onChange: () => onSwitchSection('cardWithIcon'),
        type: 'switch',
        value: isDisplayProductBenefits,
      },
      label: 'Product Benefits',
    },
    {
      customOption: {
        onChange: () => onSwitchSection('productSpecifications'),
        type: 'switch',
        value: isDisplayProductSpesifications,
      },
      label: 'Product Specifications',
    },
    {
      customOption: {
        onChange: () => onSwitchSection('qualityService'),
        type: 'switch',
        value: isDisplayProductQuality,
      },
      label: 'Quality of Service',
    },
    {
      customOption: {
        onChange: () => onSwitchSection('cardWithCaption'),
        type: 'switch',
        value: isDisplayProductGuarantee,
      },
      label: 'Service Level Guarantee',
    },
    {
      customOption: {
        onChange: () => onSwitchSection('brochure'),
        type: 'switch',
        value: isDisplayProductMarketingToolkit,
      },
      label: 'Marketing Tool Kit',
    },
    {
      customOption: {
        type: 'star',
      },
      label: 'Talk to Us',
      value: 'talkToUs',
    },
  ];

  const clearConfirmation = () => setConfirmation(defaultConfirm);

  const deleteMediaExisting = async () => {
    try {
      await deleteMedia(`${iconFileTemp.mediaId}`);
      _setIconFileTemp(null);
    } catch (error) {
      setFailedAlert({ message: `Failed to delete icon before` });
    }
  };

  const uploadIcon = async (e) => {
    setLoadingAlert();

    let dataImage = new FormData();
    let fileImage = e;
    const nameImage = fileImage.name.replace(/\s+/g, '-');
    fileImage = new File([fileImage], nameImage, { type: fileImage.type });
    dataImage.append('mediaPath', fileImage);
    dataImage.append('mediaId', create_UUID(true));
    dataImage.append('mediaName', e.name);

    try {
      const { data } = await getMedia(dataImage, 'icon');
      if (data) {
        setIconFile(data);

        iconFileTemp ? deleteMediaExisting() : _setIconFileTemp(data);

        setValue(`l2iconHero`, data.mediaPath);
        setValue(`iconL0`, data);

        setSuccessAlert({ message: 'Icon was successfully uploaded' });
      }
    } catch (error) {
      setFailedAlert({ message: `Failed to Upload Icon` });
    }
  };

  const handleUploadIcon = (e) => {
    const ratioPixel = [64, 64];

    if (e.name.split('.').pop() === 'png') {
      let img = new Image();
      img.src = window?.URL?.createObjectURL(e);
      img.onload = () => {
        validatePixel(
          img.width,
          img.height,
          e,
          setFailedAlert,
          ratioPixel,
          uploadIcon,
        );
      };
    } else {
      uploadIcon(e);
    }
  };

  const handleDeleteKeyword =
    (chipToDelete, type = '') =>
    () => {
      let newChip;
      if (type === 'category') {
        newChip = l2CategoryChip.filter((chip) => chip !== chipToDelete);
        const deletedIndex = l2CategoryChip.findIndex(
          (chip) => chip === chipToDelete,
        );
        setL2CategoryChip(newChip);
        productDetailsRemoveId(deletedIndex);
        productDetailsRemoveEn(deletedIndex);
      } else {
        newChip = keywordChip.filter((chip) => chip !== chipToDelete);
        if (level === 'l0') setL0KeywordChip(newChip);
        if (level === 'l1') setL1KeywordChip(newChip);
        if (level === 'l2') setL2KeywordChip(newChip);
        setKeywordChip(newChip);
      }
    };

  const handleKeyDown = (e, type = '') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let keyword;

      if (type === 'category') {
        keyword = getValues('l2Category');
        if (keyword !== '') {
          if (l2CategoryChip.includes(keyword)) {
            setError('l2Category', {
              type: 'value',
              message: 'Category already exist',
            });
            return;
          }
          setL2CategoryChip([...l2CategoryChip, keyword]);
          productDetailsAppendId({ title: keyword, description: '' });
          productDetailsAppendEn({ title: keyword, description: '' });
        }

        setValue('l2Category', '');
      } else {
        keyword = getValues(`${level}MetaKeyword`);

        if (keyword !== '' && keywordChip.length <= 4) {
          if (level === 'l0') {
            setL0KeywordChip([...l0KeywordChip, keyword]);
            setKeywordChip([...l0KeywordChip, keyword]);
          }
          if (level === 'l1') {
            setL1KeywordChip([...l1KeywordChip, keyword]);
            setKeywordChip([...l1KeywordChip, keyword]);
          }
          if (level === 'l2') {
            setL2KeywordChip([...l2KeywordChip, keyword]);
            setKeywordChip([...l2KeywordChip, keyword]);
          }

          setValue(`${level}MetaKeyword`, '');
        }
      }
    }
  };

  const triggerSubmitL0Information = async (saveAsDraft) => {
    const getL0Information = JSON.parse(localStorage.getItem('l0Information'));
    const payloadInfo = payloadL0Information(
      l0KeywordChip,
      formType,
      iconFile,
      getValues,
      getL0Information,
    );
    const checkIsDisplay =
      formType === 'full' ||
      formType === 'half' ||
      formType === 'single' ||
      formType === 'create' ||
      saveAsDraft
        ? false
        : true;

    const payload = {
      ...payloadInfo,
      isDisplay: checkIsDisplay,
    };

    const isEditL0Information = getL0Information?.catId || null;

    const getItemLoInformation = {
      name: getL0Information?.name || '',
      slug: getL0Information?.slug || '',
      metaSeo: getL0Information?.metaSeo || {},
      type: getL0Information?.type || '',
      level: getL0Information?.level || '',
      parentId: getL0Information?.parentId || null,
      iconUrl: getL0Information?.iconUrl || '',
      isDisplay: getL0Information?.isDisplay,
    };

    const isChange = !_.isEqual(payload, getItemLoInformation);

    const payloadEdit = {
      id: `${getL0Information?.catId}`,
      name: payload.name,
      metaSeo: payload.metaSeo,
      iconUrl: payload.iconUrl,
      slug: payload.slug,
    };

    if (isChange) {
      setIsLoading(true);
      try {
        const { data, success } = await createProduct(
          isEditL0Information ? payloadEdit : payload,
          isEditL0Information ? 'PUT' : 'POST',
        );

        if (success) {
          localStorage.setItem('l0Information', JSON.stringify(data));

          if (saveAsDraft) {
            enqueueSnackbar(`Product saved as draft.`);
            setTimeout(() => {
              router.push('/product-management');
            }, 1500);
          } else {
            if (formType === 'single' || dataInformation?.isSingleProduct)
              setLevel('l2');
            setStep(step + 1);
            setTab('id');
          }
        }

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setFailedAlert({
          message:
            typeof e?.message !== 'object'
              ? e?.message
              : `Failed to create product`,
        });
      }
    } else {
      if (formType === 'single' || dataInformation?.isSingleProduct)
        setLevel('l2');
      setStep(step + 1);
      setTab('id');
    }
  };

  const triggerSubmitL0Content = async (saveAsDraft) => {
    const payloadContent = payloadL0Content(getValues);

    const getL0Information = JSON.parse(localStorage.getItem('l0Information'));
    const payload = {
      id: `${getL0Information?.catId}`,
      isDisplay: true,
      localizations: payloadContent,
    };

    setIsLoading(true);
    try {
      const { data, success } = await createProduct(payload, 'PUT');

      if (success) {
        if (saveAsDraft) {
          enqueueSnackbar(`Product saved as draft.`);
          setTimeout(() => {
            router.push('/product-management');
          }, 1500);
        } else {
          if (formType === 'edit') {
            setSuccessAlert({
              message: messageSuccess(formType, level),
              onClose: () => router.push('/product-management'),
            });
          } else {
            setLevel('l1');
            setStep(step + 1);
          }
        }
      }

      localStorage.setItem('l0Content', JSON.stringify(data));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setFailedAlert({ message: `Failed to create product` });
    }

    // setLevel('l1');
    // setStep(step+1);
  };

  const confirmContent = (submitFunc) => {
    const confirm = {
      content: `Are you sure want to edit this ${
        level === 'l2' ? 'product detail' : `level ${level.substring(1)}`
      } page?`,
      actions: [
        { label: 'No', action: () => clearConfirmation() },
        {
          label: 'Yes',
          action: async () => {
            clearConfirmation();
            await submitFunc();
          },
        },
      ],
    };

    setConfirmation(confirm);
  };

  const triggerSubmitL1Information = async (saveAsDraft) => {
    const category =
      formType !== 'half' ? l2CategoryChip : [getValues('l0ProductName')];
    const getL0Information = JSON.parse(localStorage.getItem('l0Information'));
    const getL1Information = JSON.parse(localStorage.getItem('l1Information'));
    const checkIsDisplay =
      formType === 'full' ||
      formType === 'half' ||
      formType === 'single' ||
      formType === 'create' ||
      saveAsDraft
        ? false
        : true;

    let isSingleProduct = false;
    if (formType === 'half') isSingleProduct = true;
    else isSingleProduct = false;
    if (formType === 'edit') isSingleProduct = getL1Information.isSingleProduct;
    if (formType === 'create')
      isSingleProduct = query.isSingleProduct === 'true';

    let iconChanged;
    const iconPath = getValues(`l2iconHero`);
    const iconName = iconPath && iconPath.split('/').pop();
    if (iconPath) {
      if (formType === 'half' || query.isSingleProduct === 'true') {
        iconChanged = {
          iconUrl: {
            fileName: iconName || '',
            fileUrl: iconPath || '',
          },
        };
      }
    }

    const payloadInformation = payloadL1Information(
      l1KeywordChip,
      category,
      getValues,
      getL0Information,
      getL1Information,
    );

    const payload = {
      ...payloadInformation,
      parentId: formType === 'create' ? query.id : payloadInformation.parentId,
      isSingleProduct: isSingleProduct,
      isDisplay: checkIsDisplay,
      ...iconChanged,
    };

    const isEditL1Information = getL1Information?.catId || null;

    const getItemL1Information = {
      name: getL1Information?.name || '',
      slug: getL1Information?.slug || '',
      metaSeo: getL1Information?.metaSeo || '',
      level: getL1Information?.level || '',
      parentId: getL1Information?.parentId || null,
      isSingleProduct: getL1Information?.isSingleProduct,
      isDisplay: getL1Information?.isDisplay,
    };

    const isChange = !_.isEqual(payload, getItemL1Information);

    const payloadEdit = {
      id: `${getL1Information?.catId}`,
      name: payload.name,
      metaSeo: payload.metaSeo,
      productCategory: payload.productCategory,
      slug: payload.slug,
    };

    if (isChange) {
      setIsLoading(true);
      try {
        const { data, success } = await createProduct(
          isEditL1Information ? payloadEdit : payload,
          isEditL1Information ? 'PUT' : 'POST',
        );

        if (success) {
          localStorage.setItem('l1Information', JSON.stringify(data));
          if (saveAsDraft) {
            enqueueSnackbar(`Product saved as draft.`);
            setTimeout(() => {
              router.push('/product-management');
            }, 1500);
          } else {
            if (
              formType === 'half' ||
              dataInformation?.isSingleProduct ||
              query.isSingleProduct === 'true'
            )
              setLevel('l2');
            setStep(step + 1);
            setTab('id');
          }
        }

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setFailedAlert({
          message:
            typeof e?.message !== 'object'
              ? e?.message
              : `Failed to create product`,
        });
      }
    } else {
      if (formType === 'half' || dataInformation?.isSingleProduct)
        setLevel('l2');
      setStep(step + 1);
      setTab('id');
    }
  };

  const triggerSubmitL1Content = async (saveAsDraft) => {
    const payloadContent = payloadL1Content(getValues);

    const getL1Information = JSON.parse(localStorage.getItem('l1Information'));

    const payload = {
      id: `${getL1Information?.catId}`,
      isDisplay: true,
      localizations: payloadContent,
    };

    // Set Option List in Product Detail - Product Information':'
    const l2Dropdown = [];
    productDetailsFieldsId.forEach((v) => {
      l2Dropdown.push({
        value: v.title,
        label: v.title,
      });
    });
    setL2MappingOptions(l2Dropdown);

    setIsLoading(true);
    try {
      const { data, success } = await createProduct(payload, 'PUT');

      if (success) {
        if (saveAsDraft) {
          enqueueSnackbar(`Product saved as draft.`);
          setTimeout(() => {
            router.push('/product-management');
          }, 1500);
        } else {
          if (formType === 'edit' || formType === 'create') {
            setSuccessAlert({
              message: messageSuccess(formType, level),
              onClose: () => router.push('/product-management'),
            });
          } else {
            setLevel('l2');
            setStep(step + 1);
          }
        }
      }

      localStorage.setItem('l1Content', JSON.stringify(data));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(true);
      setFailedAlert({
        message:
          typeof e?.message !== 'object'
            ? e?.message
            : `Failed to create product`,
      });
    }

    // setLevel('l2');
    // setStep(step+1);
  };

  const triggerSubmitL2Information = async (saveAsDraft) => {
    const getL2Information = JSON.parse(localStorage.getItem('l2Information'));
    const checkIsDisplay =
      formType === 'full' ||
      formType === 'half' ||
      formType === 'single' ||
      formType === 'create' ||
      saveAsDraft
        ? false
        : true;
    const payloadInformation = payloadL2Information(
      l2KeywordChip,
      formType,
      getValues,
    );

    let iconChanged;
    const iconPath = getValues(`l2iconHero`);
    const iconName = iconPath && iconPath.split('/').pop();
    if (iconPath) {
      iconChanged = {
        iconUrl: {
          fileName: iconName || '',
          fileUrl: iconPath || '',
        },
      };
    }

    const payload = {
      ...payloadInformation,
      isDisplay: checkIsDisplay,
      ...iconChanged,
    };

    const isEditL2Information = getL2Information?.catId || null;

    const getItemL2Information = {
      name: getL2Information?.name || '',
      slug: getL2Information?.slug || '',
      metaSeo: getL2Information?.metaSeo || '',
      type: getL2Information?.type || '',
      level: getL2Information?.level || '',
      parentId: getL2Information?.parentId || null,
      isDisplay: getL2Information?.isDisplay,
      iconUrl: getL2Information?.iconUrl || null,
    };

    const isChange = !_.isEqual(payload, getItemL2Information);

    const payloadEdit = {
      id: `${getL2Information?.catId}`,
      name: payload.name,
      slug: payload.slug,
      metaSeo: payload.metaSeo,
      parentId: payload.parentId,
    };

    if (isChange) {
      setIsLoading(true);
      try {
        const { data, success } = await createProduct(
          isEditL2Information ? payloadEdit : payload,
          isEditL2Information ? 'PUT' : 'POST',
        );

        if (success) {
          localStorage.setItem('l2Information', JSON.stringify(data));

          if (saveAsDraft) {
            enqueueSnackbar(`Product saved as draft.`);
            setTimeout(() => {
              router.push('/product-management');
            }, 1500);
          } else {
            setStep(step + 1);
            setTab('id');
          }
        }

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);

        setFailedAlert({
          message:
            typeof e?.message !== 'object'
              ? e?.message
              : `Failed to create product`,
        });
      }
    } else {
      setStep(step + 1);
      setTab('id');
    }

    // setStep(step+1);
    // setTab('id');
  };

  const payloadDisableSection = {
    productType: isDisplayProductType,
    productBenefits: isDisplayProductBenefits,
    productSpesifications: isDisplayProductSpesifications,
    productQuality: isDisplayProductQuality,
    productGuarantee: isDisplayProductGuarantee,
    productMarketingToolkit: isDisplayProductMarketingToolkit,
  };

  const fetchAllProducts = async (saveAsDraft) => {
    const getL2Information = JSON.parse(localStorage.getItem('l2Information'));
    const getL1Information = JSON.parse(localStorage.getItem('l1Information'));
    const getL0Information = JSON.parse(localStorage.getItem('l0Information'));

    const payloadContent = payloadL2Content(
      getValues,
      payloadDisableSection,
      getL0Information,
      formType,
    );

    let catId = '';
    if (dataInformation?.isSingleProduct) {
      catId = getL0Information
        ? `${getL0Information?.catId}`
        : `${getL1Information?.catId}`;
    } else if (formType === 'single') {
      catId = `${getL0Information?.catId}`;
    } else if (formType === 'half') {
      catId = `${getL1Information?.catId}`;
    } else if (formType === 'create' && query.isSingleProduct === 'true') {
      catId = `${getL1Information?.catId}`;
    } else {
      catId = `${getL2Information?.catId}`;
    }

    // icon change in L2 content or PDP
    let iconChanged;
    const iconPath = getValues(`l2iconHero`);
    const iconName = iconPath && iconPath.split('/').pop();
    if (iconPath) {
      if (
        iconPath !== getL0Information?.iconUrl?.fileUrl ||
        formType === 'full' ||
        formType === 'half' ||
        formType === 'single'
      ) {
        iconChanged = {
          iconUrl: {
            fileName: iconName || '',
            fileUrl: iconPath || '',
          },
        };
      }
    } else if (formType === 'create') {
      iconChanged = {
        iconUrl: { ...getL0Information?.iconUrl },
      };
    }

    const payload = {
      id: catId,
      localizations: payloadContent,
      documents: l2Documents,
      isDisplay: true,
      ...iconChanged,
    };

    let catIdPublish = '';
    if (dataInformation?.isSingleProduct) {
      catIdPublish = getL0Information
        ? getL0Information?.catId
        : getL1Information?.parentId;
    } else if (formType === 'create' && query.isSingleProduct === 'true') {
      catIdPublish = query.id;
    } else catIdPublish = getL0Information?.catId || getL2Information?.catIdl0;

    const payloadChangePublish = {
      id: `${catIdPublish}`,
      status: 'publish',
    };

    saveAsDraft ? setIsLoading(true) : setLoadingAlert();

    try {
      const { success } = await createProduct(payload, 'PUT');

      //Update L0 status publish
      let result;
      if (!saveAsDraft) {
        result = await createProduct(payloadChangePublish, 'PUT');
      }

      if (success) {
        if (saveAsDraft) {
          setIsLoading(false);
          enqueueSnackbar(`Product saved as draft.`);
          setTimeout(() => {
            router.push('/product-management');
          }, 1500);
        }
        if (result?.success) {
          localStorage.removeItem('l0Information');
          localStorage.removeItem('l0Content');
          localStorage.removeItem('l1Information');
          localStorage.removeItem('l1Content');
          localStorage.removeItem('l2Information');
          const levelCustom =
            formType === 'edit' || formType === 'create' ? query.level : '';
          setSuccessAlert({
            message: messageSuccess(formType, levelCustom),
            onClose: () => router.push('/product-management'),
          });
        }
      }
    } catch (e) {
      setFailedAlert({
        message:
          typeof e?.message !== 'object'
            ? e?.message
            : `All Page (Level 0, Level 1, Level 2 Category & Product Detail) was failed submitted`,
      });
    }
  };

  const triggerSubmitL2Content = async (saveAsDraft) => {
    if (saveAsDraft) {
      await fetchAllProducts(saveAsDraft);
    } else {
      const confirm = {
        content: 'Are you sure want to submit all page?',
        actions: [
          { label: 'No', action: () => clearConfirmation() },
          {
            label: 'Yes',
            action: async () => {
              clearConfirmation();
              await fetchAllProducts(saveAsDraft);
            },
          },
        ],
      };

      setConfirmation(confirm);
    }
  };

  const handleAddProduct = async (saveAsDraft = false) => {
    const stepName = steps[step];

    if (formType === 'full') {
      switch (stepName) {
        case 'L0 - Product Information':
          return await triggerSubmitL0Information(saveAsDraft);
        case 'L0 - Content Page':
          return await triggerSubmitL0Content(saveAsDraft);
        case 'L1 - Product Information':
          return await triggerSubmitL1Information(saveAsDraft);
        case 'L1 - Content Page':
          return await triggerSubmitL1Content(saveAsDraft);
        case 'Product Detail - Product Information':
          return await triggerSubmitL2Information(saveAsDraft);
        case 'Product Detail - Content Page':
          return await triggerSubmitL2Content(saveAsDraft);
      }
    }

    if (formType === 'half') {
      switch (stepName) {
        case 'L0 - Product Information':
          return await triggerSubmitL0Information(saveAsDraft);
        case 'L0 - Content Page':
          return await triggerSubmitL0Content(saveAsDraft);
        case 'L1 - Product Information':
          return await triggerSubmitL1Information(saveAsDraft);
        case 'L1 - Content Page':
          return await triggerSubmitL2Content(saveAsDraft);
      }
    }

    if (formType === 'single') {
      switch (stepName) {
        case 'L0 - Product Information':
          return await triggerSubmitL0Information(saveAsDraft);
        case 'L0 - Content Page':
          return await triggerSubmitL2Content(saveAsDraft);
      }
    }

    if (formType === 'edit') {
      if (dataInformation?.isSingleProduct) {
        if (level === 'l0') {
          switch (stepName) {
            case 'L0 - Product Information':
              return await triggerSubmitL0Information(saveAsDraft);
          }
        }

        if (level === 'l1') {
          switch (stepName) {
            case 'L1 - Product Information':
              return await triggerSubmitL1Information(saveAsDraft);
          }
        }

        if (level === 'l2') {
          switch (stepName) {
            case 'L0 - Content Page':
            case 'L1 - Content Page':
              return confirmContent(fetchAllProducts);
          }
        }
      }

      if (level === 'l0') {
        switch (stepName) {
          case 'L0 - Product Information':
            return await triggerSubmitL0Information(saveAsDraft);
          case 'L0 - Content Page':
            return confirmContent(triggerSubmitL0Content);
        }
      }

      if (level === 'l1') {
        switch (stepName) {
          case 'L1 - Product Information':
            return await triggerSubmitL1Information(saveAsDraft);
          case 'L1 - Content Page':
            return confirmContent(triggerSubmitL1Content);
        }
      }

      if (level === 'l2') {
        switch (stepName) {
          case 'Product Detail - Product Information':
            return await triggerSubmitL2Information(saveAsDraft);
          case 'Product Detail - Content Page':
            return confirmContent(fetchAllProducts);
        }
      }
    }

    if (formType === 'create') {
      if (query.level === 'l1') {
        switch (stepName) {
          case 'L1 - Product Information':
            return await triggerSubmitL1Information(saveAsDraft);
          case 'L1 - Content Page':
            if (query.isSingleProduct === 'true') {
              return confirmContent(fetchAllProducts);
            }
            return confirmContent(triggerSubmitL1Content);
        }
      }

      if (query.level === 'l2') {
        switch (stepName) {
          case 'Product Detail - Product Information':
            return await triggerSubmitL2Information(saveAsDraft);
          case 'Product Detail - Content Page':
            return confirmContent(fetchAllProducts);
        }
      }
    }
  };

  const previousButton = () => {
    const stepName = steps[step];

    switch (stepName) {
      case 'L0 - Content Page':
        if (formType === 'single' || dataInformation?.isSingleProduct)
          setLevel('l0');
        setStep(step - 1);
        return;
      case 'L1 - Product Information':
        setLevel('l0');
        setStep(step - 1);
        setTab('id');
        return;
      case 'L1 - Content Page':
        if (
          formType === 'half' ||
          dataInformation?.isSingleProduct ||
          query.isSingleProduct === 'true'
        )
          setLevel('l1');
        setStep(step - 1);
        return;
      case 'Product Detail - Product Information':
        setLevel('l1');
        setStep(step - 1);
        setTab('id');
        return;
      case 'Product Detail - Content Page':
        // if(formType === 'half') setLevel('l1');
        // if(formType === 'single') setLevel('l0');
        // setTab('id');
        setStep(step - 1);
        return;
    }
  };

  const getKeywordChip = () => {
    if (level === 'l0') setKeywordChip(l0KeywordChip);
    if (level === 'l1') setKeywordChip(l1KeywordChip);
    if (level === 'l2') setKeywordChip(l2KeywordChip);
  };

  useEffect(() => {
    if (query.type === 'edit') {
      setDataInformation(
        normalizeEditData(
          JSON.parse(localStorage.getItem(`${level}Information`)),
          query.level,
          'information',
          getValues,
        ),
      );
      setDataContent(
        normalizeEditData(
          JSON.parse(localStorage.getItem(`${level}Content`)),
          query.level,
          'content',
          getValues,
        ),
      );
    }

    if (query.type === 'create') {
      if (query.level === 'l2') {
        setValue('l2Mapping', query.id);
      }
    }
  }, [isReady]);

  useEffect(() => {
    if (editLevel) {
      setLevel(editLevel);
    }
  }, [editLevel]);

  useEffect(() => {
    getKeywordChip();
  }, [step]);

  useEffect(() => {
    if (query.type === 'edit') {
      reset({
        ...dataInformation,
        ...dataContent,
      });

      if (Object.keys(dataInformation).length > 0) {
        if (level === 'l0') {
          setIconFile(dataInformation?.iconUrl);
          setKeywordChip(dataInformation?.keyword);
          setIconFile({
            mediaName: dataInformation?.iconUrl?.fileName,
            mediaPath: dataInformation?.iconUrl?.fileUrl,
          });
          setL0KeywordChip(dataInformation?.keyword);
          setProductServicesData(dataContent?.cardList);

          if (dataInformation?.isSingleProduct) {
            setL2Documents(dataContent?.l2documentsList);
            setIsDisplayProductType(dataContent?.l2TypeStatus);
            setIsDisplayProductBenefits(dataContent?.l2BenefitStatus);
            setIsDisplayProductSpesifications(
              dataContent?.l2ProductSpesificationStatus,
            );
            setIsDisplayProductQuality(dataContent?.l2QualityServiceStatus);
            setIsDisplayProductGuarantee(dataContent?.l2GuaranteeStatus);
            setIsDisplayProductMarketingToolkit(dataContent?.l2documentsStatus);
          }
        }

        if (level === 'l1') {
          setKeywordChip(dataInformation?.keyword);
          setL1KeywordChip(dataInformation?.keyword);
          setL2CategoryChip(dataInformation?.categoryName);

          const categoryMapping = [];
          dataInformation?.categoryName.map((v) => {
            categoryMapping.push({
              title: v,
              description: '',
            });
          });

          if (dataContent?.productDetailDataId?.length > 0) {
            productDetailsAppendId(dataContent?.productDetailDataId);
          } else {
            productDetailsAppendId(categoryMapping);
          }

          if (dataContent?.productDetailDataEn?.length > 0) {
            productDetailsAppendEn(dataContent?.productDetailDataEn);
          } else {
            productDetailsAppendEn(categoryMapping);
          }
          setProductDetailsData(dataContent?.cardList);

          if (dataInformation?.isSingleProduct) {
            setL2Documents(dataContent?.l2documentsList);
            setIsDisplayProductType(dataContent?.l2TypeStatus);
            setIsDisplayProductBenefits(dataContent?.l2BenefitStatus);
            setIsDisplayProductSpesifications(
              dataContent?.l2ProductSpesificationStatus,
            );
            setIsDisplayProductQuality(dataContent?.l2QualityServiceStatus);
            setIsDisplayProductGuarantee(dataContent?.l2GuaranteeStatus);
            setIsDisplayProductMarketingToolkit(dataContent?.l2documentsStatus);
          }
        }

        if (level === 'l2') {
          setKeywordChip(dataInformation?.keyword);
          setL2KeywordChip(dataInformation?.keyword);
          setL2MappingOptions(dataInformation?.mappingList);
          setL2Documents(dataContent?.l2documentsList);
          setIsDisplayProductType(dataContent?.l2TypeStatus);
          setIsDisplayProductBenefits(dataContent?.l2BenefitStatus);
          setIsDisplayProductSpesifications(
            dataContent?.l2ProductSpesificationStatus,
          );
          setIsDisplayProductQuality(dataContent?.l2QualityServiceStatus);
          setIsDisplayProductGuarantee(dataContent?.l2GuaranteeStatus);
          setIsDisplayProductMarketingToolkit(dataContent?.l2documentsStatus);
        }
      }
    }
  }, [dataInformation, dataContent]);

  useEffect(() => {
    if (
      (step === 0 &&
        Boolean(getValues('l0ProductName')) &&
        formType !== 'edit') ||
      (step === 2 &&
        Boolean(getValues('l1ProductName')) &&
        formType === 'full') ||
      (step === 4 &&
        Boolean(getValues('l2ProductName')) &&
        formType === 'full') ||
      (step === 2 &&
        Boolean(getValues('l2ProductName')) &&
        formType === 'half') ||
      (step === 0 &&
        Boolean(getValues('l2ProductName')) &&
        formType === 'create') ||
      (step === 0 &&
        Boolean(getValues('l1ProductName')) &&
        formType === 'create')
    ) {
      trigger();
    }
  }, [step]);

  const handleCancel = () => router.push('/product-management');

  return {
    dataInformation,
    dataContent,
    formType,
    steps,
    step,
    setStep,
    tab,
    setTab,
    level,
    setLevel,
    iconFile,
    setIconFile,
    handleUploadIcon,
    keywordChip,
    productDetailsData,
    l2CategoryChip,
    l2MappingOptions,
    control,
    formState,
    handleSubmit,
    setValue,
    getValues,
    watch,
    resetField,
    clearErrors,
    handleAddProduct,
    handleDeleteKeyword,
    handleKeyDown,
    confirmation,
    clearConfirmation,
    // l2TypeState: { l2TypeList, setL2TypeList },
    l2TypeState: {
      l2TypeListid,
      setL2TypeListid,
      l2TypeListen,
      setL2TypeListen,
    },
    l2BenefitState: { l2ProductBenefits, setL2ProductBenefits },
    l2DocumentState: { l2Documents, setL2Documents },
    productServicesData,
    openPreview,
    setOpenPreview,
    previousButton,
    l0Banner: {
      _file: l0Banner,
      _setFile: setL0Banner,
    },
    l1Banner: {
      _file: l1Banner,
      _setFile: setL1Banner,
    },
    l2Hero: {
      _file: l2Hero,
      _setFile: setL2Hero,
    },

    //Validation Button
    disableAction,
    setDisableAction,
    isNextDisable,
    isLoading,
    handleCancel,

    //form array
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    productDetailsFieldsId,
    productDetailsFieldsEn,

    //validation sectionDisabled
    isDisplayProductType,
    setIsDisplayProductType,
    isDisplayProductBenefits,
    setIsDisplayProductBenefits,
    isDisplayProductSpesifications,
    setIsDisplayProductSpesifications,
    isDisplayProductQuality,
    setIsDisplayProductQuality,
    isDisplayProductGuarantee,
    setIsDisplayProductGuarantee,
    isDisplayProductMarketingToolkit,
    setIsDisplayProductMarketingToolkit,

    filterSectionTree: {
      options: sectionTreeOptions,
      value: filterSectionTree,
    },
  };
};

export default useActions;
