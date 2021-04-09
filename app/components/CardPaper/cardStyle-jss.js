import pink from '@material-ui/core/colors/pink';
import lightGreen from '@material-ui/core/colors/lightGreen';
import dark from '@material-ui/core/colors/blueGrey';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import roundedThumbLight from 'dan-images/decoration/roundedThumbLight.png';
import roundedThumbDark from 'dan-images/decoration/roundedThumbDark.png';

const styles = theme => ({
  divider: {
    margin: `${theme.spacing(3)}px 0`
  },
  card: {
    minWidth: 275,
  },
  priceCard: {
    maxWidth: 320,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  liked: {
    color: pink[500]
  },
  shared: {
    color: lightGreen[500]
  },
  num: {
    fontSize: 14,
    marginLeft: 5
  },
  rightIcon: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  cardPlayer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
    height: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  btnArea: {
    justifyContent: 'center',
    padding: theme.spacing(3),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  cardSocmed: {
    minWidth: 275,
  },
  cardProduct: {
    position: 'relative'
  },
  mediaProduct: {
    height: 0,
    paddingTop: '60.25%', // 16:9
  },
  cardMedia: {
    position: 'relative',
    marginBottom: theme.spacing(3),
  },
  gutterBottom: {
    marginBottom: theme.spacing(3)
  },
  landscapeCard: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  rightAction: {
    '&:not(:first-child)': {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center'
    }
  },
  floatingButtonWrap: {
    position: 'relative',
    paddingTop: 20
  },
  buttonAdd: {
    position: 'absolute',
    right: 20,
    top: -20,
  },
  buttonAddList: {
    display: 'none',
    marginLeft: 10
  },
  title: {
    fontSize: 16,
    height: 30,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: 15
  },
  ratting: {
    margin: '10px 0',
    '& button': {
      width: 24,
      height: 24
    }
  },
  status: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
    '& > *': {
      margin: 5
    }
  },
  desc: {
    height: 25,
    overflow: 'hidden'
  },
  chipDiscount: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  },
  chipSold: {
    background: dark[500],
    color: theme.palette.getContrastText(dark[500]),
  },
  contentProfile: {
    flex: '1 0 auto',
    textAlign: 'center',
    marginTop: -70
  },
  mediaProfile: {
    height: 0,
    paddingTop: '66.25%',
    borderRadius: '50%',
    width: '120%',
    left: '-10%',
    position: 'relative',
    top: -70
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    boxShadow: theme.shadows[7]
  },
  avatarBig: {
    width: 80,
    height: 80,
    margin: '-56px auto 10px',
    background: theme.palette.secondary.dark,
    boxShadow: theme.shadows[7]
  },
  name: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonProfile: {
    margin: 20
  },
  bottomLink: {
    width: '100%',
  },
  price: {
    padding: `${theme.spacing(0)}px ${theme.spacing(0)}px ${theme.spacing(0)}px`
  },
  verified: {
    fontSize: 16,
    color: theme.palette.primary.main
  },
  cardList: {
    display: 'flex',
    justifyContent: 'space-between',
    '& $buttonAddList': {
      display: 'inline-block'
    },
    '& $floatingButtonWrap': {
      flex: 1,
    },
    '& $buttonAdd': {
      display: 'none'
    },
    '& $status': {
      right: 'auto',
      left: 0,
    },
    '& $mediaProduct': {
      width: 300,
      paddingTop: '21.25%'
    },
    '& $price': {
      flexDirection: 'column',
      justifyContent: 'center',
      '& button': {
        marginTop: 20
      }
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    position: 'relative',
  },
  playBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 64,
    height: 64,
    transform: 'translate(-50%, -50%)',
    '& svg': {
      color: theme.palette.common.white,
      fontSize: 64
    }
  },
  newsList: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse'
    }
  },
  newsListContent: {
    padding: theme.spacing(2),
    flex: 1,
    overflow: 'hidden'
  },
  mediaNews: {
    [theme.breakpoints.up('sm')]: {
      width: 150,
    },
    height: 150
  },
  extraRounded: {},
  roundedMedia: {
    height: 0,
    paddingTop: '86.25%',
    borderRadius: '50%',
    width: '120%',
    left: '-10%',
    position: 'relative',
    top: -70,
    backgroundPosition: '45% 60px',
    backgroundSize: '85%',
    marginBottom: -70,
    '&$extraRounded': {
      left: '-30%',
      width: '160%',
      top: -100,
      marginBottom: -100,
      [theme.breakpoints.up('sm')]: {
        top: -200,
        marginBottom: -200,
      },
    }
  },
  roundedThumb: {
    position: 'relative',
    paddingTop: '50%',
    backgroundPosition: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '70%',
      '&:after': {
        content: '""',
        right: -1,
        top: 0,
        position: 'absolute',
        backgroundSize: '100% 100%',
        height: '100%',
        width: 40,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        backgroundImage: theme.palette.type === 'dark' ? `url(${roundedThumbDark})` : `url(${roundedThumbLight})`
      }
    },
  },
  priceHead: {
    height: 300,
    position: 'relative',
    borderRadius: '50%',
    width: '150%',
    left: '-25%',
    paddingTop: 120,
    marginBottom: -60,
    top: -70,
    textAlign: 'center',
    background: fade(theme.palette.common.white, 0.3),
    color: theme.palette.common.white,
    '& h5': {
      color: theme.palette.common.white
    },
    '& h4': {
      textShadow: '0 0 22px #a0a0a0',
      fontWeight: 'bold',
      color: theme.palette.common.white,
      marginTop: theme.spacing(3)
    }
  },
  featureList: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.common.white,
    '& li': {
      lineHeight: '32px'
    }
  },
  lightButton: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
  },
  free: {
    background: theme.palette.secondary.main,
  },
  cheap: {
    background: theme.palette.primary.main,
  },
  expensive: {
    background: darken(theme.palette.primary.dark, 0.2),
  },
  moreExpensive: {
    background: darken(theme.palette.secondary.dark, 0.7),
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    overflow: 'hidden'
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing(2)}px`,
    minHeight: 200,
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(6)}px`,
      paddingRight: 0,
    },
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      display: 'flex',
    },
  },
  imageFull: {
    position: 'relative',
    width: '100%',
    '&:hover': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
    },
  },
  imageButton: {
    zIndex: 1,
    position: 'relative',
    top: 0,
    bottom: 0,
    color: theme.palette.common.white,
    whiteSpace: 'normal',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      '& h1': {
        fontSize: 32,
        lineHeight: '42px',
      },
      '& p': {
        fontSize: 16
      }
    },
    [theme.breakpoints.only('sm')]: {
      '& h1': {
        width: '60%'
      },
    }
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  shopDetailsLabel: {
    color: '#00000066',
    fontSize: '14px',
    fontWeight: 400
  },
  shopDetailsValue: {
    color: '#000',
    fontSize: '15px',
    fontWeight: 600
  },
  shopDetailsBtnRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  shopDetailsDesc: {
    // marginBottom: '8px',
    display: 'flex',
    flexDirection: 'column'
  },
  actionRow: {
    padding: '10px 5px',
    borderTop: '1px solid #e6e6e6'
  },
  shopDetailsBtnWithdraw: {
    borderRadius: '10px',
    backgroundColor: '#ff8885 !important'
  },
  shopDetailsBtnDeposit: {
    borderRadius: '10px',
    backgroundColor: '#00b9a0 !important'
  },
  shopDetailsBtnText: {
    marginLeft: '5px'
  },
  shopDetailsBtnImg: {
    width: 20,
    height: 20
  },
  shopDetailsDescGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '10px',
    gridRowGap: '10px'
  },
  boostedTag: {
    border: '1px solid #11dc11',
    width: 'fit-content',
    padding: '3px 10px',
    fontSize: '12px',
    position: 'relative',
    left: '126px',
    top: '-40px',
    backgroundColor: '#00ce52',
    color: 'white',
    borderRadius: 12,
    fontWeight: 600
  },
  pausedTag: {
    border: '1px solid #ffcf53',
    width: 'fit-content',
    padding: '3px 10px',
    fontSize: '12px',
    position: 'relative',
    left: '100px',
    top: '-40px',
    backgroundColor: '#ffd555',
    color: 'black',
    borderRadius: 12,
    fontWeight: 600
  },
  boostedTagDiv: {
    position: 'absolute'
  },
  boostBtnImg: {
    width: 20,
    height: 20,
    marginRight: '5px'
  },
  shopImg: {
    width: '45px',
    height: '45px',
    // border: '1px solid #e8e8e8',
    padding: '10px 5px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '-16px'
    // borderRadius: '50%'
  },
  boostedCard: {
    backgroundColor: '#d7ffd7 !important',
    boxShadow: '0px 0px 10px 2px rgb(106 226 106)'
  },
  pausedCard: {
    backgroundColor: '#fdffc3 !important',
    boxShadow: '0px 0px 10px 2px rgb(255 250 87)'
  },
  inactiveCard: {
    backgroundColor: '#d7ffd7 !important',
    boxShadow: '0px 0px 10px 1px rgb(106 226 106)'
  },
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
  disabledBtn: {
    backgroundColor: '#808080 !important',
    color: 'white !important'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialogGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridColumnGap: 15,
    marginTop: 25,
    gridRowGap: 15
  },
  mlAuto: {
    marginLeft: 'auto'
  },
  mb40: {
    marginBottom: 40
  },
  mr15: {
    marginRight: 15
  },
  dialogTitleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  detailsHeader: {
    fontWeight: 'bold'
  }
});

export default styles;
