import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isBtnDisabled: true,
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.handleBtn(); });
  };

  // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  handleBtn = () => {
    const { email, password } = this.state;
    const minPass = 6;
    const regex = /\S+@\S+\.\S+/;
    if (password.length >= minPass && regex.test(email)) {
      this.setState({
        isBtnDisabled: false,
      }, () => {});
    } else {
      this.setState({
        isBtnDisabled: true,
      });
    }
  };

  onSubmit = (e) => {
    const { history, login } = this.props;
    const { email } = this.state;
    // action aqui
    login(email);
    e.preventDefault();
    history.push('/carteira');
  };

  render() {
    const { email, password, isBtnDisabled } = this.state;
    return (
      <div className="login-div">
        <h1>yourWallet.</h1>
        <form className="form">
          <label htmlFor="email" className='input-label'>
            E-mail:
            <br />
            <input
              data-testid="email-input"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleInput }
            />
          </label>
          <br />
          <label htmlFor="password" className='input-label'>
            Senha:
            <br />
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleInput }
            />
          </label>
          <br />
          <button
            type="button"
            disabled={ isBtnDisabled }
            onClick={ this.onSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
