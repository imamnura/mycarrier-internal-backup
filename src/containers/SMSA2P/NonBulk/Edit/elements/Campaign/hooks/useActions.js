import { useEffect } from 'react';
import { validation } from '../validation';
import { isChannelMMS } from '../../../utils';
import { useForm } from 'react-hook-form';

const useAction = (props) => {
  const { defaultValues, channel, setButton, onSubmit } = props;

  const { control, formState, handleSubmit, watch } = useForm({
    resolver: validation(isChannelMMS(channel || '')),
    mode: 'all',
    reValidateMode: 'onSubmit',
    defaultValues: {
      ...defaultValues,
      campaignDate: defaultValues?.campaignStartDate,
      campaignStartTime: defaultValues?.campaignStartDate,
      campaignEndTime: defaultValues?.campaignEndDate,
      media: defaultValues?.documentAttachment[0],
    },
  });

  const wording = watch('wording');
  const media = watch('media');

  const { isValid, isDirty } = formState;

  const inValidForm = !isDirty || !isValid;

  useEffect(() => {
    setButton({
      children: 'Save',
      onClick: handleSubmit((value) => onSubmit(value)),
      disabled: inValidForm,
    });
  }, [inValidForm]);

  const preview = {
    wording,
    src: media?.fileUrl || media?.data?.mediaURL,
    type: media?.fileType || media?.data?.mediaType,
    name: media?.fileName || media?.data?.mediaName,
  };

  return {
    control,
    formState,
    handleSubmit,
    preview,
  };
};

export default useAction;
