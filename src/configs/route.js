export const design_system = (part) => `/sys/${part}`;

// Authentication
export const login = () => '/login';
export const forgotPassword = () => '/reset-password';

// Settings
export const notificationSetting = () => '/notification-setting';

// User Profile
export const profile = () => '/dashboard/profile';

// Achievement
export const achievement = () => '/achievement';

// Document - Bakes
export const bakes = (part, id) => {
  if (part === 'list') {
    return '/dashboard/bakes';
  } else if (part === 'detail') {
    return `/dashboard/bakes/detail/${id}`;
  } else if (part === 'create') {
    return `/dashboard/bakes/create${id ? `?id=${id}` : ''}`;
  }
};

// Document - Offering Letter
export const offeringLetter = (part, id) => {
  if (part === 'list') {
    return '/dashboard/offering-letter';
  } else if (part === 'detail') {
    return `/dashboard/offering-letter/detail/${id}`;
  } else if (part === 'create') {
    return `/dashboard/offering-letter/create?id=${id}`;
  }
};

// Document - Purchase Order
export const purchaseOrder = (part, id, product) => {
  if (part === 'list') {
    return '/dashboard/purchase-order';
  } else if (part === 'detail') {
    return `/purchase-order/detail/${id}`;
  } else if (part === 'orderItem') {
    return `/purchase-order/order-item/${product}/${id}`;
  } else if (part === 'create') {
    return '/purchase-order/create';
  }
};

// Document - Modificattion Order
export const modificationOrder = (part, id) => {
  if (part === 'list') {
    return '/modification-order';
  } else if (part === 'detail') {
    return `/modification-order/detail/${id}`;
  }
};

// Document - BASO
export const baso = (part, id) => {
  if (part === 'list') {
    return '/baso';
  } else if (part === 'detail') {
    return `/baso/detail/${id}`;
  }
};

// Bills & Payment - Notification Management
export const billsAndPayment = (part, id, params, subId) => {
  if (part === 'main') {
    return '/dashboard/bills-and-payment-management';
  } else if (part === 'dashboard') {
    return '/dashboard/bills-and-payment-management';
  } else if (part === 'company-list' || part === 'list') {
    return '/dashboard/bills-and-payment-management/company-list';
  } else if (part === 'send-thanks-letter') {
    return `/dashboard/bills-and-payment-management/${id}/thanks-letter/bulk-send`;
  } else if (part === 'detail') {
    return `/bills-and-payment-management/detail/${id}`;
  } else if (part === 'invoice') {
    return `/dashboard/bills-and-payment-management/${id}/invoice/detail/${params}`;
    // return `/bills-and-payment-management/invoice/${id}/${params}`;
  } else if (part === 'claim') {
    return `/dashboard/bills-and-payment-management/${id}/claim/detail/${params}`;
  } else if (part === 'send-billing-reminder') {
    // return `/bills-and-payment-management/billing-reminder/create/${id}/${params}${subId?'/' + subId : ''}`;
    return `/bills-and-payment-management/billing-reminder/create/${id}/${params}${
      subId ? '?id=' + subId : ''
    }`;
  } else if (part === 'upload-completed-document') {
    return `/dashboard/bills-and-payment-management/${id}/reconciliation/upload-completed-document`;
  } else if (part === 'create-from-template') {
    return `/dashboard/bills-and-payment-management/${id}/reconciliation/create-from-template`;
  } else if (part === 'reconciliation') {
    return `/dashboard/bills-and-payment-management/${id}/reconciliation/${params}`;
  } else if (part === 'dunning-detail') {
    return `/dashboard/bills-and-payment-management/${id}/dunning/detail/${params}`;
  } else if (part === 'billing-reminder-template') {
    return `/dashboard/bills-and-payment-management/${id}/billing-reminder/template-selection`;
  }
};

// Report Neucentrix
export const reportNcx = (part, id) => {
  if (part === 'list') {
    return '/report-neucentrix';
  } else if (part === 'detail') {
    return `/report-neucentrix/detail/${id}`;
  } else if (part === 'create') {
    return '/report-neucentrix/upload-report';
  }
};

// Visit Neucentrix
export const visitNcx = (part, id) => {
  if (part === 'list') {
    return '/visit-neucentrix';
  } else if (part === 'detail') {
    return `/visit-neucentrix/detail/${id}`;
  } else if (part === 'history') {
    return `/visit-neucentrix/detail/${id}/visit-history`;
  }
};

// Availability Rack Neucentrix
export const availabilityRackNCX = (part) => {
  if (part === 'list') {
    return '/availability-rack-neucentrix';
  }
};

