import images from '../../../__old/configs/images';

export const schema = [
  { name: 'company.name', label: 'Customer' },
  { name: 'bakesId', label: 'BAKES ID' },
  { name: 'ndeNumber', label: 'BAKES Number' },
  { name: 'createdDate', label: 'Created Date', date: true },
  {
    name: 'bakesDocument',
    label: 'Preview Document',
    color: 'blue',
    previewDocs: true,
  },
];

export const serviceSchema = [
  { name: 'hjmPercentage', label: 'status Harga', percentage: true },
  { name: 'hjm', label: 'HJM', rupiah: true },
  { name: 'price', label: 'Price', rupiah: true },
  { name: 'valueAgreement', label: 'Estimated Value Agreement', rupiah: true },
  { name: 'reqSbr', label: 'REQ SBR', color: 'blue', previewDocs: true },
  { name: 'sbr', label: 'SBR', color: 'blue', previewDocs: true },
  { name: 'otherDoc', label: 'OTHER DOC', color: 'blue', previewDocs: true },
  {
    name: 'bakesNotesDocument',
    label: 'Review Notes',
    color: 'blue',
    previewDocs: true,
  },
  { name: 'notes', label: 'Notes' },
];

export const wordings = {
  reject: {
    confirmation: {
      title: 'Are you sure want to reject this New BAKES request?',
      secondaryContent:
        'If you want to reject this request, you have to filling the reason',
    },
  },
  return: {
    confirmation: {
      title: 'Are you sure want to return this New BAKES request?',
      secondaryContent:
        'If you want to return this request, you have to filling the reason',
    },
  },
  approve: {
    confirmation: {
      title: 'Are you sure want to approve this New BAKES request?',
      secondaryContent:
        'Once you approve, it will be processed and data will be sent to other Account Manager to be check',
    },
  },
};

export const imageStatus = (status) => {
  switch (status) {
    case 'approved':
      return images.APPROVAL_SUCCESS;
    case 'rejected':
      return images.APPROVAL_REJECTED;
    case 'returned':
      return images.APPROVAL_RETURNED;
  }
};
