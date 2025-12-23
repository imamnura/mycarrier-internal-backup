export const reStructurePrivilege = (data) => {
  const reshape = data.map((i) =>
    i.category.map((cat) => ({
      category: cat.title,
      feature: cat.feature.map((fun) => ({
        name: fun.name,
        numberOfFunction: fun.function.filter((f) => f.isChecked === true)
          .length,
        function: fun.function.filter((f) => f.isChecked === true),
      })),
    })),
  );

  const filtering = reshape.map((i) =>
    i.map((cat) => ({
      category: cat.category,
      featureCount: cat.feature.filter((f) => f.numberOfFunction !== 0).length,
      feature: cat.feature.filter((f) => f.numberOfFunction !== 0),
    })),
  );

  const filtering2 = filtering.map((i) =>
    i.filter((cat) => cat.featureCount !== 0),
  );

  const filtering3 = filtering2.filter((i) => i.length !== 0);

  const reshape2 = filtering3.map((i) =>
    i.map((cat) => ({
      category: cat.category,
      feature: cat.feature.map((f) => ({
        name: f.name,
        function: f.function.map((func) => func.alias),
      })),
    })),
  );

  const reshape3 = [].concat.apply([], reshape2);
  const output = [];
  reshape3.forEach(function (item) {
    let existing = output.filter(function (v) {
      return v.category === item.category;
    });
    if (existing.length) {
      let existingIndex = output.indexOf(existing[0]);
      output[existingIndex].feature = output[existingIndex].feature.concat(
        item.feature,
      );
    } else {
      if (typeof item.feature === 'object') item.feature = [...item.feature];
      output.push(item);
    }
  });
  return data;
};

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

export const autoAddRole = (data, check, newRole) => {
  let newRoleObj = { roleId: newRole || '' };
  let role = [];
  if (check) {
    role = [...data.role, newRoleObj];
  } else {
    role = data.role.filter((val) => val.roleId !== newRoleObj.roleId);
  }
  return role;
};

import { route } from '@configs/';

export const breadcrumb = (roleId) => {
  if (roleId) {
    return [
      { label: 'Role Management', url: route.role('list') },
      { label: roleId, url: route.role('detail', roleId) },
      { label: 'Edit Role' },
    ];
  }
  return [
    { label: 'Role Management', url: route.role('list') },
    { label: 'Add Role' },
  ];
};
