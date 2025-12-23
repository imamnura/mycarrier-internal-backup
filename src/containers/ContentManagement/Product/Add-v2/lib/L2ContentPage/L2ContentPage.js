import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@components/Tabs';
import ProductNameAndLogo from '../section/Hero';
import ProductOverview from '../section/ProductOverview';
import ProductTypes from '../section/ProductTypes';
import ProductBenefits from '../section/ProductBenefits';
import MarketingToolKit from '../section/MarketingToolKit';
import ServiceLevel from '../section/ServiceLevel';
import ProductDescription from '../section/ProductDescription';
import ProductSpesifications from '../section/ProductSpesifications';
import TalkToUs from '../section/TalkToUs';
import QualityService from '../section/QualityService';
import Dropdown from '@components/Dropdown';

const L2ContentPage = (props) => {
  const {
    formType,
    level,
    tabsProps,
    useform: { control, setValue, getValues, watch, resetField },
    l2DocumentState,
    previewMode,
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
    filterSectionTree,
    l2Hero,
  } = props;

  return (
    <Fragment>
      {!previewMode && <Tabs {...tabsProps} />}

      <div style={{ paddingTop: previewMode ? 0 : 64 }}>
        {!previewMode && (
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                right: '0',
                top: '58%',
                zIndex: '3',
                backgroundColor: '#FFF',
                borderRadius: '5px',
              }}
            >
              <Dropdown {...filterSectionTree} staticWidth={300} />
            </div>
          </div>
        )}
        <ProductNameAndLogo
          file={l2Hero}
          formType={formType}
          level={level}
          previewMode={previewMode}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
          }}
        />
        <ProductOverview
          level={level}
          previewMode={previewMode}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
          }}
        />
        <ProductDescription
          formType={formType}
          level={level}
          previewMode={previewMode}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
          }}
        />
        <ProductTypes
          formType={formType}
          isDisplayProductType={isDisplayProductType}
          level={level}
          previewMode={previewMode}
          setIsDisplayProductType={setIsDisplayProductType}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
            resetField,
          }}
        />
        <ProductBenefits
          formType={formType}
          isDisplayProductBenefits={isDisplayProductBenefits}
          level={level}
          previewMode={previewMode}
          setIsDisplayProductBenefits={setIsDisplayProductBenefits}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
          }}
        />
        <ProductSpesifications
          formType={formType}
          isDisplayProductSpesifications={isDisplayProductSpesifications}
          level={level}
          previewMode={previewMode}
          setIsDisplayProductSpesifications={setIsDisplayProductSpesifications}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
          }}
        />
        <QualityService
          formType={formType}
          isDisplayProductQuality={isDisplayProductQuality}
          level={level}
          previewMode={previewMode}
          setIsDisplayProductQuality={setIsDisplayProductQuality}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
          }}
        />
        <ServiceLevel
          formType={formType}
          isDisplayProductGuarantee={isDisplayProductGuarantee}
          level={level}
          previewMode={previewMode}
          setIsDisplayProductGuarantee={setIsDisplayProductGuarantee}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
          }}
        />
        <MarketingToolKit
          formType={formType}
          isDisplayProductMarketingToolkit={isDisplayProductMarketingToolkit}
          l2DocumentState={l2DocumentState}
          level={level}
          previewMode={previewMode}
          setIsDisplayProductMarketingToolkit={
            setIsDisplayProductMarketingToolkit
          }
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
          }}
        />
        <TalkToUs
          formType={formType}
          level={level}
          previewMode={previewMode}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
          }}
        />
      </div>
    </Fragment>
  );
};

L2ContentPage.defaultProps = {
  filterSectionTree: {},
  isDisplayProductBenefits: true,
  isDisplayProductGuarantee: true,
  isDisplayProductMarketingToolkit: true,
  isDisplayProductQuality: true,
  isDisplayProductSpesifications: true,
  isDisplayProductType: true,
  level: '',
  previewMode: false,
  setIsDisplayProductBenefits: () => {},
  setIsDisplayProductGuarantee: () => {},
  setIsDisplayProductMarketingToolkit: () => {},
  setIsDisplayProductQuality: () => {},
  setIsDisplayProductSpesifications: () => {},
  setIsDisplayProductType: () => {},
  tabsProps: {},
  useform: {},
};

L2ContentPage.propTypes = {
  filterSectionTree: PropTypes.object,
  formType: PropTypes.string.isRequired,
  isDisplayProductBenefits: PropTypes.bool,
  isDisplayProductGuarantee: PropTypes.bool,
  isDisplayProductMarketingToolkit: PropTypes.bool,
  isDisplayProductQuality: PropTypes.bool,
  isDisplayProductSpesifications: PropTypes.bool,
  isDisplayProductType: PropTypes.bool,
  l2DocumentState: PropTypes.object.isRequired,
  l2Hero: PropTypes.object.isRequired,
  level: PropTypes.string,
  previewMode: PropTypes.bool,
  setIsDisplayProductBenefits: PropTypes.func,
  setIsDisplayProductGuarantee: PropTypes.func,
  setIsDisplayProductMarketingToolkit: PropTypes.func,
  setIsDisplayProductQuality: PropTypes.func,
  setIsDisplayProductSpesifications: PropTypes.func,
  setIsDisplayProductType: PropTypes.func,
  tabsProps: PropTypes.object,
  useform: PropTypes.object,
};

export default L2ContentPage;
