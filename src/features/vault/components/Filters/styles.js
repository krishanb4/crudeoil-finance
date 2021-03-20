const styles = theme => ({
  container: {
    padding: '24px',
    margin: '8px 0 2rem',
    border: '1px solid ' + theme.palette.background.border,
    backgroundColor: theme.palette.background.primary,
    justifyContent: 'space-between',
  },

  selectorContainer: {
    width: '100%',
  },

  selectorLabel: {
    color: theme.palette.text.secondary,
    marginBottom: '10px',
  },

  selector: {
    padding: '0',
    margin: '0',
  },

  label: {
    color: theme.palette.text.primary,
  },
  boost: {
    color: '#5a8f69',
    fontWeight: 'bold',
    '& .MuiAvatar-root': {
      position: 'absolute',
      top: 0,
      right: '-20px',
    },
  },
});

export default styles;
