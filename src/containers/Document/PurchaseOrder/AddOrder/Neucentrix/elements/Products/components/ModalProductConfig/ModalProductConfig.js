import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, IconButton } from '@material-ui/core';
import useStyles from './styles';
import { Text } from '@legion-ui/core';
import Cancel from '@assets/icon-v2/Cancel';
import useActions from './hooks/useActions';
// import Stepper from '@components/Stepper';
import Button from '@components/Button';
import { number } from 'yup';
import { TextField } from '@components/FormFieldLegion';
import Configuration from '../Configuration';
import { FormProvider } from 'react-hook-form';
// import { STEPS } from '../../utils';
import Table from '@components/Table/Table';
import { rupiahFormat } from '@utils/parser';
import { Select } from '@components/FormField';
import DynamicForm from '../DynamicForm';
import Skeleton from '@components/Skeleton';

const ModalProductConfig = (props) => {
  const { modalProductConfig, setModalProductConfig } = props;
  const classes = useStyles();

  const {
    formProductConfig,
    loading,
    options,
    activeStep,
    setActiveStep,
    onSubmit,
    onSubmitProductAttributes,
    fetchCheckConstraints,
    productRootOptions,
    selectedProductRoot,
    fieldsAttributes,
    fetchProductAttributes,
    fetchOptionsProductChild,
  } = useActions(props);
  
  // Function to handle closing and resetting the modal
  const handleClose = () => {      // Reset to the first step
    setModalProductConfig({ open: false }); // Close the modal
  };

  useEffect(() => {
    if (modalProductConfig?.open) {
      formProductConfig.reset({
        productName: null, // Reset the productName field
        attributes: [],     // Reset attributes to empty array
        otc: 0,             // Reset OTC
        mrc: 0              // Reset MRC
        // Add any other fields that need resetting to their defaults
      }); // Reset the form fields
      setActiveStep(0);
    }
  }, [modalProductConfig?.open])

  const renderActionButton = [
    <div key={`action-${activeStep}`} className={classes.footerWrapper}>
      {
        !selectedProductRoot?.isAttributeAttached ?
          <>
            <Button
              children="Cancel"
              type="button"
              variant="ghost"
              onClick={handleClose}
            />
            <Button
              children="Next"
              disabled={
                !formProductConfig?.formState?.isValid
              }
              onClick={() => {
                fetchCheckConstraints()
              }}
            /> </> :
          <>
            <Button
              children="Cancel"
              type="button"
              variant="ghost"
              onClick={handleClose} // Use the new handler
            />
            <Button
              children="Submit"
              type={"submit"}
              onClick={formProductConfig?.handleSubmit(onSubmitProductAttributes)}
            >Submit</Button>
          </>
      }
    </div>,
    <div key={`action-${activeStep}`} className={classes.footerWrapper}>
      <Button
        children="Back"
        variant="ghost"
        type="button"
        onClick={() => setActiveStep(activeStep - 1)}
        disabled={loading?.productChild || loading?.submitProductConfig}
      />
      <Button
        children="Submit"
        type="button"
        disabled={
          !formProductConfig?.formState?.isValid ||
          !formProductConfig?.formState?.isDirty ||
          loading?.productChild ||
          loading?.submitProductConfig
        }
        onClick={formProductConfig?.handleSubmit(onSubmit)}
      />
    </div>,
  ][activeStep];

  formProductConfig.watch('otc');

  const renderPageProductConfig = [
    <div key={`page-${activeStep}`} className={classes.contentConfigWrapper}>
      <Select
        options={productRootOptions}
        control={formProductConfig.control}
        customOnChange={(value) => {
        formProductConfig.reset({
          productName: value,
          child:[],
        })
          // Reset specific fields while keeping the new productName
          // formProductConfig.reset({
          //   productName: value, // Keep the newly selected product name
          //   attributes: [],     // Reset attributes
          //   child: [],          // Reset child products
          //   otc: 0,             // Reset OTC
          //   mrc: 0              // Reset MRC
          //   // Add any other fields that need resetting to their defaults
          // }, {
          //   keepDirty: false,
          //   keepErrors: false,
          //   keepIsValid: false,
          //   // Add other reset options as needed
          // }); 
          if (value?.data?.isAttributeAttached) {
            fetchProductAttributes(value?.data)
          } else {
            fetchOptionsProductChild(value?.data)
          }
        }}
        isSearchable
        label="Product Root Name"
        name="productName"
        placeholder="Input Product Root Name"
        menuWidth="100%"
        minWidth="100%"
        rawValue
        required
        isDisabled={modalProductConfig?.mode === 'edit'}
      />
      {
        Boolean(selectedProductRoot) && (
          <>
            {
              selectedProductRoot?.isAttributeAttached ?
                <div className={classes.attributeContainer}>{
                  loading.attributesProduct ? (
                    // Replace <p>loading</p> with Skeletons
                    <div>
                      <Skeleton variant="text" width="40%" height={30} />
                      <Skeleton variant="rect" width="100%" height={40} style={{ marginTop: 8 }} />
                      <Skeleton variant="text" width="40%" height={30} style={{ marginTop: 16 }} />
                      <Skeleton variant="rect" width="100%" height={40} style={{ marginTop: 8 }} />
                      <Skeleton variant="text" width="40%" height={30} style={{ marginTop: 16 }} />
                      <Skeleton variant="rect" width="100%" height={40} style={{ marginTop: 8 }} />
                    </div>
                  ) : (
                    <DynamicForm
                      {...props}
                      name="attributes"
                      dynamicForm={fieldsAttributes?.fields}
                      useForm={formProductConfig}
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
                  )
                }
                </div>
                :
                <Configuration loading={loading} options={options} />
            }
          </>
        )

      }

    </div>,
    <div key={`page-${activeStep}`} className={classes.contentPricingWrapper}>
      {formProductConfig?.watch('child')?.map((child, indexChild) => {
        const tableProps = {
          data: child?.child?.map((grandChild, indexGrandchild) => ({
            ...grandChild,
            price: (
              <TextField
                block
                before="Rp."
                key={`child-${indexChild}-child-${indexGrandchild}-price`}
                control={formProductConfig?.control}
                name={`child.${indexChild}.child.${indexGrandchild}.price`}
                placeholder="Input Price"
                type="number"
                rules={{
                  validate: async (value) =>
                    number()
                      .integer('Please input round number, without comma')
                      .min(0, 'Price must be at least 0')
                      .required()
                      .typeError('you must specify a number')
                      .label('Price')
                      .validate(value)
                      .then(() => true)
                      .catch((err) => err?.message),
                }}
              />
            ),
          })),
          loadingRoot: false,
          loading: false,
          schema: [
            {
              name: 'productName',
              label: 'Grandchild Product',
            },
            {
              name: 'qty',
              label: 'Quantity',
            },
            {
              name: 'paymentType',
              label: 'Payment Type',
            },
            {
              name: 'price',
              label: 'Total Price',
              keepLabel: true,
              hasTooltipHeader: true,
              tooltipHeader:
                'This is the total price (after multiplying by the quantity)',
            },
          ],
          emptyMessage: {
            description: 'The data will appear automatically if get an update',
            message: 'Data not found',
            size: 'small',
          },
          meta: {
            page: 0,
          },
          numbering: false,
        };
        return (
          <div className={classes.pricingProductChildWrapper} key={indexChild}>
            <Text
              children={child?.productName}
              color="secondary500"
              size="18px"
              height="28px"
              weight={700}
            />
            <Table {...tableProps} />
          </div>
        );
      })}
      <div className={classes.totalPriceSection}>
        <div
          style={{
            gridColumn: 'span 2',
          }}
        >
          <Text
            children="Total Price"
            color="secondary500"
            size="20px"
            height="23px"
            weight={700}
          />
        </div>
        <div>
          <Text
            children="OTC"
            color="secondary500"
            size="14px"
            height="14px"
            weight={400}
            block
          />
          <Text
            children={rupiahFormat(formProductConfig.watch('otc'))}
            size="24px"
            height="28px"
            weight={700}
            block
            color="primary500"
          />
        </div>
        <div>
          <Text
            children="MRC"
            color="secondary500"
            size="14px"
            height="14px"
            weight={400}
            block
          />
          <Text
            children={rupiahFormat(formProductConfig.watch('mrc'))}
            size="24px"
            height="28px"
            weight={700}
            block
            color="primary500"
          />
        </div>
      </div>
    </div>,
  ][activeStep];

  return (
    <FormProvider {...formProductConfig}>
      <Dialog
        classes={{ paper: classes.dialogRoot }}
        maxWidth="md"
        open={modalProductConfig?.open}
      >
        <div className={classes.wrapper}>
          <div className={classes.headerWrapper}>
            <div className={classes.titleWrapper}>
              <Text
                children="Add Product"
                color="secondary500"
                size="20px"
                height="28px"
                weight={700}
              />
              <Text
                children="Please fill the product configuration"
                size="12px"
                height="18px"
                weight={400}
              />
            </div>
            {/* {
              !selectedProductRoot?.isAttributeAttached && <div className={classes.stepperWrapper}>
                <Stepper
                  active={activeStep}
                  steps={STEPS}
                  variant="number"
                  padding={0}
                />
              </div>
            } */}
            <div>
              <IconButton
                size="small"
                onClick={handleClose}
              >
                <Cancel />
              </IconButton>
            </div>
          </div>
          {renderPageProductConfig}
          {renderActionButton}
        </div>
      </Dialog>
    </FormProvider>
  );
};

ModalProductConfig.defaultProps = {
  control: {},
  state: {
    optionsBillingAccount: [],
    optionsProductConfigAccount: [],
  },
};

ModalProductConfig.propTypes = {
  control: PropTypes.object,
  state: PropTypes.object,
};

export default ModalProductConfig;
