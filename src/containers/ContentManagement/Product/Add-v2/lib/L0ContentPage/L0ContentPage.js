import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@components/Tabs';
import Banner from '../section/Banner';
import Headline from '../section/Headline';
import ProductAndServices from '../section/ProductAndServices';

const L0ContentPage = (props) => {
  const {
    level,
    tabsProps,
    useform: { control, setValue, getValues, watch, resetField },
    previewMode,
    productServicesData,
    stepName,
    l0Banner,
  } = props;

  return (
    <Fragment>
      {!previewMode && <Tabs {...tabsProps} />}

      <div style={{ paddingTop: previewMode ? 0 : 64 }}>
        <Banner
          file={l0Banner}
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
        <ProductAndServices
          data={productServicesData}
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

L0ContentPage.defaultProps = {
  level: '',
  previewMode: false,
  productServicesData: {
    id: [],
    en: [],
  },
  stepName: '',
  tabsProps: {},
  useform: {},
};

L0ContentPage.propTypes = {
  l0Banner: PropTypes.object.isRequired,
  level: PropTypes.string,
  previewMode: PropTypes.bool,
  productServicesData: PropTypes.object,
  stepName: PropTypes.string,
  tabsProps: PropTypes.object,
  useform: PropTypes.object,
};

export default L0ContentPage;
