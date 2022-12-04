import React from "react";
import Image from "next/image";
import {
  FaHome,
  FaSearch,
  FaRegPaperPlane,
  FaSun,
  FaMoon,
} from "react-icons/fa";

//styles
import styled, { css, useTheme } from "styled-components";
import { ThemeToogle } from "@src/components/themeToogle";

interface INavBar {
  searchOpen: boolean;
  setSearchOpen: (status: boolean) => void;
  toggleTheme: () => void;
}

export function NavBar({ searchOpen, setSearchOpen, toggleTheme }: INavBar) {
  const { title } = useTheme();

  return (
    <Container isOpen={searchOpen}>
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
        <li className='search' onClick={() => setSearchOpen(!searchOpen)}>
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
  isOpen: boolean;
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

  ${({ theme, isOpen }) => css`
    width: ${isOpen ? "90px" : "280px"};
    background: ${theme.colors.primary_100};
    border-right: 1px solid ${theme.colors.primary_75};
    .logo-display {
      .web {
        opacity: ${isOpen && "0"};
      }
      .tablet {
        opacity: ${isOpen && "1"};
      }
    }
    ul {
      .search {
        border: ${isOpen && `1px solid ${theme.colors.text_25}`};
      }
      li {
        background: ${theme.colors.primary_100};
        overflow: hidden;

        svg,
        small {
          color: ${theme.colors.text_50};
        }
        svg {
          margin-right: ${isOpen && "0"};
        }
        small {
          opacity: ${isOpen && "0"};
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
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    position: fixed;
    top: calc(100vh - 100px);
    width: 100%;
    height: 100px;

    .tablet {
      display: none;
    }
    .logo-display {
      display: none;
    }
    ul {
      display: flex;
      gap: 1rem;
      margin: 0;
      .search {
        display: none;
      }
      li {
        margin: 0;
        border-radius: 10px;
      }
    }
    .theme {
      display: none;
    }
  }
`;
