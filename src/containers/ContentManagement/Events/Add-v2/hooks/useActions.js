import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { languages, dummyText, dummyTextEng } from '../constant';
import validation from '../yupResolver';
import { payloadEvent } from './payload';
import {
  fetchSubmitContent,
  getListProduct,
  // checkValidationUnique,
  getDetailContent,
  savePriviewPage,
} from '@containers/ContentManagement/Events/_repositories/repositories';
import { isHaveAccess, cleanObject } from '@utils/common';
import { useSnackbar } from 'notistack';
import { isEmptyItemsRundown } from '../utils';
import { dateFormat } from '@utils/parser';
import { normalizeDetail } from './normalizeDetail';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = ({ feature }) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const {
    handleSubmit,
    formState,
    control,
    getValues,
    setValue,
    watch,
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      pastLink: '',
      speakers: [],
      attendees: [],
      titleid: '',
      titleen: '',
      descriptionid: dummyText.description,
      descriptionen: dummyTextEng.description,
      startDate: null,
      endDate: null,
      slugid: '',
      slugen: '',
      rundownid: [],
      rundownen: [],
      endTimeRundown: '',
    },
  });

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { enqueueSnackbar } = useSnackbar();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [tab, setTab] = useState(languages[0].value);
  const [isDisplaySpeakers, setIsDisplaySpeakers] = useState(true);
  const [isDisplayAttendees, setIsDisplayAttendees] = useState(true);
  const [isDisplaySponsor, setIsDisplaySponsor] = useState(true);
  const [isDisplayRundown, setIsDisplayRundown] = useState(true);
  const [isDisplayRelatedProduct, setIsDisplayRelatedProduct] = useState(true);
  const [productOption, setProductOption] = useState([
    { label: 'Pilih product terkait', value: '' },
  ]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [dataEvent, setDataEvent] = useState({});
  const [idPreviewPage, setIdPreviewPage] = useState('');
  const [isClickPreview, setIsClickPreview] = useState(false);

  useEffect(() => {
    fetchListProduct();
    trigger('titleid');
    trigger('titleen');
  }, []);

  const handleSetDataEvent = (data) => {
    reset({ ...normalizeDetail(data) });
    setValue('slugid', data?.localizations[0]?.slug);
    setValue('slugen', data?.localizations[1]?.slug);
    setIsDisplaySpeakers(data?.speakers.isDisplay);
    setIsDisplayAttendees(data?.attendees.isDisplay);
    setIsDisplaySponsor(data?.sponsors.isDisplay);
    setIsDisplayRelatedProduct(data?.relatedProduct.isDisplay);
    setIsDisplayRundown(data?.localizations[0]?.rundown.isDisplay);
  };

  const fetchDataEvent = async () => {
    setIsLoadingDetail(true);

    try {
      const { data } = await getDetailContent(id);
      handleSetDataEvent(data);
      setDataEvent(data);
    } catch (e) {
      setDataEvent({});
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // const isEdit = dataEvent && Object.keys(dataEvent).length > 0 ? true : false;
  const isEdit = id ? true : false;

  useEffect(() => {
    if (id) {
      fetchDataEvent();
    }
  }, [id]);

  useEffect(() => {
    if (dataEvent && Object.keys(dataEvent).length !== 0) {
      setValue('rundownid', dataEvent?.localizations[0]?.rundown.items);
      setValue('rundownen', dataEvent?.localizations[1]?.rundown.items);
    }
  }, [dataEvent]);

  const tabsProps = {
    variant: 'centered',
    options: languages,
    value: tab,
    onChange: setTab,
  };

  const display = {
    isDisplaySpeakers,
    isDisplayAttendees,
    isDisplaySponsor,
    isDisplayRelatedProduct,
    isDisplayRundown,
  };

  const handleAfterSubmit = () => () =>
    id
      ? router.push(`/events-management/detail/${id}`)
      : router.push('/events-management');

  const submitEvent = async (value, saveAsDraft) => {
    setConfirmation();
    !saveAsDraft && setLoadingAlert();
    setIsLoading(true);

    const allData = saveAsDraft ? getValues() : value;
    const payload = cleanObject(
      payloadEvent(allData, saveAsDraft, display, dataEvent, id),
    );

    try {
      const { data } = await fetchSubmitContent({
        data: payload,
        method: `${id ? 'PUT' : 'POST'}`,
        id: `${id ? dataEvent.eventId : ''}`,
      });

      if (saveAsDraft) {
        enqueueSnackbar(`Event saved as draft.`);
        setTimeout(() => {
          router.push('/events-management');
        }, 1500);
      } else {
        data &&
          setSuccessAlert({
            message: `Event successfully ${id ? 'edited' : 'added'}`,
            onClose: handleAfterSubmit(),
          });
      }
    } catch (err) {
      setFailedAlert({
        message:
          (typeof err.message === 'string' && err?.message) ||
          `Failed to ${id ? 'Edit' : 'Add'} Event`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvent =
    (value, saveAsDraft = false) =>
    async () => {
      submitEvent(value, saveAsDraft);

      // BACKUP IF NEEDED
      // setLoadingAlert();

      // //check unique event name
      // const payloadCheck = [
      //   { language: 'id', title: value?.titleid },
      //   { language: 'en', title: value?.titleen }
      // ];

      // try {
      //   const resultCheck = await checkValidationUnique({
      //     data: payloadCheck,
      //     type: 'event',
      //     action: isEdit ? 'update' : 'create',
      //     id: isEdit ? id : ''
      //   });

      //   resultCheck?.code === 200 ?
      //     submitEvent(value, saveAsDraft) :
      //     setFailedAlert({ message: resultCheck?.message });

      // } catch (error) {
      //   if (saveAsDraft) setFailedAlert({ message: error?.message || `Failed to save as draft event` });
      //   else setFailedAlert({ message: error?.message || `Failed to save event` });
      // }
    };

  const handleAddEvent = (value) => {
    if (
      isEdit
        ? isHaveAccess(feature, 'update_event')
        : isHaveAccess(feature, 'create_event')
    ) {
      setConfirmation({
        message: `Are you sure want to ${id ? 'edit' : 'add'} this event?`,
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchEvent(value) },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to ${id ? `edit` : `add`} event.`,
      });
    }
  };

  const fetchListProduct = async () => {
    setLoadingProduct(true);

    const params = { page: 1, size: 1000 }; //product v1

    try {
      const { data } = await getListProduct({ params });
      let remappedProduct = [];

      data.length > 0 &&
        data.map((item) =>
          remappedProduct.push({
            // label: item.name, //product v2
            // value: item.catId //product v2
            label: item.productName, //product v1
            value: item.productId.toString(), //product v1
          }),
        );

      setProductOption(remappedProduct);
    } catch (error) {
      setProductOption([]);
    } finally {
      setLoadingProduct(false);
    }
  };

  const sectionTreeOptions = [
    {
      customOption: {
        type: 'star',
      },
      value: 'registrationLink',
      label: 'Registration Link',
    },
    {
      customOption: {
        onChange: () => setIsDisplayRelatedProduct(!isDisplayRelatedProduct),
        type: 'switch',
        value: isDisplayRelatedProduct,
      },
      value: 'relatedProducts',
      label: 'Related Products',
    },
    {
      customOption: {
        type: 'star',
      },
      value: 'eventDetails',
      label: 'Event Details',
    },
    {
      customOption: {
        type: 'star',
      },
      value: 'eventBanner',
      label: 'Event Banner',
    },
    {
      customOption: {
        onChange: () => setIsDisplaySpeakers(!isDisplaySpeakers),
        type: 'switch',
        value: isDisplaySpeakers,
      },
      label: 'Speakers',
    },
    {
      customOption: {
        onChange: () => setIsDisplayAttendees(!isDisplayAttendees),
        type: 'switch',
        value: isDisplayAttendees,
      },
      label: 'Attendees',
    },
    {
      customOption: {
        onChange: () => setIsDisplayRundown(!isDisplayRundown),
        type: 'switch',
        value: isDisplayRundown,
      },
      label: 'Rundown',
    },
    {
      customOption: {
        onChange: () => setIsDisplaySponsor(!isDisplaySponsor),
        type: 'switch',
        value: isDisplaySponsor,
      },
      label: 'Sponsor',
    },
  ];

  //validation
  const isValidContent =
    !getValues('imageBanner') ||
    !watch('startDate') ||
    !watch('endDate') ||
    getValues('descriptionid') === dummyText.description ||
    getValues('descriptionen') === dummyTextEng.description;

  const isValidRundown = isDisplayRundown
    ? isEmptyItemsRundown(watch('rundownid')) ||
      isEmptyItemsRundown(watch('rundownen'))
    : false;

  const handlePreviewPage = async () => {
    setIsLoading(true);
    setIsClickPreview(true); // for flag preview clicked

    const dt = payloadEvent(getValues(), false, display, dataEvent, id, true);

    if (Object.keys(dt).length > 0) {
      const isEventOver =
        dateFormat({ date: new Date(), type: 'iso' }) >=
        dateFormat({ date: dt.startDate, type: 'iso' });

      const itemsRundown =
        tabsProps.value === 'id'
          ? dt.localizations[0].rundown.items
          : dt.localizations[1].rundown.items;

      const lengthRundown = dt.localizations[0].rundown.items.length;
      const lengthRundownFirstItems =
        dt.localizations[0].rundown.items[0]?.items.length;
      const lengthRundownLastItem =
        dt.localizations[0].rundown?.items[lengthRundown - 1]?.items.length;

      const getMinTime =
        lengthRundownFirstItems > 0 &&
        dt.localizations[0].rundown?.items[0].items[0].startTime;

      const getMaxTime =
        dt.localizations[0].rundown.items.length > 1
          ? dt.localizations[0].rundown?.items[lengthRundown - 1]?.items[
              lengthRundownLastItem - 1
            ]?.endTime
          : dt.localizations[0].rundown?.items[lengthRundown - 1]?.items[
              lengthRundownFirstItems - 1
            ]?.endTime;

      const payloadPreview = {
        eventRegistration: dt.eventRegistration,
        pastLink: isEventOver && dt.pastLink,
        relatedProduct: display.isDisplayRelatedProduct
          ? dt.relatedProduct.items
          : [],
        imageBanner: dt.imageBanner,
        startDate:
          lengthRundownFirstItems > 0
            ? dateFormat({ date: getMinTime, type: 'iso' })
            : dateFormat({ date: dt.startDate, type: 'iso' }),
        endDate:
          lengthRundownFirstItems > 0
            ? dateFormat({ date: getMaxTime, type: 'iso' })
            : dateFormat({ date: dt.endDate, type: 'iso' }),
        location: dt.location,
        typeLocation: dt.typeLocation,
        title:
          tabsProps.value === 'id'
            ? dt.localizations[0].title
            : dt.localizations[1].title,
        description:
          tabsProps.value === 'id'
            ? dt.localizations[0].description
            : dt.localizations[1].description,
        rundown: display.isDisplayRundown ? itemsRundown : [],
        speakers: display.isDisplaySpeakers ? dt.speakers.items : [],
        attendees: display.isDisplayAttendees ? dt.attendees.items : [],
        sponsors: display.isDisplaySponsor ? dt.sponsors.items : [],
        eventId: dt?.eventId || '',
      };

      try {
        const { data } = await savePriviewPage(payloadPreview);
        data.keyId && setIdPreviewPage(data.keyId);
      } catch (error) {
        setIdPreviewPage('');
      } finally {
        setIsLoading(false);
        setOpenPreview(true);
        setIsClickPreview(false);
      }
    }
  };

  return {
    id,
    dataEvent,
    router,
    handleSubmit,
    formState,
    control,
    getValues,
    setValue,
    watch,
    isLoading,
    isLoadingDetail,
    openPreview,
    setOpenPreview,
    displaySpeakers: { isDisplaySpeakers, setIsDisplaySpeakers },
    displayAttendees: { isDisplayAttendees, setIsDisplayAttendees },
    displaySponsor: { isDisplaySponsor, setIsDisplaySponsor },
    displayRelatedProduct: {
      isDisplayRelatedProduct,
      setIsDisplayRelatedProduct,
    },
    displayRundown: { isDisplayRundown, setIsDisplayRundown },
    tabsProps,
    handleAddEvent,
    fetchEvent,
    productOption,
    loadingProduct,
    filterSectionTree: {
      options: sectionTreeOptions,
      value: { value: '', label: 'Section Tree' },
    },
    isValidContent,
    isValidRundown,
    isEdit,
    handlePreviewPage,
    idPreviewPage,
    isClickPreview,
    handleAfterSubmit, //for testing
  };
};

export default useActions;
