import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";

//components
import { Button } from "../button";
import { UserPhoto } from "../userPhoto";
import { CustomModal } from "../customModal";

//styles
import styled, { css, useTheme } from "styled-components";

interface IContent {
  id: number;
  url: string;
}
interface IUser {
  id: number;
  name: string;
  user: string;
  photo: string;
}

interface IData {
  id: number;
  date: Date;
  description: string;
  content: IContent[];
  likes: number;
  comments?: string[];
  user: IUser;
}

interface IPost {
  data: IData;
}

export function Post({ data }: IPost) {
  const COTENT_WIDTH_REF: any = useRef(null);
  const { colors } = useTheme();
  const [comment, setComment] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [scrolledTimes, setScrolledTimes] = useState(0);
  const [left, setLeft] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(true);

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleScrollImage = (isNext: boolean) => {
    const windowContent = COTENT_WIDTH_REF?.current?.clientHeight;
    const max = data?.content.length * windowContent;
    if (isNext && max - windowContent > Math.abs(left)) {
      setScrolledTimes(scrolledTimes + 1);
      setLeft(left - windowContent);
    } else if (!isNext && Math.abs(left) > 0) {
      setLeft(left + windowContent);
      setScrolledTimes(scrolledTimes - 1);
    }
  };

  const handleWindowSizeChange = () => {
    if (window.innerWidth < 600) {
      setLeft(0);
      setScrolledTimes(0);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <>
      <CustomModal isModalOpen={isModalOpen} closeModal={closeModal}>
        <ModalContainer>
          {data?.description && (
            <div className='description-modal-container'>
              <Link href='/'>
                <UserPhoto size='small' url={data?.user?.photo} />
              </Link>
              <div className='description'>
                <strong>{data?.user?.user}</strong>
                <small>{data?.description}</small>
              </div>
            </div>
          )}
          <div className='modal-comments'>
            <div className='modal-comments-wrap'>
              {data?.comments?.map((comment, index) => {
                return (
                  <div className='modal-container-comment' key={index}>
                    <Link href='/'>
                      <UserPhoto size='small' url={data?.user?.photo} />
                    </Link>
                    <div className='description'>
                      <strong>{data?.user?.user}</strong>
                      <small>{comment}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <CommentInput
            style={{
              padding: "1rem",
              borderTop: `2px solid ${colors.primary_75}`,
              background: colors.primary_100,
            }}
          >
            <input
              onChange={(e) => setComment(e.target.value)}
              className='text-comment-input'
              placeholder='Comment...'
            />
            <Button
              shape='icon'
              size='small'
              icon={<FaRegPaperPlane />}
              backgroundColor={colors.logo_100}
            />
          </CommentInput>
        </ModalContainer>
      </CustomModal>
      <Container>
        <div className='post-header'>
          <UserPhoto
            size='small'
            url={data?.user?.photo}
            label={data?.user?.name}
            smallLabel={data?.user?.user}
          />
        </div>
        <div className='post-content' id='post-content'>
          <FaHeart
            className={`heart-svg-liked ${liked && "heart-svg-liked-active"}`}
          />
          {data?.content.length > 1 && scrolledTimes > 0 && (
            <div
              className='left-container'
              onClick={() => handleScrollImage(false)}
            />
          )}
          {data?.content.length > 1 &&
            scrolledTimes < data?.content.length - 1 && (
              <div
                className='right-container'
                onClick={() => handleScrollImage(true)}
              />
            )}

          <div className='post-images' style={{ left: left }}>
            {data?.content?.map((img) => {
              return (
                <img
                  key={img?.id}
                  src={img?.url}
                  ref={COTENT_WIDTH_REF}
                  id='post-image-content'
                />
              );
            })}
          </div>
        </div>
        <div className='post-footer'>
          <div className='icons'>
            {data?.content.length > 1 && (
              <SliceContainer>
                {data?.content?.map((x, index) => {
                  return (
                    <SliceItem key={x.id} selected={index === scrolledTimes} />
                  );
                })}
              </SliceContainer>
            )}
            <Button
              className='heart'
              shape='icon'
              size='small'
              icon={liked ? <FaHeart id='heart-svg-filled' /> : <FaRegHeart />}
              onClick={() => setLiked(!liked)}
            />
            <Button
              onClick={() => setIsModalOpen(true)}
              shape='icon'
              size='small'
              icon={<FaRegComment />}
            />
          </div>
          <div className='likes-coments'>
            <strong className='likes'>{data?.likes} likes</strong>
            <strong>
              <Link href='/'>{data?.user?.name}</Link>
              {data?.description && <small>{data?.description}</small>}
            </strong>
            <small
              className='views-date comments'
              onClick={() => setIsModalOpen(true)}
            >
              View all {data?.comments?.length} comments
            </small>
            <small className='views-date'>
              {data?.date.toLocaleDateString("en-GB")}
            </small>
            <CommentInput>
              <input
                onChange={(e) => setComment(e.target.value)}
                className='text-comment-input'
                placeholder='Comment...'
              />
              <Button
                shape='icon'
                size='small'
                icon={<FaRegPaperPlane />}
                backgroundColor={colors.logo_100}
              />
            </CommentInput>
          </div>
        </div>
      </Container>
    </>
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

  .post-content {
    position: relative;
    max-height: 500px;
    max-width: 470px;

    .heart-svg-liked{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 10rem;
      color: #ff000075;
      
      z-index: 1;
      opacity: 0 ;
      
    }
    .heart-svg-liked-active{
      animation: liked 0.6s ease-in-out;
    }

    .left-container,
    .right-container {
      position: absolute;
      content: ' ',
      cursor: pointer;
      height: 100%;
      width: 30%;
      z-index: 1;
      cursor: pointer;
    }
    .left-container {
      left: 0;
    }
    .right-container {
      right: 0;
    }

    overflow: hidden;
    .post-images {
      display: flex;
      position: relative;
      left: -300px;
      transition: all 0.5s ease-in-out;
      #post-image-content {
        width: 100%;
        height: auto;
        scroll-snap-align: start;
      }
    }
  }

  .post-footer {
    padding: 1rem;
    .icons {
      display: flex;
      position: relative;
      gap: 0.5rem;
      svg {
        font-size: 1.2rem;
      }
      button {
        padding: 0.2rem !important;
      }
    }
    .likes-coments {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.5rem;

      strong {
        font-weight: bold;
        a {
          decoration: none;
        }
        small {
          margin-left: 0.5rem;
        }
      }
      .views-date {
        font-weight: 300;
      }
      .comments {
        cursor: pointer;
      }
   
    }
  }


  ${({ theme }) => css`
    background: ${theme.colors.primary_100};
    border: 1px solid ${theme.colors.primary_75};
    .post-content {
      background-color: ${theme.colors.primary_0};
    }
    .post-footer {
      .icons {
        svg {
          color: ${theme.colors.text_75};
        }
        button {
          #heart-svg-filled {
            color: ${theme.colors.red_100};
          }
        }
      }
      .likes-coments {
        strong {
          color: ${theme.colors.text_100};
          a,
          small {
            color: ${theme.colors.text_100};
          }
        }
        .views-date {
          color: ${theme.colors.text_75};
        }
      }
    }
  `}

  @keyframes liked {
    0% {
      opacity: 0;
      font-size:10rem;
    }
    50% {
      opacity: 1;
      font-size: 9rem;
    }
    100% {
      opacity: 0;
      font-size: 11rem;
    }
  }

`;

const SliceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  gap: 0.3rem;
  padding: 0.5rem;
  height: 20px;
  z-index: 1;
  border-radius: 20px;

  ${({ theme }) => css`
    background: ${theme.colors.primary_75};
  `}
`;

interface ISliceItem {
  selected: boolean;
}

const SliceItem = styled.div<ISliceItem>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  ${({ theme, selected }) => css`
    background: ${selected
      ? theme.colors.logo_100
      : "rgba(255, 255, 255, 0.616)"};
  `}
`;

const CommentInput = styled.div`
  display: flex;
  gap: 0.5rem;
  .text-comment-input {
    flex: 1;
    height: 30px;
    border-radius: 1px;
    background-color: transparent;
    -webkit-appearance: none;
    border: none;
    :focus {
      border: 3px solid none;
      outline: none;
    }
  }
  ${({ theme }) => css`
    .text-comment-input {
      color: ${theme.colors.text_75};
    }
  `}
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 500px;

  height: 600px;

  .description-modal-container {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    .description {
      margin-left: 0.5rem;
      line-height: 14px;
      strong {
        font-size: 0.7rem;
        font-weight: bold;
        margin-right: 0.5rem;
      }
      small {
        font-size: 0.7rem;
      }
    }
  }

  .modal-comments {
    flex: 1;
    padding: 0 1rem;
    overflow: auto;
    .modal-comments-wrap {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      height: 100%;
      .modal-container-comment {
        display: flex;
        align-items: flex-start;
        padding: 1rem;
        padding: 0.5rem 0rem;
        .description {
          margin-left: 0.5rem;
          line-height: 14px;
          strong {
            font-size: 0.7rem;
            font-weight: bold;
            margin-right: 0.5rem;
          }
          small {
            font-size: 0.7rem;
          }
        }
      }
    }
  }

  ${({ theme }) => css`
    .description-modal-container {
      background: ${theme.colors.primary_100};
      .description {
        strong,
        small {
          color: ${theme.colors.text_75};
        }
      }
    }
    .modal-comments {
      border-top: 1px solid ${theme.colors.primary_75};
      background: ${theme.colors.primary_90};
      .description {
        strong,
        small {
          color: ${theme.colors.text_75};
        }
      }
    }
  `}
`;
