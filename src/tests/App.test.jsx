import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the main component with search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/search for a smartphone/i);
  expect(searchInput).toBeInTheDocument();
});
