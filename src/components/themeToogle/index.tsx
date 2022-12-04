import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

//styles
import styled, { css, useTheme } from "styled-components";

interface IThemeToogle {
  toggleTheme: () => void;
}

export function ThemeToogle({ toggleTheme }: IThemeToogle) {
  const { title } = useTheme();
  return (
    <Container onClick={toggleTheme}>
      <FaSun className='sun' />
      <Circle status={title === "light" ? true : false} />
      <FaMoon className='moon' />
    </Container>
  );
}

interface IStatus {
  status: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  position: relative;
  align-items: center;
  width: 60px;
  height: 30px;
  cursor: pointer;
  border-radius: 15px;

  ${({ theme }) => css`
    background: ${theme.colors.primary_75};
    .sun {
      color: ${theme.colors.yellow_100};
    }
    .moon {
      color: ${theme.colors.purple_100};
    }
  `}
`;

const Circle = styled.span<IStatus>`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  position: absolute;
  transition: all 0.2s ease-in-out;
  ${({ theme, status }) => css`
    background: ${theme.colors.primary_100};
    left: ${status ? "4px" : "31px"};
  `}
`;
