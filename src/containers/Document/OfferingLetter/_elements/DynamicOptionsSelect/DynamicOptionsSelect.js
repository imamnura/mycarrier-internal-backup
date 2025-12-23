import { Select } from '@components/FormField';
import React from 'react';
import useAction from './hooks/useAction';

const DynamicOptionsSelect = (props) => {
  const { options, currentValue, otherProps } = useAction(props);

  return (
    <Select
      additionalWidth={currentValue ? 2 : 0}
      isDisabled={!options.length}
      maxWidth="100%"
      menuPosition="fixed"
      shouldUnregister
      {...otherProps}
      options={options}
    />
  );
};

export default DynamicOptionsSelect;
