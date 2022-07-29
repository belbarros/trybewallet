import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div className="header">
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">Despesa total: 0</div>
        <div data-testid="header-currency-field">BRL</div>
        Header
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
