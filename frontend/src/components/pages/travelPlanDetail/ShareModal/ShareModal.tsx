import { useRef } from "react";

import { useToastContext } from "@contexts/ToastProvider/ToastProvider";

import { Button, Input, Modal, Text } from "@components/common";

import { copyLinkToClipboard } from "@utils/clipboard";

import { tturiUrl } from "@assets/svg";

import * as S from "./ShareModal.style";

interface ShareModalProps {
  isOpen: boolean;
  onToggleModal: () => void;
  shareUrl: string;
}

const ShareModal = ({ isOpen, onToggleModal, shareUrl }: ShareModalProps) => {
  const showToast = useToastContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickCopyButton = () => {
    copyLinkToClipboard(shareUrl);

    const inputRectDetail = inputRef?.current?.getBoundingClientRect();

    if (inputRectDetail) {
      showToast({
        message: "복사가 완료되었습니다.",
        rectDetail: {
          ...inputRectDetail?.toJSON(),
          top: (inputRectDetail?.top ?? 0) + 8,
        },
        status: "success",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onCloseModal={onToggleModal}>
      <Modal.Header />
      <Modal.Body direction="column" css={S.shareModalBodyStyle}>
        <S.TTuriImg src={tturiUrl} />
        <Text textType="body" css={S.textBoldStyle}>
          여행기를 공유할까요?
        </Text>
        <S.ShareInputContainer>
          <Input ref={inputRef} disabled value={shareUrl} css={S.notOutlineStyle} />
          <Button onClick={handleClickCopyButton} variants="primary" css={S.copyUrlButtonStyle}>
            복사
          </Button>
        </S.ShareInputContainer>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;
