import React from "react";
import { PropTypes } from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import styles from "./store-jss";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Timer from "@material-ui/icons/Timer";

import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form/immutable";
import { MaterialDropZone } from "dan-components";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalPhone from "@material-ui/icons/LocalPhone";
import Email from "@material-ui/icons/Email";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HomeIcon from '@material-ui/icons/Home';
import HttpIcon from '@material-ui/icons/Http';
import LanguageIcon from '@material-ui/icons/Language';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LocationOn from "@material-ui/icons/LocationOn";
import { TextFieldRedux } from "../../../components/Forms/ReduxFormMUI";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
const required = (value) => (value == null ? "Required" : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

// eslint-disable-next-line
class StoreAddAndUpdate extends React.Component {
  state = {
    img: "",
    files: [],
  };

  render() {
    const {
      classes,
      open,
      handleClose,
      title,
      reset,
      pristine,
      submitting,
      handleSubmit,
    } = this.props;
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
          whiteBg
          title = {"Create new Optometry Store"}
        >
          <form onSubmit={handleSubmit}>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <ExpansionPanel defaultExpanded = {false}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.column}>
                      <Typography className={classes.heading}>
                        Image Uploads
                      </Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <Grid item xs={12} sm={3} className={classes.uploadImages}>
                      <Typography
                        variant="h8"
                        color="inherit"
                        className={classes.flex}
                      >
                        Banner Image
                      </Typography>
                      <MaterialDropZone
                        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                        files={[]}
                        showPreviews
                        maxSize={1200}
                        filesLimit={1}
                        text="Drag and drop image (1900 * 420) here or click"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.uploadImages}>
                      <Typography
                        variant="h8"
                        color="inherit"
                        className={classes.flex}
                      >
                        About Image
                      </Typography>
                      <MaterialDropZone
                        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                        files={[]}
                        showPreviews
                        maxSize={1200}
                        filesLimit={1}
                        text="Drag and drop image (525 * 368) here or click"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.uploadImages}>
                      <Typography
                        variant="h8"
                        color="inherit"
                        className={classes.flex}
                      >
                        Logo Image
                      </Typography>
                      <MaterialDropZone
                        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                        files={[]}
                        showPreviews
                        maxSize={1200}
                        filesLimit={1}
                        text="Drag and drop image (62 * 50) here or click"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.uploadImages}>
                      <Typography
                        variant="h8"
                        color="inherit"
                        className={classes.flex}
                      >
                        Thumbnail Image
                      </Typography>
                      <MaterialDropZone
                        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                        files={[]}
                        showPreviews
                        maxSize={5000000}
                        filesLimit={1}
                        text="Drag and drop image (246 * 172) here or click"
                      />
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <Grid item xs={6} sm={3}>
                  <Field
                    name="storeName"
                    component={TextFieldRedux}
                    placeholder="Optometry Store Name"
                    label="Optometry Store Name"
                    className={classes.field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeWorkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="selection">
                      Optometry Organization{" "}
                    </InputLabel>
                    <Field
                      name="selection"
                      component={SelectRedux}
                      placeholder="Selection"
                    >
                      <MenuItem value="option1">Option One</MenuItem>
                      <MenuItem value="option2">Option Two</MenuItem>
                      <MenuItem value="option3">Option Three</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Field
                    name="email"
                    component={TextFieldRedux}
                    type="email"
                    label="Email"
                    required
                    className={classes.field}
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
                <Grid item xs={6} sm={3}>
                  <Field
                    name="phone"
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
                    name="address"
                    component={TextFieldRedux}
                    placeholder="Address"
                    label="Address"
                    required
                    validate={[required]}
                    className={classes.field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Field
                    name="postalCode"
                    component={TextFieldRedux}
                    placeholder="Postal Code"
                    type="num"
                    label="Postal Code"
                    required
                    validate={[required]}
                    className={classes.field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Field
                    name="latitude"
                    component={TextFieldRedux}
                    placeholder="Latitude"
                    type="num"
                    label="Latitude"
                    required
                    validate={[required]}
                    className={classes.field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LanguageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Field
                    name="longitude"
                    component={TextFieldRedux}
                    placeholder="Longitude"
                    type="num"
                    label="Longitude"
                    required
                    validate={[required]}
                    className={classes.field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LanguageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="webUrl"
                    component={TextFieldRedux}
                    placeholder="Website URL"
                    type=""
                    label="Website URL"
                    required
                    validate={[required]}
                    className={classes.field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateFrom"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Monday Open From"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateTo"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Monday Open to"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateFrom"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Tuesday Open From"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateTo"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Tuesday Open to"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateFrom"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Wednesday Open From"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateTo"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Wednesday Open to"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateFrom"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Thursday Open From"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateTo"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Thursday Open to"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateFrom"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Friday Open From"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateTo"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Friday Open to"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateFrom"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Saturday Open From"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateTo"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Saturday Open to"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateFrom"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Sunday Open From"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Field
                      name="DateTo"
                      type="time"
                      className={classes.field}
                      component={TextFieldRedux}
                      label="Sunday Open to"
                      required
                      validate={[required]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Field
                    name="maxPrice"
                    type="number"
                    className={classes.field}
                    component={TextFieldRedux}
                    label="Max Price"
                    required
                    validate={[required]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Field
                    name="minPrice"
                    type="number"
                    className={classes.field}
                    component={TextFieldRedux}
                    label="Min Price"
                    required
                    validate={[required]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  container
                  direction="column"
                  alignItems="flex-start"
                  justify="center"
                >
                  <Grid>
                    <FormControlLabel
                      control={
                        <Field name="isStoreShow" component={CheckboxRedux} required
                        validate={[required]} />
                      }
                      label="Store Display Status"
                      
                    />
                  </Grid>
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
            </div>
          </form>
        </PapperBlock>
      </Dialog>
    );
  }
}

StoreAddAndUpdate.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  shopId: PropTypes.string,
};

const StoreAddAndUpdateRedux = reduxForm({
  form: "immutableAddUpdateShop",
  enableReinitialize: true,
})(StoreAddAndUpdate);

const StoreAddAndUpdateInit = connect((state) => ({
  initialValues: state.getIn(["store", "formValues"]),
}))(StoreAddAndUpdateRedux);

export default withStyles(styles)(StoreAddAndUpdateInit);
