import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './action';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Component from './component';

function mapStateToProps(state) {
  const { ProductManagementForm } = state.form;
  const { isLoading } = state.loading;
  const { activeTab, page, product, pageValid } = state.productManagement;
  return {
    activeTab,
    isLoading,
    page,
    pageValid,
    product,
    ProductManagementForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
