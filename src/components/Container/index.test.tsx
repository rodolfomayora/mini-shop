import { render, screen } from '@testing-library/react';

import { Container } from '.';

describe('Component: Container', () => {
  test('Should renders children props correctly', () => {
    const Compnent = () => <div>element 2</div>;
    render(
      <Container>
        <div>element 1</div>
        <Compnent />
      </Container>
    );

    const element1 = screen.getByText(/^element 1$/i);
    const element2 = screen.getByText(/^element 2$/i);

    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
  });
});