import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, sum } = this.props;
    return (
      <div className="header">
        <div data-testid="email-field">
          { email }
        </div>
        <div data-testid="total-field">
          { sum }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
        Header
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  sum: store.wallet.totalSum,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  sum: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
