import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { email, sum } = this.props;
    return (
      <div className="header">
        <div data-testid="email-field" className='email'>
          {`Olá ${ email }!`}
        </div>
        <div data-testid="total-field" className='total'>
          { `Sua carteira: R$ ${ Math.abs(sum).toFixed(2) } BRL` }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  sum: store.wallet.totalSum,
  currency: store.wallet.currency
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  sum: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
