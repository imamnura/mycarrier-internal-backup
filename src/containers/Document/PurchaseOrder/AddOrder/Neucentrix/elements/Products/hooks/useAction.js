import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import {
  SERVICE_ITEM_IT_HALL,
  SERVICE_ITEM_NCIX,
  SERVICE_ITEM_NER,
} from '../constant';
import { getOptionsData } from '../repositories';
import { useDispatch, useSelector } from 'react-redux';

import {
  progressLocation,
  progressAgents,
  progressItHallAmperes,
  progressItHallRackTypes,
  progressNerAmperes,
  progressNerRackTypes,
  setLocations,
  setAgents,
  setItHallAmperes,
  setItHallRackTypes,
  setNerAmperes,
  setNerRackTypes,
  setMembersNcix,
  addFormService,
  removeFormService,
  progressMembersNcix,
  updateFormService,
} from '../../../reducers/slices';

import { MLP_BLP_OPTIONS, RACK_AND_FIBER_OPTIONS } from '../constant';
import { convertServiceToPayload, getSummary, priceForms } from '../utils';
import { updateStatus } from '../../../../../_repositories/repositories';
import { cleanObject } from '@utils/common';
import { useSnackbar } from 'notistack';
import useQueryParams from '@utils/hooks/useQueryParams';
import usePopupAlert from '@utils/hooks/usePopupAlert';

