import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, updateExpenses, totalSum } from '../redux/actions';
import './WalletForm.css';

const food = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleInput = ({ target }) => {
    // const { name, value } = target;
    this.setState({
      [target.name]: target.value,
    });
  };

  getRates = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    this.setState({
      exchangeRates: response,
    });
  };

  clearState = () => {
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
      exchangeRates: {},
    }));
  };

  getSum = () => {
    const { getValue } = this.props;
    const { value, currency, exchangeRates } = this.state;
    const current = exchangeRates[currency].ask;
    const total = (current * value);
    const roundTotal = parseFloat(total.toFixed(2));
    getValue(roundTotal);
  };

  saveExpense = async () => {
    const { getExpenses } = this.props;
    // pega as rates
    await this.getRates();
    // salva na chave 'expenses' do global
    getExpenses(this.state);
    // atualiza a soma total
    this.getSum();
    // limpa o state.
    this.clearState();
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form className='expense-form'>
          <label htmlFor="value">
            Valor da despesa:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleInput }
            />
          </label>
          <br />
          <label htmlFor="description">
            Descrição:
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
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleInput }
            >
              {
                currencies.map((c) => (
                  <option
                    value={ c }
                    key={ c }
                  >
                    { c }
                  </option>
                ))
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
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <br />
          <label htmlFor="tag">
            Tag:
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleInput }
            >
              <option value={ food }>{ food }</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <br />
          <button
            type="button"
            onClick={ this.saveExpense }
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
  getExpenses: (expense) => dispatch(updateExpenses(expense)),
  getValue: (value) => dispatch(totalSum(value)),
});

WalletForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
