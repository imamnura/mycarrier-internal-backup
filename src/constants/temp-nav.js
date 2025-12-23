/* eslint-disable sort-keys */
import { ROUTES } from '../__old/configs';
import { getUserData } from '../utils/common';

export const drawerMenu = [
  {
    name: 'SMSA2P',
    title: 'SMSA2P',
    menu: [
      {
        name: 'link',
        label: 'Link',
        icon: 'link',
        path: ROUTES.LINK_ACTIVATION,
        pathDetail: ROUTES.LINK_ACTIVATION_DETAIL(''),
      },
      {
        name: 'sender_id',
        label: 'Sender ID',
        icon: 'sender',
        path: ROUTES.SENDER_ID,
        pathDetail: ROUTES.SENDER_ID_DETAIL(''),
      },
      {
        name: 'lba',
        label: 'LBA',
        icon: 'lba',
        path: ROUTES.LBA,
        pathDetail: ROUTES.LBA_DETAIL(''),
      },
      {
        name: 'umb',
        label: 'UMB',
        icon: 'umb',
        path: ROUTES.UMB,
        pathDetail: ROUTES.UMB_DETAIL(''),
      },
      {
        name: 'keyword',
        label: 'Keyword',
        icon: 'keyword',
        path: ROUTES.KEYWORD,
        pathDetail: ROUTES.KEYWORD_DETAIL(''),
      },
    ],
  },
  {
    name: 'REPORT',
    title: 'REPORT',
    menu: [
      {
        name: 'sender_id',
        label: 'Sender ID',
        icon: 'sender',
        path: ROUTES.SENDER_ID_REPORT,
      },
      {
        name: 'lba',
        label: 'LBA',
        icon: 'lba',
        path: ROUTES.LBA_REPORT,
      },
      {
        name: 'smsc',
        label: 'SMSC',
        icon: 'smsc',
        path: ROUTES.SMSC_REPORT,
      },
      {
        name: 'interested_list',
        label: 'Interested List',
        icon: 'interestedList',
        path: ROUTES.INTERESTED_LIST_REPORT,
      },
    ],
  },
  {
    name: 'GENERAL_PRODUCT',
    title: 'GENERAL PRODUCT',
    menu: [
      {
        name: 'digital_quotation',
        label: 'Quotation',
        icon: 'quotation',
        path: ROUTES.QUOTATION,
      },
      {
        name: 'bakes_online',
        label: 'BAKES',
        icon: 'bakes',
        path: ROUTES.BAKES,
      },
      {
        name: 'purchase_order',
        label: 'Purchase Order',
        icon: 'purchaseOrder',
        path: ROUTES.PURCHASE_ORDER,
      },
      {
        name: 'modification_order',
        label: 'Modification Order',
        icon: 'ModificationOrder',
        path: ROUTES.MODIFICATION_ORDER,
      },
      {
        name: 'baso',
        label: 'BASO',
        icon: 'baso',
        path: ROUTES.BASO,
      },
    ],
  },
  {
    name: 'SERVICE_ASSURANCE',
    title: 'SERVICE ASSURANCE',
    menu: [
      {
        name: 'smsa2p',
        label: 'SMS A2P',
        icon: 'faultHandling',
        path: ROUTES.FAULT_HANDLING,
        pathDetail: ROUTES.FAULT_HANDLING_DETAIL(''),
      },
      {
        name: 'neucloud',
        label: 'NeuCloud',
        icon: 'faultHandling',
        path: ROUTES.FAULT_HANDLING_NEUCLOUD,
        pathDetail: ROUTES.FAULT_HANDLING_DETAIL_NEUCLOUD(''),
      },
    ],
  },
  {
    name: 'MONITORING',
    title: 'GRAPHIC REPORT',
    menu: [
      {
        name: 'mrtg',
        label: 'MRTG',
        icon: 'mrtg',
        path: ROUTES.APPROVAL_MRTG,
        pathDetail: ROUTES.APPROVAL_MRTG_DETAIL(''),
      },
    ],
  },
  {
    name: 'CONTENT_MANAGEMENT',
    title: 'CONTENT MANAGEMENT',
    menu: [
      {
        name: 'product_management',
        label: 'Product Manage',
        icon: 'product',
        path: ROUTES.PRODUCT_MANAGEMENT,
      },
      {
        name: 'interested_list',
        label: 'Interested List',
        icon: 'interestedList',
        path: ROUTES.INTERESTED_LIST,
      },
      {
        name: 'am_mapping',
        label: 'AM Mapping',
        icon: 'accountNav',
        path: ROUTES.AM_MAPPING,
      },
      {
        name: 'article_management',
        label: 'Article Manage',
        icon: 'article',
        path: ROUTES.ARTICLE_MANAGEMENT,
      },
      {
        name: 'banner',
        label: 'Banner',
        icon: 'banner',
        path: ROUTES.BANNER,
      },
    ],
  },
  {
    name: 'ADMIN',
    title: 'ADMIN',
    menu: [
      {
        name: 'user_management',
        label: 'User Manage',
        icon: 'userManagement',
        path: ROUTES.USER_MANAGEMENT,
      },
      {
        name: 'role_management',
        label: 'Role Manage',
        icon: 'accountNav',
        path: ROUTES.ROLE,
      },
      {
        name: 'privilege_management',
        label: 'Privilege Manage',
        icon: 'keyNav',
        path: ROUTES.PRIVILEGE,
      },
    ],
  },
  {
    name: 'BILLS_AND_PAYMENT',
    title: 'Bills & Payment',
    menu: [
      {
        name: 'notification_management',
        label: 'Notification Man..',
        icon: 'purchaseOrder',
        path: ROUTES.NOTIFICATION_MANAGEMENT,
      },
    ],
  },
];

export const getFilteredMenu = () => {
  const { privileges = [] } = getUserData();
  const menuCategories = privileges.map((menu) => menu.category);
  const menuFeatures = () => {
    let features = [];
    for (let i = 0; i < privileges.length; i++) {
      privileges[i].feature.map((featureItem) =>
        features.push(featureItem.name),
      );
    }
    return features;
  };
  return drawerMenu
    .filter((menu) => menuCategories.includes(menu.name))
    .map((itemMenu) => {
      const validatedMenuItem = itemMenu.menu.filter((item) =>
        menuFeatures().some((feature) => feature === item.name),
      );
      return { ...itemMenu, menu: validatedMenuItem };
    });
};
