import RemoveCompletedTodosMutation from "../mutations/RemoveCompletedTodosMutation";

import React from "react";
import { graphql, createFragmentContainer } from "react-relay";

const TodoListFooter = ({
  relay,
  user,
  user: { completedCount, totalCount },
}) => {
  const handleRemoveCompletedTodosClick = () => {
    RemoveCompletedTodosMutation.commit(relay.environment, user);
  };

  const numRemainingTodos = totalCount - completedCount;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{numRemainingTodos}</strong> item
        {numRemainingTodos === 1 ? "" : "s"} left
      </span>

      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={handleRemoveCompletedTodosClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default createFragmentContainer(TodoListFooter, {
  user: graphql`
    fragment TodoListFooter_user on User {
      id
      userId
      completedCount
      totalCount
    }
  `,
});
