import React, { FC } from 'react';
import Link from 'next/Link';
import Container from '../Container';
import CartButton from '../CartButton';
import { StyledHeader, HeaderWrapper, Title } from './styles';

const Header: FC = () => {
  return (
    <StyledHeader>
      <Container>
        <HeaderWrapper>
          <Title className="tittle">HEADER</Title>

          <button>
            <Link href="/">
              <a>Home</a>
            </Link>
          </button>

          <button>
            <Link href="/Cart">
              <a>Go to Cart</a>
            </Link>
          </button>

          <CartButton />

        </HeaderWrapper>
      </Container>
    </StyledHeader>
  )
}

export default Header;