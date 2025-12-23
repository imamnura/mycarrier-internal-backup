import { React, useEffect, useState } from 'react';
import { route } from '@configs';
import Button from '@components/Button';
import {
  getDropdownOption,
  getDetailNonBulk,
  checkBrandName,
  updateNonBulk,
  getDetailCampaign,
} from '../../_repositories/repositories';
import datetime from '@__old/utils/datetime';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import validation from '../validation';
import { optionsParse } from '../utils';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { cleanObject } from '@utils/common';

const useAction = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { setLoadingAlert, setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [detail, setDetail] = useState({});
  const [dataCampaign, setDataCampaign] = useState({});
  const [detailedCampaign, setDetailedCampaign] = useState([]);
  const [confirmation, setConfirmation] = useState({
    actions: [],
    content: '',
  });
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [buttonCampaign, setButtonCampaign] = useState({});

  const [optionsIndustryCategory, setOptionsIndustryCategory] = useState([]);
  const [optionsChannel, setOptionsChannel] = useState([]);
  const [optionsCampaignType, setOptionsCampaignType] = useState([]);
  const [optionsGender, setOptionsGender] = useState([]);
  const [optionsReligion, setOptionsReligion] = useState([]);

  const validatePath = router.asPath === route.nonBulk('edit', id);

  const { control, formState, handleSubmit, reset, watch, setValue } = useForm({
    resolver: validation,
    mode: 'all',
    reValidateMode: 'onSubmit',
  });

  const { isValid } = formState;
  const campaignType = watch('campaignType');
  const channel = watch('channel');
  const senderId = watch('senderId');

  const getOptionIndustryCategory = async () => {
    try {
      const result = await getDropdownOption({
        params: { type: 'industryCategory' },
      });
      setOptionsIndustryCategory(optionsParse(result.data, 'dropdownValue'));
    } catch (error) {
      setOptionsIndustryCategory([]);
    }
  };

  const getOptionChannel = async () => {
    try {
      const result = await getDropdownOption({ params: { type: 'channel' } });
      setOptionsChannel(optionsParse(result.data));
    } catch (error) {
      setOptionsChannel([]);
    }
  };

  const getOptionCampaignType = async () => {
    try {
      const result = await getDropdownOption({
        params: { type: 'campaignType' },
      });
      setOptionsCampaignType(optionsParse(result.data));
    } catch (error) {
      setOptionsCampaignType([]);
    }
  };

  const getOptionGender = async () => {
    try {
      const result = await getDropdownOption({ params: { type: 'gender' } });
      setOptionsGender(optionsParse(result.data));
    } catch (error) {
      setOptionsGender([]);
    }
  };

  const getOptionReligion = async () => {
    try {
      const result = await getDropdownOption({ params: { type: 'religion' } });
      setOptionsReligion(optionsParse(result.data));
    } catch (error) {
      setOptionsReligion([]);
    }
  };

  const fetchDetail = async (orderNumber) => {
    try {
      setLoadingData(true);
      const { data } = await getDetailNonBulk(orderNumber);
      setStep(checkLastChange(data));
      setDetail(data);
      setDetailedCampaign(campaignListData(data?.campaignList));
    } catch (e) {
      if (['You are not allowed to access this menu!'].includes(e.message)) {
        setFailedAlert({
          message: e.message,
        });
      }
      setDetail({});
    } finally {
      setLoadingData(false);
    }
  };

  const checkLastChange = (data) => {
    const { brandAndproductOrder } = data || {};
    if (brandAndproductOrder) return 0;
    else return -1;
  };

  useEffect(() => {
    if (id) {
      fetchDetail(id);
      getOptionIndustryCategory();
      getOptionChannel();
      getOptionCampaignType();
      getOptionGender();
      getOptionReligion();
    }
  }, [id]);

  useEffect(() => {
    reset({
      ...detail?.brandAndproductOrder,
    });
  }, [detail]);

  const checkBN = async (brandName, callback) => {
    const data = {
      masterBrand: brandName,
    };

    if (validatePath) {
      try {
        setLoading(true);
        setLoadingAlert();
        const res = await checkBrandName(data);
        if (res.success) {
          callback();
        }
      } catch (e) {
        setFailedAlert({ message: 'Brand Name Failed' });
        setLoading(false);
      }
    }
  };

  const editNonBulk = async (payload) => {
    if (validatePath) {
      const data = {
        ...payload,
        campaignOrder:
          detailedCampaign &&
          detailedCampaign
            .filter((v) => v.isEdited === true)
            .map((v) => ({
              quantity: v?.quantity,
              location: v?.location,
              wording: v?.wording,
              gender: v?.gender,
              minimumAge: v?.minimumAge,
              maximumAge: v?.maximumAge,
              minimumARPU: v?.minimumARPU,
              maximumARPU: v?.maximumARPU,
              religion: v?.religion,
              imageUrl:
                v?.documentAttachment?.length > 0
                  ? v?.documentAttachment[0]?.mediaPath
                  : '',
              smsPerDayLocation: v?.smsPerDayLocation,
              campaignStartDate: v?.campaignStartDate,
              campaignEndDate: v?.campaignEndDate,
              campaignChildId: v?.campaignChild,
              status: v?.statusCampaignOrder,
              description: v?.description,
            })),
      };

      try {
        const res = await updateNonBulk(id, data);
        if (res.data) {
          setSuccessAlert({
            message: 'Non Bulk activation request succesfully edited',
            onClose: () =>
              router.push(
                route.nonBulk('detail', res.data.orderInformation.orderNumber),
              ),
          });
        }
      } catch (e) {
        setFailedAlert({
          message: 'Non Bulk activation request failed edited',
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const campaignListData = (data) => {
    return (
      data &&
      data.map((v) => {
        return {
          ...v,
          campaignDate: `${datetime(
            v.campaignStartDate,
            'date-time-custom',
          )} - ${datetime(v.campaignEndDate, 'date-time-custom')}`,
          action: (
            <Button onClick={() => onClickCampaign(v)} variant="ghost">
              View Details
            </Button>
          ),
        };
      })
    );
  };

  const handleChangeStep = (step, newStep) => isValid && setStep(newStep);
  const clearConfirmation = () => setConfirmation({ actions: [], content: '' });

  const onSubmit = (val) => {
    setConfirmation({
      actions: [
        { label: 'No', action: clearConfirmation },
        {
          label: 'Yes',
          action: () => {
            clearConfirmation();
            checkBN(val.brandName, () => editNonBulk(val));
          },
        },
      ],
      content: 'Are you sure want to edit this request?',
    });
  };

  const normalizeCampaignDate = (date, time) => {
    return datetime(
      `${datetime(date, 'date')} ${datetime(time, 'time')}`,
      'iso',
    );
  };

  const updateDetailedCampaign = (val) => {
    const updatedData = detailedCampaign.map((campaign) =>
      campaign.campaignChild === selectedCampaign
        ? cleanObject({
            ...val,
            campaignChild: selectedCampaign,
            campaignStartDate: normalizeCampaignDate(
              val?.campaignDate,
              val?.campaignStartTime,
            ),
            campaignEndDate: normalizeCampaignDate(
              val?.campaignDate,
              val?.campaignEndTime,
            ),
            documentAttachment: [
              {
                fileName: val?.media?.fileName || val?.media?.data?.mediaName,
                fileUrl: val?.media?.fileUrl || val?.media?.data?.mediaURL,
                fileType: val?.media?.fileType || val?.media?.data?.mediaType,
                mediaPath: val?.media?.mediaPath || val?.media?.data?.mediaPath,
              },
            ],
            isEdited: true,
            media: null,
          })
        : campaign,
    );

    setDetailedCampaign(campaignListData(updatedData));
    setStep(1);
    setSelectedCampaign(null);
    setSuccessAlert({ message: '' });
  };

  const onSubmitCampaign = (val) => {
    setConfirmation({
      actions: [
        { label: 'No', action: clearConfirmation },
        {
          label: 'Yes',
          action: () => {
            clearConfirmation();
            setLoadingAlert();
            updateDetailedCampaign(val);
          },
        },
      ],
      content: 'Are you sure want to edit this campaign?',
    });
  };

  const onClickCampaign = async (value) => {
    const params = {
      orderNumber: id,
      campaignChild: value.campaignChild,
    };
    if (value.isEdited) {
      setSelectedCampaign(value.campaignChild);
      setDataCampaign(value);
      setStep(99);
    } else {
      try {
        setLoadingAlert();
        setSelectedCampaign(value.campaignChild);
        const { data } = await getDetailCampaign({ params, withCancel: true });
        setDataCampaign(data);
        setSuccessAlert({ message: '' });
        setStep(99);
      } catch (e) {
        setDataCampaign({});
        setFailedAlert({ message: 'Campaign Detail failed' });
      }
    }
  };

  const optionsChannelFiltered =
    optionsChannel &&
    optionsChannel.filter((o) => {
      const valueLow = o.value.toLowerCase();
      return valueLow.includes(campaignType?.toLowerCase());
    });

  useEffect(() => {
    if (optionsChannelFiltered.length > 0) {
      const isOptionCorrect = optionsChannelFiltered.findIndex(({ value }) => {
        return value === channel;
      });
      if (isOptionCorrect < 0) {
        setValue('channel', '');
      }
    }
  }, [campaignType]);

  const options = {
    industryCategory: optionsIndustryCategory,
    channel: optionsChannelFiltered,
    campaignType: optionsCampaignType,
    gender: optionsGender,
    religion: optionsReligion,
  };

  return {
    confirmation,
    setConfirmation,
    channel,
    control,
    checkLastChange,
    clearConfirmation,
    detail,
    detailedCampaign,
    formState,
    handleChangeStep,
    handleSubmit,
    loading,
    loadingData,
    options,
    onSubmit,
    step,
    setStep,
    dataCampaign,
    senderId,
    buttonCampaign,
    setButtonCampaign,
    onSubmitCampaign,
    setSelectedCampaign,
  };
};

export default useAction;
