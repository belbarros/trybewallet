// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_API_SUCESS } from '../actions/index';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa esta sendo editada
  idToEdit: 0, // valor numérico que armazena id da despesa sendo editada
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case RECEIVE_API_SUCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
