// src/components/Layout/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import {
  LayoutContainer,
  MainContent,
  Sidebar,
  NavLink,
} from "./Layout.styles";
import { AiFillHome, AiOutlineUser, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Sidebar>
        <Link to="/">
          <NavLink>
            <AiFillHome size={24} />
            Home
          </NavLink>
        </Link>
        <Link to="/profile">
          <NavLink>
            <AiOutlineUser size={24} />
            Profile
          </NavLink>
        </Link>
        <Link to="/create">
          <NavLink>
            <AiOutlinePlus size={24} />
            Create
          </NavLink>
        </Link>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};
