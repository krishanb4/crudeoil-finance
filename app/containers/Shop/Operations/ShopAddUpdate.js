import React from "react";
import { PropTypes } from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import styles from "./shop-jss";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Timer from "@material-ui/icons/Timer";
import Snackbar from '@material-ui/core/Snackbar';

import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form/immutable";
import InputAdornment from "@material-ui/core/InputAdornment";
import PermContactCalendar from "@material-ui/icons/PermContactCalendar";
import LocalPhone from "@material-ui/icons/LocalPhone";
import Email from "@material-ui/icons/Email";
import Smartphone from "@material-ui/icons/Smartphone";
import LocationOn from "@material-ui/icons/LocationOn";
import { TextFieldRedux } from "../../../components/Forms/ReduxFormMUI";
import UploadInputImg from '../../../components/Uploaders/UploadInputImg'

import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {
  CheckboxRedux,
  SelectRedux,
  SwitchRedux,
} from "dan-components/Forms/ReduxFormMUI";
const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

// validation functions
const required = (value) => ((value == null || value == '') ? "Required" : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

// eslint-disable-next-line
class ShopAddUpdate extends React.Component {
  state = {
    img: "",
    files: [],
    errorMessage : '',
    openSnackBar : false
  };

   filesSubmitted =(files)=> {
    this.setState({files: files});
  }

  handleChangeSelection = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFormSubmit =(values)=> {
    event.preventDefault();
    var files = this.fileUploader.getFiles();
    if(files && files.length > 0) {
      this.props.afterDataValidate(values,files[0]);
    } 
   this.setState({openSnackBar: true , errorMessage : 'Please upload a image'});

  }
  render() {
    const {
      classes,
      open,
      handleClose,
      title,
      shopId,
      reset,
      pristine,
      submitting,
      handleSubmit
    } = this.props;
    const { files, openSnackBar,errorMessage } = this.state;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {title}
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => handleClose()}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <PapperBlock
          title="Add New Shop"
          icon="ios-images-outline"
          whiteBg
          desc=""
        >
          <div className={classes.root}>
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
              <Grid container spacing={3}>                
                <Grid item xs={12} sm={3}>
                  <Field
                    name="name"
                    component={TextFieldRedux}
                    placeholder="Name"
                    label="name"
                    className={classes.field}
                    required
                    validate={[required]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PermContactCalendar />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="address"
                    component={TextFieldRedux}
                    placeholder="Address"
                    label="Address"
                    className={classes.field}
                    required
                    validate={[required]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="telephone"
                    component={TextFieldRedux}
                    placeholder="Phone"
                    type="tel"
                    label="Phone"
                    required
                    validate={[required]}
                    className={classes.field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalPhone />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="mobile"
                    component={TextFieldRedux}
                    type="tel"
                    label="Mobile"
                    className={classes.field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Smartphone />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="categoryId">Shop Category</InputLabel>
                    <Field
                      name="categoryId"
                      component={SelectRedux}
                      placeholder="Shop Category"
                      required
                      validate={[required]}
                    >
                      <MenuItem value="option1">Option One</MenuItem>
                      <MenuItem value="option2">Option Two</MenuItem>
                      <MenuItem value="option3">Option Three</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="email"
                    component={TextFieldRedux}
                    type="email"
                    label="Email"
                    className={classes.field}
                    required
                    validate={[required, email]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />{" "}
                </Grid> 
                <Grid item xs={12} sm={3}>
                  <Field
                    name="closedFrom"
                    type="date"
                    className={classes.field}
                    component={TextFieldRedux}
                    label="Close Date From"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Timer />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="closedTo"
                    type="date"
                    className={classes.field}
                    component={TextFieldRedux}
                    label="Close Date To"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Timer />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>                 
                <Grid item xs={12} sm={4}>                 
                  <UploadInputImg onCorrectFileSubmitted = {this.filesSubmitted} ref ={(com) => this.fileUploader = com} />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Field
                    name="description"
                    className={classes.field}
                    component={TextFieldRedux}
                    placeholder="Description"
                    label="Description"
                    required
                    validate={[required]}
                    multiline={true}
                    rows={4}
                  />
                </Grid>              
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Reset
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </PapperBlock>
        <Snackbar
          open={openSnackBar}
          message={errorMessage}
          autoHideDuration={4000}
          onClose = {()=> this.setState({openSnackBar: false})}
          ContentProps={{
            classes: {
                root: classes.error
            }
        }}
        />
      </Dialog>
    );
  }
}

ShopAddUpdate.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  shopId: PropTypes.string,
  afterDataValidate : PropTypes.func
};

const ShopAddUpdateRedux = reduxForm({
  form: "formAddOrUpdateShop",
  enableReinitialize: true,
})(ShopAddUpdate);

const reducer = 'shop';
const AddUpdateInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'shop'])
  })
)(ShopAddUpdateRedux);

export default withStyles(styles)(AddUpdateInit);
