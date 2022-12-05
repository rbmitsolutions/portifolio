import React from "react";
import styled, { css, useTheme } from "styled-components";

//components
import { UserPhoto } from "@src/components/userPhoto";
import { Post } from "@src/components/post";

//layout
import Layout from "@src/layout";
import { StoryDisplay } from "@src/components/storyDisplay";
import axios from "axios";
import { data, static_posts } from "./api/data";

export default function Home() {
  // async function getData() {
  //   console.log(1);
  //   await axios.get("http://localhost:3000/api/users").then((data) => {
  //     console.log(data);
  //   });
  // }

  // getData();
  console.log(static_posts);
  const { title } = useTheme();
  return (
    <Container>
      <MainContainer>
        <StoriesContainer>
          {/* <StoryDisplay
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
          /> */}
        </StoriesContainer>
        {static_posts.map((post) => {
          return <Post key={post?.id} data={post} />;
        })}
      </MainContainer>
      <SideContainer>
        <UserPhoto
          url='/rbmicon.jpg'
          label='rbm.itsolutions'
          smallLabel='rbmitsolutions'
        />
        <h3>Suggestions for you</h3>
        {data?.user.map((user) => {
          return (
            <div className='sugestion' key={user?.id}>
              <UserPhoto
                size='small'
                url={user?.photo}
                label={user?.name}
                smallLabel={user?.user}
              />
              <strong className='fallow'>Fallow</strong>
            </div>
          );
        })}
      </SideContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
`;
const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: sticky;
  top: 0;
  width: 350px;
  height: 500px;
  padding: 1rem;
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
    cursor: pointer;
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
