
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
        marginTop: -150,
        [theme.breakpoints.down('sm')]: {
            marginTop: 50,
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
    }
});

export default styles;
