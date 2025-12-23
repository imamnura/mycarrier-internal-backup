import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Disconnect from '@assets/icon-v2/Disconnect';
import NonNetwork from '@assets/icon-v2/NonNetwork';
import { route } from '@configs';

const useActions = (props) => {
  const {
    modalApproveIssue,
    setModalApproveIssue,
    referenceId,
    setModalChooseCategory,
  } = props;

  const router = useRouter();

  const [networkType, _setNetworkType] = useState(null);

  useEffect(() => {
    return () => {
      _setNetworkType(null);
    };
  }, [modalApproveIssue]);

  const setNetworkType = (val) => () => {
    _setNetworkType(val);
  };

  const onSubmit = () => {
    if ('network' === networkType) {
      router.push(route.digitalProduct('gameqoo-validation', referenceId));
    } else if ('nonNetwork' === networkType) {
      setModalChooseCategory({
        confirmation:
          'Are you sure want to escalated this issue gameqoo ticket to FAB Digital?',
        submitText: 'SUBMIT',
        success:
          'GameQoo ticket successfully escalated to FAB Digital & approved',
        textInfo:
          'Salesforce category & subcategory will help you define the trouble',
        title: 'Choose salesforce category & subcategory',
      });
    }
    setModalApproveIssue(false);
  };

  const onClose = () => {
    setModalApproveIssue(false);
  };

  const networkTypeList = [
    {
      id: 'nonNetwork',
      Icon: NonNetwork,
      label: 'Non Network Issue',
      desc: 'This issue will be escalated to FAB Digital',
    },
    {
      id: 'network',
      Icon: Disconnect,
      label: 'Network Issue',
      desc: 'This issue will be escalated to NOSS-A',
    },
  ];

  return {
    networkType,
    networkTypeList,
    onClose,
    onSubmit,
    setNetworkType,
  };
};

export default useActions;
