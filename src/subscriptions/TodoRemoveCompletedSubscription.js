import { graphql, requestSubscription } from "react-relay";
import { ConnectionHandler } from "relay-runtime";

const subscription = graphql`
  subscription TodoRemoveCompletedSubscription {
    todoRemoveCompleted {
      deletedTodoIds
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

function request(enviroment, user) {
  if (enviroment) {
    const subscriptionConfig = {
      subscription: subscription,
      variables: {},
      updater: (store) => {
        const payload = store.getRootField("todoRemoveCompleted");
        console.log({ payload });
        const deletedIds = payload.getValue("deletedTodoIds");
        console.log({ deletedIds });
        sharedUpdater(store, user, deletedIds);
      },
      onError: (error) => {
        throw new Error(error);
      },
    };

    return requestSubscription(enviroment, subscriptionConfig);
  }
}

export default { request };
