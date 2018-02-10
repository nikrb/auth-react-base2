import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Notfound from '../Errors/Notfound';
import HomePage from '../Home';
import Profile from '../Profile';
import { Register, Login, Logout, Forgot } from '../User';
import { connect } from 'react-redux';

class routes extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };
  state = {
    logged_in: false
  };
  componentWillReceiveProps = newProps => {
    let logged_in = false;
    if( newProps.user && newProps.user.name) {
      logged_in = true;
    }
    this.setState( {logged_in});
  };

  render() {
    const user = this.state.logged_in;
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot" component={Forgot} />
        <AuthRoute path='/profile/:id?' user={user} component={Profile} pathname={'/login'} />
        <Route path="/logout" component={Logout} />
        <Route path="*" component={Notfound} />
      </Switch>
    );
  }
}

const AuthRoute = ({ user: auth, component: Component, pathname: path, ...rest }) => (
  <Route {...rest} render={ props => (
    auth ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{ pathname: path }}
      />
    ))} />
);
AuthRoute.propTypes = {
  user: PropTypes.bool,
  component: PropTypes.func,
  pathname: PropTypes.string
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
   login: () => dispatch({ type: "LOGIN" }),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(routes));
