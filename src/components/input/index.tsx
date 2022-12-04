import React from "react";

//styles
import styled, { css } from "styled-components";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: JSX.Element;
  register?: any;
}

export function Input({ register, error, icon, ...props }: IInput) {
  return (
    <InputContainer>
      {icon && <Icon error={error ? true : false}>{icon}</Icon>}
      <InputStyle
        {...register}
        error={error}
        icon={icon ? true : false}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}

interface IInputStyle {
  error?: boolean;
  icon?: boolean;
}

const InputContainer = styled.div`
  position: relative;
`;
const Icon = styled.div<IInputStyle>`
  position: absolute;
  left: 15px;
  transform: translateY(-40%);

  ${({ theme, error }) => css`
    top: ${error ? "38%" : "50%"};
    color: ${error ? theme.colors.red_100 : theme.colors.primary_50};
  `}
`;

const InputStyle = styled.input<IInputStyle>`
  font-size: 15px;
  padding: 0.8rem 0.8rem 0.8rem 0;
  width: 100%;
  border-radius: 0.8rem;
  -webkit-appearance: none;
  :focus {
    outline: none;
  }
  transition: all 0.3s ease-in-out;

  ${({ theme, error, icon }) => css`
    background: ${theme.colors.primary_75};
    padding-left: ${icon ? "2.5rem" : "1rem"};
    border: 3px solid ${error ? theme.colors.red_100 : theme.colors.primary_75};
    color: ${theme.colors.text_100};
    &:disabled {
      opacity: 0.7;
    }
    :focus {
      border: 3px solid
        ${error ? theme.colors.red_100 : theme.colors.primary_50};
      box-shadow: ${"-2px 5px 10px rgba(0,0,0,0.1)"};
    }

    ::placeholder {
      color: ${theme.colors.text_50};
    }
  `}
`;

const ErrorMessage = styled.span`
  font-size: 0.6rem;
  font-weight: bold;
  align-self: end;

  ${({ theme }) => css`
    color: ${theme.colors.red_100};
  `}
`;
