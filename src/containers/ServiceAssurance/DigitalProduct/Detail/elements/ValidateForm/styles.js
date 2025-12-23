import { css } from '@emotion/css';
import useResponsive from '@utils/hooks/useResponsive';

const useStyles = () => {
  const mobileClient = useResponsive('xs');
  const smallDesktop = useResponsive('md');

  return {
    modal: css({
      '& .legion-modal__dialog': {
        padding: '24px 32px',
        width: mobileClient ? '80%' : '522px',
        maxHeight: smallDesktop ? '600px' : '710px',
        overflow: 'auto',
      },
    }),
    action: css({
      display: 'flex',
      justifyContent: 'end',
      gap: 16,
      marginTop: '24px',
    }),
  };
};

export default useStyles;
