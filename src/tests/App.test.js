import React from 'react';
import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../App';
import rootReducer from '../redux/reducers';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';

describe('Página de Login', () => {
    test('Se a página de login é renderizada corretamente', () => {
        const teste = renderWithRouterAndRedux(<App />);

        const email = screen.getByText(/e-mail/i);
        const password = screen.getByText(/senha/i);
        const button = screen.getByRole('button', { name: 'Entrar' });
        
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        
        const { pathname } = teste.history.location;
        expect(pathname).toBe('/');
        
        userEvent.type(email, 'teste@teste.com');
        userEvent.type(password, '123456');
        userEvent.click(button);
    });
});
