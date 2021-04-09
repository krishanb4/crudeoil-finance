import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import ViewList from '@material-ui/icons/ViewList';
import GridOn from '@material-ui/icons/GridOn';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Cart from '../../../components/Cart/Cart';
import styles from '../../../components/Search/search-jss';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

class SearchShop extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl, } = this.state;
    const {
      classes,
      removeItem,
      totalItems,
      search,
      keyword,
      shopData,
      handleSwitchView,
      listView,
      hideZeroBalance,
      retiredValues,
      depositedValues,
      boost
    } = this.props;

    const getTotalResult = dataArray => {
      let totalResult = 0;
      for (let i = 0; i < dataArray.size; i += 1) {
        if (dataArray.getIn([i, 'name']) === undefined) {
          return false;
        }
        if (dataArray.getIn([i, 'name']).toLowerCase().indexOf(keyword) !== -1) {
          totalResult += 1;
        }
      }
      return totalResult;
    };

    return (
      <div className={classes.shopSearchRoot}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            {/* <div className={classes.flex}>
              <div className={classes.wrapper}>
                <div className={classes.search}>
                  <SearchIcon />
                </div>
                <input className={classes.input} placeholder="Search Shop" onChange={(event) => search(event)} />
              </div>
            </div> */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '15px 0px 0px 0px' }}>
              <FormGroup row>
                <FormControlLabel control={<Checkbox value="hideZeroBalance" />} label="Hide Zero Balances" />
                <FormControlLabel control={<Checkbox value="retiredValues" />} label="Retired Vaults" />
                <FormControlLabel control={<Checkbox value="depositedValues" />} label="Deposited Vaults" />
                <FormControlLabel control={<Checkbox value="boost" />} label="Boost" />
                <RadioGroup
                    aria-label="filter"
                    name="filter"
                    className={classes.flexRow}
                    value={'auto'}
                    // onChange={handleChange}
                  >
                    <FormControlLabel style={{ minWidth: '160px', marginRight: '12px' }} value="pancake" control={<Radio />} label="Pancake" />
                    <FormControlLabel style={{ minWidth: '123px', marginRight: '12px' }} value="oneinch" control={<Radio />} label="1Inch" />
                    <FormControlLabel style={{ minWidth: '142px', marginRight: '12px' }} value="julswap" control={<Radio />} label="Julswap" />
                    <FormControlLabel style={{ minWidth: '160px', marginRight: '12px' }} value="auto" control={<Radio />} label="Auto" />
                  
                  </RadioGroup>
              </FormGroup>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <FormControl style={{ minWidth: '250px', marginRight: '12px' }}>
                  <InputLabel htmlFor="age-simple">Platform</InputLabel>
                  <Select
                    // value= '10'
                    // onChange={handleChange}
                    inputProps={{
                      name: 'age',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
                <FormControl style={{ minWidth: '250px', marginRight: '12px' }}>
                  <InputLabel htmlFor="age-simple">Vault Type</InputLabel>
                  <Select
                    // value= '10'
                    // onChange={handleChange}
                    inputProps={{
                      name: 'age',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
                <FormControl style={{ minWidth: '250px', marginRight: '12px' }}>
                  <InputLabel htmlFor="age-simple">Asset</InputLabel>
                  <Select
                    // value= '10'
                    // onChange={handleChange}
                    inputProps={{
                      name: 'age',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                  <Button style={{ marginRight: '10px' }} variant="contained" color="secondary">
                    <img style={{ marginRight: '5px' }} src='/images/clear_filter.svg' width="20" height="20" />
                    <span className={classes.cearBtnText}>Clear Filters</span>
                  </Button>
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
                </div>
              </div>
            </div>
            {/* <div className={classes.flexRow}>
                <FormControl className={classes.searchformControl}>
                  <InputLabel htmlFor="search-platform">Platform</InputLabel>
                  <Select
                    value='0'
                    inputProps={{
                      name: 'platform',
                      id: 'search-platform',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                  </Select>
                </FormControl>
              </div> */}




            {/* <Hidden mdDown>
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
            </Hidden> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SearchShop.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  shopData: PropTypes.object.isRequired,
  handleSwitchView: PropTypes.func.isRequired,
  listView: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchShop);
