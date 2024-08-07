import { useState } from "react";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import { copyLinkToClipboard } from "@utils/clipboard";

import Button from "@components/common/Button/Button";
import Input from "@components/common/Input/Input";
import Text from "@components/common/Text/Text";

import theme from "@styles/theme";

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
            <Modal.Header />
            <Modal.Body direction="column" style={{ gap: "1.6rem" }}>
              <img
                style={{ width: "11rem", height: "12.5rem" }}
                src="https://github.com/user-attachments/assets/e37a2008-976f-4f08-9372-f9c144890529"
              />

              <Text textType="body" style={{ fontWeight: 700 }}>
                여행기를 공유할까요?
              </Text>
              <div style={{ width: "29rem", position: "relative" }}>
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
                    top: "1.6rem",
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

export const TravelPlanDeleteModal = {
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
            <Modal.Header />
            <Modal.Body direction="column" style={{ gap: "1.6rem", padding: "2.6rem 0" }}>
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
                <Text textType="body" style={{ fontWeight: 700 }}>
                  여행 계획을 삭제할까요?
                </Text>
                <Text textType="detail" style={{ color: theme.colors.text.secondary }}>
                  삭제한 후에는 여행 계획을 다시 복구할 수 없어요.
                </Text>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variants="primary">삭제</Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  },
};
