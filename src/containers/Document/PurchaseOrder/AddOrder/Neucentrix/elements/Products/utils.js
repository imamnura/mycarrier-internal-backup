/* eslint-disable indent */
import {
  SERVICE_ITEM_IT_HALL,
  SERVICE_ITEM_NCIX,
  SERVICE_ITEM_NER,
} from './constant';
import { currencyToNumber, dateFormat } from '@utils/parser';
import { currencyConverter } from '@utils/converter';

export const formLabel = (str) => {
  const label = {
    itHallRackUtp: 'IT Hall UTP',
    itHallFiber: 'IT Hall Fiber',
    nerRackUtp: 'NER UTP',
    nerFiber: 'NER Fiber',
    nerJlrTrans: 'JlrTrans',
    NCIXPort: 'NCIX Port',
  };
  return label[str];
};

export const formServiceLabel = (str, suffix = '') => {
  const label = {
    [SERVICE_ITEM_IT_HALL]: 'IT Hall',
    [SERVICE_ITEM_NER]: 'NER',
    [SERVICE_ITEM_NCIX]: suffix
      ? `Internet Exchange (${suffix})`
      : 'NCIX Membership',
  };
  return label[str];
};

export const formServiceDefaultLabel = (str) => {
  const label = {
    [SERVICE_ITEM_IT_HALL]: 'Rent Rack IT Hall',
    [SERVICE_ITEM_NER]: 'Rent Rack NER',
    [SERVICE_ITEM_NCIX]: 'NCIX Membership',
  };
  return label[str];
};

export const priceForms = (formServices, serviceItem) => {
  const objServices = formServices[serviceItem];
  const prices = {
    [SERVICE_ITEM_IT_HALL]: ['itHallRackUtp', 'itHallFiber'],
    [SERVICE_ITEM_NER]: ['nerRackUtp', 'nerFiber', 'nerJlrTrans'],
    [SERVICE_ITEM_NCIX]: ['NCIXPort'],
  };

  const serviceItemKeys = Object.keys(objServices)
    .filter((item) => prices[serviceItem].includes(item))
    .filter((item) => {
      return parseInt(objServices[item]) !== 0;
    });

  return serviceItemKeys;
};

export const getInputType = (inputName) => {
  switch (inputName) {
    case 'itHallRackUtp':
    case 'itHallFiber':
    case 'nerRackUtp':
    case 'nerFiber':
    case 'nerJlrTrans':
      return 'addToPricing';
    default:
      return '-';
  }
};

export function normalize(payload) {
  const mappedServices = [...payload.services].map((service) => {
    const currentPackages =
      service.packages && service.packages.length > 0
        ? [...service.packages]
        : [];

    const newAdditional = [...service.additional].map((item) => {
      const checkPackage = currentPackages.find(
        (itemPackage) =>
          `${itemPackage?.item}`.toLowerCase() === `${item.item}`.toLowerCase(),
      );
      return {
        ...item,
        ...checkPackage,
      };
    });

    const itHallQty = (name) => {
      const qty = newAdditional.find((item) => {
        return item?.item.toLowerCase().includes(name);
      });
      return parseInt(qty?.value);
    };

    return {
      item: service.item,
      otc: service.otc ?? 0,
      mrc: service.mrc ?? 0,
      qty: itHallQty('total') ?? service.qty ?? 1,
      additional: [...newAdditional],
    };
  });

  const packages = [...mappedServices];
  const newService = [];

  [...mappedServices].forEach((service) => {
    if (
      service.item === SERVICE_ITEM_NER ||
      service.item === SERVICE_ITEM_IT_HALL
    ) {
      service.additional
        .filter(
          (item) =>
            currencyToNumber(item.otc) > 0 || currencyToNumber(item.mrc) > 0,
        )
        .forEach((item) =>
          newService.push({ ...item, qty: parseInt(item?.value) }),
        );
    }
  });

  const result = [...packages, ...newService]
    .map((item) => {
      const additional = item.additional ? [...item.additional] : [];
      if (additional && additional.length > 0) {
        item.additional = additional.filter(
          (item) => item.type === '-' && item.value !== undefined,
        );
      }

      return {
        ...item,
        otc: item.otc ? currencyToNumber(item.otc).toString() : '0',
        mrc: item.mrc ? currencyToNumber(item.mrc).toString() : '0',
      };
    })
    .map((item) => {
      const additional = item.additional ? [...item.additional] : [];
      if (additional && additional.length > 0) {
        item.additional = additional.map((itemAdditional) => {
          delete itemAdditional.type;

          // convert number value to string
          if (typeof itemAdditional.value === 'number') {
            itemAdditional.value = itemAdditional.value.toString();
          }

          // ncixMembership (was NcixPort)
          if (itemAdditional.item === 'ncixMembership') {
            itemAdditional.value = { ...itemAdditional.value.value };
          }

          return {
            ...itemAdditional,
          };
        });
      }

      delete item?.value;
      if (item.type !== undefined) {
        delete item.type;
      }

      return item;
    });

  return result;
}