function useAction(props) {
  const { productId, form, data } = props;
  const { formServices } = useSelector((state) => state.productConfig);
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { enqueueSnackbar } = useSnackbar();
  const { queryParams } = useQueryParams();
  const { id: orderNumber } = queryParams;

  const servicesWatch = useWatch({
    control: form.control,
    name: 'services',
  });

  // disabled itHallRackTotal

  // fetch options data
  const fetchLocations = async () => {
    dispatch(progressLocation(true));
    try {
      const response = await getOptionsData('location');
      dispatch(setLocations(response.data));
    } catch (error) {
      dispatch(progressLocation(false));
    }
  };

  const fetchAgents = async () => {
    dispatch(progressAgents(true));
    try {
      const response = await getOptionsData('agent-principle');
      dispatch(setAgents(response.data));
    } catch (error) {
      dispatch(progressAgents(false));
    }
  };

  const fetchItHallRackType = async () => {
    dispatch(progressItHallRackTypes(true));
    try {
      const response = await getOptionsData('ithall-rack-type');
      dispatch(setItHallRackTypes(response.data));
    } catch (error) {
      dispatch(progressItHallRackTypes(false));
    }
  };

  const fetchItHallByAmpere = async (ampereOption = 'ithall-single-ampere') => {
    dispatch(progressItHallAmperes(true));
    try {
      const response = await getOptionsData(ampereOption);
      dispatch(setItHallAmperes(response.data));
    } catch (error) {
      dispatch(progressItHallAmperes(false));
    }
  };

  const fetchNerRackTypes = async () => {
    dispatch(progressNerRackTypes(true));
    try {
      const response = await getOptionsData('ner-rack-type');
      dispatch(setNerRackTypes(response.data));
    } catch (error) {
      dispatch(progressNerRackTypes(true));
    }
  };

  const fetchNerAmperes = async () => {
    dispatch(progressNerAmperes(true));
    try {
      const response = await getOptionsData('ner-ampere');
      dispatch(setNerAmperes(response.data));
    } catch (error) {
      dispatch(progressNerAmperes(false));
    }
  };

  const fetchMembersNcix = async () => {
    dispatch(progressMembersNcix(true));
    try {
      const response = await getOptionsData('membership-ncix');
      dispatch(setMembersNcix(response.data));
    } catch (error) {
      dispatch(progressMembersNcix(false));
    }
  };

  const handleRemoveFormService = (formServiceItem) => {
    dispatch(removeFormService(formServiceItem));
    const currentServices = { ...servicesWatch };
    delete currentServices[formServiceItem];
    form.setValue('services', currentServices);
  };

  const handleAddRentRackNER = async (checked) => {
    form.setValue('withRentRackNER', checked);
    form.setValue(`services.${SERVICE_ITEM_NER}`, {});
    if (checked) {
      dispatch(
        addFormService({
          item: SERVICE_ITEM_NER,
          forms: [
            {
              type: 'select',
              label: 'NER Rack Type',
              name: 'nerRackType',
              placeholder: 'Choose NER Rack Type',
              options: RACK_AND_FIBER_OPTIONS,
              required: true,
              staticWidth: '100%',
            },
            {
              type: 'select',
              label: 'NER Ampere (Amp)',
              name: 'nerAmpere',
              placeholder: 'Choose NER Ampere (Amp)',
              options: RACK_AND_FIBER_OPTIONS,
              required: true,
              staticWidth: '100%',
            },
            {
              type: 'number',
              label: 'NER Rack Total',
              name: 'nerRackTotal',
              required: true,
              defaultValue: 1,
            },
            {
              type: 'select',
              label: 'NER Rack Utp',
              name: 'nerRackUtp',
              placeholder: 'Choose NER Ampere (Amp)',
              options: RACK_AND_FIBER_OPTIONS,
              defaultValue: '0',
            },
            {
              type: 'select',
              label: 'NER Add Fiber',
              name: 'nerFiber',
              placeholder: 'Choose NER Fiber',
              options: RACK_AND_FIBER_OPTIONS,
              defaultValue: '0',
            },
            {
              type: 'select',
              label: 'NER Add JlrTrans',
              name: 'nerJlrTrans',
              placeholder: 'Choose NER JlrTrans',
              options: RACK_AND_FIBER_OPTIONS,
              defaultValue: '0',
            },
          ],
        }),
      );
      await Promise.all([fetchNerRackTypes(), fetchNerAmperes()]);
    } else {
      handleRemoveFormService(SERVICE_ITEM_NER);
    }
  };

  const handleAddNcix = async (checked) => {
    form.setValue('withNcix', checked);
    form.setValue(`services.${SERVICE_ITEM_NCIX}`, {});
    if (checked) {
      dispatch(
        addFormService({
          item: SERVICE_ITEM_NCIX,
          forms: [
            {
              type: 'select',
              label: 'NCIX Port',
              name: 'ncixMembership',
              placeholder: 'Choose NCIX Port',
              required: true,
              staticWidth: '100%',
            },
            {
              type: 'select',
              label: 'MLP/BLP Type',
              name: 'mlpBlpType',
              placeholder: 'Choose MLP/BLP Type',
              options: MLP_BLP_OPTIONS,
              required: true,
            },
            {
              type: 'select',
              label: 'Port NCIX',
              name: 'NCIXPort',
              placeholder: 'Choose Port NCIX',
              options: RACK_AND_FIBER_OPTIONS,
              required: true,
              defaultValue: '0',
            },
          ],
        }),
      );
      await fetchMembersNcix();
    } else {
      handleRemoveFormService(SERVICE_ITEM_NCIX);
    }
  };

  const handleOnChangeAdditional = (formField, name, value) => {
    // fetch itHall by power
    if (name === 'itHallPower') {
      fetchItHallByAmpere(value);
    }

    // validate
    const validateRackTotal = ['itHallRackTotal', 'nerRackTotal'];
    if (validateRackTotal.includes(name)) {
      const rackTotalValue = parseInt(value);
      if (rackTotalValue <= 0) {
        form.setError(formField, {
          type: 'custom',
          message: 'Must be filled with greater than 0',
        });
      }
    }

    if (name === 'itHallRackType') {
      const formServiceIndex = formServices.findIndex(
        (item) => item.item === SERVICE_ITEM_IT_HALL,
      );
      // disabled itHallRackTotal
      const newItHallForms = [...formServices[formServiceIndex].forms].map(
        (item) => {
          const isPrivateSuite =
            item.name === 'itHallRackTotal' &&
            value?.toLowerCase() === 'private suite';

          return {
            ...item,
            disabled: isPrivateSuite,
          };
        },
      );

      // update formServices states
      dispatch(
        updateFormService({
          index: formServiceIndex,
          forms: newItHallForms,
        }),
      );
    }
  };

  const fetchDefaultOptions = async () =>
    await Promise.all([fetchLocations(), fetchAgents(), fetchItHallRackType()]);

  const resetForm = () => {
    setStep(1);
    form.reset();
  };

  const onSubmit = async (onSuccess) => {
    if (step === 2) {
      const values = { ...form.getValues() };
      const services = convertServiceToPayload(values.services, values.price);

      delete values.withNcix;
      delete values.withRentRackNER;
      delete values.step;

      const summary = getSummary(values.price, {
        itHall: ['base', ...priceForms(values.services, SERVICE_ITEM_IT_HALL)],
        NER: values.services[SERVICE_ITEM_NER]
          ? ['base', ...priceForms(values.services, SERVICE_ITEM_NER)]
          : null,
        NCIX: values.services[SERVICE_ITEM_NCIX]
          ? ['base', ...priceForms(values.services, SERVICE_ITEM_NCIX)]
          : null,
      });

      delete values.price;

      const payload = cleanObject({
        status: 'am approval',
        label: 'draft',
        productFlow: data?.productFlow,
        productId,
        pageDraftNumber: 3,
        product: [
          {
            ...values,
            services,
            agentOrPrinciple: values.agentOrPrinciple['value'],
            location: values.location['value'],
            otc: summary[0],
            mrc: summary[1],
          },
        ],
      });

      try {
        setLoadingAlert();
        await updateStatus(orderNumber, payload);
        enqueueSnackbar('Document saved as draft.');
        setSuccessAlert({
          message: 'Success update service',
          onClose: onSuccess && onSuccess(),
        });
        resetForm();
      } catch (error) {
        setFailedAlert({ message: 'Failed to update service' });
      }
    }
    setStep(step + 1);
    form.setValue('step', step + 1);
  };

  const onPrevious = () => {
    setStep(1);
    form.setValue('step', 1);
  };

  return {
    form,
    step,
    setStep,
    handleAddNcix,
    handleAddRentRackNER,
    handleRemoveFormService,
    handleOnChangeAdditional,
    onSubmit,
    onPrevious,
    fetchItHallByAmpere,
    fetchDefaultOptions,
  };
}

export default useAction;
