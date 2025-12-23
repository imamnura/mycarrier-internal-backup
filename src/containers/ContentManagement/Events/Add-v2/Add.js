import React from 'react';
import Tabs from '@components/Tabs';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import useActions from './hooks/useActions';
import PageViewer from './lib/components/PageViewer';
import RegistrationLink from './lib/sections/RegistrationLink';
import RelatedProducts from './lib/sections/RelatedProducts';
import Speakers from './lib/sections/Speakers';
import Attendees from './lib/sections/Attendees';
import Sponsor from './lib/sections/Sponsor';
import { breadcrumb } from './constant';
import EventBanner from './lib/sections/EventBanner';
import EventDetails from './lib/sections/EventDetails';
import SectionTree from './lib/components/SectionTree';
import SectionRundown from './lib/sections/Rundown';
import { Box } from '@material-ui/core';
import { route } from '@configs';
import Card from '@components/Card';

const Add = (props) => {
  const {
    id,
    dataEvent,
    router,
    handleSubmit,
    formState,
    control,
    getValues,
    setValue,
    watch,
    isLoading,
    isLoadingDetail,
    openPreview,
    setOpenPreview,
    displaySpeakers,
    displayAttendees,
    displaySponsor,
    displayRelatedProduct,
    displayRundown,
    tabsProps,
    handleAddEvent,
    fetchEvent,
    productOption,
    loadingProduct,
    filterSectionTree,
    isValidContent,
    isValidRundown,
    handlePreviewPage,
    idPreviewPage,
    isClickPreview,
  } = useActions(props);

  const action = () => {
    const button = [
      {
        children: 'Preview Page',
        disabled: isLoading || isLoadingDetail,
        onClick: () => handlePreviewPage(),
        variant: 'ghost',
      },
      {
        children: 'Save As Draft',
        disabled: isLoading || isLoadingDetail,
        onClick: () => fetchEvent({}, true),
        variant: 'ghost',
      },
      {
        children: 'Cancel',
        noDivider: true,
        loading: isLoading || isLoadingDetail,
        onClick: () => {
          if (id) {
            return router.push(route.events('detail', id));
          }
          return router.push(route.events('list'));
        },
        variant: 'ghost',
      },
      {
        // hideDivider: true,
        children: 'Add',
        disabled: id
          ? !formState.isValid || isValidContent || isValidRundown
          : !formState.isDirty ||
            !formState.isValid ||
            isValidContent ||
            isValidRundown,
        loading: isLoading || isLoadingDetail,
        // ml: 16,
        type: 'submit',
      },
    ];

    if (id) {
      button.splice(1, 1);
    }

    return button;
  };

  const sectionTopProps = {
    action: action(),
    breadcrumb: breadcrumb(id, dataEvent),
  };

  const renderContent = () => (
    <>
      <RegistrationLink
        isLoading={isLoading}
        previewMode={openPreview}
        tab={tabsProps.value}
        useform={{ control }}
      />
      <RelatedProducts
        display={displayRelatedProduct}
        isLoading={isLoading}
        loadingProduct={loadingProduct}
        options={productOption}
        previewMode={openPreview}
        tab={tabsProps.value}
        useForm={{
          _control: control,
          _getValues: getValues,
          _formState: formState,
        }}
      />
      <EventDetails
        isLoading={isLoading}
        previewMode={openPreview}
        tab={tabsProps.value}
        useForm={{
          _control: control,
          _getValues: getValues,
          _formState: formState,
          _setValue: setValue,
          _watch: watch,
        }}
      />
      <EventBanner
        isLoading={isLoading}
        previewMode={openPreview}
        tab={tabsProps.value}
        useForm={{
          _control: control,
          _getValues: getValues,
          _formState: formState,
          _setValue: setValue,
          _watch: watch,
        }}
      />
      <Speakers
        display={displaySpeakers}
        isLoading={isLoading}
        previewMode={openPreview}
        tab={tabsProps.value}
        useForm={{
          _control: control,
        }}
      />
      <Attendees
        display={displayAttendees}
        isLoading={isLoading}
        previewMode={openPreview}
        tab={tabsProps.value}
        useForm={{
          _getValues: getValues,
          _setValue: setValue,
          _watch: watch,
        }}
      />
      <SectionRundown
        display={displayRundown}
        isClickPreview={isClickPreview}
        isLoading={isLoading}
        isLoadingDetail={isLoadingDetail}
        previewMode={openPreview}
        tab={tabsProps.value}
        useForm={{
          _control: control,
          _getValues: getValues,
          _setValue: setValue,
          _watch: watch,
        }}
      />
      <Sponsor
        display={displaySponsor}
        isLoading={isLoading}
        previewMode={openPreview}
        tab={tabsProps.value}
        useForm={{
          _control: control,
        }}
      />
    </>
  );

  return (
    <>
      <form onSubmit={handleSubmit(handleAddEvent)}>
        <Box
          style={{
            top: '72px',
            zIndex: 4,
            position: 'sticky',
            background: '#FFF',
          }}
        >
          <HeaderAndFilter {...sectionTopProps} />
        </Box>
        {!openPreview && <Tabs {...tabsProps} />}

        <Box style={{ display: 'flex' }} pb={4} px={5}>
          <Card
            style={{ marginBottom: '2rem', marginTop: '1.5rem', width: '80%' }}
          >
            {renderContent()}
          </Card>
          <Card style={{ marginBottom: '2rem', marginTop: '1.5rem' }}>
            <SectionTree
              filterOptions={filterSectionTree.options}
              filterValue={filterSectionTree.value}
              filterWidth={300}
            />
          </Card>
        </Box>

        <PageViewer
          eventId={dataEvent?.eventId}
          idPreviewPage={idPreviewPage}
          onClose={() => setOpenPreview(false)}
          open={openPreview}
          tab={tabsProps.value}
          title="Event - Preview Page"
        />
      </form>
    </>
  );
};

Add.defaultProps = {};

Add.propTypes = {};

export default Add;
