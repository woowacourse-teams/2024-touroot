import Icon from "@components/common/Icon/Icon";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import * as S from "./Checkbox.styled";

interface CheckboxProps {
  isChecked: boolean;
}

const Checkbox = ({
  isChecked,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & CheckboxProps) => {
  return (
    <S.Layout $isChecked={isChecked ?? false}>
      <S.Checkbox type="checkbox" {...props} />
      {isChecked && <Icon size="15" color={PRIMITIVE_COLORS.white} iconType="check" />}
    </S.Layout>
  );
};

export default Checkbox;
