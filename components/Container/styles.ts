import styled from 'styled-components';
import { breakpoints } from '../../styles/config';

export const StyledContainer = styled.div`
  padding-left: 25px;
  padding-right: 25px;

  @media screen and (min-width: ${breakpoints.medium}) {
    padding-left: 50px;
    padding-right: 50px;
  }

  @media screen and (min-width: ${breakpoints.large}) {
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
    /* 100px represent padding left and right of previous media query */
    max-width: 891px;
  }

  @media screen and (min-width: ${breakpoints.extraLarge}) {
    max-width: 1240px;
  }
`;