// Service Assurance
export const neucloud = (part, id) => {
  if (part === 'list') {
    return '/service-assurance-neucloud';
  } else if (part === 'detail') {
    return `/service-assurance-neucloud/detail/${id}`;
  }
};
export const smsa2p = (part, id) => {
  if (part === 'list') {
    return '/dashboard/service-assurance/smsa2p';
  } else if (part === 'detail') {
    return `/service-assurance-sms-a2p/detail/${id}`;
  }
};

export const generalProduct = (part, id) => {
  if (part === 'list') {
    return '/dashboard/service-assurance/general-product';
  } else if (part === 'detail') {
    return `/service-assurance-general-product/detail/${id}`;
  } else if (part === 'create') {
    return `/service-assurance-general-product/create-ticket`;
  } else if (part === 'validation') {
    return `/service-assurance-general-product/validation/${id}`;
  }
};

export const gameqoo = (part, id) => {
  if (part === 'list') {
    return '/service-assurance-gameqoo';
  } else if (part === 'detail') {
    return `/service-assurance-gameqoo/detail/${id}`;
  } else if (part === 'validation') {
    return `/service-assurance-gameqoo/validation/${id}`;
  }
};

export const digitalProduct = (part, id) => {
  if (part === 'list') {
    return '/dashboard/service-assurance/digital-product';
  } else if (part === 'detail') {
    return `/service-assurance/digital-product/detail/${id}`;
  } else if (part === 'gameqoo-validation') {
    return `/service-assurance/digital-product/gameqoo/validation/${id}`;
  }
};

// Report
export const reportUserManagement = (part, id) => {
  if (part === 'detail') {
    return `/report-user-management/detail/${id}`;
  } else if (part === 'report') {
    return '/report-user-management';
  }
};

export const reportPerformance = () => '/report-performance';

export const reportNpsScore = () => '/report-nps-score';

export const reportSenderId = () => '/report-sender-id';

export const reportLba = () => '/report-lba';

export const reportSmsc = () => '/report-smsc';

// Lead Management System - Dashboard
export const dashboardLead = (part, id) => {
  if (part === 'list') {
    return '/dashboard-lead';
  } else if (part === 'detail') {
    return `/dashboard-lead/detail/${id}`;
  }
};

// Lead Management System - Report
export const reportLead = () => '/report-lead';

// Content Management - Product Management
export const productManage = (part, id, params) => {
  if (part === 'list') {
    return '/dashboard/product-management';
  } else if (part === 'create') {
    return '/dashboard/product-management/add';
  } else if (part === 'detail') {
    return `/dashboard/product-management/detail/${id}`;
  } else if (part === 'level1') {
    return `/dashboard/product-management/detail/${id}/level1/${params}`;
  } else if (part === 'productDetail') {
    return `/dashboard/product-management/detail/${id}/product-detail/${params}`;
  } else if (part === 'edit') {
    return `/dashboard/product-management/edit/${id}`;
  }
};

// Content Management - Product Management
export const poConfig = (part, id) => {
  if (part === 'list') {
    return '/po-config';
  } else if (part === 'add') {
    return '/po-config/product';
  } else if (part === 'edit') {
    return `/po-config/product/${id}`;
  }
};

// Content Management - Document Upload
export const documentUpload = (part, id) => {
  if (part === 'list') {
    return '/document-upload';
  } else if (part === 'create') {
    return '/document-upload/add';
  } else if (part === 'detail') {
    return `/document-upload/detail/${id}`;
  } else if (part === 'edit') {
    return `/document-upload/edit/${id}`;
  }
};

// Content Management - Interested List
export const interested = (part, id) => {
  if (part === 'list') {
    return '/interested-list';
  } else if (part === 'detail') {
    return `/interested-list/detail/${id}`;
  } else if (part === 'report') {
    return '/report-interested-list';
  }
};

// Content Management - AM Mapping
export const amMapping = (part, id) => {
  if (part === 'list') {
    return '/am-mapping';
  } else if (part === 'create') {
    return '/am-mapping/add';
  } else if (part === 'detail') {
    return `/am-mapping/detail/${id}`;
  }
};

// Content Management - Article
export const article = (part, id) => {
  if (part === 'list') {
    return '/article-management';
  } else if (part === 'create') {
    return '/article-management/add';
  } else if (part === 'edit') {
    return `/article-management/edit/${id}`;
  } else if (part === 'detail') {
    return `/article-management/detail/${id}`;
  }
};

// Content Management - Homepage Management
export const homepageManagement = (part) => {
  if (part === 'list') {
    return '/homepage-management';
  }
};

