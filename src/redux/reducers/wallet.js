// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_API_SUCESS, REMOVE, TOTAL_SUM, UPDATE_EXPENSES, UPDATE_SUM,
} from '../actions/index';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa esta sendo editada
  idToEdit: 0, // valor numérico que armazena id da despesa sendo editada
  totalSum: 0,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case RECEIVE_API_SUCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case TOTAL_SUM:
    return {
      ...state,
      totalSum: state.totalSum + action.payload,
    };
  case REMOVE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case UPDATE_SUM:
    return {
      ...state,
      totalSum: state.totalSum - action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
