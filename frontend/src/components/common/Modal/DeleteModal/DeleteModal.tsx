import { Button, IconButton, Modal, Spinner, Text } from "@components/common";

import { Tturi } from "@assets/svg";

import * as S from "./DeleteModal.styled";

type TravelContent = "travelogue" | "travelPlan";

interface DeleteModalProps {
  isOpen: boolean;
  isPending: boolean;
  travelContent: TravelContent;
  onCloseModal: () => void;
  onClickDeleteButton: () => void;
}

const DeleteModal = ({
  isOpen,
  isPending,
  travelContent,
  onCloseModal,
  onClickDeleteButton,
}: DeleteModalProps) => {
  const travelContentLabel = travelContent === "travelogue" ? "여행기를" : "여행 계획을";

  const MAIN_TEXT = `${travelContentLabel} 삭제할까요?`;
  const SUB_TEXT = `삭제한 후에는 ${travelContentLabel} 다시 복구할 수 없어요.`;

  return (
    <Modal isOpen={isOpen} onCloseModal={onCloseModal} boxLayoutGap="l">
      <Modal.Header>
        <IconButton onClick={onCloseModal} size="12" iconType="x-icon" />
      </Modal.Header>
      <Modal.Body direction="column" css={S.modalBodyStyle}>
        <Tturi />
        <S.TextContainer>
          <Text textType="bodyBold">{MAIN_TEXT}</Text>
          <Text textType="detail" css={S.subTextStyle}>
            {SUB_TEXT}
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
