import { postDraftOfferingLetter } from '@containers/Document/OfferingLetter/_repositories/repositories';
import { cleanObject } from '@utils/common';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useQueryParams from '@utils/hooks/useQueryParams';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';

const useAction = (props) => {
  const { setTab: _setTab, updateData } = props;
  const [isChanged, setIsChanged] = useState(false);
  const [notes, setNotes] = useState(
    `*)  Tidak termasuk harga pajak \n*)  Tidak termasuk harga fitur tambahan`,
  );
  const [currentService, setCurrentService] = useState([]);

  useEffect(() => {
    setCurrentService(props?.data?.products);
    if (props?.data?.notes) {
      setNotes(props?.data?.notes);
    }
  }, [props?.data]);

  const [formService, _setFormService] = useState({
    type: '',
    defaultValue: null,
    formInfo: {
      pricingIndex: null,
      serviceIndex: null,
    },
  });

  const setFormService = (val) => () => _setFormService(val);

  const onFormSubmit = ({
    values,
    type,
    formInfo: { serviceIndex, pricingIndex },
  }) => {
    setIsChanged(true);
    if (['new', 'add'].includes(type)) {
      if (typeof serviceIndex === 'number') {
        const { pricing, slg } = values;

        let tempService = [...currentService];
        tempService[serviceIndex] = {
          ...currentService[serviceIndex],
          pricing: [...currentService[serviceIndex].pricing, pricing],
          slg,
        };
        setCurrentService(tempService);
      } else {
        const { pricing, ...other } = values;

        const newService = {
          ...other,
          pricing: [pricing],
        };
        setCurrentService([...currentService, newService]);
      }
    } else {
      const { pricing, slg } = values;

      let tempService = [...currentService];
      tempService[serviceIndex] = {
        ...currentService[serviceIndex],
        pricing: currentService[serviceIndex].pricing.map((d, i) =>
          i === pricingIndex ? pricing : d,
        ),
        slg,
      };
      setCurrentService(tempService);
    }
  };

  const onDeleteService =
    ({ serviceIndex, pricingIndex }) =>
    () => {
      if (typeof pricingIndex === 'number') {
        let tempService = [...currentService];
        tempService[serviceIndex] = {
          ...currentService[serviceIndex],
          pricing: currentService[serviceIndex].pricing.filter(
            (d, i) => i !== pricingIndex,
          ),
        };
        setCurrentService(tempService.filter((d) => d.pricing.length > 0));
      } else if (typeof serviceIndex === 'number') {
        setCurrentService(currentService.filter((d, i) => i !== serviceIndex));
      }
    };

  const onAddService =
    ({ data, serviceIndex }) =>
    () => {
      const {
        epicProduct,
        productId,
        productName,
        productParam,
        slg,
        pricing,
      } = data;
      _setFormService({
        type: 'add',
        formInfo: {
          serviceIndex,
        },
        defaultValues: {
          price: epicProduct ? 'auto' : 'manual',
          detailFields: !epicProduct
            ? pricing[0].detailFields.map(({ fieldName }) => ({
                fieldName,
                fieldValue: '',
              }))
            : {},
          serviceName: {
            label: productName,
            value: epicProduct ? productParam : productName,
            data: {
              epicProduct,
              productId,
              productParam,
              productName,
            },
          },
          slg,
        },
      });
    };

  const onEditService =
    ({ data, serviceIndex, pricingIndex }) =>
    () => {
      const {
        epicProduct,
        productId,
        productName,
        productParam,
        slg,
        pricing,
      } = data;
      _setFormService({
        type: 'edit',
        formInfo: {
          serviceIndex,
          pricingIndex,
        },
        defaultValues: {
          price: epicProduct ? 'auto' : 'manual',
          ...pricing[pricingIndex].formValues,
          total: pricing[pricingIndex].total,
          serviceName: {
            label: productName,
            value: epicProduct ? productParam : productName,
            data: {
              epicProduct,
              productId,
              productParam,
              productName,
            },
          },
          slg,
        },
      });
    };

  const { enqueueSnackbar } = useSnackbar();
  const { queryParams } = useQueryParams();

  const offeringLetterId = queryParams.id;

  const [submitLoading, setSubmitLoading] = useState(null);

  const totalPrice = useMemo(() => {
    let arrayOfTotal = [];
    currentService?.map(({ pricing }) =>
      pricing.map(({ total }) => arrayOfTotal.push(total)),
    );

    return arrayOfTotal.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }, [currentService]);

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const setTab = (tab) => {
    closeConfirmation();
    _setTab(tab);
  };

  // type: 'next' | 'draft' | 'previous
  const fetchDraftOfferingLetter = async ({ type, destinationStep }) => {
    setSubmitLoading(type);
    const _payload = {
      data: {
        products: currentService,
        totalPrice,
        notes,
      },
      step: 2,
    };

    const payload = cleanObject(_payload);

    try {
      const result = await postDraftOfferingLetter(offeringLetterId, payload);
      updateData(result.data);
      setTab(destinationStep);
      setSubmitLoading(false);
      enqueueSnackbar('Document saved as draft.');
    } catch (error) {
      setSubmitLoading(false);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const onSubmit = (type, _destinationStep) => () => {
    const destinationStep =
      _destinationStep ||
      {
        next: 3,
        previous: 1,
        draft: 2,
      }[type];

    if (!isChanged && !!currentService?.length) {
      setTab(destinationStep);
    } else if (
      !currentService?.length &&
      !!props.data?.products?.length &&
      type === 'previous'
    ) {
      setConfirmation({
        message: 'Are you sure that you want leave this form?',
        action: [
          { children: 'no', variant: 'ghost', onClick: closeConfirmation },
          { children: 'yes', onClick: () => setTab(destinationStep) },
        ],
      });
    } else if (!currentService?.length) {
      setTab(destinationStep);
    } else {
      fetchDraftOfferingLetter({ type, destinationStep });
    }
  };

  const onStepperClick = (_destinationStep) => {
    const destinationStep = _destinationStep + 1;
    const type = destinationStep > 2 ? 'next' : 'previous';
    onSubmit(type, destinationStep)();
  };

  return {
    currentService,
    formService,
    notes,
    onAddService,
    onDeleteService,
    onEditService,
    onFormSubmit,
    setFormService,
    setNotes,
    totalPrice,
    submitLoading,
    onSubmit,
    onStepperClick,
  };
};

export default useAction;
