import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getPrivilege,
  getPrivilegeByRole,
  putRole,
  postCreateRole,
} from '@containers/Admin/Role/_repositories/repositories';
import { route } from '@configs/index';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { spaceToUnderscore, capitalize } from '@utils/text';
import { cleanObject, isHaveAccess } from '@utils/common';
import { replacer } from '@containers/Admin/Role/Add/utils';

const useAction = (props) => {
  const {
    setLoading,
    tab,
    setTab,
    formValues,
    feature,
    data: detailRole,
  } = props;

  const router = useRouter();
  const {
    query: { id: roleId },
  } = router;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const [listPrivilege, setListPrivilege] = useState([]);

  const fetchPrivilegeByType = async () => {
    setLoading(true);
    const _params = {
      page: 1,
      journeyName: '',
      type: formValues?.type,
      limit: 1000,
      sort: 'asc',
      orderBy: '',
      response: 'all',
    };

    const params = cleanObject(_params);

    try {
      const { data } = await getPrivilege({ params });
      setListPrivilege(data);
    } catch (error) {
      setListPrivilege([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrivilegeByRole = async (roleSlug, type) => {
    setLoading(true);

    try {
      const { data } = await getPrivilegeByRole(roleSlug, type);
      setListPrivilege(data?.privileges);
    } catch (error) {
      setListPrivilege([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 2) {
      if (roleId) {
        // edit and type role not change
        if (detailRole?.type === formValues?.type) {
          fetchPrivilegeByRole(detailRole?.roleSlug, detailRole?.type);
        } else {
          fetchPrivilegeByType();
        }
      } else {
        fetchPrivilegeByType();
      }
    } else {
      setLoading(false);
    }
  }, [tab]);

  const onCancel = () =>
    roleId
      ? router.push(route.role('detail', roleId))
      : router.push(route.role('list'));
  const onPrevious = () => setTab(1);

  const fetchSubmitRole = async () => {
    const payload = {
      roleSlug: spaceToUnderscore(formValues?.role),
      roleName: capitalize(formValues?.role),
      type: formValues?.type,
      privileges: listPrivilege,
    };

    const repository = roleId
      ? () => putRole({ data: { ...payload, roleId: roleId } }, roleId)
      : () => postCreateRole({ data: payload });

    setConfirmation();
    setLoadingAlert();

    try {
      await repository();
      setSuccessAlert({
        message: roleId
          ? 'Role successfully updated'
          : 'Role successfully added',
        onClose: () => onCancel(),
      });
    } catch (e) {
      setFailedAlert({
        message: e?.message || `Failed to ${roleId ? 'updated' : 'added'} role`,
      });
    }
  };

  const onSubmit = () => {
    if (
      roleId
        ? isHaveAccess(feature, 'update_role')
        : isHaveAccess(feature, 'create_role')
    ) {
      setConfirmation({
        message: `Are you sure want to ${roleId ? 'update' : 'add'} this role?`,
        action: [
          { children: 'no', variant: 'ghost', onClick: closeConfirmation },
          { children: 'yes', onClick: () => fetchSubmitRole() },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to ${
          roleId ? 'update' : 'add'
        } role.`,
      });
    }
  };

  const getJourney = (journey) => {
    const index = listPrivilege.findIndex((item) => item._id === journey._id);
    const normalizePrivilege = replacer(listPrivilege, index, journey);
    setListPrivilege(normalizePrivilege);
  };

  return {
    onCancel,
    onPrevious,
    onSubmit,
    listPrivilege,
    getJourney,
    roleId,
  };
};

export default useAction;
