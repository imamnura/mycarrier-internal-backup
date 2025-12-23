import { makeStyles } from '@material-ui/core';
import { image } from '@configs/index';
import color from '@styles/color';

const useStyles = (variant) => {
  const variants = {
    primary: {
      background: color.primary.soft,
      border: `1px solid ${color.primary.main}`,
    },
    success: {
      background: color.green.soft,
      border: `1px solid ${color.green.main}`,
    },
  };

  return makeStyles(() => ({
    container: {
      backgroundImage: `url(${image.BackgroundAchievement})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      margin: '-40px -40px 0 -40px',
      height: '14.5rem',
      width: '100vw',
    },
    coin: {
      height: '1.5rem',
      width: '1.5rem',
    },
    docValue: {
      ...variants[variant],
      borderRadius: 8,
      overflowX: 'auto',
      padding: '1rem 0px',
      textAlign: 'center',
      width: '90%',
      // marginTop: 8
    },
    title: {
      alignItems: 'center',
      display: 'flex',
    },
    label: {
      display: 'flex',
      marginTop: '0.75rem',
      marginBottom: '0.75rem',
    },
    labelPoint: {
      display: 'flex',
      marginBottom: '0.5rem',
    },
    grid: {
      marginTop: '2.5rem',
      marginBottom: '1.7rem',
    },
    logo: {
      height: '5.75rem',
      width: '5.75rem',
    },
  }))();
};

export default useStyles;
