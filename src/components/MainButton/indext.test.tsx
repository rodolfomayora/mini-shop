import { render, screen } from '@testing-library/react';
import MainButton from '.';

describe('Component: MainButton', () => {
  test('Should renders correctly', () => {
    render(<MainButton>Test</MainButton>);
    const button = screen.getByRole('button', { name: /^test$/i });
    expect(button).toBeInTheDocument();
  });
});