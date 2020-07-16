import styled from 'styled-components';

const MainContainerStyled = styled.div`
  display: flex;
  max-width: 1280px;
  margin: auto;

  @media (max-width: 768px) {
    flex-flow: column;
  }
`;

export default {
  MainContainerStyled,
};
