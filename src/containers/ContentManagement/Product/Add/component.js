import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
// import Breadcrumb from '@__old/components/elements/Breadcrumb';
// import { ROUTES } from '@__old/configs';
import CallbackAlert from '@__old/components/elements/CallbackAlert';
import { isHaveAccess } from '@utils/common';

//component
// import Button from '@__old/components/elements/Button';
// import Link from '@__old/components/elements/Link';
// import Divider from '@__old/components/elements/Divider';
import Text from '@__old/components/elements/Text';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';

import AddSection from './components/addSection/addSection';
import _Section from './section';
import DocumentUpload from './form/DocumentUpload';

import { sectionCreator, create_UUID, sectionValidator } from './utils';
import { breadcrumb } from './constant';
import ProductManagement from '@containers/ContentManagement/Product/Add/form';
// import TopPageSection from '@__old/components/fragments/TopPageSection';

import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '@constants';
import { setAlert } from '@utils/popupAlert';
import { useRouter } from 'next/router';
import { deleteDocument } from '../_repositories/repositories';

import HeaderAndFilter from '@fragments/HeaderAndFilter';
import { Box } from '@material-ui/core';
import { route } from '@configs';
// import Tabs from '@components/Tabs';
import Tabs from '@__old/components/elements/Tabs';

