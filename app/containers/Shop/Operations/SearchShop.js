import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import ViewList from '@material-ui/icons/ViewList';
import GridOn from '@material-ui/icons/GridOn';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import styles from '../../../components/Search/search-jss';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import useStyles from '../../../hooks/useStyles';
import Ionicon from 'react-ionicons';

const SearchShop = ({ handleSwitchView, listView }) => {
  const classes = useStyles(styles)();

  return (
    <div className={classes.shopSearchRoot}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <div className={classes.filterSection}>
            <section>
              <div className={classes.platformFieldSetTitle}>Platforms</div>
              <RadioGroup
                aria-label="filter"
                name="filter"
                className={classes.platformFieldset}
                value={'all'}
              >
                <FormControlLabel value="pancake" control={<Radio />} label="Pancake" />
                <img className={classes.platformIcon} src="/images/logo/pancake.svg" />
                <FormControlLabel value="oneinch" control={<Radio />} label="1Inch" />
                <img className={classes.platformIcon} src="/images/logo/1inch.png" />
                <FormControlLabel value="julswap" control={<Radio />} label="Julswap" />
                <img className={classes.platformIcon} src="/images/logo/julswap.svg" />
                <FormControlLabel value="auto" control={<Radio />} label="Bakeryswap" />
                <img className={classes.platformIcon} src="/images/logo/bake.svg" />
                <FormControlLabel value="venus" control={<Radio />} label="Venus" />
                <img className={classes.platformIcon} src="/images/logo/venus.svg" />
                <FormControlLabel value="all" control={<Radio />} label="All" />
              </RadioGroup>
            </section>

            <FormGroup className={classes.flexRow}>
              <FormControlLabel
                control={<Checkbox value="hideZeroBalance" />}
                label="Hide Zero Balances"
              />
              <FormControlLabel
                control={<Checkbox value="retiredValues" />}
                label="Concluded Vaults"
              />
              <FormControlLabel
                control={<Checkbox value="depositedValues" />}
                label="Deposited Vaults"
              />
            </FormGroup>

            <div className={classes.dropdownRow}>
              <FormControl className={classes.dropdownControl}>
                <InputLabel htmlFor="age-simple">Vault Type</InputLabel>
                <Select
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value="all" selected = {true}>
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value="lp">
                    <em>Stable LPs</em>
                  </MenuItem>
                  <MenuItem value="single-lp">
                    <em>Single Assets</em>
                  </MenuItem>
                  <MenuItem value="stable">
                    <em>Stables</em>
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.dropdownControl}>
                <InputLabel htmlFor="age-simple">Asset</InputLabel>
                <Select
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value="all" selected = {true}>
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value="bnb">
                    <em>BNB</em>
                  </MenuItem>
                  <MenuItem value="diesel">
                    <em>DIESEL</em>
                  </MenuItem>
                  <MenuItem value="oil">
                    <em>OIL</em>
                  </MenuItem>
                  <MenuItem value="cake">
                    <em>CAKE</em>
                  </MenuItem>
                  <MenuItem value="busd">
                    <em>BUSD</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className={classes.clearBtnRow}>
              <Hidden mdDown>
                  <div className={classes.toggleContainer}>
                    <ToggleButtonGroup value={listView} exclusive onChange={handleSwitchView}>
                      <ToggleButton value="grid">
                        <GridOn />
                      </ToggleButton>
                      <ToggleButton value="list">
                        <ViewList />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                </Hidden>
                <Button style={{ marginRight: '10px' }} variant="contained" color="secondary">
                  <img
                    style={{ marginRight: '5px' }}
                    src="/images/clear_filter.svg"
                    width="20"
                    height="20"
                  />
                  <span className={classes.cearBtnText}>Clear Filters</span>
                </Button>
                <Button className={classes.refreshBtn} variant="contained" color="secondary">
                <Ionicon icon="md-refresh" />
                  <span className={classes.cearBtnText}>Refresh</span>
                </Button>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

SearchShop.propTypes = {
  handleSwitchView: PropTypes.func.isRequired,
  listView: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchShop);
