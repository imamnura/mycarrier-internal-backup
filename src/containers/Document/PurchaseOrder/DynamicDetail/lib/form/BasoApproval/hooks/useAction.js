import { useEffect, useState } from 'react';
import useResponsive from '@utils/hooks/useResponsive';

const useAction = (props) => {
  const { content, setContent, emptyDoc, orderNumber, onCloseSuccess } = props;

  const mobileClient = useResponsive('xs');

  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(0);
  const [scale, _setScale] = useState(1);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState(null);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [signatures, setSignatures] = useState(null);

  const [form, setForm] = useState({
    fullName: '',
    jobTitle: '',
    unit: '',
  });

  const reset = () => {
    setForm({
      fullName: '',
      jobTitle: '',
      unit: '',
      nik: '',
    });
    setStep(0);
    setSignatures(null);
    setPage(1);
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    setResizeStart(null);
    setResizeDirection(null);
  };

  const onClose = () => {
    setContent({ ...content, open: false });
    reset();
  };

  const setScale = (value) => () => _setScale(value);

  useEffect(() => {
    if (mobileClient) _setScale(0.5);
  }, [mobileClient]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onScrollDocument = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const pageHeight = scrollHeight / numPages;

    let currentPage = Math.round(scrollTop / pageHeight) + 1;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      currentPage = numPages;
    }

    currentPage = Math.min(Math.max(currentPage, 1), numPages);

    setPage(currentPage);
  };

  const handleMouseDown = (e, page) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - rect.left,
      // y: e.clientY - rect.top,
      y: e.clientY - rect.top - 10 + (page - 1) * (rect.height - 100),
    });
  };

  const handleResizeMouseDown = (e, page, direction) => {
    e.stopPropagation();
    e.preventDefault();
    setResizeStart({ x: e.clientX, y: e.clientY, page });
    setResizeDirection(direction);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizeStart(null);
  };

  const handleMouseMove = (e) => {
    const pageContainer = document.getElementById(`page-container-${page}`);
    if (!pageContainer) return;
    const rect = pageContainer.getBoundingClientRect();
    const wrapper = document.getElementById('wrapper-doc');
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const offsetLeft = (wrapperRect.width - rect.width) / 2;
    const offsetTop = rect.top - wrapperRect.top + wrapper.scrollTop;

    const maxResize = 200;

    if (isDragging) {
      setSignatures((prevSignature) => {
        let newX = e.clientX - rect.left - dragOffset.x + offsetLeft;
        let newY = e.clientY - rect.top - dragOffset.y + offsetTop;

        newX = Math.max(
          offsetLeft,
          Math.min(newX, offsetLeft + rect.width - prevSignature.width),
        );

        newY = Math.max(
          offsetTop,
          Math.min(newY, offsetTop + rect.height - prevSignature.height),
        );

        return { ...prevSignature, x: newX, y: newY, page };
      });
    }

    if (resizeStart && resizeDirection) {
      const { x, y, page: resizePage } = resizeStart;
      if (resizePage !== page) return;

      const dx = e.clientX - x;
      const dy = e.clientY - y;

      setSignatures((prevCoordinates) => {
        const newItem = { ...prevCoordinates };

        if (resizeDirection.includes('right')) {
          newItem.width = Math.min(
            maxResize,
            Math.max(50, prevCoordinates.width + dx),
          );
        }
        if (resizeDirection.includes('left')) {
          newItem.x = prevCoordinates.x + dx;
          newItem.width = Math.min(
            maxResize,
            Math.max(50, prevCoordinates.width - dx),
          );
        }
        if (resizeDirection.includes('bottom')) {
          newItem.height = Math.min(
            maxResize,
            Math.max(50, prevCoordinates.height + dy),
          );
        }
        if (resizeDirection.includes('top')) {
          newItem.y = prevCoordinates.y + dy;
          newItem.height = Math.min(
            maxResize,
            Math.max(50, prevCoordinates.height - dy),
          );
        }

        // Koreksi posisi saat resize agar tetap seimbang dengan kursor
        newItem.x = Math.max(
          offsetLeft,
          Math.min(newItem.x, offsetLeft + rect.width - newItem.width),
        );
        newItem.y = Math.max(
          offsetTop,
          Math.min(newItem.y, offsetTop + rect.height - newItem.height),
        );

        return newItem;
      });

      setResizeStart({ x: e.clientX, y: e.clientY, page });
    }
  };

  const deleteSignature = () => {
    setSignatures(null);
  };

  return {
    content,
    page,
    scale,
    step,
    onClose,
    emptyDoc,
    numPages,
    signatures,
    form,
    orderNumber,
    setForm,
    setSignatures,
    setScale,
    setStep,
    onScrollDocument,
    onDocumentLoadSuccess,
    handleMouseDown,
    handleResizeMouseDown,
    handleMouseUp,
    handleMouseMove,
    deleteSignature,
    setContent,
    onCloseSuccess,
  };
};

export default useAction;
