import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailContent,
  deleteEvent,
  savePriviewPage,
} from '@containers/ContentManagement/Events/_repositories/repositories';
import { normalizeDetail, getEventStatus } from '../constant';
import { dateFormat } from '@utils/parser';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = (props) => {
  const { feature } = props;
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [detailEvent, setDetailEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openPreview, setOpenPreview] = useState(false);
  const [idPreviewPage, setIdPreviewPage] = useState('');

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  const fetchDetail = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await getDetailContent(id);
      setDetailEvent(normalizeDetail(data));
    } catch (e) {
      setDetailEvent({});
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDelete = () => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      await deleteEvent(detailEvent?.eventId);
      setSuccessAlert({ message: 'Event successfully deleted' });
      router.push({ pathname: route.events('list') });
    } catch (error) {
      setFailedAlert({
        message: error?.message || 'Failed to delete event',
      });
    }
  };

  const confirmDeleteEvent = () => {
    if (isHaveAccess(feature, 'delete_event')) {
      setConfirmation({
        message: 'Are you sure want to delete this event?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchDelete() },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to delete event.`,
      });
    }
  };

  const status = getEventStatus(detailEvent?.eventStatus);

  const handlePreviewPage = async () => {
    setIsLoading(true);

    if (Object.keys(detailEvent).length > 0) {
      const payloadPreview = {
        eventRegistration: detailEvent?.eventRegistration,
        pastLink:
          detailEvent.eventStatus !== 'upcoming' && detailEvent.pastLink,
        relatedProduct: detailEvent.relatedProduct?.isDisplay
          ? detailEvent.relatedProduct?.items
          : [],
        imageBanner: detailEvent.imageBanner,
        startDate: dateFormat({ date: detailEvent.startDate, type: 'iso' }),
        endDate: dateFormat({ date: detailEvent.endDate, type: 'iso' }),
        location: detailEvent?.location,
        typeLocation: detailEvent?.typeLocation,
        title: detailEvent?.localizations[0]?.title || '',
        description: detailEvent?.localizations[0]?.description || '',
        rundown: detailEvent?.localizations[0].rundown.isDisplay
          ? detailEvent.localizations[0]?.rundown.items
          : [],
        speakers: detailEvent.speakers?.isDisplay
          ? detailEvent.speakers?.items
          : [],
        attendees: detailEvent.attendees?.isDisplay
          ? detailEvent.attendees?.items
          : [],
        sponsors: detailEvent.sponsors?.isDisplay
          ? detailEvent.sponsors?.items
          : [],
        eventId: detailEvent.eventId,
      };

      try {
        const { data } = await savePriviewPage(payloadPreview);
        data.keyId && setIdPreviewPage(data.keyId);
      } catch (error) {
        setIdPreviewPage('');
      } finally {
        setIsLoading(false);
        setOpenPreview(true);
      }
    }
  };

  const handleEdit = () => router.push(route.events('edit', id));

  return {
    id,
    detailEvent,
    router,
    isLoading,
    openPreview,
    setOpenPreview,
    confirmDeleteEvent,
    status,
    handlePreviewPage,
    idPreviewPage,
    handleEdit,
    fetchDelete, //for testing
  };
};

export default useActions;
