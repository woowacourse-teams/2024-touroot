import { Checkbox, IconButton, Input } from "@components/common";

import * as S from "./PlaceTodoListItem.styled";

interface PlaceTodoListItemProps {
  onChangeContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteTodo: () => void;
}

const PlaceTodoListItem = ({ onChangeContent, onDeleteTodo }: PlaceTodoListItemProps) => {
  return (
    <S.Layout>
      <S.ToDoListItemWrapper>
        <Checkbox isChecked={false} />
        <Input
          placeholder="할 일을 입력해주세요."
          onChange={onChangeContent}
          variants="none"
          spellCheck="false"
        />
      </S.ToDoListItemWrapper>
      <IconButton size="16" iconType="recycle-bin" onClick={onDeleteTodo} />
    </S.Layout>
  );
};

export default PlaceTodoListItem;
