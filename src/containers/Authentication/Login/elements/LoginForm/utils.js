import { getFirebaseToken } from '@firebaseConfig/utils';

export const isSubscribeFirebase = (privileges) => {
  if (getFirebaseToken() === '-') return false;

  const notifCategory = ['SMSA2P', 'GENERAL_PRODUCT', 'SERVICE_ASSURANCE'];
  const categories = privileges.map(({ category }) => category);
  const categoryWithNotif = categories.filter((c) => notifCategory.includes(c));

  return categoryWithNotif.length > 0;
};
