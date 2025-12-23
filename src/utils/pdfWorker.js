import pdfWorker from 'pdfjs-dist/build/pdf.worker';
import pdfWorkerMin from 'pdfjs-dist/build/pdf.worker.min';

export default process.env.NODE_ENV === 'production' ? pdfWorkerMin : pdfWorker;
