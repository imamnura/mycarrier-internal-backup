import dynamic from 'next/dynamic';

const PopupAlert = dynamic(() => import('./PopupAlert'), {
  ssr: false,
});

export default PopupAlert;
