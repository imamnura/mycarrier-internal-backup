import React from 'react';
import UserType from './elements/UserType';
import useAction from './hooks/useAction';
import UserProfile from './elements/UserProfile';

const OfferingLetterCreate = () => {
  const { data, loading, setTab, tab, setData } = useAction();

  return (
    <>
      {tab === 1 && (
        <UserType
          data={data}
          loading={loading}
          setTab={setTab}
          updateData={setData}
        />
      )}
      {tab === 2 && (
        <UserProfile
          data={data}
          loading={loading}
          setTab={setTab}
          updateData={setData}
        />
      )}
    </>
  );
};

export default OfferingLetterCreate;
