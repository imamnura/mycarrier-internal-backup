/* eslint-disable max-len */
/* eslint-disable no-undef */
let domain = '';
// let catalogDomain = '';
let modificationOrderDomain = '';

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

if (environment === 'production') {
  domain = 'https://api.mycarrier.co.id';
  // catalogDomain = 'https://api.mycarrier.co.id/catalog';
  modificationOrderDomain = 'https://api.mycarrier.co.id/activation';
} else if (environment === 'staging') {
  // catalogDomain = 'https://maas-api-staging.mycarrier.co.id/catalog';
  domain = 'https://maas-api-staging.mycarrier.co.id';
  modificationOrderDomain =
    'https://maas-api-staging.mycarrier.co.id/activation';
} else {
  // catalogDomain = `https://apigateway-dev.telkomdigitalsolution.co/catalog`;
  domain = 'https://maas-api-dev.mycarrier.co.id';
  modificationOrderDomain = 'https://maas-api-dev.mycarrier.co.id/activation';
}

// if method PUT, DELETE, POST, GET use 1 endpoint just make one service :)

// USE DETAIL FOR UPDATE BECAUSE SAME ENPOINT

const service = {
  // USER
  LOGIN: `${domain}/users-management/v2/auth/login`,
  REFRESH_TOKEN: `${domain}/users-management/v2/auth/refreshtoken`,
  SUBSRIBE_TOPIC: `${domain}/users/user/v2/subscribe-topic`,
  UNSUBSRIBE_TOPIC: `${domain}/users/user/v2/unsubscribe-topic`,
  VERIFY_CAPTCHA: `${domain}/users-management/v2/auth/verifycaptcha`,
  GENERATE_TOKEN: `${domain}/users-management/v2/auth/generatetoken`,
  FORGOT_PASSWORD: `${domain}/users-management/v2/auth/reset-password`,
  VERIFY_FORGOT_PASSWORD: `${domain}/users-management/v2/auth/verify-code`,

  // ASSURANCE
  LIST_TICKET: `${domain}/tickets/ticket/v2/internal`,
  DOWNLOAD: `${domain}/tickets/ticket/internal/downloadListTicketFault`,
  DETAIL_TICKET: (id) => `${domain}/tickets/ticket/v2/internal/${id}`,

  // ASSURANCE NEUCLOUD
  LIST_NEUCLOUD: `${domain}/tickets/neucloud/v1/internal`,
  DETAIL_TICKET_NEUCLOUD: (id) =>
    `${domain}/tickets/neucloud/v1/internal/detail/${id}`,
  UPDATE_TICKET_NEUCLOUD: (id) =>
    `${domain}/tickets/neucloud/v1/internal/${id}`,
  DOWNLOAD_NEUCLOUD_LIST: `${domain}/tickets/neucloud/v1/internal/download-ticket`,
  SEARCH_TICKET_NUMBER: `${domain}/tickets/neucloud/v1/internal/search-ticket-number`,

  // ASSURANCE GENERAL PRODUCT
  DETAIL_TICKET_GENERAL_PRODUCT: (id) =>
    `${domain}/tickets/fault/v1/ticket/detail/internaltest/${id}`,

  // SENDER ID
  LIST_SENDER: `${domain}/activation/internal/sender-id`,
  DETAIL_SENDER: (id) => `${domain}/activation/internal/sender-id/${id}`,
  CP_NAME: (id) => `${domain}/activation/internal/sender-id/cpname/${id}`,

  // LBA
  LIST_LBA: `${domain}/activation/internal/lba`,
  DETAIL_LBA: (id) => `${domain}/activation/internal/lba/${id}`,
  UPDATE_LBA: (id) =>
    `${domain}/activation/internal/non-bulk/v1/request-activation/status-update/${id}`,
  APPROVAL_LBA: (id) => `${domain}/activation/lba/approve_dd/${id}`,

  // LINK
  LIST_LINK: `${domain}/activation/internal/request-link`,
  DETAIL_LINK: (id) =>
    `${domain}/activation/internal/request-link/detail/${id}`,
  UPDATE_LINK: (id) => `${domain}/activation/internal/request-link/${id}`,

  // KEYWORD
  LIST_KEYWORD: `${domain}/activation/internal/keyword`,
  DETAIL_KEYWORD: (id) => `${domain}/activation/internal/keyword/${id}`,

  // UMB
  LIST_UMB: `${domain}/activation/internal/umb`,
  DETAIL_UMB: (id) => `${domain}/activation/internal/umb/${id}`,

  // NOTIFICATION
  LIST_NOTIFICATION: `${domain}/notifications/notification/v1/activate`,
  LIST_NOTIFICATION_AM: `${domain}/notifications/notification/v1/activation-letter`,
  CLICK_NOTIFICATION_ACTIVATE: `${domain}/notifications/notification/v1/activate/click`,
  UPDATE_NOTIFICATION: (id) =>
    `${domain}/notifications/notification/v1/${id}/read`,

  // SENDERID REPORT
  GRAPH_SENDER: `${domain}/activation/internal/sender-id/reporting`,
  DOWNLOAD_SENDER_REPORT: `${domain}/activation/internal/sender-id/report-download`,

  // LBA_REPORT
  GRAPH_LBA: `${domain}/activation/internal/lba/reporting`,
  DOWNLOAD_LBA_REPORT: `${domain}/activation/internal/lba/report-download`,

  // SMSC_REPORT
  GRAPH_SMSC: `${domain}/activation/internal/smsc/reporting`,
  DOWNLOAD_SMSC_REPORT: `${domain}/activation/internal/smsc/report-download`,

  // INTERESTED_LIST_REPORT
  GRAPH_STATUS_INTERESTED_LIST: `${domain}/explore/v3/cart/interest-graph`,
  GRAPH_PRODUCT_INTERESTED_LIST: `${domain}/explore/v3/cart/product-graph`,
  GRAPH_AM_INTERESTED_LIST: `${domain}/explore/v4/cart/am-graph`,
  GRAPH_SEGMENT_INTERESTED_LIST: `${domain}/explore/v3/cart/segment-graph`,
  // LIST_PRODUCT: `${domain}/explore/v3/cart/product`, //product v1
  LIST_PRODUCT: `${domain}/explore/v5/product?useAtDropdown=true&relatedType=banner`, //product v2
  LIST_AM_VALID: `${domain}/explore/v3/cart/am-valid`,
  LIST_SEGMENT_VALID: `${domain}/explore/v3/cart/segment-valid`,

  // AM MAPPING
  AM_MAPPING: `${domain}/users-management/v2?role=account_manager&nameApp=mycarrier`,
  AM_MAPPING_UPDATE: (id) => `${domain}/users-management/v2/update/${id}`,
  AM_MAPPING_USER: `${domain}/users-management/v2`,
  AM_MAPPING_CUSTOMER: `${domain}/users-management/v2/customer-account`,
  AM_MAPPING_LIST_CUSTOMER: (id) =>
    `${domain}/explore/v1/customer/product/${id}`,
  LIST_AM: `${domain}/explore/v3/cart/assign`,

  // PURCHASE ORDER
  PURCHASE_ORDER: `${domain}/activation/internal/purchase-order`,
  DETAIL_PURCHASE_ORDER: (id) =>
    `${domain}/activation/internal/purchase-order/${id}`,
  LIST_PO_CUSTOMER: `${domain}/activation/internal/purchase-order/customer-filtered`,
  LIST_PO_PRODUCT: `${domain}/activation/internal/purchase-order/product-filtered`,

  // MODIFICATION ORDER
  MODIFICATION_ORDER: `${modificationOrderDomain}/modification-order`,
  // MODIFICATION_ORDER: `${catalogDomain}/mycarrier/v2/internal/modification-order`,
  DETAIL_MODIFICATION_ORDER: (id) =>
    `${modificationOrderDomain}/modification-order/${id}`,
  LIST_MO_CUSTOMER: `${modificationOrderDomain}/modification-order/customer`,
  CHANGE_PRICE: (id) =>
    `${modificationOrderDomain}/modification-order/edit-price/${id}`,
  LIST_BAKES_EXIST: (id) =>
    `${modificationOrderDomain}/modification-order/bakes-exist/${id}`,
  LIST_BAKES_MODULE: `${modificationOrderDomain}/modification-order/all-bakes`,
  REJECT_REQUEST: (id) =>
    `${modificationOrderDomain}/modification-order/update/${id}`,
  UPDATE_BAKES: (id) =>
    `${modificationOrderDomain}/modification-order/update-bakes/${id}`,
  APPROVE_BAKES: (id) =>
    `${modificationOrderDomain}/modification-order/approve-bakes/${id}`,
  APPROVE_SERVICE_UPGRADING: (id) =>
    `${modificationOrderDomain}/modification-order/approve/${id}`,
  CANCEL_BAKES: (id) =>
    `${modificationOrderDomain}/modification-order/reject-bakes/${id}`,
  CHECK_BASO: (id) =>
    `${modificationOrderDomain}/modification-order/check-baso/${id}`,
  APPROVE_BASO: (id) =>
    `${modificationOrderDomain}/modification-order/approve-baso/${id}`,
  CANCEL_BASO: (id) =>
    `${modificationOrderDomain}/modification-order/reject-baso/${id}`,
  SERVER_STATUS: `${modificationOrderDomain}/modification-order/get-worker-update`,
  // DETAIL_MODIFICATION_ORDER: id =>
  //   `http://api-neulink.ujiaplikasi.com/modification-order/${id}`,

  // BASO
  BASO: `${domain}/activation/internal/baso`,
  DETAIL_BASO: (id) => `${domain}/activation/internal/baso/${id}`,
  LIST_BASO_PRODUCT: `${domain}/activation/baso/product-filtered`,
  LIST_BASO_CUSTOMER: `${domain}/activation/baso/customer-filtered`,
  LIST_BASO_AM: `${domain}/activation/internal/baso/am-filtered`,
  LIST_BASO_SEGMENT: `${domain}/activation/internal/baso/segment-filtered`,
  UPDATE_STATUS_BASO: (id) => `${domain}/activation/internal/baso/${id}`,
  UPLOAD_BASO: `${domain}/activation/baso/upload-ba`,

  // INTERESTED LIST
  INTERESTED_LIST: `${domain}/explore/v1/cart`,
  INTERESTED_LIST_DETAIL: (id) => `${domain}/explore/v1/cart/${id}`,
  INTERESTED_LIST_MAPPING_AM: (id) => `${domain}/explore/v3/cart/${id}`,
  DOWNLOAD_INTERESTED_LIST: `${domain}/explore/v2/cart/download`,
  LIST_SOURCE: `${domain}/explore/v3/cart/source`,

  // QUOTATION
  QUOTATION: `${domain}/mycarrier-quotation/v1`,
  QUOTATION_DETAIL: (id) => `${domain}/mycarrier-quotation/v1/${id}`,
  COMPANY_LIST: `${domain}/mycarrier-quotation/v1/companies`,
  QUOTATION_DRAFT: `${domain}/mycarrier-quotation/v1/draft`,
  QUOTATION_AGREEMENT: `${domain}/mycarrier-quotation/v1/agreements`,
  QUOTATION_PRODUCT: `${domain}/mycarrier-quotation/epics/v1/service-product`,
  QUOTATION_STEP2_FORM: (id) =>
    `${domain}/mycarrier-quotation/epics/v2/service-form/${id}`,
  QUOTATION_GET_PRICING: `${domain}/mycarrier-quotation/epics/v2/service-price`,
  QUOTATION_GENERATE_FILE: `${domain}/mycarrier-quotation/v1/generate-quotation`,
  QUOTATION_FIELD: (path) => `${domain}${path}`,
  QUOTATION_SEND_OTP: `${domain}/mycarrier-quotation/v1/send-otp`,
  QUOTATION_RESEND_OTP: `${domain}/mycarrier-quotation/v1/resend-otp`,
  QUOTATION_VERIFY_OTP: `${domain}/mycarrier-quotation/v1/verification`,
  QUOTATION_UPDATE_STATUS: (id) =>
    `${domain}/mycarrier-quotation/v1/status/${id}`,
  QUOTATION_SEND_APPROVAL: `${domain}/mycarrier-quotation/v1/send-email`,

  // QUOTATION MICROSITE
  QUOTATION_APPROVAL_DETAIL: (id) =>
    `${domain}/mycarrier-quotation/v1/without-login/${id}`,
  QUOTATION_APPROVAL_SEND_OTP: `${domain}/mycarrier-quotation/v1/without-login/send-otp`,
  QUOTATION_APPROVAL_RESEND_OTP: `${domain}/mycarrier-quotation/v1/without-login/resend-otp`,
  QUOTATION_APPROVAL_VERIFY_OTP: `${domain}/mycarrier-quotation/v1/without-login/verification`,
  QUOTATION_APPROVAL_UPDATE_STATUS: (id) =>
    `${domain}/mycarrier-quotation/v1/without-login/${id}`,

  // LIST ACTIVATE CUSTOMER
  LIST_CUSTOMER_ACTIVATE: (params) =>
    `${domain}/activation/internal/${params}/customer-filtered`,

  // LIST OPERATOR TYPE
  LIST_OPERATOR_TYPE: `${domain}/activation/operator-type/list`,

  // LIST CUSTOMER SMSC
  LIST_CUSTOMER_SMSC: `${domain}/activation/customer-smsc/list`,

  // MEDIA
  LIST_CUSTOMER_GP: `${domain}/explore/v2/customer`,

  // MEDIA
  MEDIA: `${domain}/explore/v1/media`,

  // PRODUCT
  PRODUCT_MANAGEMENT_LIST: `${domain}/explore/v2/product`,
  PRODUCT_MANAGEMENT_LIST_DETAIL: (id) => `${domain}/explore/v4/product/${id}`,
  PRODUCT_CATEGORY: `${domain}/explore/v2/category`,
  CREATE_PRODUCT: `${domain}/explore/v4/product`,
  DETAIL_PRODUCT: `${domain}/explore/v3/product`,
  TRANSLATE_IN_PRODUCT: `${domain}/explore/v1/translate`,

  // BAKES
  BAKES: `${domain}/mycarrier-quotation/bakes/v1`,
  BAKES_DETAIL: (id) => `${domain}/mycarrier-quotation/bakes/v1/${id}`,
  BAKES_TELKOM_PIC: `${domain}/mycarrier-quotation/bakes/v1/telkom-pic`,
  BAKES_DRAFT: `${domain}/mycarrier-quotation/bakes/v1/draft`,
  BAKES_GENERATE_FILE: `${domain}/mycarrier-quotation/bakes/v1/generate-bakes`,
  BAKES_UPDATE_STATUS: (id) =>
    `${domain}/mycarrier-quotation/bakes/v1/status/${id}`,
  BAKES_UPLOAD_SIGNED: `${domain}/mycarrier-quotation/bakes/v1/upload-bakes-internal`,
  BAKES_UPDATE_REVIEWER: (id) =>
    `${domain}/mycarrier-quotation/bakes/v1/update-reviewer/${id}`,
  BAKES_PRODUCT: `${domain}/mycarrier-quotation/bakes/v1/service-product`,
  BAKES_PREVIEW_DOC: `${domain}/mycarrier-quotation/bakes/v1/preview-bakes-doc`,
  BAKES_COMPANY_LIST: `${domain}/mycarrier-quotation/bakes/v1/company-list`,
  BAKES_UPLOAD_SERVICE_DOC: `${domain}/mycarrier-quotation/bakes/v1/upload-bakes-doc`,
  BAKES_REMOVE_SERVICE_DOC: `${domain}/mycarrier-quotation/bakes/v1/remove-bakes-doc`,
  BAKES_EMAIL_VERIFICATION_PERURI: `${domain}/mycarrier-quotation/bakes/v1/email-checking`,

  // BAKES MICROSITE
  BAKES_APPROVAL_DETAIL: (id) =>
    `${domain}/mycarrier-quotation/bakes/v1/without-login/${id}`,
  BAKES_APPROVAL_UPDATE_STATUS: (id) =>
    `${domain}/mycarrier-quotation/bakes/v1/without-login/status/${id}`,
  BAKES_APPROVAL_SEND_OTP: `${domain}/mycarrier-quotation/bakes/v1/without-login/send-otp`,
  BAKES_APPROVAL_RESEND_OTP: `${domain}/mycarrier-quotation/bakes/v1/without-login/resend-otp`,
  BAKES_APPROVAL_VERIFY_OTP: `${domain}/mycarrier-quotation/bakes/v1/without-login/verification`,

  //User Management
  USER_MANAGEMENT: `${domain}/users-management/v2?nameApp=mycarrier`,
  USER_MANAGEMENT_ADD: `${domain}/users-management/v2/request-user`,
  USER_MANAGEMENT_UPDATE: (id) => `${domain}/users-management/v2/update/${id}`,
  USER_MANAGEMENT_DETAIL: (userId) => `${domain}/users-management/v2/${userId}`,
  USER_PROFILE: `${domain}/users-management/v2/ldap-profile`,
  USER_ROLES: `${domain}/users-management/v2/role`,
  USER_MANAGEMENT_LIST_PRIVILEGE: `${domain}/explore/v2/privileges`,
  USER_MANAGEMENT_APPROVE: `${domain}/users-management/v2/auth/approval-user`,
  USER_MANAGEMENT_PRIVILEGE: `${domain}/users-management/v2/privilege-user`,
  USER_MANAGEMENT_DOWNLOAD: `${domain}/users-management/v2/download`,
  USER_MANAGEMENT_COUNTRY: `${domain}/users-management/v2/country`,

  //Approval MRTG
  APPROVAL_MRTG_CUSTOMER: `${domain}/tickets/mrtg/internal/v3/customer`,
  APPROVAL_MRTG_CUSTOMER_DETAIL: (id) =>
    `${domain}/tickets/mrtg/internal/v3/customer/${id}`,
  APPROVAL_MRTG_LOGIN_DATA_DETAIL: (id) =>
    `${domain}/tickets/mrtg/internal/v3/customer/${id}/detail-login-data`,
  APPROVAL_MRTG_ADD_LOGIN_DATA_DETAIL: (id) =>
    `${domain}/tickets/mrtg/internal/v3/customer/${id}/add-login-data`,
  APPROVAL_MRTG_DELETE_LOGIN_DATA_DETAIL: (loginDataId) =>
    `${domain}/tickets/mrtg/internal/v3/customer/${loginDataId}`,
  APPROVAL_MRTG_REQUEST: (id) => `${domain}/tickets/mrtg/internal/v3/${id}`,
  APPROVAL_MRTG_LOGIN_DATA: (id) =>
    `${domain}/tickets/mrtg/internal/v3/request/login-data/${id}`,
  APPROVAL_MRTG_REQUEST_DETAIL: (id) =>
    `${domain}/tickets/mrtg/internal/v3/request/${id}`,
  APPROVAL_MRTG_SERVICE: (id) =>
    `${domain}/tickets/mrtg/internal/v3/services/${id}`,

  // Bills & Payment
  LIST_NOTIFICATION_MANAGEMENT: `${domain}/mycarrier-quotation/internal/invoice/v1/company-notification`,
  NOTIFICATION_MANAGEMENT_COMPANY_DETAIL: (id) =>
    `${domain}/mycarrier-quotation/internal/invoice/v1/company-notification/${id}`,
  PIC_PROFILE: `${domain}/mycarrier-quotation/internal/invoice/v1/pic`,
  NOTIFICATION_MANAGEMENT_INVOICE_LIST: `${domain}/mycarrier-quotation/internal/invoice/v1/invoice-list`,
  NOTIFICATION_MANAGEMENT_CLAIM_LIST: `${domain}/mycarrier-quotation/internal/invoice/v1/claim`,
  SEND_NOTIFICATION: `${domain}/mycarrier-quotation/internal/invoice/v1/send-notification`,
  INVOICE_DETAIL: (id, params) =>
    `${domain}/mycarrier-quotation/invoice/v1/detail/${params}?bpNumber=${id}`,
  INVOICE_DETAIL_UPLOAD_DOC: `${domain}/mycarrier-quotation/internal/invoice/v1/upload-file`,
  INVOICE_DETAIL_REMOVE_DOC: `${domain}/mycarrier-quotation/internal/invoice/v1/delete-file`,
  GENERATE_INVOICE: (id) =>
    `${domain}/mycarrier-quotation/invoice/v1/generate-invoice/${id}`,
  INVOICE_CLAIM_DETAIL: (id) =>
    `${domain}/mycarrier-quotation/internal/invoice/v1/claim/${id}`,
  UPDATE_STATUS_CLAIM: (id) =>
    `${domain}/mycarrier-quotation/internal/invoice/v1/claim/status/${id}`,
  INVOICE_CLAIM_UPLOAD: `${domain}/mycarrier-quotation/internal/invoice/v1/claim/upload-file`,
  INVOICE_CLAIM_REMOVE_FILE: `${domain}/mycarrier-quotation/internal/invoice/v1/claim/delete-file`,
  // Others
  LIST_COMPANY: (x) =>
    `https://api-dev.telkomdigitalsolution.co/users-management/v2/customer-account?segment=mycarrier&nipnas=&custAccntNum=&name=${x}`,
  LIST_SEGMENT: `${domain}/users-management/v2/segment`,
  LIST_ALL_BAKES: `${domain}/activation/internal/purchase-order/all-bakes`,

  //Privilege Management
  PRIVILEGE_WITH_ID: (journeyId) =>
    `${domain}/users-management/v2/privileges/${journeyId}`,
  PRIVILEGE_LIST: `${domain}/users-management/v2/privileges`,
  PRIVILEGE_CHECK_USED: `${domain}/users-management/v2/privileges/check`,

  //REPORT- NPS SCORE
  NPS_CHART: `${domain}/activation/dashboard/nps`,
  LIST_EVALUATE_NPS: `${domain}/mycarrier-quotation/bakes/v1/nps-list`,
  LIST_EVALUATE_NPS_CUSTOMER: `${domain}/mycarrier-quotation/nps-customer`,
  LIST_ACTIVATED_NPS: `${domain}/activation/nps-list`,
  LIST_ACTIVATED_NPS_CUSTOMER: `${domain}/activation/nps-customer`,
  LIST_ACTIVATED_NPS_PRODUCT: `${domain}/activation/nps-product`,
};

export default service;
