import { css } from "@emotion/react";

import { Button, Text } from "@components/common";
import Modal from "@components/common/Modal/Modal";

import theme from "@styles/theme";

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
  return isOpen ? (
    <Modal isOpen={isOpen} onCloseModal={onCloseModal}>
      <Modal.Header />
      <Modal.Body direction="column" style={{ gap: "1.6rem", padding: "2.6rem 0" }}>
        <Tturi />
        <S.TextContainer>
          <Text textType="body" style={{ fontWeight: 700 }}>
            여행 계획을 삭제할까요?
          </Text>
          <Text
            textType="detail"
            css={css`
              color: ${theme.colors.text.secondary};
            `}
          >
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
  ) : null;
};

export default TravelPlanDeleteModal;
