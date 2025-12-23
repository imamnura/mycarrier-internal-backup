import { getFileInformation, isPreviewable } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetail } from '../../_repositories/repositories';
import { dataMapping } from '../utils';
import useActionGameqoo from './useActionGameqoo';
import useActionAntares from './useActionAntares';
import useActionNeucloud from './useActionNeucloud';
import useActionOCA from './useActionOCA';
import useActionNetmonk from './useActionNetmonk';
import useActionTOMPS from './useActionTOMPS';
import useActionAntaresEazy from './useActionAntaresEazy';
import useActionApilogy from './useActionApilogy';
import useActionPijar from './useActionPijar';
import useActionCdnaas from './useActionCdnaas';

const useDetail = () => {
  const router = useRouter();
  const {
    query: { id: referenceId },
  } = router;

  const { setDocumentViewer } = useDocumentViewer();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalMultiAttachment, setModalMultiAttachment] = useState(null);

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const result = await getDetail(referenceId);
      setData({
        ...result.data,
        product: result.data?.typeTicket,
      });
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (referenceId) {
      fetchDetail();
    }
  }, [referenceId]);

  const onPreviewWorklog =
    ({ fileName, fileUrl }) =>
    () => {
      const { name, extension } = getFileInformation(fileUrl);

      if (isPreviewable(extension)) {
        setDocumentViewer({
          title: fileName || name,
          url: fileUrl,
        });
      } else {
        window.open(fileUrl);
      }
    };

  const openModalMultiAttachment = (files) => () => {
    setModalMultiAttachment({
      title: 'View Attachment',
      listAttachment: files,
    });
  };

  const productAction =
    {
      antares: useActionAntares(),
      cdnaas: useActionCdnaas({ fetchDetail }),
      gameqoo: useActionGameqoo(),
      neucloud: useActionNeucloud({ data }),
      oca: useActionOCA(),
      netmonk: useActionNetmonk(),
      tomps: useActionTOMPS(),
      antareseazy: useActionAntaresEazy(),
      apilogy: useActionApilogy(),
      pijar: useActionPijar(),
    }[data?.product] || {};

  return {
    referenceId,
    data: dataMapping(data),
    onPreviewWorklog,
    modalMultiAttachment,
    openModalMultiAttachment,
    setModalMultiAttachment,
    loading,
    fetchDetail,
    productAction,
  };
};

export default useDetail;
