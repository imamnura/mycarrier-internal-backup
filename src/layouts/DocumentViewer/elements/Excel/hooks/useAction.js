import { useContext, useEffect, useState } from 'react';
import DocumentViewerContext from '@context/DocumentViewer';
import { read, utils } from 'xlsx';

const useAction = () => {
  const {
    data: { url, action, onClose, title },
  } = useContext(DocumentViewerContext);

  const [loading, setLoading] = useState(true);
  const [excelData, setExcelData] = useState({ data: [], header: [] });

  const fetchDocument = async () => {
    setLoading(true);
    try {
      const result = await fetch(url);
      const f = await result.arrayBuffer();
      const wb = read(f);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = utils.sheet_to_json(ws);
      const header = Object.keys(data[0]);

      setExcelData({
        header,
        data,
      });

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
      setExcelData([]);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  const onDownload = (onClick) => () => {
    onClick(url);
  };

  return {
    excelData,
    url,
    title,
    action,
    onClose,
    onDownload,
    loading,
  };
};

export default useAction;
