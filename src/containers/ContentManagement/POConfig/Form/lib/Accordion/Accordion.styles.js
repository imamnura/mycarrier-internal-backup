import { css } from '@emotion/css';

const useAccordionStyles = ({ rootEvent }) => {
  const menuIsOpen = !!rootEvent;

  return {
    title: css({
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '28px',
    }),
    accordionItem: css({
      margin: '0.5rem 0px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0px 0px 2px 0px #00000033, 0px 2px 10px 0px #0000001A',
      padding: '24px',
    }),
    accordionTitle: css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      cursor: 'pointer',
      alignItems: 'center',
    }),
    accordionContent: css({
      marginTop: '20px',
    }),
    arrow: css({
      color: '#2F424A !important',
      height: '16px !important',
      transform: menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
      transition: '200ms !important',
      width: '16px !important',
    }),
  };
};

export default useAccordionStyles;
