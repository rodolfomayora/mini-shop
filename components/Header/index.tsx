import React, { FC } from 'react';
import CartButton from '../CartButton';

const Header: FC = () => {
  return (
    <header style={{backgroundColor: 'hsl(0, 0%, 60%)'}}>
      
      <h1>HEADER</h1>

      <CartButton />
    </header>
  )
}

export default Header;