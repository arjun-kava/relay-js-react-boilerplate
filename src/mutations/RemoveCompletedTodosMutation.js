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

function commit(environment, todos, user) {
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
    optimisticUpdater: (store) => {
      // Relay returns Maybe types a lot of times in a connection that we need to cater for
      const completedNodeIds = todos.edges
        ? todos.edges
            .filter(Boolean)
            .map((edge) => edge.node)
            .filter(Boolean)
            .filter((node) => node.complete)
            .map((node) => node.id)
        : [];

      sharedUpdater(store, user, completedNodeIds);
    },
  });
}

export default { commit };
