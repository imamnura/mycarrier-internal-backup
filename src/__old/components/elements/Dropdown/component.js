import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { noop } from '../../../utils/common';
import { stylesSearch, styles } from './utils';
import ArrowDownFilter from '../../../../assets/Svg/ArrowDownFilter';
import Text from '../Text';
import Checklist from '../../../../assets/Svg/Checklist';

const Component = (props) => {
  const {
    onChange,
    options,
    value,
    searchable,
    customWidth,
    label,
    input,
    meta,
    ...rest
  } = props;

  const { Option, ValueContainer } = components;

  const optionsDisplay = (provided) => (
    <Option {...provided}>
      {provided.data.label}
      <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center' }}>
        {provided.data.status}
        {provided.isSelected && <Checklist style={{ width: 12, height: 14 }} />}
      </div>
    </Option>
  );

  const valuesDisplay = (provided) => {
    const { getValue, hasValue, children } = provided;
    const newChildren = [...children];
    const values = getValue();
    const nbValues = values.length;

    if (rest.isMulti) {
      let type = '';
      if (rest.placeholder)
        type = rest.placeholder.split(' ').pop().toLowerCase();

      newChildren[0] = `${nbValues} ${type} selected`;
      if (nbValues === 1) newChildren[0] = values[0].label;
    }

    return (
      <ValueContainer {...provided}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {hasValue ? newChildren : children}
          {children[0]?.props?.data?.status}
        </div>
      </ValueContainer>
    );
  };

  const isError = meta.invalid && meta.touched;

  const customProps = input
    ? {
        // ...input
        onChange: input.onChange,
        value: input.value,
      }
    : {
        value,
        onChange: (value) => {
          if (rest.isMulti) {
            if (value !== null && value[value?.length - 1]?.value === '') {
              onChange(value.filter((item) => item?.value === ''));
            } else if (
              value !== null &&
              value[value?.length - 1]?.value !== ''
            ) {
              onChange(value.filter((item) => item?.value !== ''));
            } else {
              onChange(value);
            }
          } else {
            onChange(value);
          }
        },
      };

  return (
    <div style={{ width: customWidth || '100%', minWidth: 74 }}>
      {label && (
        <Text color={isError ? 'primary' : 'grey'} variant="caption">
          {rest.normalLabel ? label : label.toUpperCase()}
        </Text>
      )}
      <Select
        components={{
          ValueContainer: valuesDisplay,
          DropdownIndicator: ArrowDownFilter,
          Option: optionsDisplay,
        }}
        isSearchable={searchable}
        options={options}
        styles={searchable ? stylesSearch : styles}
        {...rest}
        {...customProps}
      />
      <Text color="primary" variant="overline">
        {isError && meta.error}
      </Text>
    </div>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  customWidth: PropTypes.number,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.array,
  searchable: PropTypes.bool,
  value: PropTypes.object,
};

Component.defaultProps = {
  customWidth: 0,
  input: null,
  label: '',
  meta: { invalid: false, touched: false, error: '' },
  onChange: noop,
  options: [],
  searchable: false,
  value: {},
};

export default Component;
