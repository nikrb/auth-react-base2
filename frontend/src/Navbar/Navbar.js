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

  render() {
    return this.getBar();
  }

  getBar() {
    const {name} = this.props.user;
    if (name) { // authenticated
      return (
        <div>
          <ul className={css(styles.container)}>
            <li className={css(styles.titleelement)}>
              <Link className={css(styles.links)} to="/">Home</Link>
            </li>
            <li className={css(styles.titleelement)}>
              <Link className={css(styles.links)} to="/profile">Profile</Link>
            </li>
            <li className={css(styles.navelement)}
              onClick={() => this.props.logout()}>
              <Link className={css(styles.links)} to="/logout">Logout</Link>
            </li>
            <li className={css(styles.navelement)} >
              <span className={css(styles.links)}>Hi {name}</span>
            </li>
          </ul>
        </div>
      );
    } else { // not authenticated
      return (
        <div>
          <ul className={css(styles.container)}>
            <li className={css(styles.titleelement)}><Link className={css(styles.links)} to="/">Home</Link></li>
            <li className={css(styles.navelement)}><Link className={css(styles.links)} to="/login">Login</Link></li>
            <li className={css(styles.navelement)}><Link className={css(styles.links)} to="/register">Register</Link></li>
          </ul>
        </div>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    listStyleType: 'none',
    margin: 0,
    fontSize: '1.1rem',
    padding: '0.8rem 1rem',
    overflow: 'hidden',
    backgroundColor: '#333',
    background: 'linear-gradient(45deg, rgba(49,130,204,0.95), rgba(132,183,230,1.0))'
  },
  navelement: {
    float: 'right',
  },
  titleelement: {
    float: 'left',
  },
  links: {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
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
