import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';
import moment from 'moment';

const Styled = withStyles(styles)(Component);

let FormComponent = reduxForm({
  form: 'newBakesStep3',
  enableReinitialize: true,
  validate,
})(Styled);

FormComponent = connect((state) => {
  const { bakesData } = state.bakesCreate;

  const { toc, additionalToc, startDate, endDate } = bakesData || {};

  const period = startDate ? [moment(startDate), moment(endDate)] : [];

  const defaultValue = bakesData
    ? {
        toc,
        additionalToc,
        period,
      }
    : {};

  return {
    data: {
      telkomAlias: bakesData?.telkomPic?.alias || '',
      customerAlias: bakesData?.company?.alias || '',
    },
    initialValues: defaultValue,
  };
})(FormComponent);

export default FormComponent;