export default function Component(props) {
  const {
    ProductManagementForm,
    action,
    product,
    classes,
    page,
    isLoading,
    activeTab,
    feature,
  } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const [tabData, setTabData] = useState([]);
  const [paramsTranslate, setParamsTranslate] = useState({
    from: '',
    to: '',
  });
  const [pageSection, setPageSection] = useState(page);
  const [isValid, setIsValid] = useState(false);
  const [_section, setSection] = useState(sectionCreator());
  const [uiid, setUiid] = useState(create_UUID());
  const [loading, setLoading] = useState(true);
  const [isEditTranslation, setIsEditTranslation] = useState(false);
  const [confirmation, setConfirmation] = useState({
    actions: [],
    content: '',
  });

  const [isDisableTranslateAll, setIsDisableTranslateAll] = useState(true);
  const [isDisableSaveTranslation, setIsDisableSaveTranslation] =
    useState(true);
  const [isSavedTranslation, setIsSavedTranslation] = useState(false);

  const [isUploadDocument, setIsUploadDocument] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [initialDocument, setInitialDocument] = useState({});
  const [tempDeletedDoc, setTempDeletedDoc] = useState([]);

  const clearConfirmation = () => setConfirmation({ actions: [], content: '' });

  let validCat0 = Boolean(product.category[0].catName);
  let validCat1 = Boolean(product.category[1].catName);
  let validCat2 = Boolean(product.category[1].catName);
  let validSection = Boolean(sectionValidator(page).length);

  const { baseLanguage, translateLanguage, localizations } = useSelector(
    (s) => s.productManagement,
  );
  const hasProductTranslate =
    translateLanguage !== undefined && Object.keys(translateLanguage).length > 0
      ? false
      : true;

  useEffect(() => {
    setPageSection(page);

    if (activeTab === 0) {
      //before translate
      !validSection
        ? setIsDisableTranslateAll(false)
        : setIsDisableTranslateAll(true);

      //after translate
      if (localizations?.length > 0 && translateLanguage.length > 0) {
        if (
          JSON.stringify(localizations[0]?.metaData) === JSON.stringify(page)
        ) {
          setIsDisableTranslateAll(true);
          setIsDisableSaveTranslation(false);
        } else if (localizations[0]?.metaData.length !== page.length) {
          //validasi different section
          setIsDisableTranslateAll(false);
          setIsDisableSaveTranslation(true);
        } else {
          setIsDisableSaveTranslation(false);
        }
      }
    } else {
      setIsDisableTranslateAll(true);
      setIsDisableSaveTranslation(false);
    }

    //validasi button when add or delete section
    if (baseLanguage?.length > 0 && translateLanguage?.length > 0) {
      //when section base difference with section translate
      if (baseLanguage?.length !== translateLanguage?.length) {
        setIsDisableTranslateAll(false);
        setIsDisableSaveTranslation(true);
      }
    }
  }, [page, product]);

  let buttonDisable =
    !isValid ||
    !validCat0 ||
    !validCat1 ||
    !validCat2 ||
    validSection ||
    !product?.meta?.keyword?.length ||
    isLoading;

  let {
    query: { id },
  } = useRouter();
  const isEdit = id ? true : false;

  useEffect(() => {
    if (ProductManagementForm.syncErrors) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [ProductManagementForm]);

  useEffect(() => {
    if (isEdit) {
      action.getProduct({ id, callback: loadingCallback });
    } else {
      loadingCallback();
    }
    return () => action.reset();
  }, []);

  useEffect(() => {
    if (isEdit) {
      setDocumentList(product.documents);
    }
  }, [product]);

  const loadingCallback = () => {
    setLoading(false);
  };

  const [alert, setAlert2] = useState({
    content: '',
    success: true,
  });

  const alertClose = () => {
    setAlert2({
      content: '',
      success: true,
    });
  };

  const redirect = (url) => router.replace(url);

  const renderCallbackAlert = () => {
    if (alert.redirect) {
      return (
        <CallbackAlert onClose={() => redirect(alert.redirect)} {...alert} />
      );
    }
    return <CallbackAlert onClose={alertClose} {...alert} />;
  };

  const addPage = () => {
    if (tempDeletedDoc.length !== 0) {
      tempDeletedDoc.forEach((v) => {
        deleteDocument(v.id);
      });
    }
    if (isEdit) {
      if (isHaveAccess(feature, 'update_product')) {
        const prod = { ...product };
        delete prod.productId;
        delete prod.createdAt;
        delete prod.epicProduct;
        delete prod.epicParameter;
        delete prod.updatedAt;
        action.addProduct({
          method: 'PUT',
          id: `/${id}`,
          body: {
            ...prod,
            localizations,
            documents: documentList,
          },
          callback: setAlert2,
          redirect: '/product-management',
        });
      } else {
        setAlert2({
          content: `You don't have permission to update product`,
          success: false,
        });
      }
    } else {
      const payload = {
        ...product,
        localizations,
        documents: documentList,
      };
      action.addProduct({
        method: 'POST',
        id: ``,
        body: payload,
        callback: setAlert2,
        redirect: '/product-management',
      });
    }
  };

  useEffect(() => {
    handleSection(_section);
  }, []);

  const handleSection = (e) => {
    setUiid(create_UUID());
    setSection(sectionCreator(e.value, uiid));
  };

  const handleCloseNotTranslate = () => {
    dispatch({ type: ACTIONS.PRODUCT_ACTIVE_TAB, data: 0 });
  };

  const handleChangeTab = (index) => {
    dispatch({ type: ACTIONS.PRODUCT_ACTIVE_TAB, data: index });

    if (
      translateLanguage.length > 0 &&
      baseLanguage.length > 0 &&
      localizations.length > 0
    ) {
      if (index === 1) {
        dispatch({
          type: ACTIONS.PRODUCT_MANAGEMENT_SECTION,
          data: translateLanguage,
        });
      } else {
        dispatch({
          type: ACTIONS.PRODUCT_MANAGEMENT_SECTION,
          data: baseLanguage,
        });
      }
    } else {
      dispatch(
        setAlert({
          content: "You haven't translated anything",
          success: false,
          eventClose: handleCloseNotTranslate,
        }),
      );
    }
  };

  const renderContent = () => {
    return isEditTranslation ? (
      <div
        style={{
          padding: '0 40px 32px 40px',
        }}
      >
        <div
          className={classes.subtitle}
          style={{
            padding: '24px',
            background: '#fff',
            borderRadius: '8px',
            marginTop: '24px',
          }}
        >
          <Text color="grey" variant="h4">
            Product Details
          </Text>
        </div>
        <div>
          {pageSection.map((block) => (
            <div
              key={block._uid}
              style={{
                padding: '24px',
                background: '#fff',
                borderRadius: '8px',
              }}
            >
              {_Section(block)}
            </div>
          ))}
          <AddSection />
        </div>
      </div>
    ) : (
      <ProductManagement
        documentList={documentList}
        isEditTranslation={isEditTranslation}
        isSavedTranslation={isSavedTranslation}
        setDocumentList={setDocumentList}
        setInitialDocument={setInitialDocument}
        setIsEditTranslation={(v) => setIsEditTranslation(v)}
        setIsUploadDocument={setIsUploadDocument}
        setParamsTranslate={(from, to) => setParamsTranslate({ from, to })}
        setTabData={(v) => setTabData(v)}
        setTempDeletedDoc={setTempDeletedDoc}
        tempDeletedDoc={tempDeletedDoc}
      />
    );
  };

  const renderConfirmation = () => (
    <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
  );

  const handleTranslateAll = () => {
    clearConfirmation();
    dispatch(setAlert({ loading: true }));
    action.translateAll({
      baseLanguage: page,
      fromLanguage: paramsTranslate.from,
      toLanguage: paramsTranslate.to,
      callback: (v) =>
        dispatch(
          setAlert({
            content: v.message,
            success: v.success,
          }),
        ),
    });
    setIsDisableTranslateAll(true);
    setIsDisableSaveTranslation(false);
  };

  const handleSaveTranslate = () => {
    clearConfirmation();
    dispatch(setAlert({ loading: true }));
    let baseLangContent = {};
    let transLangContent = {};

    if (activeTab === 0) {
      baseLangContent = { ...localizations[0], metaData: page };
      transLangContent = { ...localizations[1] };
    } else {
      baseLangContent = { ...localizations[0] };
      transLangContent = { ...localizations[1], metaData: page };
    }
    const localizationsMerge = [
      { ...baseLangContent },
      { ...transLangContent },
    ];

    dispatch({ type: ACTIONS.PRODUCT_LOCALIZATIONS, data: localizationsMerge });

    dispatch(
      setAlert({
        content: 'Translation successfully saved',
        success: true,
        eventClose: () => {
          setIsEditTranslation(false);
          setIsSavedTranslation(true);
        },
      }),
    );
  };

  const onClickTranslateAll = () => {
    setConfirmation({
      content: 'Are you sure want to translate this translation?',
      actions: [
        { label: 'No', action: clearConfirmation },
        {
          label: 'Yes',
          action: () => handleTranslateAll(),
        },
      ],
    });
  };

  const onClickCancel = () => {
    setIsEditTranslation(false);
  };

  const onClickSaveTranslation = () => {
    setConfirmation({
      content: 'Are you sure want to save this translation?',
      actions: [
        { label: 'No', action: clearConfirmation },
        {
          label: 'Yes',
          action: () => handleSaveTranslate(),
        },
      ],
    });
  };

  const actionButton = () => {
    let button = [];

    button.push({
      onClick: onClickTranslateAll,
      children: 'TRANSLATE ALL',
      disabled: validSection || isDisableTranslateAll,
    });
    button.push({
      onClick: onClickCancel,
      children: 'CANCEL',
      noDivider: true,
      variant: 'ghost',
    });
    button.push({
      onClick: onClickSaveTranslation,
      children: 'SAVE TRANSLATION',
      disabled: validSection || hasProductTranslate || isDisableSaveTranslation,
    });

    return button;
  };

  // const sectionTopProps = {
  //   actionButton: actionButton(),
  //   breadcrumb: [
  //     { label: 'Product Management', url: '/product-management' },
  //     { label: 'Edit Translation' },
  //   ],
  //   filter: [],
  //   isCenterTab: true,
  //   isCustomSize: { left: 6, right: 6 },
  //   withSearchAndFilter: false,
  //   tab: {
  //     value: activeTab,
  //     options: tabData,
  //     onChange: handleChangeTab,
  //   },
  //   withSearch: false,
  // };

  const renderTopSectionEditTranslation = () => {
    // return <TopPageSection {...sectionTopProps} />;

    const headerTranslateProps = {
      action: actionButton(),
      breadcrumb: [
        { label: 'Product Management', url: '/product-management' },
        { label: 'Edit Translation' },
      ],
    };

    return (
      <Box
        style={{
          top: '72px',
          zIndex: 4,
          position: 'sticky',
          background: '#FFF',
        }}
      >
        <HeaderAndFilter {...headerTranslateProps} />
        <Tabs
          isPositionCenter={true}
          onChange={handleChangeTab}
          tabData={tabData}
          value={activeTab}
        />
      </Box>
    );
  };

  const onCancel = () => router.push(route.productManage('list'));

  const actionHeader = () => {
    let button = [];

    button.push({
      children: 'CANCEL',
      disabled: isLoading,
      onClick: onCancel,
      variant: 'ghost',
    });

    button.push({
      children: isEdit ? 'UPDATE' : 'SAVE',
      onClick: addPage,
      disabled: isEdit ? buttonDisable : buttonDisable || !isSavedTranslation,
    });

    return button;
  };

  const sectionHeader = {
    action: actionHeader(),
    breadcrumb: breadcrumb(isEdit),
  };

  const renderTopSection = () => {
    return (
      <Box
        style={{
          top: '72px',
          zIndex: 4,
          position: 'sticky',
          background: '#FFF',
        }}
      >
        <HeaderAndFilter {...sectionHeader} />
      </Box>
    );
  };

  return (
    <>
      {isUploadDocument ? (
        <DocumentUpload
          documentList={documentList}
          initialDocument={initialDocument}
          isOpen={setIsUploadDocument}
          productName={product.productName}
          setDocument={setDocumentList}
          setInitialDocument={setInitialDocument}
        />
      ) : (
        <>
          {isEditTranslation
            ? renderTopSectionEditTranslation()
            : renderTopSection()}

          {loading ? (
            <div
              style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}
            >
              <CircularProgress style={{ color: '#DE1B1B' }} />
            </div>
          ) : (
            renderContent()
          )}
        </>
      )}

      {renderCallbackAlert()}
      {renderConfirmation()}
    </>
  );
}

Component.defaultProps = {
  action: {},
  activeTab: 0,
  classes: {},
  deleteToggler: false,
  isLoading: false,
  page: [],
  product: {},
  ProductManagementForm: {},
};

Component.propTypes = {
  action: PropTypes.object,
  activeTab: PropTypes.number,
  classes: PropTypes.object,
  deleteToggler: PropTypes.bool,
  feature: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  page: PropTypes.array,
  product: PropTypes.object,
  ProductManagementForm: PropTypes.object,
};
