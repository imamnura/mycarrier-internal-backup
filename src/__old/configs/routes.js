const routes = {
  design_system: 'sys',
  HOME: `/`,
  LOGIN: `/login`,
  LOGOU: `/logout`,
  FORGOT_PASSWORD: `/reset-password`,

  // GET SUPPORT - SMS A2P
  FAULT_HANDLING: '/service-assurance-sms-a2p',
  FAULT_HANDLING_DETAIL: (id) => `/service-assurance-sms-a2p/detail/${id}`,

  // GET SUPPORT - SMS A2P
  FAULT_HANDLING_NEUCLOUD: '/service-assurance-neucloud',
  FAULT_HANDLING_DETAIL_NEUCLOUD: (id) =>
    `/service-assurance-neucloud/detail/${id}`,

  // GENERAL SUPPORT
  GENERAL_PRODUCT_SA: '/service-assurance-general-product',
  GENERAL_PRODUCT_SA_DETAIL: (id) =>
    `/service-assurance-general-product/validation/${id}`,

  // SMS A2P - LINK
  LINK_ACTIVATION: '/link',
  LINK_ACTIVATION_DETAIL: (id) => `/link/detail/${id}`,
  APPROVAL_LINK: (id) => `/link-approval/${id}`,

  // SMS A2P - SENDER ID
  BULK: '/bulk',
  SENDER_ID_DETAIL: (id, id2) =>
    id2 ? `/bulk/detail/${id}?sti=${id2}` : `/bulk/detail/${id}`,

  // SMS A2P - KEYWORD
  KEYWORD: '/keyword',
  KEYWORD_DETAIL: (id) => `/keyword/detail/${id}`,

  // SMS A2P - LBA
  LBA: '/non-bulk',
  LBA_DETAIL: (id) => `/non-bulk/detail/${id}`,
  LBA_EDIT: (id) => `/non-bulk/edit/${id}`,
  LBA_CAMPAIGN_DETAIL: (id, params) => `/non-bulk/campaign/${id}/${params}`,
  APPROVAL_LBA: (id) => `/non-bulk-approval/${id}`,

  // SMS A2P - UMB
  UMB: '/umb',
  UMB_DETAIL: (id) => `/umb/detail/${id}`,

  // REPORT - SENDER ID
  SENDER_ID_REPORT: '/report-sender-id',
  LBA_REPORT: '/report-lba',
  SMSC_REPORT: '/report-smsc',
  INTERESTED_LIST_REPORT: '/report-interested-list',

  //REPORT - PERFORMANCE
  PERFORMANCE_REPORT: '/report-performance',

  //REPORT - NPS Score
  NPS_SCORE_REPORT: '/report-nps-score',

  // CONTENT MANAGEMENT - BANNER MANAGEMENT
  BANNER: '/banner',
  ADD_BANNER: '/banner/add',
  UPDATE_BANNER: (id) => `/banner/edit/${id}`,

  // CONTENT MANAGEMENT - ARTICLE MANAGEMENT
  ARTICLE_MANAGEMENT: '/article-management',
  ARTICLE_MANAGEMENT_ADD: '/article-management/add',
  UPDATE_ARTICLE_MANAGEMENT: (id) => `/article-management/edit/${id}`,

  // GENERAL PRODUCT - PURCHASE ORDER
  PURCHASE_ORDER: '/purchase-order',
  PURCHASE_ORDER_DETAIL: (id) => `/purchase-order/detail/${id}`,

  // GENERAL PRODUCT - MODIFICATION ORDER
  MODIFICATION_ORDER: '/modification-order',
  MODIFICATION_ORDER_DETAIL: (id) => `/modification-order/detail/${id}`,

  // GENERAL PRODUCT -> BASO
  BASO: '/baso',
  BASO_DETAIL: (id) => `/baso/detail/${id}`,

  // GENERAL PRODUCT - QUOTATION
  QUOTATION: '/quotation',
  QUOTATION_CREATE: '/quotation/create',
  QUOTATION_DETAIL: (id) => `/quotation/detail/${id}`,
  APPROVAL_QUOTATION: (id) => `/quotation/approval/${id}`,

  // GENERAL PRODUCT - BAKES
  BAKES: '/bakes',
  BAKES_CREATE: '/bakes/create',
  BAKES_DETAIL: (id) => `/bakes/detail/${id}`,
  APPROVAL_BAKES: (id) => `/bakes/approval/${id}`,

  // CONTENT MANAGEMENT - AM MAPPING
  AM_MAPPING: '/am-mapping',
  AM_MAPPING_ADD: '/am-mapping/add',
  AM_MAPPING_DETAIL: (id) => `/am-mapping/detail/${id}`,

  // CONTENT MANAGEMENT - INTERESTED LIST
  INTERESTED_LIST: '/interested-list',
  INTERESTED_LIST_DETAIL: (id) => `/interested-list/detail/${id}`,

  // CONTENT MANAGEMENT - PRODUCT MANAGEMENT
  PRODUCT_MANAGEMENT: `/product-management`,
  PRODUCT_MANAGEMENT_ADD: '/product-management/add',
  PRODUCT_MANAGEMENT_UPDATE: (id) => `/product-management/edit/${id}`,

  // ADMIN
  USER_MANAGEMENT: '/user-management',
  USER_MANAGEMENT_ADD: '/user-management/add',
  USER_MANAGEMENT_DETAIL: (id) => `/user-management/detail/${id}`,

  // APPROVAL_MRTG
  APPROVAL_MRTG: '/approval-mrtg',
  APPROVAL_MRTG_DETAIL: (id) => `/approval-mrtg/detail/${id}`,
  APPROVAL_REQUEST_MRTG_DETAIL: (id, params) =>
    `/approval-mrtg/request-mrtg/${id}/${params}`,
  APPROVAL_REQUEST_LOGIN_DATA_DETAIL: (id, params) =>
    `/approval-mrtg/detail-login-data/${id}/${params}`,

  // BILLS AND PAYMENT - NOTIFICATION MANAGEMENT
  NOTIFICATION_MANAGEMENT: '/notification-management',
  NOTIFICATION_MANAGEMENT_DETAIL: (id) =>
    `/notification-management/detail/${id}`,
  INVOICE_DETAIL: (id, params) =>
    `/notification-management/invoice/${id}/${params}`,
  INVOICE_CLAIM_DETAIL: (id, params) =>
    `/notification-management/claim/${id}/${params}`,

  //ROLE MANAGEMENT
  ROLE: '/role-management',
  ROLE_ADD: '/role-management/add',
  ROLE_DETAIL: (id) => `/role-management/detail/${id}`,

  //PRIVILEGE MANAGEMENT
  PRIVILEGE: '/privilege-management',
  PRIVILEGE_EDIT: (id) => `/privilege-management/edit/${id}`,
  PRIVILEGE_DETAIL: (id) => `/privilege-management/detail/${id}`,

  //NEUCENTRIX
  REPORT_NEUCENTRIX: '/report-neucentrix',
  REPORT_NEUCENTRIX_DETAIL: (id) => `/report-neucentrix/detail/${id}`,
  NEUCENTRIX_CREATE: '/report-neucentrix/upload-report',
  VISITING_NEUCENTRIX: '/visit-neucentrix',
  VISITING_NEUCENTRIX_DETAIL: (id) => `/visit-neucentrix/detail/${id}`,
  APPROVAL_VISITING_NEUCENTRIX: (params, id) =>
    `/visit-neucentrix/approval/${params}/${id}`,
};

export default routes;
