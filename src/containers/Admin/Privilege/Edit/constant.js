export const breadcrumb = (data) => [
  { label: 'Privilege Management', url: '/privilege-management' },
  {
    label: data.journey,
    url: `/privilege-management/detail/${data.journeyId}`,
  },
  { label: 'Edit Privilege' },
];

export const actionButton = ({
  confirmationSave,
  isDisabled,
  cancel,
  isLoading,
}) => [
  {
    children: 'Cancel',
    noDivider: true,
    loading: isLoading,
    onClick: () => cancel(),
    variant: 'primary',
  },
  {
    children: 'Save',
    loading: isLoading,
    disabled: isDisabled,
    onClick: () => confirmationSave(),
    variant: 'ghost',
  },
];
