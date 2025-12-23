import { route } from '@configs/index';
import { useRouter } from 'next/router';

const useAction = () => {
  const router = useRouter();

  const tab = router.query?.tab;
  const setTab = (value) => {
    router.push(route.billsAndPayment(value));
  };

  const onRefresh = () => {
    // eslint-disable-next-line no-console
    console.log('refresh');
  };

  return {
    setTab,
    tab,
    onRefresh,
  };
};

export default useAction;