// Content Management - Banner
export const banner = (part, id) => {
  if (part === 'list') {
    return '/banner';
  } else if (part === 'create') {
    return '/banner/add';
  } else if (part === 'edit') {
    return `/banner/edit/${id}`;
  }
};

// Content Management - Events
export const events = (part, id) => {
  if (part === 'list') {
    return '/events-management';
  } else if (part === 'detail') {
    return `/events-management/detail/${id}`;
  } else if (part === 'create') {
    return '/events-management/add';
  } else if (part === 'edit') {
    return `/events-management/edit/${id}`;
  }
};

// Content Management - Brochure
export const brochure = (part, id) => {
  if (part === 'list') {
    return '/brochure';
  } else if (part === 'create') {
    return '/brochure/add';
  } else if (part === 'detail') {
    return `/brochure/detail/${id}`;
  } else if (part === 'edit') {
    return `/brochure/edit/${id}`;
  }
};

// Content Management - Brochure
export const userDownloadBrochure = (part, id) => {
  if (part === 'list') {
    return '/dashboard/user-download-brochure';
  } else if (part === 'detail') {
    return `/user-download-brochure/detail/${id}`;
  }
};

// Content Management - Pop Up
export const popUp = (part, id) => {
  if (part === 'create') {
    return '/pop-up/create';
  } else if (part === 'edit') {
    return `/pop-up/edit/${id}`;
  } else if (part === 'detail') {
    return `/pop-up/detail/${id}`;
  }
};

// Content Management - Bills & Payment Banner
export const billsAndPaymentBanner = (part, id) => {
  if (part === 'list') {
    return '/bills-and-payment-banner';
  } else if (part === 'create') {
    return '/bills-and-payment-banner/create';
  } else if (part === 'edit') {
    return `/bills-and-payment-banner/edit/${id}`;
  } else if (part === 'detail') {
    return `/bills-and-payment-banner/detail/${id}`;
  }
};

// Activate - Link
export const link = (part, id) => {
  if (part === 'list') {
    return '/link';
  } else if (part === 'detail') {
    return `/link/detail/${id}`;
  }
};

// Activate - Bulk
//Activate - Bulk
export const bulk = (part, id) => {
  if (part === 'list') {
    return '/bulk';
  } else if (part === 'detail') {
    return `/bulk/detail/${id}`;
  }
};

// Activate - LBA
export const lba = (part, id) => {
  if (part === 'list') {
    return '/lba';
  } else if (part === 'detail') {
    return `/lba/detail/${id}`;
  } else if (part === 'report') {
    return 'report-lba';
  }
};

// Activate - Non Bulk
export const nonBulk = (part, id, params) => {
  if (part === 'list') {
    return '/non-bulk';
  } else if (part === 'detail') {
    return `/non-bulk/detail/${id}`;
  } else if (part === 'edit') {
    return `/non-bulk/edit/${id}`;
  } else if (part === 'campaign') {
    return `/non-bulk/campaign/${id}/${params}`;
  } else if (part === 'report') {
    return '/report-non-bulk';
  }
};

// Activate - UMB
export const umb = (part, id) => {
  if (part === 'list') {
    return '/umb';
  } else if (part === 'detail') {
    return `/umb/detail/${id}`;
  }
};

// Activate - Keyword
export const keyword = (part, id) => {
  if (part === 'list') {
    return '/keyword';
  } else if (part === 'detail') {
    return `/keyword/detail/${id}`;
  }
};

// Admin - User Management
export const user = (part, id) => {
  if (part === 'list') {
    return '/user-management';
  } else if (part === 'create') {
    return '/user-management/create';
  } else if (part === 'detail') {
    return `/user-management/detail/${id}`;
  } else if (part === 'edit') {
    return `/user-management/edit/${id}`;
  }
};

// Admin - Role Management
export const role = (part, id) => {
  if (part === 'list') {
    return '/role-management';
  } else if (part === 'create') {
    return '/role-management/add';
  } else if (part === 'detail') {
    return `/role-management/detail/${id}`;
  } else if (part === 'edit') {
    return `/role-management/edit/${id}`;
  }
};

// Admin - Privilege Management
export const privilege = (part, id) => {
  if (part === 'list') {
    return '/privilege-management';
  } else if (part === 'create') {
    return '/privilege-management/add';
  } else if (part === 'edit') {
    return `/privilege-management/edit/${id}`;
  } else if (part === 'detail') {
    return `/privilege-management/detail/${id}`;
  }
};

