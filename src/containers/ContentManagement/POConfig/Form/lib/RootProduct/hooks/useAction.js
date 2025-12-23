import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validation from '../../ModalRootProduct/validation';

const useAction = ({
  onFieldsChange,
  useForm: useFormParent,
  productId,
  data,
}) => {
  const [open, setOpen] = useState({ open: false, mode: '' });

  const formRootProduct = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      isAttributeAttached: false,
    },
  });

  const { handleSubmit, formState, reset } = formRootProduct;

  const { fields, move, remove, append, update } = useFieldArray({
    control: useFormParent.control,
    name: `form-root-product`,
  });

  const handleDrag = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  const handleDelete = (index) => () => remove(index);

  const onClickButtonRootProduct = (content) => () => setOpen(content);

  useEffect(() => {
    if (open?.open) {
      if (open?.mode === 'edit') {
        reset({
          ...open?.defaultValues,
        });
      }
    }

    return () => {
      reset({
        isAttributeAttached: false,
      });
    };
  }, [open?.open]);

  useEffect(() => {
    if (productId) {
      append(data?.rootProducts);
    }
  }, [productId]);

  const onSubmit = (values) => {
    if (open?.mode === 'edit') update(open?.index, values);
    else {
      append(values);
      reset({});
    }

    setOpen({ ...open, open: false });
  };

  useEffect(() => {
    onFieldsChange(fields);
  }, [fields, onFieldsChange]);

  return {
    open,
    setOpen,
    handleDrag,
    handleDelete,
    fields,
    append,
    update,
    onClickButtonRootProduct,
    handleSubmit,
    formState,
    formRootProduct,
    onSubmit,
  };
};

export default useAction;
