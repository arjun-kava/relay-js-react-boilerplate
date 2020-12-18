import { commitMutation, graphql } from "react-relay";

import { ConnectionHandler } from "relay-runtime";

const mutation = graphql`
  mutation AddTodoMutation($input: AddTodoInput!) {
    addTodo(input: $input) {
      todoEdge {
        __typename
        cursor
        node {
          complete
          id
          text
        }
      }
      user {
        id
        totalCount
      }
    }
  }
`;

function sharedUpdater(store, user, todoEdge) {
  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(
    userProxy,
    "TodoList_todos"
  );
  if (connection) {
    const todo = todoEdge.getLinkedRecord("node");
    const cursor = todoEdge.getValue("cursor");
    const todoId = todo.getValue("id");

    // Check record already exists
    const existingRecords = connection.getLinkedRecords("edges");
    const recordAlreadyExists = existingRecords.some((existingRecord) => {
      const node = existingRecord.getLinkedRecord("node");
      const existingId = node.getValue("id");
      return existingId === todoId;
    });

    if (!recordAlreadyExists) {
      const edge = ConnectionHandler.createEdge(store, connection, todo);
      ConnectionHandler.insertEdgeAfter(connection, edge, cursor);
      const numTodos = userProxy.getValue("totalCount");
      if (numTodos != null) {
        userProxy.setValue(numTodos + 1, "totalCount");
      }
    }
  }
}

function commit(environment, text, user) {
  const input = {
    text,
    userId: user.userId,
    clientMutationId: `${Date.now()}`,
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    updater: (store) => {
      const payload = store.getRootField("addTodo");
      const todoEdge = payload.getLinkedRecord("todoEdge");
      sharedUpdater(store, user, todoEdge);
    },
    optimisticUpdater: (store) => {
      const id = "client:newTodo:" + Date.now();
      const node = store.create(id, "Todo");
      node.setValue(text, "text");
      node.setValue(id, "id");

      const todoEdge = store.create("client:newEdge:" + Date.now(), "TodoEdge");
      todoEdge.setLinkedRecord(node, "node");
      sharedUpdater(store, user, todoEdge);
    },
  });
}

export default { commit };
