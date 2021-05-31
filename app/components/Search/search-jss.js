const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2, 0, 4),
    borderRadius: 40,
    overflow: 'hidden',
    boxShadow: theme.shadows[5]
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: 2,
    display: 'block',
    color: theme.palette.text.secondary,
    '& svg': {
      fill: theme.palette.text.secondary
    }
  },
  cart: {
    '& svg': {
      fill: theme.palette.text.secondary
    }
  },
  search: {
    width: 'auto',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(4)}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing(1)}px 0`,
  },
  inputHeader: {
    font: 'inherit',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(9)}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    '& > div': {
      border: 'none',
      '&:after': {
        display: 'none'
      },
    },
    '& input': {
      transition: theme.transitions.create('width'),
      padding: 0,
      color: theme.palette.common.white,
      width: 100,
      '&:focus': {
        width: 250,
        textIndent: 0,
        outline: 0,
      },
    },
    '& ::-webkit-input-placeholder': { /* Chrome/Opera/Safari */
      color: 'rgba(255,255,255,1)'
    },
    '& ::-moz-placeholder': { /* Firefox 19+ */
      color: 'rgba(255,255,255,1)'
    },
    '& :-ms-input-placeholder': { /* IE 10+ */
      color: 'rgba(255,255,255,1)'
    },
    '& :-moz-placeholder': { /* Firefox 18- */
      color: 'rgba(255,255,255,1)'
    },
  },
  containerSearch: {
    flexGrow: 1,
    position: 'relative',
    color: theme.palette.text.primary
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    overflow: 'hidden'
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  shopSearchRoot: {
    flexGrow: 1,
    margin: theme.spacing(2, 0, 4),
    borderRadius: 7,
    overflow: 'hidden',
    boxShadow: theme.shadows[5]
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row !important',
    alignItems: 'center',
    width: '100%',
    marginTop: 22,
    [theme.breakpoints.down('sm')]: {
      marginTop: 5 
    }
  },
  filterSection: {
    display: 'grid', 
    gridTemplateColumns: 'auto auto', 
    gridColumnGap: 30, 
    gridRowGap: 0,
    padding: '0px 0px 15px 0px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr', 
    },
  },
  dropdownControl: {
    minWidth: '240px', 
    marginRight: '12px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px',
      minWidth: '100%',
    },
  },
  dropdownRow: {
    display: 'flex', 
    alignItems: 'center', 
    width: '100%', 
    marginTop: '-15px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column', 
      marginBottom: 20
    },
  },
  boostBtnIcon: {
    backgroundImage: theme.palette.type === 'dark' ? 'url(/images/boost.svg)' : 'url(/images/boost_green.svg)',
    width: 24,
    height: 24,
    marginLeft: -10,
    marginRight: 30
  },
  clearBtnRow: {
    display: 'flex', 
    alignItems: 'center', 
    marginLeft: -20, 
    marginTop: '-3px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      justifyContent: 'space-between'
    },
  },
  platformFieldset:{
    display: 'flex',
    flexDirection: 'row !important',
    alignItems: 'center',
    width: '100%',
    marginTop: '-2px',
    border: '1px solid #eaeaea',
    padding: '5px 15px',
    borderRadius: '8px'
  },
  platformFieldSetTitle: {
    border: '1px solid #eaeaea',
    width: 'fit-content',
    padding: '3px 15px',
    position: 'relative',
    top: 8,
    left: 10,
    background: theme.palette.type === 'dark' ? '#292929 !important' : 'white',
    fontWeight: 600,
    borderRadius: '8px'
  },
  platformIcon: {
    width: 18,
    height: 18,
    marginLeft: -10,
    marginRight: 25
  },
  refreshBtn : { 
    marginLeft: 70, 
    backgroundColor: '#2981bb !important'
  },
  showHideFiltersSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 12,
    background: 'white',
  },
  showHideBtn: {
    border: '1px solid #e8e8e8',
    width: 'fit-content',
    padding: '5px 10px',
    cursor: 'pointer',
    background: '#eaf7ff',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600
  },
  showHideIcon: {
    width: 16,
    height: 16,
    marginRight: 5
  },
  hideFilterSection: {
    height: 20
  },
  hideSection: {
    display: 'none'
  },
  filterBtnRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
