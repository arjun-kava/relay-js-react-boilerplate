import { graphql, requestSubscription } from "react-relay";
import { ConnectionHandler } from "relay-runtime";

const subscription = graphql`
  subscription TodoUpdatedSubscription {
    todoUpdated {
      id
      complete
      text
    }
  }
`;

function sharedUpdater(store, user, todo) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, "TodoList_todos");
  if (conn) {
    const todoId = todo.getValue("id");
    const todoText = todo.getValue("text");
    const todoStatus = todo.getValue("complete");

    const todoProxy = store.get(todoId);
    todoProxy.setValue(todoText, "text");
    todoProxy.setValue(todoStatus, "complete");
  }
}

function request(enviroment, user) {
  if (enviroment) {
    const subscriptionConfig = {
      subscription: subscription,
      variables: {},
      updater: (store) => {
        const todo = store.getRootField("todoUpdated");
        sharedUpdater(store, user, todo);
      },
      onError: (error) => {
        throw new Error(error);
      },
    };

    return requestSubscription(enviroment, subscriptionConfig);
  }
}

export default { request };
