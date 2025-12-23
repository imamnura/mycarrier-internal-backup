const useAction = (props) => {
  const { data = {} } = props;

  let status = data?.status;

  const steps = ['Submitted', 'Completed'];

  const activeSteps = {
    completed: 1,
    approved: 1,
    'wds approved': 1,
  }[status];

  console.log(status);

  return {
    action: () => [],
    activeSteps,
    steps,
  };
};

export default useAction;
