import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getDownloadUserManagement,
  getListUserManagement,
  getOptionsRoleType,
  getOptionsSegment,
} from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { dialog } from '@fragments/DownloadAuthorization/dialog-bridge';


const useAction = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setLoadingAlert, setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [filterSegment, setFilterSegment] = useState({
    label: 'All Segment',
    value: '',
  });
  const [filterRoleType, setFilterRoleType] = useState({
    label: 'All Role Type',
    value: '',
  });
  const [filterUserType, setFilterUserType] = useState({
    label: 'All User Type',
    value: '',
  });

  const [optionsFilter, setOptionsFilter] = useState({
    roleType: [],
    segment: [],
  });

  const [loadingFilter, setLoadingFilter] = useState({
    roleType: true,
    segment: true,
  });

  const fetchOptionSegment = async () => {
    setLoadingFilter((prev) => ({
      ...prev,
      segment: true,
    }));

    try {
      const result = await getOptionsSegment();
      const opt = result.data.map(({ id, name }) => ({
        value: id,
        label: name,
      }));

      setOptionsFilter((prev) => ({ ...prev, segment: opt }));
      setLoadingFilter((prev) => ({ ...prev, segment: false }));
    } catch (error) {
      setOptionsFilter((prev) => ({ ...prev, segment: [] }));
      setLoadingFilter((prev) => ({ ...prev, segment: false }));
    }
  };

  const fetchOptionRoleType = async () => {
    setLoadingFilter((prev) => ({
      ...prev,
      segment: true,
    }));

    try {
      const result = await getOptionsRoleType();
      const opt = result.data.map(({ roleSlug, roleName }) => ({
        value: roleSlug,
        label: roleName,
      }));

      setOptionsFilter((prev) => ({ ...prev, roleType: opt }));
      setLoadingFilter((prev) => ({ ...prev, roleType: false }));
    } catch (error) {
      setOptionsFilter((prev) => ({ ...prev, roleType: [] }));
      setLoadingFilter((prev) => ({ ...prev, roleType: false }));
    }
  };

  useEffect(() => {
    fetchOptionSegment();
    fetchOptionRoleType();
  }, []);

  const fetchList = async (newPage) => {
    const payload = {
      page: newPage ? newPage : page,
      search,
      userType: filterUserType.value,
      isRequested: '',
      limit: size,
      role: filterRoleType.value,
      status: filterStatus.value,
      segment: filterSegment.value,
    };

    const params = cleanObject(payload);

    const validatePath = router.pathname === route.user('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const result = await getListUserManagement({
          params,
          withCancel: true,
        });
        const { data, meta } = result;
        const normalize = { data, meta };
        setList(normalize);
      } catch (error) {
        setList({
          data: [],
          meta: {},
        });
      } finally {
        setLoadingTable(false);
      }
    }
  };

  useEffect(() => {
    setPage(1);
    fetchList(1);
  }, [search, filterStatus, filterRoleType, filterSegment, filterUserType]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail')) {
      router.push(route.user('detail', data.userId));
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail user.",
      });
    }
  };

  const onClickAddUser = () => router.push(route.user('create'));

  const [formDownload, _setFormDownload] = useState(false);
  const setFormDownload = (val) => () => _setFormDownload(val);

  const onSubmitDownload = async ({ email }) => {
    _setFormDownload(false);
    setLoadingAlert();

    const _params = {
      email,
      search,
      userType: filterUserType.value,
      role: filterRoleType.value,
      status: filterStatus.value,
      segment: filterSegment.value,
      nameApp: 'mycarrier',
      orderBy: 'createdAt',
      sort: 'desc',
    };

    const params = cleanObject(_params);

    try {
      await getDownloadUserManagement({ params });
      await setSuccessAlert({
        message:
          "Your download request was successful! Please check your spam folder if it does'nt arrive in your inbox",
      });
    } catch (error) {
      if (error.code === 403) {
        dialog.show('Forbidden download');
        return;
      }
      setFailedAlert({ message: error.message });
    }
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    feature,
    filterRoleType,
    filterSegment,
    filterStatus,
    filterUserType,
    formDownload,
    list,
    loadingFilter,
    onClickAddUser,
    onClickRowTable,
    onSubmitDownload,
    optionsFilter,
    search,
    setFilterRoleType,
    setFilterSegment,
    setFilterStatus,
    setFilterUserType,
    setFormDownload,
    setSearch,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useAction;
