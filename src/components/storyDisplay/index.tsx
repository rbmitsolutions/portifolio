import React, { useRef, useState } from "react";

//components
import { UserPhoto } from "../userPhoto";
import { CustomModal } from "../customModal";

//styles
import styled, { css } from "styled-components";

interface IStory {
  id: number;
  url: string;
}

interface IData {
  id: number;
  stories: IStory[];
  user: {
    name: string;
    photo: string;
  };
}

interface IStoryDisplay {
  data: IData;
}

export function StoryDisplay({ data }: IStoryDisplay) {
  const AMOUNT_OF_IMAGES = data?.stories.length;
  const NUMBERS_OF_CONTENT_TO_SHOW = 1;

  const COTENT_WIDTH_REF: any = useRef(null);
  const WINDOW_CONTENT: any = useRef(null);

  const [scrolledTimes, setScrolledTimes] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    const element = document.getElementById(`story-image-${data?.id}`);
    element?.scrollTo({
      left: windowContent * newValue,
      behavior: "smooth",
    });
    setScrolledTimes(newValue);
  };

  return (
    <>
      <CustomModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <ImageContainer ref={WINDOW_CONTENT}>
          <div className='next' onClick={() => handleScrollImage(true)} />
          <div className='prev' onClick={() => handleScrollImage(false)} />
          <div className={`story-image`} id={`story-image-${data?.id}`}>
            {data?.stories.map((img) => {
              return (
                <img key={img?.id} src={img?.url} ref={COTENT_WIDTH_REF} />
              );
            })}
          </div>
        </ImageContainer>
      </CustomModal>
      <Container onClick={() => setIsModalOpen(true)}>
        <UserPhoto size='big' url={data?.user?.photo} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 0.2rem;
  height: 80px;
  width: 80px;

  background: linear-gradient(45deg, orange, blue, green);
  background-size: 1100% 300%;
  animation: colors 10s ease-in-out infinite;
  :before {
    position: absolute;
    height: 73px;
    width: 73px;
    border-radius: 100%;
    background: white;
    content: " ";
  }
  @keyframes colors {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  .story-image {
    display: flex;
    align-items: center;
    position: relative;
    overflow-x: hidden;
    height: 85vh;
    max-width: 500px;
    height: 102%;
    img {
      height: 102%;
      width: 100%;
    }
  }

  .prev {
    content: " ";
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999999;
    cursor: pointer;
  }
  .next {
    content: " ";
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 999999;
    cursor: pointer;
  }
`;
