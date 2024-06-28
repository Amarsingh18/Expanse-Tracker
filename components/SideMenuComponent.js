import styled, { css } from "styled-components";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 90px;
  padding-top: 90px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const VRSLogoImage = styled.img`
  margin-top: 15px;
  margin-bottom: 28px;
`;

const MenuImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

const MenuContainer = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 24px;
  margin: 8px 0;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  ${(props) =>
    props.isSelected
      ? css`
          background-color: #007bff;
          color: #ffffff;
        `
      : css`
          background-color: transparent;
          color: #333333;
        `}

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#007bff" : "#f0f0f0")};
    color: ${(props) => (props.isSelected ? "#ffffff" : "#333333")};
  }
`;

const SideMenuComponent = (props) => {
  const onMenuClick = (activeMenu) => {
    props.changeTab(activeMenu);
  };

  return (
    <Container>
      <MenuContainer
        isSelected={props.selectedTab === "home"}
        onClick={() => onMenuClick("home")}
      >
        <MenuImage src="/images/wallet.png" />
      </MenuContainer>
      <MenuContainer
        isSelected={props.selectedTab === "categories"}
        onClick={() => onMenuClick("categories")}
      >
        <MenuImage src="/images/tag.png" />
      </MenuContainer>
      <MenuContainer
        isSelected={props.selectedTab === "reports"}
        onClick={() => onMenuClick("reports")}
      >
        <MenuImage src="/images/pie-chart.png" />
      </MenuContainer>
    </Container>
  );
};

export default SideMenuComponent;
