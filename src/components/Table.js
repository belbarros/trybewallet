import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExp, updateTotal } from '../redux/actions';
import './Table.css';

class Table extends Component {
  updateTotal = (value) => {
    const { update } = this.props;
    update(value);
    return Number(value).toFixed(2);
  };

  deleteExpense = (e) => {
    const { remove } = this.props;
    const current = Number(e.exchangeRates[e.currency].ask);
    this.updateTotal(Number((current * e.value)).toFixed(2));
    remove(e.id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {
            expenses.map((e) => (
              <tbody key={ e.id }>
                <tr>
                  <td>{ e.description }</td>
                  <td>{ e.tag }</td>
                  <td>{ e.method }</td>
                  <td>{ parseFloat(e.value).toFixed(2) }</td>
                  <td>{ e.exchangeRates[e.currency].name }</td>
                  <td>{ parseFloat(e.exchangeRates[e.currency].ask).toFixed(2) }</td>
                  <td>
                    { parseFloat(
                      (e.value
                    * (e.exchangeRates[e.currency].ask)).toFixed(2),
                    ) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      // onClick={}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpense(e) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          }
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeExp(id)),
  update: (value) => dispatch(updateTotal(value)),
});

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
  sum: store.wallet.totalSum,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.obj).isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
