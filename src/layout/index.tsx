import React, { useState } from "react";

//styles
import styled, { css } from "styled-components";
import { NavBar } from "./navbar";
import { Input } from "@src/components/input";
import { FaSearch } from "react-icons/fa";

interface ILayout {
  children: React.ReactNode;
  toggleTheme: () => void;
}

export default function Layout({ children, toggleTheme }: ILayout) {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  return (
    <LayoutContainer>
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

const LayoutContainer = styled.div`
  position: relative;
  .wrap {
    display: flex;
    position: relative;
    .content {
      flex: 1;
      .page {
        min-height: 100vh;
        width: 100%;
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
      }
    }
  }
  ${({ theme }) => css`
    .content {
      background-color: ${theme.colors.primary_90};
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
  z-index: 1;
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
