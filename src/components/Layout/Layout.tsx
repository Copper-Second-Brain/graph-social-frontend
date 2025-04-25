// src/components/Layout/Layout.tsx
import React from "react";
import {
  Outlet,
  NavLink as RouterNavLink,
  useNavigate,
} from "react-router-dom";
import {
  LayoutContainer,
  MainContent,
  Sidebar,
  NavLink,
} from "./Layout.styles";
import {
  AiFillHome,
  AiOutlineUser,
  AiOutlinePlus,
  AiOutlineLogout,
  AiOutlineGlobal,
} from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(106, 61, 232, 0.1);
`;

const HeaderTitle = styled.h2`
  color: #6a3de8;
  margin: 0;
  font-size: 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a3de8 0%, #9c6dff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

const UserName = styled.span`
  font-weight: 500;
  color: #2d2146;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #6a3de8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(106, 61, 232, 0.1);
  }
`;

const Logo = styled.div`
  padding: 1rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #6a3de8;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const NavItem = styled(RouterNavLink)`
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

const NavFooter = styled.div`
  margin-top: auto;
  padding: 1rem;
`;

export const Layout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get first letter of username for avatar
  const userInitial = currentUser?.username.charAt(0).toUpperCase() || "U";

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>
          <AiOutlineGlobal />
          Knowledge Graph
        </Logo>

        <nav>
          <NavItem
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <AiFillHome />
            Home
          </NavItem>

          <NavItem
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <AiOutlineUser />
            Profile
          </NavItem>

          <NavItem
            to="/create"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <AiOutlinePlus />
            Create
          </NavItem>
        </nav>

        <NavFooter>
          <LogoutButton onClick={handleLogout}>
            <AiOutlineLogout />
            Logout
          </LogoutButton>
        </NavFooter>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>Knowledge Graph Social</HeaderTitle>

          <UserInfo>
            <UserName>{currentUser?.username}</UserName>
            <UserAvatar>{userInitial}</UserAvatar>
          </UserInfo>
        </Header>

        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};
