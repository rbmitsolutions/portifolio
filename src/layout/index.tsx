import React, { useState } from "react";
import Image from "next/image";

//components
import { Button } from "@src/components/button";
import { NavBar } from "./navbar";
import { Input } from "@src/components/input";
import { FaBars, FaSearch } from "react-icons/fa";

//styles
import styled, { css, useTheme } from "styled-components";
interface ILayout {
  children: React.ReactNode;
  toggleTheme: () => void;
}

export default function Layout({ children, toggleTheme }: ILayout) {
  const { title } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  function closeLayer() {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }

  return (
    <LayoutContainer isSearchOpen={isSearchOpen} isMenuOpen={isMenuOpen}>
      <HeaderContainer>
        <Button
          icon={<FaBars />}
          shape='icon'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        {title === "dark" ? (
          <Image
            width={100}
            height={40}
            alt='logo'
            src='/rbm-gray.png'
            className='tablet'
          />
        ) : (
          <Image
            width={100}
            height={40}
            alt='logo'
            src='/rbm-colors.png'
            className='tablet'
          />
        )}
      </HeaderContainer>
      <div className='backgroundLayer' onClick={() => closeLayer()} />
      <div className='wrap'>
        <NavBar
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          toggleTheme={toggleTheme}
          isMenuOpen={isMenuOpen}
        />
        <SearchContainer isOpen={isSearchOpen}>
          <div className='search-header'>
            <h2>Search</h2>
            <Input placeholder='Search' icon={<FaSearch />} />
          </div>
        </SearchContainer>

        <div className='content'>
          {/* <div>
            <Header
              routers={routers.filter((router) => {
                if (userPermisson(user?.permissions, router.authorization)) {
                  return router;
                }
              })}
              routerOn={findRouterOn(routers, user?.id)}
            />
            </div>
            <div className='footer'>
            <Footer />
        </div> */}
          <div className='page'>{children}</div>
        </div>
      </div>
    </LayoutContainer>
  );
}

interface ILayoutContainer {
  isSearchOpen: boolean;
  isMenuOpen: boolean;
}

const LayoutContainer = styled.div<ILayoutContainer>`
  position: relative;
  .backgroundLayer {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    z-index: 2;
    left: 0;
    transition: left 0.1s ease-in-out;
  }
  .wrap {
    display: flex;
    position: relative;
    .content {
      flex: 1;
      overflow: hidden;
      .page {
        min-height: 100vh;
        width: 100%;
        padding: 1rem;
        max-width: 900px;
        margin: 0 auto;
      }
    }
  }
  ${({ theme, isSearchOpen, isMenuOpen }) => css`
    .content {
      background-color: ${theme.colors.primary_90};
    }
    .backgroundLayer {
      left: ${isSearchOpen || isMenuOpen ? "0" : "-100vw"};
    }
  `}

  @media (max-width: 450px) {
    .wrap {
      ${({ theme }) => css`
        background-color: ${theme.colors.primary_90};
      `}
    }
  }
`;
const HeaderContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 2;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.03);

  ${({ theme }) => css`
    background-color: ${theme.colors.primary_100};
  `}
  @media (max-width: 450px) {
    display: flex;
  }
`;
interface ISearchContainer {
  isOpen: boolean;
}

const SearchContainer = styled.div<ISearchContainer>`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 70%;
  max-width: 450px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 2;
  transition: all 0.3s ease-in-out;

  .search-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 250px;
    padding: 2rem;

    h2 {
      margin-bottom: 2rem;
      font-weight: bold;
    }
  }
  ${({ theme, isOpen }) => css`
    left: ${isOpen ? "90px" : "-244px"};
    background: ${theme.colors.primary_100};
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
    .search-header {
      color: ${theme.colors.text_100};
      border-bottom: 1px solid ${theme.colors.primary_75};
    }
  `}
  @media (max-width: 1250px) {
    ${({ isOpen }) => css`
      left: ${isOpen ? "90px" : "-400px"};
    `}
  }
  @media (max-width: 450px) {
    display: none;
  }
`;
