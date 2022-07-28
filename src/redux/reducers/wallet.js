// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa esta sendo editada
  idToEdit: 0, // valor numérico que armazena id da despesa sendo editada
};

function wallet(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default wallet;
