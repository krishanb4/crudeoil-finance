import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import EditBtn from "@material-ui/icons/Edit";
import ReorderRoundedIcon from '@material-ui/icons/ReorderRounded';
import SettingsPhoneRoundedIcon from '@material-ui/icons/SettingsPhoneRounded';
import PinDropRoundedIcon from '@material-ui/icons/PinDropRounded';
import RestoreFromTrashRoundedIcon from '@material-ui/icons/RestoreFromTrashRounded';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import styles from "./cardStyle-jss";

class ShopCard extends React.Component {
  render() {
    const today = new Date();
    const {
      classes,
      data,
      list,
      detailOpen,
      addOrUpdateOpen,
      width,
      deleteOpen
    } = this.props;
    return (
      <Card
        className={classNames(
          classes.cardProduct,
          isWidthUp("sm", width) && list ? classes.cardList : ""
        )}
      >
        <div className={classes.status}>
          {new Date(data.get("closedFrom")) < today  && new Date(data.get("closedTo")) >= today  && (
            <Chip
              label={`Closed until : ${data.get('closedTo')} `}
              className={classes.chipDiscount}
            />
          )}         
        </div>
        <CardMedia
          className={classes.mediaProduct}
          image={data.get('image')}
          title={data.get('name')}
        />
        <CardContent className={classes.floatingButtonWrap}>
          <Typography
            noWrap
            gutterBottom
            variant="h8"
            className={classes.title}
            component="h5"
          >
            {data.get('name')}
          </Typography>
          <Typography component="p" className={classes.desc}>
           <PinDropRoundedIcon/> {data.get('address')}
          </Typography> 
          <Typography component="p" className={classes.desc}>
           <SettingsPhoneRoundedIcon/> {data.get('telephone')} {" , "} {data.get('mobile')}
          </Typography> 
          <Typography component="p" className={classes.desc}>
           <AlternateEmailRoundedIcon/> {data.get('email')}
          </Typography>                  
        </CardContent>
        <CardActions className={classes.price}>         
          <div className={classes.rightAction}>
            <label htmlFor="icon-button-file">
              <IconButton
                onClick={detailOpen}
                color="primary"
                id="uploadBtnIcon"
                className={classes.button}
                component="span"
              >
                <ReorderRoundedIcon />
              </IconButton>
            </label>
              <IconButton
                onClick={()=>addOrUpdateOpen()}
                color="primary"
                id="uploadBtnIcon"
                className={classes.button}
                component="span"
              >
                <EditBtn />
              </IconButton>              
              <IconButton
                onClick={()=>deleteOpen()}
                color="primary"
                id="deleteIcon"
                className={classes.button}
                component="span"
              >
               <RestoreFromTrashRoundedIcon/>
              </IconButton>
          </div>
        </CardActions>
      </Card>
    );
  }
}

ShopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  data : PropTypes.object.isRequired,
  detailOpen: PropTypes.func.isRequired,
  addOrUpdateOpen: PropTypes.func.isRequired,
  deleteOpen: PropTypes.func.isRequired
};

ShopCard.defaultProps = {
  list: false,
  detailOpen: () => false,
};

const ShopCardResponsive = withWidth()(ShopCard);
export default withStyles(styles)(ShopCardResponsive);
