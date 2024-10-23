import { Button, Modal } from "@components/common";

import * as S from "./ProfileImageEditModalBottomSheet.styled";

export interface ProfileImageEditModalBottomSheetProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileImageEditModalBottomSheet = ({
  isOpen,
  onClose,
  children,
}: ProfileImageEditModalBottomSheetProps) => {
  return (
    <Modal isOpen={isOpen} onCloseModal={onClose} position="bottom" boxLayoutGap="l">
      <Modal.Header headerPosition="center">
        <S.HandleBar />
      </Modal.Header>
      <Modal.Body direction="column" css={S.modalBodyStyle}>
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

export default ProfileImageEditModalBottomSheet;
