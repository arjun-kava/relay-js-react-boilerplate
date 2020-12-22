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

function sharedUpdater(store, user, todo) {
  const userProxy = store.get(user.id);
  const deletedId = todo.getValue("id");
  const complete = todo.getValue("complete");
  const connection = ConnectionHandler.getConnection(
    userProxy,
    "TodoList_todos"
  );
  if (connection) {
    ConnectionHandler.deleteNode(connection, deletedId);
    const numTodos = userProxy.getValue("totalCount");
    if (numTodos != null) {
      userProxy.setValue(numTodos - 1, "totalCount");
      if (complete) {
        const completedTodos = userProxy.getValue("completedCount");
        userProxy.setValue(completedTodos - 1, "completedCount");
      }
    }
  }
}

function request(enviroment, user) {
  const subscriptionConfig = {
    subscription: subscription,
    variables: {},
    updater: (store) => {
      const todo = store.getRootField("todoRemoved");

      sharedUpdater(store, user, todo);
    },
    onError: (error) => {
      throw new Error(error);
    },
  };

  return requestSubscription(enviroment, subscriptionConfig);
}

export default { request };
