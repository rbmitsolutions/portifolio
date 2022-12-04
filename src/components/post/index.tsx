import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";

//styles
import styled, { css } from "styled-components";
import { Button } from "../button";
import { UserPhoto } from "../userPhoto";

interface IContent {
  id: number;
  url: string;
}

interface IData {
  user: {
    name: string;
    subTitle: string;
    photo: string;
  };
  description: string;
  content: IContent[];
  likes: number;
  comments: string[];
  date: Date;
}

interface IPost {
  data: IData;
}

export function Post({ data }: IPost) {
  const AMOUNT_OF_IMAGES = data?.content.length;
  const NUMBERS_OF_CONTENT_TO_SHOW = 1;
  const COTENT_WIDTH_REF: any = useRef(null);

  const [scrolledTimes, setScrolledTimes] = useState(0);
  const [liked, setLiked] = useState<boolean>(false);

  function fillHeart() {
    const heart = document.getElementById("heart-svg");
    const heartFilled = document.getElementById("heart-svg-filled");
    if (liked) {
      heart?.classList.remove("liked-animation");
      heartFilled?.classList.remove("liked-animation-filled");
      setLiked(false);
    } else {
      heart?.classList.add("liked-animation");
      heartFilled?.classList.add("liked-animation-filled");
      setLiked(true);
    }
  }

  const handleScrollImage = (isNext: boolean) => {
    const amountToScroll = isNext ? 1 : -1;
    let newValue = amountToScroll + scrolledTimes;

    // Verify if it can still scroll
    // "NUMBERS_OF_CONTENT_TO_SHOW" is the number of dates that we show to user

    if (newValue > AMOUNT_OF_IMAGES - NUMBERS_OF_CONTENT_TO_SHOW) {
      newValue = AMOUNT_OF_IMAGES - NUMBERS_OF_CONTENT_TO_SHOW;
    }

    if (newValue < 0) {
      newValue = 0;
    }

    const windowContent = COTENT_WIDTH_REF?.current?.clientHeight;
    const element = document.getElementById("images");

    element?.scrollTo({
      left: windowContent * newValue,
      behavior: "smooth",
    });
    setScrolledTimes(newValue);
  };

  return (
    <Container>
      <div className='post-header'>
        <UserPhoto
          size='small'
          url={data?.user?.photo}
          label={data?.user?.name}
          smallLabel={data?.user?.subTitle}
        />
      </div>
      <div className='content' id='content'>
        {data?.content.length > 1 && (
          <Button
            className='left prev'
            shape='icon'
            icon={<FaArrowAltCircleLeft />}
            backgroundColor='transparent'
            onClick={() => handleScrollImage(false)}
          />
        )}

        <div className='images' id='images'>
          {data?.content?.map((img) => {
            return <img key={img?.id} src={img?.url} ref={COTENT_WIDTH_REF} />;
          })}
        </div>
        {data?.content.length > 1 && (
          <Button
            className='right prev'
            shape='icon'
            icon={<FaArrowAltCircleRight />}
            backgroundColor='transparent'
            onClick={() => handleScrollImage(true)}
          />
        )}
      </div>
      <div className='post-footer'>
        <div className='icons'>
          <div className='heart-container' onClick={() => fillHeart()}>
            <Button
              className='heart'
              shape='icon'
              size='small'
              icon={<FaRegHeart id='heart-svg' className='' />}
            />

            <Button
              className='heart'
              shape='icon'
              size='small'
              icon={<FaHeart id='heart-svg-filled' className='' />}
            />
          </div>
          <Button shape='icon' size='small' icon={<FaRegComment />} />
          <Button shape='icon' size='small' icon={<FaRegPaperPlane />} />
        </div>
        <div className='likes'>
          <Link href='/'>
            <strong>{data?.user?.name}</strong>
          </Link>
          {data?.description && (
            <small>
              {data?.description} dlqwjb dwqdbwqkl bqdqw lqdb wqld bqwl
              dbqwlkdqw boubqwd kljqbwd kjqwbd lqwbd qwlkjb qwlkjbdwlj{" "}
            </small>
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 470px;
  margin: 0 auto;
  border-radius: 0.5rem;
  .post-header {
    display: inline-block;
    padding: 1rem;
  }

  .content {
    position: relative;
    max-height: 500px;
    max-width: 470px;

    .left,
    .right {
      position: absolute;
      font-size: 2rem;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      z-index: 1;
      color: white;
      opacity: 0.5;
      svg {
        position: absolute;
        font-size: 2rem;
      }
    }
    .left {
      left: 0.5rem;
    }
    .right {
      right: 0.5rem;
    }

    .images {
      display: flex;
      align-items: center;
      position: relative;
      overflow-x: scroll;
      height: 100%;
      ::-webkit-scrollbar {
        display: none;
      }
      img {
        width: 101%;
        height: auto;
      }
    }
  }

  .post-footer {
    padding: 1rem;
    .icons {
      display: flex;
      gap: 1rem;
      svg {
        position: absolute;
        font-size: 1.6rem;
      }
      .heart-container {
        position: relative;
        width: 30px;
        .heart {
          position: absolute;
          padding: 0;
          svg {
            position: absolute;
            font-size: 1.6rem;
          }
          #heart-svg {
            opacity: 1;
          }
          #heart-svg-filled {
            opacity: 0;
            color: #af2634;
          }
        }
      }
    }
    .likes {
      margin-top: 1rem;
      a {
        decoration: none;
        strong {
          font-weight: bold;
          cursor: pointer;
        }
      }
      small {
        margin-left: 0.5rem;
      }
    }
  }

  .liked-animation {
    animation: liked 0.6s ease-in-out;
  }
  .liked-animation-filled {
    animation: liked-filled 0.6s ease-in-out;
  }

  ${({ theme }) => css`
    background: ${theme.colors.primary_100};
    border: 1px solid ${theme.colors.primary_75};
    .content {
      background-color: ${theme.colors.primary_0};
    }
    .post-footer {
      .icons {
        svg {
          color: ${theme.colors.text_75};
        }
      }
      .likes {
        a,
        small {
          color: ${theme.colors.text_100};
        }
      }
    }
  `}

  @keyframes liked {
    0% {
      font-size: 1.6rem;
    }
    50% {
      font-size: 1.9rem;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes liked-filled {
    0% {
      opacity: 0;
      font-size: 1.6rem;
    }

    25% {
      font-size: 2.5rem;
    }
    50% {
      font-size: 1.4rem;
    }

    100% {
      opacity: 1;
      font-size: 1.7rem;
    }
  }
`;
