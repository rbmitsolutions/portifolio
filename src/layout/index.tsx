import React, { useState } from "react";
import Image from "next/image";

//components
import { NavBar } from "./navbar";
import { Input } from "@src/components/input";
import { FaSearch } from "react-icons/fa";
import { ThemeToogle } from "@src/components/themeToogle";

//styles
import styled, { css, useTheme } from "styled-components";

interface ILayout {
  children: React.ReactNode;
  toggleTheme: () => void;
}

export default function Layout({ children, toggleTheme }: ILayout) {
  const { title } = useTheme();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  return (
    <LayoutContainer searchOpen={searchOpen}>
      <div className='backgroundLayer' onClick={() => setSearchOpen(false)} />
      <div className='wrap'>
        <NavBar
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          toggleTheme={toggleTheme}
        />
        <SearchContainer isOpen={searchOpen}>
          <div className='search-header'>
            <h2>Search</h2>
            <Input placeholder='Search' icon={<FaSearch />} />
          </div>
        </SearchContainer>

        <div className='content'>
          <HeaderContainer>
            {title === "dark" ? (
              <Image
                width={40}
                height={40}
                alt='logo'
                src='/icon-logo-gray.png'
                className='tablet'
              />
            ) : (
              <Image
                width={40}
                height={40}
                alt='logo'
                src='/icon-logo-colors.png'
                className='tablet'
              />
            )}
            <ThemeToogle toggleTheme={toggleTheme} />
          </HeaderContainer>
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
  searchOpen: boolean;
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
    transition: left 0.2s ease-in-out;
  }
  .wrap {
    display: flex;
    position: relative;
    .content {
      flex: 1;
      .page {
        min-height: 100vh;
        width: 100%;
        padding: 1rem;
        max-width: 900px;
        margin: 0 auto;
      }
    }
  }
  ${({ theme, searchOpen }) => css`
    .content {
      background-color: ${theme.colors.primary_90};
    }
    .backgroundLayer {
      left: ${searchOpen ? "0" : "-100vw"};
    }
  `}

  @media (max-width: 450px) {
    .wrap {
      .content {
        .page {
          padding-bottom: 120px;
        }
      }
    }
  }
`;
const HeaderContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
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
