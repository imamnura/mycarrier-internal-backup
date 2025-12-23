import { useEffect, useState } from 'react';
import { replacer, checkAllFunction, autoCheck } from '../utils';

const useActions = (props) => {
  const { data, getPrivilage, journey, categoryId, featureId } = props;

  const [state, setState] = useState(data);
  const [isExpanded, _setIsExpanded] = useState(true);
  const [isExpandCategory, setIsExpandCategory] = useState({});
  const [isExpandFeature, setIsExpandFeature] = useState({});

  useEffect(() => {
    setState(data);
  }, [data]);

  const getJourney = (journey) => {
    const index = state.findIndex((item) => item._id === journey._id);
    const replace = replacer(state, index, journey);
    setState(replace);
    getPrivilage(replace);
  };

  const getCategory = (data) => {
    getJourney({
      ...journey,
      isChecked: checkAllFunction(data),
      category: data,
    });
  };

  const checkAllCategory = (data, check) => {
    return data.map((category) => ({
      ...category,
      isChecked: check,
      feature: category.feature.map((feature) => ({
        ...feature,
        isChecked: check,
        function: feature.function.map((func) => ({
          ...func,
          isChecked: check,
        })),
      })),
    }));
  };

  const onCheckedJourney = (event, data) => {
    getJourney({
      ...data,
      isChecked: event.target.checked,
      category: checkAllCategory(data.category, event.target.checked),
    });
    _setIsExpanded(true);
  };

  const getFeature = (d, id) => {
    const index = data.findIndex((item) => item._id === id);
    const find = data.find((item) => item._id === id);
    const check = checkAllFunction(d);
    const replace = replacer(data, index, {
      ...find,
      isChecked: check,
      feature: d,
    });
    getCategory(replace);
  };

  const featureReplacer = (i, id) => {
    const index = data.findIndex((item) => item._id === id);
    return replacer(data, index, i);
  };

  const checkAllFunctionFromCategory = (data, check) => {
    return data.map((feature) => ({
      ...feature,
      isChecked: check,
      function: feature.function.map((func) => ({
        ...func,
        isChecked: check,
      })),
    }));
  };

  const onCheckedCategory = (event, data) => {
    const newCategory = featureReplacer(
      {
        ...data,
        isChecked: event.target.checked,
        feature: checkAllFunctionFromCategory(
          data.feature,
          event.target.checked,
        ),
      },
      data._id,
    );
    getCategory(newCategory);
  };

  const toogleItem = (index) => {
    setIsExpandCategory((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const setIsExpanded = (v) => _setIsExpanded(v);

  const onCheckedFeature = (event, data) => {
    const newFeature = featureReplacer(
      {
        ...data,
        isChecked: event.target.checked,
        function: autoCheck(data.function, event.target.checked),
      },
      data._id,
    );
    getFeature(newFeature, categoryId);
  };

  const toogleItemFeature = (index) => {
    setIsExpandFeature((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const getFunction = (d, id) => {
    const index = data.findIndex((item) => item._id === id);
    const find = data.find((item) => item._id === id);
    const check = checkAllFunction(d, id);
    const replace = replacer(data, index, {
      ...find,
      isChecked: check,
      function: d,
    });
    getFeature(replace, categoryId);
  };

  const onCheckedFunction = (event, i) => {
    const index = data.findIndex((item) => item.alias === i.alias);
    const newFunction = replacer(data, index, {
      ...i,
      isChecked: event.target.checked,
    });
    getFunction(newFunction, featureId);
  };

  return {
    getJourney,
    state,
    getCategory,
    onCheckedJourney,
    isExpanded,
    setIsExpanded,
    getFeature,
    onCheckedCategory,
    toogleItem,
    isExpandCategory,
    getFunction,
    onCheckedFeature,
    onCheckedFunction,
    toogleItemFeature,
    isExpandFeature,
  };
};

export default useActions;
