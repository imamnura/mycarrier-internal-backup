import React from 'react';
import Agreement from './elements/Agreement';
import CompanyInformation from './elements/CompanyInformation';
import ServiceSpecification from './elements/ServiceSpecification';
import TermsAndCondition from './elements/TermsAndCondition';
import useAction from './hooks/useAction';

const OfferingLetterCreate = () => {
  const { data, loading, setTab, tab, setData } = useAction();

  return (
    <>
      {tab === 1 && (
        <CompanyInformation
          data={data}
          loading={loading}
          setTab={setTab}
          updateData={setData}
        />
      )}
      {tab === 2 && (
        <ServiceSpecification
          data={data}
          loading={loading}
          setTab={setTab}
          updateData={setData}
        />
      )}
      {tab === 3 && (
        <TermsAndCondition
          data={data}
          loading={loading}
          setTab={setTab}
          updateData={setData}
        />
      )}
      {tab === 4 && (
        <Agreement
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
