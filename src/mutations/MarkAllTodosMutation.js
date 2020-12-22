import { commitMutation, graphql } from "react-relay";
import { ConnectionHandler } from "relay-runtime";

const mutation = graphql`
  mutation MarkAllTodosMutation($input: MarkAllTodosInput!) {
    markAllTodos(input: $input) {
      changedTodos {
        id
        complete
      }
      user {
        id
        completedCount
      }
    }
  }
`;

function getOptimisticResponse(complete, todos, user) {
  // Relay returns Maybe types a lot of times in a connection that we need to cater for
  const validNodes = todos.edges
    ? todos.edges
        .filter(Boolean)
        .map((edge) => edge.node)
        .filter(Boolean)
    : [];

  const changedTodos = validNodes
    .filter((node) => node.complete !== complete)
    .map((node) => ({
      complete: complete,
      id: node.id,
    }));
  const payload = {
    markAllTodos: {
      changedTodos,
      user: {
        id: user.id,
        completedCount: complete ? user.totalCount : 0,
      },
    },
  };
  return payload;
}

function commit(environment, complete, todos, user) {
  const input = {
    complete,
    userId: user.userId,
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    updater(store) {
      const userProxy = store.get(user.id);
      const connection = ConnectionHandler.getConnection(
        userProxy,
        "TodoList_todos"
      );
      if (connection) {
        const edges = connection.getLinkedRecords("edges");
        edges.forEach((existingRecord) => {
          const node = existingRecord.getLinkedRecord("node");
          node.setValue(complete, "complete");
        });
        if (complete) {
          const totalCount = userProxy.getValue("totalCount");
          userProxy.setValue(totalCount, "completedCount");
        } else {
          userProxy.setValue(0, "completedCount");
        }
      }
    },
    optimisticResponse: getOptimisticResponse(complete, todos, user),
  });
}

export default { commit };
