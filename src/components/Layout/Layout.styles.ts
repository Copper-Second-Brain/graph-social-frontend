// src/components/Layout/Layout.styles.ts
import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 280px;
  max-width: calc(100% - 280px);

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 100%;
    padding: 1rem;
  }
`;

export const Sidebar = styled.aside`
  position: fixed;
  width: 280px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-right: 1px solid rgba(224, 216, 255, 0.4);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  z-index: 10;

  @media (max-width: 768px) {
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.open {
      transform: translateX(0);
    }
  }
`;

export const NavLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #4a2b9e;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: rgba(106, 61, 232, 0.1);
  }

  &.active {
    background: linear-gradient(
      90deg,
      rgba(106, 61, 232, 0.2) 0%,
      rgba(156, 109, 255, 0.2) 100%
    );
    color: #6a3de8;
    font-weight: 600;
  }

  svg {
    font-size: 1.25rem;
  }
`;

export const MobileMenuButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a3de8 0%, #9c6dff 100%);
  color: white;
  border: none;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(106, 61, 232, 0.3);
  z-index: 20;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const PageContainer = styled.div`
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(106, 61, 232, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
`;
