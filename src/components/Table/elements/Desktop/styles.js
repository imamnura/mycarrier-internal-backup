import { makeStyles } from '@material-ui/core';
import color from '../../../../styles/color';
import { importantCss } from '@utils/common';
import useResponsive from '@utils/hooks/useResponsive';

const useStyles = ({
  size,
  customBody,
  customItem,
  headerAlign,
  maxHeight,
  customStyles,
}) => {
  const smClient = useResponsive('sm');

  let additionalStyle = {
    root: {},
  };

  if (customStyles.root) {
    additionalStyle.root = customStyles.root;
  }

  if (customStyles.pageInformation) {
    additionalStyle.pageInformation = customStyles.pageInformation;
  }

  return makeStyles((theme) => ({
    boxNotFound: {
      alignItems: 'center',
      background: color.white,
      display: 'flex',
      flexDirection: 'column',
      height: maxHeight ? maxHeight - 56 : size * 56,
      justifyContent: 'center',
      width: '100%',
      position: 'sticky',
      left: 0,
    },
    flex: theme.flex,
    loadingRow: {
      borderBottom: `1px solid ${color.general.light}`,
      height: 56,
      padding: 8,
    },
    notFoundIcon: {
      height: 160,
      width: 160,
    },
    pageInformation: {
      backgroundColor: color.white,
      borderTop: `1px solid ${color.general.light}`,
      bottom: -1,
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: -1,
      padding: 8,
      position: 'sticky',
      textAlign: 'right',
      width: '100%',
      ...additionalStyle.pageInformation,
    },
    pageInformationPagination: {
      backgroundColor: color.white,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      ...additionalStyle.pageInformation,
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: smClient ? 'column' : 'row',
      flexWrap: 'wrap',
      gap: 16,
      width: '100%',
      marginTop: '10px',
      paddingTop: 0,
      alignItems: 'center',
    },
    root: {
      overflow: 'auto',
      position: 'relative',
      maxHeight: maxHeight || '100%',
      ...additionalStyle.root,
    },
    sortIcon: {
      height: 12,
      transition: '200ms',
      width: 12,
    },
    sortIconRotate: {
      transform: 'rotate(180deg)',
    },
    table: {
      background: color.white,
      borderCollapse: 'separate',
      borderSpacing: 0,
      width: '100%',
    },
    tbItem: {
      alignItems: 'center',
      display: 'flex',
      minHeight: 56,
      padding: '7px 12px',
      ...customItem,
    },
    tBody: {
      transition: '200ms',
      '&:not(:last-child) > td': {
        borderBottom: `1px solid #D9DDE3`,
        backgroundColor: 'white',
        zIndex: 1,
      },
      '&:first-child > td': {
        backgroundColor: 'white',
        zIndex: 1,
      },
      '&:nth-of-type(even) > td': {
        backgroundColor: '#F7F8F9',
        zIndex: 1,
      },
      '&:nth-of-type(odd) > td': {
        backgroundColor: 'white',
        zIndex: 1,
      },
      ...customBody,
    },
    tBodyClickable: {
      '&:hover > td': {
        transition: '200ms',
        // background: importantCss(color.primary.soft),
        background: '#FEF5F5',
        color: color.primary.main,
      },
      cursor: 'pointer',
    },
    tBodyPicked: {
      '& > td': {
        background: importantCss(color.primary.soft),
      },
      // background: color.primary.soft,
      color: color.primary.main,
      cursor: 'pointer',
    },
    tHeader: {
      zIndex: 2,
      background: 'white',
      position: 'sticky',
      top: 0,
      '& td': {
        background: 'white',
        borderBottom: '1px solid #87959B',
        borderTop: '1px solid #87959B',
      },
    },
    thItem: {
      alignItems: 'center',
      color: color.general.main,
      display: 'flex',
      minHeight: 48,
      padding: '0px 12px',
      justifyContent: headerAlign,
    },
    thItemSortable: {
      '&:hover': {
        color: color.general.mid,
      },
      cursor: 'pointer',
      transition: '200ms',
      userSelect: 'none',
    },
    tooltipHead: {
      flexFlow: 'row-reverse',
      justifyContent: 'flex-end',
    },
    wrapperPagination: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
  }))();
};

export default useStyles;
