// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_API_SUCESS = 'RECEIVE_API_SUCESS';
export const RECEIVE_API_FAILURE = 'RECEIVE_API_FAILURE';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const TOTAL_SUM = 'TOTAL_SUM';
export const REMOVE = 'REMOVE';
export const UPDATE_SUM = 'UPDATE_SUM';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export const requestAPI = () => ({
  type: REQUEST_API,
});

export const receiveSucess = (currencies) => ({
  type: RECEIVE_API_SUCESS,
  payload: currencies,
});

export const receiveFailure = (error) => ({
  type: RECEIVE_API_FAILURE,
  error,
});

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    // Retirar apenas as currencies (KEYS)
    const currencies = Object.keys(response).filter((e) => e !== 'USDT');
    dispatch(receiveSucess(currencies));
  } catch (error) {
    dispatch(receiveFailure(error));
  }
};

export const updateExpenses = (state) => ({
  type: UPDATE_EXPENSES,
  payload: state,
});

export const totalSum = (amount) => ({
  type: TOTAL_SUM,
  payload: amount,
});

export const removeExp = (id) => ({
  type: REMOVE,
  payload: id,
});

export const updateTotal = (value) => ({
  type: UPDATE_SUM,
  payload: value,
});
