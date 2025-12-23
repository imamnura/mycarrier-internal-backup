import React from 'react';
import { isHaveAccess } from '@utils/common';
import PropTypes from 'prop-types';
import { route } from '@configs';
import BaseForm from '@components/Form/UpdateStatus';
import Detail from '@fragments/Detail';
import useDetail from './hooks/useDetail';
import { digitalProductStatus } from '../utils';
import { detailSchema } from './utils';
import ReturnForm from './elements/ReturnForm';
import ApproveIssueForm from './elements/ApproveIssueForm';
import ChooseCategoryForm from './elements/ChooseCategoryForm';
import PriorityForm from './elements/PriorityForm';
import MessagePreview from './elements/MessagePreview';
import AttachmentsModal from './elements/AttachmentsModal';
import ValidateForm from './elements/ValidateForm';
import CloseReportForm from './elements/CloseReportForm';
import SolveForm from './elements/SolveForm';

const DetailDigitalProduct = (props) => {
  const { feature } = props;

  const {
    referenceId,
    data,
    onPreviewWorklog,
    loading,
    fetchDetail,
    productAction,
    modalMultiAttachment,
    openModalMultiAttachment,
    setModalMultiAttachment,
  } = useDetail();

  const action = () => {
    let button = [];

    if (
      data?.product === 'antares' ||
      data?.product === 'oca' ||
      data?.product === 'netmonk' ||
      data?.product === 'tomps' ||
      data?.product === 'antareseazy' ||
      data?.product === 'apilogy' ||
      data?.product === 'pijar'
    ) {
      if (
        (data && data.status === 'CHECKING') ||
        data.status === 'REPORT CHECKING'
      ) {
        if (isHaveAccess(feature, 'update_status_ticket_digital_product')) {
          button.push({
            children: 'REJECT',
            variant: 'ghost',
            onClick: productAction.onClickModalReturn,
          });
        }
        if (isHaveAccess(feature, 'create_ticket_number_digital_product')) {
          button.push({
            ml: 16,
            hideDivider: true,
            children: 'APPROVE',
            onClick: productAction.onApprove,
          });
        }
      }
    } else if (data?.product === 'gameqoo') {
      if (data && 'CHECKING' === data.status) {
        if (isHaveAccess(feature, 'update_status_ticket_digital_product')) {
          button.push({
            variant: 'ghost',
            children: 'REJECT',
            onClick: productAction.onClickModalReturn,
          });
        }
        if (isHaveAccess(feature, 'create_ticket_number_digital_product')) {
          button.push({
            ml: 16,
            hideDivider: true,
            children: 'APPROVE',
            onClick: productAction.onClickValidation,
          });
        }
      }
    } else if (data?.product === 'neucloud') {
      if (data.status === 'CHECKING' || data.status === 'REPORT CHECKING') {
        if (isHaveAccess(feature, 'update_status_ticket_digital_product')) {
          button.push({
            variant: 'ghost',
            children: 'REJECT',
            onClick: productAction.onClickModalReturn,
          });
        }
        if (isHaveAccess(feature, 'create_ticket_number_digital_product')) {
          button.push({
            ml: 16,
            hideDivider: true,
            children: 'APPROVE',
            onClick: productAction.onClickApproval,
          });
        }
      }

      if (data.status === 'CLOSED') {
        button.push({
          children: 'CHAT HISTORY',
          onClick: () => productAction.setModalMessage(true),
        });
      }
    } else if (data?.product === 'cdnaas') {
      if (data && data.status === 'CHECKING') {
        if (isHaveAccess(feature, 'update_status_ticket_digital_product')) {
          button.push({
            variant: 'ghost',
            children: 'REJECT',
            onClick: productAction.onReject,
          });
          button.push({
            ml: 16,
            hideDivider: true,
            children: 'VALIDATE',
            onClick: productAction.onValidate,
          });
        }
      } else if (
        data &&
        ['ON PROGRESS', 'ON HOLD', 'RETURNED'].includes(data.status)
      ) {
        if (
          data.status !== 'ON HOLD' &&
          isHaveAccess(feature, 'update_status_ticket_escalate_digital_product')
        ) {
          button.push({
            variant: 'ghost',
            children: 'ESCALATE',
            onClick: productAction.onEscalate,
          });
        }
        if (
          isHaveAccess(feature, 'update_status_ticket_solve_digital_product')
        ) {
          button.push({
            ml: 16,
            hideDivider: true,
            children: 'SOLVE',
            onClick: productAction.onSolve,
          });
        }
      } else if (data && data.status === 'SOLVED') {
        if (
          isHaveAccess(feature, 'update_status_ticket_return_digital_product')
        ) {
          button.push({
            children: 'RETURN',
            variant: 'ghost',
            onClick: productAction.onReturn,
          });
        }
        if (
          isHaveAccess(feature, 'update_status_ticket_close_digital_product')
        ) {
          button.push({
            ml: 16,
            children: 'CLOSE & REPORT',
            hideDivider: true,
            onClick: productAction.onReport,
          });
        }
      }
    }

    return button;
  };

  const breadcrumb = [
    { label: 'Digital Product', url: route.digitalProduct('list') },
    { label: referenceId || '-' },
  ];

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={Boolean(!data?.status)}
        schema={detailSchema(data, {
          onPreviewWorklog,
          openModalMultiAttachment,
        })}
        status={digitalProductStatus(data?.status)}
      />
      {data?.product === 'antares' ||
      data?.product === 'oca' ||
      data?.product === 'netmonk' ||
      data?.product === 'tomps' ||
      data?.product === 'antareseazy' ||
      data?.product === 'apilogy' ||
      data?.product === 'gameqoo' ||
      data?.product === 'neucloud' ||
      data?.product === 'cdnaas' ||
      data?.product === 'pijar' ? (
        <ReturnForm
          fetchDetail={fetchDetail}
          modalReturn={productAction.modalReturn}
          referenceId={data?.referenceId}
          setModalReturn={productAction.setModalReturn}
        />
      ) : (
        ''
      )}
      {data?.product === 'gameqoo' && (
        <>
          <ApproveIssueForm
            modalApproveIssue={productAction.modalApproveIssue}
            referenceId={data?.referenceId}
            setModalApproveIssue={productAction.setModalApproveIssue}
            setModalChooseCategory={productAction.setModalChooseCategory}
          />
          <ChooseCategoryForm
            fetchDetail={fetchDetail}
            modalChooseCategory={productAction.modalChooseCategory}
            referenceId={data?.referenceId}
            setModalChooseCategory={productAction.setModalChooseCategory}
          />
        </>
      )}
      {data?.product === 'neucloud' && (
        <>
          <PriorityForm
            detail={data}
            modalPriorityForm={productAction.modalPriority}
            setModalPriorityForm={productAction.setModalPriorityForm}
          />
          <MessagePreview
            modalMessage={productAction.modalMessage}
            referenceId={referenceId}
            setModalMessage={productAction.setModalMessage}
          />
        </>
      )}
      {data?.product === 'vaservice' && (
        <AttachmentsModal
          modalMultiAttachment={modalMultiAttachment}
          onClose={() => setModalMultiAttachment(null)}
        />
      )}
      {data?.product === 'cdnaas' && (
        <>
          <BaseForm
            fetchUpdateStatus={productAction.fetchUpdateTicket}
            content={productAction.modalBaseAction}
            setContent={productAction.setModalBaseAction}
          />
          <ValidateForm
            fetchDetail={fetchDetail}
            open={productAction.modalValidate}
            setModalValidate={productAction.setModalValidate}
          />
          <CloseReportForm
            fetchDetail={fetchDetail}
            open={productAction.modalReport}
            setModalReport={productAction.setModalReport}
          />
          <SolveForm
            fetchDetail={fetchDetail}
            open={productAction.modalSolve}
            setModalSolve={productAction.setModalSolve}
          />
        </>
      )}
    </>
  );
};

DetailDigitalProduct.defaultProps = {
  feature: [],
};

DetailDigitalProduct.propTypes = {
  feature: PropTypes.array,
};

export default DetailDigitalProduct;
