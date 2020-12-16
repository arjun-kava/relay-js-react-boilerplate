import { commitMutation, graphql } from "react-relay";

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

  return {
    markAllTodos: {
      changedTodos,
      user: {
        id: user.id,
        completedCount: complete ? user.totalCount : 0,
      },
    },
  };
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
    optimisticResponse: getOptimisticResponse(complete, todos, user),
  });
}

export default { commit };