// Bills & Payment - Data Unsettle
export const dataUnsettle = (part, data) => {
  if (part === 'list') {
    return '/dashboard/data-unsettle';
  } else if (part === 'detail') {
    return `/data-unsettle/detail/${data.segment}/${data.invoiceGroup}`;
  }
};

// Bills & Payment - Settlement
export const settlement = (part, id) => {
  if (part === 'list') {
    return '/settlement';
  } else if (part === 'detailSettlementList') {
    return `/settlement/detail/settlement-list/${id}`;
  } else if (part === 'detailUsers') {
    return `/settlement/detail/users/${id}`;
  }
};

// Bills & Payment - Settlement
export const isolate = (part, id) => {
  if (part === 'list') {
    return '/isolate';
  } else if (part === 'detail') {
    return `/isolate/detail/${id}`;
  }
};

// Graphic - MRTG
export const mrtg = (part, id, params) => {
  if (part === 'list') {
    return '/approval-mrtg';
  } else if (part === 'detail') {
    return `/approval-mrtg/detail/${id}`;
  } else if (part === 'login-data') {
    return `/approval-mrtg/detail-login-data/${id}/${params}`;
  } else if (part === 'request-mrtg') {
    return `/approval-mrtg/request-mrtg/${id}/${params}`;
  }
};

// Graphic - ProductList
export const productList = (part, id, params) => {
  if (part === 'list') {
    return '/product-list';
  } else if (part === 'detail') {
    return `/product-list/detail/${params}/${id}`;
  }
};

// Graphic - IP Prefix
export const ipPrefix = (part, custAccntName, requestId) => {
  if (part === 'list-customer') {
    return '/ip-prefix';
  } else if (part === 'request') {
    return `/ip-prefix/request/${custAccntName}`;
  } else if (part === 'detail-request') {
    return `/ip-prefix/request/${custAccntName}/${requestId}`;
  }
};

// Graphic - Service List
export const serviceList = (part, id, params) => {
  if (part === 'list') {
    return '/service-list';
  } else if (part === 'detailCustomer') {
    return `/service-list/detail-customer/${id}`;
  } else if (part === 'detailProject') {
    return `/service-list/detail-project/${id}/${params}`;
  } else if (part === 'detailService') {
    return `/service-list/detail-service/${id}/${params}`;
  }
};

// Graphic - Monitoring Operator
export const monitoringOperator = (part) => {
  if (part === 'list') {
    return '/monitoring-operator';
  }
};

// Graphic - Delivery Tracking
export const deliveryTracking = (part, custAccntName, orderId, serviceId) => {
  if (part === 'list') {
    return '/delivery-tracking';
  } else if (part === 'detail') {
    return `/delivery-tracking/detail/${custAccntName}`;
  } else if (part === 'detailOrder') {
    return `/delivery-tracking/detail/${custAccntName}/${orderId}`;
  } else if (part === 'detailService') {
    return `/delivery-tracking/detail/${custAccntName}/${orderId}/${serviceId}`;
  }
};

// Broadcast - Broadcast Information
export const broadcastInformation = (part, id) => {
  if (part === 'list') {
    return '/broadcast-information';
  } else if (part === 'detail') {
    return `/broadcast-information/detail/${id}`;
  } else if (part === 'create') {
    if (id) {
      return `/broadcast-information/create?broadcastId=${id}`;
    }
    return `/broadcast-information/create`;
  }
};

// Lead Managmenet System - Dashboard
export const leads = (part) => {
  return `/dashboard/leads/${part}`;
};

// Lead Managmenet System - Dashboard
export const dashboadLeadManagementSystem = (part, id, params) => {
  if (part === 'list') {
    return '/lead-management-system/dashboard';
  } else if (part === 'detail') {
    return `/lead-management-system/dashboard/detail/${id}`;
  } else if (part === 'create') {
    return '/lead-management-system/dashboard/add-new-lead';
  } else if (part === 'quoteHeader') {
    return `/lead-management-system/dashboard/detail/${id}/quote/${params}`;
  } else if (part === 'orderHeader') {
    return `/lead-management-system/dashboard/detail/${id}/order/${params}`;
  } else if (part === 'agreementHeader') {
    return `/lead-management-system/dashboard/detail/${id}/agreement/${params}`;
  }
};

// Lead Managmenet System - Dashboard
export const reportLeadManagementSystem = () => {
  return '/lead-management-system/report';
};

// Document Viewer
export const documentViewer = () => {
  return '/document-viewer';
};

export const promotionProgram = (part) => {
  if (part === 'list') {
    return '/dashboard/promotion';
  }
};
