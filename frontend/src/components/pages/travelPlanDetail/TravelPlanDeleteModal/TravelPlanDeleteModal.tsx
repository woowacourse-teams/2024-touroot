import { Button, Modal, Text } from "@components/common";

import { Tturi } from "@assets/svg";

import * as S from "./TravelPlanDeleteModal.styled";

interface TravelPlanDeleteModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  onClickDeleteButton: () => void;
}

const TravelPlanDeleteModal = ({
  isOpen,
  onCloseModal,
  onClickDeleteButton,
}: TravelPlanDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onCloseModal={onCloseModal}>
      <Modal.Header />
      <Modal.Body direction="column" css={S.modalBodyStyle}>
        <Tturi />
        <S.TextContainer>
          <Text textType="body" css={S.mainTextStyle}>
            여행 계획을 삭제할까요?
          </Text>
          <Text textType="detail" css={S.subTextStyle}>
            삭제한 후에는 여행 계획을 다시 복구할 수 없어요.
          </Text>
        </S.TextContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variants="primary" onClick={onClickDeleteButton}>
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TravelPlanDeleteModal;
