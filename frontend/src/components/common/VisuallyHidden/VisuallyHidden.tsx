import * as S from "./VisuallyHidden.styled";

const VisuallyHidden = ({ children }: React.PropsWithChildren) => {
  return <S.Layout>{children}</S.Layout>;
};

export default VisuallyHidden;
