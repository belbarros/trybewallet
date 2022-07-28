// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_API_SUCESS = 'RECEIVE_API_SUCESS';
export const RECEIVE_API_FAILURE = 'RECEIVE_API_FAILURE';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export const requestAPI = () => ({
  type: REQUEST_API,
});

export const receiveSucess = (currencies) => ({
  type: RECEIVE_API_SUCESS,
  currencies,
});

export const receiveFailure = (error) => ({
  type: RECEIVE_API_FAILURE,
  error,
});

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    try {
      const request = await fetch('https://economia.awesomeapi.com.br/json/all');
      const response = await request.json();
      // Retirar apenas as currencies (KEYS)
      dispatch(receiveSucess(response));
    } catch (error) {
      dispatch(receiveFailure(error));
    }
  };
}
