import React, { FC } from 'react';
import Link from 'next/link';
import Container from '../Container';
import CartButton from '../CartButton';
import {
  HeaderWrapper,
  LinkText,
  NavigationButton,
  StyledHeader,
  Title,
} from './styles';

const Header: FC = () => (
  <StyledHeader>
    <Container>
      <HeaderWrapper>
        <Link href="/">
          <a><Title className="tittle">SHOP</Title></a>
        </Link>
        
        <NavigationButton>
          <Link href="/">
            <LinkText>Home</LinkText>
          </Link>

          <Link href="/ShoppingRecord">
            <LinkText>Record</LinkText>
          </Link>

          <CartButton />
          
        </NavigationButton>
      </HeaderWrapper>
    </Container>
  </StyledHeader>
)

export default Header;