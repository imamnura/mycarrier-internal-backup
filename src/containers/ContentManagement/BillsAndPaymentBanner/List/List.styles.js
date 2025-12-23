import color from '@styles/color';
import { css } from '@emotion/css';

const section = {
  '& p': {
    fontSize: 16,
    fontWeight: 500,
  },
  alignItems: 'center',
  border: `1px solid #B3C3CA`,
  borderRadius: 16,
  cursor: 'pointer',
  display: 'flex',
  margin: '0 25px 16px 25px',
  padding: '10px 20px',
};

const useListStyles = () => {
  return {
    buttonContainer: css({
      '& button': {
        margin: '0 6px',
      },
      display: 'flex',
      justifyContent: 'center',
      marginTop: '24px',
    }),
    icon: css({
      // color: theme.color.general.light,
      '&:hover': {
        fill: `${color.primary.main}`,
      },
    }),
    iconActive: css({
      color: `${color.primary.main}`,
    }),
    listAction: css({
      display: 'flex',
      alignItems: 'center',
    }),
    sectionItem: css({
      ...section,
      '&:hover': {
        backgroundColor: `${color.primary.soft}`,
        border: `1px solid ${color.primary.soft}`,
        color: `${color.primary.main}`,
      },
    }),
    sectionItemActive: css({
      ...section,
      backgroundColor: `${color.primary.soft}`,
      border: `1px solid ${color.primary.soft}`,
      color: `${color.primary.main}`,
    }),
    dialogRoot: css({
      borderRadius: '16px !important',
      padding: '32px 40px',
      width: 444,
    }),
    dialogRootReorder: css({
      borderRadius: '16px !important',
      padding: '32px 40px',
      width: 1054,
    }),
    tableContainer: css({
      maxHeight: '70vh',
      overflowY: 'auto',
      overflowX: 'hidden',
      margin: 0,
    }),
  };
};

export default useListStyles;
