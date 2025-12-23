const document = {
  offeringLetter: {
    category: 'GENERAL_PRODUCT',
    page: 'offering_letter',
  },
  bakes: {
    category: 'GENERAL_PRODUCT',
    page: 'bakes_online',
  },
  baso: {
    category: 'GENERAL_PRODUCT',
    page: 'baso',
  },
  purchaseOrder: {
    category: 'GENERAL_PRODUCT',
    page: 'purchase_order',
  },
  modificationOrder: {
    category: 'GENERAL_PRODUCT',
    page: 'modification_order',
  },
};

const smsa2p = {
  link: {
    category: 'SMSA2P',
    page: 'link',
  },
  bulk: {
    category: 'SMSA2P',
    page: 'bulk',
  },
  nonBulk: {
    category: 'SMSA2P',
    page: 'non_bulk',
  },
  lba: {
    category: 'SMSA2P',
    page: 'lba',
  },
  keyword: {
    category: 'SMSA2P',
    page: 'keyword',
  },
  umb: {
    category: 'SMSA2P',
    page: 'umb',
  },
};

const contentManagement = {
  productManagement: {
    category: 'CONTENT_MANAGEMENT',
    page: 'product_management',
  },
  poConfig: {
    category: 'CONTENT_MANAGEMENT',
    page: 'po_config',
  },
  userDownloadBrochure: {
    category: 'CONTENT_MANAGEMENT',
    page: 'user_download_brochure',
  },
  amMapping: {
    category: 'CONTENT_MANAGEMENT',
    page: 'am_mapping',
  },
  interestedList: {
    category: 'CONTENT_MANAGEMENT',
    page: 'interested_list',
  },
  banner: {
    category: 'CONTENT_MANAGEMENT',
    page: 'banner',
  },
  articleManagement: {
    category: 'CONTENT_MANAGEMENT',
    page: 'article_management',
  },
  brochure: {
    category: 'CONTENT_MANAGEMENT',
    page: 'brochure_upload',
  },
  popUp: {
    category: 'CONTENT_MANAGEMENT',
    page: 'popup_banner',
  },
  eventsManagement: {
    category: 'CONTENT_MANAGEMENT',
    page: 'event_management',
  },
  billsAndPaymentBanner: {
    category: 'CONTENT_MANAGEMENT',
    page: 'bills_&_payment_banner',
  },
};

const neucentrix = {
  reportNeucentrix: {
    category: 'NEUCENTRIX',
    page: 'report_neucentrix',
  },
  visitNeucentrix: {
    category: 'NEUCENTRIX',
    page: 'visiting',
  },
  availabilityRack: {
    category: 'NEUCENTRIX',
    page: 'availability_rack',
  },
};

const billsAndPayment = {
  notificationManagement: {
    category: 'BILLS_AND_PAYMENT',
    page: 'notification_management',
  },
  dataUnsettle: {
    category: 'BILLS_AND_PAYMENT',
    page: 'data_unsettle',
  },
  settlement: {
    category: 'BILLS_AND_PAYMENT',
    page: 'settlement',
  },
  isolate: {
    category: 'BILLS_AND_PAYMENT',
    page: 'isolate',
  },
};

const serviceDelivery = {
  mrtg: {
    category: 'SERVICE_DELIVERY',
    page: 'mrtg',
  },
  serviceList: {
    category: 'SERVICE_DELIVERY',
    page: 'service_list',
  },
  monitoringOperator: {
    category: 'SERVICE_DELIVERY',
    page: 'monitoring_operator',
  },
  ipPrefix: {
    category: 'SERVICE_DELIVERY',
    page: 'ip_prefix',
  },
  deliveryTracking: {
    category: 'SERVICE_DELIVERY',
    page: 'delivery_tracking',
  },
};

const report = {
  bulk: {
    category: 'REPORT',
    page: 'bulk',
  },
  nonBulk: {
    category: 'REPORT',
    page: 'non_bulk',
  },
  lba: {
    category: 'REPORT',
    page: 'non_bulk',
  },
  smsc: {
    category: 'REPORT',
    page: 'smsc',
  },
  interestedList: {
    category: 'REPORT',
    page: 'interested_list',
  },
  npsScore: {
    category: 'REPORT',
    page: 'nps_score',
  },
  performance: {
    category: 'REPORT',
    page: 'performance',
  },
  userManagement: {
    category: 'REPORT',
    page: 'user_management_report', // performance
  },
};

const serviceAssurance = {
  smsa2p: {
    category: 'SERVICE_ASSURANCE',
    page: 'smsa2p',
  },
  neucloud: {
    category: 'SERVICE_ASSURANCE',
    page: 'neucloud',
  },
  generalProduct: {
    category: 'SERVICE_ASSURANCE',
    page: 'general_product',
  },
  gameqoo: {
    category: 'SERVICE_ASSURANCE',
    page: 'gameqoo',
  },
  digitalProduct: {
    category: 'SERVICE_ASSURANCE',
    page: 'digital_product',
  },
};

const admin = {
  userManagement: {
    category: 'ADMIN',
    page: 'user_management',
  },
  roleManagement: {
    category: 'ADMIN',
    page: 'role_management',
  },
  privilegeManagement: {
    category: 'ADMIN',
    page: 'privilege_management',
  },
};

const broadcast = {
  broadcastInformation: {
    category: 'BROADCAST',
    page: 'broadcast_information',
  },
};

const leadManagementSystem = {
  dashboard: {
    category: 'LEAD_MANAGEMENT_SYSTEM',
    page: 'lead_management_system_dashboard',
    // page: 'interested_list'
  },
  report: {
    category: 'LEAD_MANAGEMENT_SYSTEM',
    page: 'lead_management_report',
    // page: 'interested_list'
  },
};

const dashboard = {
  category: 'DASHBOARD_ROLE',
  page: 'dashboard_role',
};

const chatBot = {
  category: 'CHAT_BOT',
  page: 'chat_bot',
};

const programLoyalty = {
  promotionProgram: {
    category: 'PROGRAM_AND_LOYALTY',
    page: 'promotion_program',
  },
};

const privileges = {
  admin,
  billsAndPayment,
  contentManagement,
  document,
  serviceDelivery,
  neucentrix,
  report,
  serviceAssurance,
  smsa2p,
  broadcast,
  leadManagementSystem,
  dashboard,
  chatBot,
  programLoyalty,
};

export default privileges;
