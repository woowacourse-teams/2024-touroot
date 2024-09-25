import { Button, Modal, Text } from "@components/common";

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
  return (
    <Modal isOpen={isOpen} onCloseModal={onClose} position="bottom" boxLayoutGap="l">
      <Modal.Header buttonPosition="center">
        <S.HandleBar />
      </Modal.Header>
      <Modal.Body direction="column" css={S.modalBodyStyle}>
        <Text textType="bodyBold">{mainText}</Text>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variants="secondary" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SingleSelectionTagModalBottomSheet;
