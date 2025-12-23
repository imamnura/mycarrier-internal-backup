import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import * as actions from './action';
import styles from './styles';
import queryString from 'query-string';
import { isDirty } from 'redux-form';

export const checkLastChange = (data) => {
  const { approvalType, termOfPayment, toc, valueAgreement, telkomPic } = data;
  if (approvalType) return 4;
  else if (termOfPayment) return 3;
  else if (toc?.length > 0) return 2;
  else if (valueAgreement) return 1;
  else if (telkomPic?.name) return 0;
  else return -1;
};

function mapStateToProps(state) {
  const { isLoading } = state.loading;
  const { bakesData } = state.bakesCreate;
  const { status = 'draft' } = bakesData;

  return {
    isLoading,
    bakesId: queryString.parse(location.search).id,
    amToolsId: queryString.parse(location.search).amtools,
    isNotDraft: status !== 'draft',
    status: status,
    form: {
      value: state.form,
      isDirty: [
        isDirty('newBakesStep1')(state),
        isDirty('newBakesStep2')(state),
        isDirty('newBakesStep3')(state),
        isDirty('newBakesStep4')(state),
        isDirty('newBakesStep5')(state),
      ],
      lastChange: checkLastChange(bakesData),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
