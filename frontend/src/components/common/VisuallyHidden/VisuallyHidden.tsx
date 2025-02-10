import * as S from "./VisuallyHidden.styled";

const VisuallyHidden = ({ children, ...props }: React.PropsWithChildren) => {
  return <S.Layout {...props}>{children}</S.Layout>;
};

export default VisuallyHidden;
