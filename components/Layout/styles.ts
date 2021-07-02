import styled from 'styled-components';

import { breakpoints } from '../../styles/config';

export const MainContent = styled.main`
  padding-top: 40px;
  padding-bottom: 40px;

  @media screen and (min-width: ${breakpoints.medium}) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;