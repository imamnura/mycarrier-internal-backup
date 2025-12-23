import { useDispatch, useSelector } from 'react-redux';
import { feature, create_UUID, replacer, transformTextToAlias } from '../utils';
import { setAlert } from '../../../../../utils/popupAlert';
import { deletePrivilege } from '@containers/Admin/Privilege/_repositories/repositories';

const useFeature = () => {
  const { data } = useSelector((state) => ({
    data: state.privilege.edit,
  }));

  const dispatch = useDispatch();

  const updateFeature = (e, categoryId, featureId) => {
    //find category
    const index = data.category.findIndex((item) => item._id === categoryId);
    const findCategory = data.category.find((item) => item._id === categoryId);

    // find feature
    const featureIndex = findCategory.feature.findIndex(
      (item) => item._id === featureId,
    );
    const findFeature = findCategory.feature.find(
      (item) => item._id === featureId,
    );

    const featureUpdate = replacer(findCategory.feature, featureIndex, {
      ...findFeature,
      name: e.target.value,
      nameAlias: transformTextToAlias(e.target.value, 'lowerCase'),
    });

    const updated = {
      ...findCategory,
      feature: featureUpdate,
    };

    dispatch({
      type: 'EDIT_PRIVILEGES',
      data: {
        ...data,
        category: replacer(data.category, index, updated),
      },
    });
  };

  const deleteFeature = async (categoryId, featureId) => {
    dispatch(setAlert({ loading: true }));
    try {
      const result = await deletePrivilege({ type: 'feature', id: featureId });
      const { success, message } = result;
      if (success) {
        //find category
        const index = data.category.findIndex(
          (item) => item._id === categoryId,
        );
        const findCategory = data.category.find(
          (item) => item._id === categoryId,
        );

        // find feature
        // const featureIndex = findCategory.feature.findIndex(item => item._id === featureId);
        const deleteFeature = findCategory.feature.filter(
          (item) => item._id !== featureId,
        );

        // const featureUpdate = replacer(findCategory.feature, featureIndex, deleteFeature);

        const updated = {
          ...findCategory,
          feature: deleteFeature,
        };

        dispatch({
          type: 'EDIT_PRIVILEGES',
          data: {
            ...data,
            category: replacer(data.category, index, updated),
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

  const addFeature = (id) => {
    const index = data.category.findIndex((item) => item._id === id);
    const find = data.category.find((item) => item._id === id);
    const newFeature = {
      ...find,
      feature: [...find.feature, ...feature(create_UUID)],
    };
    const replace = replacer(data.category, index, newFeature);
    dispatch({
      type: 'EDIT_PRIVILEGES',
      data: {
        ...data,
        category: replace,
      },
    });
  };

  return {
    addFeature,
    updateFeature,
    deleteFeature,
  };
};

export default useFeature;
