import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import Otp from '@components/Form/Otp';
import useDetail from './hooks/useDetail';
import { digitalProductStatus } from './utilsStatus';
import { detailSchema } from './utils';
import ReturnForm from './elements/ReturnForm';
import UpdateStatusForm from './elements/UpdateStatusForm';
import AttachmentsModal from './elements/AttachmentsModal';
import { IMAGES } from '@__old/configs';

const DetailDigitalProduct = ({ classes }) => {
  const {
    referenceId,
    data,
    onPreviewWorklog,
    modalMultiAttachment,
    openModalMultiAttachment,
    setModalMultiAttachment,
    loading,
    fetchDetail,
    productAction,
    otpForm,
    closeOtp,
    otpRepository,
    onSubmitOtp,
  } = useDetail();

  const action = () => {
    let button = [];

    if (data?.product === 'vaservice') {
      if (
        (data && data.status === 'CHECKING') ||
        data.status === 'REPORT CHECKING'
      ) {
        button.push({
          children: 'REJECT',
          onClick: productAction.onClickModalReturn,
          variant: 'ghost',
        });
        button.push({
          children: 'APPROVE',
          onClick: productAction.onApprove,
        });
      } else if (
        data &&
        data.status !== 'CLOSED' &&
        data.status !== 'REPORT COMPLETED' &&
        data.status !== 'REPORT REJECTED'
      ) {
        button.push({
          children: 'UPDATE STATUS',
          onClick: productAction.onClickModalUpdateStatus,
        });
      }
    }

    return button;
  };

  const breadcrumb = [{ label: referenceId || '-' }];

  return (
    <div className={classes.containerMicrosite}>
      <div className={classes.headerMicrosite}>
        <img src={IMAGES.LOGO} alt="logo" />
      </div>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema(data, {
          onPreviewWorklog,
          openModalMultiAttachment,
        })}
        status={digitalProductStatus(data?.status)}
      />
      <ReturnForm
        fetchDetail={fetchDetail}
        modalReturn={productAction.modalReturn}
        referenceId={data?.referenceId}
        setModalReturn={productAction.setModalReturn}
      />
      <UpdateStatusForm
        fetchDetail={fetchDetail}
        modalUpdateStatus={productAction.modalUpdateStatus}
        referenceId={data?.referenceId}
        setModalUpdateStatus={productAction.setModalUpdateStatus}
      />
      {referenceId && (
        <Otp
          description="Please enter the OTP code that we sent to your email"
          id={referenceId}
          onClose={closeOtp}
          onSubmit={onSubmitOtp}
          open={otpForm}
          repository={otpRepository}
          title="Please input your OTP code"
          withCancel={false}
        />
      )}
      <AttachmentsModal
        modalMultiAttachment={modalMultiAttachment}
        onClose={() => setModalMultiAttachment(null)}
      />
    </div>
  );
};

DetailDigitalProduct.defaultProps = {
  feature: [],
};

DetailDigitalProduct.propTypes = {
  feature: PropTypes.array,
};

export default DetailDigitalProduct;
