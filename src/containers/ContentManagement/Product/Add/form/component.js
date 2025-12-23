/* eslint-disable no-unsafe-optional-chaining */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Chip, Divider } from '@material-ui/core';
import { Field, change } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';

// element
import Text from '@__old/components/elements/Text';
import TextField from '@__old/components/elements/TextField';
import Dropdown from '@__old/components/elements/Dropdown';
import Button from '@__old/components/elements/Button';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import Check from '@assets/icon-v2/Check';
import LangSwitcher from './lib/langSwitcher';
import { ACTIONS } from '@constants';
import { useRouter } from 'next/router';
import FileAttachment from '../components/FileAttachment';
import { defaultConfirm } from '@constants/dialogDefaultValue';

const Component = ({
  action,
  classes,
  category,
  category1,
  category2,
  product,
  setIsEditTranslation,
  setParamsTranslate,
  setTabData,
  isEditTranslation,
  isSavedTranslation,
  setIsUploadDocument,
  documentList,
  setDocumentList,
  setInitialDocument,
  setTempDeletedDoc,
  tempDeletedDoc,
}) => {
  const dispatch = useDispatch();

  const { localizations, listLanguage, baseLanguage } = useSelector(
    (s) => s.productManagement,
  );

  const [cat, setCat] = useState(category);
  const [cat1, setCat1] = useState(category1);
  const [cat2, setCat2] = useState(category2);

  const [selectCat, setSelectCat] = useState({});
  const [selectCat1, setSelectCat1] = useState({});
  const [selectCat2, setSelectCat2] = useState({});

  let {
    query: { id },
  } = useRouter();
  const isEdit = id ? true : false;

  const [chipData, setChipData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [counterProductName, setCounterProductName] = useState(0);
  const [counterProductSlug, setCounterProductSlug] = useState(0);
  const [counterMetaTitle, setCounterMetaTitle] = useState(0);
  const [counterMetaDesc, setCounterMetaDesc] = useState(0);
  const [loadingCategory, _setLoadingCategory] = useState({
    cat1: false,
    cat2: false,
  });

  const [confirmation, setConfirmation] = useState({
    actions: [],
    content: '',
  });

  const addLabel = (arr) => {
    if (Array.isArray(arr)) {
      return arr?.map((item) => ({ ...item, label: item.catName }));
    }
  };

  useEffect(() => {
    action.getCategoryProduct('level 0', '');
    if (isEdit) {
      action.setUpdateProduct({
        ...product,
        meta: {
          ...product.meta,
          keyword: product.meta.keyword,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setChipData(product?.meta?.keyword);
      setCounterProductName((product?.productName).length || 0);
      setCounterProductSlug((product?.productSlug).length || 0);
      setCounterMetaTitle((product?.meta?.title).length || 0);
      setCounterMetaDesc((product?.meta?.description).length || 0);
    }

    if (!isEditTranslation) {
      dispatch(
        change('ProductManagementForm', 'productName', product?.productName),
      );
      dispatch(
        change('ProductManagementForm', 'productSlug', product?.productSlug),
      );
      dispatch(
        change('ProductManagementForm', 'metaTitle', product?.meta?.title),
      );
      setChipData(product.meta?.keyword);
      dispatch(
        change('ProductManagementForm', 'metaDesc', product?.meta?.description),
      );
      setCat(addLabel(category));
      setCat1(addLabel(category1));
      setCat2(addLabel(category2));

      setCounterProductName((product?.productName).length || 0);
      setCounterProductSlug((product?.productSlug).length || 0);
      setCounterMetaTitle((product?.meta?.title).length || 0);
      setCounterMetaDesc((product?.meta?.description).length || 0);
    }
  }, [product]);

  useEffect(() => {
    setCat(addLabel(category));
    setCat1(addLabel(category1));
    setCat2(addLabel(category2));
  }, [category, category1, category2]);

  const handleProductName = (e) => {
    action.setUpdateProduct({ ...product, productName: e.target.value });
    setCounterProductName(e.target.value.toString().length);
  };

  const handleSlug = (e) => {
    action.setUpdateProduct({ ...product, productSlug: e.target.value });
    setCounterProductSlug(e.target.value.toString().length);
  };

  const handleMetaTitle = (e) => {
    action.setUpdateProduct({
      ...product,
      meta: {
        ...product.meta,
        title: e.target.value,
      },
    });
    setCounterMetaTitle(e.target.value.toString().length);
  };

  const handleMetaDesc = (e) => {
    action.setUpdateProduct({
      ...product,
      meta: {
        ...product.meta,
        description: e.target.value,
      },
    });
    setCounterMetaDesc(e.target.value.toString().length);
  };

  const setLoadingCategory = () =>
    _setLoadingCategory({ cat1: false, cat2: false });

  const handleLevel0 = (e) => {
    setSelectCat(e);
    setSelectCat1({});
    setSelectCat2({});
    action.setUpdateProduct({
      ...product,
      category: [
        {
          catId: e.catId,
          levelId: e.levelId,
          catName: e.catName,
          catSlug: e.catSlug,
        },
        {
          catId: '',
          levelId: '',
          catName: '',
          catSlug: '',
        },
        {
          catId: '',
          levelId: '',
          catName: '',
          catSlug: '',
        },
      ],
    });

    _setLoadingCategory({ cat1: true, cat2: false });
    action.getCategoryProduct('level 1', `/${e.catSlug}`, setLoadingCategory);
  };

  const handleLevel1 = (e) => {
    setSelectCat1(e);
    setSelectCat2({});
    action.setUpdateProduct({
      ...product,
      category: [
        product.category[0],
        {
          catId: e.catId,
          levelId: e.levelId,
          catName: e.catName,
          catSlug: e.catSlug,
        },
        product.category[2],
      ],
    });

    _setLoadingCategory({ cat1: false, cat2: true });
    action.getCategoryProduct(
      'level 2',
      `/${selectCat.catSlug}/${e.catSlug}`,
      setLoadingCategory,
    );
  };

  const handleLevel2 = (e) => {
    setSelectCat2(e);
    action.setUpdateProduct({
      ...product,
      category: [
        product.category[0],
        product.category[1],
        {
          catId: e.catId,
          levelId: e.levelId,
          catName: e.catName,
          catSlug: e.catSlug,
        },
      ],
    });
  };

  const placeholderCat = (level) => {
    if (level === '1') {
      return loadingCategory.cat1
        ? 'Loading...'
        : selectCat1.label || product?.category[1]?.catName || 'Level 1';
    } else {
      return loadingCategory.cat2
        ? 'Loading...'
        : selectCat2.label || product?.category[2]?.catName || 'Level 2';
    }
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleDeleteKeyword = (chipToDelete) => () => {
    //setChipData(chipData.filter((chip) => chip !== chipToDelete));
    const newChip = chipData.filter((chip) => chip !== chipToDelete);
    setChipData(newChip);
    action.setUpdateProduct({
      ...product,
      meta: {
        ...product.meta,
        keyword: newChip,
      },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (keyword !== '') {
        e.preventDefault();
        setKeyword('');
        setChipData([...chipData, keyword]);
        action.setUpdateProduct({
          ...product,
          meta: {
            ...product.meta,
            keyword: [...chipData, keyword],
          },
        });
      } else {
        e.preventDefault();
      }
    }
  };

  const counter = (counterField, maxLengthField) => {
    return (
      <Grid container style={{ width: '100%' }}>
        <Grid item style={{ textAlign: 'right' }} xs={12}>
          <Text variant="status">
            {counterField}/{maxLengthField}
          </Text>
        </Grid>
      </Grid>
    );
  };

  const required = (label) => {
    return (
      <>
        <Text color="primary" variant="subtitle2">
          *{' '}
        </Text>
        {label}
      </>
    );
  };

  const onClickEditTranslation = (v) => {
    dispatch({ type: ACTIONS.PRODUCT_ACTIVE_TAB, data: 0 });
    if (localizations.length > 0) {
      dispatch({
        type: ACTIONS.PRODUCT_MANAGEMENT_SECTION,
        data: baseLanguage,
      });
    }

    const tabItems = [];
    tabItems.push(listLanguage[0].lang);
    tabItems.push(listLanguage[1].lang);
    if (tabItems.length > 0) {
      setTabData(tabItems);
      setParamsTranslate(listLanguage[0].value, listLanguage[1].value);
    }
    setIsEditTranslation(v);
  };

  const handleDragEnd = () => {
    if (localizations?.length > 0) {
      //base language id
      if (listLanguage[0].value === 'id') {
        //switch without edit translation
        if (localizations[0].language === 'en') {
          const remapBaseLanguage = {
            ...localizations[0],
            baseLanguage: true,
            language: 'id',
            metaData: localizations[1].metaData,
          };

          const remapTranslateLanguage = {
            ...localizations[1],
            baseLanguage: false,
            language: 'en',
            metaData: localizations[0].metaData,
          };

          const remappingLocatizations = [
            { ...remapBaseLanguage },
            { ...remapTranslateLanguage },
          ];

          dispatch({
            type: ACTIONS.PRODUCT_LOCALIZATIONS,
            data: remappingLocatizations,
          });
          dispatch({
            type: ACTIONS.PRODUCT_MANAGEMENT_SECTION,
            data: remappingLocatizations[0]?.metaData,
          });
          dispatch({
            type: ACTIONS.PRODUCT_BASE_LANGUAGE,
            data: remappingLocatizations[0]?.metaData,
          });
          dispatch({
            type: ACTIONS.PRODUCT_TRANSLATE_LANGUAGE,
            data: remappingLocatizations[1]?.metaData,
          });
        } else {
          const remapBaseLanguage = {
            ...localizations[0],
            baseLanguage: true,
            language: 'en',
            metaData: localizations[1].metaData,
          };

          const remapTranslateLanguage = {
            ...localizations[1],
            baseLanguage: false,
            language: 'id',
            metaData: localizations[0].metaData,
          };

          const remappingLocatizations = [
            { ...remapBaseLanguage },
            { ...remapTranslateLanguage },
          ];

          dispatch({
            type: ACTIONS.PRODUCT_LOCALIZATIONS,
            data: remappingLocatizations,
          });
          dispatch({
            type: ACTIONS.PRODUCT_MANAGEMENT_SECTION,
            data: remappingLocatizations[0]?.metaData,
          });
          dispatch({
            type: ACTIONS.PRODUCT_BASE_LANGUAGE,
            data: remappingLocatizations[0]?.metaData,
          });
          dispatch({
            type: ACTIONS.PRODUCT_TRANSLATE_LANGUAGE,
            data: remappingLocatizations[1]?.metaData,
          });
        }
      }

      //base language en
      if (listLanguage[0].value === 'en') {
        if (localizations[0].language === 'id') {
          const remapBaseLanguage = {
            ...localizations[0],
            baseLanguage: true,
            language: 'en',
            metaData: localizations[1].metaData,
          };

          const remapTranslateLanguage = {
            ...localizations[1],
            baseLanguage: false,
            language: 'id',
            metaData: localizations[0].metaData,
          };

          const remappingLocatizations = [
            { ...remapBaseLanguage },
            { ...remapTranslateLanguage },
          ];

          dispatch({
            type: ACTIONS.PRODUCT_LOCALIZATIONS,
            data: remappingLocatizations,
          });
          dispatch({
            type: ACTIONS.PRODUCT_MANAGEMENT_SECTION,
            data: remappingLocatizations[0]?.metaData,
          });
          dispatch({
            type: ACTIONS.PRODUCT_BASE_LANGUAGE,
            data: remappingLocatizations[0]?.metaData,
          });
          dispatch({
            type: ACTIONS.PRODUCT_TRANSLATE_LANGUAGE,
            data: remappingLocatizations[1]?.metaData,
          });
        } else {
          const remapBaseLanguage = {
            ...localizations[0],
            baseLanguage: true,
            language: 'id',
            metaData: localizations[1].metaData,
          };

          const remapTranslateLanguage = {
            ...localizations[1],
            baseLanguage: false,
            language: 'en',
            metaData: localizations[0].metaData,
          };

          const remappingLocatizations = [
            { ...remapBaseLanguage },
            { ...remapTranslateLanguage },
          ];

          dispatch({
            type: ACTIONS.PRODUCT_LOCALIZATIONS,
            data: remappingLocatizations,
          });
          dispatch({
            type: ACTIONS.PRODUCT_MANAGEMENT_SECTION,
            data: remappingLocatizations[0]?.metaData,
          });
          dispatch({
            type: ACTIONS.PRODUCT_BASE_LANGUAGE,
            data: remappingLocatizations[0]?.metaData,
          });
          dispatch({
            type: ACTIONS.PRODUCT_TRANSLATE_LANGUAGE,
            data: remappingLocatizations[1]?.metaData,
          });
        }
      }
    }
  };

  const handleSetNewList = (list) => {
    dispatch({ type: ACTIONS.PRODUCT_LIST_LANGUAGE, data: list });
  };

  const handleDelete = (index, data) => {
    let temp = documentList;
    let tempDel = tempDeletedDoc;
    tempDel.push(data);
    temp.splice(index, 1);

    setTempDeletedDoc(tempDel);
    setDocumentList(temp);
    clearConfirmation();
  };

  const clearConfirmation = () => setConfirmation(defaultConfirm);

  const renderConfirmation = () => (
    <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
  );

  const documentActions = (v, i) => {
    return [
      {
        label: 'edit',
        type: 'EDIT',
        onClick: () => {
          setInitialDocument({
            index: i,
            data: v,
          });
          setIsUploadDocument(true);
        },
      },
      {
        label: 'delete',
        type: 'DELETE',
        onClick: () => {
          setConfirmation({
            content: 'Are you sure want to delete this file?',
            actions: [
              { label: 'NO', action: clearConfirmation },
              { label: 'YES', action: () => handleDelete(i, v) },
            ],
          });
        },
      },
    ];
  };

  return (
    <>
      <Grid
        className={classes.wrapper}
        container
        spacing={4}
        style={{ padding: '0 40px 32px 40px' }}
      >
        <Grid
          item
          sm={6}
          xs={12}
          style={{ padding: '24px', background: '#fff', borderRadius: '8px' }}
        >
          <div className={classes.subtitle}>
            <Text color="grey" variant="h4">
              Product Information
            </Text>
          </div>
          <Grid item>
            <Grid className={classes.input} item>
              <Field
                component={TextField}
                label={required('Product Name')}
                name="productName"
                onChange={handleProductName}
                placeholder="Product Name"
              />
              {counter(counterProductName, 50)}
            </Grid>
            <Grid className={classes.input} item>
              <Field
                component={TextField}
                label={required('Product Slug')}
                multiline={true}
                name="productSlug"
                onChange={handleSlug}
                placeholder="Product Slug"
              />
              {counter(counterProductSlug, 50)}
            </Grid>
            <Grid className={classes.input} item>
              <Field
                component={TextField}
                label={required('Meta Title')}
                multiline={true}
                name="metaTitle"
                onChange={handleMetaTitle}
                placeholder="Meta Title"
              />
              {counter(counterMetaTitle, 70)}
            </Grid>
            <Grid className={classes.input} item>
              <TextField
                label={required('Meta Keyword')}
                onChange={handleChangeKeyword}
                onKeyDown={handleKeyDown}
                placeholder="Meta Keyword"
                value={keyword}
              />
              <div className={classes.input}>
                <Text variant="caption">Press enter to add keyword.</Text>
              </div>
              {chipData.map((data, index) => {
                return (
                  <span key={data + index}>
                    <Chip
                      className={classes.chip}
                      label={data}
                      onDelete={handleDeleteKeyword(data)}
                      variant="outlined"
                    />
                  </span>
                );
              })}
            </Grid>
            <Grid className={classes.input} item>
              <Field
                component={TextField}
                label={required('Meta Description')}
                multiline={true}
                name="metaDesc"
                onChange={handleMetaDesc}
                placeholder="Meta Description"
                rows={4}
                value={product?.meta?.description}
              />
              {counter(counterMetaDesc, 255)}
            </Grid>
          </Grid>
          <Text variant="subtitle2">{required('Product Category')}</Text>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <div className={classes.item}>
              <Dropdown
                name="cat1"
                onChange={handleLevel0}
                options={cat}
                placeholder={
                  isEdit
                    ? selectCat.label || product?.category[0].catName
                    : selectCat.label ||
                      product?.category[0].catName ||
                      'Level 0'
                }
                value=""
              />
            </div>
            {isEdit ? (
              <div className={classes.item}>
                <Dropdown
                  isDisabled={loadingCategory.cat1}
                  name="cat1"
                  onChange={handleLevel1}
                  options={cat1}
                  placeholder={
                    selectCat1.label ||
                    product?.category[1].catName ||
                    'Level 1'
                  }
                  value=""
                />
              </div>
            ) : (
              <div className={classes.item}>
                <Dropdown
                  isDisabled={loadingCategory.cat1}
                  name="cat2"
                  onChange={handleLevel1}
                  options={cat1}
                  placeholder={placeholderCat('1')}
                  value="test"
                />
              </div>
            )}
            {isEdit ? (
              <div className={classes.item}>
                <Dropdown
                  isDisabled={loadingCategory.cat2}
                  name="cat3"
                  onChange={handleLevel2}
                  options={cat2}
                  placeholder={
                    selectCat2.label ||
                    product?.category[2].catName ||
                    'Level 2'
                  }
                  value=""
                />
              </div>
            ) : (
              <div className={classes.item}>
                <Dropdown
                  isDisabled={loadingCategory.cat2}
                  name="cat3"
                  onChange={handleLevel2}
                  options={cat2}
                  placeholder={placeholderCat('2')}
                  value=""
                />
              </div>
            )}
          </div>
        </Grid>
        <Grid
          item
          sm={6}
          xs={12}
          style={{ padding: '24px', background: '#fff', borderRadius: '8px' }}
        >
          <div className={classes.subtitle}>
            <Text color="grey" style={{ display: 'block' }} variant="h4">
              Language Translation
            </Text>
            <span className={classes.questionDesc}>
              Please choose language that you to translate. This translate was
              automatically translating from base language.
            </span>
          </div>
          <div className={classes.subtitle}>
            <LangSwitcher
              list={listLanguage}
              onDragEnd={handleDragEnd}
              setNewList={handleSetNewList}
            />
          </div>
          <Grid className={classes.wrapperAction} item sm={12} xs={12}>
            <Grid item style={{ marginRight: '20px' }}>
              <Button onClick={() => onClickEditTranslation(true)}>
                EDIT TRANSLATION
              </Button>
            </Grid>
            {localizations?.length > 0 && (isSavedTranslation || isEdit) && (
              <>
                <Grid
                  item
                  style={{
                    marginRight: '20px',
                    paddingTop: 16,
                    paddingBottom: 16,
                  }}
                >
                  <Divider orientation="vertical" style={{ height: '27px' }} />
                </Grid>
                <Grid item>
                  <p className={classes.correct}>
                    <Check style={{ color: '#FFFFFF', width: '15px' }} />
                    Content succefully translated
                  </p>
                </Grid>
              </>
            )}
          </Grid>

          <div className={classes.subtitle} style={{ paddingTop: '30px' }}>
            <Text color="grey" style={{ display: 'block' }} variant="h4">
              Document List
            </Text>
            <span className={classes.questionDesc}>
              Please upload document guidance or stuff for information about the
              product.
            </span>
          </div>

          {documentList.length !== 0 &&
            documentList.map((v, i) => (
              <Grid
                item
                key={documentList.id}
                style={{ paddingBottom: 10 }}
                xs={12}
              >
                <FileAttachment
                  actionButton={documentActions(v, i)}
                  date={v.updatedAt}
                  description={v.description}
                  fileName={v.name}
                  size={v.size}
                  type={v.path.split('.').pop()}
                  url={v.path}
                />
              </Grid>
            ))}

          <Grid className={classes.wrapperAction} item sm={12} xs={12}>
            <Grid item style={{ marginRight: '20px' }}>
              <Button onClick={() => setIsUploadDocument(true)}>
                UPLOAD DOCUMENT
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {renderConfirmation()}
    </>
  );
};

Component.defaultProps = {
  action: {},
  category: [],
  category1: [],
  category2: [],
  classes: {},
  product: {},
  productsetIsEditTranslation: false,
};

Component.propTypes = {
  action: PropTypes.object,
  category: PropTypes.array,
  category1: PropTypes.array,
  category2: PropTypes.array,
  classes: PropTypes.object,
  documentList: PropTypes.array.isRequired,
  isEditTranslation: PropTypes.bool.isRequired,
  isSavedTranslation: PropTypes.bool.isRequired,
  product: PropTypes.object,
  productsetIsEditTranslation: PropTypes.bool,
  setDocumentList: PropTypes.func.isRequired,
  setInitialDocument: PropTypes.func.isRequired,
  setIsEditTranslation: PropTypes.func.isRequired,
  setIsUploadDocument: PropTypes.func.isRequired,
  setParamsTranslate: PropTypes.func.isRequired,
  setTabData: PropTypes.func.isRequired,
  setTempDeletedDoc: PropTypes.func.isRequired,
  tempDeletedDoc: PropTypes.array.isRequired,
};

export default Component;
