import React, { FC, memo } from 'react';

import Link from 'next/link';

import Container from '../Container';
import CartButton from '../CartButton';
import ToggleThemeButton from '../ToggleThemeButton';
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
        <Link href="/" passHref>
          <Title className="tittle">SHOP</Title>
        </Link>
        
        <NavigationButton>
          <Link href="/" passHref legacyBehavior>
            <LinkText>Home</LinkText>
          </Link>
          <Link href="/record" passHref legacyBehavior>
            <LinkText>Record</LinkText>
          </Link>
          <ToggleThemeButton />
          <CartButton />
        </NavigationButton>
      </HeaderWrapper>
    </Container>
  </StyledHeader>
);

export default memo(Header);