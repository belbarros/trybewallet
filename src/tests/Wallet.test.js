import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';

describe('A página wallet', () => {
    test('Se o Header é renderizada corretamente', () => {
        renderWithRouterAndRedux(<Wallet />);

        const emailField = screen.getByTestId('email-field');
        const sum = screen.getByTestId('total-field');
        
        expect(emailField).toBeInTheDocument();
        expect(sum).toBeInTheDocument();
    });
    test('O formulário', async () => {
        renderWithRouterAndRedux(<Wallet />);

        const valueInp = screen.getByTestId('value-input');
        const descriptInput = screen.getByTestId('description-input');
        const currencyInput = screen.getByTestId('currency-input');
        const methodInput = screen.getByTestId('method-input');
        const tagInput = screen.getByTestId('tag-input');
        const button = screen.getByRole('button', { name: 'Adicionar despesa' });

        
        expect(valueInp).toBeInTheDocument();
        expect(descriptInput).toBeInTheDocument();
        expect(currencyInput).toBeInTheDocument();
        expect(methodInput).toBeInTheDocument();
        expect(tagInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        userEvent.type(valueInp, 100);
        userEvent.type(descriptInput, 'A');
        userEvent.click(button);

        const valueCell = await screen.findByRole('cell', { name: /100/i });
        expect(valueCell).toBeInTheDocument();

        const deleteBtn = await screen.getByTestId('delete-btn');
        expect(deleteBtn).toBeInTheDocument();

    });
});

