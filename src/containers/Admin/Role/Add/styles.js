import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  const baseAccordion = {
    '&$expanded': {
      margin: '0!important',
      minHeight: 'auto!important',
    },
    '&:before': {
      display: 'none',
    },
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    border: 'none',
    boxShadow: 'none',
    expanded: {},
    minHeight: 'auto',
  };

  const iconCheckbox = {
    border: '2px solid',
    borderColor: '#3B525C',
    borderRadius: '3px',
    color: '#3B525C',
    marginLeft: '3px',
  };

  const baseSummary = {
    '& .MuiAccordionSummary-content': {
      '& .MuiFormControlLabel-root': {
        '& .MuiCheckbox-root': {
          padding: '0 5px',
        },
      },
    },
    '& .MuiAccordionSummary-expandIcon': {
      padding: '0 12px',
    },
    '& div': {
      margin: '0',
    },
    padding: '0',
    ...baseAccordion,
  };

  const label = {
    color: '#78858B',
    fontSize: '12px',
    fontWeight: 'normal',
    margin: '4px 0 12px 0',
    paddingLeft: '24px',
  };

  return makeStyles((theme) => ({
    accordion: {
      '&:(first-child)': {
        paddingTop: '13px',
      },
      ...baseAccordion,
      paddingBottom: '13px',
    },
    accordionDetail: {
      '& .MuiFormControlLabel-root': {
        '& .MuiCheckbox-root': {
          padding: '0 5px',
        },
      },
      display: 'block',
      marginLeft: '20px',
      padding: '13px 0 0 0',
      ...baseAccordion,
    },
    accordionSummary: {
      ...baseSummary,
    },
    accordionSummaryJourney: {
      ...baseSummary,
      '& .MuiFormControlLabel-label': {
        fontWeight: '700',
        textTransform: 'uppercase',
      },
    },
    captionFuntion: {
      ...label,
    },
    checkboxCustom: {
      '& .MuiIconButton-label': {
        position: 'relative',
        zIndex: 0,
      },
    },
    expanded: { margin: '0!important' },

    formControl: {
      margin: theme.spacing(3),
    },
    icon: {
      ...iconCheckbox,
    },
    iconDisabled: {
      ...iconCheckbox,
      borderColor: 'rgba(0, 0, 0, 0.26)',
      color: 'rgba(0, 0, 0, 0.26)',
    },
    labelActive: {
      ...label,
      color: theme.color.general.main,
    },
    labelFormActive: {
      '& .MuiFormControlLabel-label': {
        color: theme.color.general.main,
      },
    },
    root: {
      display: 'flex',
    },
    subtitle: {
      marginBottom: '22px',
      marginTop: '24px',
    },
  }))();
};

export default useStyles;
