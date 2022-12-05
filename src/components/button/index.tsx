import React from "react";
import { FaAngellist, FaHourglassStart } from "react-icons/fa";

//styles
import styled, { css } from "styled-components";

// //hooks
// import { useAuthHooks } from "@src/hooks";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: "btn" | "icon";
  title?: any;
  icon?: JSX.Element;
  size?: "extraSmall" | "small" | "normal" | "big";
  maxWidth?: string;
  color?: string;
  disabled?: boolean;
  backgroundColor?: string;
}

export function Button({
  shape = "btn",
  title,
  icon,
  size = "normal",
  disabled,
  color,
  maxWidth,
  backgroundColor = "transparent",
  ...props
}: IButton) {
  // const { isLoading } = useAuthHooks();

  const buttonSize = {
    extraSmall: {
      padding: "0.4rem",
      fontSize: "0.4rem",
    },
    small: {
      padding: "0.6rem",
      fontSize: "0.6rem",
    },
    normal: {
      padding: "0.7rem",
      fontSize: "0.8rem",
    },
    big: {
      padding: "1.2rem",
      fontSize: "1.2rem",
    },
  };
  const iconButtonSize = {
    extraSmall: {
      width: "22px",
      height: "22px",
      padding: "0.3rem",
      fontSize: "0.6rem",
      fontSizeLoadingIcon: "0.4rem",
    },
    small: {
      width: "30px",
      height: "30px",
      padding: "0.5rem",
      fontSize: "1.4rem",
      fontSizeLoadingIcon: "0.8rem",
    },
    normal: {
      width: "40px",
      height: "40px",
      padding: "0.2rem",
      fontSize: "1rem",
      fontSizeLoadingIcon: "0.8rem",
    },
    big: {
      width: "50px",
      height: "50px",
      padding: "0.2rem",
      fontSize: "1.8rem",
      fontSizeLoadingIcon: "1.2rem",
    },
  };

  return (
    <>
      {shape === "btn" ? (
        <ButtonStyle
          style={{
            padding: buttonSize[size]?.padding,
            fontSize: buttonSize[size]?.fontSize,
          }}
          backgroundColor={backgroundColor}
          maxWidth={maxWidth}
          color={color}
          // disabled={(isLoading || disabled) && true}
          {...props}
        >
          {/* {isLoading ? (
            <div className='loader'>
              <FaHourglassStart />
            </div>
          ) : (
            <>
              {icon && icon}
              {title}
            </>
          )} */}
          {icon && icon}
          {title}
        </ButtonStyle>
      ) : (
        <IconButtonStyle
          style={{
            width: iconButtonSize[size]?.width,
            minWidth: iconButtonSize[size].width,
            height: iconButtonSize[size]?.height,
            minHeight: iconButtonSize[size].width,
            padding: iconButtonSize[size]?.padding,
            fontSize: iconButtonSize[size]?.fontSize,
          }}
          backgroundColor={backgroundColor}
          color={color}
          // disabled={(isLoading || disabled) && true}
          {...props}
        >
          {/* {isLoading ? (
            <div className='loader'>
              <FaHourglassStart
                style={{ fontSize: iconButtonSize[size]?.fontSizeLoadingIcon }}
              />
            </div>
          ) : icon ? (
            icon
          ) : (
            <FaAngellist />
          )} */}
          {icon ? icon : <FaAngellist />}
        </IconButtonStyle>
      )}
    </>
  );
}

interface IButtonStyle {
  maxWidth?: string;
  color?: string;
  backgroundColor?: string;
}

const ButtonStyle = styled.button<IButtonStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 1rem;
  text-transform: capitalize;

  width: 100%;
  overflow: hidden;

  :disabled {
    opacity: 0.5;
  }

  .loader {
    animation: Spin 1.3s infinite linear;
  }

  @keyframes Spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  ${({ theme, maxWidth, backgroundColor, color }) => css`
    background-color: ${backgroundColor
      ? backgroundColor
      : theme.colors.primary_100};
    color: ${color ? color : theme.colors.logo_100};
    max-width: ${maxWidth};
    svg {
      color: ${color ? color : theme.colors.logo_100};
    }
  `}
`;
interface IIconButtonStyle {
  backgroundColor?: string;
  color?: string;
}

const IconButtonStyle = styled.button<IIconButtonStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  border-radius: 0.3rem;
  overflow: hidden;

  :disabled {
    opacity: 0.5;
  }

  .loader {
    animation: Spin 1.3s infinite linear;
  }

  @keyframes Spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  ${({ color, theme, backgroundColor }) => css`
    background-color: ${backgroundColor
      ? backgroundColor
      : theme.colors.primary_100};
    color: ${color
      ? color
      : backgroundColor
      ? theme.colors.text_100
      : theme.colors.primary_100};
    svg {
      color: ${color ? color : theme.colors.text_100};
    }
  `}
`;
