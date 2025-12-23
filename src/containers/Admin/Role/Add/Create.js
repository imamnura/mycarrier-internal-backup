import React from 'react';
import RoleProfile from './element/RoleProfile';
import useAction from './hooks/useAction';
import ChoosePrivilege from './element/ChoosePrivilege';
import PropTypes from 'prop-types';

const CreateRole = (props) => {
  const { feature } = props;

  const {
    data,
    loading,
    setLoading,
    tab,
    setTab,
    setData,
    formValues,
    control,
    formState,
    disableType,
  } = useAction(props);

  return (
    <>
      {tab === 1 && (
        <RoleProfile
          control={control}
          data={data}
          disableType={disableType}
          formState={formState}
          formValues={formValues}
          loading={loading}
          setLoading={setLoading}
          setTab={setTab}
          updateData={setData}
        />
      )}
      {tab === 2 && (
        <ChoosePrivilege
          control={control}
          data={data}
          feature={feature}
          formValues={formValues}
          loading={loading}
          setLoading={setLoading}
          setTab={setTab}
          tab={tab}
          updateData={setData}
        />
      )}
    </>
  );
};

CreateRole.defaultProps = {
  feature: [],
};

CreateRole.propTypes = {
  feature: PropTypes.array,
};

export default CreateRole;
