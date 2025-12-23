import React from 'react';
import CardInfo from '@components/CardInfo';
import useResponsive from '@utils/hooks/useResponsive';
import useAction from './hooks/useAction';
import PieChartTotal from '../PieChartTotal';
import useStyles from './Summary.styles';

const Summary = (props) => {
  const { filterStatus } = props;
  const { data, loading, onClickCard } = useAction(props);
  const mobileClient = useResponsive('sm');
  const classes = useStyles({ mobileClient });

  const cardSchema = [
    {
      content: data?.totalSubmitted,
      title: 'Submitted',
      variant: 'information',
    },
    {
      content: data?.totalInProgress,
      title: 'In Progress',
      variant: 'warning',
    },
    {
      content: data?.totalFailed,
      title: 'Failed',
      variant: 'primary',
    },
    {
      content: data?.totalCompleted,
      title: 'Completed',
      variant: 'success',
    },
    {
      content: data?.totalCanceled,
      title: 'Canceled',
      variant: 'error',
    },
  ];

  return (
    <>
      <section className={classes.wrapper}>
        <PieChartTotal data={data} loading={loading} />
        <div className={classes.cardContainer}>
          {cardSchema.map((v) => (
            <div key={v.title} className={classes.card}>
              <CardInfo
                design="basic"
                content={v.content}
                loading={loading}
                onClick={onClickCard(v.title)}
                isActive={filterStatus.value === v.title}
                title={v.title}
                variant={v.variant}
              />
            </div>
          ))}
        </div>
      </section>
      <div className={classes.border} />
    </>
  );
};

export default Summary;
