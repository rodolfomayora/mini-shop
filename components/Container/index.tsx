import React, { FC } from 'react';

import { StyledContainer } from './styles';

const Container: FC = ({ children }) => (
  <StyledContainer>
    {children}
  </StyledContainer>
);

export default Container;