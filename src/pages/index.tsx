import React from "react";
import styled, { css, useTheme } from "styled-components";

//components
import { UserPhoto } from "@src/components/userPhoto";
import { Post } from "@src/components/post";

//layout
import Layout from "@src/layout";
import { StoryDisplay } from "@src/components/storyDisplay";

export default function Home() {
  const { title } = useTheme();
  return (
    <Container>
      <MainContainer>
        <StoriesContainer>
          <StoryDisplay
            data={{
              id: 1,
              stories: [
                {
                  id: 1,
                  url: "/raphael-foto.jpg",
                },
                {
                  id: 2,
                  url: "/raphael-foto.jpg",
                },
                {
                  id: 3,
                  url: "/raphael-foto.jpg",
                },
                {
                  id: 4,
                  url: "/raphael-foto.jpg",
                },
              ],
              user: {
                name: "raphaelbmesquita",
                photo: "/raphael-foto.jpg",
              },
            }}
          />
        </StoriesContainer>
        <Post
          data={{
            id: 1,
            date: new Date(),
            description: "dqouwbdiuqwdqwudqwdbq",
            content: [
              {
                id: 1,
                url: "/raphael-foto.jpg",
              },
              {
                id: 2,
                url: "/raphael-foto.jpg",
              },
              {
                id: 3,
                url: "/raphael-foto.jpg",
              },
              {
                id: 4,
                url: "/raphael-foto.jpg",
              },
            ],
            likes: 150,
            comments: [
              "odwbqodw bqodbw oqbdiqwdi qwodbq wod qwpodhqwoud qwdoipq dqwd qwoubd qwd oqwbd qwoub",
            ],
            user: {
              name: "raphaelbmesquita",
              photo: "/raphael-foto.jpg",
              subTitle: "Raphael Mesquita",
            },
          }}
        />
        <Post
          data={{
            id: 2,
            date: new Date(),
            description: "dqouwbdiuqwdqwudqwdbq",
            content: [
              {
                id: 1,
                url: "/raphael-foto.jpg",
              },
            ],
            likes: 150,
            comments: [
              "odwbqodw bqodbw oqbdiqwdi qwodbq wod qwpodhqwoud qwdoipq dqwd qwoubd qwd oqwbd qwoub",
            ],
            user: {
              name: "raphaelbmesquita",
              photo: "/raphael-foto.jpg",
              subTitle: "Raphael Mesquita",
            },
          }}
        />
        <Post
          data={{
            id: 3,
            date: new Date(),
            description: "dqouwbdiuqwdqwudqwdbq",
            content: [
              {
                id: 1,
                url: "/raphael-foto.jpg",
              },
              {
                id: 2,
                url: "/raphael-foto.jpg",
              },
              {
                id: 3,
                url: "/raphael-foto.jpg",
              },
              {
                id: 4,
                url: "/raphael-foto.jpg",
              },
            ],
            likes: 150,
            comments: [
              "odwbqodw bqodbw oqbdiqwdi qwodbq wod qwpodhqwoud qwdoipq dqwd qwoubd qwd oqwbd qwoub",
            ],
            user: {
              name: "raphaelbmesquita",
              photo: "/raphael-foto.jpg",
              subTitle: "Raphael Mesquita",
            },
          }}
        />
      </MainContainer>
      <SideContainer>
        <UserPhoto
          size='big'
          url='/rbm-colors.png'
          label='rbm.itsolutions'
          smallLabel='rbmitsolutions'
        />
        <h3>Suggestions for you</h3>
        <div className='sugestion'>
          <UserPhoto
            // size='small'
            url='/rbm-colors.png'
            label='rbm.itsolutions'
            smallLabel='rbmitsolutions'
          />
          <strong className='fallow'>Fallow</strong>
        </div>
        <div className='sugestion'>
          <UserPhoto
            // size='small'
            url='/rbm-colors.png'
            label='rbm.itsolutions'
            smallLabel='rbmitsolutions'
          />
          <strong className='fallow'>Fallow</strong>
        </div>
        <div className='sugestion'>
          <UserPhoto
            // size='small'
            url='/rbm-colors.png'
            label='rbm.itsolutions'
            smallLabel='rbmitsolutions'
          />
          <strong className='fallow'>Fallow</strong>
        </div>
      </SideContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
`;

const StoriesContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  height: 100px;
  width: 100%;
  max-width: 470px;
  margin: 0 auto;
  border-radius: 0.5rem;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => css`
    background: ${theme.colors.primary_100};
    border: 1px solid ${theme.colors.primary_75};
  `};
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: sticky;
  top: 0;
  width: 350px;
  height: 100vh;
  padding: 2rem;
  gap: 1rem;
  h3 {
    margin: 0.5rem 0;
    font-weight: bold;
    font-size: 1rem;
    text-transform: capitalize;
  }
  .sugestion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .fallow {
      font-size: 0.8rem;
      font-weight: bold;
    }
  }

  ${({ theme }) => css`
    h3 {
      color: ${theme.colors.text_50};
    }
    .sugestion {
      .fallow {
        color: ${theme.colors.logo_100};
      }
    }
  `}
  @media (max-width: 900px) {
    display: none;
  }
`;

Home.layout = Layout;
