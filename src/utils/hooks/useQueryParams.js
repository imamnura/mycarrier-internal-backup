import { useRouter } from 'next/router';

const useQueryParams = () => {
  const router = useRouter();

  const queryParams = router.query;

  const setQueryParams = (params) => {
    router.replace({ query: { ...queryParams, ...params } }, undefined, {
      shallow: true,
    });
  };

  const setQueryParamsForce = (params) => {
    router.replace({ query: { ...params } }, undefined, { shallow: true });
  };

  return {
    queryParams,
    setQueryParams,
    setQueryParamsForce,
    isReady: router?.isReady,
  };
};

export default useQueryParams;
