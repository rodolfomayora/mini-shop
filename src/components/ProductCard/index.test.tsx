import { render, screen, within } from '@testing-library/react';
import { ProductCard } from '.';

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('Component: ProductCard', () => {
  test('Should renders correctly all required data', () => {

    const dummyProduct = {
      id: '1',
      title: 'Product name',
      price: 100.00,
      description: 'Product description',
      category: 'category name',
      image: '/images/test.jpg',
    }

    const mockFn = vi.fn();

    render(
      <ProductCard
        productId={dummyProduct.id}
        productImage={dummyProduct.image}
        productName={dummyProduct.title}
        productPrice={dummyProduct.price}
        productQuantity={10}
        addToCart={mockFn}
      />
    );

    const card = screen.getByRole('article');
    const image = within(card).getByRole('img', { name: /^product name$/i });
    const title = within(card).getByRole('heading', {
      level: 3,
      name: /^product name$/i,
    });
    const price = within(card).getByText('$100.00');
    const addToCartButton = within(card).getByRole('button', { name: /^add to cart$/i });
    const viewDetailButton = within(card).getByRole('button', { name: /^view detail$/i });

    expect(card).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(addToCartButton).toBeInTheDocument();
    expect(viewDetailButton).toBeInTheDocument();
  });
});