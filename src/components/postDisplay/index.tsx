import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import Modal from "react-modal";

//components
import { Button } from "../button";

//styles
import styled from "styled-components";

interface IContent {
  id: number;
  url: string;
}

interface IData {
  id: number;
  description: string;
  content: IContent[];
  likes: number;
  comments: string[];
  date: Date;
  user: {
    name: string;
    subTitle: string;
    photo: string;
  };
}

interface IPostDisplay {
  comments: boolean;
  data: IData;
}

export function PostDisplay({ comments, data }: IPostDisplay) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(1,1,1,0.5)",
      zIndex: "999",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0rem",
      border: "0px",
      zIndex: "999",
      width: "90%",
      maxWidth: "500px",
    },
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <Container>
          <h1>oi</h1>
        </Container>
      </Modal>
      {comments ? (
        <CommentContainer
          className='views-date comments'
          onClick={() => setIsModalOpen(true)}
        >
          View all {data?.comments.length} comments
        </CommentContainer>
      ) : (
        <Button
          shape='icon'
          size='small'
          icon={<FaRegComment />}
          onClick={() => setIsModalOpen(true)}
        />
      )}
    </>
  );
}

const Container = styled.div``;
const CommentContainer = styled.div`
  font-weight: 300;
  cursor: pointer;
`;
