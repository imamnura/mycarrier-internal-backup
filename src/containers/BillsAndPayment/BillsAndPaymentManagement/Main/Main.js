import Reload from '@assets/icon-v2/Reload';
import React from 'react';
import useAction from './hooks/useAction';
import Dashboard from './elements/Dashboard';
import List from './elements/CompanyList';
import { LOCATOR } from './elements/Dashboard/test-locator';

const BillAndPaymentMain = (props) => {
  const { tab, setTab, onRefresh } = useAction();

  const headerProps = {
    tabs: {
      onChange: setTab,
      options: [
        { label: 'Dashboard', value: 'dashboard', id: LOCATOR.tab.dashboard },
        {
          label: 'Company List',
          value: 'company-list',
          id: LOCATOR.tab.companyList,
        },
      ],
      value: tab,
    },
    action: [{ children: 'refresh', leftIcon: Reload, onClick: onRefresh }],
    breadcrumb: [{ label: 'Bills & Payment Manassssgement' }],
  };

  return (
    <>
      <>
        {tab === 'dashboard' && (
          <>
            <Dashboard {...props} />
          </>
        )}
        {tab === 'company-list' && <List {...props} {...headerProps} />}
      </>
    </>
  );
};

export default BillAndPaymentMain;
