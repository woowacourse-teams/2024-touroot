import { useModalContext } from "@contexts/ModalProvider";

import IconButton from "@components/common/IconButton/IconButton";

import * as S from "./ModalHeader.styled";

interface ModalHeaderProps extends React.PropsWithChildren {
  hasCloseIcon?: boolean;
  buttonPosition?: "left" | "right";
}

const ModalHeader = ({
  children,
  hasCloseIcon = true,
  buttonPosition = "right",
}: ModalHeaderProps) => {
  const onCloseModal = useModalContext();
  return (
    <S.Layout>
      {buttonPosition === "left" && hasCloseIcon && (
        <IconButton onClick={onCloseModal} size="12" iconType="x-icon" />
      )}
      <S.TitleWrapper>{children}</S.TitleWrapper>
      {buttonPosition === "right" && hasCloseIcon && (
        <IconButton onClick={onCloseModal} size="12" iconType="x-icon" />
      )}
    </S.Layout>
  );
};

export default ModalHeader;
