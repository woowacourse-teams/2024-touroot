import React from "react";

import { Button, Modal, Text } from "@components/common";

import useKeyDown from "@hooks/useKeyDown/useKeyDown";

import * as S from "./SingleSelectionTagModalBottomSheet.styled";

export interface EditRegisterModalBottomSheetProps extends React.PropsWithChildren {
  mainText: string;
  isOpen: boolean;
  onClose: () => void;
}

const SingleSelectionTagModalBottomSheet = ({
  mainText,
  isOpen,
  onClose,
  children,
}: EditRegisterModalBottomSheetProps) => {
  const { modalRef, handleKeyDown } = useKeyDown({ isOpen });

  return (
    <Modal isOpen={isOpen} onCloseModal={onClose} position="bottom" boxLayoutGap="l">
      <Modal.Header headerPosition="center">
        <S.HandleBar />
      </Modal.Header>
      <div ref={modalRef} onKeyDown={handleKeyDown}>
        <Modal.Body direction="column" css={S.modalBodyStyle}>
          <Text textType="bodyBold">{mainText}</Text>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variants="secondary" onClick={onClose}>
            닫기
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default SingleSelectionTagModalBottomSheet;
