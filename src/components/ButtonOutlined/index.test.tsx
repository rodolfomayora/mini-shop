import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonOutlined } from '.';

describe('Component: ButtonOutlined', () => {
  test('Should renders children props', () => {
    render(<ButtonOutlined>Test</ButtonOutlined>);
    const button = screen.getByRole('button', { name: /^test$/i });
    expect(button).toBeInTheDocument();
  });

  test('Should applies custom props', () => {
    render(<ButtonOutlined disabled>Test</ButtonOutlined>)
    const button = screen.getByRole('button', { name: /^test$/i });
    expect(button).toBeDisabled();
  });

  test('Should handle click events', async () => {
    const user = userEvent.setup();
    const mockFn = vi.fn();
    render(<ButtonOutlined onClick={mockFn}>Test</ButtonOutlined>);
    
    const button = screen.getByRole('button', { name: /^test$/i });
    await user.click(button);
    
    expect(mockFn).toBeCalledTimes(1);
  });
});