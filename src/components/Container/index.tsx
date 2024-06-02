import type { ReactNode } from 'react';
import { StyledContainer } from './styles';

export function Container ({ children }: { children: ReactNode }) {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  );
}