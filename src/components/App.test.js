import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders mine field', () => {
    const { container } = render(<App />);
    const gameElement = container.querySelector('.mine-field');
    expect(gameElement).toBeInTheDocument();
});

it('renders mine field with default 96 cells', () => {
    const { container } = render(<App />);
    const cellElements = container.querySelectorAll('.mine-cell');
    expect(cellElements.length).toEqual(96);
});
