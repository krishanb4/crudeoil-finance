import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Outer from '../Templates/Outer'
import { Login, ResetPassword, LockScreen, ComingSoon, Maintenance, NotFound, HelpSupport} from '../pageListAsync'

class Auth extends React.Component {
  render () {
    return (
      <Outer>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/reset-password' component={ResetPassword} />
          <Route path='/lock-screen' component={LockScreen} />
          <Route path='/maintenance' component={Maintenance} />
          <Route path='/coming-soon' component={ComingSoon} />
          <Route path="/help-support" component={HelpSupport} />
          <Route component={NotFound} />
        </Switch>
      </Outer>
    )
  }
}

export default Auth
