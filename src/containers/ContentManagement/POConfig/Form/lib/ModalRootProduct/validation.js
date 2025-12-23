import * as yup from 'yup';

const validation = yup.object().shape({
  isAttributeAttached: yup
    .bool()
    .optional()
    .label('Attribute attached to root product'),
  ncxCatalogId: yup.string().required().label('NCX Catalog ID'),
  ncxCatalogName: yup.string().required().label('NCX Catalog Name'),
  ncxPriceListId: yup.string().required().label('NCX Price List ID'),
  ncxPriceListName: yup.string().required().label('NCX Price List Name'),
  ncxProductCode: yup.string().required().label('NCX Product Code'),
  productIdExternal: yup.string().required().label('NCX Product ID'),
  productNameExternal: yup.string().required().label('NCX Product Name'),
});

export default validation;
