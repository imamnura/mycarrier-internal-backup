import { getAllRole } from '@containers/Admin/Role/_repositories/repositories';
import { capitalize } from '@utils/text';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { route } from '@configs/index';

const useAction = (props) => {
  const { setTab, formValues, data: detailRole } = props;
  const router = useRouter();
  const {
    query: { id: roleId },
  } = router;

  const { setFailedAlert } = usePopupAlert();

  const onSubmit = async () => {
    try {
      const { data } = await getAllRole();
      const roleExist = data.find(
        (i) =>
          i?.roleName === capitalize(formValues?.role) &&
          i?.type === formValues?.type,
      );

      if (roleExist) {
        if (detailRole?.roleName !== formValues?.role) {
          //edit with name role not same
          setFailedAlert({
            message: `Role ${formValues?.role} with type ${formValues?.type} already exists`,
          });
        } else {
          setTab(2);
        }
      } else {
        setTab(2);
      }
    } catch (e) {
      setFailedAlert({ message: e?.message || 'Failed to fetch check role' });
    }
  };

  const onCancel = () =>
    roleId
      ? router.push(route.role('detail', roleId))
      : router.push(route.role('list'));

  return {
    onCancel,
    onSubmit,
    roleId,
  };
};

export default useAction;
