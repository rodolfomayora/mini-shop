import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('Component: Button', () => {
  test('Should renders children props', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button', { name: /^test$/i });
    expect(button).toBeInTheDocument();
  });

  test('Should applies custom props', () => {
    render(<Button disabled>Test</Button>)
    const button = screen.getByRole('button', { name: /^test$/i });
    expect(button).toBeDisabled();
  });

  test('Should handle click events', async () => {
    const user = userEvent.setup();
    const mockFn = vi.fn();
    render(<Button onClick={mockFn}>Test</Button>);
    
    const button = screen.getByRole('button', { name: /^test$/i });
    await user.click(button);
    
    expect(mockFn).toBeCalledTimes(1);
  });
});