import type { Meta, StoryObj } from "@storybook/react";

import Button from "../Button/Button";
import BackDrop from "./BackDrop/BackDrop";
import Modal from "./Modal";
import ModalContainer from "./ModalContainer/ModalContainer";
import ModalContent from "./ModalContent/ModalContent";
import ModalFooter from "./ModalFooter/ModalFooter";
import ModalHeader from "./ModalHeader/ModalHeader";

const meta = {
  title: "common/Modal",
  component: Modal,

  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    children: (
      <>
        <BackDrop onClose={() => {}} />
        <ModalContainer>
          <ModalHeader onClose={() => {}} />
          <ModalContent mainText="메인" subText="서브" />
          <ModalFooter>
            <Button color="white" label="흰색" onClick={() => {}} />
            <Button color="primary" label="메인색" onClick={() => {}} />
          </ModalFooter>
        </ModalContainer>
      </>
    ),
  },
};

export const TravelPlanRegistration: Story = {
  args: {
    isOpen: true,
    children: (
      <>
        <BackDrop onClose={() => {}} />
        <ModalContainer>
          <ModalHeader onClose={() => {}} />
          <ModalContent
            mainText="여행 계획을 등록할까요?"
            subText="등록한 후에도 다시 여행 계획을 수정할 수 있어요."
          />
          <ModalFooter>
            <Button color="white" label="취소" onClick={() => {}} />
            <Button color="primary" label="확인" onClick={() => {}} />
          </ModalFooter>
        </ModalContainer>
      </>
    ),
  },
};

export const TravelPlanModification: Story = {
  args: {
    isOpen: true,
    children: (
      <>
        <BackDrop onClose={() => {}} />
        <ModalContainer>
          <ModalHeader onClose={() => {}} />
          <ModalContent
            mainText="여행 계획을 수정할까요?"
            subText="수정한 후에도 다시 여행 계획을 변경할 수 있어요."
          />
          <ModalFooter>
            <Button color="white" label="취소" onClick={() => {}} />
            <Button color="primary" label="확인" onClick={() => {}} />
          </ModalFooter>
        </ModalContainer>
      </>
    ),
  },
};

export const TravelogueRegistration: Story = {
  args: {
    isOpen: true,
    children: (
      <>
        <BackDrop onClose={() => {}} />
        <ModalContainer>
          <ModalHeader onClose={() => {}} />
          <ModalContent
            mainText="여행기를 등록할까요?"
            subText="등록한 후에도 다시 여행기를 수정할 수 있어요."
          />
          <ModalFooter>
            <Button color="white" label="취소" onClick={() => {}} />
            <Button color="primary" label="확인" onClick={() => {}} />
          </ModalFooter>
        </ModalContainer>
      </>
    ),
  },
};

export const TravelogueModification: Story = {
  args: {
    isOpen: true,
    children: (
      <>
        <BackDrop onClose={() => {}} />
        <ModalContainer>
          <ModalHeader onClose={() => {}} />
          <ModalContent
            mainText="여행기를 수정할까요?"
            subText="수정한 후에도 다시 여행기를 변경할 수 있어요."
          />
          <ModalFooter>
            <Button color="white" label="취소" onClick={() => {}} />
            <Button color="primary" label="확인" onClick={() => {}} />
          </ModalFooter>
        </ModalContainer>
      </>
    ),
  },
};
