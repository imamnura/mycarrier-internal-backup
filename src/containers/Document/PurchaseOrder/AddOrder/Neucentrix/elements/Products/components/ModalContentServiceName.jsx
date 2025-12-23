import React, {  useMemo } from 'react';
import { Select } from '@components/FormField';
import Checkbox from '@components/Checkbox';
import Typography from '@components/Typography/Typography';
import { Box, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from '../styles';

import {
  SERVICE_FORM_INDEX,
  SERVICE_ITEM_IT_HALL,
  SERVICE_ITEM_NCIX,
  SERVICE_ITEM_NER,
  SERVICE_NAME_OPTIONS,
} from '../constant';

import { useSelector } from 'react-redux';
import ProductsForm from './ProductsForm';
import { useWatch } from 'react-hook-form';

function ModalContentServiceName(props) {
  const { formServices, locations, agents, loadingLocation, loadingAgents } =
    useSelector((state) => state.productConfig);

  const {
    form: { control, getValues, formState },
    handleAddNcix,
    handleAddRentRackNER,
    handleOnChangeAdditional,
  } = props;

  const styles = useStyles();

  const renderFormServices = ({
    serviceItem,
    isDisabled = false,
    withRounded = true,
  }) => {
    return (
      formServices &&
      formServices.length > 0 &&
      formServices
        .filter(
          (service) =>
            service.item.toLowerCase() === `${serviceItem}`.toLowerCase(),
        )
        .map((formService, serviceIdx) => (
          <ProductsForm
            className={withRounded && styles.roundedBox}
            form={props.form}
            formService={formService}
            isDisabled={isDisabled}
            key={serviceIdx}
            onChangeAdditional={handleOnChangeAdditional}
            serviceIdx={serviceIdx + SERVICE_FORM_INDEX[serviceItem]}
          />
        ))
    );
  };

  const servicesWatch = useWatch({
    control,
    name: 'services',
  });

  const agentOrPrincipleWatch = useWatch({
    control,
    name: 'agentOrPrinciple',
  });

  const locationWatch = useWatch({
    control,
    name: 'location',
  });

  const disabledForms = useMemo(() => {
    return !(
      agentOrPrincipleWatch &&
      locationWatch &&
      servicesWatch?.itHall?.itHallRackType &&
      servicesWatch?.itHall?.itHallPower &&
      servicesWatch?.itHall?.itHallAmpere
    );
  }, [
    formState?.isDirty,
    servicesWatch?.itHall,
    agentOrPrincipleWatch,
    locationWatch,
  ]);

  return (
    <>
      <Box>
        <Select
          control={control}
          defaultValue={SERVICE_NAME_OPTIONS[0].value}
          label="Service name"
          name="serviceName"
          options={SERVICE_NAME_OPTIONS}
          placeholder="Choose Service Name"
          required
          staticWidth="100%"
        />
      </Box>
      <Box>
        <Select
          control={control}
          isLoading={loadingAgents}
          label="Agent or principle"
          name="agentOrPrinciple"
          options={agents}
          placeholder="Choose Agent or Principle"
          rawValue
          required
          staticWidth="100%"
        />
      </Box>
      <Box>
        <Select
          control={control}
          isLoading={loadingLocation}
          label="Location"
          menuWidth="100%"
          minWidth="100%"
          name="location"
          options={locations}
          placeholder="Choose Location"
          rawValue
          required
        />
      </Box>

      {/* render services */}
      {renderFormServices({ serviceItem: SERVICE_ITEM_IT_HALL })}

      {/* Rent Rack NER */}
      <Box className={styles.roundedBox}>
        <Box
          component="label"
          htmlFor="withRentRackNER"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <Checkbox
            defaultChecked={getValues()?.['withRentRackNER']}
            id="withRentRackNER"
            label="Want to Rent Rack NER?"
            name="withRentRackNER"
            onChange={(e) => handleAddRentRackNER(e.target.checked)}
          />
          <Typography
            style={{ display: 'block', marginLeft: '.5rem' }}
            variant="body2"
            weight="regular"
          >
            Want to Rent Rack NER
          </Typography>
        </Box>

        {getValues()?.['withRentRackNER'] ? (
          <Box>
            <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
            {renderFormServices({
              serviceItem: SERVICE_ITEM_NER,
              withRounded: false,
              isDisabled: disabledForms,
            })}
          </Box>
        ) : (
          <></>
        )}
      </Box>

      {/* Internet Exchange */}
      <Box className={styles.roundedBox}>
        <Box
          component="label"
          htmlFor="withNcix"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <Checkbox
            defaultChecked={getValues()?.['withNcix']}
            id="withNcix"
            label="Want to Add Internet Exchange?"
            name="withNcix"
            onChange={(e) => handleAddNcix(e.target.checked)}
          />
          <Typography
            style={{ display: 'block', marginLeft: '.5rem' }}
            variant="body2"
            weight="regular"
          >
            Want to Add Internet Exchange
          </Typography>
        </Box>

        {getValues()?.['withNcix'] ? (
          <Box>
            <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
            {renderFormServices({
              serviceItem: SERVICE_ITEM_NCIX,
              withRounded: false,
              isDisabled: disabledForms,
            })}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

ModalContentServiceName.defaultProps = {
  form: {},
  handleAddNcix: () => {},
  handleAddRentRackNER: () => {},
  handleOnChangeAdditional: () => {},
};

ModalContentServiceName.propTypes = {
  form: PropTypes.object,
  handleAddNcix: PropTypes.func,
  handleAddRentRackNER: PropTypes.func,
  handleOnChangeAdditional: PropTypes.func,
};

export default ModalContentServiceName;
