import React from "react";
import Modal from "react-modal";

//styles
import styled from "styled-components";

interface ICustomModal {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export function CustomModal({
  isModalOpen,
  closeModal,
  children,
}: ICustomModal) {
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
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <Content>{children}</Content>
    </Modal>
  );
}

const Content = styled.div`
  z-index: 1000;
  max-height: 85vh;
  background-color: transparent;
`;
