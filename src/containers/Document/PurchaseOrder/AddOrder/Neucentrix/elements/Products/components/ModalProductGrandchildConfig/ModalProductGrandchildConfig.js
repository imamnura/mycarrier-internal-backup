import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, IconButton } from '@material-ui/core';
import useStyles from './styles';
import { Text } from '@legion-ui/core';
import Cancel from '@assets/icon-v2/Cancel';
import useActions from './hooks/useActions';
import Button from '@components/Button';
import { Select } from '@components/FormField';
import { object, string } from 'yup';
import DynamicForm from '../DynamicForm';
import Skeleton from '@components/Skeleton';

const ModalProductGrandchildConfig = (props) => {
  const { modalProductGrandchildConfig } = props;

  const classes = useStyles();

  const {
    onClose,
    formProductGrandchildConfig,
    options,
    loading,
    onSubmit,
    onChangeProductGrandChild,
    fieldsAttributes,
  } = useActions(props);

  const renderTabProductChild = () => {
    if (
      formProductGrandchildConfig?.watch('child.label') &&
      !loading.attributes
    ) {
      return (
        <div className={classes?.cardGrandchildContainer}>
          <Text
            children={formProductGrandchildConfig?.watch('child.label')}
            color="secondary500"
            size="16px"
            height="24px"
            weight={700}
          />
          {fieldsAttributes?.fields?.length > 0 && (
            <DynamicForm
              {...props}
              dynamicForm={fieldsAttributes?.fields}
              useForm={formProductGrandchildConfig}
              filters={{
                inputType: ['combobox', 'textarea', 'textfield'],
              }}
              normalizeFormName={(fieldProps) => {
                const indexSelectedAttribute =
                  fieldsAttributes?.fields?.findIndex(
                    (attr) => attr?.attributeName === fieldProps?.attributeName,
                  );
                return `attributes.${indexSelectedAttribute}.attributeValue`;
              }}
            />
          )}
        </div>
      );
    } else if (
      formProductGrandchildConfig?.watch('child.label') &&
      loading.attributes
    ) {
      return (
        <div className={classes?.cardGrandchildContainer}>
          <Skeleton height={20} width="100%" />
        </div>
      );
    }
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      maxWidth="md"
      open={modalProductGrandchildConfig?.open}
      key={modalProductGrandchildConfig?.id}
    >
      <form onSubmit={formProductGrandchildConfig?.handleSubmit(onSubmit)}>
        <div className={classes.wrapper}>
          <div className={classes.headerWrapper}>
            <Text
              children="Add Grandchild Product"
              color="secondary500"
              size="20px"
              height="28px"
              weight={700}
            />
            <div>
              <IconButton
                size="small"
                disabled={loading?.attributes}
                onClick={onClose()}
              >
                <Cancel />
              </IconButton>
            </div>
          </div>
          <div className={classes.contentWrapper}>
            <div>
              <Text size="sm" weight="600" block mb="8px" color="#3B525C">
                <Text children="*" size="sm" color="#DE1B1B" />
                Grandchild Category
              </Text>
              <Select
                menuPosition="fixed"
                control={formProductGrandchildConfig?.control}
                menuWidth="100%"
                minWidth="100%"
                name="child"
                options={options.productGrandchild}
                isLoading={loading.productGrandchild}
                isDisabled={loading.attributes || loading.productGrandchild}
                placeholder="Select Grandchild Category"
                rawValue
                noBorder={false}
                hideNullHelperText
                isSearchable
                rules={{
                  validate: async (value) =>
                    object()
                      .required()
                      .label('Grandchild Category')
                      .validate(value)
                      .then(() => true)
                      .catch((err) => err?.message),
                }}
                customOnChange={onChangeProductGrandChild}
              />
            </div>
            <div>
              <Text size="sm" weight="600" block mb="8px" color="#3B525C">
                <Text children="*" size="sm" color="#DE1B1B" />
                Quantity
              </Text>
              <Select
                menuPosition="fixed"
                control={formProductGrandchildConfig?.control}
                isDisabled={
                  !formProductGrandchildConfig?.watch('child.value') ||
                  loading.attributes
                }
                isLoading={loading.attributes}
                menuWidth="100%"
                minWidth="100%"
                name="qty"
                options={options?.productGrandchild
                  ?.find(
                    (option) =>
                      option?.value ===
                      formProductGrandchildConfig?.watch('child.value'),
                  )
                  ?.data?.qty?.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                placeholder="Select Quantity"
                noBorder={false}
                hideNullHelperText
                rules={{
                  validate: async (value) =>
                    string()
                      .required()
                      .label('Quantity')
                      .validate(value)
                      .then(() => true)
                      .catch((err) => err?.message),
                }}
              />
            </div>
            {renderTabProductChild()}
          </div>
          <div className={classes.footerWrapper}>
            <Button
              children="Cancel"
              variant="ghost"
              onClick={onClose()}
              disabled={loading?.attributes}
            />
            <Button
              children="ADD"
              disabled={
                !formProductGrandchildConfig?.formState?.isValid ||
                !formProductGrandchildConfig?.formState?.isDirty ||
                loading?.attributes
              }
              loading={loading.submit}
              type="submit"
            />
          </div>
        </div>
      </form>
    </Dialog>
  );
};

ModalProductGrandchildConfig.defaultProps = {
  control: {},
  state: {
    optionsBillingAccount: [],
    optionsProductGrandchildConfigAccount: [],
  },
};

ModalProductGrandchildConfig.propTypes = {
  control: PropTypes.object,
  state: PropTypes.object,
};

export default ModalProductGrandchildConfig;
