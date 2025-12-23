import { useDispatch, useSelector } from 'react-redux';
import { func, create_UUID, replacer, transformTextToAlias } from '../utils';
import { setAlert } from '../../../../../utils/popupAlert';
import { deletePrivilege } from '@containers/Admin/Privilege/_repositories/repositories';

const useFunction = () => {
  const { data } = useSelector((state) => ({
    data: state.privilege.edit,
  }));

  const dispatch = useDispatch();

  const updateFunction = (e, categoryId, featureId, functionId, type) => {
    const index = data.category.findIndex((item) => item._id === categoryId);
    const findCategory = data.category.find((item) => item._id === categoryId);

    // find feature
    const featureIndex = findCategory.feature.findIndex(
      (item) => item._id === featureId,
    );
    const findFeature = findCategory.feature.find(
      (item) => item._id === featureId,
    );

    const functionIndex = findFeature.function.findIndex(
      (item) => item._id === functionId,
    );
    const findFunction = findFeature.function.find(
      (item) => item._id === functionId,
    );

    let updatedFunc = [];
    let newValue = e.target.value;

    if (type === 'title') {
      updatedFunc = replacer(findFeature.function, functionIndex, {
        ...findFunction,
        title: newValue,
        titleAlias: transformTextToAlias(newValue),
      });
    }

    if (type === 'alias') {
      updatedFunc = replacer(findFeature.function, functionIndex, {
        ...findFunction,
        alias: newValue,
      });
    }

    if (type === 'description') {
      updatedFunc = replacer(findFeature.function, functionIndex, {
        ...findFunction,
        description: newValue,
      });
    }

    const updateFeature = {
      ...findFeature,
      function: updatedFunc,
    };

    const updateCategory = {
      ...findCategory,
      feature: replacer(findCategory.feature, featureIndex, updateFeature),
    };

    dispatch({
      type: 'EDIT_PRIVILEGES',
      data: {
        ...data,
        category: replacer(data.category, index, updateCategory),
      },
    });
  };

  const deleteFunction = async (categoryId, featureId, functionId) => {
    dispatch(setAlert({ loading: true }));
    try {
      const result = await deletePrivilege({
        type: 'function',
        id: functionId,
      });
      const { success, message } = result;
      if (success) {
        const index = data.category.findIndex(
          (item) => item._id === categoryId,
        );
        const findCategory = data.category.find(
          (item) => item._id === categoryId,
        );

        // find feature
        const featureIndex = findCategory.feature.findIndex(
          (item) => item._id === featureId,
        );
        const findFeature = findCategory.feature.find(
          (item) => item._id === featureId,
        );

        const deleteFunc = findFeature.function.filter(
          (item) => item._id !== functionId,
        );

        const updateFeature = {
          ...findFeature,
          function: deleteFunc,
        };

        const updateCategory = {
          ...findCategory,
          feature: replacer(findCategory.feature, featureIndex, updateFeature),
        };

        dispatch({
          type: 'EDIT_PRIVILEGES',
          data: {
            ...data,
            category: replacer(data.category, index, updateCategory),
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

  const addFunction = (categoryId, featureId) => {
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
      function: [...findFeature.function, ...func(create_UUID)],
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

  return {
    addFunction,
    updateFunction,
    deleteFunction,
  };
};

export default useFunction;
