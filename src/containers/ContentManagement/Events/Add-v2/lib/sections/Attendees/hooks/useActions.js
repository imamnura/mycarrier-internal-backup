import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validation } from '../yupResolver';

const useActions = (props) => {
  const {
    useForm: { _getValues, _setValue },
  } = props;

  const { formState, control, getValues, resetField, setError } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
  });

  const handleAddAttendee = () => {
    const itExist = _getValues('attendees').filter(
      (name) => name.toLowerCase() === getValues('attendee').toLowerCase(),
    );

    if (itExist.length !== 0) {
      setError('attendee', {
        type: 'custom',
        message: 'Attendee already exists',
      });
    } else {
      _setValue('attendees', [
        ..._getValues('attendees'),
        getValues('attendee'),
      ]);
      resetField('attendee');
    }
  };

  const handleDeleteAttendee = (i) => {
    const all = [..._getValues('attendees')];
    all.splice(i, 1);

    _setValue('attendees', all);
  };

  const valueAttendees = _getValues('attendees');

  return {
    _getValues,
    formState,
    control,
    handleAddAttendee,
    handleDeleteAttendee,
    valueAttendees,
  };
};

export default useActions;
