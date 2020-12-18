import { graphql, requestSubscription } from "react-relay";
import { ConnectionHandler } from "relay-runtime";

const subscription = graphql`
  subscription TodoAddedSubscription {
    todoAdded {
      node {
        id
        complete
        text
      }
      cursor
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
    // Check record already exists
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

function request(enviroment, user) {
  if (enviroment) {
    const subscriptionConfig = {
      subscription: subscription,
      variables: {},
      updater: (store) => {
        const todoEdge = store.getRootField("todoAdded");
        sharedUpdater(store, user, todoEdge);
      },
      onError: (error) => {
        throw new Error(error);
      },
    };

    return requestSubscription(enviroment, subscriptionConfig);
  }
}

export default { request };
