import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import {requestRegister} from './loginActions';

class Register extends Component {
  static propTypes = {
    requestRegister: PropTypes.func.isRequired
  };
  state = {
    email: "",
    name: "",
    password: "",
    confirmedPassword: "",
    currentStatus: "",
  };
  componentWillReceiveProps = newProps => {
    let currentStatus = "";
    if (newProps.user) {
      if (newProps.user.error) {
        currentStatus = newProps.user.error;
      } else if (newProps.user.message) {
        currentStatus = newProps.user.message;
      }
    }
    this.setState( {currentStatus});
  };
  register = () => {
    this.props.requestRegister( {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      "password-confirm": this.state.confirmedPassword,
    });
    this.setState({email: "", name: "", password: "", confirmedPassword: ""});
  };
  render() {
    return (
      <div className={css(styles.centered, styles.background)}>
        <div className={css(styles.registerContainer, styles.centered)}>
          <input placeholder="your name" className={css(styles.input)} onChange={e => this.setState({name: e.target.value})}></input>
          <input placeholder="your@example.com" className={css(styles.input)} onChange={e => this.setState({email: e.target.value})}></input>
          <input placeholder="your password" type="password" className={css(styles.input)} onChange={e => this.setState({password: e.target.value})}></input>
          <input placeholder="confirm password" type="password" className={css(styles.input)} onChange={e => this.setState({confirmedPassword: e.target.value})}></input>
          <div className={css(styles.status)}>{this.state.currentStatus}</div>
          <button className={css(styles.button)} onClick={this.register}>Sign up</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    requestRegister: payload => dispatch(requestRegister(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);


const styles = StyleSheet.create({
  centered: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContext: "center",
  },
  mainContainer: {
    border: "1px black solid",
    width: 450,
    height: 400,
    marginTop: 150,
  },
  input: {
    resize: "none",
    fontSize: 18,
    padding: '10px 10px 10px 5px',
    marginTop: 10,
    border: "none",
    background: '#fafafa',
    borderRadius: 0,
    width: '100%',
    borderBottom: '1px solid #757575'
  },
  title: {
    color: "white",
    fontSize: 50,
    marginBottom: 40,
  },
  registerContainer: {
    background: '#fafafa',
    border: '1px solid #ebebeb',
    padding: '3em 2em 2em 2em',
    position: 'relative',
    width: 400,
  },
  status: {
    width: 286,
    height: 25,
  },
  button: {
    padding: '12px 24px',
    margin: '.3em 0 1em 0',
    width: '100%',
    fontSize: 16,
    fontWeight: 400,
    background: "#FF5A5F",
    border: 0,
    borderRadius: 0,
    lineHeight: '20px',
    color: "white",
  },
  background: {
    backgroundColor: "#f0f0f0",
    padding: '5em 0'
  },
});
