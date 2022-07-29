import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, description, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor da despesa:
            <input
              data-testid="value-input"
              type="text"
              name="value"
              value={ value }
              onChange={ this.handleInput }
            />
          </label>
          <br />
          <label htmlFor="description">
            Descrição da despesa:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleInput }
            />
          </label>
          <br />
          {/* Currencies -> Map do estado global removendo USDT */}
          <label htmlFor="currency">
            <select
              data-testid="currency-input"
              name="currency"
            >
              {
                currencies.map((currency) => (
                  <option
                    value={ currency }
                    key={ currency }
                  >
                    { currency }
                  </option>))
              }
            </select>
          </label>
          <br />
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleInput }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-credito">Cartão de crédito</option>
              <option value="cartao-debito">Cartão de débito</option>
            </select>
          </label>
          <br />
          <label htmlFor="tag">
            Método de pagamento:
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleInput }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <br />
          <button
            type="button"
            // onClick={}
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPI()),
});

WalletForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
