import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Creative from '../Templates/Creative';
import { SliderPage } from '../pageListAsync';

class Landing extends React.Component {
  render() {
    return (
      <Creative>
        <Switch>
          <Route exact path="/landing" component={SliderPage} />
        </Switch>
      </Creative>
    );
  }
}

export default Landing;
