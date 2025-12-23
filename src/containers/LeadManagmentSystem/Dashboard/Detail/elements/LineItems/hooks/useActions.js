// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getListLineItems } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

const useActions = (props) => {
  // const router = useRouter();
  // const { id: dashboardId, params: id } = router.query;
  const { id, status } = props;

  const [list, setList] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const fetchList = async () => {
    setLoadingTable(true);
    try {
      const result = await getListLineItems(id, status);
      const { data } = result;
      setList(data);
      setLoadingTable(false);
    } catch (error) {
      setLoadingTable(false);
      setList([]);
    }
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  const [openChildren, setOpenChildren] = useState({});

  const useCollapseChild = [openChildren, setOpenChildren];

  return {
    list,
    loadingTable,
    useCollapseChild,
    status,
  };
};

export default useActions;
