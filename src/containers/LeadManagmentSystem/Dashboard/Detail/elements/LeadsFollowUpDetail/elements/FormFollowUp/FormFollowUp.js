import React from 'react';
import Category from './elements/Category';
import useAction from './hooks/useAction';

const FormFollowUp = (props) => {
  const {
    categoryForm,
    followUpForm,
    Form,
    onCloseCategory,
    onCloseFollowUp,
    onSubmitCategory,
    onSubmitFollowUp,
    status,
  } = useAction(props);

  return (
    <>
      <Category
        {...categoryForm}
        onClose={onCloseCategory}
        onSubmit={onSubmitCategory}
        status={status}
        {...props}
      />
      <Form
        {...followUpForm.formProps}
        onClose={onCloseFollowUp}
        onSubmit={onSubmitFollowUp}
        status={status}
      />
    </>
  );
};

export default FormFollowUp;
