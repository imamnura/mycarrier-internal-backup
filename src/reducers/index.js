import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loading from './loading';
import search from './search';
import popupAlert from './popupAlert';
import serviceAssuranceDetailNeucloud from '../containers/ServiceAssurance/Neucloud/Detail/reducer';
import senderIDReport from '../containers/Report/Bulk/reducer';
import lbaReport from '../containers/Report/NonBulk/reducer';
import lbaApproval from '../containers/Microsite/ApprovalLBA/reducer';
import bakesCreate from '../containers/Document/Bakes/Create/reducer';
import amMapping from '../containers/ContentManagement/AmMapping/List/reducer';
import interestedList from '../containers/ContentManagement/InterestedList/List/reducer';
import productManagement from '../containers/ContentManagement/Product/List/reducer';
import getData from './getData';
import otp from './otp';
import smscReport from '../containers/Report/SMSC/reducer';
import interestedListReport from '../containers/ContentManagement/InterestedList/Report/reducer';
import privilege from '../containers/Admin/Privilege/List/reducer';
import productConfig from '@containers/Document/PurchaseOrder/AddOrder/Neucentrix/reducers/slices';
import { neucentrixApi } from '@containers/Document/PurchaseOrder/AddOrder/Neucentrix/reducers/api';

const rootReducer = combineReducers({
  [neucentrixApi.reducerPath]: neucentrixApi.reducer,
  productConfig,
  amMapping,
  bakesCreate,
  form: formReducer,
  getData,
  interestedList,
  interestedListReport,
  lbaApproval,
  lbaReport,
  loading,
  otp,
  popupAlert,
  privilege,
  productManagement,
  search,
  senderIDReport,
  serviceAssuranceDetailNeucloud,
  smscReport,
});

export default rootReducer;
