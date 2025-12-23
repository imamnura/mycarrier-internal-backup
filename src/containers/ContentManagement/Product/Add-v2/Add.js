import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider } from '@material-ui/core';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import { languages } from './constant';
import useActions from './hooks/useActions';
import { actionButton, breadcrumb } from './utils';
import InformationForm from './lib/InformationForm';
import L0ContentPage from './lib/L0ContentPage';
import L1ContentPage from './lib/L1ContentPage';
import L2ContentPage from './lib/L2ContentPage';
import PageViewer from './lib/PageViewer';
import { useRouter } from 'next/router';
import Stepper from '@components/Stepper';
import HeaderAndFilter from '@fragments/HeaderAndFilter';

const Add = (props) => {
  const {
    dataInformation,
    formType,
    steps,
    disableAction,
    // setDisableAction,
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
    l2TypeState,
    l2BenefitState,
    l2DocumentState,
    productServicesData,
    openPreview,
    setOpenPreview,
    productDetailsFieldsId,
    productDetailsFieldsEn,
    isNextDisable,
    isLoading,
    previousButton,
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
    handleCancel,
    filterSectionTree,
    l0Banner,
    l1Banner,
    l2Hero,
  } = useActions(props);

  const router = useRouter();
  const { query } = router;
  const { category = [], parentId } = dataInformation;

  const sectionTopProps = {
    action: actionButton({
      step,
      disableAction,
      setStep,
      setTab,
      steps,
      setOpenPreview,
      handleAddProduct,
      setLevel,
      formState,
      isNextDisable,
      isLoading,
      previousButton,
      formType,
      handleCancel,
    }),
    filter: [],
    breadcrumb: breadcrumb({
      name: dataInformation?.name,
      parentName: category[0]?.title,
      parentId: query.level === 'l2' ? dataInformation.catIdl0 : parentId,
      query: query,
    }),
    isCustomSize: {
      left: 5,
      right: 7,
    },
    withSearch: false,
  };

  const tabsProps = {
    variant: 'centered',
    options: languages,
    value: tab,
    onChange: setTab,
  };

  const formRender = () => {
    if (
      steps[step] === 'L0 - Product Information' ||
      steps[step] === 'L1 - Product Information' ||
      steps[step] === 'Product Detail - Product Information'
    ) {
      return (
        <InformationForm
          dataInformation={dataInformation}
          formType={formType}
          handleDeleteKeyword={handleDeleteKeyword}
          handleKeyDown={handleKeyDown}
          handleUploadIcon={handleUploadIcon}
          iconState={{ iconFile, setIconFile }}
          keywordChip={keywordChip}
          l2CategoryChip={l2CategoryChip}
          l2MappingOptions={l2MappingOptions}
          level={level}
          query={query}
          useform={{ control, formState, setValue, getValues, clearErrors }}
        />
      );
    }

    if (formType === 'full' || formType === 'edit') {
      if (dataInformation?.isSingleProduct) {
        if (
          steps[step] === 'L0 - Content Page' ||
          steps[step] === 'L1 - Content Page'
        ) {
          return (
            <L2ContentPage
              filterSectionTree={filterSectionTree}
              formType={formType}
              isDisplayProductBenefits={isDisplayProductBenefits}
              isDisplayProductGuarantee={isDisplayProductGuarantee}
              isDisplayProductMarketingToolkit={
                isDisplayProductMarketingToolkit
              }
              isDisplayProductQuality={isDisplayProductQuality}
              isDisplayProductSpesifications={isDisplayProductSpesifications}
              isDisplayProductType={isDisplayProductType}
              l2DocumentState={l2DocumentState}
              l2Hero={l2Hero}
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
      }

      if (steps[step] === 'L0 - Content Page') {
        return (
          <L0ContentPage
            l0Banner={l0Banner}
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

      if (steps[step] === 'L1 - Content Page') {
        return (
          <L1ContentPage
            l1Banner={l1Banner}
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

      if (steps[step] === 'Product Detail - Content Page') {
        return (
          <L2ContentPage
            filterSectionTree={filterSectionTree}
            formType={formType}
            isDisplayProductBenefits={isDisplayProductBenefits}
            isDisplayProductGuarantee={isDisplayProductGuarantee}
            isDisplayProductMarketingToolkit={isDisplayProductMarketingToolkit}
            isDisplayProductQuality={isDisplayProductQuality}
            isDisplayProductSpesifications={isDisplayProductSpesifications}
            isDisplayProductType={isDisplayProductType}
            l2DocumentState={l2DocumentState}
            l2Hero={l2Hero}
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
    }

    if (formType === 'half') {
      if (steps[step] === 'L0 - Content Page') {
        return (
          <L0ContentPage
            l0Banner={l0Banner}
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

      if (steps[step] === 'L1 - Content Page') {
        return (
          <L2ContentPage
            filterSectionTree={filterSectionTree}
            formType={formType}
            isDisplayProductBenefits={isDisplayProductBenefits}
            isDisplayProductGuarantee={isDisplayProductGuarantee}
            isDisplayProductMarketingToolkit={isDisplayProductMarketingToolkit}
            isDisplayProductQuality={isDisplayProductQuality}
            isDisplayProductSpesifications={isDisplayProductSpesifications}
            isDisplayProductType={isDisplayProductType}
            l2DocumentState={l2DocumentState}
            l2Hero={l2Hero}
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
    }

    if (formType === 'single') {
      if (steps[step] === 'L0 - Content Page') {
        return (
          <L2ContentPage
            filterSectionTree={filterSectionTree}
            formType={formType}
            isDisplayProductBenefits={isDisplayProductBenefits}
            isDisplayProductGuarantee={isDisplayProductGuarantee}
            isDisplayProductMarketingToolkit={isDisplayProductMarketingToolkit}
            isDisplayProductQuality={isDisplayProductQuality}
            isDisplayProductSpesifications={isDisplayProductSpesifications}
            isDisplayProductType={isDisplayProductType}
            l2DocumentState={l2DocumentState}
            l2Hero={l2Hero}
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
    }

    if (formType === 'create') {
      if (steps[step] === 'L1 - Content Page') {
        if (query.isSingleProduct === 'true') {
          return (
            <L2ContentPage
              filterSectionTree={filterSectionTree}
              formType={formType}
              isDisplayProductBenefits={isDisplayProductBenefits}
              isDisplayProductGuarantee={isDisplayProductGuarantee}
              isDisplayProductMarketingToolkit={
                isDisplayProductMarketingToolkit
              }
              isDisplayProductQuality={isDisplayProductQuality}
              isDisplayProductSpesifications={isDisplayProductSpesifications}
              isDisplayProductType={isDisplayProductType}
              l2DocumentState={l2DocumentState}
              l2Hero={l2Hero}
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
            l1Banner={l1Banner}
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

      if (steps[step] === 'Product Detail - Content Page') {
        return (
          <L2ContentPage
            filterSectionTree={filterSectionTree}
            formType={formType}
            isDisplayProductBenefits={isDisplayProductBenefits}
            isDisplayProductGuarantee={isDisplayProductGuarantee}
            isDisplayProductMarketingToolkit={isDisplayProductMarketingToolkit}
            isDisplayProductQuality={isDisplayProductQuality}
            isDisplayProductSpesifications={isDisplayProductSpesifications}
            isDisplayProductType={isDisplayProductType}
            l2DocumentState={l2DocumentState}
            l2Hero={l2Hero}
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
    }

    return '';
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div
          style={{
            top: '72px',
            zIndex: 4,
            position: 'sticky',
            background: '#FFF',
          }}
        >
          <HeaderAndFilter {...sectionTopProps} />
        </div>
        <div>
          <Box
            mt={3}
            style={{
              display: 'flex',
              marginBottom: '8px',
              paddingBottom: '16px',
              justifyContent: 'center',
            }}
          >
            <Stepper active={step} steps={steps} variant="number" />
          </Box>
          <Divider />
        </div>
        {formRender()}
      </form>
      <ConfirmationDialog
        {...confirmation}
        onClose={() => clearConfirmation()}
      />
      <PageViewer
        children={formRender()}
        onClose={() => setOpenPreview(false)}
        open={openPreview}
        title={steps[step]}
      />
    </Fragment>
  );
};

Add.defaultProps = {
  defaultStep: 0,
};

Add.propTypes = {
  defaultStep: PropTypes.number,
};

export default Add;
