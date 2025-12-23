import {
  getPaymentDocumentFormulaInfo,
  getPaymentHistoryList,
  postPaymentHistoryFile,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import moment from 'moment';
import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

const useAction = ({ feature }, ref) => {
  const [date, setDate] = useState(moment());

  const formattedDate = moment(date).format('DD-MM-YYYY');

  const { setLoadingAlert, setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [popUpListSubmit, setPopUpListSubmit] = useState({
    date: moment(),
    open: false,
    type: 'BNI',
    data: [],
    failed: [],
  });

  const onUpload = (type) => async (file) => {
    setLoadingAlert();
    const payload = new FormData();
    payload.append('type', type);
    payload.append('date', formattedDate);
    payload.append('file', file.file);

    try {
      const result = await postPaymentHistoryFile(payload);
      if (type === 'Payment') {
        setSuccessAlert({
          message: result?.message || 'Success upload payment document',
        });
      } else {
        setSuccessAlert({ message: '' });
        setPopUpListSubmit({
          date,
          type,
          open: true,
          data: result.data.notified,
          failed: result.data.failed,
          file: file.file,
        });
      }
    } catch (error) {
      setFailedAlert({ message: error?.message });
      if (type !== 'Payment') {
        setPopUpListSubmit({
          date,
          type,
          open: false,
          data: [],
          failed: [],
          file: null,
        });
      }
    }
  };

  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });
  const [page, setPage] = useState(1);

  const [loadingTable, _setLoadingTable] = useState({
    root: true,
    row: false,
  });

  const setLoadingTable = ({ root, row }) => {
    const resRoot = typeof root === 'boolean' ? root : loadingTable.root;
    const resRow = typeof row === 'boolean' ? row : loadingTable.row;

    _setLoadingTable({
      root: resRoot,
      row: resRow,
    });
  };

  const loading = {
    tableRoot: loadingTable.root,
    tableRow: loadingTable.row,
  };

  const containerRef = useRef(null);

  const fetchList = async (resetData) => {
    const oldData = resetData ? [] : list.data;

    const params = {
      date: formattedDate,
      page: resetData ? 1 : page,
      size: parseInt(containerRef.current?.clientHeight / 56 + 2),
    };

    const loadings = !loadingTable.root && !loadingTable.row;

    if (loadings || resetData) {
      if (resetData) setLoadingTable({ root: true });
      else setLoadingTable({ row: true });

      try {
        const result = await getPaymentHistoryList({
          params,
          withCancel: true,
        });
        const { data, meta } = result;
        const hasMore = meta.page >= meta.totalPage ? false : true;
        const newData = data || [];
        const normalize = {
          data: [...oldData, ...newData],
          hasMore,
          meta: { ...meta, updatedOn: meta.latestUpdate },
        };
        setPage(meta.page + 1);
        setList(normalize);
        setLoadingTable({
          root: false,
          row: false,
        });
      } catch (error) {
        setLoadingTable({
          root: false,
          row: false,
        });
        setList({
          data: [],
          hasMore: false,
          meta: {},
        });
      }
    }
  };

  useImperativeHandle(ref, () => ({
    onRefresh: () => {
      setPage(1);
      fetchList(true);
    },
  }));

  useEffect(() => {
    if (isHaveAccess(feature, 'create_upload_historical_payment')) {
      if (containerRef.current) {
        setPage(1);
        fetchList(true);
      }
    } else {
      setLoadingTable({
        root: false,
        row: false,
      });
      setList({
        data: [],
        hasMore: false,
        meta: {},
      });
    }
  }, [formattedDate, containerRef]);

  const onBottomPage = () => {
    if (list.hasMore) {
      fetchList(false);
    }
  };

  const onClosePopUpListSubmit = () => {
    setPopUpListSubmit({
      date: moment(),
      open: false,
      type: 'BNI',
      data: [],
      file: null,
    });
    setPage(1);
    fetchList(true);
  };

  const isNotToday = useMemo(
    () => moment(date).isBefore(new Date(), 'day'),
    [date],
  );

  const onUploadPayDocument = async (e) => {
    const file = e.target.files[0];

    if (file.size > 5242880) {
      setFailedAlert({ message: 'Maximum file is 5 MB' });
      return;
    }

    try {
      setLoadingAlert();
      const payload = new FormData();
      payload.append('file', file);
      payload.append('type', 'Payment');
      payload.append('date', new Date().toJSON());
      const result = await postPaymentHistoryFile(payload);
      setSuccessAlert({ message: result.message });
      fetchPaymentFormula();
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const [paymentFormula, setPaymentFormula] = useState(null);

  const fetchPaymentFormula = async () => {
    try {
      const result = await getPaymentDocumentFormulaInfo();
      setPaymentFormula(result.data);
    } catch (error) {
      setPaymentFormula(null);
    }
  };

  useEffect(() => {
    fetchPaymentFormula();
  }, []);

  return {
    containerRef,
    date,
    fetchList,
    isNotToday,
    list,
    loading,
    onBottomPage,
    onClosePopUpListSubmit,
    onUpload,
    onUploadPayDocument,
    paymentFormula,
    popUpListSubmit,
    refPaymentHistorical: ref,
    setDate,
  };
};

export default useAction;
