import { formValueSelector, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

const selector = formValueSelector('newBakesStep2');

let FormComponent = reduxForm({
  form: 'newBakesStep2',
  enableReinitialize: true,
  validate,
})(Styled);

FormComponent = connect((state) => {
  const { bakesData } = state.bakesCreate;

  const {
    serviceSpecification,
    products,
    valueAgreement,
    hjm,
    hjmPercentage,
    price,
    notes,
    reqSbr,
    sbr,
    otherDoc,
  } = bakesData || {};

  const defaultValue = bakesData
    ? {
        serviceSpecification,
        products,
        valueAgreement,
        hjm,
        hjmPercentage: hjmPercentage ? hjmPercentage : '100',
        price,
        notes,
        reqSbr,
        sbr,
        otherDoc,
      }
    : {
        products: [],
      };

  const prod = selector(state, 'products') || [];
  const hjmForm = selector(state, 'hjm') || '';
  const priceForm = selector(state, 'price') || '';

  return {
    data: {
      companyAlias: bakesData?.company?.alias || '',
      telkomAlias: bakesData?.telkomPic?.alias || '',
      products: prod,
      bakesId: bakesData?.bakesId,
      reqSbr,
      sbr,
      otherDoc,
      hjmForm,
      hjmPercentage: bakesData?.hjmPercentage || '100',
      priceForm,
    },
    initialValues: defaultValue,
  };
})(FormComponent);

export default FormComponent;
