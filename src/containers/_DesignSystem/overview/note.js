import Note from '@components/Note';

const noteOverview = {
  component: Note,
  variant: [
    {
      name: 'Success',
      grid: 6,
      props: {
        message: 'Example of Success Message',
        variant: 'success',
      },
    },
    {
      name: 'Danger',
      grid: 6,
      props: {
        message: 'Example of Danger Message',
        variant: 'danger',
      },
    },
  ],
};

export default noteOverview;
