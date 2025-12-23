const DATA_NAME = 'previousPageURL';

export const getPreviousPageURL = () => {
  const prevURL = localStorage.getItem(DATA_NAME);
  return prevURL ? JSON.parse(prevURL) : [document.referrer || ''];
};

export const setPreviousPageURL = (url) => {
  localStorage.setItem(DATA_NAME, JSON.stringify(url));
};
