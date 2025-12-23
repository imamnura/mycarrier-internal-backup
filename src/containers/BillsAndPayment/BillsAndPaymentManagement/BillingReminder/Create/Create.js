import React from 'react';
import useAction from './hooks/useAction';
import PickInvoice from './elements/PickInvoice';
import EmailTextAndAttachment from './elements/EmailTextAndAttachment';
import ApprovalData from './elements/ApprovalData';

const Create = () => {
  const { data, setData, tab, setTab, loading, onDiscard } = useAction();

  return (
    <>
      {tab === 1 && (
        <PickInvoice
          data={data}
          loading={loading}
          onDiscard={onDiscard}
          setTab={setTab}
          tab={tab}
          updateData={setData}
        />
      )}
      {tab === 2 && (
        <EmailTextAndAttachment
          data={data}
          onDiscard={onDiscard}
          setTab={setTab}
          updateData={setData}
        />
      )}
      {tab === 3 && (
        <ApprovalData
          data={data}
          onDiscard={onDiscard}
          setTab={setTab}
          updateData={setData}
        />
      )}
    </>
  );
};

export default Create;
