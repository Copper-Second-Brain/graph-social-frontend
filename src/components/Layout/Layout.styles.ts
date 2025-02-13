// src/components/Layout/Layout.styles.ts
import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  margin-left: 240px;
`;

export const Sidebar = styled.nav`
  position: fixed;
  width: 240px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid var(--border-color);
  padding: 20px;
`;

export const NavLink = styled.a`
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 4px 0;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--background-color);
  }

  svg {
    margin-right: 12px;
  }
`;
