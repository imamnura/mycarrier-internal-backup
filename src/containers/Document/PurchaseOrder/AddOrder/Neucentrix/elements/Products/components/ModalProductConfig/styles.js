import { css } from '@emotion/css';

const useStyles = () => {
  return {
    dialogRoot: css({
      borderRadius: 8,
      overflow: 'auto',
      padding: '12px 16px',
      width: '848px',
    }),
    wrapper: css({
      display: 'flex',
      flexDirection: 'column',
    }),
    headerWrapper: css({
      display: 'flex',
      justifyContent: 'space-between',
      gap: 24,
      width: '100%',
      padding: '12px 16px 12px 16px',
    }),
    titleWrapper: css({
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      marginBottom: 16,
    }),
    stepperWrapper: css({
      minWidth: 256,
      flexGrow: 1,
    }),
    footerWrapper: css({
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      width: '100%',
      padding: '12px 16px 12px 16px',
    }),
    contentConfigWrapper: css({
      marginTop: '-16px',
      maxHeight: '90vh',
      // overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: '12px 16px',
    }),
    contentPricingWrapper: css({
      marginTop: '-16px',
      maxHeight: '60vh',
      overflowY: 'auto',
      gap: 20,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
    }),
    pricingProductChildWrapper: css({
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: 12,
      gridColumn: 'span 2',
    }),
    totalPriceSection: css({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      width: '100%',
      height: 90,
      gap: 16,
    }),
    attributeContainer: css({
      border: '1px solid #e0e0e0', // Example border color, adjust as needed
      padding: '16px',             // Example padding
      borderRadius: '4px',         // Example border radius
      marginTop: '8px',
      gap: 12,
      display: 'flex',
      flexDirection: 'column'           // Optional margin top
    }),
  };
};

export default useStyles;
