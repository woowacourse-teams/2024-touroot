import { Button, IconButton, Modal, Spinner, Text } from "@components/common";

import { Tturi } from "@assets/svg";

import * as S from "./DeleteModal.styled";

interface DeleteModalProps {
  isOpen: boolean;
  isPending: boolean;
  mainText: string;
  subText: string;
  onCloseModal: () => void;
  onClickDeleteButton: () => void;
}

const DeleteModal = ({
  isOpen,
  isPending,
  mainText,
  subText,
  onCloseModal,
  onClickDeleteButton,
}: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onCloseModal={onCloseModal} boxLayoutGap="l">
      <Modal.Header>
        <IconButton onClick={onCloseModal} size="12" iconType="x-icon" />
      </Modal.Header>
      <Modal.Body direction="column" css={S.modalBodyStyle}>
        <Tturi />
        <S.TextContainer>
          <Text textType="bodyBold">{mainText}</Text>
          <Text textType="detail" css={S.subTextStyle}>
            {subText}
          </Text>
        </S.TextContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variants="primary" onClick={onClickDeleteButton} disabled={isPending}>
          {isPending ? <Spinner variants="circle" size={20} /> : "삭제"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
