import dynamic from 'next/dynamic';

const PopupConfirmation = dynamic(() => import('./PopupConfirmation'), {
  ssr: false,
});

export default PopupConfirmation;