export const makeEditService = (data) => {
  const services = [...data.product[0].services];

  const tempEditServices = [];
  const additionalServices = [];

  const servicesGroup = [
    SERVICE_ITEM_IT_HALL,
    SERVICE_ITEM_NER,
    SERVICE_ITEM_NCIX,
  ];

  services
    .map((service) => {
      const obj = {
        itHallRackUtp: SERVICE_ITEM_IT_HALL,
        itHallFiber: SERVICE_ITEM_IT_HALL,
        nerRackUtp: SERVICE_ITEM_NER,
        nerFibder: SERVICE_ITEM_NER,
        nerJlrTrans: SERVICE_ITEM_NER,
        NCIXPort: SERVICE_ITEM_NCIX,
      };

      if (!servicesGroup.includes(service.item)) {
        return {
          ...service,
          group: obj[service.item],
        };
      }
      return { ...service };
    })
    .forEach((item) => {
      if (!item?.group) {
        tempEditServices.push(item);
      } else {
        additionalServices.push(item);
      }
    });

  additionalServices.forEach((item) => {
    tempEditServices.forEach((tempItem) => {
      if (tempItem.item === item.group) {
        tempItem.additional.push({
          item: item.item,
          value: item.qty
            ? `${item.qty}`.toString()
            : `${item['value']}`.toString(),
          mrc: item.mrc,
          otc: item.otc,
        });
      }
    });
  });

  const editData = { ...data };

  editData.product[0].services = tempEditServices;
  delete editData.orderItem;

  return editData;
};

export function convertServiceToPayload(services, price) {
  const excludeFromAdditional = [
    'itHallRackUtp',
    'itHallFiber',
    'nerRackUtp',
    'nerFiber',
    'nerJlrTrans',
    'NCIXPort',
  ];

  const rackTotal = ['itHallRackTotal', 'nerRackTotal'];

  const newServices = [];

  Object.keys(services).forEach((serviceKey) => {
    const additionalServices = [...Object.keys(services[serviceKey])]
      .filter((item) => {
        return !excludeFromAdditional.includes(item);
      })
      .map((item) => {
        return {
          item,
          value: `${services[serviceKey][item]}`,
        };
      });

    // filter itHallRackTotal when itHallRackType is Private Suite
    const filteredServices = additionalServices.filter((service) => {
      if (
        service.item === 'itHallRackTotal' &&
        additionalServices.some(
          (s) => s.item === 'itHallRackType' && s.value === 'Private Suite',
        )
      ) {
        return false; // Exclude itHallRackTotal when itHallRackType is Private Suite
      }

      return true; // Include other objects in the filtered array
    });

    const rackTotalIndex = filteredServices.findIndex((item) =>
      rackTotal.includes(item.item),
    );

    if (rackTotalIndex !== -1) {
      newServices.push({
        item: serviceKey,
        otc: currencyToNumber(price[serviceKey].base.otc),
        mrc: currencyToNumber(price[serviceKey].base.mrc),
        qty: parseInt(filteredServices[rackTotalIndex].value),
        additional: filteredServices,
      });
    } else {
      newServices.push({
        item: serviceKey,
        otc: currencyToNumber(price[serviceKey].base.otc),
        mrc: currencyToNumber(price[serviceKey].base.mrc),
        qty: 1,
        additional: filteredServices,
      });
    }
  });

  Object.keys(services).forEach((serviceKey) => {
    //Filter mlpblp for additional
    const mlpBlp = [...Object.keys(services[serviceKey])]
      .filter((item) => {
        return 'mlpBlpType'.includes(item);
      })
      .map((item) => {
        return {
          item,
          value: `${services[serviceKey][item]}`,
        };
      });

    const singleServices = [...Object.keys(services[serviceKey])]
      .filter((item) => {
        return excludeFromAdditional.includes(item);
      })
      .map((item) => {
        const result = {
          item,
          otc: currencyToNumber(price[serviceKey][item]?.otc ?? 0),
          mrc: currencyToNumber(price[serviceKey][item]?.mrc ?? 0),
          qty: parseInt(services[serviceKey][item]),
        };
        //Cover needs of mlpBlpType to be included as additional for ncixport
        if (item === 'NCIXPort') return { ...result, additional: mlpBlp };
        else return result;
      })
      .filter((item) => !!item.qty);

    newServices.push(...singleServices);
  });

  return newServices;
}

