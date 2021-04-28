
const styles = theme => ({
    test: {
        padding: 100,
        textAlign: "center",
        fontSize: 27
    },
    backgroundDiv: {
        width: '100vw',
        height: '100vh',
        background: 'url(images/homepage/background_img.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    oilTankDiv: {
        position: 'absolute',
        bottom: 20,
        [theme.breakpoints.down('sm')]: {
            bottom: 48,
            width: 1100
        }
    },
    oilRigDiv: {
        position: 'absolute',
        bottom: 20,
        right: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // marginTop: -150,
        [theme.breakpoints.down('sm')]: {
            // marginTop: 50,
        }
    },
    socialMediaRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '15px 0px',
        [theme.breakpoints.down('sm')]: {
            // marginTop: 20,
        }
    },
    launchBtn: {
        border: '1px solid #f3a230',
        padding: '10px 15px',
        fontSize: 20,
        textDecoration: 'none',
        color: '#f8d093',
        background: '#885505',
        borderRadius: 10,
        fontWeight: 500,
        cursor: 'pointer',
        zIndex: 9999
    },
    headingDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 750,
            marginLeft: -190,
            paddingTop: 40
        }
    },
    oilSmoke: {
        position: 'relative',
        top: 195,
        width: 100,
        left: 57,
        zIndex: 99999,
        [theme.breakpoints.down('sm')]: {
            top: 160,
            left: 38
        }
    },
    oilRigGif: {
        width: 600,
        top: -33,
        position: 'relative',
        left: 72
    },
    oilRig: {
        width: 135,
        top: 0,
        position: 'relative'
    },
    cloudDiv: {
        position: 'absolute',
        width: '100%',
        opacity: .3
    },
    cloudDivImg: {
        width: '100vw',
    },
    headingText: {
        fontSize: 22,
        color: '#551515',
        width: '50%',
        textAlign: 'center',
        marginTop: -20
    },
    socialMediaBtn: {
        color: 'black !important',
        cursor: 'pointer',
        zIndex: 9999
    },
    headingImg: {
        [theme.breakpoints.down('sm')]: {
            width: 400,
            marginBottom: 15
        } 
    }
});

export default styles;
