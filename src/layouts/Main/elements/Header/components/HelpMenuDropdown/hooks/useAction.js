import { getAccessToken, isAfterLogin } from '@utils/common';
import { useEffect, useState } from 'react';
import { getVersionInfo } from '../_repositories/repositories';

const useAction = () => {
  const [data, setData] = useState(null);
  const [open, _setOpen] = useState(null);

  const setOpen = (val) => (event) => {
    if (val) {
      _setOpen(event.currentTarget);
    } else {
      _setOpen(null);
    }
  };

  const fetchData = async () => {
    try {
      const { data: result } = await getVersionInfo();
      setData(result);
    } catch (error) {
      setData(null);
    }
  };

  useEffect(() => {
    if (isAfterLogin() && getAccessToken()) {
      fetchData();
    }
  }, []);

  const onClickUserGuide = () => {
    window.open(
      'https://drive.google.com/drive/u/0/folders/165pvOf4bsbFqPqn7IQTOdxDQIbSxLhiR',
    );
  };

  // const onClickUserGuide = () => {
  //   const cat = data?.privileges?.find(({ category }) => category === privileges.service.userGuide.category);
  //   const menu = cat?.feature.find(({ name }) => name === privileges.service.userGuide.page);

  //   const featureUserGuide = menu?.function || [];

  //   let userGuideUrl = [];

  //   if (!isHaveAccess(featureUserGuide, 'user_guide_a')) {
  //     userGuideUrl.push(
  //       'https://docs.google.com/presentation/d/1VJs6ZmYMhVhRRt011bFHkARc4q6K36JQNTlJI-UUABo/edit?usp=sharing'
  //     );
  //   }

  //   userGuideUrl.map(url => window.open(url));
  // };

  return {
    fetchData,
    data,
    open,
    setOpen,
    onClickUserGuide,
  };
};

export default useAction;
