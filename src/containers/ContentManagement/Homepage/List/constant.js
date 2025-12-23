import { isHaveAccess } from '@utils/common';

export const tableHeader = (activeTab) => {
  switch (activeTab) {
    case 'bannerHero': {
      return [
        {
          cellStyle: {
            minWidth: 50,
            width: 50,
          },
          label: 'ID',
          name: 'id',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'TITLE',
          name: 'bannerTitle',
        },
        {
          cellStyle: {
            minWidth: 150,
            width: 150,
          },
          label: 'LINK BANNER',
          name: 'linkBanner',
        },
        {
          cellStyle: {
            minWidth: 150,
            width: 150,
          },
          formatDate: 'date-time',
          label: 'CREATED DATE',
          name: 'createdAt',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 50,
            width: 50,
          },
          label: 'Status',
          name: 'status',
        },
        {
          cellStyle: {
            minWidth: 50,
            width: 50,
          },
          hasTooltipHeader: true,
          label: '',
          name: 'operations',
          tooltipHeader:
            '“Active” & “Hide” status is mapping on Reorder Banner Hero',
        },
      ];
    }
    case 'brochure': {
      return [
        {
          cellStyle: {
            minWidth: 150,
          },
          label: 'BROCHURE ID',
          name: 'id',
        },
        {
          cellStyle: {
            minWidth: 250,
          },
          label: 'BROCHURE NAME',
          name: 'name',
        },
        {
          cellStyle: {
            minWidth: 50,
          },
          label: 'SIZE',
          name: 'size',
        },
        {
          cellStyle: {
            minWidth: 50,
          },
          label: 'FILE TYPE',
          name: 'fileType',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          formatDate: 'date-time',
          label: 'DATE UPLOADED',
          name: 'createdAt',
          sort: true,
        },
      ];
    }
    case 'popup': {
      return [
        {
          cellStyle: {
            minWidth: 150,
          },
          label: 'Pop Up Name',
          name: 'name',
        },
        {
          cellStyle: {
            minWidth: 250,
          },
          label: 'Action Button Link',
          name: 'link',
        },
        {
          cellStyle: {
            minWidth: 200,
          },
          label: 'Period',
          name: 'period',
        },
        {
          cellStyle: {
            minWidth: 50,
          },
          label: 'Status',
          name: 'status',
        },
        {
          cellStyle: {
            minWidth: 50,
            width: 50,
          },
          label: 'Action',
          name: 'action',
        },
      ];
    }
  }
};

export const optionsFileType = [
  { label: 'All File Type', value: '' },
  { label: 'PDF', value: 'pdf' },
  { label: 'PNG', value: 'png' },
  { label: 'JPG', value: 'jpg' },
];

export const searchPlaceholder = (tab) => {
  let placeholder = '';

  if (tab === 'bannerHero') placeholder = 'Search Title..';
  else if (tab === 'brochure') placeholder = 'Search Brochure Name..';
  else placeholder = 'Search..';

  return placeholder;
};

export const normalizeStatus = (status) => {
  switch (status) {
    case 'active':
      return 'ACTIVE';
    case 'hide':
      return 'HIDE';
  }
};

export const tabsHomepage = (feature) => {
  const tab = [
    { value: 'bannerHero', label: 'Banner Hero' },
    { value: 'brochure', label: 'Brochure Upload' },
  ];

  if (isHaveAccess(feature, 'view_list_popup_banner')) {
    tab.push({ value: 'popup', label: 'Pop Up' });
  }
  return tab;
};

export const contentMenuList = [
  { id: 1, label: 'Banner Hero' },
  { id: 2, label: 'Brochure Upload' },
  { id: 3, label: 'Pop Up' },
];
