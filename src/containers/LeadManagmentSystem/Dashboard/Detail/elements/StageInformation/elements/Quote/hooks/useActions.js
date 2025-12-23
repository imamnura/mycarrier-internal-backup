import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getListDetailStage } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';
import { route } from '@configs/index';

const useActions = () => {
  // const { feature } = props;
  const router = useRouter();
  const { id: dashboardId } = router.query;

  const [list, setList] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const fetchList = async () => {
    setLoadingTable(true);
    try {
      const result = await getListDetailStage(dashboardId, 'quote');
      const { data } = result || [];

      // const normalize = data?.map(item => {
      //   return {
      //     ...item,
      //     // id: item.hierarchy
      //   };
      // });
      setList(data);
      setLoadingTable(false);
    } catch (error) {
      setLoadingTable(false);
      setList([]);
    }
  };

  useEffect(() => {
    fetchList();
  }, [dashboardId]);

  const onClickRowTable = async (data) => {
    router.push(
      route.dashboadLeadManagementSystem(
        'quoteHeader',
        dashboardId,
        data.scQuoteId,
      ),
    );
  };

  return {
    list,
    loadingTable,
    onClickRowTable,
  };
};

export default useActions;
