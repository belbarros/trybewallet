import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';

describe('Página de Login', () => {
    test('Se a página de login é renderizada corretamente', () => {
        const teste = renderWithRouterAndRedux(<App />);

        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');
        const button = screen.getByRole('button', { name: 'Entrar' });
        
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        
        const { pathname } = teste.history.location;
        expect(pathname).toBe('/');
    });

    test('Simulação de login', () => {
        const loginTest = renderWithRouterAndRedux(<App />);

        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');
        const button = screen.getByRole('button', { name: 'Entrar' });

        userEvent.type(email, 'teste@teste.com');
        userEvent.type(password, '123456');
        userEvent.click(button);

        const { pathname } = loginTest.history.location;
        expect(pathname).toBe('/carteira');
    });
});
