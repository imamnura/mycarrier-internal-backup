import { useDispatch } from 'react-redux';
import { getPrivilege } from '../../_repositories/repositories';
import { ACTIONS } from '../../../../../constants';
import { useRouter } from 'next/router';

const useActions = () => {
  const dispatch = useDispatch();
  const {
    query: { id },
  } = useRouter();
  const fetchPrivilege = async () => {
    dispatch({ type: ACTIONS.LOADING });
    try {
      const result = await getPrivilege(id);
      dispatch({ type: 'EDIT_PRIVILEGES', data: result.data });
      dispatch({ type: ACTIONS.DONE_LOADING });
    } catch (error) {
      dispatch({ type: 'EDIT_PRIVILEGES', data: {} });
      dispatch({ type: ACTIONS.DONE_LOADING });
    }
  };

  return {
    fetchPrivilege,
  };
};

export default useActions;
