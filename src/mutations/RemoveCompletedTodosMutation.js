import { commitMutation, graphql } from "react-relay";

import { ConnectionHandler } from "relay-runtime";

const mutation = graphql`
  mutation RemoveCompletedTodosMutation($input: RemoveCompletedTodosInput!) {
    removeCompletedTodos(input: $input) {
      deletedTodoIds
      user {
        completedCount
        totalCount
      }
    }
  }
`;

function sharedUpdater(store, user, deletedIDs) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, "TodoList_todos");

  // Purposefully type forEach as void, to toss the result of deleteNode
  deletedIDs.forEach((deletedID) =>
    ConnectionHandler.deleteNode(conn, deletedID)
  );
}

function commit(environment, user) {
  console.log({ user });
  const input = {
    userId: user.userId,
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    updater: (store) => {
      const payload = store.getRootField("removeCompletedTodos");
      const deletedIds = payload.getValue("deletedTodoIds");

      sharedUpdater(store, user, deletedIds);
    },
  });
}

export default { commit };
