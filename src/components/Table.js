import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
                      // onClick={}
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

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.obj).isRequired,
};

export default connect(mapStateToProps, null)(Table);
