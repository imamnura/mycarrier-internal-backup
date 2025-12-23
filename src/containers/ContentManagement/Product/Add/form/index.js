import { reduxForm } from 'redux-form';
import Component from './component';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import { connect } from 'react-redux';
import validate from './validate';
import { bindActionCreators } from 'redux';
import * as actions from '../action';
import { isWindowExist } from '@utils/common';

let ComponentTemp = reduxForm({
  form: 'ProductManagementForm',
  enableReinitialize: true,
  validate,
})(Component);

function mapStateToProps(state) {
  const { page, product, category, category1, category2 } =
    state.productManagement;
  const loc = isWindowExist() ? window?.location?.pathname : '';
  if (loc !== '/product-management/add') {
    return {
      page,
      product,
      category,
      category1,
      category2,
      initialValues: {
        productName: product?.productName || '',
        productSlug: product?.productSlug || '',
        metaTitle: product?.meta?.title || '',
        metaDesc: product?.meta?.description || '',
      },
    };
  } else {
    return {
      page,
      product,
      category,
      category1,
      category2,
    };
  }
}

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

ComponentTemp = connect(mapStateToProps, mapDispatchToProps)(ComponentTemp);

const Styled = withStyles(styles)(ComponentTemp);

export default Styled;
