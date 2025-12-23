export const replacer = (page, index, block) => {
  let data = [...page];
  data[index] = block;
  return data;
};

export const checkChildrenChecked = (data) => {
  const checkvalue = [];
  data.map((item) => {
    if (!item.isChecked) {
      checkvalue.push(item.isChecked);
    }
  });
  return checkvalue.length ? true : false;
};

export const checkAllFunction = (data) => {
  let checkvalue = [];
  data.map((item) => {
    if (!item.isChecked) {
      checkvalue.push(item.isChecked);
    }
  });
  return checkvalue.length ? false : true;
};

export const autoCheck = (data, state) => {
  let newCheck = [];
  data.map((item) => {
    newCheck.push({
      ...item,
      isChecked: state,
    });
  });
  return newCheck;
};
