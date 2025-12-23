import { useEffect, useState } from 'react';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import {
  getListCommnent,
  postComment,
} from '@containers/ServiceDelivery/IPPrefix/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { cleanObject } from '@utils/common';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const { open, setOpen } = props;

  const { setFailedAlert } = usePopupAlert();
  const router = useRouter();

  const { params: requestId } = router.query;

  const [loadingSendComment, setLoadingSendComment] = useState(true);
  const [loadingComment, _setLoadingComment] = useState({
    root: true,
    row: false,
  });
  const [comment, setComment] = useState([]);

  const setLoadingComment = ({ root, row }) => {
    const resRoot = typeof root === 'boolean' ? root : loadingComment.root;
    const resRow = typeof row === 'boolean' ? row : loadingComment.row;

    _setLoadingComment({
      root: resRoot,
      row: resRow,
    });
  };

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  // const formValues = useWatch({
  //   control: control,
  // });

  const updateScroll = () => {
    const roomChat = document.getElementById('room-chat');
    if (roomChat) {
      roomChat.scrollTop = roomChat.scrollHeight;
    }
  };

  const fetchComment = async (resetData) => {
    if (resetData) {
      setComment([]);
    }

    const loadings = !loadingComment.root && !loadingComment.row;

    if (loadings || resetData) {
      if (resetData) setLoadingComment({ root: true });
      else setLoadingComment({ row: true });
      try {
        const { data } = await getListCommnent(requestId);
        setComment(data);
        setLoadingComment({
          root: false,
          row: false,
        });
      } catch (error) {
        setLoadingComment({
          root: false,
          row: false,
        });
        setComment([]);
      }
    }
  };

  const fetchSendComment = async (formData) => {
    const payload = {
      comment: formData?.comment,
      requestId: requestId,
    };

    try {
      setLoadingSendComment(true);
      await postComment({ data: cleanObject(payload) });
      fetchComment(false);
      reset({ comment: '' });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Send Comment',
      });
    }
  };

  useEffect(() => {
    if (open) {
      fetchComment(true);
    }
    return () => {
      setComment([]);
      reset();
      _setLoadingComment({
        root: true,
        row: false,
      });
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      updateScroll();
    }
    return () => {
      updateScroll();
    };
  }, [comment]);

  const onClose = () => {
    setOpen(false);
  };

  const handleSendComment = (values) => {
    fetchSendComment(values);
  };

  return {
    control,
    formState,
    handleSendComment,
    handleSubmit,
    onClose,
    loading: {
      data: loadingComment,
      submit: loadingSendComment,
    },
    comment,
  };
};

export default useActions;
