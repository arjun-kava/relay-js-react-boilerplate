import { graphql, requestSubscription } from "react-relay";
import { ConnectionHandler } from "relay-runtime";

const subscription = graphql`
  subscription TodoRemovedSubscription {
    todoRemoved {
      id
      complete
    }
  }
`;

function sharedUpdater(store, user, deletedId) {
  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(
    userProxy,
    "TodoList_todos"
  );
  if (connection) {
    ConnectionHandler.deleteNode(connection, deletedId);
    const numTodos = userProxy.getValue("totalCount");
    if (numTodos != null) {
      userProxy.setValue(numTodos - 1, "totalCount");
    }
  }
}

function request(enviroment, user) {
  const subscriptionConfig = {
    subscription: subscription,
    variables: {},
    updater: (store) => {
      const payload = store.getRootField("todoRemoved");
      const deletedId = payload.getValue("id");
      sharedUpdater(store, user, deletedId);
    },
    onError: (error) => {
      throw new Error(error);
    },
  };

  return requestSubscription(enviroment, subscriptionConfig);
}

export default { request };
