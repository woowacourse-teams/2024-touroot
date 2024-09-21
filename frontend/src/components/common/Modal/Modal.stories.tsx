import { useState } from "react";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "@components/common/Button/Button";
import Input from "@components/common/Input/Input";
import Text from "@components/common/Text/Text";

import { copyLinkToClipboard } from "@utils/clipboard";

import theme from "@styles/theme";

import Icon from "../Icon/Icon";
import IconButton from "../IconButton/IconButton";
import Modal from "./Modal";

const meta = {
  title: "common/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
    controls: { disable: true },
  },
  args: { onCloseModal: fn() },
} satisfies Meta<typeof Modal>;

export default meta;

export const ShareModal = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const onToggleModal = () => setIsOpen((prev) => !prev);

    return (
      <>
        <Button onClick={onToggleModal} variants="primary">
          모달 열기
        </Button>
        {isOpen && (
          <Modal isOpen={isOpen} onCloseModal={onToggleModal}>
            <Modal.Header>
              <IconButton onClick={onToggleModal} size="12" iconType="x-icon" />
            </Modal.Header>
            <Modal.Body direction="column" style={{ gap: "1.6rem" }}>
              <img
                style={{ width: "11rem", height: "12.5rem" }}
                src="https://github.com/user-attachments/assets/e37a2008-976f-4f08-9372-f9c144890529"
              />

              <Text textType="bodyBold">여행기를 공유할까요?</Text>
              <div style={{ width: "29rem", position: "relative", marginBottom: "1.6rem" }}>
                <Input
                  disabled
                  value={"https://touroot.kr/travel-plans/a932jdfnd3"}
                  style={{ outline: "none", border: "none" }}
                />
                <Button
                  variants="primary"
                  style={{
                    width: "4rem",
                    height: "2.4rem",
                    position: "absolute",
                    right: "1rem",
                    top: "0.8rem",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => {
                    copyLinkToClipboard("https://touroot.kr/travel-plans/a932jdfnd3");
                    alert("복사가 완료되었어요!");
                  }}
                >
                  복사
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </>
    );
  },
};

export const DeleteModal = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const onToggleModal = () => setIsOpen((prev) => !prev);

    return (
      <>
        <Button onClick={onToggleModal} variants="primary">
          모달 열기
        </Button>
        {isOpen && (
          <Modal isOpen={isOpen} onCloseModal={onToggleModal} boxLayoutGap="l">
            <Modal.Header>
              <IconButton onClick={onToggleModal} size="12" iconType="x-icon" />
            </Modal.Header>
            <Modal.Body direction="column" style={{ gap: "1.6rem" }}>
              <img
                style={{ width: "6rem", height: "7rem" }}
                src="https://github.com/user-attachments/assets/e37a2008-976f-4f08-9372-f9c144890529"
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text textType="bodyBold">여행 계획을 삭제할까요?</Text>
                <Text textType="detail" style={{ color: theme.colors.text.secondary }}>
                  삭제한 후에는 여행 계획을 다시 복구할 수 없어요.
                </Text>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variants="primary" onClick={onToggleModal}>
                삭제
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  },
};

export const EditRegisterModalBottomSheet = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const onToggleModal = () => setIsOpen((prev) => !prev);

    return (
      <>
        <Button onClick={onToggleModal} variants="primary">
          모달 열기
        </Button>
        {isOpen && (
          <Modal isOpen={isOpen} onCloseModal={onToggleModal} position="bottom" boxLayoutGap="xxxl">
            <Modal.Header buttonPosition="center">
              <div
                style={{
                  width: "5.4rem",
                  height: "0.3rem",
                  borderRadius: "4px",
                  backgroundColor: theme.colors.border,
                  cursor: "pointer",
                }}
              />
            </Modal.Header>
            <Modal.Body direction="column" style={{ gap: "1.6rem" }}>
              <img
                style={{ width: "6rem", height: "7rem" }}
                src="https://github.com/user-attachments/assets/e37a2008-976f-4f08-9372-f9c144890529"
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text textType="bodyBold">여행 계획을 등록할까요?</Text>
                <Text textType="detail" style={{ color: theme.colors.text.secondary }}>
                  등록한 후에도 다시 여행 계획을 수정할 수 있어요.
                </Text>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variants="secondary" onClick={onToggleModal}>
                취소
              </Button>
              <Button variants="primary" onClick={onToggleModal}>
                확인
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  },
};

export const SingleSelectionTagModalBottomSheet = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const onToggleModal = () => setIsOpen((prev) => !prev);

    return (
      <>
        <Button onClick={onToggleModal} variants="primary">
          모달 열기
        </Button>
        {isOpen && (
          <Modal isOpen={isOpen} onCloseModal={onToggleModal} position="bottom" boxLayoutGap="l">
            <Modal.Header buttonPosition="center">
              <div
                style={{
                  width: "5.4rem",
                  height: "0.3rem",
                  borderRadius: "4px",
                  backgroundColor: theme.colors.border,
                  cursor: "pointer",
                }}
              />
            </Modal.Header>
            <Modal.Body direction="column" style={{ gap: "2.4rem", alignItems: "flex-start" }}>
              <Text textType="bodyBold">여행기 정렬을 선택해 주세요!</Text>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Text
                  textType="detailBold"
                  onClick={onToggleModal}
                  style={{ color: theme.colors.primary, cursor: "pointer" }}
                >
                  좋아요순
                </Text>
                <Icon iconType="down-arrow" size="12" color={theme.colors.primary} />
              </div>
              <Text
                textType="detail"
                onClick={onToggleModal}
                style={{ color: theme.colors.text.secondary, cursor: "pointer" }}
              >
                최신순
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button variants="secondary" onClick={onToggleModal}>
                취소
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  },
};