export function convertInitialValueToServices(serviceValue) {
  const newServices = {};
  const newPrice = {};

  const groupService = {
    itHallRackUtp: 'itHall',
    itHallFiber: 'itHall',
    nerRackUtp: 'NER',
    nerFiber: 'NER',
    nerJlrTrans: 'NER',
    NCIXPort: 'NCIX',
  };

  const serviceCategory = ['NCIX', 'itHall', 'NER'];

  [...serviceValue].forEach((serviceItem) => {
    if (serviceCategory?.includes(serviceItem.item)) {
      newServices[serviceItem.item] = {};
      [...serviceItem.additional].forEach((item) => {
        newServices[serviceItem.item][item.item] = `${item.value}`;
      });
    }
  });

  [...serviceValue].forEach((serviceItem) => {
    if (!serviceCategory?.includes(serviceItem.item)) {
      const group = groupService[serviceItem.item];
      newServices[group][serviceItem.item] = `${
        serviceItem.value ?? serviceItem.qty
      }`;
    }
  });

  [...serviceValue].forEach((serviceItem) => {
    if (serviceCategory?.includes(serviceItem.item)) {
      newPrice[serviceItem.item] = {
        base: {
          otc: currencyConverter(serviceItem.otc),
          mrc: currencyConverter(serviceItem.mrc),
        },
      };
    } else {
      const group = groupService[serviceItem.item];
      newPrice[group][serviceItem.item] = {
        otc: currencyConverter(serviceItem.otc),
        mrc: currencyConverter(serviceItem.mrc),
      };
    }
  });
  return {
    services: newServices,
    price: newPrice,
  };
}

export function getSummary(price, priceServicesForm) {
  let otc = 0;
  let mrc = 0;

  const services = Object.keys(price);

  services.forEach((itemKey) => {
    if (price[itemKey]) {
      const itemPrice = Object.keys(price[itemKey]);
      itemPrice.forEach((priceKey) => {
        if (priceServicesForm[itemKey]?.includes(priceKey)) {
          otc += price[itemKey][priceKey].otc
            ? currencyToNumber(price[itemKey][priceKey].otc)
            : 0;
          mrc += price[itemKey][priceKey].mrc
            ? currencyToNumber(price[itemKey][priceKey].mrc)
            : 0;
        }
      });
    }
  });

  return [otc, mrc];
}

import { cleanObject } from '@utils/common';

export const STEPS = ['Configuration', 'Pricing'];

export const regexString = {
  text: '',
  number: '^\\d+$',
};

export const mergeForms = (dynamicForm, filters) => {
  const mergedForms = [];

  dynamicForm?.forEach((form) => {
    const isFormAlreadyMerged = mergedForms.some(
      (existingForm) => existingForm.attributeName === form.attributeName,
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

  return mergedForms;
};

export const normalizeAttributeValue = (type, value) => {
  if (!type || value == null) return value;

  const normalizers = {
    number: (val) => (isNaN(parseFloat(val)) ? val : parseFloat(val)),
    integer: (val) => (isNaN(parseInt(val, 10)) ? val : parseInt(val, 10)),
    boolean: (val) => val === 'true' || val === true,
    date: (val) => dateFormat(val, 'iso'),
  };

  const normalizer = normalizers[type.toLowerCase()];
  return normalizer ? normalizer(value) : value;
};

export const normalizeDynamicAttributes = (data) => {
  if (!data || !data?.length) return data;

  const normalizeAttributes = (attributes) => {
    return attributes?.map((attr) => ({
      ...attr,
      attributeValue: normalizeAttributeValue(
        attr?.attributeType,
        attr?.attributeValue,
      ),

      // only send attribute name and value on submit product config
      // attributeName: attr?.attributeName,
      // attributeValue: normalizeAttributeValue(
      //   attr?.attributeType,
      //   attr?.attributeValue,
      // ),
      // attributeId: attr?.attributeId,
    }));
  };

  const traverseAndNormalize = (node) => {
    if (Array.isArray(node)) {
      return node?.map(traverseAndNormalize);
    }

    if (node?.attributes) {
      node.attributes = normalizeAttributes(node?.attributes);
    }

    if (node?.child) {
      node.child = traverseAndNormalize(node?.child);
    }

    return node;
  };

  return traverseAndNormalize(data);
};
