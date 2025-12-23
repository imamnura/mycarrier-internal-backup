import React from 'react';
import PropTypes from 'prop-types';
import { isHaveAccess } from '@utils/common';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import { breadcrumb, stepChoice, detailSchema } from './utils';
import RejectForm from './elements/forms/Reject';
import EvidenceForm from './elements/forms/Evidence';
import ApprovalForm from './elements/forms/Approval';
import { smsa2pStatus } from '../utils';

const DetailSMSA2P = (props) => {
  const { feature } = props;

  const {
    id,
    fetchDetail,
    data,
    loading,
    actions,
    onPreviewWorklog,
    modalApproveIssue,
    setModalApproveIssue,
    modalReject,
    setModalReject,
    modalEvidence,
    setModalEvidence,
  } = useActions(props);

  const action = () => {
    let button = [];

    if (loading || Boolean(!data?.status)) {
      return button;
    }

    if (
      stepChoice(data?.status) === 0 &&
      data?.status !== 'rejected' &&
      isHaveAccess(feature, 'update_ticketAnalyze')
    ) {
      button.push({
        variant: 'ghost',
        children: 'REJECT',
        onClick: actions.reject,
        mr: 24,
      });
      button.push({
        children: 'APPROVE',
        onClick: actions.approve,
        // hideDivider: true,
      });
    } else if (
      stepChoice(data?.status) === 1 &&
      isHaveAccess(feature, 'update_technicalHandling')
    ) {
      button.push({
        children: 'SOLVE',
        onClick: actions.tecnicalHandling,
      });
    } else if (
      stepChoice(data?.status) === 2 &&
      isHaveAccess(feature, 'update_custReview')
    ) {
      button.push({
        children: 'CLOSE',
        onClick: actions.close,
      });
    }

    return button;
  };

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb(id)}
        loading={loading}
        notFound={Boolean(!data?.status)}
        schema={detailSchema(data, { onPreviewWorklog })}
        status={smsa2pStatus(data?.status)}
      />
      {data && (
        <ApprovalForm
          data={data}
          fetchDetail={fetchDetail}
          modalApproveIssue={modalApproveIssue}
          setModalApproveIssue={setModalApproveIssue}
          ticketId={data?.ticketId}
        />
      )}
      <RejectForm
        fetchDetail={fetchDetail}
        modalReject={modalReject}
        setModalReject={setModalReject}
        ticketId={data?.ticketId}
      />
      <EvidenceForm
        fetchDetail={fetchDetail}
        modalEvidence={modalEvidence}
        setModalEvidence={setModalEvidence}
        ticketId={data?.ticketId}
      />
    </>
  );
};

DetailSMSA2P.defaultProps = {
  feature: [],
};

DetailSMSA2P.propTypes = {
  feature: PropTypes.array,
};

export default DetailSMSA2P;
