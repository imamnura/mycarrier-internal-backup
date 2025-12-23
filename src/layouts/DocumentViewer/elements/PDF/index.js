import dynamic from 'next/dynamic';

const PDF = dynamic(import('./PDF'), { ssr: false });

export default PDF;
