import { useEffect, useState } from 'react';
import { getDetailProfile } from '../_repositories/repositories';

const useActions = (props) => {
  const { feature } = props;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewPrivilege, setPreviewPrivilege] = useState({
    data: [],
    loading: false,
  });

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const { data } = await getDetailProfile();
      setData(data);

      const res = data?.privileges.map(({ journey, category }) => {
        return {
          title: journey,
          child: category.map(({ title, feature }) => ({
            title: title,
            child: feature.map(({ name, function: func }) => ({
              title: name,
              child: func.map(({ title, description }) => ({
                title: title,
                subTitle: description,
              })),
            })),
          })),
        };
      });
      setPreviewPrivilege((prev) => ({ ...prev, loading: false, data: res }));
    } catch (e) {
      setData({});
      setPreviewPrivilege((prev) => ({ ...prev, loading: false, data: [] }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return {
    data,
    feature,
    loading,
    previewPrivilege,
  };
};

export default useActions;
