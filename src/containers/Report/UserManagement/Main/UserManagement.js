import Reload from '@assets/icon-v2/Reload';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import { route } from '@configs';
import { useRouter } from 'next/router';
// import { Divider } from '@material-ui/core';
import React from 'react';
import GraphInfo from './elements/GraphInfo';
import useAction from './hooks/useAction';
import useJourneyCustomer from './hooks/useJourneyCustomer';
import useJourneyInternal from './hooks/useJourneyInternal';
import useJourneySegment from './hooks/useJourneySegment';
import useUserCustomer from './hooks/useUserCustomer';
import useUserInternal from './hooks/useUserInternal';
import useUserSegment from './hooks/useUserSegment';

const UserManagementReport = () => {
  const {
    filterDateRange,
    filterPeriod,
    onRefresh,
    refreshCount,
    setFilterDateRange,
    setFilterPeriod,
  } = useAction();

  const router = useRouter();

  const action = [
    {
      children: 'Refresh',
      leftIcon: Reload,
      // loading: loading[0] || loading[1] || loading[2] || loading[3] || loading[4] || loading[5],
      onClick: onRefresh,
    },
  ];

  const filter = [
    {
      onChange: setFilterPeriod,
      type: 'dropdown',
      value: filterPeriod,
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Yearly', value: 'yearly' },
      ],
    },
    {
      onChange: setFilterDateRange,
      type: 'dateRange',
      value: filterDateRange,
      variant: 'secondary',
    },
  ];

  return (
    <>
      <HeaderAndFilter
        action={action}
        breadcrumb={[{ label: 'User Performance' }]}
        filter={filter}
      />
      {/* <Divider /> */}
      <div style={{ padding: '24px' }}>
        <GraphInfo
          dateRange={filterDateRange}
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Registered', label: 'Registered' },
          ]}
          period={filterPeriod.value}
          refreshCount={refreshCount}
          title="User Segment"
          useData={useUserSegment}
        />
        <GraphInfo
          dateRange={filterDateRange}
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Registered', label: 'Registered' },
          ]}
          period={filterPeriod.value}
          refreshCount={refreshCount}
          title="Customer"
          useData={useUserCustomer}
        />
        <GraphInfo
          dateRange={filterDateRange}
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Registered', label: 'Registered' },
          ]}
          period={filterPeriod.value}
          refreshCount={refreshCount}
          title="Internal"
          useData={useUserInternal}
        />
        <GraphInfo
          dateRange={filterDateRange}
          options={[
            { value: 'Customer', label: 'Customer' },
            { value: 'Internal', label: 'Internal' },
          ]}
          period={filterPeriod.value}
          refreshCount={refreshCount}
          title="Journey Segment"
          useData={useJourneySegment}
        />
        <GraphInfo
          clickToAction={{
            label:
              'View all data Journey Feature Customer traffic in data table',
            onClick: () =>
              router.push(
                route.reportUserManagement('detail', 'feature-customer'),
              ),
          }}
          dateRange={filterDateRange}
          options={[
            // { label: 'Evaluate', value: 'evaluate' },
            { label: 'Activate', value: 'activate' },
            { label: 'Get Support', value: 'getSupport' },
            { label: 'Pay', value: 'pay' },
          ]}
          period={filterPeriod.value}
          refreshCount={refreshCount}
          title="Journey Feature Customer"
          useData={useJourneyCustomer}
        />
        <GraphInfo
          clickToAction={{
            label:
              'View all data Journey Feature Internal traffic in data table',
            onClick: () =>
              router.push(
                route.reportUserManagement('detail', 'feature-internal'),
              ),
          }}
          dateRange={filterDateRange}
          options={[
            { label: 'Explore', value: 'explore' },
            { label: 'Evaluate', value: 'evaluate' },
            { label: 'Activate', value: 'activate' },
            { label: 'Get Support', value: 'getSupport' },
            { label: 'Pay', value: 'pay' },
          ]}
          period={filterPeriod.value}
          refreshCount={refreshCount}
          title="Journey Feature Internal"
          useData={useJourneyInternal}
        />
      </div>
    </>
  );
};

export default UserManagementReport;
