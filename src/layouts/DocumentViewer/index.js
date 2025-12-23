import dynamic from 'next/dynamic';

const DocumentViewer = dynamic(() => import('./DocumentViewer'), {
  ssr: false,
});

export default DocumentViewer;
