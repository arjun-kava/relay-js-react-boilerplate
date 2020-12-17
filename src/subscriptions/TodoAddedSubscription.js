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
  const conn = ConnectionHandler.getConnection(userProxy, "TodoList_todos");
  if (conn) {
    // Check record already exists
    const todo = todoEdge.getLinkedRecord("node");
    const todoId = todo.getValue("id");

    // Check record already exists
    const existingRecords = conn.getLinkedRecords("edges");
    const recordAlreadyExists = existingRecords.some((existingRecord) => {
      const node = existingRecord.getLinkedRecord("node");
      const existingId = node.getValue("id");
      return existingId === todoId;
    });
    if (!recordAlreadyExists) {
      ConnectionHandler.insertEdgeAfter(conn, todoEdge);
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
