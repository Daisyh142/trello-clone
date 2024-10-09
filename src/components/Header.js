import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background: #0079bf;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Trello Clone</Title>
    </HeaderContainer>
  );
};

export default Header;