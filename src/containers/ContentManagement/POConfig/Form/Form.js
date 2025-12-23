import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { Switch, Text } from '@legion-ui/core';
import FormProduct from './lib/ProductForm';
import FormConfig from './lib/ConfigForm';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@components/FormFieldLegion';
import { bool } from 'yup';

const ProductConfigForm = (props) => {
  const {
    productId,
    data,
    options,
    loading,
    breadcrumb,
    onClickSubmit,
    onCloseSuccess,
    formPOConfig,
    handleRootProductChange,
    rootProducts,
    isBtnSubmitDisable,
  } = useAction(props);

  const action = [
    {
      custom: (
        <Checkbox
          control={formPOConfig?.control}
          name="isPublish"
          label="Publish when submit"
          rules={{
            validate: async (value) =>
              bool()
                .required()
                .label('Publish')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      ),
    },
    {
      children: 'Cancel',
      variant: 'ghost',
      onClick: onCloseSuccess(),
      hideDivider: true,
      ml: 16,
    },
    {
      children: 'Submit',
      disabled: isBtnSubmitDisable,
      hideDivider: true,
      ml: 16,
      onClick: formPOConfig?.handleSubmit(onClickSubmit),
    },
  ];

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'custom',
          title: 'Product Information',
          render: (
            <FormProduct
              useForm={formPOConfig}
              options={options}
              loading={loading}
              onFieldsChange={handleRootProductChange}
              rootProducts={rootProducts}
              productId={productId}
              data={data}
            />
          ),
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      stickRight: true,
      content: [
        {
          type: 'custom',
          title: 'Form List',
          withDivider: true,
          customSubfix: (
            <Controller
              control={formPOConfig?.control}
              name="isCustom"
              render={({ field }) => {
                const { value, onChange } = field;
                const fieldProps = {
                  onChange,
                  value,
                  checked: value,
                };
                return (
                  <div
                    style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                  >
                    <Text size="16px" weight="400" color="#2F424A">
                      Customize this product
                    </Text>
                    <Switch {...fieldProps} />
                  </div>
                );
              }}
              rules={{
                validate: async (value) =>
                  bool()
                    .required()
                    .label('Custom Product')
                    .validate(value)
                    .then(() => true)
                    .catch((err) => err?.message),
              }}
            />
          ),
          render: (
            <div style={{ paddingTop: '24px' }}>
              <FormConfig control={formPOConfig?.control} />
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        action={((!!productId && data) || !productId) && action}
        breadcrumb={breadcrumb}
        loading={loading?.data}
        notFound={(!!productId && !data) || false}
        schema={detailSchema}
      />
    </>
  );
};

ProductConfigForm.defaultProps = {
  feature: [],
};

ProductConfigForm.propTypes = {
  feature: PropTypes.array,
};

export default ProductConfigForm;
