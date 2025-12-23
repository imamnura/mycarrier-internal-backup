import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import DetailBase from '@fragments/Detail';
import useActions from './hooks/useActions';
import { breadcrumb, handleSchema } from './constant';
import PageViewer from '../Add-v2/lib/components/PageViewer';

const Detail = (props) => {
  const {
    detailEvent,
    isLoading,
    openPreview,
    setOpenPreview,
    confirmDeleteEvent,
    status,
    handlePreviewPage,
    idPreviewPage,
    handleEdit,
  } = useActions(props);

  return (
    <>
      <DetailBase
        action={[
          {
            children: 'Preview Page',
            disabled: isLoading,
            onClick: () => handlePreviewPage(),
            variant: 'ghost',
          },
          {
            children: 'Delete',
            noDivider: true,
            loading: isLoading,
            onClick: () => confirmDeleteEvent(),
            variant: 'ghost',
          },
          {
            // hideDivider: true,
            children: 'Edit',
            disabled: isLoading,
            loading: isLoading,
            // ml: 16,
            onClick: handleEdit,
            variant: 'ghost',
          },
        ]}
        breadcrumb={breadcrumb(detailEvent.eventName)}
        loading={isLoading}
        notFound={!detailEvent?.eventId || isEmpty(detailEvent)}
        schema={handleSchema(detailEvent)}
        status={status}
      />
      <PageViewer
        eventId={detailEvent.eventId}
        idPreviewPage={idPreviewPage}
        onClose={() => setOpenPreview(false)}
        open={openPreview}
        title="Event - Preview Page"
      />
    </>
  );
};

Detail.defaultProps = {};

Detail.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default Detail;
