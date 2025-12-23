import React from 'react';
import Create from '@fragments/Create';
import { route } from '@configs/index';
import useAction from './hooks/useAction';
import Wysiwyg from '@components/Wysiwyg';

const SendBillingReminder = () => {
  const {
    bpNumber,
    count,
    loading,
    loadingDraft,
    onDiscard,
    onDraft,
    onSubmit,
    setValue,
    value,
  } = useAction();

  return (
    <Create
      action={[
        {
          children: 'Save as draft',
          onClick: onDraft,
          variant: 'ghost',
          loading: loadingDraft,
        },
        {
          children: 'Discard',
          onClick: onDiscard,
          variant: 'ghost',
        },
        {
          children: 'Submit',
          onClick: onSubmit,
        },
      ]}
      breadcrumb={[
        {
          label: 'Bills & Payment Management',
          url: route.billsAndPayment('list'),
        },
        { label: bpNumber, url: route.billsAndPayment('detail', bpNumber) },
        { label: `Billing Reminder Letter ${count}` },
      ]}
      loading={loading}
    >
      <Wysiwyg onChange={setValue} value={value} variant="document" />
    </Create>
  );
};

export default SendBillingReminder;
