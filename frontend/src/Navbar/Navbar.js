import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import {logout} from '../User/loginActions';

class navbar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };
  render = () => {
    const {name} = this.props.user;
    if (name) { // authenticated
      return (
        <div className={css([styles.flexContainer, styles.blueBg])}>
          <ul className={css([styles.nav, styles.flexItem, styles.flexStart])}>
            <li><Link className={css(styles.link)} to="/">Home</Link></li>
            <li><Link className={css(styles.link)} to="/profile">Profile</Link></li>
          </ul>
          <ul className={css([styles.nav, styles.flexContainer, styles.flexEnd])} >
            <li className={css(styles.link)}>Hi {name}</li>
            <li onClick={this.props.logout}>
              <Link className={css(styles.link)} to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      );
    } else { // not authenticated
      return (
        <div className={css([styles.flexContainer, styles.blueBg])}>
          <ul className={css([styles.nav, styles.flexItem, styles.flexStart])}>
            <li><Link className={css(styles.link)} to="/">Home</Link></li>
          </ul>
          <ul className={css([styles.nav, styles.flexContainer, styles.flexEnd])} >
            <li><Link className={css(styles.link)} to="/register">Register</Link></li>
            <li><Link className={css(styles.link)} to="/login">Login</Link></li>
          </ul>
        </div>
      );
    }
  };
}

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex"
  },
  flexItem: {
    flex: "1"
  },
  flexStart: {
    justifyContent: "flex-start"
  },
  flexEnd: {
    justifyContent: "flex-end"
  },
  blueBg: {
    background: "linear-gradient(45deg, rgba(49,130,204,0.95), rgba(132,183,230,1.0))"
  },
  nav: {
    listStyle: "none",
    fontSize: "1.2rem"
  },
  link: {
    textDecoration: "none",
    display: "block",
    padding: "0 1rem",
    color: "white",
    ":hover": {
      color: "yellow"
    }
  }
});


function mapStateToProps(state) {
  return {
    user: state.user.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {dispatch(logout())},
  }
}

const NavBar = connect(mapStateToProps, mapDispatchToProps)(navbar);
export default NavBar;
