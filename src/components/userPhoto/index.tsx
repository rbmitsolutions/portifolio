import React, { useState } from "react";
import Router from "next/router";
import {
  FaCamera,
  FaFileUpload,
  FaRegTrashAlt,
  FaUserAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

//styles
import styled, { css, useTheme } from "styled-components";

//components

//services

//hooks

interface IUserPhoto {
  url?: string;
  label?: string;
  smallLabel?: string;
  size?: "small" | "medium" | "big" | "extraBig";
}

export function UserPhoto({
  url,
  label,
  size = "medium",
  smallLabel,
}: IUserPhoto) {
  const photoStyle = {
    image: {
      extraBig: "150px",
      big: "70px",
      medium: "45px",
      small: "30px",
    },
    text: {
      extraBig: "2rem",
      big: "1.2rem",
      medium: "1rem",
      small: "0.7rem",
    },
    smallText: {
      extraBig: "1.2rem",
      big: "0.8rem",
      medium: "0.7rem",
      small: "none",
    },
  };

  return (
    <>
      <Container>
        <UserPhotoContainer>
          <PhotoIcon
            style={{
              width: photoStyle?.image[size],
              height: photoStyle?.image[size],
            }}
          >
            {!url ? <FaUserAlt /> : <img src={url} alt='User Image' />}
          </PhotoIcon>

          {(label || smallLabel) && (
            <StrongText
              style={{
                fontSize: photoStyle?.text[size],
              }}
            >
              {label}
              <span
                style={{
                  fontSize: photoStyle?.smallText[size],
                }}
              >
                {smallLabel}
              </span>
            </StrongText>
          )}
        </UserPhotoContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  .addImage {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
const UserPhotoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  cursor: pointer;
  img {
    border-radius: 100%;
    cursor: pointer;
  }
`;

const PhotoIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  overflow: hidden;

  img,
  svg {
    width: 100%;
    height: auto;
  }
  ${({ theme }) => css`
    background-color: ${theme.colors.primary_50};
    color: ${theme.colors.text_25};
  `}
`;

const StrongText = styled.strong`
  display: flex;
  flex-direction: column;

  font-size: 1rem;
  font-weight: bold;

  span {
    font-weight: normal;
  }
  ${({ theme }) => css`
    color: ${theme.colors.text_100};
  `}
`;
