import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Select, { components } from 'react-select';
import { AsyncPaginate, wrapMenuList } from 'react-select-async-paginate';
import ArrowDown from '../../assets/icon-v2/ArrowDown';
import Star from '../../assets/icon-v2/Star';
import Cancel from '../../assets/icon-v2/Cancel';
import Check from '../../assets/icon-v2/Check';
import Typography from '../Typography';
import useStyles from './styles';
import Switch from '@components/Switch';
import { FixedSizeList as List } from 'react-window';
import Status from '@components/Status';
import Tooltip from '@components/Tooltip';
import useOption from './hooks/useOption';
import Button from '@components/Button';
import { noop } from 'lodash';

const RSComponent = components;

export const DropdownIndicator = (provided) => {
  return (
    <RSComponent.DropdownIndicator {...provided}>
      <ArrowDown className="arrow" />
    </RSComponent.DropdownIndicator>
  );
};

export const ClearIndicator = (provided) => {
  return (
    <RSComponent.ClearIndicator {...provided}>
      <Cancel className="cancel" />
    </RSComponent.ClearIndicator>
  );
};

export const NoOptionsMessage =
  ({ isCreatable, creatableWording, search, onCreate, emptyMessage }) =>
  (props) =>
    isCreatable && search ? (
      <Button
        block
        children={`${creatableWording || 'Create'} “${search}”`}
        onClick={() => {
          props.setValue({ label: search, value: search }, 'select-option');
          if (onCreate) {
            onCreate({ label: search, value: search });
          }
        }}
        variant="secondary"
        textTransform="none"
      />
    ) : (
      <Box alignItems="center" display="flex" minHeight="32px" paddingX="16px">
        <Typography
          children={emptyMessage || 'No Option'}
          color="general-mid"
          variant="body2"
        />
      </Box>
    );

export const Option = (_provided) => {
  const index = _provided.innerProps?.id?.split('-').pop();

  const provided = {
    ..._provided,
    innerProps: {
      ..._provided.innerProps,
      tabIndex: index,
    },
  };
  const { type, ...customOptionProps } = provided.data?.customOption || {};

  const { isLabelTruncate, labelRef } = useOption();

  if (type === 'star') {
    return (
      <RSComponent.Option {...provided}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            width: '100%',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              width: '20px',
            }}
          >
            <Star style={{ width: '14px' }} />
          </Box>
          {provided.data.label}
        </Box>
      </RSComponent.Option>
    );
  } else if (type === 'switch') {
    const { onChange, value } = customOptionProps;
    return (
      <RSComponent.Option {...provided}>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box sx={{ paddingLeft: '20px' }}>{provided.data.label}</Box>
          <Switch onChange={onChange} value={value} />
        </Box>
      </RSComponent.Option>
    );
  } else if (type === 'status') {
    const { subLabel, ...statusProps } = customOptionProps;
    return (
      <RSComponent.Option {...provided}>
        {provided.data.label ? (
          <>
            <Tooltip
              placement="top"
              title={isLabelTruncate ? provided.data.label : ''}
            >
              <Box
                ref={labelRef}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: 200,
                }}
              >
                {provided.data.label}
                {!!subLabel && <div>{subLabel}</div>}
              </Box>
            </Tooltip>
          </>
        ) : (
          <></>
        )}

        {statusProps.variant && <Status {...statusProps} />}
      </RSComponent.Option>
    );
  } else if (provided.data.subLabelRemark) {
    return (
      <RSComponent.Option {...provided}>
        <Tooltip
          placement="top"
          title={isLabelTruncate ? provided.data.subLabel : ''}
        >
          <Box
            ref={labelRef}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: 300,
            }}
          >
            <div
              style={{
                lineHeight: '24px',
                color: '#233137',
                fontSize: '16px',
                fontWeight: '700',
              }}
            >
              {provided.data.label}
            </div>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '21px',
              }}
            >
              <Typography
                color="secondary-400"
                weight="bold"
                style={{ lineHeight: '21px' }}
              >
                {provided.data.subLabel}
              </Typography>
              <div
                style={{
                  height: '0.375rem',
                  width: '0.375rem',
                  display: 'block',
                  borderRadius: '9999px',
                  backgroundColor: '#ACB6BB',
                  margin: '0 5px',
                }}
              ></div>
              <Typography color="secondary-400" style={{ lineHeight: '21px' }}>
                {provided.data.subLabelRemark}
              </Typography>
            </Box>
          </Box>
        </Tooltip>
      </RSComponent.Option>
    );
  } else if (provided.data.subLabel) {
    return (
      <RSComponent.Option {...provided}>
        <Tooltip
          placement="top"
          title={isLabelTruncate ? provided.data.subLabel : ''}
        >
          <Box
            ref={labelRef}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: 300,
            }}
          >
            <div>{provided.data.label}</div>
            <Typography color="general-mid">
              {provided.data.subLabel}
            </Typography>
          </Box>
        </Tooltip>
      </RSComponent.Option>
    );
  } else if (type === 'phone') {
    const { flag } = customOptionProps;
    return (
      <RSComponent.Option {...provided}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {flag}
          {provided.data.label}
        </Box>
      </RSComponent.Option>
    );
  } else if (provided.data.isDisabled) {
    return (
      <RSComponent.Option {...provided}>
        <Box ref={labelRef}>
          <Typography color="general-light" style={{ cursor: 'not-allowed' }}>
            {provided.data.label}
          </Typography>
        </Box>
      </RSComponent.Option>
    );
  } else {
    return (
      <RSComponent.Option {...provided}>
        {provided.data.label}
        <Check className="check" />
      </RSComponent.Option>
    );
  }
};

