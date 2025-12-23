import React, { Fragment, useMemo } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { route } from '@configs';
import Download from '@assets/icon-v2/Download';
import Reload from '@assets/icon-v2/Reload';
import Button from '@components/Button';
import List from '@fragments/List';
import FileViewer from '@layouts/FileViewer';
import { isHaveAccess } from '@utils/common';
import {
  schemaList,
  statusOptions,
  progressOptions,
  normalizeList,
} from './utils';
import useActions from './hooks/useActions';

const GeneralReportSA = (props) => {
  const router = useRouter();
  const { feature } = props;
  const {
    filterProgress,
    filterStatus,
    filterDateRange,
    list,
    page,
    loading,
    onPaginationChange,
    onClickRefresh,
    onClosePreview,
    onClickRowTable,
    onClickDownload,
    onClickDownloadEvidence,
    openPreview,
    evidenceFile,
    search,
    setFilterProgress,
    setFilterStatus,
    setFilterDateRange,
    setOpenPreview,
    setEvidenceFile,
    setSearch,
    setTab,
    tab,
  } = useActions(props);

  const optionsTab = useMemo(() => {
    const res = [];

    if (isHaveAccess(feature, 'read_list_approval_ticket_general_product')) {
      res.push({ value: 'approval', label: 'Approval Ticket' });
    }
    if (isHaveAccess(feature, 'read_list_history_ticket_general_product')) {
      res.push({ value: 'onProgress', label: 'On Progress' });
      res.push({ value: 'closed', label: 'Closed Ticket' });
    }

    if (tab === '') {
      setTab(res[0].value);
    }

    return res;
  }, []);

  const filterProps = () => {
    const filters = [];

    if (
      tab === 'onProgress' &&
      isHaveAccess(feature, 'read_list_history_ticket_general_product')
    ) {
      filters.push({
        maxWidth: 300,
        onChange: setFilterProgress,
        options: progressOptions,
        type: 'dropdown',
        value: filterProgress,
      });
      filters.push({
        onChange: setFilterDateRange,
        value: filterDateRange,
        type: 'dateRange',
      });
    } else if (
      tab === 'closed' &&
      isHaveAccess(feature, 'read_list_history_ticket_general_product')
    ) {
      filters.push({
        maxWidth: 300,
        onChange: setFilterStatus,
        options: statusOptions,
        type: 'dropdown',
        value: filterStatus,
      });
      filters.push({
        onChange: setFilterDateRange,
        value: filterDateRange,
        type: 'dateRange',
      });
    }

    return filters;
  };

  const action = () => {
    const button = [];

    if (tab) {
      button.push({
        onClick: onClickRefresh,
        children: 'Refresh',
        leftIcon: Reload,
        variant: 'ghost',
      });
    }

    if (tab === 'closed' && isHaveAccess(feature, 'read_downloadHistory')) {
      button.push({
        onClick: onClickDownload,
        children: 'Download',
        // hideDivider: true,
        ml: 16,
        leftIcon: Download,
        loading: loading.download,
        variant: 'ghost',
      });
    }

    if (isHaveAccess(feature, 'create_ticket_general_product')) {
      button.push({
        onClick: () => router.push(route.generalProduct('create')),
        children: 'Create Ticket',
      });
    }

    return button;
  };

  const listProps = {
    title: 'General Product',
    breadcrumb: [{ label: 'General Product' }],
    action: action(),
    filter: filterProps(),
    search: {
      placeholder: 'Global Search..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: useMemo(
        () =>
          normalizeList(list.data, tab, { setEvidenceFile, setOpenPreview }),
        [list.data],
      ),
      // hovering: true,
      loadingRoot: loading.table,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: useMemo(() => schemaList(tab), [tab]),
      onPaginationChange: onPaginationChange,
    },
    tabs: {
      options: optionsTab,
      value: tab,
      onChange: setTab,
    },
  };

  return (
    <Fragment>
      <List {...listProps} />
      <FileViewer
        actionButton={
          <>
            <Button children="Download" onClick={onClickDownloadEvidence()} />
          </>
        }
        file={evidenceFile.fileUrl}
        onClose={onClosePreview()}
        open={openPreview}
        title={evidenceFile.fileName}
      />
    </Fragment>
  );
};

GeneralReportSA.defaultProps = {
  feature: [],
};

GeneralReportSA.propTypes = {
  feature: PropTypes.array,
};

export default GeneralReportSA;
