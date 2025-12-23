import { cleanObject } from '@utils/common';
import { camelCase } from 'lodash';

export const tableHeader = [
  {
    cellStyle: {
      width: 180,
    },
    label: 'Product Category',
    name: 'categoryName',
  },
  {
    cellStyle: {
      width: 180,
    },
    label: 'Product & Service',
    name: 'productName',
  },
  {
    cellStyle: {
      width: 300,
    },
    label: 'Description',
    name: 'description',
  },
  {
    cellStyle: {
      width: 180,
    },
    label: 'Total',
    name: 'grandTotal',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 60,
      width: 60,
    },
    label: 'ACTION',
    name: 'operations',
  },
];

export const mergeForms = (products, orderTypes, filters) => {
  const mergedForms = [];
  const normalizeOrderTypes = orderTypes?.split(',');

  products?.forEach((product) => {
    normalizeOrderTypes?.forEach((orderType) => {
      product?.form?.[camelCase(orderType)]?.forEach((form) => {
        const isFormAlreadyMerged = mergedForms.some(
          (existingForm) => existingForm.formKey === form.formKey,
        );
        const shouldPushForm = Object.entries(filters).every(([key, value]) => {
          const formValue = form[key];
          if (Array.isArray(value)) {
            return value.includes(formValue);
          } else if (typeof value === 'boolean') {
            return Boolean(formValue) === value;
          } else {
            return formValue === value;
          }
        });

        if (!isFormAlreadyMerged && shouldPushForm) {
          mergedForms.push(cleanObject(form));
        }
      });
    });
  });

  return mergedForms;
};

export const normalizeAdditionalDataProduct = (formState, fieldProps = {}) => {
  const { formKey, formtype } = fieldProps;
  const stateKey = formState?.[formKey];
  let additionalData = {};

  if (['Text Field', 'Text Area'].includes(formtype)) {
    additionalData = {
      [formKey]: stateKey,
    };
  }

  if (formtype === 'Dropdown') {
    if (formKey === 'sidNeucentrix') {
      additionalData = {
        locationNeucentrix: stateKey?.data?.location,
        sidNeucentrix: stateKey?.data?.sid,
      };
    } else {
      additionalData = {
        [formKey]: stateKey?.data?.value,
      };
    }
  }
  if (formtype === 'Upload File') {
    let normalizeFile;
    if (stateKey?.length > 0) {
      normalizeFile = stateKey?.map((fileItem) => fileItem?.data);
    } else {
      if (stateKey?.data) {
        normalizeFile = [stateKey?.data];
      }
    }

    additionalData = {
      [formKey]: normalizeFile,
    };
  }
  if (formtype === 'Upload BAKES') {
    additionalData = {
      bakesNumber: stateKey?.bakesNumber,
      bakesFile: [stateKey?.bakesFile?.data],
    };
  }
  if (formtype === 'Packages') {
    additionalData = {
      [formKey]: stateKey
        ?.filter((packageItem) => packageItem?.checked === true)
        ?.map((packageItem) => {
          delete packageItem?.checked;
          delete packageItem?.minQty;
          return {
            ...packageItem,
            discount: Number(packageItem?.discount || 0),
            price: Number(packageItem?.price || 0),
            quantity: Number(packageItem?.quantity || 0),
            subTotal: Number(packageItem?.subTotal || 0),
          };
        }),
    };
  }

  return cleanObject(additionalData);
};

export const normalizeSolutionData = (product) => {
  let additionalData = {};
  const solutionForms = [
    'bakesDuration',
    'bakesStartDate',
    'bakesEndDate',
    'packagesSolutions',
    'grandTotal',
  ];

  solutionForms.forEach((item) => {
    if (item === 'packagesSolutions') {
      return (additionalData.packages = product[item]?.map((packageItem) => ({
        ...packageItem,
        discount: Number(packageItem?.discount || 0),
        price: Number(packageItem?.price || 0),
        quantity: Number(packageItem?.quantity || 0),
        subTotal: Number(packageItem?.subTotal || 0),
      })));
    }
    return (additionalData[item] = product[item]);
  });

  return additionalData;
};
