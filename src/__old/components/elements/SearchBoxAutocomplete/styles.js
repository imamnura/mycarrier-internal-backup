const styles = (theme) => ({
  field: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.color.general.mid,
      },
    },
    borderRadius: 8,
  },
});

export default styles;
