import React from 'react';
import PropTypes from 'prop-types';
import PageViewer from '../../../Add-v2/lib/PageViewer';
import useActions from './hooks/useActions';

import L0ContentPage from '../../../Add-v2/lib/L0ContentPage';
import L1ContentPage from '../../../Add-v2/lib/L1ContentPage';
import L2ContentPage from '../../../Add-v2/lib/L2ContentPage';

const PreviewPage = (props) => {
  const {
    data,
    dataInformation,
    formType,
    steps,
    step,
    level,
    tab,
    setTab,
    productDetailsData,
    control,
    formState,
    setValue,
    getValues,
    watch,
    resetField,
    l2TypeState,
    l2BenefitState,
    l2DocumentState,
    productServicesData,
    openPreview,
    setOpenPreview,
    productDetailsFieldsId,
    productDetailsFieldsEn,
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
  } = useActions(props);

  const languages = [
    {
      label: 'Bahasa Indonesia',
      value: 'id',
    },
    {
      label: 'English',
      value: 'en',
    },
  ];

  const tabsProps = {
    variant: 'centered',
    options: languages,
    value: tab,
    onChange: setTab,
  };

  const formRender = () => {
    if (level === 'l0') {
      if (dataInformation.isSingleProduct) {
        return (
          <L2ContentPage
            formType={formType}
            isDisplayProductBenefits={isDisplayProductBenefits}
            isDisplayProductGuarantee={isDisplayProductGuarantee}
            isDisplayProductMarketingToolkit={isDisplayProductMarketingToolkit}
            isDisplayProductQuality={isDisplayProductQuality}
            isDisplayProductSpesifications={isDisplayProductSpesifications}
            isDisplayProductType={isDisplayProductType}
            l2DocumentState={l2DocumentState}
            level={level}
            previewMode={openPreview}
            setIsDisplayProductBenefits={setIsDisplayProductBenefits}
            setIsDisplayProductGuarantee={setIsDisplayProductGuarantee}
            setIsDisplayProductMarketingToolkit={
              setIsDisplayProductMarketingToolkit
            }
            setIsDisplayProductQuality={setIsDisplayProductQuality}
            setIsDisplayProductSpesifications={
              setIsDisplayProductSpesifications
            }
            setIsDisplayProductType={setIsDisplayProductType}
            tabsProps={{ ...tabsProps }}
            useform={{
              control,
              formState,
              setValue,
              getValues,
              watch,
              resetField,
            }}
          />
        );
      }

      return (
        <L0ContentPage
          level={level}
          previewMode={openPreview}
          productServicesData={productServicesData}
          stepName={steps[step]}
          tabsProps={{ ...tabsProps }}
          useform={{
            control,
            formState,
            setValue,
            getValues,
            watch,
            resetField,
          }}
        />
      );
    }

    if (level === 'l1') {
      if (dataInformation.isSingleProduct) {
        return (
          <L2ContentPage
            formType={formType}
            isDisplayProductBenefits={isDisplayProductBenefits}
            isDisplayProductGuarantee={isDisplayProductGuarantee}
            isDisplayProductMarketingToolkit={isDisplayProductMarketingToolkit}
            isDisplayProductQuality={isDisplayProductQuality}
            isDisplayProductSpesifications={isDisplayProductSpesifications}
            isDisplayProductType={isDisplayProductType}
            l2DocumentState={l2DocumentState}
            level={level}
            previewMode={openPreview}
            setIsDisplayProductBenefits={setIsDisplayProductBenefits}
            setIsDisplayProductGuarantee={setIsDisplayProductGuarantee}
            setIsDisplayProductMarketingToolkit={
              setIsDisplayProductMarketingToolkit
            }
            setIsDisplayProductQuality={setIsDisplayProductQuality}
            setIsDisplayProductSpesifications={
              setIsDisplayProductSpesifications
            }
            setIsDisplayProductType={setIsDisplayProductType}
            tabsProps={{ ...tabsProps }}
            useform={{
              control,
              formState,
              setValue,
              getValues,
              watch,
              resetField,
            }}
          />
        );
      }

      return (
        <L1ContentPage
          l2BenefitState={l2BenefitState}
          l2DocumentState={l2DocumentState}
          l2TypeState={l2TypeState}
          level={level}
          previewMode={openPreview}
          productDetailsData={productDetailsData}
          productDetailsFields={{
            id: productDetailsFieldsId,
            en: productDetailsFieldsEn,
          }}
          stepName={steps[step]}
          tabsProps={{ ...tabsProps }}
          useform={{
            control,
            formState,
            setValue,
            getValues,
            watch,
            resetField,
          }}
        />
      );
    }

    if (level === 'l2') {
      return (
        <L2ContentPage
          formType={formType}
          isDisplayProductBenefits={isDisplayProductBenefits}
          isDisplayProductGuarantee={isDisplayProductGuarantee}
          isDisplayProductMarketingToolkit={isDisplayProductMarketingToolkit}
          isDisplayProductQuality={isDisplayProductQuality}
          isDisplayProductSpesifications={isDisplayProductSpesifications}
          isDisplayProductType={isDisplayProductType}
          l2DocumentState={l2DocumentState}
          level={level}
          previewMode={openPreview}
          setIsDisplayProductBenefits={setIsDisplayProductBenefits}
          setIsDisplayProductGuarantee={setIsDisplayProductGuarantee}
          setIsDisplayProductMarketingToolkit={
            setIsDisplayProductMarketingToolkit
          }
          setIsDisplayProductQuality={setIsDisplayProductQuality}
          setIsDisplayProductSpesifications={setIsDisplayProductSpesifications}
          setIsDisplayProductType={setIsDisplayProductType}
          tabsProps={{ ...tabsProps }}
          useform={{
            control,
            formState,
            setValue,
            getValues,
            watch,
            resetField,
          }}
        />
      );
    }

    return '';
  };

  return (
    <PageViewer
      children={formRender()}
      onClose={() => setOpenPreview(false)}
      open={openPreview}
      title={data.name}
    />
  );
};

PreviewPage.defaultProps = {
  levelDetail: 'l0',
  stepDetail: 1,
};

PreviewPage.propTypes = {
  data: PropTypes.object.isRequired,
  levelDetail: PropTypes.string,
  openPreviewState: PropTypes.object.isRequired,
  stepDetail: PropTypes.number,
};

export default PreviewPage;
