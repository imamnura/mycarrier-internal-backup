import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Modal } from '@material-ui/core';
import Typography from '@components/Typography/Typography';
import useStyles from '../styles';
import Stepper from '@components/Stepper/Stepper';
import Button from '@components/Button/Button';
import ModalContentServiceName from './ModalContentServiceName';
import ModalContentServicePricing from './ModalContentServicePricing';
import NotFound from '@fragments/Detail/elements/NotFound/NotFound';
import clsx from 'clsx';
import { STEPS } from '../constant';
import useAction from '../hooks/useAction';
import { convertInitialValueToServices } from '../utils';

function ModalServices(props) {
  const { open, onCancel, onSuccess, initialValues, mode, form } = props;
  const styles = useStyles();

  const {
    step,
    setStep,
    handleAddNcix,
    handleAddRentRackNER,
    handleOnChangeAdditional,
    onSubmit,
    onPrevious,
    fetchItHallByAmpere,
    fetchDefaultOptions,
  } = useAction(props);

  const setInitialValues = () => {
    if (initialValues && mode === 'edit') {
      if (initialValues.product && initialValues.product.length > 0) {
        const fetchOptionsData = async ({
          ampere = 'ithall-single-ampere',
        }) => {
          await Promise.all([fetchItHallByAmpere(ampere)]);
        };

        const dataProduct = initialValues.product[0];
        const { services, price } = convertInitialValueToServices(
          dataProduct.services,
        );

        fetchOptionsData({
          ampere: services.itHall.itHallPower,
        });

        form.setValue('serviceName', dataProduct.serviceName);
        form.setValue('agentOrPrinciple', {
          label: dataProduct.agentOrPrinciple.value,
          value: dataProduct.agentOrPrinciple,
        });
        form.setValue('location', {
          label: dataProduct.location.value,
          value: dataProduct.location,
        });

        form.setValue('withNcix', services?.NCIX ? true : false);
        form.setValue('withRentRackNER', services?.NER ? true : false);

        handleAddNcix(services?.NCIX ? true : false);
        handleAddRentRackNER(services?.NER ? true : false);

        form.setValue('services', services);
        form.setValue('price', price);
      }
    }
  };

  useEffect(() => {
    if (open) {
      setInitialValues();
    }
  }, [initialValues, mode, open]);

  useEffect(() => {
    if (open) {
      fetchDefaultOptions();
    }
  }, [open]);

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <ModalContentServiceName
            form={form}
            handleAddNcix={handleAddNcix}
            handleAddRentRackNER={handleAddRentRackNER}
            handleOnChangeAdditional={handleOnChangeAdditional}
          />
        );
      case 2:
        return <ModalContentServicePricing form={form} />;
      default:
        return <NotFound />;
    }
  };

  const onSubmitCallback = () => {
    onCancel();
    onSuccess();
  };

  const handleCancel = () => {
    setStep(1);
    form.reset();
    onCancel();
  };

  return (
    <Modal open={open}>
      <Box
        className={clsx(styles.productsModalAddService, {
          [styles.stepTwoModalWidth]: step === 2,
        })}
        component="form"
        onSubmit={form.handleSubmit(() => onSubmit(onSubmitCallback))}
      >
        <Box className={styles.productsModalAddServiceTitle}>
          <Typography
            style={{
              display: 'block',
              marginBottom: '.5rem',
            }}
            variant="h5"
            weight="bold"
          >
            {step === 1 ? 'Add Service' : 'Add Price'}
          </Typography>
          <Typography
            style={{
              display: 'block',
            }}
            variant="caption"
            weight="regular"
          >
            {step === 1
              ? 'Filling data service'
              : 'Filling price for service and submit if the service was deal'}
          </Typography>
        </Box>
        <Box
          style={{
            marginTop: '2rem',
            marginBottom: '2rem',
            paddingLeft: '5rem',
            paddingRight: '5rem',
          }}
        >
          <Stepper active={step - 1} steps={STEPS} variant="number" />
        </Box>
        <Box style={{ minHeight: '28rem' }}>{renderContent()}</Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button onClick={handleCancel} type="button" variant="ghost">
            Cancel
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
            }}
          >
            {step === 2 && (
              <Button onClick={onPrevious} type="button" variant="ghost">
                Previous
              </Button>
            )}
            <Button disabled={!form?.formState?.isValid} type="submit">
              {step === 1 ? 'Next' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

ModalServices.defaultProps = {
  initialValues: null,
  onCancel: () => {},
  open: false,
};

ModalServices.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  mode: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default ModalServices;
