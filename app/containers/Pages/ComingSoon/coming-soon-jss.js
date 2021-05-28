import { fade } from '@material-ui/core/styles/colorManipulator';
import bg from 'dan-images/petal_grey_bg.svg';
import bgLight from 'dan-images/petal_bg.svg';
import { gradientBgLight } from 'containers/Templates/appStyles-jss';
const rootWraper = {
  display: 'flex',
  width: '100%',
  zIndex: 1,
  position: 'relative'
};

const wrapper = (theme, opacity) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: fade(theme.palette.background.paper, opacity),
  backgroundRepeat: 'no-repeat',
  color: theme.palette.text.primary,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed'
});

const styles = theme => ({
  root: {
    ...rootWraper
  },
  rootFull: {
    ...rootWraper,
    height: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      overflow: 'hidden'
    },
  },
  fullFormWrap: {
    height: '100%',
    width: '100%'
  },
  fullWrap: {
    ...wrapper(theme, 0.9),
    height: '100%',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& $topBar': {
      width: '100%'
    }
  },
  petal: {
    backgroundImage: theme.palette.type === 'dark' ? `url(${bgLight})` : `url(${bg})`,
  },
  centerV: {
    justifyContent: 'center'
  },
  brandCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 10px',
    position: 'relative',
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&$outer': {
      color: theme.palette.common.white,
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2)
    },
    '& img': {
      width: 30,
      marginRight: 10,
    },
  },
  titleGradient: {
    background: gradientBgLight(theme),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    paddingBottom: theme.spacing(3),
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.55em'
    }
  },
  comingSoonImg: {
    marginTop: -100
  }
 
});

export default styles;
