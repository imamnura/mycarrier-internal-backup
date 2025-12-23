import Button from '@components/Button';
import DateRangePicker from '@components/DateRangePicker';
import Dropdown from '@components/Dropdown';
import { Modal } from '@legion-ui/core';
// import { DateRangePicker } from '@legion-ui/dates';
import React from 'react';
import usePopupFilter from './PopupFilter.hook';

const PopupFilter = ({ show, onClose, filters, onChangeFilter, journey }) => {
  const {
    customer,
    category,
    period,
    dateRange,
    onCancel,
    onApply,
    onClear,
    product,
  } = usePopupFilter({
    show,
    onClose,
    filters,
    onChangeFilter,
    journey,
  });

  return (
    <Modal show={show} title="Filter" onClose={onCancel}>
      <div
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {['evaluate', 'activate', 'pay', 'use', 'getsupport'].includes(
          journey,
        ) && (
          <Dropdown
            {...customer}
            isSearchable
            isMulti
            placeholder="All Customer"
            staticWidth="100%"
            menuWidth="100%"
          />
        )}
        {['activate', 'getsupport'].includes(journey) && (
          <Dropdown
            {...product}
            isSearchable
            isMulti
            placeholder="All Product"
            staticWidth="100%"
            menuWidth="100%"
          />
        )}
        {[
          'explore',
          'evaluate',
          'activate',
          'pay',
          'use',
          'getsupport',
        ].includes(journey) && (
          <Dropdown
            {...category}
            staticWidth="100%"
            menuWidth="100%"
            options={[
              { label: 'All Category', value: '' },
              { label: 'Promoters', value: 'promoters' },
              { label: 'Passive', value: 'passive' },
              { label: 'Detractor', value: 'detractor' },
            ]}
          />
        )}
        <Dropdown
          {...period}
          staticWidth="100%"
          menuWidth="100%"
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Daily', value: 'daily' },
          ]}
        />
        <DateRangePicker
          {...dateRange}
          fullWidth
          inputFormat={'DD MMMM YYYY'}
          name="eventDate"
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <div style={{ flexGrow: 1 }}>
            <Button variant="transparent" onClick={onClear}>
              Clear Filter
            </Button>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onApply}>Apply</Button>
        </div>
      </div>
    </Modal>
  );
};

export default PopupFilter;
