import { useContext, useEffect, useState } from 'react';
import useResponsive from '@utils/hooks/useResponsive';
import DocumentViewerContext from '@context/DocumentViewer';

const useAction = () => {
  const { data } = useContext(DocumentViewerContext);
  const { action, centered, onClose, title, url } = data;

  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);

  const mobileClient = useResponsive('xs');
  const [scale, _setScale] = useState(1);

  const setScale = (value) => () => _setScale(value);

  useEffect(() => {
    if (mobileClient) _setScale(0.5);
  }, [mobileClient]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onScrollDocument = (event) => {
    // const { scrollTop, scrollHeight } = event.target;
    // const d = new Array(numPages).fill(Math.ceil(scrollHeight / numPages));
    // let z = [];
    // d.forEach((v, i) => {
    //   const offset = i > 0 ? v + z[i - 1] : v;
    //   z.push(offset - offset / 2);
    // });
    // z.forEach((offset, index) => {
    //   if (index > 0) {
    //     if (scrollTop < offset && scrollTop > z[index - 1]) setPage(index + 1);
    //   } else {
    //     if (scrollTop < offset) setPage(index + 1);
    //   }
    // });

    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const pageHeight = scrollHeight / numPages;

    let currentPage = Math.round(scrollTop / pageHeight) + 1;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      currentPage = numPages;
    }

    currentPage = Math.min(Math.max(currentPage, 1), numPages);

    setPage(currentPage);
  };

  const onDownload = (onClick) => () => {
    onClick(url);
  };

  return {
    action,
    centered,
    numPages,
    onClose,
    onDocumentLoadSuccess,
    onDownload,
    onScrollDocument,
    page,
    scale,
    setScale,
    title,
    url,
  };
};

export default useAction;
