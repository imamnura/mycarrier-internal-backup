import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    imagePreview: {
      width: '100%',
      borderRadius: '.5rem',
      marginBottom: '12px',
    },
    chip: {
      marginLeft: '4px',
      marginTop: '12px',
    },
    textTitleThumbnail: {
      display: '-webkit-box',
      textAlign: 'left',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      fontWeight: '700 !important',
      WebkitLineClamp: '2',
      marginBottom: '10px',
    },
    sectionCaption: {
      display: '-webkit-box',
      overflow: 'hidden',
      textAlign: 'left',
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: '4',
    },
    contentKeyword: {
      background: '#f5f5f5',
      borderRadius: '4px',
      color: '#9E9E9E',
      display: 'inline-block',
      fontWeight: '700',
      marginBottom: '0.3rem',
      marginRight: '5px',
      padding: '4px',
    },
  }))();
};

export default useStyles;
