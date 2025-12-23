import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { route } from '@configs';
import { statusLabel, statusVariant } from '../utils';
import UpdateStatus from './lib/forms/UpdateStatusForm';
import Return from './lib/forms/ReturnForm';
import ProgressUpload from './lib/ProgressUpload';

const DetailBaso = (props) => {
  const {
    fetchDetail,
    orderNumber,
    data,
    loading,
    detailSchema,
    modalUpdateStatus,
    setModalUpdateStatus,
    modalReturn,
    setModalReturn,
    modalProgressUpload,
    setModalProgressUpload,
    progress,
    setProgress,
    action,
  } = useAction(props);

  const breadcrumb = [
    { label: 'BASO', url: route.baso('list') },
    { label: orderNumber || '-' },
  ];

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema}
        status={{
          children: statusLabel[data?.status],
          variant: statusVariant[statusLabel[data?.status]],
        }}
      />
      <UpdateStatus
        fetchDetail={fetchDetail}
        id={orderNumber}
        modalUpdateStatus={modalUpdateStatus}
        setModalUpdateStatus={setModalUpdateStatus}
      />
      <Return
        fetchDetail={fetchDetail}
        id={orderNumber}
        modalReturn={modalReturn}
        setModalProgressUpload={setModalProgressUpload}
        setModalReturn={setModalReturn}
        setProgress={setProgress}
      />
      <ProgressUpload
        modalProgressUpload={modalProgressUpload}
        progress={progress}
      />
    </>
  );
};

DetailBaso.defaultProps = {
  feature: [],
};

DetailBaso.propTypes = {
  feature: PropTypes.array,
};

export default DetailBaso;
