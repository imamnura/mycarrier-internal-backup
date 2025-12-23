import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getDataMicrositePOBaso } from '@containers/Microsite/_repositories/repositories';
import { titleCapitalize } from '@utils/common';

const useActions = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  const schema = [
    {
      title: '',
      type: 'information',
      properties: {
        data: data,
        schema: [
          { name: 'approvedBy', label: 'Name' },
          { name: 'approvedJobTitle', label: 'Job Title' },
          { name: 'approvedUnit', label: 'Unit' },
          { name: 'approvedAt', label: 'Time' },
        ],
      },
    },
  ];

  const fetchDetail = async (micrositeId) => {
    setLoading(true);
    try {
      const { data } = await getDataMicrositePOBaso({
        params: {
          micrositeId,
        },
      });
      setData({
        ...data,
        orderType: titleCapitalize(data?.orderType),
      });
    } catch (e) {
      setData(null);
      setError({
        message: 'Invalid QR Code',
        description:
          e?.message ||
          'This QR code is not yet approved or officially issued via MyCarrier. Please check and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail(id);
    }
  }, [id]);

  return {
    data,
    isLoading,
    error,
    schema,
  };
};

export default useActions;
