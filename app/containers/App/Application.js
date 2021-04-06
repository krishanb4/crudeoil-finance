import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import {
  PersonalDashboard,
  CrmDashboard,
  CryptoDashboard,
  Shops,
  Infographics,
  MiniApps,
  NotFound,
} from '../pageListAsync';
import BlankPage from '../Pages/BlankPage';

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          {/* Home */}
          <Route exact path="/app" component={Shops} />
          <Route path="/app/stat" component={CrmDashboard} />
          <Route path="/app/crypto-dashboard" component={CryptoDashboard} />
          {/* Orders */}
          <Route path="/app/order/carts" component={Infographics} />
          <Route path="/app/order/receipt" component={MiniApps} />

          {/* Shops */}
          <Route path="/app/shops" component={Shops} />

          {/* Product */}
          <Route path="/app/product/types" component={Infographics} />

          {/* Default */}
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Application;
