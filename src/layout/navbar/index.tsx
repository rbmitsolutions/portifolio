import React from "react";
import Image from "next/image";
import { FaHome, FaSearch, FaRegPaperPlane } from "react-icons/fa";

//components
import { ThemeToogle } from "@src/components/themeToogle";

//styles
import styled, { css, useTheme } from "styled-components";

interface INavBar {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: (status: boolean) => void;
  toggleTheme: () => void;
}

export function NavBar({
  isSearchOpen,
  setIsSearchOpen,
  toggleTheme,
  isMenuOpen,
}: INavBar) {
  const { title } = useTheme();

  return (
    <Container isSearchOpen={isSearchOpen} isMenuOpen={isMenuOpen}>
      <div className='logo-display'>
        {title === "dark" ? (
          <Image
            width={120}
            height={45}
            alt='logo'
            src='/rbm-gray.png'
            className='web'
          />
        ) : (
          <Image
            width={120}
            height={45}
            alt='logo'
            src='/rbm-colors.png'
            className='web'
          />
        )}
        {title === "dark" ? (
          <Image
            width={50}
            height={50}
            alt='logo'
            src='/icon-logo-gray.png'
            className='tablet'
          />
        ) : (
          <Image
            width={50}
            height={50}
            alt='logo'
            src='/icon-logo-colors.png'
            className='tablet'
          />
        )}
      </div>

      <ul>
        <li>
          <FaHome />
          <small>Home</small>
        </li>
        <li className='search' onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <FaSearch />
          <small>Search</small>
        </li>
        <li>
          <FaRegPaperPlane />
          <small>Message</small>
        </li>
        <li>
          <FaRegPaperPlane />
          <small>Profile</small>
        </li>
      </ul>
      <div className='theme'>
        <ThemeToogle toggleTheme={toggleTheme} />
      </div>
    </Container>
  );
}

interface IContainer {
  isSearchOpen: boolean;
  isMenuOpen: boolean;
}

const Container = styled.nav<IContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  padding: 1rem;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 3;
  transition: all 0.2s ease-in-out;
  .logo-display {
    margin-top: 2rem;
    height: 50px;
    width: 100%;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      transition: all 0.1s ease-in-out;
    }
    .tablet {
      opacity: 0;
    }
  }
  ul {
    width: 100%;
    margin-top: 1rem;
    li {
      display: flex;
      align-items: center;
      justify-content: left;
      margin-top: 1rem;
      font-size: 1.4rem;
      padding: 1rem;
      position: relative;
      border-radius: 5rem;
      cursor: pointer;
      width: 100%;
      height: 55px;
      svg {
        position: absolute;
        font-size: 1.2rem;
        transition: all 0.2s ease-in-out;
      }

      small {
        margin-left: 2.5rem;
        transition: all 0.1s ease-in-out;
      }
      :hover {
        svg {
          font-size: 1.4rem;
        }
      }
    }
  }
  .theme {
    position: absolute;
    bottom: 1rem;
  }

  ${({ theme, isSearchOpen }) => css`
    width: ${isSearchOpen ? "90px" : "280px"};
    background: ${theme.colors.primary_100};
    border-right: 1px solid ${theme.colors.primary_75};
    .logo-display {
      .web {
        opacity: ${isSearchOpen && "0"};
      }
      .tablet {
        opacity: ${isSearchOpen && "1"};
      }
    }
    ul {
      .search {
        border: ${isSearchOpen && `1px solid ${theme.colors.text_25}`};
      }
      li {
        background: ${theme.colors.primary_100};
        overflow: hidden;

        svg,
        small {
          color: ${theme.colors.text_50};
        }
        svg {
          margin-right: ${isSearchOpen && "0"};
        }
        small {
          opacity: ${isSearchOpen && "0"};
        }

        :hover {
          background: ${theme.colors.primary_90};

          svg,
          small {
            color: ${theme.colors.text_75};
          }
        }
      }
    }
  `}

  @media (max-width: 1250px) {
    width: 90px;
    .logo-display {
      .web {
        opacity: 0;
      }
      .tablet {
        opacity: 1;
      }
    }
    ul {
      li {
        justify-content: center;

        small {
          display: none;
        }
      }
    }
  }
  @media (max-width: 450px) {
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    height: 400px;
    width: 0px;
    overflow: hidden;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    ul {
      .search {
        display: none;
      }
      li {
        align-items: center;
        justify-content: flex-start;
        svg {
          position: relative;
        }
      }
    }

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    ${({ theme, isMenuOpen }) => css`
      border-right: 1px solid ${theme.colors.primary_75};
      border-top: 1px solid ${theme.colors.primary_75};
      border-bottom: 1px solid ${theme.colors.primary_75};
      width: ${isMenuOpen ? "80px" : "0"};
      padding: ${isMenuOpen ? "1rem" : "0"};
      img {
        display: ${isMenuOpen ? "block" : "none"};
      }
    `}
  }
`;
