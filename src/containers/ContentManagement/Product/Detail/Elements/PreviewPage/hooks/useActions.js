import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { defaultValueForm } from '../../../../Add-v2/constant';
import { normalizeEditData } from '../../../../Add-v2/hooks/normalizaEdit';

const useActions = (props) => {
  const {
    data,
    levelDetail,
    stepDetail,
    openPreviewState: { openPreview, setOpenPreview },
  } = props;

  const formType = 'edit';
  const steps = [
    'L0 - Product Information',
    'L0 - Content Page',
    'L1 - Product Information',
    'L1 - Content Page',
    'Product Detail - Product Information',
    'Product Detail - Content Page',
  ];

  const [tab, setTab] = useState('id');
  // eslint-disable-next-line no-unused-vars
  const [step, setStep] = useState(stepDetail);
  const [level, setLevel] = useState(levelDetail ? levelDetail : 'l0');
  const [dataInformation, setDataInformation] = useState({});
  const [dataContent, setDataContent] = useState({});

  // L0 State
  const [productServicesData, setProductServicesData] = useState({
    id: [],
    en: [],
  });

  // L1 State
  const [productDetailsData, setProductDetailsData] = useState({
    id: [],
    en: [],
  });

  // L2 State
  const [l2TypeListid, setL2TypeListid] = useState([]);
  const [l2TypeListen, setL2TypeListen] = useState([]);
  const [l2ProductBenefits, setL2ProductBenefits] = useState([]);
  const [l2Documents, setL2Documents] = useState([]);

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

  const { control, formState, getValues, setValue, watch, reset, resetField } =
    useForm({
      mode: 'all',
      defaultValues: defaultValueForm,
    });

  const { fields: productDetailsFieldsId, append: productDetailsAppendId } =
    useFieldArray({
      control,
      name: 'productDetailsId',
      defaultValues: {
        productDetailsId: [],
      },
    });

  const { fields: productDetailsFieldsEn, append: productDetailsAppendEn } =
    useFieldArray({
      control,
      name: 'productDetailsEn',
      defaultValues: {
        productDetailsEn: [],
      },
    });

  useEffect(() => {
    setDataInformation(
      normalizeEditData(data, levelDetail, 'information', getValues),
    );
    setDataContent(
      normalizeEditData(data?.localizations, levelDetail, 'content', getValues),
    );
  }, []);

  useEffect(() => {
    if (levelDetail) {
      setLevel(levelDetail);
    }
  }, [levelDetail]);

  useEffect(() => {
    if (Object.keys(dataInformation).length > 0) {
      reset({
        ...dataInformation,
        ...dataContent,
      });

      if (level === 'l0') {
        if (dataInformation?.isSingleProduct) {
          // If PDP
          setL2Documents(dataContent?.l2documentsList);
          setIsDisplayProductType(dataContent?.l2TypeStatus);
          setIsDisplayProductBenefits(dataContent?.l2BenefitStatus);
          setIsDisplayProductSpesifications(
            dataContent?.l2ProductSpesificationStatus,
          );
          setIsDisplayProductQuality(dataContent?.l2QualityServiceStatus);
          setIsDisplayProductGuarantee(dataContent?.l2GuaranteeStatus);
          setIsDisplayProductMarketingToolkit(dataContent?.l2documentsStatus);
        } else {
          // l0 content
          setProductServicesData(dataContent?.cardList);
        }
      }

      if (level === 'l1') {
        if (dataInformation?.isSingleProduct) {
          // If PDP
          setL2Documents(dataContent?.l2documentsList);
          setIsDisplayProductType(dataContent?.l2TypeStatus);
          setIsDisplayProductBenefits(dataContent?.l2BenefitStatus);
          setIsDisplayProductSpesifications(
            dataContent?.l2ProductSpesificationStatus,
          );
          setIsDisplayProductQuality(dataContent?.l2QualityServiceStatus);
          setIsDisplayProductGuarantee(dataContent?.l2GuaranteeStatus);
          setIsDisplayProductMarketingToolkit(dataContent?.l2documentsStatus);
        } else {
          // L1 Content
          const categoryMapping = [];
          dataInformation?.categoryName.map((v) => {
            categoryMapping.push({
              title: v,
              description: '',
            });
          });

          if (dataContent?.productDetailDataId?.length > 0) {
            productDetailsAppendId(dataContent?.productDetailDataId);
            productDetailsAppendEn(dataContent?.productDetailDataEn);
          } else {
            productDetailsAppendId(categoryMapping);
            productDetailsAppendEn(categoryMapping);
          }

          setProductDetailsData(dataContent?.cardList);
        }
      }

      if (level === 'l2') {
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
  }, [dataInformation, dataContent]);

  return {
    // config state
    formType,
    steps,
    step,
    level,
    tab,
    setTab,
    openPreview,
    setOpenPreview,
    control,
    formState,
    setValue,
    getValues,
    watch,
    resetField,

    // data
    data,
    dataInformation,

    // content page state
    productDetailsData,
    l2TypeState: {
      l2TypeListid,
      setL2TypeListid,
      l2TypeListen,
      setL2TypeListen,
    },
    l2BenefitState: { l2ProductBenefits, setL2ProductBenefits },
    l2DocumentState: { l2Documents, setL2Documents },
    productServicesData,

    // content page form array
    productDetailsFieldsId,
    productDetailsFieldsEn,

    // display state
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
  };
};

export default useActions;
