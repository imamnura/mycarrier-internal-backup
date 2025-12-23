import { useDispatch, useSelector } from 'react-redux';
import {
  category,
  create_UUID,
  replacer,
  transformTextToAlias,
} from '../utils';
import { setAlert } from '@utils/popupAlert';
import { deletePrivilege } from '@containers/Admin/Privilege/_repositories/repositories';

const useCategory = () => {
  const { data } = useSelector((state) => ({
    data: state.privilege.edit,
  }));

  const dispatch = useDispatch();

  const updateCategory = (e, id) => {
    const index = data.category.findIndex((item) => item._id === id);
    const find = data.category.find((item) => item._id === id);
    const replace = replacer(data.category, index, {
      ...find,
      title: e.target.value,
      titleAlias: transformTextToAlias(e.target.value),
    });

    dispatch({
      type: 'EDIT_PRIVILEGES',
      data: {
        ...data,
        category: replace,
      },
    });
  };

  const deleteCategory = async (id) => {
    dispatch(setAlert({ loading: true }));
    try {
      const result = await deletePrivilege({ type: 'category', id });
      const { success, message } = result;
      if (success) {
        const deleteCategory = data.category.filter((item) => item._id !== id);
        dispatch({
          type: 'EDIT_PRIVILEGES',
          data: {
            ...data,
            category: deleteCategory,
          },
        });

        dispatch(
          setAlert({
            content: message,
            success: success,
          }),
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          content: error.message,
          success: false,
        }),
      );
    }
  };

  const addCategory = () => {
    const newCategory = [...data.category, ...category(create_UUID)];
    dispatch({
      type: 'EDIT_PRIVILEGES',
      data: {
        ...data,
        category: newCategory,
      },
    });
  };

  return {
    addCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategory;
