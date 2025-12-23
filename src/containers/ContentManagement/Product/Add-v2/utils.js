/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import { create_uuid } from '@utils/common';
import { fullSteps, halfSteps, singleSteps, editSteps } from './constant';
import { route } from '@configs';

export const breadcrumb = ({ query, name, parentName, parentId }) => {
  const { level, type, id, parent } = query;

  const breadcrumbs = [
    { label: 'Product Management', url: '/product-management' },
    { label: `${type === 'edit' ? 'Edit' : 'Add'} Product` },
  ];

  if (type === 'edit') {
    switch (level) {
      case 'l1':
        breadcrumbs.splice(
          1,
          0,
          { label: parentName, url: route.productManage('detail', parentId) },
          { label: name, url: route.productManage('level1', parentId, id) },
        );
        break;
      case 'l2':
        breadcrumbs.splice(
          1,
          0,
          { label: parentName, url: route.productManage('detail', parentId) },
          // { label: parentName },
          {
            label: name,
            url: route.productManage('productDetail', parentId, id),
          },
        );
        break;
      default:
        breadcrumbs.splice(1, 0, {
          label: name,
          url: route.productManage('detail', id),
        });
        break;
    }
  }

  if (type === 'create') {
    switch (level) {
      case 'l1':
        breadcrumbs.splice(1, 0, {
          label: parent,
          url: route.productManage('detail', id),
        });
        break;
      case 'l2':
        breadcrumbs.splice(1, 0, { label: id });
        break;
      default:
        break;
    }
  }

  return breadcrumbs;
};

export const actionButton = ({
  step,
  // disableAction,
  // setStep,
  // setTab,
  steps,
  setOpenPreview,
  handleAddProduct,
  // formState,
  isNextDisable,
  isLoading,
  previousButton,
  formType,
  handleCancel,
}) => {
  const lastStep = steps[steps.length - 1];

  if (steps[step] === steps[0]) {
    const buttons = [
      {
        children:
          formType === 'edit' || formType === 'create'
            ? 'CANCEL'
            : 'Save As Draft',
        onClick: () =>
          formType === 'edit' || formType === 'create'
            ? handleCancel()
            : handleAddProduct(true),
        variant: 'ghost',
        disabled: isLoading,
      },
      {
        children: 'Next Step',
        disabled: isNextDisable(),
        onClick: () => handleAddProduct(false),
        loading: isLoading,
      },
    ];

    // step pertama
    return buttons;
  } else if (steps[step] === lastStep) {
    const buttons = [
      {
        children: 'Preview Page',
        disabled: isLoading,
        onClick: () => setOpenPreview(true),
        variant: 'ghost',
      },
      {
        children:
          formType === 'edit' || formType === 'create'
            ? 'CANCEL'
            : 'Save As Draft',
        onClick: () =>
          formType === 'edit' || formType === 'create'
            ? handleCancel()
            : handleAddProduct(true),
        variant: 'ghost',
        disabled: isLoading,
      },
      {
        children: 'Previous Step',
        noDivider: true,
        loading: isLoading,
        onClick: previousButton,
      },
      {
        // hideDivider: true,
        children: formType === 'edit' ? 'Submit Page' : 'Submit All Pages',
        disabled: isNextDisable(),
        loading: isLoading,
        ml: 16,
        onClick: () => handleAddProduct(false),
      },
    ];

    // if(formType === 'edit') {
    //   buttons.splice(1, 1);
    // }

    return buttons;
  } else {
    if (
      steps[step] === 'L0 - Product Information' ||
      steps[step] === 'L1 - Product Information' ||
      steps[step] === 'Product Detail - Product Information'
    ) {
      let previousLevel = 'l0';
      if (steps[step] === 'L1 - Product Information') previousLevel = 'l0';
      if (steps[step] === 'Product Detail - Product Information')
        previousLevel = 'l1';
      const buttons = [
        {
          children:
            formType === 'edit' || formType === 'create'
              ? 'CANCEL'
              : 'Save As Draft',
          onClick: () =>
            formType === 'edit' ? handleCancel() : handleAddProduct(true),
          variant: 'ghost',
          disabled: isLoading,
        },
        {
          children: 'Previous Step',
          noDivider: true,
          loading: isLoading,
          onClick: previousButton,
        },
        {
          // hideDivider: true,
          children: 'Next Step',
          disabled: isNextDisable(),
          loading: isLoading,
          ml: 16,
          onClick: () => handleAddProduct(false),
        },
      ];

      return buttons;
    }

    if (
      steps[step] === 'L0 - Content Page' ||
      steps[step] === 'L1 - Content Page'
    ) {
      const buttons = [
        {
          children: 'Preview Page',
          disabled: isLoading,
          onClick: () => setOpenPreview(true),
          variant: 'ghost',
        },
        {
          children: formType === 'edit' ? 'CANCEL' : 'Save As Draft',
          onClick: () =>
            formType === 'edit' ? handleCancel() : handleAddProduct(true),
          variant: 'ghost',
          disabled: isLoading,
        },
        {
          children: 'Previous Step',
          noDivider: true,
          loading: isLoading,
          onClick: previousButton,
        },
        {
          // hideDivider: true,
          children: 'Next Step',
          disabled: isNextDisable(),
          loading: isLoading,
          ml: 16,
          onClick: () => handleAddProduct(false),
        },
      ];

      return buttons;
    }
  }

  return [];
};

export const getSteps = (type, editLevel) => {
  switch (type) {
    case 'full':
      return fullSteps;
    case 'half':
      return halfSteps;
    case 'single':
      return singleSteps;
    case 'create':
    case 'edit':
      return editSteps(editLevel);
    default:
      return [];
  }
};

export const trimText = (text, maxLength) => {
  if (text.length > maxLength) {
    let trimmedString = text.substring(0, maxLength);
    trimmedString =
      trimmedString.substring(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
      ) + '...';

    return trimmedString;
  }

  return text;
};

export const onlyContainedWhitespace = (value) => {
  return value.replace(/\s/g, '');
};

export const create_UUID = (short) => {
  return create_uuid(short ? 16 : 32);
};

export const sectionValidator = (obj) => {
  const trueObject = [];
  obj.map((item) => {
    if (item.status) {
      trueObject.push(item);
    }
  });
  return trueObject;
};

export const replacer = (page, index, block) => {
  let data = [...page];
  data[index] = block;
  return data;
};

export const slugValidate = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

export const allAreTruthy = (arr) => arr.every((v) => v === true);

export const getValues = (obj, key) => {
  let objects = [];
  for (let i in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      objects = objects.concat(getValues(obj[i], key));
    } else if (i === key) {
      objects.push(obj[i]);
    }
  }
  return objects;
};

export const validatePixel = (w, h, files, setAlert, ratioPixel, onChange) => {
  if (w !== ratioPixel[0] && h !== ratioPixel[1]) {
    setAlert({
      message: `image not valid,
        please upload image with size ${ratioPixel[0]} : ${ratioPixel[1]} pixel`,
    });
  } else {
    onChange(files);
  }
};
