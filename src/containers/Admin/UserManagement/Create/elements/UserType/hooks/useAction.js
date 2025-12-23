import { route } from '@configs/index';
import useQueryParams from '@utils/hooks/useQueryParams';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAction = (props) => {
  const { setTab, data } = props;
  const { queryParams, setQueryParams } = useQueryParams();
  const router = useRouter();

  const userType = queryParams.userType;
  const userId = queryParams.userId;

  const setUserType = (val) => () => setQueryParams({ userType: val });

  const onSubmit = () => {
    setTab(2);
  };

  const onCancel = () => {
    router.push(route.user('list'));
  };

  useEffect(() => {
    setQueryParams({ userType: data?.metaData?.userType });
  }, [data?.metaData?.userType]);

  return {
    onCancel,
    onSubmit,
    setUserType,
    userType,
    userId,
  };
};

export default useAction;
