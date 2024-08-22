import { TravelPlanTodo } from "@type/domain/travelPlan";

import { Checkbox, IconButton, Input } from "@components/common";

import * as S from "./PlaceTodoListItem.styled";

interface PlaceTodoListItemProps {
  todo?: TravelPlanTodo;
  onChangeContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteTodo: () => void;
}

const PlaceTodoListItem = ({ todo, onChangeContent, onDeleteTodo }: PlaceTodoListItemProps) => {
  return (
    <S.Layout>
      <S.ToDoListItemContainer>
        <Checkbox readOnly isChecked={todo?.checked ?? false} />
        <Input
          value={todo?.content}
          placeholder="할 일을 입력해주세요."
          onChange={onChangeContent}
          autoFocus
          variants="none"
          spellCheck="false"
        />
      </S.ToDoListItemContainer>
      <IconButton size="16" iconType="recycle-bin" onClick={onDeleteTodo} />
    </S.Layout>
  );
};

export default PlaceTodoListItem;
