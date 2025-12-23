import { useEffect, useState } from 'react';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import { getOptionForm } from '@containers/ServiceDelivery/IPPrefix/_repositories/repositories';

const useActions = (props) => {
  const { fetchUpdateStatus, content, setContent } = props;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [loadingListNode, setLoadingListNode] = useState(true);
  const [listNode, setListNode] = useState([]);
  const [loadingListPort, setLoadingListPort] = useState(false);
  const [listPort, setListPort] = useState([]);

  const { control, handleSubmit, formState, reset, watch, resetField } =
    useForm({
      resolver: validation,
      mode: 'onChange',
    });

  const createNewPort = watch('createNewPort');
  const node = watch('node');

  const fetchOptionNode = async () => {
    setLoadingListNode(true);

    try {
      const { data } = await getOptionForm('nodes');
      setListNode(
        data.map((item) => ({
          label: item,
          value: item,
        })),
      );
    } catch (error) {
      setListNode([]);
    } finally {
      setLoadingListNode(false);
    }
  };

  const fetchOptionPort = async () => {
    setLoadingListPort(true);
    resetField('port');

    try {
      const { data } = await getOptionForm('ports', { node: node });
      setListPort(
        data.map((item) => ({
          label: item,
          value: item,
        })),
      );
    } catch (error) {
      setListPort([]);
    } finally {
      setLoadingListPort(false);
    }
  };

  useEffect(() => {
    if (content?.open) {
      fetchOptionNode();
    }
    reset(content?.autofill);
    return () => {
      reset();
    };
  }, [content]);

  useEffect(() => {
    if (!!content?.open && !!node) {
      fetchOptionPort();
    }
  }, [node]);

  const onSubmit = (v) => () => {
    fetchUpdateStatus(v, content);
    closeConfirmation();
  };
  const onClose = () => {
    closeConfirmation();
    setContent({ ...content, open: false });
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: content?.confirmation,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: onSubmit(values) },
      ],
    };

    setConfirmation(confirmation);
    setContent({ ...content, open: false });
  };

  return {
    control,
    formState,
    fetchUpdateStatus,
    handleSubmit,
    handleUpdateStatus,
    onClose,
    onSubmit,
    createNewPort,
    node,
    loading: {
      node: loadingListNode,
      port: loadingListPort,
    },
    options: {
      node: listNode,
      port: listPort,
    },
  };
};

export default useActions;
