import React from "react";
import styled, { css } from "styled-components";

//components
import { UserPhoto } from "@src/components/userPhoto";
import { Post } from "@src/components/post";

//layout
import Layout from "@src/layout";

export default function Home() {
  return (
    <Container>
      <MainContainer>
        <Post
          data={{
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
        {/* <Post
          data={{
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
        /> */}
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
