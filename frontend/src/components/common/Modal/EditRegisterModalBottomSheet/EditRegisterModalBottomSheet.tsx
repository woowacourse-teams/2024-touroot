import { Button, Modal, Spinner, Text } from "@components/common";

import useUnmountAnimation from "@hooks/useUnmountAnimation";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import { Tturi } from "@assets/svg";

import * as S from "./EditRegisterModalBottomSheet.styled";

export interface EditRegisterModalBottomSheetProps {
  mainText: string;
  subText: string;
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const EditRegisterModalBottomSheet = ({
  mainText,
  subText,
  isOpen,
  isPending,
  onClose,
  onConfirm,
}: EditRegisterModalBottomSheetProps) => {
  const { isRendered } = useUnmountAnimation({ isOpen });

  return (
    isRendered && (
      <Modal isOpen={isOpen} onCloseModal={onClose} position="bottom" boxLayoutGap="xxxl">
        <Modal.Header headerPosition="center">
          <S.HandleBar />
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
          <Button
            variants="secondary"
            onClick={onClose}
            data-cy={CYPRESS_DATA_MAP.modalBottomSheet.closeButton}
          >
            취소
          </Button>
          <Button
            variants="primary"
            onClick={onConfirm}
            disabled={isPending}
            data-cy={CYPRESS_DATA_MAP.modalBottomSheet.confirmButton}
          >
            {isPending ? <Spinner variants="circle" size={20} /> : "확인"}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default EditRegisterModalBottomSheet;
