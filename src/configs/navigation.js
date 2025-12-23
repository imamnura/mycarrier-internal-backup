import BroadcastV2 from '@assets/icon-v2/BroadcastV2';
import EventsManagement from '@assets/icon-v2/EventsManagement';
import Keyword from '@assets/icon-v2/Keyword';
import LeadManagementSystemReport from '@assets/icon-v2/LeadManagementSystemReport';
import Mrtg from '@assets/icon-v2/Mrtg';
import Neucentrix from '@assets/icon-v2/Neucentrix';
import PurchaseOrder from '@assets/icon-v2/PurchaseOrder';
import ServiceAssurance from '@assets/icon-v2/ServiceAssurance';
import Settlement from '@assets/icon-v2/Settlement';
import UserManagement from '@assets/icon-v2/UserManagement';
import Coupon from '@assets/icon-v2/Coupon';
import { route } from '@configs';
import { getUserData } from '@utils/common';

export const drawerMenu = [
  {
    categoryName: 'SMSA2P',
    categoryLabel: 'SMS A2P',
    Icon: Keyword,
    menu: [
      {
        menuName: 'link',
        menuLabel: 'Link',
        path: route.link('list'),
        pathDetail: route.link('detail', ''),
      },
      {
        menuName: 'bulk',
        menuLabel: 'Bulk',
        path: route.bulk('list'),
        pathDetail: route.bulk('detail', ''),
      },
      {
        menuName: 'non_bulk',
        menuLabel: 'Non Bulk',
        path: route.nonBulk('list'),
        pathDetail: route.nonBulk('detail', ''),
      },
      {
        menuName: 'lba',
        menuLabel: 'LBA',
        path: route.lba('list'),
        pathDetail: route.lba('detail', ''),
      },
      {
        menuName: 'umb',
        menuLabel: 'UMB',
        path: route.umb('list'),
        pathDetail: route.umb('detail', ''),
      },
      {
        menuName: 'keyword',
        menuLabel: 'Keyword',
        path: route.keyword('list'),
        pathDetail: route.keyword('detail', ''),
      },
    ],
  },
  {
    categoryName: 'REPORT',
    categoryLabel: 'Report',
    Icon: LeadManagementSystemReport,
    menu: [
      {
        menuName: 'bulk',
        menuLabel: 'Bulk',
        path: route.reportSenderId(),
      },
      {
        menuName: 'non_bulk',
        menuLabel: 'Non Bulk',
        path: route.nonBulk('report'),
      },
      {
        menuName: 'smsc',
        menuLabel: 'SMSC',
        path: route.reportSmsc(),
      },
      {
        menuName: 'interested_list',
        menuLabel: 'Interested List',
        path: route.interested('report'),
      },
      {
        menuName: 'nps_score',
        menuLabel: 'NPS Score',
        path: route.reportNpsScore(),
      },
      {
        menuName: 'performance',
        menuLabel: 'Performance',
        path: route.reportPerformance(),
      },
      {
        menuName: 'user_management_report', // user_management
        menuLabel: 'User Performance',
        path: route.reportUserManagement('report'),
      },
    ],
  },
  {
    categoryName: 'GENERAL_PRODUCT',
    categoryLabel: 'Document',
    Icon: PurchaseOrder,
    menu: [
      {
        menuName: 'offering_letter',
        menuLabel: 'Offering Letter',
        path: route.offeringLetter('list'),
      },
      {
        menuName: 'bakes_online',
        menuLabel: 'BAKES',
        path: route.bakes('list'),
      },
      {
        menuName: 'purchase_order',
        menuLabel: 'Purchase Order',
        path: route.purchaseOrder('list'),
      },
      {
        menuName: 'modification_order',
        menuLabel: 'Modification Order',
        path: route.modificationOrder('list'),
      },
      {
        menuName: 'baso',
        menuLabel: 'BASO',
        path: route.baso('list'),
      },
    ],
  },
  {
    categoryName: 'NEUCENTRIX',
    categoryLabel: 'Neucentrix',
    Icon: Neucentrix,
    menu: [
      {
        menuName: 'availability_rack',
        menuLabel: 'Availability Rack',
        path: route.availabilityRackNCX('list'),
      },
      {
        menuName: 'report_neucentrix',
        menuLabel: 'Report',
        path: route.reportNcx('list'),
      },
      {
        menuName: 'visiting',
        menuLabel: 'Visiting',
        path: route.visitNcx('list'),
      },
    ],
  },
  {
    categoryName: 'SERVICE_ASSURANCE',
    categoryLabel: 'Service Assurance',
    Icon: ServiceAssurance,
    menu: [
      {
        menuName: 'smsa2p',
        menuLabel: 'SMS A2P',
        path: route.smsa2p('list'),
        pathDetail: route.smsa2p('detail', ''),
      },
      {
        menuName: 'neucloud',
        menuLabel: 'NeuCloud',
        path: route.neucloud('list'),
        pathDetail: route.neucloud('detail', ''),
      },
      {
        menuName: 'general_product',
        menuLabel: 'General Product',
        path: route.generalProduct('list'),
        pathDetail: route.generalProduct('detail', ''),
      },
      {
        menuName: 'gameqoo',
        menuLabel: 'GameQoo',
        path: route.gameqoo('list'),
        pathDetail: route.gameqoo('detail', ''),
      },
      {
        menuName: 'digital_product',
        menuLabel: 'Digital Product',
        path: route.digitalProduct('list'),
        pathDetail: route.digitalProduct('detail', ''),
      },
    ],
  },
  {
    categoryName: 'SERVICE_DELIVERY',
    categoryLabel: 'Service Delivery',
    Icon: Mrtg,
    menu: [
      {
        menuName: 'mrtg',
        menuLabel: 'MRTG',
        path: route.mrtg('list'),
        pathDetail: route.mrtg('detail', ''),
      },
      {
        menuName: 'service_list',
        menuLabel: 'Service List',
        path: route.serviceList('list'),
        pathDetail: route.serviceList('detailCustomer', ''),
      },
      {
        menuName: 'monitoring_operator',
        menuLabel: 'SIMPATI',
        path: route.monitoringOperator('list'),
      },
      {
        menuName: 'ip_prefix',
        menuLabel: 'IP Prefix',
        path: route.ipPrefix('list-customer'),
        pathDetail: route.ipPrefix('detail-customer', ''),
      },
      {
        menuName: 'delivery_tracking',
        menuLabel: 'Delivery Tracking',
        path: route.deliveryTracking('list'),
      },
    ],
  },
  // {
  //   categoryName: 'LEAD_MANAGEMENT_SYSTEM',
  //   categoryLabel: 'LEAD MANAGEMENT SYSTEM',
  //   menu: [
  //     {
  //       menuName: 'lead_dashboard',
  //       menuLabel: 'Dashboard',
  //       icon: InterestedList,
  //       path: route.dashboardLead('list'),
  //     },
  //     {
  //       menuName: 'lead_report',
  //       menuLabel: 'Report',
  //       icon: ReportLead,
  //       path: route.reportLead(),
  //     },
  //   ]
  // },
  {
    categoryName: 'CONTENT_MANAGEMENT',
    categoryLabel: 'Content Management',
    Icon: EventsManagement,
    menu: [
      {
        menuName: 'product_management',
        menuLabel: 'Product Management',
        path: route.productManage('list'),
      },
      {
        menuName: 'po_config',
        menuLabel: 'PO Config',
        path: route.poConfig('list'),
      },
      {
        menuName: 'user_download_brochure',
        menuLabel: 'User Download Brochure',
        path: route.userDownloadBrochure('list'),
      },
      {
        menuName: 'banner' || 'brochure_upload',
        menuLabel: 'Homepage Management',
        path: route.homepageManagement('list'),
      },
      // {
      //   menuName: 'interested_list',
      //   menuLabel: 'Interested List',
      //   icon: InterestedList,
      //   path: route.interested('list')
      // },
      {
        menuName: 'am_mapping',
        menuLabel: 'AM Mapping',
        path: route.amMapping('list'),
      },
      {
        menuName: 'article_management',
        menuLabel: 'Article Manage',
        path: route.article('list'),
      },
      // {
      //   menuName: 'banner',
      //   menuLabel: 'Banner',
      //   icon: HighlightedContent,
      //   path: route.banner('list')
      // },
      {
        menuName: 'event_management',
        menuLabel: 'Events Manage',
        path: route.events('list'),
      },
      {
        menuName: 'bills_&_payment_banner',
        menuLabel: 'Bills & Payment Banner',
        path: route.billsAndPaymentBanner('list'),
      },
    ],
  },
  {
    categoryName: 'ADMIN',
    categoryLabel: 'Admin',
    Icon: UserManagement,
    menu: [
      {
        menuName: 'user_management',
        menuLabel: 'User Management',
        path: route.user('list'),
      },
      {
        menuName: 'role_management',
        menuLabel: 'Role Management',
        path: route.role('list'),
      },
      {
        menuName: 'privilege_management',
        menuLabel: 'Privilege Management',
        path: route.privilege('list'),
      },
    ],
  },
  {
    categoryName: 'BILLS_AND_PAYMENT',
    categoryLabel: 'Bills & Payment',
    Icon: Settlement,
    menu: [
      {
        menuName: 'notification_management',
        menuLabel: 'Bills & Payment Management',
        path: route.billsAndPayment('main'),
      },
      {
        menuName: 'data_unsettle',
        menuLabel: 'Data Unsettle',
        path: route.dataUnsettle('list'),
      },
      {
        menuName: 'settlement',
        menuLabel: 'Settlement',
        path: route.settlement('list'),
      },
      {
        menuName: 'isolate',
        menuLabel: 'Isolate',
        path: route.isolate('list'),
      },
    ],
  },
  {
    categoryName: 'BROADCAST',
    categoryLabel: 'Broadcast',
    Icon: BroadcastV2,
    menu: [
      {
        menuName: 'broadcast_information',
        menuLabel: 'Broadcast Information',
        path: route.broadcastInformation('list'),
      },
    ],
  },
  {
    categoryName: 'LEAD',
    categoryLabel: 'Leads',
    Icon: LeadManagementSystemReport,
    menu: [
      {
        menuName: 'dashboard_lead',
        menuLabel: 'Dashboard',
        path: route.leads('dashboard'),
      },
      {
        menuName: 'report_lead',
        menuLabel: 'Report',
        path: route.leads('report'),
      },
    ],
  },
  {
    categoryName: 'PROGRAM_AND_LOYALTY',
    categoryLabel: 'Program & Loyalty',
    Icon: Coupon,
    menu: [
      {
        menuName: 'promotion_program',
        menuLabel: 'Promotion Program',
        path: route.promotionProgram('list'),
      },
    ],
  },
];

export const menuList = (p) => {
  let privileges = [];

  if (p) {
    privileges = p;
  } else {
    const { privileges: _privileges = [] } = getUserData() || {};
    privileges = _privileges;
  }

  const menuCategories = privileges.map((menu) => menu.category);
  const menuFeatures = (categoryName) => {
    let features = [];
    privileges
      .find((item) => item.category === categoryName)
      .feature.forEach((featureItem) => {
        features.push(featureItem.name);
      });

    return features;
  };

  return drawerMenu
    .filter((menu) => menuCategories.includes(menu.categoryName))
    .map((itemMenu) => {
      const validatedMenuItem = itemMenu.menu.filter((item) =>
        menuFeatures(itemMenu.categoryName).some(
          (feature) => feature === item.menuName,
        ),
      );

      return { ...itemMenu, menu: validatedMenuItem };
    });
};
