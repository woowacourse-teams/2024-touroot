import { useLocation } from "react-router-dom";

import { TravelPlanTodo } from "@type/domain/travelPlan";

import { usePatchTravelPlanTodo } from "@queries/usePatchTravelPlanTodo";

import { Checkbox, Text } from "@components/common";

import { extractLastPath } from "@utils/extractId";
import { isUUID } from "@utils/uuid";

import * as S from "./TravelPlanTodoItem.styled";

const TravelPlanTodoItem = ({ todo }: { todo: TravelPlanTodo }) => {
  const location = useLocation();
  const id = extractLastPath(location.pathname);
  const { mutate: mutateUpdateTodoStatus } = usePatchTravelPlanTodo(id);

  return (
    <S.TodoListItemContainer key={todo.id}>
      <Checkbox
        checked={todo.isChecked}
        onChange={(e) => {
          if (!isUUID(id))
            mutateUpdateTodoStatus({
              todoId: String(todo.id),
              isChecked: e.target.checked,
            });
        }}
        isChecked={todo.isChecked ?? false}
      />
      <Text textType="detail">{todo.content}</Text>
    </S.TodoListItemContainer>
  );
};

export default TravelPlanTodoItem;
