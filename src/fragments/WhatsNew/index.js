import dynamic from 'next/dynamic';

const WhatsNew = dynamic(() => import('./WhatsNew'), {
  ssr: false,
});

export default WhatsNew;
