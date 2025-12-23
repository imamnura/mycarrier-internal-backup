import { useState } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { array, object, string } from 'yup';

const useAction = (props) => {
  const { control, orderType } = props;
  const [open, setOpen] = useState(false);

  const { fields, move, remove, append, update } = useFieldArray({
    control,
    name: `form.${orderType}`,
    rules: {
      validate: async (value) =>
        array()
          .of(
            object().shape({
              formtype: string().required().label('Form Type'),
            }),
          )
          .min(1)
          .validate(value)
          .then(() => true)
          .catch((err) => err?.message),
    },
  });

  const isCustom = useWatch({
    control,
    name: 'isCustom',
  });

  const handleDrag = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  const handleDelete = (index) => () => remove(index);

  const onClickButtonNewForm = (content) => () => setOpen(content);

  return {
    open,
    setOpen,
    onClickButtonNewForm,
    handleDelete,
    handleDrag,
    fields,
    append,
    update,
    isCustom,
  };
};

export default useAction;
