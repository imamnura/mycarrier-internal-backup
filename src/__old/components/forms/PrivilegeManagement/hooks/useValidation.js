import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getValues, toFindDuplicates, checkEmpty } from '../utils';
import { useSnackbar } from 'notistack';

const useFunction = () => {
  const initialState = {
    status: false,
    message: '',
  };

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [messageFunctionTitle, setMessageFunctionTitle] =
    useState(initialState);
  const [messageFunctionAlias, setMessageFunctionAlias] =
    useState(initialState);
  const [messageFunctionDesc, setMessageFunctionDesc] = useState(initialState);
  const [messageFeature, setMessageFeature] = useState(initialState);
  const [messageCategory, setMessageCategory] = useState(initialState);
  const [messageIsEmpty, setMessageIsEmpty] = useState(initialState);

  const functionValidation = (data) => {
    //Function name duplicate
    if (toFindDuplicates(getValues(data, 'title'))) {
      setMessageFunctionTitle({
        status: true,
        message: 'Duplicate Function Name',
      });
      dispatch({ type: 'VALID_FUNCTION_PRIVILEGES', data: true });
      enqueueSnackbar('Duplicate Function Name');
    } else {
      setMessageFunctionTitle(initialState);
      dispatch({ type: 'VALID_FUNCTION_PRIVILEGES', data: false });
    }

    //isEmpty function name
    const isEmptyTitle = checkEmpty(getValues(data, 'title'));
    if (isEmptyTitle) {
      setMessageFunctionTitle({ status: true, message: '' });
      dispatch({ type: 'VALID_FUNCTION_PRIVILEGES', data: true });
    }

    //Function alias duplicate
    if (toFindDuplicates(getValues(data, 'alias'))) {
      setMessageFunctionAlias({
        status: true,
        message: 'Duplicate Function Alias',
      });
      dispatch({ type: 'VALID_FUNCTION_ALIAS_PRIVILEGES', data: true });
      enqueueSnackbar('Duplicate Function Alias');
    } else {
      setMessageFunctionAlias(initialState);
      dispatch({ type: 'VALID_FUNCTION_ALIAS_PRIVILEGES', data: false });
    }

    //isEmpty function alias
    const isEmptyAlias = checkEmpty(getValues(data, 'alias'));
    if (isEmptyAlias) {
      setMessageFunctionAlias({ status: true, message: '' });
      dispatch({ type: 'VALID_FUNCTION_ALIAS_PRIVILEGES', data: true });
    }

    //Description name
    if (toFindDuplicates(getValues(data, 'description'))) {
      setMessageFunctionDesc({
        status: true,
        message: 'Duplicate Description Name',
      });
      dispatch({ type: 'VALID_DESCRIPTION_PRIVILEGES', data: true });
      enqueueSnackbar('Duplicate Description Name');
    } else {
      setMessageFunctionDesc(initialState);
      dispatch({ type: 'VALID_DESCRIPTION_PRIVILEGES', data: false });
    }

    //isEmpty function desc
    const isEmptyDesc = checkEmpty(getValues(data, 'description'));
    if (isEmptyDesc) {
      setMessageFunctionDesc({ status: true, message: '' });
      dispatch({ type: 'VALID_DESCRIPTION_PRIVILEGES', data: true });
    }
  };

  const categoryValidation = (data = []) => {
    const tempData = data?.map((item) => ({ title: item.title }));
    if (toFindDuplicates(getValues(tempData, 'title'))) {
      setMessageCategory({
        status: true,
        message: 'Duplicate Category Name',
      });
      dispatch({ type: 'VALID_CATEGORY_PRIVILEGES', data: true });
      enqueueSnackbar('Duplicate Category Name');
    } else {
      setMessageCategory(initialState);
      dispatch({ type: 'VALID_CATEGORY_PRIVILEGES', data: false });
    }

    //isEmpty category
    const isEmptyCat = checkEmpty(getValues(tempData, 'title'));
    if (isEmptyCat) {
      setMessageCategory({ status: true, message: '' });
      dispatch({ type: 'VALID_CATEGORY_PRIVILEGES', data: true });
    }
  };

  const featureValidation = (data) => {
    if (toFindDuplicates(getValues(data, 'name'))) {
      setMessageFeature({
        status: true,
        message: 'Duplicate Feature Name',
      });
      dispatch({ type: 'VALID_FEATURE_PRIVILEGES', data: true });
      enqueueSnackbar('Duplicate Feature Name');
    } else {
      setMessageFeature(initialState);
      dispatch({ type: 'VALID_FEATURE_PRIVILEGES', data: false });
    }

    //isEmpty feature
    const isEmptyFeature = checkEmpty(getValues(data, 'name'));
    if (isEmptyFeature) {
      setMessageFeature({ status: true, message: '' });
      dispatch({ type: 'VALID_FEATURE_PRIVILEGES', data: true });
    }
  };

  const isEmptyValidation = (data) => {
    const titleInput = getValues(data, 'title');
    const nameInput = getValues(data, 'name');
    const aliasInput = getValues(data, 'alias');
    const descInput = getValues(data, 'description');
    const merge = [...titleInput, ...nameInput, ...aliasInput, ...descInput];
    const isEmpty = checkEmpty(merge);

    if (isEmpty) {
      setMessageIsEmpty({ status: true, message: `Privilege can't be empty` });
      enqueueSnackbar(`Privilege can't be empty`);
    } else {
      setMessageIsEmpty(initialState);
    }
    dispatch({ type: 'VALID_ISEMPTY_PRIVILEGES', data: isEmpty });
  };

  return {
    messageFunctionTitle,
    messageFunctionAlias,
    messageFunctionDesc,
    messageFeature,
    messageCategory,
    messageIsEmpty,
    functionValidation,
    categoryValidation,
    featureValidation,
    isEmptyValidation,
  };
};

export default useFunction;
