import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@components/Tabs';
import Banner from '../section/Banner';
import Headline from '../section/Headline';
import ProductDetail from '../section/ProductDetail';

const L1ContentPage = (props) => {
  const {
    level,
    tabsProps,
    useform: { control, setValue, getValues, watch, resetField },
    previewMode,
    productDetailsFields,
    productDetailsData,
    stepName,
    l1Banner,
  } = props;

  return (
    <Fragment>
      {!previewMode && <Tabs {...tabsProps} />}

      <div style={{ paddingTop: previewMode ? 0 : 64 }}>
        <Banner
          file={l1Banner}
          level={level}
          previewMode={previewMode}
          stepName={stepName}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
            resetField,
          }}
        />
        <Headline
          level={level}
          previewMode={previewMode}
          stepName={stepName}
          tab={tabsProps.value}
          useform={{
            setValue,
            watch,
            _getValues: getValues,
            _control: control,
            resetField,
          }}
        />
        <ProductDetail
          data={productDetailsFields}
          level={level}
          previewMode={previewMode}
          products={productDetailsData}
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

L1ContentPage.defaultProps = {
  level: '',
  previewMode: false,
  stepName: '',
  tabsProps: {},
  useform: {},
};

L1ContentPage.propTypes = {
  l1Banner: PropTypes.object.isRequired,
  level: PropTypes.string,
  previewMode: PropTypes.bool,
  productDetailsData: PropTypes.object.isRequired,
  productDetailsFields: PropTypes.object.isRequired,
  stepName: PropTypes.string,
  tabsProps: PropTypes.object,
  useform: PropTypes.object,
};

export default L1ContentPage;
