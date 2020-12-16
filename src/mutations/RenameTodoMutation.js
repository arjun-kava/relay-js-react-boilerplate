import { commitMutation, graphql } from "react-relay";

const mutation = graphql`
  mutation RenameTodoMutation($input: RenameTodoInput!) {
    renameTodo(input: $input) {
      todo {
        id
        text
      }
    }
  }
`;

function getOptimisticResponse(text, todo) {
  return {
    renameTodo: {
      todo: {
        id: todo.id,
        text: text,
      },
    },
  };
}

function commit(environment, text, todo) {
  const input = {
    text,
    id: todo.id,
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    optimisticResponse: getOptimisticResponse(text, todo),
  });
}

export default { commit };