export const ValueContainer = (provided) => {
  const { children: _children } = provided;
  let children = [..._children];

  if (provided.isMulti && provided.hasValue) {
    const value = provided.getValue();
    const displayLabel = provided.selectProps.inputValue.length === 0;

    const label =
      value.length > 1 ? `${value.length} Options Selected` : value[0].label;
    children[0] = (
      <RSComponent.SingleValue {...provided} key={0}>
        {displayLabel ? label : ''}
      </RSComponent.SingleValue>
    );
  }

  if (provided.hasValue) {
    const [value] = provided.getValue();
    const displayLabel = provided.selectProps.inputValue.length === 0;
    const { type, ...customOptionProps } = value.customOption || {};
    if (type === 'status') {
      children[0] = (
        <>
          {value.label ? (
            <>
              <RSComponent.SingleValue {...provided} key={0}>
                {!displayLabel ? (
                  ''
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {value.label}
                    </Box>
                    {customOptionProps.variant && (
                      <Status {...customOptionProps} />
                    )}
                  </Box>
                )}
              </RSComponent.SingleValue>
            </>
          ) : (
            <>
              <RSComponent.SingleValue {...provided} key={0}>
                <Status {...customOptionProps} />
              </RSComponent.SingleValue>
            </>
          )}
        </>
      );
    } else if (type === 'phone') {
      children[0] = !!displayLabel && (
        <RSComponent.SingleValue {...provided} key={0}>
          {customOptionProps.flag}
        </RSComponent.SingleValue>
      );
    }
  }

  return (
    <RSComponent.ValueContainer {...provided}>
      {children}
    </RSComponent.ValueContainer>
  );
};

export const ListChild = (children) => (provided) => {
  const { index, style } = provided;
  return <div style={style}>{children[index]}</div>;
};

export const MenuList = (provided) => {
  if (
    !provided.selectProps?.loadOptions &&
    provided.options.length > 100 &&
    !provided.isMulti &&
    !!provided.children.length
  ) {
    const { children, getValue, maxHeight, options } = provided;

    const [value] = getValue();
    const initialOffset = options.indexOf(value) * 40;

    return (
      <List
        children={ListChild(children)}
        height={maxHeight}
        initialScrollOffset={initialOffset}
        itemCount={children.length}
        itemSize={options[0]?.customOption?.subLabel ? 50 : 40}
      />
    );
  } else {
    return <RSComponent.MenuList {...provided} />;
  }
};

/**
 * @description for react-select props information
 *
 * @see {@link https://react-select.com/props}
 *
 * @typedef {import('react-select').Props} SelectProps -n
 *
 * @param {SelectProps} props -n
 * @returns {React.FC} -n
 */

const Dropdown = (props) => {
  const {
    additionalWidth,
    maxWidth,
    menuStick,
    menuWidth,
    minWidth,
    placeholder,
    required,
    staticWidth,
    styles: overrideStyles,
    asyncProps,
    noBorder,
    variant = '',
    valueFitToContent,
    staticHeight,
    searchable,
    isCreatable,
    creatableWording,
    onCreate,
    emptyMessage,
    onSearch,
    isOptionDisabled,
    ...rsProps
  } = props;

  const [search, setSearch] = useState('');

  const styles = useStyles({
    additionalWidth,
    maxWidth,
    menuStick,
    menuWidth,
    minWidth,
    overrideStyles,
    staticWidth,
    noBorder,
    variant,
    valueFitToContent,
    staticHeight,
  });

  const _required = (
    <>
      <Typography
        children="*"
        color="primary-main"
        style={{ marginRight: 2 }}
        weight="medium"
      />
      {placeholder}
    </>
  );

  const BaseSelect = asyncProps.loadOptions ? AsyncPaginate : Select;
  const _MenuList = asyncProps.loadOptions ? wrapMenuList(MenuList) : MenuList;

  return (
    <div style={{ display: 'flex' }} id={rsProps.id}>
      <BaseSelect
        instanceId="dropdown"
        isSearchable={searchable}
        placeholder={required ? _required : placeholder}
        {...rsProps}
        onInputChange={(v) => {
          setSearch(v);
          if (onSearch) {
            onSearch(v);
          }
        }}
        components={{
          NoOptionsMessage: NoOptionsMessage({
            isCreatable,
            creatableWording,
            search,
            onCreate,
            emptyMessage,
          }),
          DropdownIndicator,
          Option,
          MenuList: _MenuList,
          ValueContainer,
          ClearIndicator,
        }}
        hideSelectedOptions={false}
        isOptionDisabled={isOptionDisabled}
        styles={styles}
        {...asyncProps}
      />
    </div>
  );
};

Dropdown.defaultProps = {
  additionalWidth: 0,
  asyncProps: {},
  creatableWording: null,
  emptyMessage: null,
  isCreatable: false,
  maxWidth: null,
  menuStick: 'left',
  menuWidth: 200,
  minWidth: null,
  onCreate: noop,
  onSearch: noop,
  placeholder: 'Choose Option',
  required: false,
  searchable: false,
  staticHeight: null,
  staticWidth: null,
  styles: {},
  noBorder: false,
  valueFitToContent: false,
  isOptionDisabled: noop,
};

Dropdown.propTypes = {
  additionalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  asyncProps: PropTypes.object,
  creatableWording: PropTypes.string,
  emptyMessage: PropTypes.string,
  isCreatable: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  menuStick: PropTypes.oneOf(['left', 'right']),
  menuWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onCreate: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  searchable: PropTypes.bool,
  staticHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  staticWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  styles: PropTypes.object,
  noBorder: PropTypes.bool,
  valueFitToContent: PropTypes.bool,
  isOptionDisabled: PropTypes.func,
};

export default Dropdown;
