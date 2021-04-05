import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import imgData from "dan-api/images/imgData";
import Chip from "@material-ui/core/Chip";
import Type from "dan-styles/Typography.scss";
import "dan-styles/vendors/slick-carousel/slick-carousel.css";
import "dan-styles/vendors/slick-carousel/slick.css";
import "dan-styles/vendors/slick-carousel/slick-theme.css";
import Divider from "@material-ui/core/Divider";
import styles from "./shop-jss";

import classNames from "classnames";
import { PapperBlock } from "dan-components";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";

const getThumb = imgData.map((a) => a.thumb);

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

class ShopDetail extends React.Component {
  // eslint-disable-line
  state = {
    qty: 1,
  };

  handleQtyChange = (event) => {
    this.setState({ qty: event.target.value });
  };

  submitToCart = (itemAttr) => {
    const { handleAddToCart, close } = this.props;
    handleAddToCart(itemAttr);
    close();
  };

  render() {
    const { classes, open, close, detailContent, shopIndex } = this.props;

    const { qty } = this.state;

    const itemAttr = (item) => {
      if (item !== undefined) {
        return {
          id: detailContent.getIn([shopIndex, "id"]),
          name: detailContent.getIn([shopIndex, "name"]),
          thumbnail: detailContent.getIn([shopIndex, "thumbnail"]),
          price: detailContent.getIn([shopIndex, "price"]),
          quantity: qty,
        };
      }
      return false;
    };

    const settings = {
      customPaging: (i) => (
        <a>
          <img src={getThumb[i]} alt="thumb" />
        </a>
      ),
      infinite: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              color="inherit"
              className={classes.flex}
            >
              {detailContent.getIn([shopIndex, "name"])}
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => close()}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.detailContainer}>
          <Grid container className={classes.root} spacing={4}>
            <Grid item md={4} sm={12} xs={12}>
              <div className="container thumb-nav">                
                 <img src={detailContent.getIn([shopIndex, "image"])} alt={detailContent.getIn([shopIndex, "name"])} />
              </div>
            </Grid>
            <Grid item md={8} sm={12} xs={12} container alignItems="flex-start" direction="row" justify="center">
              <Grid item md={6} sm={6} xs={12}>
              <List>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.purpleAvatar)}
                >
                  <Icon>Name</Icon>
                </Avatar>
                <ListItemText primary="Name" secondary={detailContent.getIn([shopIndex, "name"])} />
              </ListItem>              
              
            </List>
              </Grid>
              <Grid item md={6}  sm={6} xs={12}>
              <List>           
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.orangeAvatar)}
                >
                  <Icon>build</Icon>
                </Avatar>
                <ListItemText
                  primary="Address"
                  secondary={detailContent.getIn([shopIndex, "address"])}
                />
              </ListItem>
            </List>
              </Grid>
              <Grid item md={6}  sm={6} xs={12}>
              <List>           
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.orangeAvatar)}
                >
                  <Icon>build</Icon>
                </Avatar>
                <ListItemText
                  primary="Telephone"
                  secondary={detailContent.getIn([shopIndex, "telephone"])}
                />
              </ListItem>
            </List>
              </Grid>
              <Grid item md={6}  sm={6} xs={12}>
              <List>           
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.orangeAvatar)}
                >
                  <Icon>build</Icon>
                </Avatar>
                <ListItemText
                  primary="Email"
                  secondary={detailContent.getIn([shopIndex, "email"])}
                />
              </ListItem>
            </List>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
              <List>           
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.orangeAvatar)}
                >
                  <Icon>build</Icon>
                </Avatar>
                <ListItemText
                  primary="Closed From"
                  secondary={detailContent.getIn([shopIndex, "closedFrom"])}
                />
              </ListItem>
            </List>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
              <List>           
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.orangeAvatar)}
                >
                  <Icon>build</Icon>
                </Avatar>
                <ListItemText
                  primary="Closed To"
                  secondary={detailContent.getIn([shopIndex, "closedTo"])}
                />
              </ListItem>
            </List>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <PapperBlock
          title="Products in the Store"
          icon="md-appstore"
          whiteBg
          desc=""
        >
        <Grid container>
          <Grid item md={3} xs={6}>
            <List>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.purpleAvatar)}
                >
                  <Icon>adb</Icon>
                </Avatar>
                <ListItemText primary="Nulla" secondary="100Mm" dense="sada" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.purpleAvatar)}
                >
                  <Icon>adb</Icon>
                </Avatar>
                <ListItemText primary="Nulla" secondary="100Mm" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.greenAvatar)}
                >
                  <Icon>all_out</Icon>
                </Avatar>
                <ListItemText primary="Vivamus" secondary="20K" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.pinkAvatar)}
                >
                  <Icon>assessment</Icon>
                </Avatar>
                <ListItemText primary="Cras convallis" secondary="999+" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.orangeAvatar)}
                >
                  <Icon>build</Icon>
                </Avatar>
                <ListItemText
                  primary="Quisque a consequa"
                  secondary="70 Milion"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={6}>
            <List>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.blueAvatar)}
                >
                  <Icon>camera_alt</Icon>
                </Avatar>
                <ListItemText
                  primary="Quisque a consequa"
                  secondary="70 Milion"
                />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.cyanAvatar)}
                >
                  <Icon>content_paste</Icon>
                </Avatar>
                <ListItemText primary="Cras convallis" secondary="999+" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.redAvatar)}
                >
                  <Icon>dialpad</Icon>
                </Avatar>
                <ListItemText primary="Vivamus" secondary="20K" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.tealAvatar)}
                >
                  <Icon>drive_eta</Icon>
                </Avatar>
                <ListItemText primary="Nulla" secondary="100Mm" />
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={6}>
            <List>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.brownAvatar)}
                >
                  <Icon>fiber_smart_record</Icon>
                </Avatar>
                <ListItemText primary="Nulla" secondary="100Mm" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(
                    classes.avatar,
                    classes.purpleDeepAvatar
                  )}
                >
                  <Icon>filter_drama</Icon>
                </Avatar>
                <ListItemText primary="Vivamus" secondary="20K" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.amberAvatar)}
                >
                  <Icon>language</Icon>
                </Avatar>
                <ListItemText primary="Cras convallis" secondary="999+" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.limeAvatar)}
                >
                  <Icon>lock</Icon>
                </Avatar>
                <ListItemText
                  primary="Quisque a consequa"
                  secondary="70 Milion"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={6}>
            <List>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.brownAvatar)}
                >
                  <Icon>fiber_smart_record</Icon>
                </Avatar>
                <ListItemText primary="Nulla" secondary="100Mm" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(
                    classes.avatar,
                    classes.purpleDeepAvatar
                  )}
                >
                  <Icon>filter_drama</Icon>
                </Avatar>
                <ListItemText primary="Vivamus" secondary="20K" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.amberAvatar)}
                >
                  <Icon>language</Icon>
                </Avatar>
                <ListItemText primary="Cras convallis" secondary="999+" />
              </ListItem>
              <ListItem>
                <Avatar
                  className={classNames(classes.avatar, classes.limeAvatar)}
                >
                  <Icon>lock</Icon>
                </Avatar>
                <ListItemText
                  primary="Quisque a consequa"
                  secondary="70 Milion"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
     </PapperBlock>
      </Dialog>
    );
  }
}

ShopDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  detailContent: PropTypes.object.isRequired,
  shopIndex: PropTypes.number,
};

ShopDetail.defaultProps = {
  shopIndex: undefined,
};

export default withStyles(styles)(ShopDetail);
